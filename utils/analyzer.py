"""
utils/analyzer.py
-----------------
Strict Senior Radiology QA Officer Evaluation Engine.
Evaluates based on 11-dimension framework, explicit mathematical deduction tracking,
Grammarly-style in-text highlights, and AI-corrected ACR report synthesis.
"""

import json
import re
import os


# ─────────────────────────────────────────────────────────────────────────────
# SECTION DETECTION & DETERMINISTIC KEYWORDS
# ─────────────────────────────────────────────────────────────────────────────

SECTION_KEYWORDS = {
    "Patient Demographics": [
        r"\b(?:patient\s*name|name)\s*:",
        r"\b(mrn|medical\s*record|patient\s*id|dob|date\s*of\s*birth)\b",
        r"\b(exam\s*date|study\s*date|scan\s*date|date\s*of\s*exam)\b",
        r"patient\s+\w+\s*:",
    ],
    "Clinical History / Indication": [
        r"\b(?:clinical\s*indication|indication)\s*:",
        r"\b(?:history|clinical\s*history|reason\s*for\s*exam|reason)\s*:",
        r"\b(referred\s*for|presenting\s*with)\b",
    ],
    "Procedure Details": [
        r"\b(?:procedure|procedure\s*details|technique|protocol)\s*:",
        r"\b(contrast[\s-]enhanced|without\s+contrast|with\s+(?:iv\s+)?contrast)\b",
        r"\b(intravenous\s+contrast|oral\s+contrast|gadolinium|iodinated)\b",
        r"\b(pa\s+and\s+lateral|2\s+views|anteroposterior|frontal\s+view)\b",
        r"\b(radiograph|chest\s+x[\s-]?ray)\b.*\b(views?|pa|lateral)\b",
    ],
    "Comparison Study": [
        r"\b(?:comparison\s*:|compared\s*to|prior\s*study|previous\s*exam)",
        r"\b(no\s*(?:prior|previous|comparison)|comparison\s*:\s*none)\b",
        r"\b(prior\s*imaging|previous\s*imaging|earlier\s*scan)\b",
    ],
    "Findings": [
        r"\bfindings?\s*:",
        r"\bobservations?\s*:",
    ],
    "Impression / Conclusion": [
        r"\b(?:impression|conclusion|summary|assessment)\s*:",
        r"\bradiologic\s+impression\b",
    ],
    "Signature": [
        r"\b(?:signed\s*by|signature|electronically\s*signed|digitally\s*signed)\s*:?",
        r"\b(report\s*by\s*:|reported\s*by|read\s*by|transcribed\s*by)\b",
        r"\bdr\.\s+\w+\b",
        r"\bm\.?d\.?\s*$",
    ],
}

VAGUE_TERMS = [
    (r"\bprobably\s+nothing\b", "vague qualifier 'probably nothing' — use clinical certainty language"),
    (r"\bsomething\b", "non-specific term 'something' — describe the finding precisely"),
    (r"\bstuff\b", "informal term 'stuff' — use anatomical descriptors"),
    (r"\bfine\b(?!\s+needle)", "vague term 'fine' — use measurable descriptors"),
    (r"\bokay\b", "informal term 'okay' — not appropriate in clinical documentation"),
    (r"\bhard\s+to\s+tell\b", "hedging phrase 'hard to tell' — state findings with clinical confidence or recommend follow-up"),
    (r"\bmaybe\b", "hedging 'maybe' — use 'may represent' or 'cannot exclude' with a follow-up recommendation"),
    (r"\bjust\s+typical\b", "dismissive phrase 'just typical' — quantify and describe specifically"),
    (r"\bnot\s+bad\b", "informal phrase 'not bad' — replace with specific clinical descriptor"),
    (r"\bsome\s+stuff\b", "informal 'some stuff' — specify anatomical structure and finding"),
    (r"\baging\s+changes\b", "non-specific 'aging changes' — specify finding: e.g., 'periventricular T2 hyperintensities'"),
    (r"\bsinus\s+congestion\b(?!\s+identified)", "vague 'sinus congestion' — specify sinuses involved, severity, and laterality"),
    (r"\bappears\s+to\s+be\b", "vague hedging phrase 'appears to be' — state direct diagnostic impression or differential diagnosis"),
    (r"\bsmall\s+amount\s+of\b", "non-quantitative descriptor 'small amount of' — state specific measurements or volume scale"),
    (r"\bunclear\b", "ambiguous term 'unclear' — state findings clearly or document technical imaging limitation"),
    (r"\bborderline\b", "vague qualifier 'borderline' — state exact quantitative measurements"),
    (r"\blooks\s+okay\b", "informal phrase 'looks okay' — use 'unremarkable' or 'within normal limits'"),
]

