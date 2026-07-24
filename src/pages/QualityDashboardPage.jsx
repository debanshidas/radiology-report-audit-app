import React, { useState } from 'react';
import { BarChart3, CheckCircle2, XCircle, AlertTriangle, Lightbulb, FileCheck2, ChevronDown, ChevronUp, FileText, Eye, AlertCircle, ArrowLeftRight, History, Download } from 'lucide-react';
import AICautionNotice from '../components/AICautionNotice';
import InteractiveReportHighlighter from '../components/InteractiveReportHighlighter';
import ReportDiffView from '../components/ReportDiffView';
import VersionHistoryDrawer from '../components/VersionHistoryDrawer';
import PdfPreviewModal from '../components/PdfPreviewModal';

function getScoreGrade(score) {
  if (score >= 95) return { grade: 'Excellent', status: 'Hospital Ready', bg: '#DCFCE7', text: '#15803D', border: '#86EFAC' };
  if (score >= 90) return { grade: 'Very Good', status: 'Minor Improvements', bg: '#FEF3C7', text: '#B45309', border: '#FDE68A' };
  if (score >= 80) return { grade: 'Good', status: 'Requires Review', bg: '#FEF08A', text: '#A16207', border: '#FDE047' };
  if (score >= 70) return { grade: 'Needs Improvement', status: 'Needs Improvement', bg: '#FFEDD5', text: '#C2410C', border: '#FDBA74' };
  if (score >= 60) return { grade: 'Major Revision', status: 'Major Revision Required', bg: '#FEE2E2', text: '#B91C1C', border: '#FCA5A5' };
  return { grade: 'Not Ready', status: 'Not Ready for Clinical Sign-off', bg: '#FEE2E2', text: '#991B1B', border: '#FCA5A5' };
}

