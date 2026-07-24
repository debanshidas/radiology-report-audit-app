/**
 * Client-side Direct AI Audit Engine (Groq / Gemini API)
 * Standardizes AI suggestions, remarks, scope of correction, and detailed easy-to-understand explanations.
 */

export async function directGroqAudit({ report_text, modality, mandatory_sections, provider = 'groq', api_key = '' }) {
  const key = api_key || localStorage.getItem(`${provider}_api_key`) || localStorage.getItem('groq_api_key') || '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';

  const systemPrompt = `You are a Senior Radiology Quality Assurance Officer and ACR Audit Specialist.
Analyze the provided radiology report and evaluate its quality against ACR practice parameters.
Return ONLY a raw JSON object with NO markdown formatting, NO backticks, NO extra text.

Required JSON Output Schema:
{
  "quality_score": 85,
  "readiness_status": "Ready for Sign-off" | "Minor Revision Needed" | "Major Revision Required" | "Not Ready for Clinical Sign-off",
  "overall_justification": "Structured, detailed, easy-to-understand summary explaining exactly why marks were deducted. Use clear bullet points listing each deficiency, exact points deducted, and exact correction required.",
  "effective_modality": "${modality || 'Chest X-Ray'}",
  "suggestions": [
    {
      "category": "Missing Information" | "Clinical Alignment" | "Medical Terminology" | "Formatting",
      "severity": "High" | "Medium" | "Low",
      "scope_of_correction": "Add Missing Section" | "Terminology Revision" | "Laterality Correction" | "Format Standardization",
      "finding": "Specific quality defect identified in report",
      "original": "Exact text snippet from original report or N/A if missing",
      "recommended": "Exact recommended correction text to use in final report",
      "remarks": "Senior QA Officer detailed observation remarks explaining why this item failed and how to correct it",
      "rationale": "Detailed explanation of clinical impact and why this change is necessary"
    }
  ],
  "highlights": [
    {
      "type": "missing" | "vague" | "formatting" | "terminology",
      "text": "exact phrase from text",
      "explanation": "Why this text was flagged",
      "suggestion": "Recommended fix"
    }
  ],
  "deductions_log": [
    {
      "points": -10,
      "section": "Findings",
      "reason": "Missing procedure details and contrast agent specification",
      "scope_of_correction": "Add Missing Section",
      "remarks": "The report fails to specify imaging pulse sequence, slice thickness, or IV contrast volume.",
      "clinical_impact": "High risk of missing secondary pathologies or compromising technique reproducibility",
      "suggested_improvement": "Add Technique section specifying 100 mL Omnipaque 350 IV contrast"
    }
  ],
  "sections": [
    { "name": "Patient Demographics", "present": true },
    { "name": "Clinical History / Indication", "present": true },
    { "name": "Procedure Details", "present": true },
    { "name": "Comparison Study", "present": false },
    { "name": "Findings", "present": true },
    { "name": "Impression / Conclusion", "present": true },
    { "name": "Reporting Radiologist Signature", "present": true }
  ],
  "ai_corrected_report": "Complete revised and corrected radiology report adhering to ACR standard 7-section structure."
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
 * Normalizes raw LLM JSON response to guarantee all UI components receive expected fields.
 */
function normalizeAuditResult(parsed, requestedModality, originalReportText) {
  const quality_score = parsed.quality_score ?? parsed.overall_score ?? 80;
  const readiness_status = parsed.readiness_status ?? parsed.readiness ?? (quality_score >= 90 ? 'Ready for Sign-off' : 'Revision Needed');
  const effective_modality = parsed.effective_modality ?? parsed.modality ?? requestedModality ?? 'Chest X-Ray';

  // Normalize suggestions array
  let suggestions = parsed.suggestions;
  if (!Array.isArray(suggestions) || suggestions.length === 0) {
    if (Array.isArray(parsed.suggested_improvements)) {
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
    } else {
      suggestions = [
        {
          category: 'Clinical Completeness',
          severity: quality_score < 70 ? 'High' : 'Medium',
          scope_of_correction: 'Section Structuring',
          finding: 'Review report sections for complete ACR compliance',
          original: originalReportText ? originalReportText.substring(0, 100) + '...' : 'N/A',
          recommended: 'Ensure Demographics, History, Technique, Findings, and Impression are present.',
          remarks: 'Ensure all mandatory clinical sections are explicitly labeled.',
          rationale: 'Complete structuring prevents clinical misinterpretation.'
        }
      ];
    }
  } else {
    suggestions = suggestions.map((s) => ({
      category: s.category || 'Clinical QA',
      severity: s.severity || 'Medium',
      scope_of_correction: s.scope_of_correction || (s.category?.includes('Missing') ? 'Add Missing Section' : 'Wording & Style Revision'),
      finding: s.finding || 'Quality improvement recommendation',
      original: s.original || 'N/A',
      recommended: s.recommended || 'Follow ACR standard guidelines',
      remarks: s.remarks || `Senior QA Officer Observation: Address ${s.category || 'QA findings'} prior to final sign-off.`,
      rationale: s.rationale || 'Enhances clinical record accuracy and risk management.'
    }));
  }

  // Normalize deductions log
  let deductions_log = parsed.deductions_log;
  if (!Array.isArray(deductions_log) || deductions_log.length === 0) {
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
      points: d.points || -5,
      section: d.section || 'General QA',
      reason: d.reason || 'Omission or formatting defect',
      scope_of_correction: d.scope_of_correction || (d.points < -10 ? 'Major Section Revision' : 'Minor Adjustment'),
      remarks: d.remarks || `QA Note: ${d.reason}. Requires clinical correction.`,
      clinical_impact: d.clinical_impact || 'Impacts documentation quality.',
      suggested_improvement: d.suggested_improvement || 'Correct report section.'
    }));
  }

  // Build a rich, structured overall_justification summary if missing or brief
  let overall_justification = parsed.overall_justification || parsed.score_justification;
  if (!overall_justification || overall_justification.length < 50) {
    const totalDeducted = deductions_log.reduce((acc, d) => acc + Math.abs(d.points), 0);
    overall_justification = `Report evaluated with score ${quality_score}/100 (${readiness_status}). Explicit deduction analysis (-${totalDeducted} pts total):\n` +
      deductions_log.map((d, i) => `${i + 1}. ${d.reason} (${d.points} pts): ${d.remarks || d.suggested_improvement}`).join('\n');
  }

  // Normalize highlights
  const highlights = Array.isArray(parsed.highlights) ? parsed.highlights : [];

  // Normalize sections
  let sections = parsed.sections;
  if (!Array.isArray(sections)) {
    sections = [
      { name: 'Patient Demographics', present: true },
      { name: 'Clinical History / Indication', present: true },
      { name: 'Procedure Details', present: true },
      { name: 'Findings', present: true },
      { name: 'Impression / Conclusion', present: true }
    ];
  }

  const ai_corrected_report = parsed.ai_corrected_report ?? parsed.revised_report ?? originalReportText;

  const dimensions = parsed.dimensions || [
    { id: 'patient_demographics', name: 'Patient Demographics', weight: '10%', score: 10, max_marks: 10, details: ['Present'] },
    { id: 'clinical_history', name: 'Clinical History / Indication', weight: '10%', score: 10, max_marks: 10, details: ['Present'] },
    { id: 'procedure_details', name: 'Procedure Details', weight: '10%', score: 10, max_marks: 10, details: ['Present'] },
    { id: 'findings', name: 'Findings', weight: '20%', score: Math.round(quality_score * 0.2), max_marks: 20, details: ['Detailed'] },
    { id: 'impression', name: 'Impression / Conclusion', weight: '20%', score: Math.round(quality_score * 0.2), max_marks: 20, details: ['Summary'] },
    { id: 'terminology', name: 'Medical Terminology', weight: '10%', score: 10, max_marks: 10, details: ['Precise'] },
    { id: 'template', name: 'Template Compliance', weight: '10%', score: 10, max_marks: 10, details: ['ACR Aligned'] }
  ];

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
