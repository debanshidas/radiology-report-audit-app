import React, { useState } from 'react';
import { Lightbulb, Copy, Check, AlertTriangle, FileCheck2 } from 'lucide-react';

export default function SuggestionsPage({ auditResult, setActivePage }) {
  const [copiedIdx, setCopiedIdx] = useState(null);
  if (!auditResult) {
    return (
      <div style={{ maxWidth: '620px', padding: '24px 0' }}>
        <h1 style={{ fontSize: '22px', fontWeight: 900, color: '#0F172A', margin: 0 }}>No suggestions yet</h1>
        <p style={{ fontSize: '14px', color: '#64748B', lineHeight: 1.6, margin: '10px 0 18px' }}>
          Run a report audit to generate suggestions based on the report you uploaded.
        </p>
        <button onClick={() => setActivePage('upload')} style={{ background: 'linear-gradient(135deg, #0284C7, #0D9488)', color: '#fff', fontWeight: 700, fontSize: '13px', padding: '10px 18px', borderRadius: '8px', border: 'none', cursor: 'pointer' }}>
          Upload Report
        </button>
      </div>
    );
  }

  const suggestions = auditResult.suggestions;

  const handleCopy = (text, idx) => {
    navigator.clipboard.writeText(text);
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(null), 2000);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>

      {/* Page Title */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <h1 style={{ fontSize: '22px', fontWeight: 900, color: '#0F172A', margin: 0, letterSpacing: '-0.5px' }}>
            AI Clinical Suggestions
          </h1>
          <p style={{ fontSize: '13px', color: '#64748B', margin: '4px 0 0' }}>
            Specific recommendations for findings-impression alignment, RadLex terminology, and formatting
          </p>
        </div>
        <button
          onClick={() => setActivePage('report')}
          style={{
            display: 'flex', alignItems: 'center', gap: '6px',
            background: 'linear-gradient(135deg, #0284C7, #0D9488)', color: '#fff',
            fontWeight: 700, fontSize: '12px', padding: '10px 18px',
            borderRadius: '8px', border: 'none', cursor: 'pointer',
            boxShadow: '0 2px 10px rgba(2,132,199,0.3)'
          }}
        >
          <FileCheck2 size={14} /> Generate Report →
        </button>
      </div>

      {/* Suggestion Items — flat sections separated by dividers */}
      {suggestions.map((s, idx) => (
        <div key={idx} style={{ paddingBottom: '36px', borderBottom: idx < suggestions.length - 1 ? '1px solid #E2E8F0' : 'none' }}>

          {/* Suggestion header */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
            <span style={{ fontSize: '11px', fontWeight: 700, color: '#94A3B8' }}>#{idx + 1}</span>
            <span style={{
              fontSize: '11px', fontWeight: 700, color: '#475569',
              background: '#F1F5F9', border: '1px solid #E2E8F0',
              padding: '3px 10px', borderRadius: '20px', textTransform: 'uppercase', letterSpacing: '0.3px'
            }}>{s.category}</span>
            <span style={{
              fontSize: '11px', fontWeight: 700, padding: '3px 10px', borderRadius: '20px',
              background: s.severity === 'High' ? '#FEF2F2' : '#FFF7ED',
              color: s.severity === 'High' ? '#DC2626' : '#D97706',
              border: `1px solid ${s.severity === 'High' ? '#FECACA' : '#FED7AA'}`
            }}>
              {s.severity} Priority
            </span>
          </div>

          {/* Issue */}
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', marginBottom: '18px' }}>
            <AlertTriangle size={16} color="#D97706" style={{ flexShrink: 0, marginTop: '1px' }} />
            <span style={{ fontSize: '14px', fontWeight: 600, color: '#334155', lineHeight: 1.6 }}>{s.finding}</span>
          </div>

          {/* Before / After — two-col, flat background strips */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
            <div>
              <div style={{ fontSize: '10px', fontWeight: 800, color: '#DC2626', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '8px' }}>
                Original Text
              </div>
              <div style={{ fontSize: '13px', color: '#7F1D1D', lineHeight: 1.7, fontStyle: 'italic', padding: '12px 14px', background: '#FEF2F2', borderLeft: '3px solid #DC2626', borderRadius: '0 6px 6px 0' }}>
                {s.original}
              </div>
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                <div style={{ fontSize: '10px', fontWeight: 800, color: '#059669', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  Recommended Revision
                </div>
                <button
                  onClick={() => handleCopy(s.recommended, idx)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '4px',
                    fontSize: '10px', fontWeight: 700, color: '#059669',
                    background: 'none', border: 'none', cursor: 'pointer'
                  }}
                >
                  {copiedIdx === idx ? <><Check size={11} /> Copied!</> : <><Copy size={11} /> Copy</>}
                </button>
              </div>
              <div style={{ fontSize: '13px', color: '#065F46', lineHeight: 1.7, fontWeight: 600, padding: '12px 14px', background: '#ECFDF5', borderLeft: '3px solid #059669', borderRadius: '0 6px 6px 0' }}>
                {s.recommended}
              </div>
            </div>
          </div>

          {/* Rationale — plain text */}
          <p style={{ fontSize: '13px', color: '#475569', lineHeight: 1.7, margin: 0 }}>
            <strong style={{ color: '#0F172A' }}>📋 Clinical Rationale:</strong> {s.rationale}
          </p>
        </div>
      ))}
    </div>
  );
}
