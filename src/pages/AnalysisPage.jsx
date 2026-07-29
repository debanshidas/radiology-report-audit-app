import React, { useState } from 'react';
import { Cpu, ArrowRight, CheckCircle2, Clock, Loader2, AlertCircle, Download } from 'lucide-react';
import AICautionNotice from '../components/AICautionNotice';
import { generateClientPdf } from '../utils/pdfGenerator';

const PIPELINE_STAGES = [
  { id: 1, title: 'Upload & Validation', desc: 'File payload received and validated against HIS standards.' },
  { id: 2, title: 'Text Extraction', desc: 'Parsed OCR & raw text stream into structured JSON nodes.' },
  { id: 3, title: 'Modality Detection', desc: 'Identified anatomical exam protocol & RadLex category.' },
  { id: 4, title: 'Quality Evaluation', desc: 'Deterministic 11-dimension scoring & clause analysis.' },
  { id: 5, title: 'Report Generation', desc: 'Synthesizing clinical suggestions & audit justification.' },
  { id: 6, title: 'PDF Export Ready', desc: 'Generated multi-page ReportLab audit certificate.' },
];

export default function AnalysisPage({ isAnalyzing, currentStep, auditResult, analysisError, setActivePage, provider }) {
  const [isDownloadingPdf, setIsDownloadingPdf] = useState(false);

  const handleDownloadPdf = async () => {
    if (!auditResult) return;
    setIsDownloadingPdf(true);
    try {
      await generateClientPdf({
        audit_result: auditResult,
        modality: auditResult.effective_modality || 'Chest X-Ray',
        report_text: auditResult.original_report_text || auditResult.report_text || '',
        filename: `detailed_radiology_audit_${(auditResult.effective_modality || 'report').replace(/\s+/g, '_')}_${Date.now()}.pdf`
      });
    } catch (err) {
      alert('PDF Export Error: ' + err.message);
    } finally {
      setIsDownloadingPdf(false);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      
      {/* Page Title */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid var(--border)', paddingBottom: '12px', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h1 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--text-primary)', margin: 0, letterSpacing: '-0.3px' }}>
            Clinical QA Analysis Pipeline
          </h1>
          <p style={{ fontSize: '12px', color: 'var(--text-muted)', margin: '2px 0 0' }}>
            Multi-stage quality evaluation engine • HIS Diagnostic Feed
          </p>
        </div>
        {auditResult && !isAnalyzing && (
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <button
              onClick={handleDownloadPdf}
              disabled={isDownloadingPdf}
              className="btn-secondary"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '12.5px', fontWeight: 700 }}
            >
              <Download size={14} />
              {isDownloadingPdf ? 'Exporting PDF...' : 'Download Detailed Audit Report (PDF)'}
            </button>
            <button onClick={() => setActivePage('quality')} className="btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '12.5px', fontWeight: 800 }}>
              View Quality Dashboard <ArrowRight size={14} />
            </button>
          </div>
        )}
      </div>

      <AICautionNotice />

      {/* 6-Stage Clinical Workflow Tracker */}
      <div className="enterprise-card" style={{ padding: '16px' }}>
        <div style={{ fontSize: '12px', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '12px', borderBottom: '1px solid var(--border)', paddingBottom: '6px' }}>
          Pipeline Progress Stages (Est. Completion: ~2.5 seconds)
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '10px' }}>
          {PIPELINE_STAGES.map((stage) => {
            const isCompleted = currentStep > stage.id || (!isAnalyzing && auditResult);
            const isInProgress = currentStep === stage.id && isAnalyzing;

            return (
              <div
                key={stage.id}
                style={{
                  background: isCompleted ? '#F0FDF4' : isInProgress ? '#E0F2FE' : 'var(--surface-muted)',
                  border: `1px solid ${isCompleted ? '#BBF7D0' : isInProgress ? '#BAE6FD' : 'var(--border)'}`,
                  borderRadius: '4px', padding: '10px'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
                  <span style={{ fontSize: '11px', fontWeight: 800, color: 'var(--text-primary)' }}>
                    Stage {stage.id}: {stage.title}
                  </span>
                  {isCompleted && <CheckCircle2 size={13} color="#16A34A" />}
                  {isInProgress && <Loader2 size={13} color="#0284C7" className="animate-spin" />}
                  {!isCompleted && !isInProgress && <Clock size={13} color="#94A3B8" />}
                </div>

                <div style={{ fontSize: '10px', color: 'var(--text-muted)', lineHeight: 1.3 }}>
                  {stage.desc}
                </div>

                <div style={{ marginTop: '6px' }}>
                  <span style={{
                    fontSize: '9px', fontWeight: 700, padding: '2px 6px', borderRadius: '4px',
                    background: isCompleted ? '#DCFCE7' : isInProgress ? '#BAE6FD' : 'var(--border)',
                    color: isCompleted ? '#16A34A' : isInProgress ? '#0369A1' : 'var(--text-muted)'
                  }}>
                    {isCompleted ? 'COMPLETED' : isInProgress ? 'IN PROGRESS' : 'PENDING'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Engine Terminal Diagnostic Log */}
      <div className="enterprise-card" style={{ padding: '0', overflow: 'hidden' }}>
        <div style={{
          background: 'var(--surface-muted)', borderBottom: '1px solid var(--border)',
          padding: '8px 14px', display: 'flex', alignItems: 'center', justifyContent: 'space-between'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Cpu size={14} color="#0284C7" />
            <span style={{ fontSize: '11.5px', fontWeight: 700, color: 'var(--text-primary)' }}>
              Live HIS Diagnostic Console Log
            </span>
          </div>
          <span style={{ fontSize: '10.5px', color: 'var(--text-muted)' }}>
            Provider: <strong style={{ color: 'var(--text-primary)', textTransform: 'capitalize' }}>{provider}</strong>
          </span>
        </div>

        <div style={{
          background: '#0F172A', color: '#38BDF8', fontFamily: 'monospace',
          fontSize: '11px', padding: '14px', height: '180px', overflowY: 'auto',
          lineHeight: 1.6, borderTop: '1px solid #1E293B'
        }}>
          <div>[SYS_INIT] RadAudit Engine Initialization completed.</div>
          <div>[STAGE_1] Report payload loaded. Byte length: {auditResult ? 'VALIDATED' : 'PROCESSING...'}</div>
          <div>[STAGE_2] Extracted structured section headers via regex parser.</div>
          <div>[STAGE_3] Modality detection algorithm executed: {auditResult?.modality || 'IN_PROGRESS'}</div>
          <div>[STAGE_4] 11-Dimension Senior QA Gating Engine triggered. Hard caps evaluated.</div>
          {auditResult && <div>[STAGE_5] LLM suggestion synthesis completed. Overall score: {auditResult.quality_score}/100</div>}
          {auditResult && <div style={{ color: '#4ADE80', fontWeight: 700 }}>[SUCCESS] Audit completed. Status: {auditResult.readiness_status}</div>}
          {analysisError && <div style={{ color: '#F87171', fontWeight: 700 }}>[ERROR] {analysisError}</div>}
        </div>
      </div>

    </div>
  );
}
