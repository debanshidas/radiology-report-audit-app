/**
 * Client-side Direct AI Audit Engine (Groq / Gemini API)
 * Features multi-model fallback (e.g. llama-3.1-8b-instant if 70b is blocked at project level).
 */

export async function directGroqAudit({ report_text, modality, mandatory_sections, provider = 'groq', api_key = '' }) {
  const key = api_key || localStorage.getItem(`${provider}_api_key`) || localStorage.getItem('groq_api_key') || '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';

  const systemPrompt = `You are a Senior Radiology Quality Assurance Officer and ACR Audit Specialist.
Analyze the following radiology report and evaluate its quality.
Return ONLY a raw JSON object with NO markdown formatting, NO backticks, NO extra text.

JSON Schema:
{
  "overall_score": 85,
  "readiness": "Ready for Sign-off",
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
    { "type": "missing", "text": "matched phrase", "explanation": "Why flagged", "suggestion": "Fix" }
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
    // Model fallback sequence in case 70B is blocked at project limits
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
          // If model is blocked or not found, continue to next model in list
          continue;
        }

        const data = await res.json();
        const content = data.choices[0]?.message?.content || '{}';
        return JSON.parse(content);
      } catch (err) {
        lastError = err.message;
      }
    }

    throw new Error(lastError || 'Failed to connect to Groq API. Please check your model limits or API key.');
  }

  throw new Error('Unsupported direct provider');
}
