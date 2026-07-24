import React from 'react';
import { ArrowLeftRight, CheckCircle2, FileText, Sparkles, Copy } from 'lucide-react';

export default function ReportDiffView({ originalText, correctedText, onApplyCorrection }) {
  if (!originalText) return null;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      
      {/* Header bar */}
      <div className="enterprise-card" style={{ padding: '12px 18px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'var(--surface-muted)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <ArrowLeftRight size={18} color="#0284C7" />
          <div>
            <div style={{ fontSize: '13px', fontWeight: 800, color: 'var(--text-primary)' }}>
              Side-by-Side Clinical Report Diff Comparison
            </div>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
              Original document vs. AI Synthesized ACR Practice Parameter Standard Report
            </div>
          </div>
        </div>

        {onApplyCorrection && (
          <button
            onClick={() => onApplyCorrection(correctedText)}
            className="btn-primary"
            style={{ fontSize: '11.5px', padding: '6px 12px' }}
          >
            <Sparkles size={13} /> Apply AI Recommended Revision
          </button>
        )}
      </div>

      {/* Split Pane View */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
        
        {/* Left Pane: Original Report */}
        <div className="enterprise-card" style={{ padding: '0', overflow: 'hidden', borderLeft: '4px solid #DC2626' }}>
          <div style={{ padding: '10px 14px', background: '#FEE2E2', borderBottom: '1px solid #FCA5A5', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '11.5px', fontWeight: 800, color: '#991B1B', textTransform: 'uppercase' }}>
              Original Uploaded Report (Version 1)
            </span>
            <span style={{ fontSize: '10px', fontWeight: 700, padding: '2px 6px', borderRadius: '4px', background: '#DC2626', color: '#FFF' }}>
              Contains Deficiencies
            </span>
          </div>

          <div style={{
            padding: '16px', fontFamily: 'monospace', fontSize: '11.5px', lineHeight: 1.7,
            background: 'var(--surface)', color: 'var(--text-primary)', whiteSpace: 'pre-wrap',
            maxHeight: '520px', overflowY: 'auto'
          }}>
            {originalText}
          </div>
        </div>

        {/* Right Pane: AI Corrected Report */}
        <div className="enterprise-card" style={{ padding: '0', overflow: 'hidden', borderLeft: '4px solid #16A34A' }}>
          <div style={{ padding: '10px 14px', background: '#DCFCE7', borderBottom: '1px solid #86EFAC', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '11.5px', fontWeight: 800, color: '#15803D', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Sparkles size={13} /> AI Corrected ACR Standard Report (Version 2)
            </span>
            <span style={{ fontSize: '10px', fontWeight: 700, padding: '2px 6px', borderRadius: '4px', background: '#16A34A', color: '#FFF' }}>
              Compliant Structure
            </span>
          </div>

          <div style={{
            padding: '16px', fontFamily: 'monospace', fontSize: '11.5px', lineHeight: 1.7,
            background: 'var(--surface)', color: 'var(--text-primary)', whiteSpace: 'pre-wrap',
            maxHeight: '520px', overflowY: 'auto'
          }}>
            {correctedText || originalText}
          </div>
        </div>

      </div>

    </div>
  );
}