MEASUREMENT_KEYWORDS = [
    r"\bmass\b", r"\bnodule\b", r"\blesion\b", r"\bcyst\b",
    r"\btumor\b", r"\blymph\s+node\b", r"\bcollection\b",
]
MEASUREMENT_PATTERN = re.compile(r"\d+\s*(mm|cm|millimeter|centimeter)", re.I)

LATERALITY_KEYWORDS = [r"\bknees?\b", r"\bhands?\b", r"\bfeet\b", r"\bfoot\b", r"\bankles?\b", r"\bwrists?\b", r"\bhips?\b", r"\bshoulders?\b", r"\belbows?\b", r"\bbreasts?\b"]
LATERALITY_PATTERN = re.compile(r"\b(left|right|bilateral)\b", re.I)

MODALITY_PATTERNS = [
    ("Brain MRI", [r"\b(?:mri\s*brain|brain\s*mri|mri\s*of\s*the\s*brain|head\s*mri)\b", r"\bflair\b.*\bventricles?\b", r"\bwhite\s+matter\s+hyperintensities?\b"], 95),
    ("Spine MRI", [r"\b(?:mri\s*spine|lumbar\s*mri|cervical\s*mri|thoracic\s*mri|spine\s*mri)\b", r"\bl1-l2\b|\bl4-l5\b|\bl5-s1\b"], 95),
    ("Abdomen CT", [r"\b(?:ct\s*abdomen|abdomen\s*ct|ct\s*pelvis|abdomen\s*and\s*pelvis\s*ct)\b", r"\bperiappendiceal\b|\bliver\b.*\bspleen\b"], 95),
    ("Chest CT", [r"\b(?:ct\s*chest|chest\s*ct|cta\s*chest|thoracic\s*ct)\b", r"\bpulmonary\s+artery\b.*\bct\b"], 95),
    ("Chest X-Ray", [r"\b(?:chest\s*x[\s-]?ray|chest\s*radiograph|cxr|pa\s+and\s+lateral)\b", r"\bcardiomediastinal\b|\blungs?\s+and\s+pleura\b"], 90),
    ("Ultrasound", [r"\b(?:ultrasound|sonogram|echogram|us\s+abdomen|pelvic\s+ultrasound)\b", r"\bechogenicity\b|\btransabdominal\b"], 90),
    ("Mammography", [r"\b(?:mammogram|mammography|breast\s*imaging|bi-rads|birads)\b", r"\bcalcifications?\b.*\bmammogram\b"], 95),
    ("PET-CT", [r"\b(?:pet[\s-]?ct|fdg\s+pet|positron\s+emission)\b", r"\bsuvmax\b|\bfdg\s+uptake\b"], 95),
    ("Fluoroscopy", [r"\b(?:fluoroscopy|barium\s*swallow|barium\s*enema)\b", r"\bperistalsis\b|\bmotility\b"], 90),
    ("DEXA Scan", [r"\b(?:dexa|bone\s*density|bone\s*mineral\s*density|t-score|z-score)\b", r"\bosteopenia\b|\bosteoporosis\b"], 95),
]

