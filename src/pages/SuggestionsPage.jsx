import React, { useState } from 'react';
import { Lightbulb, Copy, Check, AlertTriangle, FileCheck2, FileText, ChevronDown, ChevronUp, Sparkles, MessageSquare, Shield, BarChart3 } from 'lucide-react';
import AICautionNotice from '../components/AICautionNotice';

export default function SuggestionsPage({ auditResult, reportText, setReportText, setActivePage }) {
  const [copiedIdx, setCopiedIdx] = useState(null);
  const [appliedIdx, setAppliedIdx] = useState(null);
  const [showOriginalReport, setShowOriginalReport] = useState(false);

  if (!auditResult) {
    return (
      <div className="medicare-card" style={{ maxWidth: '520px' }}>
        <h2 style={{ fontSize: '15px', fontWeight: 800, color: '#2C4964', margin: 0 }}>No Active Audit Result</h2>
        <p style={{ fontSize: '12px', color: '#6C757D', margin: '6px 0 14px' }}>
          Upload a radiology report to view AI recommendations and scope of correction.
        </p>
        <button onClick={() => setActivePage('upload')} className="btn-medicare-primary">
          Run Report Audit →
        </button>
      </div>
    );
  }

  const suggestions = auditResult.suggestions || [];
  const effectiveOriginalText = reportText || auditResult.original_report_text || auditResult.report_text || 'No original report text available.';

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
    if (!scope) return { bg: '#F1F7FC', text: '#2C4964', border: '#DDE7F0' };
    if (scope.includes('Missing') || scope.includes('Add')) return { bg: '#FFEBEE', text: '#D32F2F', border: '#FFCDD2' };
    if (scope.includes('Terminology') || scope.includes('Wording')) return { bg: '#FFF8E1', text: '#B45309', border: '#FDE68A' };
    if (scope.includes('Laterality') || scope.includes('Contradiction')) return { bg: '#FFEDD5', text: '#C2410C', border: '#FDBA74' };
    return { bg: '#E8F8F8', text: '#3FBBC0', border: '#99F6E4' };
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>

      {/* Page Title Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #DDE7F0', paddingBottom: '16px' }}>
        <div>
          <h1 style={{ fontSize: '20px', fontWeight: 800, color: '#2C4964', margin: 0, letterSpacing: '-0.5px' }}>
            AI Clinical Suggestions & Scope of Correction
          </h1>
          <p style={{ fontSize: '12.5px', color: '#6C757D', margin: '4px 0 0' }}>
            Actionable recommendations, Senior QA Officer remarks, and original report context comparison
          </p>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            onClick={() => setShowOriginalReport(!showOriginalReport)}
            className="btn-medicare-teal"
            style={{ fontSize: '12px', padding: '8px 14px' }}
          >
            <FileText size={14} /> {showOriginalReport ? 'Hide Original Report' : 'View Full Original Report'}
          </button>
          <button
            onClick={() => setActivePage('quality')}
            className="btn-medicare-primary"
            style={{ fontSize: '12px', padding: '8px 16px' }}
          >
            <BarChart3 size={14} /> View Quality Breakdown →
          </button>
        </div>
      </div>

      {/* Collapsible Original Report Context Viewer */}
      {showOriginalReport && (
        <div className="medicare-card" style={{ padding: '0', overflow: 'hidden', borderLeft: '4px solid #1977CC' }}>
          <div style={{ padding: '12px 18px', background: '#EBF5FF', borderBottom: '1px solid #BAE6FD', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '12.5px', fontWeight: 800, color: '#1977CC', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <FileText size={15} /> Full Original Uploaded Report Context
            </span>
            <span style={{ fontSize: '11px', color: '#1977CC', fontWeight: 600 }}>
              Audit Ref: {auditResult.audit_id || 'RAD-QA-2026'}
            </span>
          </div>
          <div style={{ padding: '16px 20px', background: '#F8FAFC', maxHeight: '280px', overflowY: 'auto' }}>
            <pre style={{
              margin: 0, fontFamily: 'monospace', fontSize: '12px',
              color: '#2C4964', whiteSpace: 'pre-wrap', lineHeight: 1.6
            }}>
              {effectiveOriginalText}
            </pre>
          </div>
        </div>
      )}

      <AICautionNotice />

      {/* Suggestions List */}
      {suggestions.length === 0 ? (
        <div className="medicare-card" style={{ padding: '32px', textAlign: 'center' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#E8F5E9', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px' }}>
            <Check size={24} color="#15803D" />
          </div>
          <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#2C4964', margin: '0 0 6px' }}>No Deficiencies Flagged!</h3>
          <p style={{ fontSize: '12.5px', color: '#6C757D', margin: 0 }}>
            This radiology report meets all required ACR practice parameters with zero critical score deductions.
          </p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {suggestions.map((item, idx) => {
            const scopeStyle = getScopeBadgeColor(item.scope_of_correction);
            const severityColor = item.severity === 'High' ? '#D32F2F' : item.severity === 'Medium' ? '#B45309' : '#1977CC';

            return (
              <div key={idx} className="medicare-card" style={{ padding: '20px', borderLeft: `4px solid ${severityColor}` }}>
                {/* Card Header Bar */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px', flexWrap: 'wrap', gap: '8px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{
                      fontSize: '10px', fontWeight: 800, padding: '3px 8px', borderRadius: '4px',
                      background: severityColor === '#D32F2F' ? '#FFEBEE' : severityColor === '#B45309' ? '#FFF8E1' : '#EBF5FF',
                      color: severityColor, border: `1px solid ${severityColor}`, textTransform: 'uppercase'
                    }}>
                      {item.severity || 'Medium'} Priority
                    </span>
                    <span style={{ fontSize: '12px', fontWeight: 800, color: '#2C4964' }}>
                      {item.category || 'Clinical QA'}
                    </span>
                  </div>

                  {/* Scope of Correction Badge */}
                  <span style={{
                    fontSize: '10.5px', fontWeight: 800, padding: '3px 10px', borderRadius: '4px',
                    background: scopeStyle.bg, color: scopeStyle.text, border: `1px solid ${scopeStyle.border}`
                  }}>
                    Scope: {item.scope_of_correction || 'Content Revision'}
                  </span>
                </div>

                {/* Finding Title */}
                <h3 style={{ fontSize: '15px', fontWeight: 800, color: '#2C4964', margin: '0 0 12px', lineHeight: 1.4 }}>
                  {item.finding}
                </h3>

                {/* Senior QA Officer Remarks Callout */}
                {item.remarks && (
                  <div style={{
                    background: '#F1F7FC', borderLeft: '3px solid #1977CC',
                    padding: '10px 14px', borderRadius: '4px', marginBottom: '16px', fontSize: '12px'
                  }}>
                    <div style={{ fontSize: '10px', fontWeight: 800, color: '#1977CC', textTransform: 'uppercase', marginBottom: '3px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <MessageSquare size={12} /> Senior QA Officer Observation Remarks:
                    </div>
                    <div style={{ color: '#2C4964', fontStyle: 'italic', fontWeight: 500 }}>
                      "{item.remarks}"
                    </div>
                  </div>
                )}

                {/* Side-by-Side Original vs Recommended Revision Box */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                  {/* Left: Original Text */}
                  <div style={{ background: '#FFEBEE', padding: '12px 14px', borderRadius: '6px', border: '1px solid #FFCDD2' }}>
                    <div style={{ fontSize: '10px', fontWeight: 800, color: '#D32F2F', textTransform: 'uppercase', marginBottom: '4px' }}>
                      Original Defective Text (Upload):
                    </div>
                    <div style={{ fontSize: '12px', color: '#2C4964', fontFamily: 'monospace', lineHeight: 1.5 }}>
                      {item.original || 'N/A or Missing Section'}
                    </div>
                  </div>

                  {/* Right: Recommended Revision */}
                  <div style={{ background: '#E8F5E9', padding: '12px 14px', borderRadius: '6px', border: '1px solid #C8E6C9' }}>
                    <div style={{ fontSize: '10px', fontWeight: 800, color: '#15803D', textTransform: 'uppercase', marginBottom: '4px' }}>
                      ACR Recommended Correction Text:
                    </div>
                    <div style={{ fontSize: '12px', color: '#2C4964', fontFamily: 'monospace', lineHeight: 1.5 }}>
                      {item.recommended}
                    </div>
                  </div>
                </div>

                {/* Clinical Rationale */}
                {item.rationale && (
                  <div style={{ fontSize: '12px', color: '#6C757D', marginBottom: '16px', lineHeight: 1.5 }}>
                    <strong style={{ color: '#2C4964' }}>Clinical Rationale & Impact:</strong> {item.rationale}
                  </div>
                )}

                {/* Card Action Buttons */}
                <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', paddingTop: '12px', borderTop: '1px solid #DDE7F0' }}>
                  <button
                    onClick={() => handleCopy(item.recommended, idx)}
                    className="btn-medicare-outline"
                    style={{ fontSize: '11.5px', padding: '6px 12px' }}
                  >
                    {copiedIdx === idx ? <Check size={13} color="#15803D" /> : <Copy size={13} />}
                    {copiedIdx === idx ? 'Copied to Clipboard' : 'Copy Recommendation'}
                  </button>

                  {setReportText && (
                    <button
                      onClick={() => handleApplyRevision(item.recommended, idx)}
                      className="btn-medicare-primary"
                      style={{ fontSize: '11.5px', padding: '6px 14px' }}
                    >
                      {appliedIdx === idx ? <Check size={13} /> : <Sparkles size={13} />}
                      {appliedIdx === idx ? 'Applied to Editor!' : 'Apply Correction to Report'}
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

    </div>
  );
}
