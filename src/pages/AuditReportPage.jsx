import React, { useState } from 'react';
import { FileCheck2, Download, ShieldCheck, AlertCircle } from 'lucide-react';
import { apiFetch } from '../utils/apiClient';
import AICautionNotice from '../components/AICautionNotice';
import { downloadPdfBlob } from '../utils/downloadHelper';
import { generateClientPdf } from '../utils/pdfGenerator';

export default function AuditReportPage({ auditResult, modality }) {
  const [isDownloading, setIsDownloading] = useState(false);

  if (!auditResult) {
    return (
      <div className="enterprise-card" style={{ maxWidth: '520px' }}>
        <h2 style={{ fontSize: '15px', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>No audit report available</h2>
        <p style={{ fontSize: '12px', color: 'var(--text-muted)', margin: '6px 0 14px' }}>
          Run an audit first. The certificate will use that report's actual quality score and findings.
        </p>
      </div>
    );
  }

  const res = auditResult;

  const handleDownload = async () => {
    setIsDownloading(true);
    try {
      const resp = await apiFetch('/api/generate-pdf', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ filename: 'radiology_report.txt', modality: modality || res.effective_modality || 'Chest X-Ray', audit_result: res })
      });
      if (resp.ok) {
        const blob = await resp.blob();
        const fn = `radiology_audit_${(modality || res.effective_modality || 'report').replace(/\s+/g, '_')}_${Date.now()}.pdf`;
        downloadPdfBlob(blob, fn);
        setIsDownloading(false);
        return;
      }
    } catch (e) {
      // Server offline fallback
    }

    // Fallback to client-side browser PDF generator
    try {
      await generateClientPdf({
        audit_result: res,
        modality: modality || res.effective_modality || 'Chest X-Ray',
        report_text: reportText,
        filename: `radiology_audit_${(modality || res.effective_modality || 'report').replace(/\s+/g, '_')}_${Date.now()}.pdf`
      });
    } catch (clientErr) {
      alert('PDF Download Error: ' + clientErr.message);
    } finally {
      setIsDownloading(false);
    }
  };

  const scoreColor = res.quality_score >= 90 ? '#15803D' : res.quality_score >= 70 ? '#B45309' : '#B91C1C';

  const formatRationale = (text) => {
    if (!text) return null;
    const lines = text.split('\n');
    return lines.map((line, idx) => {
      if (line.trim().startsWith('What is missing:')) {
        return <div key={idx} style={{ marginBottom: '4px' }}><strong style={{ color: 'var(--text-muted)' }}>What is missing:</strong> {line.replace('What is missing:', '')}</div>;
      }
      if (line.trim().startsWith('Why it matters:')) {
        return <div key={idx} style={{ marginBottom: '4px' }}><strong style={{ color: 'var(--text-muted)' }}>Why it matters:</strong> {line.replace('Why it matters:', '')}</div>;
      }
      if (line.trim().startsWith('Clinical impact:')) {
        return <div key={idx} style={{ marginBottom: '4px' }}><strong style={{ color: 'var(--text-muted)' }}>Clinical impact:</strong> {line.replace('Clinical impact:', '')}</div>;
      }
      if (line.trim().startsWith('Suggested correction:')) {
        return <div key={idx} style={{ marginBottom: '4px' }}><strong style={{ color: 'var(--text-muted)' }}>Suggested correction:</strong> {line.replace('Suggested correction:', '')}</div>;
      }
      return <div key={idx}>{line}</div>;
    });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '840px', margin: '0 auto' }}>

      {/* Page Title */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid var(--border)', paddingBottom: '12px', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h1 style={{ fontSize: '18px', fontWeight: 900, color: 'var(--text-primary)', margin: 0, letterSpacing: '-0.3px' }}>
            Clinical QA Audit Certificate & Detailed Report
          </h1>
          <p style={{ fontSize: '12px', color: 'var(--text-muted)', margin: '2px 0 0' }}>
            Departmental quality record and 11-dimension breakdown for HIS compliance logs
          </p>
        </div>

        <button
          onClick={handleDownload}
          disabled={isDownloading}
          className="btn-primary"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '10px 20px',
            fontSize: '13px',
            fontWeight: 800,
            boxShadow: '0 4px 12px rgba(2, 132, 199, 0.3)',
            cursor: 'pointer'
          }}
        >
          <Download size={16} />
          {isDownloading ? 'Generating PDF...' : 'Download Detailed Audit Report (PDF)'}
        </button>
      </div>

      <AICautionNotice />

      {/* Certificate Panel */}
      <div className="enterprise-card" style={{ padding: '24px' }}>

        {/* Certificate Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', paddingBottom: '18px', borderBottom: '1px solid var(--border)', marginBottom: '20px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              <ShieldCheck size={22} color="#0284C7" />
              <span style={{ fontWeight: 900, fontSize: '16px', color: 'var(--text-primary)', letterSpacing: '-0.3px' }}>
                RADIOLOGY QUALITY AUDIT CERTIFICATE
              </span>
            </div>
            <div style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text-muted)' }}>
              Hospital Governance & Clinical Quality Control Board
            </div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-primary)' }}>RAD-QA-2026-9812</div>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px' }}>{new Date().toLocaleDateString()}</div>
          </div>
        </div>

        {/* Meta Row */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', borderBottom: '1px solid var(--border)', marginBottom: '20px', paddingBottom: '16px' }}>
          {[
            { label: 'Exam Modality', value: modality || res.effective_modality || 'Chest X-Ray' },
            { label: 'Evaluated By', value: 'Senior QA Engine / ' + (res.is_ai_enhanced ? 'LLM' : 'Deterministic') }
          ].map((m, i) => (
            <div key={i}>
              <div style={{ fontSize: '9.5px', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '3px' }}>{m.label}</div>
              <div style={{ fontSize: '13.5px', fontWeight: 800, color: 'var(--text-primary)' }}>{m.value}</div>
            </div>
          ))}
        </div>

        {/* Score Row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: '32px', alignItems: 'center', paddingBottom: '20px', borderBottom: '1px solid var(--border)', marginBottom: '20px' }}>
          <div>
            <div style={{ fontSize: '9.5px', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '4px' }}>Overall Quality Index</div>
            <div style={{ fontSize: '56px', fontWeight: 900, color: scoreColor, letterSpacing: '-2px', lineHeight: 1 }}>
              {res.quality_score}
              <span style={{ fontSize: '18px', fontWeight: 400, color: 'var(--text-muted)', marginLeft: '4px' }}>/100</span>
            </div>
          </div>
          <div>
            <div style={{ fontSize: '9.5px', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '6px' }}>Status Grade</div>
            <span style={{
              fontSize: '12px', fontWeight: 700, padding: '6px 14px', borderRadius: '4px', display: 'inline-block',
              background: res.quality_score >= 90 ? '#DCFCE7' : '#FEE2E2',
              color: res.quality_score >= 90 ? '#15803D' : '#991B1B',
              border: `1px solid ${res.quality_score >= 90 ? '#86EFAC' : '#FCA5A5'}`
            }}>{res.readiness_status}</span>
          </div>
        </div>

        {/* Red Flags Section */}
        {res.red_flags && res.red_flags.length > 0 && (
          <div style={{ marginBottom: '24px' }}>
            <div style={{ fontSize: '10.5px', fontWeight: 800, color: '#B91C1C', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <AlertCircle size={14} /> Detected Red Flags
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {res.red_flags.map((rf, i) => (
                <div key={i} style={{ padding: '8px 12px', borderLeft: '3px solid #DC2626', background: '#FEE2E2', fontSize: '12px', color: '#991B1B', fontWeight: 600, borderRadius: '4px' }}>
                  [{rf.severity}] {rf.issue}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 11-Dimension Breakdown Table */}
        <div style={{ marginBottom: '24px' }}>
          <div style={{ fontSize: '10.5px', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '8px' }}>
            11-Dimension Component Breakdown
          </div>
          <table className="enterprise-table">
            <thead>
              <tr>
                <th>Dimension</th>
                <th style={{ textAlign: 'right' }}>Score</th>
              </tr>
            </thead>
            <tbody>
              {res.dimensions.map((d, i) => {
                 const pass = d.score >= (d.max_marks * 0.9);
                 const warning = d.score >= (d.max_marks * 0.6) && d.score < (d.max_marks * 0.9);
                 return (
                  <tr key={i}>
                    <td style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{d.name}</td>
                    <td style={{ textAlign: 'right', fontWeight: 800, color: pass ? '#15803D' : warning ? '#B45309' : '#B91C1C' }}>
                      {d.score}/{d.max_marks}
                    </td>
                  </tr>
                 );
              })}
            </tbody>
          </table>
        </div>

        {/* AI Suggestions / Deductions Log */}
        {res.suggestions && res.suggestions.length > 0 && (
          <div>
            <div style={{ fontSize: '10.5px', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '12px' }}>
              Senior QA Deficiencies Log
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {res.suggestions.map((s, i) => (
                <div key={i} style={{ background: 'var(--surface-muted)', border: '1px solid var(--border)', padding: '14px', borderRadius: '6px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                    <span style={{ fontSize: '13px', fontWeight: 800, color: 'var(--text-primary)' }}>{s.finding}</span>
                    <span style={{
                      fontSize: '9.5px', fontWeight: 800, padding: '2px 6px', borderRadius: '4px', textTransform: 'uppercase',
                      background: s.severity === 'Critical' ? '#FEE2E2' : s.severity === 'High' ? '#FFEDD5' : '#E0F2FE',
                      color: s.severity === 'Critical' ? '#991B1B' : s.severity === 'High' ? '#C2410C' : '#0369A1'
                    }}>
                      {s.severity} Priority
                    </span>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '12px' }}>
                    <div>
                      <div style={{ fontSize: '9.5px', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '3px' }}>Original Documented Text:</div>
                      <div style={{ fontSize: '11.5px', color: '#B91C1C', background: '#FEE2E2', padding: '6px 10px', borderRadius: '4px', border: '1px solid #FCA5A5', fontFamily: 'monospace' }}>
                        "{s.original}"
                      </div>
                    </div>
                    <div>
                      <div style={{ fontSize: '9.5px', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '3px' }}>Required Correction:</div>
                      <div style={{ fontSize: '11.5px', color: '#15803D', background: '#DCFCE7', padding: '6px 10px', borderRadius: '4px', border: '1px solid #86EFAC', fontWeight: 600 }}>
                        {s.recommended}
                      </div>
                    </div>
                  </div>

                  <div style={{ background: 'var(--surface)', padding: '12px', borderRadius: '4px', border: '1px solid var(--border)', fontSize: '12px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                    {formatRationale(s.rationale)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
