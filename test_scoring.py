"""
Quick test to verify scoring accuracy for all three sample reports.
Run: python test_scoring.py
"""
import sys, os
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from utils.analyzer import (
    _detect_sections, _score_completeness, _score_clinical_alignment,
    _detect_terminology_issues, _score_terminology, _score_formatting,
    _score_impression_quality, _calculate_weighted_score, _derive_readiness
)

MANDATORY = [
    "Patient Demographics",
    "Clinical Indication / History",
    "Procedure Details / Contrast Agent Details",
    "Comparison Study",
    "Findings",
    "Impression / Conclusion",
    "Reporting Radiologist Signature"
]

REPORTS = {
    "Normal Chest X-Ray": """PATIENT NAME: John Doe
MRN: 987654321
EXAM DATE: 2026-07-23
PROCEDURE: Chest Radiograph, 2 Views (PA and Lateral)
CLINICAL INDICATION: 45-year-old male with chronic cough and history of smoking. Assess for pneumonia or masses.
COMPARISON: None.

FINDINGS:
Lungs and Pleura:
The lungs are clear and well-expanded. No focal airspace consolidation, pleural effusion, or pneumothorax is identified. There is no evidence of pulmonary congestion or interstitial edema.
Cardiovascular:
The cardiomediastinal silhouette is normal in size and configuration. The thoracic aorta is normal in caliber.
Mediastinum and Hila:
Hilar and mediastinal contours are within normal limits. No adenopathy is identified.
Bones and Soft Tissues:
The visualized osseous structures and surrounding soft tissues of the chest wall are intact and within normal limits for age. No acute bony abnormalities are seen.

IMPRESSION:
1. No active cardiopulmonary disease.
2. Specifically, no evidence of pneumonia, pulmonary mass, pleural effusion, or pneumothorax.

REPORT BY: Dr. Jane Smith, MD
SIGNATURE: Digitally Signed by Dr. Jane Smith, MD on 2026-07-23 09:30 AM""",

    "Incomplete Brain MRI": """MRI BRAIN
Done on: Yesterday
Reason: headaches

Findings:
There are a few spotty hyperintensities in the white matter, probably nothing or just typical aging changes. The ventricles are fine. No bleeding. Or maybe there's a little bit of mass effect, it's hard to tell, but overall okay.
Some sinus congestion.

Impression:
Headaches. Some stuff in white matter. Recommend MRI in 6 months to make sure it's not bad.""",

    "Abdomen CT Contradiction": """PATIENT DEMOGRAPHICS:
Patient Name: Robert Johnson
MRN: 45678912
Exam Date: 2026-07-23

CLINICAL INDICATION:
30-year-old male presenting with acute right lower quadrant abdominal pain and leukocytosis.

PROCEDURE DETAILS:
Contrast-enhanced CT of the abdomen and pelvis.

FINDINGS:
The appendix is enlarged measuring 11 mm in diameter with hyperenhancing walls and prominent periappendiceal fat stranding, compatible with acute appendicitis. No free air or localized abscess collection.

IMPRESSION:
No acute abdominal abnormality identified. Appendix is normal."""
}

print("=" * 65)
print("RADIOLOGY QA SCORING VERIFICATION TEST")
print("=" * 65)

for name, text in REPORTS.items():
    print(f"\n{'-'*65}")
    print(f"REPORT: {name}")
    print(f"{'-'*65}")

    sections = _detect_sections(text, MANDATORY)
    completeness, cdeds = _score_completeness(sections)
    alignment, adata = _score_clinical_alignment(text)
    has_contradiction = alignment < 50
    term_issues = _detect_terminology_issues(text)
    terminology = _score_terminology(term_issues)
    formatting, fdeds = _score_formatting(text, sections)
    impression, inotes = _score_impression_quality(text)
    final = _calculate_weighted_score(completeness, terminology, alignment, formatting, impression)
    readiness = _derive_readiness(final, sections, has_contradiction)

    print(f"  Completeness:       {completeness:3d}/100  {cdeds}")
    print(f"  Medical Terminology:{terminology:3d}/100  ({len(term_issues)} issues found)")
    print(f"  Clinical Alignment: {alignment:3d}/100  {adata[:80]}")
    print(f"  Formatting:         {formatting:3d}/100  {fdeds}")
    print(f"  Impression Quality: {impression:3d}/100  {inotes[:1]}")
    print(f"  ----------------------------------")
    print(f"  FINAL SCORE:        {final:3d}/100")
    print(f"  READINESS:          {readiness}")

    if term_issues:
        print(f"  Terminology issues:")
        for t in term_issues:
            print(f"    • {t['quoted']}: {t['description'][:60]}")

    missing = [s['name'] for s in sections if not s['present']]
    if missing:
        print(f"  Missing sections: {missing}")

print("\n" + "=" * 65)
print("Expected Results:")
print("  Normal Chest X-Ray:       98/100      -> Compliant")
print("  Incomplete Brain MRI:     58/100      -> Major Revisions")
print("  Abdomen CT Contradiction: 72/100      -> Major Revisions")
print("=" * 65)
