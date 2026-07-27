import React, { useState } from 'react';
import { Lock, Sliders, Activity, Save, RotateCcw, CheckCircle2 } from 'lucide-react';

const DEFAULT_PROMPT = `You are a Senior Radiologist and Clinical QA Auditor. Evaluate the radiology report across 5 dimensions: Completeness, Medical Terminology, Clinical Alignment, Formatting, and Impression Quality. Provide scores out of 100 and actionable suggestions.`;

export default function AdminPage() {
  const [prompt, setPrompt] = useState(DEFAULT_PROMPT);
  const [saved, setSaved] = useState(false);

  const handleSave = () => { setSaved(true); setTimeout(() => setSaved(false), 2500); };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '36px' }}>

      {/* Page Title */}
      <div>
        <h1 style={{ fontSize: '22px', fontWeight: 900, color: '#0F172A', margin: 0, letterSpacing: '-0.5px' }}>
          Admin & AI Evaluator Portal
        </h1>
        <p style={{ fontSize: '13px', color: '#64748B', margin: '4px 0 0' }}>
          Tune system evaluator prompts, inspect engine health, and monitor LLM latency
        </p>
      </div>

      {/* Two-col layout — no containers */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: '48px' }}>

        {/* Prompt Editor */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '2px solid #E2E8F0', paddingBottom: '12px', marginBottom: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Sliders size={16} color="#0284C7" />
              <h2 style={{ fontSize: '14px', fontWeight: 800, color: '#0F172A', margin: 0 }}>AI Evaluator System Prompt</h2>
            </div>
            {saved && (
              <span style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '12px', fontWeight: 700, color: '#059669' }}>
                <CheckCircle2 size={13} /> Saved!
              </span>
            )}
          </div>

          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            rows={12}
            style={{
              width: '100%', padding: '14px',
              background: '#FAFBFC', border: '1px solid #E2E8F0',
              borderRadius: '8px', fontSize: '13px', color: '#334155',
              fontFamily: "'Inter', sans-serif", lineHeight: 1.8,
              outline: 'none', resize: 'vertical', transition: 'border-color 0.2s'
            }}
            onFocus={e => e.target.style.borderColor = '#0284C7'}
            onBlur={e => e.target.style.borderColor = '#E2E8F0'}
          />

          <div style={{ display: 'flex', gap: '10px', marginTop: '14px' }}>
            <button
              onClick={handleSave}
              style={{
                display: 'flex', alignItems: 'center', gap: '6px',
                background: 'linear-gradient(135deg, #0284C7, #0D9488)', color: '#fff',
                fontWeight: 700, fontSize: '13px', padding: '10px 20px',
                borderRadius: '8px', border: 'none', cursor: 'pointer',
                boxShadow: '0 2px 10px rgba(2,132,199,0.3)'
              }}
            >
              <Save size={13} /> Save Prompt
            </button>
            <button
              onClick={() => setPrompt(DEFAULT_PROMPT)}
              style={{
                display: 'flex', alignItems: 'center', gap: '6px',
                background: 'none', color: '#64748B',
                fontWeight: 700, fontSize: '13px', padding: '10px 18px',
                borderRadius: '8px', border: '1px solid #E2E8F0', cursor: 'pointer'
              }}
            >
              <RotateCcw size={13} /> Reset Default
            </button>
          </div>
        </div>

        {/* Engine Health — flat list */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', borderBottom: '2px solid #E2E8F0', paddingBottom: '12px', marginBottom: '20px' }}>
            <Activity size={16} color="#0D9488" />
            <h2 style={{ fontSize: '14px', fontWeight: 800, color: '#0F172A', margin: 0 }}>Engine Health</h2>
          </div>
          {[
            { label: 'Groq API Engine', value: 'Connected (380ms)', ok: true },
            { label: 'OpenAI GPT-4o', value: 'Connected (510ms)', ok: true },
            { label: 'PDF Generator', value: 'ReportLab v4.0', ok: true },
            { label: 'Session Cache', value: 'Operational', ok: true },
          ].map((item, i) => (
            <div key={i} style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '12px 0', borderBottom: '1px solid #F8FAFC'
            }}>
              <span style={{ fontSize: '13px', fontWeight: 600, color: '#334155' }}>{item.label}</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', fontWeight: 700, color: item.ok ? '#059669' : '#DC2626' }}>
                <span style={{
                  width: '7px', height: '7px', borderRadius: '50%',
                  background: item.ok ? '#10B981' : '#EF4444',
                  boxShadow: item.ok ? '0 0 5px #10B981' : '0 0 5px #EF4444'
                }} />
                {item.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