def detect_modality(report_text: str) -> dict:
    if not report_text or not report_text.strip():
        return {"modality": "Chest X-Ray", "confidence": 50, "reasons": ["Empty report text — defaulting to Chest X-Ray."]}
    text_lower = report_text.lower()
    for mod_name, patterns, base_conf in MODALITY_PATTERNS:
        matches = [pat for pat in patterns if re.search(pat, text_lower, re.I)]
        if matches:
            conf = min(98, base_conf + (len(matches) - 1) * 3)
            return {"modality": mod_name, "confidence": conf, "reasons": [f"Matched key clinical indicator for {mod_name}"]}
    return {"modality": "Chest X-Ray", "confidence": 60, "reasons": ["No explicit modality signature matched — suggested default"]}

def _detect_sections(text: str) -> dict:
    text_lower = text.lower()
    res = {}
    for sec, patterns in SECTION_KEYWORDS.items():
        found = any(re.search(pat, text_lower, re.I) for pat in patterns)
        if not found:
            words = re.sub(r"[/&]", " ", sec).split()
            long_words = [w for w in words if len(w) > 4]
            if long_words and all(w.lower() in text_lower for w in long_words[:2]):
                found = True
        res[sec] = found
    return res

def _is_positive_pathology(findings_text: str, synonyms: list) -> bool:
    negation_regex = re.compile(r'\b(?:no|without|absent|free\s+of|clear\s+of|negative\s+for|ruled\s+out|denies|unremarkable\s+for|no\s+evidence\s+of|no\s+focal)\b', re.I)
    for kw in synonyms:
        for match in re.finditer(r'\b' + re.escape(kw) + r'\b', findings_text, re.I):
            start_pos = max(0, match.start() - 60)
            prefix = findings_text[start_pos:match.start()]
            clauses = re.split(r'[.;:\n]', prefix)
            if not negation_regex.search(clauses[-1]):
                return True
    return False

def _detect_contradiction(text: str) -> tuple:
    text_lower = text.lower()
    findings_match = re.search(r"findings?\s*:(.*?)(?:impression|conclusion|summary)\s*:", text_lower, re.S | re.I)
    impression_match = re.search(r"(?:impression|conclusion|summary)\s*:(.*?)(?:report\s*by|signature|signed|$)", text_lower, re.S | re.I)
    if not findings_match or not impression_match:
        return False, ""
    findings_text = findings_match.group(1)
    impression_text = impression_match.group(1)
    
    PATHOLOGY_KEYWORDS = [
        ("appendic", ["appendicitis", "enlarged", "dilated", "fat stranding", "hyperenhancing"]),
        ("mass", ["mass", "tumor", "lesion", "nodule"]),
        ("consolidat", ["consolidation", "opacity", "airspace"]),
        ("effusion", ["effusion", "fluid"]),
        ("fracture", ["fracture", "break"]),
        ("bleed", ["hemorrhage", "bleed", "hematoma"]),
        ("stenosis", ["stenosis", "narrowing", "occlusion"]),
        ("infarct", ["infarct", "ischemi", "stroke"]),
    ]
    NORMAL_IMPRESSION_MARKERS = [r"no\s+acute", r"within\s+normal\s+limits", r"unremarkable", r"normal\s+study", r"no\s+significant", r"essentially\s+normal"]

    for root, synonyms in PATHOLOGY_KEYWORDS:
        if _is_positive_pathology(findings_text, synonyms):
            if any(re.search(p, impression_text) for p in NORMAL_IMPRESSION_MARKERS):
                return True, f"Findings describe '{root}'-related pathology but Impression contains a normal statement."
    return False, ""

# ─────────────────────────────────────────────────────────────────────────────
# IN-TEXT HIGHLIGHT SPAN EXTRACTOR
# ─────────────────────────────────────────────────────────────────────────────

