import React, { useState } from 'react';
import { Lightbulb, Copy, Check, AlertTriangle, FileCheck2, FileText, ChevronDown, ChevronUp, Sparkles, MessageSquare, Shield, BarChart3 } from 'lucide-react';

export default function SuggestionsPage({ auditResult, reportText, setReportText, setActivePage }) {
  const [copiedIdx, setCopiedIdx] = useState(null);
  const [showOriginalReport, setShowOriginalReport] = useState(false);
  const [appliedIdx, setAppliedIdx] = useState(null);

  if (!auditResult) {
    return (
      <div style={{ maxWidth: '620px', padding: '24px 0' }}>
        <h1 style={{ fontSize: '22px', fontWeight: 900, color: 'var(--text-primary)', margin: 0 }}>No suggestions yet</h1>
        <p style={{ fontSize: '14px', color: 'var(--text-muted)', lineHeight: 1.6, margin: '10px 0 18px' }}>
          Run a report audit to generate suggestions based on the report you uploaded.
        </p>
        <button onClick={() => setActivePage('upload')} className="btn-primary">
          Upload Report & Run Audit
        </button>
      </div>
    );
  }

  const suggestions = auditResult.suggestions || [];
  const fullOriginalText = reportText || auditResult.ai_corrected_report || 'No original report text available.';

  const handleCopy = (text, idx) => {
    navigator.clipboard.writeText(text);
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(null), 2000);
  };

  const handleApplyRevision = (recommendationText, idx) => {
    if (setReportText) {
      setReportText((prev) => prev ? `${prev}\n\n[REVISED RECOMMENDATION]:\n${recommendationText}` : recommendationText);
      setAppliedIdx(idx);
      setTimeout(() => setAppliedIdx(null), 2000);
    }
  };

  const getScopeBadgeColor = (scope) => {
    if (!scope) return { bg: '#F1F5F9', text: '#475569', border: '#CBD5E1' };
    if (scope.includes('Missing') || scope.includes('Add')) return { bg: '#FEE2E2', text: '#991B1B', border: '#FCA5A5' };
    if (scope.includes('Terminology') || scope.includes('Wording')) return { bg: '#FEF3C7', text: '#B45309', border: '#FDE68A' };
    if (scope.includes('Laterality') || scope.includes('Contradiction')) return { bg: '#FFEDD5', text: '#C2410C', border: '#FDBA74' };
    return { bg: '#E0F2FE', text: '#0369A1', border: '#BAE6FD' };
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>

      {/* Page Title Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid var(--border)', paddingBottom: '16px' }}>
        <div>
          <h1 style={{ fontSize: '22px', fontWeight: 900, color: 'var(--text-primary)', margin: 0, letterSpacing: '-0.5px' }}>
            AI Clinical Suggestions & Revision Scope
          </h1>
          <p style={{ fontSize: '13px', color: 'var(--text-muted)', margin: '4px 0 0' }}>
            Actionable recommendations, QA Officer remarks, and original report context comparison
          </p>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            onClick={() => setShowOriginalReport(!showOriginalReport)}
            className="btn-secondary"
            style={{ fontSize: '12px', padding: '8px 14px' }}
          >
            <FileText size={14} /> {showOriginalReport ? 'Hide Original Report' : 'View Full Original Report'}
          </button>
          <button
            onClick={() => setActivePage('quality')}
            className="btn-primary"
            style={{ fontSize: '12px', padding: '8px 16px' }}
          >
            <BarChart3 size={14} /> View Quality Breakdown →
          </button>
        </div>
      </div>

      {/* Collapsible Original Report Context Viewer */}
      {showOriginalReport && (
        <div className="enterprise-card" style={{ padding: '0', overflow: 'hidden', borderLeft: '4px solid #0284C7' }}>
          <div style={{ padding: '12px 18px', background: '#F0F9FF', borderBottom: '1px solid #BAE6FD', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '12.5px', fontWeight: 800, color: '#0369A1', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <FileText size={15} /> Full Original Uploaded Report Context
            </span>
            <span style={{ fontSize: '11px', color: '#0284C7', fontWeight: 600 }}>
              Audit Ref: {auditResult.audit_id || 'RAD-QA-2026'}
            </span>
          </div>

          <div style={{
            padding: '20px', fontFamily: 'monospace', fontSize: '12.5px', lineHeight: 1.8,
            background: 'var(--surface)', color: 'var(--text-primary)', whiteSpace: 'pre-wrap',
            maxHeight: '350px', overflowY: 'auto'
          }}>
            {fullOriginalText}
          </div>
        </div>
      )}

      {/* Suggestion Cards List */}
      {suggestions.length === 0 ? (
        <div className="enterprise-card" style={{ textAlign: 'center', padding: '36px', color: 'var(--text-muted)' }}>
          <Check size={32} color="#16A34A" style={{ marginBottom: '8px' }} />
          <div style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text-primary)' }}>Full ACR Compliance Achieved</div>
          <div style={{ fontSize: '12px', marginTop: '4px' }}>No quality defects or revisions were flagged by the QA Officer.</div>
        </div>
      ) : (
        suggestions.map((s, idx) => {
          const scopeBadge = getScopeBadgeColor(s.scope_of_correction);
          return (
            <div
              key={idx}
              className="enterprise-card"
              style={{
                padding: '22px', border: '1px solid var(--border)', borderRadius: '12px',
                display: 'flex', flexDirection: 'column', gap: '16px', background: 'var(--surface)'
              }}
            >
              {/* Suggestion Header Row */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                  <span style={{ fontSize: '12px', fontWeight: 900, color: 'var(--text-muted)' }}>#{idx + 1}</span>
                  
                  {/* Category Badge */}
                  <span style={{
                    fontSize: '11px', fontWeight: 700, color: 'var(--text-secondary)',
                    background: 'var(--surface-muted)', border: '1px solid var(--border)',
                    padding: '3px 10px', borderRadius: '20px', textTransform: 'uppercase', letterSpacing: '0.3px'
                  }}>
                    {s.category}
                  </span>

                  {/* Priority Badge */}
                  <span style={{
                    fontSize: '11px', fontWeight: 700, padding: '3px 10px', borderRadius: '20px',
                    background: s.severity === 'High' ? '#FEF2F2' : '#FFF7ED',
                    color: s.severity === 'High' ? '#DC2626' : '#D97706',
                    border: `1px solid ${s.severity === 'High' ? '#FECACA' : '#FED7AA'}`
                  }}>
                    {s.severity} Priority
                  </span>

                  {/* Scope of Correction Badge */}
                  <span style={{
                    fontSize: '11px', fontWeight: 800, padding: '3px 10px', borderRadius: '20px',
                    background: scopeBadge.bg, color: scopeBadge.text, border: `1px solid ${scopeBadge.border}`
                  }}>
                    Scope: {s.scope_of_correction || 'Content Revision'}
                  </span>
                </div>

                <div style={{ display: 'flex', gap: '8px' }}>
                  <button
                    onClick={() => handleCopy(s.recommended, idx)}
                    style={{
                      display: 'flex', alignItems: 'center', gap: '4px',
                      fontSize: '11px', fontWeight: 700, padding: '5px 10px',
                      borderRadius: '6px', background: 'var(--surface-muted)',
                      border: '1px solid var(--border)', color: 'var(--text-primary)', cursor: 'pointer'
                    }}
                  >
                    {copiedIdx === idx ? <><Check size={12} color="#16A34A" /> Copied!</> : <><Copy size={12} /> Copy Revision</>}
                  </button>
                  {setReportText && (
                    <button
                      onClick={() => handleApplyRevision(s.recommended, idx)}
                      style={{
                        display: 'flex', alignItems: 'center', gap: '4px',
                        fontSize: '11px', fontWeight: 700, padding: '5px 12px',
                        borderRadius: '6px', background: '#0284C7',
                        border: 'none', color: '#ffffff', cursor: 'pointer'
                      }}
                    >
                      {appliedIdx === idx ? <><Check size={12} /> Applied to Editor!</> : <><Sparkles size={12} /> Apply to Editor</>}
                    </button>
                  )}
                </div>
              </div>

              {/* Finding Title */}
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', background: 'var(--surface-muted)', padding: '12px 14px', borderRadius: '8px' }}>
                <AlertTriangle size={17} color="#D97706" style={{ flexShrink: 0, marginTop: '2px' }} />
                <span style={{ fontSize: '13.5px', fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1.5 }}>
                  {s.finding}
                </span>
              </div>

              {/* Senior QA Officer Remarks Box */}
              {s.remarks && (
                <div style={{ background: '#F8FAFC', borderLeft: '3px solid #64748B', padding: '10px 14px', borderRadius: '0 6px 6px 0', display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                  <MessageSquare size={15} color="#475569" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <div>
                    <div style={{ fontSize: '10.5px', fontWeight: 800, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.4px' }}>
                      Senior QA Officer Audit Remarks:
                    </div>
                    <div style={{ fontSize: '12px', color: '#334155', marginTop: '2px', lineHeight: 1.5, fontWeight: 500 }}>
                      {s.remarks}
                    </div>
                  </div>
                </div>
              )}

              {/* Original Text vs Recommended Revision Side-by-Side */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                {/* Original Text Box */}
                <div>
                  <div style={{ fontSize: '10px', fontWeight: 800, color: '#DC2626', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '6px' }}>
                    Original Report Text:
                  </div>
                  <div style={{
                    fontSize: '12.5px', color: '#7F1D1D', lineHeight: 1.7, fontStyle: 'italic',
                    padding: '12px 14px', background: '#FEF2F2', borderLeft: '3px solid #DC2626',
                    borderRadius: '0 6px 6px 0', fontFamily: 'monospace', minHeight: '80px', whiteSpace: 'pre-wrap'
                  }}>
                    {s.original && s.original !== 'N/A' ? s.original : fullOriginalText.substring(0, 180) + '...'}
                  </div>
                </div>

                {/* Recommended Revision Box */}
                <div>
                  <div style={{ fontSize: '10px', fontWeight: 800, color: '#059669', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '6px' }}>
                    Recommended ACR Revision:
                  </div>
                  <div style={{
                    fontSize: '12.5px', color: '#065F46', lineHeight: 1.7, fontWeight: 600,
                    padding: '12px 14px', background: '#ECFDF5', borderLeft: '3px solid #059669',
                    borderRadius: '0 6px 6px 0', fontFamily: 'monospace', minHeight: '80px', whiteSpace: 'pre-wrap'
                  }}>
                    {s.recommended}
                  </div>
                </div>
              </div>

              {/* Clinical Rationale */}
              <div style={{ fontSize: '12.5px', color: 'var(--text-secondary)', lineHeight: 1.6, paddingTop: '8px', borderTop: '1px solid var(--border)' }}>
                <strong style={{ color: 'var(--text-primary)' }}>📋 Clinical Rationale:</strong> {s.rationale}
              </div>

            </div>
          );
        })
      )}

    </div>
  );
}
