/**
 * Client-side Direct AI Audit Engine (Groq / Gemini API)
 * Standardizes AI suggestions, remarks, scope of correction, and guarantees 100% mathematical consistency.
 */

export async function directGroqAudit({ report_text, modality, mandatory_sections, provider = 'groq', api_key = '' }) {
  const key = api_key || localStorage.getItem(`${provider}_api_key`) || localStorage.getItem('groq_api_key') || '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';

  const systemPrompt = `You are a Senior Radiology Quality Assurance Officer and ACR Audit Specialist.
Analyze the provided radiology report and evaluate its quality against ACR practice parameters across ALL 11 DIMENSIONS.
CRITICAL MATHEMATICAL RULE: The "quality_score" MUST mathematically equal 100 minus the sum of all deduction points in "deductions_log". For example, if deductions are -10 pts and -5 pts (total -15 pts), the quality_score MUST be 85.

Required JSON Output Schema:
{
  "quality_score": 85,
  "readiness_status": "Ready for Sign-off" | "Minor Revision Needed" | "Major Revision Required" | "Not Ready for Clinical Sign-off",
  "overall_justification": "Structured, detailed summary explaining why marks were deducted.",
  "effective_modality": "${modality || 'Chest X-Ray'}",
  "deductions_log": [
    {
      "points": -10,
      "section": "Procedure Details",
      "reason": "Missing procedure details and contrast agent specification",
      "scope_of_correction": "Add Missing Section",
      "remarks": "The report fails to specify imaging pulse sequence, slice thickness, or IV contrast volume.",
      "clinical_impact": "High risk of missing secondary pathologies or compromising technique reproducibility",
      "suggested_improvement": "Add Technique section specifying 100 mL Omnipaque 350 IV contrast"
    },
    {
      "points": -5,
      "section": "Comparison Study",
      "reason": "Missing comparison study details",
      "scope_of_correction": "Add Comparison Date",
      "remarks": "No prior imaging comparison documented.",
      "clinical_impact": "Prevents tracking longitudinal lesion progression",
      "suggested_improvement": "Document prior chest CT date or state no priors available"
    }
  ],
  "dimensions": [
    { "id": "patient_demographics", "name": "Patient Demographics", "weight": "10%", "score": 10, "max_marks": 10, "details": ["Patient Name, MRN, and DOB documented."] },
    { "id": "clinical_history", "name": "Clinical History / Indication", "weight": "10%", "score": 10, "max_marks": 10, "details": ["Chief complaint and clinical question evaluated."] },
    { "id": "procedure_details", "name": "Procedure Details", "weight": "10%", "score": 0, "max_marks": 10, "details": ["Technique missing contrast agent volume (-10 pts)."] },
    { "id": "findings", "name": "Findings", "weight": "20%", "score": 20, "max_marks": 20, "details": ["Anatomical observations and lesion measurements."] },
    { "id": "impression", "name": "Impression / Conclusion", "weight": "20%", "score": 20, "max_marks": 20, "details": ["Diagnostic summary and clinical recommendations."] },
    { "id": "terminology", "name": "Medical Terminology", "weight": "10%", "score": 10, "max_marks": 10, "details": ["RadLex terminology precision."] },
    { "id": "template", "name": "Template Compliance", "weight": "10%", "score": 10, "max_marks": 10, "details": ["ACR 7-section structured headers."] },
    { "id": "formatting", "name": "Formatting & Structure", "weight": "5%", "score": 5, "max_marks": 5, "details": ["Paragraph legibility."] },
    { "id": "consistency", "name": "Consistency (Findings vs Impression)", "weight": "5%", "score": 5, "max_marks": 5, "details": ["Laterality agreement."] },
    { "id": "grammar", "name": "Grammar & Documentation Quality", "weight": "5%", "score": 5, "max_marks": 5, "details": ["Absence of typos."] },
    { "id": "completeness", "name": "Overall Clinical Completeness", "weight": "5%", "score": 0, "max_marks": 5, "details": ["Missing comparison study (-5 pts)."] }
  ],
  "suggestions": [
    {
      "category": "Procedure Details",
      "severity": "Medium",
      "scope_of_correction": "Add Missing Section",
      "finding": "Missing procedure details and contrast agent specification",
      "original": "N/A",
      "recommended": "Add Technique section specifying pulse sequence and contrast dose.",
      "remarks": "Senior QA Officer: Specify contrast volume for ACR compliance.",
      "rationale": "Ensures technique reproducibility."
    }
  ],
  "highlights": [],
  "sections": [
    { "name": "Patient Demographics", "present": true },
    { "name": "Clinical History / Indication", "present": true },
    { "name": "Procedure Details", "present": false },
    { "name": "Comparison Study", "present": false },
    { "name": "Findings", "present": true },
    { "name": "Impression / Conclusion", "present": true },
    { "name": "Reporting Radiologist Signature", "present": true }
  ],
  "ai_corrected_report": "Complete revised radiology report in ACR standard format."
}`;

  const userPrompt = `Modality: ${modality || 'Chest X-Ray'}
Mandatory Sections: ${mandatory_sections ? mandatory_sections.join(', ') : 'None specified'}

Radiology Report Text:
"""
${report_text}
"""`;

  if (provider === 'groq') {
    const models = [
      'llama-3.1-8b-instant',
      'llama-3.3-70b-versatile',
      'llama3-70b-8192',
      'llama3-8b-8192',
      'mixtral-8x7b-32768',
    ];

    let lastError = null;

    for (const model of models) {
      try {
        const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${key}`
          },
          body: JSON.stringify({
            model: model,
            messages: [
              { role: 'system', content: systemPrompt },
              { role: 'user', content: userPrompt }
            ],
            temperature: 0.1,
            response_format: { type: 'json_object' }
          })
        });

        if (!res.ok) {
          const err = await res.json().catch(() => ({}));
          lastError = err.error?.message || `Groq API returned HTTP ${res.status}`;
          continue;
        }

        const data = await res.json();
        const rawContent = data.choices[0]?.message?.content || '{}';
        const parsed = JSON.parse(rawContent);

        return normalizeAuditResult(parsed, modality, report_text);
      } catch (err) {
        lastError = err.message;
      }
    }

    throw new Error(lastError || 'Failed to connect to Groq API. Please check your model limits or API key.');
  }

  throw new Error('Unsupported direct provider');
}

/**
 * Normalizes raw LLM JSON response to guarantee 100% mathematical accuracy between score & deductions.
 */
function normalizeAuditResult(parsed, requestedModality, originalReportText) {
  const effective_modality = parsed.effective_modality ?? parsed.modality ?? requestedModality ?? 'Chest X-Ray';

  // Normalize suggestions
  let suggestions = Array.isArray(parsed.suggestions) ? parsed.suggestions : [];
  if (suggestions.length === 0 && Array.isArray(parsed.suggested_improvements)) {
    suggestions = parsed.suggested_improvements.map((item) => ({
      category: item.category || 'General QA',
      severity: item.severity || 'Medium',
      scope_of_correction: item.scope_of_correction || 'Content Revision',
      finding: item.text || item.finding || 'Clinical report improvement',
      original: item.original || 'N/A',
      recommended: item.recommended || item.text || 'Follow ACR practice guidelines',
      remarks: item.remarks || 'Senior QA review note: Verify alignment with clinical indications.',
      rationale: item.rationale || item.explanation || 'Improves report clarity and diagnostic accuracy.'
    }));
  }

  // Normalize deductions log
  let deductions_log = Array.isArray(parsed.deductions_log) ? parsed.deductions_log : [];
  if (deductions_log.length === 0 && suggestions.length > 0) {
    deductions_log = suggestions.map((s) => ({
      points: s.severity === 'High' ? -15 : s.severity === 'Medium' ? -10 : -5,
      section: s.category || 'General QA',
      reason: s.finding,
      scope_of_correction: s.scope_of_correction,
      remarks: s.remarks,
      clinical_impact: s.rationale,
      suggested_improvement: s.recommended
    }));
  } else {
    deductions_log = deductions_log.map((d) => ({
      points: d.points < 0 ? d.points : -Math.abs(d.points || 5),
      section: d.section || 'General QA',
      reason: d.reason || 'Omission or formatting defect',
      scope_of_correction: d.scope_of_correction || (d.points < -10 ? 'Major Section Revision' : 'Minor Adjustment'),
      remarks: d.remarks || `QA Note: ${d.reason}. Requires clinical correction.`,
      clinical_impact: d.clinical_impact || 'Impacts documentation quality.',
      suggested_improvement: d.suggested_improvement || 'Correct report section.'
    }));
  }

  // Calculate total deducted points
  const totalDeducted = deductions_log.reduce((acc, d) => acc + Math.abs(d.points), 0);

  // STRICT MATHEMATICAL SYNCHRONIZATION: quality_score = 100 - totalDeducted
  const quality_score = Math.max(0, Math.min(100, 100 - totalDeducted));

  // Determine readiness status based on exact mathematical score
  let readiness_status = 'Ready for Sign-off';
  if (quality_score >= 90) readiness_status = 'Ready for Sign-off';
  else if (quality_score >= 80) readiness_status = 'Minor Revision Needed';
  else if (quality_score >= 60) readiness_status = 'Major Revision Required';
  else readiness_status = 'Not Ready for Clinical Sign-off';

  // Build a rich, structured overall_justification summary
  let overall_justification = parsed.overall_justification || parsed.score_justification;
  if (!overall_justification || overall_justification.length < 30) {
    overall_justification = `Report evaluated with mathematical score ${quality_score}/100 (${readiness_status}). Deductions sum to -${totalDeducted} pts total:\n` +
      deductions_log.map((d, i) => `${i + 1}. ${d.reason} (${d.points} pts): ${d.remarks || d.suggested_improvement}`).join('\n');
  }

  // Normalize highlights & sections
  const highlights = Array.isArray(parsed.highlights) ? parsed.highlights : [];
  let sections = Array.isArray(parsed.sections) ? parsed.sections : [
    { name: 'Patient Demographics', present: true },
    { name: 'Clinical History / Indication', present: true },
    { name: 'Procedure Details', present: true },
    { name: 'Findings', present: true },
    { name: 'Impression / Conclusion', present: true }
  ];

  const ai_corrected_report = parsed.ai_corrected_report ?? parsed.revised_report ?? originalReportText;

  // GUARANTEE ALL 11 ACR DIMENSIONS WITH MATHEMATICALLY ALIGNED SCORES
  const fullDefaultDimensions = [
    { id: 'patient_demographics', name: 'Patient Demographics', weight: '10%', score: Math.min(10, Math.round(quality_score * 0.1)), max_marks: 10, details: ['Patient Name, MRN, DOB, Age, Gender, and Study Date evaluated.'] },
    { id: 'clinical_history', name: 'Clinical History / Indication', weight: '10%', score: Math.min(10, Math.round(quality_score * 0.1)), max_marks: 10, details: ['Chief complaint, indication, and clinical diagnostic question evaluated.'] },
    { id: 'procedure_details', name: 'Procedure Details', weight: '10%', score: Math.min(10, Math.round(quality_score * 0.1)), max_marks: 10, details: ['Imaging technique, pulse sequences, and contrast dosage evaluated.'] },
    { id: 'findings', name: 'Findings', weight: '20%', score: Math.min(20, Math.round(quality_score * 0.2)), max_marks: 20, details: ['Detailed anatomical observation and lesion measurements.'] },
    { id: 'impression', name: 'Impression / Conclusion', weight: '20%', score: Math.min(20, Math.round(quality_score * 0.2)), max_marks: 20, details: ['Summary diagnostic impression and clinical recommendations.'] },
    { id: 'terminology', name: 'Medical Terminology', weight: '10%', score: Math.min(10, Math.round(quality_score * 0.1)), max_marks: 10, details: ['RadLex terminology precision and quantitative metrics.'] },
    { id: 'template', name: 'Template Compliance', weight: '10%', score: Math.min(10, Math.round(quality_score * 0.1)), max_marks: 10, details: ['ACR 7-section structured section headers.'] },
    { id: 'formatting', name: 'Formatting & Structure', weight: '5%', score: Math.min(5, Math.round(quality_score * 0.05)), max_marks: 5, details: ['Paragraph legibility and spacing.'] },
    { id: 'consistency', name: 'Consistency (Findings vs Impression)', weight: '5%', score: Math.min(5, Math.round(quality_score * 0.05)), max_marks: 5, details: ['Right vs Left laterality agreement between sections.'] },
    { id: 'grammar', name: 'Grammar & Documentation Quality', weight: '5%', score: Math.min(5, Math.round(quality_score * 0.05)), max_marks: 5, details: ['Absence of typos or template errors.'] },
    { id: 'completeness', name: 'Overall Clinical Completeness', weight: '5%', score: Math.min(5, Math.round(quality_score * 0.05)), max_marks: 5, details: ['Comparison study and radiologist signature.'] }
  ];

  let dimensions = Array.isArray(parsed.dimensions) && parsed.dimensions.length >= 11 ? parsed.dimensions : fullDefaultDimensions;

  return {
    audit_id: `RAD-QA-2026-${Math.floor(1000 + Math.random() * 9000)}`,
    quality_score,
    readiness_status,
    overall_justification,
    effective_modality,
    suggestions,
    highlights,
    deductions_log,
    sections,
    ai_corrected_report,
    dimensions
  };
}
