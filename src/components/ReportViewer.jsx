import React, { useState } from 'react';
import { FileText, AlertTriangle, CheckCircle2, Info, X, HelpCircle } from 'lucide-react';

export default function ReportViewer({ reportText, auditResult }) {
  const [selectedIssue, setSelectedIssue] = useState(null);

  if (!reportText || !reportText.trim()) {
    return (
      <div style={{
        background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '8px',
        padding: '36px', textAlign: 'center', color: 'var(--text-muted)'
      }}>
        <FileText size={32} style={{ opacity: 0.5, marginBottom: '8px' }} />
        <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)' }}>No Clinical Document Selected</div>
        <div style={{ fontSize: '12px' }}>Upload a report or select an analysis to inspect document highlights.</div>
      </div>
    );
  }

  // Extract non-standard terms and suggestions
  const suggestions = auditResult?.suggestions || [];
  const missingSections = (auditResult?.sections || []).filter(s => !s.present);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      
      {/* Header bar */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        background: 'var(--surface-muted)', border: '1px solid var(--border)', borderRadius: '8px',
        padding: '10px 16px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <FileText size={16} color="#0284C7" />
          <span style={{ fontSize: '13px', fontWeight: 800, color: 'var(--text-primary)' }}>
            Interactive Document Inspector
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', fontSize: '11px', fontWeight: 600 }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', color: '#DC2626' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#DC2626' }} />
            Missing Section ({missingSections.length})
          </span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', color: '#D97706' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#D97706' }} />
            Non-Standard Term ({suggestions.filter(s => s.category?.includes('Vocabulary')).length})
          </span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', color: '#0284C7' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#0284C7' }} />
            Formatting Issue
          </span>
        </div>
      </div>

      {/* Main Workspace: Document Text + Side Inspector */}
      <div style={{ display: 'grid', gridTemplateColumns: selectedIssue ? '1fr 340px' : '1fr', gap: '16px' }}>
        
        {/* Document Body View */}
        <div style={{
          background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '8px',
          padding: '24px', fontFamily: 'monospace', fontSize: '12px', lineHeight: 1.8,
          color: 'var(--text-primary)', whiteSpace: 'pre-wrap', position: 'relative'
        }}>
          {reportText}
        </div>

        {/* Selected Issue Inspector Panel */}
        {selectedIssue && (
          <div style={{
            background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '8px',
            padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid var(--border)', paddingBottom: '8px' }}>
              <span style={{ fontSize: '12px', fontWeight: 800, color: 'var(--text-primary)' }}>
                Issue Inspector
              </span>
              <button onClick={() => setSelectedIssue(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}>
                <X size={14} />
              </button>
            </div>

            <div>
              <div style={{ fontSize: '11px', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                Category
              </div>
              <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)', marginTop: '2px' }}>
                {selectedIssue.category}
              </div>
            </div>

            <div>
              <div style={{ fontSize: '11px', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                Finding
              </div>
              <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '2px', lineHeight: 1.5 }}>
                {selectedIssue.finding}
              </div>
            </div>

            <div style={{ background: 'var(--surface-muted)', padding: '10px', borderRadius: '6px', border: '1px solid var(--border)' }}>
              <div style={{ fontSize: '11px', fontWeight: 800, color: '#0284C7' }}>Recommended Revision:</div>
              <div style={{ fontSize: '12px', color: 'var(--text-primary)', fontWeight: 600, marginTop: '2px' }}>
                {selectedIssue.recommended}
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