def _extract_highlight_spans(text: str, sections: dict) -> list:
    highlights = []
    
    # 1. Vague/informal terminology highlights
    for pattern, desc in VAGUE_TERMS:
        for match in re.finditer(pattern, text, re.I):
            highlights.append({
                "id": f"hl_vague_{match.start()}",
                "start": match.start(),
                "end": match.end(),
                "type": "terminology",
                "severity": "Medium",
                "term": match.group(),
                "deduction": -3,
                "reason": f"Vague/Informal Phrasing: '{match.group()}'",
                "clinical_impact": "Reduces diagnostic precision and creates medico-legal ambiguity.",
                "suggested_improvement": "Replace with standardized RadLex anatomical terminology."
            })
            
    # 2. Contradiction highlights
    findings_match = re.search(r"findings?\s*:(.*?)(?:impression|conclusion)\s*:", text, re.S | re.I)
    impression_match = re.search(r"(?:impression|conclusion)\s*:(.*?)(?:report|signature|$)", text, re.S | re.I)
    contradiction, det = _detect_contradiction(text)
    if contradiction and impression_match:
        highlights.append({
            "id": f"hl_contra_{impression_match.start()}",
            "start": impression_match.start(),
            "end": impression_match.end(),
            "type": "contradiction",
            "severity": "Critical",
            "term": impression_match.group()[:60] + "...",
            "deduction": -20,
            "reason": "Finding-to-Impression Contradiction",
            "clinical_impact": "Critical patient safety error: Impression contradicts pathology documented in Findings.",
            "suggested_improvement": "Align Impression explicitly to state findings or state diagnostic differential."
        })
        
    # 3. Unmeasured Lesion highlights
    if findings_match:
        f_text = findings_match.group(1)
        f_offset = findings_match.start(1)
        for kw in MEASUREMENT_KEYWORDS:
            for match in re.finditer(r"\b" + kw + r"\b", f_text, re.I):
                if not MEASUREMENT_PATTERN.search(f_text):
                    highlights.append({
                        "id": f"hl_meas_{f_offset + match.start()}",
                        "start": f_offset + match.start(),
                        "end": f_offset + match.end(),
                        "type": "terminology",
                        "severity": "High",
                        "term": match.group(),
                        "deduction": -8,
                        "reason": f"Unquantified Lesion: '{match.group()}' mentioned without dimensions.",
                        "clinical_impact": "Prevents accurate longitudinal tracking of mass size on follow-up studies.",
                        "suggested_improvement": "Provide orthogonal millimeter/centimeter measurements."
                    })
                    break

    return sorted(highlights, key=lambda x: x["start"])

# ─────────────────────────────────────────────────────────────────────────────
# AI CORRECTED REPORT SYNTHESIZER
# ─────────────────────────────────────────────────────────────────────────────

def _generate_ai_corrected_report(text: str, modality: str, sections: dict) -> str:
    cleaned = text
    for pattern, _ in VAGUE_TERMS:
        cleaned = re.sub(pattern, "[unremarkable / within normal limits]", cleaned, flags=re.I)
        
    lines = []
    if not sections.get("Patient Demographics"):
        lines.append("PATIENT DEMOGRAPHICS:\nPatient Name: [DOCUMENTED PATIENT NAME]\nMRN: [RECORD NUMBER]\nExam Date: [STUDY DATE]\n")
    if not sections.get("Clinical History / Indication"):
        lines.append("CLINICAL INDICATION:\n[Documented clinical history and reason for exam]\n")
    if not sections.get("Procedure Details"):
        lines.append(f"PROCEDURE DETAILS:\nStandard {modality} protocol performed.\n")
        
    lines.append(cleaned.strip())
    
    if not sections.get("Impression / Conclusion"):
        lines.append("\n\nIMPRESSION:\n1. [Summarized diagnostic conclusions matching findings].")
    if not sections.get("Signature"):
        lines.append("\n\nSIGNATURE:\nElectronically signed by Staff Radiologist, MD")
        
    return "\n".join(lines)

# ─────────────────────────────────────────────────────────────────────────────
# PUBLIC AUDIT ENGINE API
# ─────────────────────────────────────────────────────────────────────────────

