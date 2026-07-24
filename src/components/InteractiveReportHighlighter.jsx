import React, { useState } from 'react';
import { AlertCircle, X, CheckCircle2, Info, Lightbulb } from 'lucide-react';

export default function InteractiveReportHighlighter({ reportText, highlights = [] }) {
  const [activeHighlight, setActiveHighlight] = useState(null);

  if (!reportText) return null;

  // Build text chunks with highlight spans
  const renderTextWithHighlights = () => {
    if (!highlights || highlights.length === 0) {
      return <span>{reportText}</span>;
    }

    const elements = [];
    let lastIndex = 0;

    highlights.forEach((hl, idx) => {
      // Add plain text before highlight
      if (hl.start > lastIndex) {
        elements.push(
          <span key={`plain_${lastIndex}`}>
            {reportText.substring(lastIndex, hl.start)}
          </span>
        );
      }

      const getHighlightStyle = (type) => {
        switch (type) {
          case 'contradiction': return { bg: '#FEE2E2', color: '#991B1B', border: '#FCA5A5' };
          case 'terminology': return { bg: '#FEF3C7', color: '#B45309', border: '#FDE68A' };
          case 'formatting': return { bg: '#E0F2FE', color: '#0369A1', border: '#BAE6FD' };
          default: return { bg: '#FFEDD5', color: '#C2410C', border: '#FDBA74' };
        }
      };

      const style = getHighlightStyle(hl.type);
      const isSelected = activeHighlight?.id === hl.id;

      elements.push(
        <mark
          key={hl.id || idx}
          onClick={() => setActiveHighlight(hl)}
          style={{
            background: style.bg,
            color: style.color,
            borderBottom: `2px solid ${style.border}`,
            padding: '2px 4px',
            borderRadius: '3px',
            cursor: 'pointer',
            fontWeight: 600,
            outline: isSelected ? '2px solid #0284C7' : 'none',
            transition: 'all 0.15s'
          }}
          title={`Click to view issue: ${hl.reason}`}
        >
          {reportText.substring(hl.start, hl.end)}
        </mark>
      );

      lastIndex = hl.end;
    });

    if (lastIndex < reportText.length) {
      elements.push(
        <span key={`plain_end`}>
          {reportText.substring(lastIndex)}
        </span>
      );
    }

    return elements;
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: activeHighlight ? '1fr 340px' : '1fr', gap: '16px' }}>
      
      {/* Report Document Workspace */}
      <div className="enterprise-card" style={{ padding: '0', overflow: 'hidden' }}>
        <div style={{ padding: '10px 16px', background: 'var(--surface-muted)', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: '12px', fontWeight: 800, color: 'var(--text-primary)', textTransform: 'uppercase' }}>
            Grammarly-Style Interactive Clinical Document Inspector
          </span>
          <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
            {highlights.length} highlighted issue(s) detected • Click highlight to inspect
          </span>
        </div>

        <div style={{
          padding: '20px', fontFamily: 'monospace', fontSize: '12px', lineHeight: 1.8,
          background: 'var(--surface)', color: 'var(--text-primary)', whiteSpace: 'pre-wrap'
        }}>
          {renderTextWithHighlights()}
        </div>
      </div>

      {/* Selected Highlight Detail Inspector Drawer */}
      {activeHighlight && (
        <div className="enterprise-card" style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid var(--border)', paddingBottom: '8px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <AlertCircle size={15} color="#DC2626" />
              <span style={{ fontSize: '12px', fontWeight: 800, color: 'var(--text-primary)' }}>Issue Inspector</span>
            </div>
            <button onClick={() => setActiveHighlight(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}>
              <X size={14} />
            </button>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '10px', fontWeight: 800, padding: '2px 6px', borderRadius: '4px', background: '#FEE2E2', color: '#991B1B', textTransform: 'uppercase' }}>
              {activeHighlight.severity} Priority
            </span>
            <span style={{ fontSize: '12px', fontWeight: 900, color: '#DC2626' }}>
              {activeHighlight.deduction} pts
            </span>
          </div>

          <div>
            <div style={{ fontSize: '10px', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Reason</div>
            <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-primary)', marginTop: '2px' }}>
              {activeHighlight.reason}
            </div>
          </div>

          <div>
            <div style={{ fontSize: '10px', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Clinical Impact</div>
            <div style={{ fontSize: '11.5px', color: 'var(--text-secondary)', marginTop: '2px', lineHeight: 1.4 }}>
              {activeHighlight.clinical_impact}
            </div>
          </div>

          <div style={{ background: '#F0FDF4', border: '1px solid #BBF7D0', padding: '10px', borderRadius: '4px' }}>
            <div style={{ fontSize: '10px', fontWeight: 700, color: '#16A34A', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Lightbulb size={12} /> Suggested Improvement:
            </div>
            <div style={{ fontSize: '11.5px', color: '#14532D', fontWeight: 600, marginTop: '2px' }}>
              {activeHighlight.suggested_improvement}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
