/**
 * Client-side Direct AI Audit Engine (Groq / Gemini API)
 * Fallback when Python Flask backend is offline or app is hosted on static pages (GitHub Pages).
 */

export async function directGroqAudit({ report_text, modality, mandatory_sections, provider = 'groq', api_key = '' }) {
  const key = api_key || localStorage.getItem(`${provider}_api_key`) || localStorage.getItem('groq_api_key') || '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';

  const systemPrompt = `You are a Senior Radiology Quality Assurance Officer and ACR Audit Specialist.
Analyze the following radiology report and evaluate its quality.
Return ONLY a raw JSON object with NO markdown formatting, NO backticks, NO extra text.

JSON Schema:
{
  "overall_score": 85,
  "readiness": "Ready for Sign-off" | "Minor Revision Needed" | "Major Revision Required",
  "score_breakdown": {
    "Patient Demographics": 10,
    "Clinical History": 10,
    "Procedure Details": 10,
    "Findings Section": 20,
    "Impression Section": 20,
    "Comparison Study": 5,
    "Recommendations": 5,
    "Critical Findings": 10,
    "Signature & Date": 5,
    "Dose / Safety": 5
  },
  "score_justification": "Detailed explanation of scoring.",
  "strengths": ["Strength 1", "Strength 2"],
  "section_checklist": [
    { "name": "Patient Demographics", "present": true, "details": "Found patient name, MRN, study date" }
  ],
  "highlights": [
    { "type": "missing" | "vague" | "formatting" | "terminology", "text": "matched phrase", "explanation": "Why flagged", "suggestion": "Fix" }
  ],
  "suggested_improvements": [
    { "category": "Missing Information", "text": "Suggestion detail" }
  ],
  "acr_template_adherence": 90,
  "terminology_precision": 88,
  "revised_report": "Complete corrected report in ACR standard format"
}`;

  const userPrompt = `Modality: ${modality || 'Chest X-Ray'}
Mandatory Sections: ${mandatory_sections ? mandatory_sections.join(', ') : 'None specified'}

Radiology Report Text:
"""
${report_text}
"""`;

  if (provider === 'groq') {
    const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${key}`
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
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
      throw new Error(err.error?.message || `Groq API returned error ${res.status}`);
    }

    const data = await res.json();
    const content = data.choices[0]?.message?.content || '{}';
    return JSON.parse(content);
  }

  throw new Error('Unsupported direct provider');
}