export default function QualityDashboardPage({ auditResult, reportText, setReportText, setActivePage }) {
  const [activeTab, setActiveTab] = useState('overview'); // overview, highlighter, diff, versions
  const [expandedDim, setExpandedDim] = useState(null);
  const [isPdfModalOpen, setIsPdfModalOpen] = useState(false);

  // Versions state simulation
  const [versions, setVersions] = useState([
    { id: 'v1', name: 'Version 1 (Original Upload)', timestamp: 'Today, 13:45 PM', author: 'Uploaded File', score: auditResult?.quality_score || 0, text: reportText || '', status: 'Draft' },
    { id: 'v2', name: 'Version 2 (AI Corrected ACR Standard)', timestamp: 'Today, 13:46 PM', author: 'RadAudit Engine', score: 98, text: auditResult?.ai_corrected_report || reportText || '', status: 'Suggested' },
  ]);
  const [activeVersionId, setActiveVersionId] = useState('v1');

  if (!auditResult) {
    return (
      <div className="enterprise-card" style={{ maxWidth: '520px' }}>
        <h2 style={{ fontSize: '15px', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>No Active Audit Result</h2>
        <p style={{ fontSize: '12px', color: 'var(--text-muted)', margin: '6px 0 14px' }}>
          Upload a radiology report to generate a multi-dimensional quality assessment.
        </p>
        <button onClick={() => setActivePage('upload')} className="btn-primary">
          Run Report Audit →
        </button>
      </div>
    );
  }

  const res = auditResult;
  const gradeInfo = getScoreGrade(res.quality_score);

  const handleRestoreVersion = (ver) => {
    setActiveVersionId(ver.id);
    setReportText(ver.text);
  };

  const handleApproveVersion = (ver) => {
    setVersions(versions.map(v => v.id === ver.id ? { ...v, status: 'Approved' } : v));
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      
      {/* Page Title & Navigation Toolbar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid var(--border)', paddingBottom: '12px' }}>
        <div>
          <h1 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--text-primary)', margin: 0, letterSpacing: '-0.3px' }}>
            Report Quality Score Breakdown — {res.audit_id || 'RAD-QA-2026'}
          </h1>
          <p style={{ fontSize: '12px', color: 'var(--text-muted)', margin: '2px 0 0' }}>
            Senior QA Evaluation • Mode: 11-Dimension Mathematical Gating Engine
          </p>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button onClick={() => setIsPdfModalOpen(true)} className="btn-secondary">
            <Eye size={13} /> Preview PDF Certificate
          </button>
          <button onClick={() => setActivePage('report')} className="btn-primary">
            <FileCheck2 size={13} /> Download Certificate PDF
          </button>
        </div>
      </div>

      <AICautionNotice />

      {/* Sub-View Navigation Tabs */}
      <div style={{ display: 'flex', gap: '6px', borderBottom: '1px solid var(--border)', paddingBottom: '8px' }}>
        {[
          { id: 'overview', label: '11-Dimension Overview', icon: BarChart3 },
          { id: 'highlighter', label: 'Grammarly In-Text Inspector', icon: Eye },
          { id: 'diff', label: 'Side-by-Side Diff View', icon: ArrowLeftRight },
          { id: 'versions', label: 'Version History', icon: History },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                display: 'flex', alignItems: 'center', gap: '6px',
                padding: '6px 12px', borderRadius: '4px', fontSize: '12px', fontWeight: isActive ? 700 : 500,
                background: isActive ? '#0284C7' : 'transparent',
                color: isActive ? '#FFF' : 'var(--text-secondary)',
                border: 'none', cursor: 'pointer'
              }}
            >
              <Icon size={14} /> {tab.label}
            </button>
          );
        })}
      </div>

      {/* TAB 1: OVERVIEW & EXPLICIT DEDUCTIONS */}
      {activeTab === 'overview' && (
        <>
          {/* Red Flags Panel */}
          {res.red_flags && res.red_flags.length > 0 && (
            <div className="enterprise-card" style={{ borderLeft: '4px solid #DC2626', padding: '14px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
                <AlertCircle size={16} color="#DC2626" />
                <h3 style={{ fontSize: '13.5px', fontWeight: 800, margin: 0, color: '#991B1B' }}>Red Flags Detected</h3>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {res.red_flags.map((rf, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '6px 10px', background: 'var(--surface-muted)', borderRadius: '4px', border: '1px solid var(--border)' }}>
                    <span style={{ fontSize: '9.5px', fontWeight: 800, padding: '2px 6px', borderRadius: '4px', background: '#FEE2E2', color: '#991B1B', border: '1px solid #FCA5A5', textTransform: 'uppercase' }}>
                      {rf.severity}
                    </span>
                    <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-primary)' }}>
                      {rf.issue}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Score Summary Panel */}
          <div className="enterprise-card" style={{ display: 'grid', gridTemplateColumns: '220px 1fr', gap: '20px', alignItems: 'center', padding: '16px' }}>
            <div style={{ textAlign: 'center', borderRight: '1px solid var(--border)', paddingRight: '18px' }}>
              <div style={{ fontSize: '10.5px', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                QA Officer Index
              </div>

              <div style={{ position: 'relative', width: '90px', height: '90px', margin: '10px auto' }}>
                <svg viewBox="0 0 36 36" style={{ width: '100%', height: '100%', transform: 'rotate(-90deg)' }}>
                  <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="var(--border)" strokeWidth="3" />
                  <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke={gradeInfo.text} strokeWidth="3" strokeDasharray={`${res.quality_score}, 100`} />
                </svg>
                <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ fontSize: '24px', fontWeight: 900, color: gradeInfo.text, lineHeight: 1 }}>{res.quality_score}</span>
                  <span style={{ fontSize: '9px', color: 'var(--text-muted)', fontWeight: 700 }}>/ 100</span>
                </div>
              </div>

              <div>
                <span style={{
                  fontSize: '11px', fontWeight: 800, padding: '3px 8px', borderRadius: '4px',
                  background: gradeInfo.bg, color: gradeInfo.text, border: `1px solid ${gradeInfo.border}`,
                  display: 'inline-block', maxWidth: '100%', wordBreak: 'break-word', lineHeight: 1.3
                }}>
                  {res.readiness_status || gradeInfo.status}
                </span>
              </div>
            </div>

            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                <span style={{ fontSize: '10.5px', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                  Senior QA Officer Audit Remarks
                </span>
                <span style={{ fontSize: '10.5px', fontWeight: 600, color: 'var(--text-muted)' }}>
                  Audit Reference: <strong>{res.audit_id}</strong>
                </span>
              </div>
              <p style={{ fontSize: '12.5px', color: 'var(--text-primary)', lineHeight: 1.6, margin: 0 }}>
                {res.overall_justification}
              </p>
            </div>
          </div>

          {/* EXPLICIT MATHEMATICAL DEDUCTIONS LOG TABLE */}
          {res.deductions_log && res.deductions_log.length > 0 && (
            <div className="enterprise-card" style={{ padding: '0', overflow: 'hidden' }}>
              <div style={{ padding: '10px 16px', background: '#FEE2E2', borderBottom: '1px solid #FCA5A5', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '12px', fontWeight: 800, color: '#991B1B', textTransform: 'uppercase' }}>
                  Explicit Mathematical Score Deductions (-{res.deductions_log.reduce((acc, d) => acc + Math.abs(d.points), 0)} pts total)
                </span>
                <span style={{ fontSize: '11px', color: '#991B1B', fontWeight: 700 }}>
                  Reason • Impact • Suggested Fix
                </span>
              </div>

              <table className="enterprise-table">
                <thead>
                  <tr>
                    <th>Deduction</th>
                    <th>Deficiency Reason</th>
                    <th>Clinical Impact</th>
                    <th>Suggested Fix</th>
                  </tr>
                </thead>
                <tbody>
                  {res.deductions_log.map((ded, i) => (
                    <tr key={i}>
                      <td style={{ fontWeight: 900, color: '#DC2626', fontSize: '13px' }}>{ded.points} pts</td>
                      <td style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{ded.reason}</td>
                      <td style={{ color: 'var(--text-secondary)', fontSize: '11.5px' }}>{ded.clinical_impact}</td>
                      <td style={{ color: '#16A34A', fontWeight: 600, fontSize: '11.5px' }}>{ded.suggested_improvement}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* 11-Dimension Data Table Panel */}
          <div className="enterprise-card" style={{ padding: '0', overflow: 'hidden' }}>
            <div style={{
              background: 'var(--surface-muted)', borderBottom: '1px solid var(--border)',
              padding: '10px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between'
            }}>
              <span style={{ fontSize: '12px', fontWeight: 800, color: 'var(--text-primary)', textTransform: 'uppercase' }}>
                11-Dimension Component Breakdown
              </span>
              <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                Expand row to view evaluation details
              </span>
            </div>

            <table className="enterprise-table">
              <thead>
                <tr>
                  <th>Dimension Name</th>
                  <th>Weight</th>
                  <th>Score</th>
                  <th>Status</th>
                  <th style={{ textAlign: 'right' }}>Details</th>
                </tr>
              </thead>
              <tbody>
                {(res.dimensions || []).map((dim, idx) => {
                  const dimId = dim.id || idx;
                  const isExpanded = expandedDim === dimId;
                  const pass = dim.score >= (dim.max_marks * 0.9);
                  const warning = dim.score >= (dim.max_marks * 0.6) && dim.score < (dim.max_marks * 0.9);

                  return (
                    <React.Fragment key={dimId}>
                      <tr
                        onClick={() => setExpandedDim(isExpanded ? null : dimId)}
                        style={{ cursor: 'pointer', background: isExpanded ? 'var(--surface-muted)' : 'transparent' }}
                      >
                        <td style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{dim.name}</td>
                        <td style={{ color: 'var(--text-muted)', fontWeight: 600 }}>{dim.weight}</td>
                        <td style={{ fontWeight: 800, color: pass ? '#15803D' : warning ? '#B45309' : '#B91C1C' }}>
                          {dim.score} / {dim.max_marks}
                        </td>
                        <td>
                          <span style={{
                            fontSize: '10px', fontWeight: 700, padding: '2px 6px', borderRadius: '4px',
                            background: pass ? '#DCFCE7' : warning ? '#FEF3C7' : '#FEE2E2',
                            color: pass ? '#15803D' : warning ? '#B45309' : '#B91C1C'
                          }}>
                            {pass ? 'Compliant' : warning ? 'Minor Issue' : 'Needs Improvement'}
                          </span>
                        </td>
                        <td style={{ textAlign: 'right', color: 'var(--text-muted)' }}>
                          {isExpanded ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
                        </td>
                      </tr>

                      {isExpanded && (
                        <tr>
                          <td colSpan="5" style={{ background: 'var(--surface-muted)', padding: '14px 18px', borderBottom: '1px solid var(--border)' }}>
                            <ul style={{ fontSize: '11.5px', color: 'var(--text-primary)', margin: 0, paddingLeft: '18px' }}>
                              {(dim.details || []).map((detail, i) => (
                                <li key={i} style={{ marginBottom: '3px', color: detail.includes('Information Not Documented') || detail.includes('Missing') ? '#B91C1C' : 'var(--text-primary)' }}>
                                  {detail}
                                </li>
                              ))}
                            </ul>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  );
                })}
              </tbody>
            </table>
          </div>
        </>
      )}

      {/* TAB 2: GRAMMARLY IN-TEXT HIGHLIGHTER */}
      {activeTab === 'highlighter' && (
        <InteractiveReportHighlighter
          reportText={reportText}
          highlights={res.highlights}
        />
      )}

      {/* TAB 3: SIDE-BY-SIDE DIFF VIEW */}
      {activeTab === 'diff' && (
        <ReportDiffView
          originalText={reportText}
          correctedText={res.ai_corrected_report}
          onApplyCorrection={(txt) => setReportText(txt)}
        />
      )}

      {/* TAB 4: VERSION HISTORY */}
      {activeTab === 'versions' && (
        <VersionHistoryDrawer
          versions={versions}
          activeVersionId={activeVersionId}
          onRestoreVersion={handleRestoreVersion}
          onApproveVersion={handleApproveVersion}
        />
      )}

      {/* Interactive PDF Preview Modal */}
      <PdfPreviewModal
        isOpen={isPdfModalOpen}
        onClose={() => setIsPdfModalOpen(false)}
        auditResult={res}
        modality={res.effective_modality}
      />

    </div>
  );
}