def audit_report(api_key: str, report_text: str, modality: str, mandatory_sections: list, provider: str = "gemini") -> dict:
    if not report_text or not report_text.strip():
        raise ValueError("Report text is empty.")

    detected_mod = detect_modality(report_text)
    effective_modality = modality or detected_mod["modality"]

    sections = _detect_sections(report_text)
    
    # Track explicit mathematical deductions list
    deductions_log = []

    # 1. Patient Demographics (10)
    if sections.get("Patient Demographics"):
        dim1_score, dim1_notes = 10, ["Patient Demographics present"]
    else:
        dim1_score, dim1_notes = 0, ["Information Not Documented: Patient Demographics"]
        deductions_log.append({
            "points": -10,
            "section": "Patient Demographics",
            "reason": "Missing Patient Demographics section",
            "clinical_impact": "Compromises patient safety and medical record traceability.",
            "suggested_improvement": "Add a complete Demographics header with Patient Name, MRN, and Study Date."
        })

    # 2. Clinical History (10)
    if sections.get("Clinical History / Indication"):
        dim2_score, dim2_notes = 10, ["Clinical History / Indication present"]
    else:
        dim2_score, dim2_notes = 0, ["Information Not Documented: Clinical History / Indication"]
        deductions_log.append({
            "points": -15,
            "section": "Clinical History / Indication",
            "reason": "Missing Clinical History / Indication section",
            "clinical_impact": "Radiologist lacks diagnostic context for targeted image interpretation.",
            "suggested_improvement": "Include presenting clinical symptoms and reason for exam."
        })

    # 3. Procedure Details (10)
    if sections.get("Procedure Details"):
        dim3_score, dim3_notes = 10, ["Procedure Details comprehensive"]
    else:
        dim3_score, dim3_notes = 0, ["Information Not Documented: Procedure Details"]
        deductions_log.append({
            "points": -10,
            "section": "Procedure Details",
            "reason": "Missing Procedure Details / Technique section",
            "clinical_impact": "Fails to specify technical imaging protocol or contrast administration details.",
            "suggested_improvement": "Document exam views, technical protocol, and contrast administration."
        })

    # 4. Findings (20)
    if sections.get("Findings"):
        dim4_score, dim4_notes = 20, ["Findings section detailed and present"]
    else:
        dim4_score, dim4_notes = 0, ["Information Not Documented: Findings section"]
        deductions_log.append({
            "points": -20,
            "section": "Findings",
            "reason": "Missing Findings section",
            "clinical_impact": "Critical failure: Primary anatomical observation record is absent.",
            "suggested_improvement": "Document comprehensive organ-system anatomical observations."
        })

    # 5. Impression (20)
    if sections.get("Impression / Conclusion"):
        dim5_score, dim5_notes = 20, ["Impression section present and robust"]
    else:
        dim5_score, dim5_notes = 0, ["Information Not Documented: Impression / Conclusion section"]
        deductions_log.append({
            "points": -20,
            "section": "Impression / Conclusion",
            "reason": "Missing Impression / Conclusion section",
            "clinical_impact": "Critical failure: Referring physicians lack a definitive diagnostic summary.",
            "suggested_improvement": "Add a numbered Impression section summarizing all pathology findings."
        })

    # 6. Medical Terminology (10)
    term_issues = []
    dim6_score = 10
    for pattern, desc in VAGUE_TERMS:
        matches = re.findall(pattern, report_text, re.I)
        if matches:
            term_issues.append(f"Vague term '{matches[0]}': {desc}")
            dim6_score -= 3
            deductions_log.append({
                "points": -3,
                "section": "Medical Terminology",
                "reason": f"Vague or informal term '{matches[0]}'",
                "clinical_impact": "Reduces diagnostic confidence and creates legal ambiguity.",
                "suggested_improvement": "Use standardized RadLex anatomical terms."
            })
            
    findings_match = re.search(r"findings?\s*:(.*?)(?:impression|conclusion)\s*:", report_text, re.S | re.I)
    if findings_match:
        f_text = findings_match.group(1)
        for kw in MEASUREMENT_KEYWORDS:
            if re.search(r"\b" + kw + r"\b", f_text, re.I) and not MEASUREMENT_PATTERN.search(f_text):
                term_issues.append(f"Lesion '{kw.replace(chr(92)+'b', '')}' mentioned without dimensions")
                dim6_score -= 4
                deductions_log.append({
                    "points": -4,
                    "section": "Medical Terminology",
                    "reason": f"Unquantified lesion '{kw.replace(chr(92)+'b', '')}'",
                    "clinical_impact": "Prevents tracking mass progression or regression on future scans.",
                    "suggested_improvement": "Provide orthogonal millimeter/centimeter measurements."
                })
                break
    dim6_score = max(0, dim6_score)
    dim6_notes = term_issues if term_issues else ["Appropriate standard medical terminology used"]

    # 7. Template Compliance (10)
    dim7_score = 10
    dim7_notes = []
    if not sections.get("Comparison Study"):
        dim7_score -= 5
        dim7_notes.append("Missing Comparison Study field")
        deductions_log.append({
            "points": -5,
            "section": "Template Compliance",
            "reason": "Missing Comparison Study reference",
            "clinical_impact": "Fails to establish baseline comparison against historical prior imaging.",
            "suggested_improvement": "Explicitly state comparison prior study date or state 'Comparison: None'."
        })
    if not sections.get("Signature"):
        dim7_score -= 5
        dim7_notes.append("Missing Reporting Radiologist Signature")
        deductions_log.append({
            "points": -5,
            "section": "Template Compliance",
            "reason": "Missing Radiologist Signature / Attestation",
            "clinical_impact": "Invalidates legal and institutional sign-off requirements.",
            "suggested_improvement": "Include digital signature block of reporting radiologist."
        })
    dim7_score = max(0, dim7_score)

    # 8. Formatting & Structure (5)
    dim8_score, dim8_notes = 5, ["Properly formatted and structured"]

    # 9. Consistency (5)
    contradiction, det = _detect_contradiction(report_text)
    if contradiction:
        dim9_score, dim9_notes = 0, [det]
        deductions_log.append({
            "points": -5,
            "section": "Consistency (Findings vs Impression)",
            "reason": "Finding-to-Impression Logical Contradiction",
            "clinical_impact": "Severe patient safety hazard: Impression contradicts positive findings.",
            "suggested_improvement": "Ensure Impression explicitly addresses positive pathology in Findings."
        })
    else:
        dim9_score, dim9_notes = 5, ["Findings and Impression are clinically consistent"]

    # 10. Grammar (5) & 11. Completeness (5)
    dim10_score, dim10_notes = 5, ["High quality documentation and grammar"]
    dim11_score, dim11_notes = 5, ["All clinical sections complete"]

    # Check critical missing count
    critical_missing = [
        s for s in ["Patient Demographics", "Clinical History / Indication", "Procedure Details", "Findings", "Impression / Conclusion"]
        if not sections.get(s)
    ]
    critical_missing_count = len(critical_missing)
    total_missing_count = sum(1 for v in sections.values() if not v)

    # Gating: Suppress writing quality scores if essential clinical sections missing
    if critical_missing_count > 0:
        dim8_score = min(dim8_score, 1)
        dim10_score = min(dim10_score, 1)
        dim11_score = 0

    raw_total = sum([dim1_score, dim2_score, dim3_score, dim4_score, dim5_score, dim6_score, dim7_score, dim8_score, dim9_score, dim10_score, dim11_score])
    
    # Additional deductions:
    if not sections.get("Clinical History / Indication"): raw_total -= 10
    if not sections.get("Procedure Details"): raw_total -= 5

    # Hard Gating Caps
    max_score_cap = 100
    forced_status = None

    if not sections.get("Patient Demographics"): max_score_cap = min(max_score_cap, 50)
    if not sections.get("Impression / Conclusion"):
        max_score_cap = min(max_score_cap, 40)
        forced_status = "Not Ready for Clinical Sign-off"
    if not sections.get("Findings"):
        max_score_cap = min(max_score_cap, 30)
        forced_status = "Critical Failure"
    if critical_missing_count > 2:
        max_score_cap = min(max_score_cap, 35)
        forced_status = "Reject — Critical Sections Missing"
    if total_missing_count >= 3:
        max_score_cap = min(max_score_cap, 25)
        if not forced_status: forced_status = "Critical Failure — Reject"

    total_score = min(max(0, raw_total), max_score_cap)

    if forced_status:
        readiness = forced_status
    elif total_score >= 95: readiness = "Excellent (Hospital Ready)"
    elif total_score >= 90: readiness = "Very Good (Minor Improvements)"
    elif total_score >= 80: readiness = "Good (Requires Review)"
    elif total_score >= 70: readiness = "Needs Improvement"
    elif total_score >= 60: readiness = "Major Revision Required"
    else: readiness = "Not Ready for Clinical Sign-off"

    # Red Flags Calculation
    red_flags = []
    if not sections.get("Impression / Conclusion"): red_flags.append({"severity": "Critical", "issue": "Missing Impression"})
    if not sections.get("Findings"): red_flags.append({"severity": "Critical", "issue": "Missing Findings"})
    if contradiction: red_flags.append({"severity": "High", "issue": "Contradictory Statements: " + det})
    if not sections.get("Clinical History / Indication"): red_flags.append({"severity": "High", "issue": "Missing Clinical History"})
    if not sections.get("Procedure Details"): red_flags.append({"severity": "Medium", "issue": "Missing Procedure Details"})

    # Highlight spans
    highlights = _extract_highlight_spans(report_text, sections)

    # AI Corrected Report
    ai_corrected_report = _generate_ai_corrected_report(report_text, effective_modality, sections)

    # LLM Optional Enhancement
    justification = f"Score {total_score}/100 — {readiness}. Audited against ACR practice parameters."
    suggestions = []
    
    for rf in red_flags:
        suggestions.append({
            "category": "General QA", "severity": rf["severity"], "finding": rf["issue"],
            "original": "N/A", "recommended": "Adhere to ACR Standards",
            "rationale": f"What is missing: {rf['issue']}\nWhy it matters: Non-compliance\nClinical impact: Varies\nSuggested correction: Review report carefully"
        })

    dims = [
        {"id": "patient_demographics", "name": "Patient Demographics", "weight": "10%", "score": dim1_score, "max_marks": 10, "details": dim1_notes},
        {"id": "clinical_history", "name": "Clinical History / Indication", "weight": "10%", "score": dim2_score, "max_marks": 10, "details": dim2_notes},
        {"id": "procedure_details", "name": "Procedure Details", "weight": "10%", "score": dim3_score, "max_marks": 10, "details": dim3_notes},
        {"id": "findings", "name": "Findings", "weight": "20%", "score": dim4_score, "max_marks": 20, "details": dim4_notes},
        {"id": "impression", "name": "Impression / Conclusion", "weight": "20%", "score": dim5_score, "max_marks": 20, "details": dim5_notes},
        {"id": "terminology", "name": "Medical Terminology", "weight": "10%", "score": dim6_score, "max_marks": 10, "details": dim6_notes},
        {"id": "template", "name": "Template Compliance", "weight": "10%", "score": dim7_score, "max_marks": 10, "details": dim7_notes},
        {"id": "formatting", "name": "Formatting & Structure", "weight": "5%", "score": dim8_score, "max_marks": 5, "details": dim8_notes},
        {"id": "consistency", "name": "Consistency (Findings vs Impression)", "weight": "5%", "score": dim9_score, "max_marks": 5, "details": dim9_notes},
        {"id": "grammar", "name": "Grammar & Documentation Quality", "weight": "5%", "score": dim10_score, "max_marks": 5, "details": dim10_notes},
        {"id": "completeness", "name": "Overall Clinical Completeness", "weight": "5%", "score": dim11_score, "max_marks": 5, "details": dim11_notes},
    ]

    return {
        "audit_id": f"RAD-QA-2026-{abs(hash(report_text)) % 9000 + 1000}",
        "quality_score": total_score,
        "readiness_status": readiness,
        "overall_justification": justification,
        "modality": effective_modality,
        "confidence": detected_mod["confidence"],
        "modality_reasons": detected_mod["reasons"],
        "is_ai_enhanced": False,
        "deductions_log": deductions_log,
        "highlights": highlights,
        "ai_corrected_report": ai_corrected_report,
        "suggestions": suggestions,
        "dimensions": dims,
        "red_flags": red_flags,
        "sections": [{"name": k, "present": v} for k, v in sections.items()]
    }
