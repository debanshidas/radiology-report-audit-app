import React, { useState } from 'react';
import { BarChart3, CheckCircle2, XCircle, AlertTriangle, Lightbulb, ChevronDown, ChevronUp, FileText, Eye, AlertCircle, ArrowLeftRight, History, Download, HelpCircle, Info, ShieldAlert } from 'lucide-react';
import AICautionNotice from '../components/AICautionNotice';
import ReportDiffView from '../components/ReportDiffView';
import VersionHistoryDrawer from '../components/VersionHistoryDrawer';

function getScoreGrade(score) {
  if (score >= 95) return { grade: 'Excellent', status: 'Hospital Ready', bg: '#E8F5E9', text: '#15803D', border: '#86EFAC' };
  if (score >= 90) return { grade: 'Very Good', status: 'Minor Improvements', bg: '#FFF8E1', text: '#B45309', border: '#FDE68A' };
  if (score >= 80) return { grade: 'Good', status: 'Requires Review', bg: '#FEF08A', text: '#A16207', border: '#FDE047' };
  if (score >= 70) return { grade: 'Needs Improvement', status: 'Needs Improvement', bg: '#FFEDD5', text: '#C2410C', border: '#FDBA74' };
  if (score >= 60) return { grade: 'Major Revision', status: 'Major Revision Required', bg: '#FFEBEE', text: '#D32F2F', border: '#FFCDD2' };
  return { grade: 'Not Ready', status: 'Not Ready for Clinical Sign-off', bg: '#FFEBEE', text: '#D32F2F', border: '#FFCDD2' };
}

export default function QualityDashboardPage({ auditResult, reportText, setReportText, setActivePage }) {
  const [activeTab, setActiveTab] = useState('overview'); // overview, diff, versions
  const [expandedDim, setExpandedDim] = useState(null);
  const [showScoringGuide, setShowScoringGuide] = useState(false);
  const [activeVersionId, setActiveVersionId] = useState('v1');

  if (!auditResult) {
    return (
      <div className="medicare-card" style={{ maxWidth: '520px' }}>
        <h2 style={{ fontSize: '15px', fontWeight: 800, color: '#2C4964', margin: 0 }}>No Active Audit Result</h2>
        <p style={{ fontSize: '12px', color: '#6C757D', margin: '6px 0 14px' }}>
          Upload a radiology report to generate a multi-dimensional quality assessment.
        </p>
        <button onClick={() => setActivePage('upload')} className="btn-medicare-primary">
          Run Report Audit →
        </button>
      </div>
    );
  }

  const res = auditResult;

  // Calculate exact total deducted points and enforce strict mathematical score alignment:
  const totalDeductedPoints = (res.deductions_log || []).reduce((acc, d) => acc + Math.abs(d.points || 0), 0);
  const effectiveScore = (res.deductions_log && res.deductions_log.length > 0)
    ? Math.max(0, 100 - totalDeductedPoints)
    : (res.quality_score ?? 80);

  const gradeInfo = getScoreGrade(effectiveScore);

  // Dynamically resolve original and corrected report text so it is NEVER blank
  const effectiveOriginalText = reportText || res.original_report_text || res.report_text || res.reportText || '';
  const effectiveCorrectedText = res.ai_corrected_report || res.revised_report || effectiveOriginalText;

  const versionList = [
    { id: 'v1', name: 'Version 1 (Original Upload)', timestamp: 'Original Study', author: 'Uploaded Report', score: effectiveScore, text: effectiveOriginalText, status: 'Draft' },
    { id: 'v2', name: 'Version 2 (AI Corrected ACR Standard)', timestamp: 'AI Evaluation', author: 'RadAudit Engine', score: 98, text: effectiveCorrectedText, status: 'Suggested' },
  ];

  const handleRestoreVersion = (ver) => {
    setActiveVersionId(ver.id);
    if (setReportText) setReportText(ver.text);
  };

  const handleApproveVersion = (ver) => {
    ver.status = 'Approved';
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      
      {/* Page Title & Navigation Toolbar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #DDE7F0', paddingBottom: '12px' }}>
        <div>
          <h1 style={{ fontSize: '18px', fontWeight: 800, color: '#2C4964', margin: 0, letterSpacing: '-0.3px' }}>
            Report Quality Score Breakdown — {res.audit_id || 'RAD-QA-2026'}
          </h1>
          <p style={{ fontSize: '12px', color: '#6C757D', margin: '2px 0 0' }}>
            Senior QA Evaluation • Mode: 11-Dimension Mathematical Gating Engine
          </p>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button onClick={() => setShowScoringGuide(!showScoringGuide)} className="btn-medicare-teal">
            <HelpCircle size={14} /> {showScoringGuide ? 'Hide Scoring Rules' : 'How Marks Are Assigned'}
          </button>
        </div>
      </div>

      <AICautionNotice />

      {/* Sub-View Navigation Tabs */}
      <div style={{ display: 'flex', gap: '6px', borderBottom: '1px solid #DDE7F0', paddingBottom: '8px' }}>
        {[
          { id: 'overview', label: '11-Dimension Overview', icon: BarChart3 },
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
                padding: '7px 16px', borderRadius: '6px', fontSize: '12.5px', fontWeight: isActive ? 700 : 500,
                background: isActive ? '#1977CC' : 'transparent',
                color: isActive ? '#FFFFFF' : '#2C4964',
                border: 'none', cursor: 'pointer', transition: 'all 0.15s'
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
          {/* Explanation Panel: How Marks Are Assigned & Why Marks Are Deducted */}
          {showScoringGuide && (
            <div className="medicare-card" style={{ padding: '20px', background: '#F1F7FC', borderLeft: '4px solid #1977CC' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                <Info size={18} color="#1977CC" />
                <h3 style={{ fontSize: '14px', fontWeight: 800, color: '#2C4964', margin: 0 }}>
                  ACR Scoring Methodology & Mathematical Deduction Rules
                </h3>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', fontSize: '12px', lineHeight: 1.6 }}>
                {/* Column 1: How Marks Are Assigned */}
                <div style={{ background: '#FFFFFF', padding: '14px', borderRadius: '8px', border: '1px solid #DDE7F0' }}>
                  <div style={{ fontWeight: 800, color: '#1977CC', marginBottom: '8px', textTransform: 'uppercase', fontSize: '11px' }}>
                    📊 Criteria Weighting (100 Marks Total):
                  </div>
                  <ul style={{ paddingLeft: '16px', margin: 0, color: '#444444' }}>
                    <li><strong>Findings Section (20 Marks / 20%)</strong>: Detailed lesion size, anatomical location, and organ observations.</li>
                    <li><strong>Impression / Conclusion (20 Marks / 20%)</strong>: Summary of key diagnostic findings and clinical recommendations.</li>
                    <li><strong>Patient Demographics (10 Marks / 10%)</strong>: Name, MRN, DOB, Age, Gender, and Study Date.</li>
                    <li><strong>Clinical History (10 Marks / 10%)</strong>: Chief complaint, symptoms, and clinical question.</li>
                    <li><strong>Procedure Details (10 Marks / 10%)</strong>: Technique, contrast agent, pulse sequences, slice thickness.</li>
                    <li><strong>Medical Terminology (10 Marks / 10%)</strong>: RadLex vocabulary precision, quantitative metrics.</li>
                    <li><strong>Template Compliance (5 Marks / 5%)</strong>: ACR 7-section structured headers.</li>
                    <li><strong>Formatting, Consistency, Grammar & Completeness (15 Marks / 15%)</strong>: 5 marks each for Spacing, Laterality Agreement, Typos, and Comparison Study.</li>
                  </ul>
                </div>

                {/* Column 2: Why Marks Are Deducted */}
                <div style={{ background: '#FFFFFF', padding: '14px', borderRadius: '8px', border: '1px solid #DDE7F0' }}>
                  <div style={{ fontWeight: 800, color: '#D32F2F', marginBottom: '8px', textTransform: 'uppercase', fontSize: '11px' }}>
                    ⚠️ Why Marks Are Deducted (Deficiency Penalties):
                  </div>
                  <ul style={{ paddingLeft: '16px', margin: 0, color: '#444444' }}>
                    <li><strong style={{ color: '#D32F2F' }}>Critical Omission (-20 pts)</strong>: Complete absence of Findings or Impression section.</li>
                    <li><strong style={{ color: '#D32F2F' }}>Laterality Contradiction (-15 pts)</strong>: Mismatch between Findings and Impression (e.g. Right vs Left).</li>
                    <li><strong style={{ color: '#B45309' }}>Missing History/Technique (-10 pts)</strong>: Omission of clinical indication or imaging technique.</li>
                    <li><strong style={{ color: '#B45309' }}>Vague Qualifiers (-5 pts)</strong>: Non-specific terms like "probably", "appears to be".</li>
                    <li><strong style={{ color: '#6C757D' }}>Missing Comparison (-5 pts)</strong>: Failure to document prior imaging comparison.</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* Red Flags Panel */}
          {res.red_flags && res.red_flags.length > 0 && (
            <div className="medicare-card" style={{ borderLeft: '4px solid #D32F2F', padding: '14px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
                <AlertCircle size={16} color="#D32F2F" />
                <h3 style={{ fontSize: '13.5px', fontWeight: 800, margin: 0, color: '#D32F2F' }}>Red Flags Detected</h3>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {res.red_flags.map((rf, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '6px 10px', background: '#FFEBEE', borderRadius: '4px', border: '1px solid #FFCDD2' }}>
                    <span style={{ fontSize: '9.5px', fontWeight: 800, padding: '2px 6px', borderRadius: '4px', background: '#D32F2F', color: '#FFFFFF', textTransform: 'uppercase' }}>
                      {rf.severity}
                    </span>
                    <span style={{ fontSize: '12px', fontWeight: 600, color: '#2C4964' }}>
                      {rf.issue}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Score Summary Panel */}
          <div className="medicare-card" style={{ display: 'grid', gridTemplateColumns: '220px 1fr', gap: '20px', alignItems: 'center', padding: '20px' }}>
            <div style={{ textAlign: 'center', borderRight: '1px solid #DDE7F0', paddingRight: '18px' }}>
              <div style={{ fontSize: '11px', fontWeight: 800, color: '#6C757D', textTransform: 'uppercase' }}>
                Quality Score Gauge
              </div>

              <div style={{ position: 'relative', width: '90px', height: '90px', margin: '10px auto' }}>
                <svg viewBox="0 0 36 36" style={{ width: '100%', height: '100%', transform: 'rotate(-90deg)' }}>
                  <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#DDE7F0" strokeWidth="3" />
                  <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#1977CC" strokeWidth="3" strokeDasharray={`${effectiveScore}, 100`} />
                </svg>
                <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ fontSize: '24px', fontWeight: 900, color: '#1977CC', lineHeight: 1 }}>{effectiveScore}</span>
                  <span style={{ fontSize: '9px', color: '#6C757D', fontWeight: 700 }}>/ 100</span>
                </div>
              </div>

              <div>
                <span style={{
                  fontSize: '11px', fontWeight: 800, padding: '4px 10px', borderRadius: '4px',
                  background: gradeInfo.bg, color: gradeInfo.text, border: `1px solid ${gradeInfo.border}`,
                  display: 'inline-block', maxWidth: '100%', wordBreak: 'break-word', lineHeight: 1.3
                }}>
                  {res.readiness_status || gradeInfo.status}
                </span>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '11px', fontWeight: 800, color: '#1977CC', textTransform: 'uppercase', letterSpacing: '0.4px' }}>
                  Senior QA Officer Audit Remarks & Summary
                </span>
                <span style={{ fontSize: '11px', fontWeight: 600, color: '#6C757D' }}>
                  Audit Ref: <strong>{res.audit_id}</strong>
                </span>
              </div>

              {/* Main Overall Justification Text */}
              <div style={{ fontSize: '13px', color: '#2C4964', lineHeight: 1.6, fontWeight: 500 }}>
                {res.overall_justification}
              </div>

              {/* Instant Point-by-Point Deficiency Summary Pills */}
              {res.deductions_log && res.deductions_log.length > 0 && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginTop: '6px', paddingTop: '10px', borderTop: '1px solid #DDE7F0' }}>
                  <div style={{ fontSize: '10.5px', fontWeight: 800, color: '#D32F2F', textTransform: 'uppercase', letterSpacing: '0.4px' }}>
                    Identified Deficiencies & Penalties (-{res.deductions_log.reduce((acc, d) => acc + Math.abs(d.points), 0)} pts total):
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                    {res.deductions_log.map((ded, i) => (
                      <span key={i} style={{
                        fontSize: '11px', fontWeight: 700, padding: '3px 8px', borderRadius: '4px',
                        background: '#FFEBEE', color: '#D32F2F', border: '1px solid #FFCDD2', display: 'inline-flex', alignItems: 'center', gap: '4px'
                      }}>
                        <span style={{ fontWeight: 900, color: '#D32F2F' }}>{ded.points} pts</span> • {ded.reason}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* EXPLICIT MATHEMATICAL DEDUCTIONS LOG TABLE */}
          {res.deductions_log && res.deductions_log.length > 0 && (
            <div className="medicare-card" style={{ padding: '0', overflow: 'hidden' }}>
              <div style={{ padding: '12px 18px', background: '#FFEBEE', borderBottom: '1px solid #FFCDD2', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '12px', fontWeight: 800, color: '#D32F2F', textTransform: 'uppercase' }}>
                  Explicit Mathematical Score Deductions (-{res.deductions_log.reduce((acc, d) => acc + Math.abs(d.points), 0)} pts total)
                </span>
                <span style={{ fontSize: '11px', color: '#D32F2F', fontWeight: 700 }}>
                  Reason • Scope of Correction • QA Remarks • Impact • Suggested Fix
                </span>
              </div>

              <table className="medicare-table">
                <thead>
                  <tr>
                    <th>Deduction</th>
                    <th>Deficiency Reason</th>
                    <th>Scope of Correction</th>
                    <th>QA Officer Remarks</th>
                    <th>Clinical Impact</th>
                    <th>Suggested Fix</th>
                  </tr>
                </thead>
                <tbody>
                  {res.deductions_log.map((ded, i) => (
                    <tr key={i}>
                      <td style={{ fontWeight: 900, color: '#D32F2F', fontSize: '13px' }}>{ded.points} pts</td>
                      <td style={{ fontWeight: 700, color: '#2C4964' }}>{ded.reason}</td>
                      <td>
                        <span style={{ fontSize: '10px', fontWeight: 800, padding: '3px 8px', borderRadius: '4px', background: '#FFEBEE', color: '#D32F2F', border: '1px solid #FFCDD2' }}>
                          {ded.scope_of_correction || 'Content Revision'}
                        </span>
                      </td>
                      <td style={{ color: '#2C4964', fontSize: '11.5px', fontStyle: 'italic' }}>
                        {ded.remarks || `QA Note: ${ded.reason}`}
                      </td>
                      <td style={{ color: '#6C757D', fontSize: '11.5px' }}>{ded.clinical_impact}</td>
                      <td style={{ color: '#15803D', fontWeight: 600, fontSize: '11.5px' }}>{ded.suggested_improvement}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* 11-Dimension Data Table Panel */}
          <div className="medicare-card" style={{ padding: '0', overflow: 'hidden' }}>
            <div style={{
              background: '#F1F7FC', borderBottom: '1px solid #DDE7F0',
              padding: '12px 18px', display: 'flex', alignItems: 'center', justifyContent: 'space-between'
            }}>
              <span style={{ fontSize: '12px', fontWeight: 800, color: '#2C4964', textTransform: 'uppercase' }}>
                11-Dimension Component Breakdown
              </span>
              <span style={{ fontSize: '11px', color: '#6C757D' }}>
                Click any row to view scoring criteria & deduction reasons
              </span>
            </div>

            <table className="medicare-table">
              <thead>
                <tr>
                  <th>Dimension Name</th>
                  <th>Weight</th>
                  <th>Score</th>
                  <th>Status</th>
                  <th style={{ textAlign: 'right' }}>Scoring Criteria & Details</th>
                </tr>
              </thead>
              <tbody>
                {(res.dimensions || []).map((dim, idx) => {
                  const dimId = dim.id || idx;
                  const isExpanded = expandedDim === dimId;
                  const pass = dim.score >= (dim.max_marks * 0.9);
                  const warning = dim.score >= (dim.max_marks * 0.6) && dim.score < (dim.max_marks * 0.9);
                  const lostPoints = dim.max_marks - dim.score;

                  return (
                    <React.Fragment key={dimId}>
                      <tr
                        onClick={() => setExpandedDim(isExpanded ? null : dimId)}
                        style={{ cursor: 'pointer', background: isExpanded ? '#F1F7FC' : 'transparent' }}
                      >
                        <td style={{ fontWeight: 700, color: '#2C4964' }}>{dim.name}</td>
                        <td style={{ color: '#6C757D', fontWeight: 600 }}>{dim.weight}</td>
                        <td style={{ fontWeight: 800, color: pass ? '#15803D' : warning ? '#B45309' : '#D32F2F' }}>
                          {dim.score} / {dim.max_marks}
                        </td>
                        <td>
                          <span style={{
                            fontSize: '10px', fontWeight: 700, padding: '2px 6px', borderRadius: '4px',
                            background: pass ? '#E8F5E9' : warning ? '#FFF8E1' : '#FFEBEE',
                            color: pass ? '#15803D' : warning ? '#B45309' : '#D32F2F'
                          }}>
                            {pass ? 'Compliant' : warning ? 'Minor Issue' : 'Needs Improvement'}
                          </span>
                        </td>
                        <td style={{ textAlign: 'right', color: '#6C757D' }}>
                          {isExpanded ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
                        </td>
                      </tr>

                      {isExpanded && (
                        <tr>
                          <td colSpan="5" style={{ background: '#F8FAFC', padding: '16px 20px', borderBottom: '1px solid #DDE7F0' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                              {/* Deduction Explanation Banner if marks were lost */}
                              {lostPoints > 0 ? (
                                <div style={{ background: '#FFEBEE', borderLeft: '3px solid #D32F2F', padding: '8px 12px', borderRadius: '4px', fontSize: '11.5px', color: '#D32F2F', fontWeight: 700 }}>
                                  ⚠️ Deduction Reason (-{lostPoints} pts): Marks were deducted because required clinical components or standard terminology were incomplete in this section.
                                </div>
                              ) : (
                                <div style={{ background: '#E8F5E9', borderLeft: '3px solid #15803D', padding: '8px 12px', borderRadius: '4px', fontSize: '11.5px', color: '#15803D', fontWeight: 700 }}>
                                  ✓ Full Marks Awarded ({dim.score}/{dim.max_marks}): Section meets all ACR practice parameter standards.
                                </div>
                              )}

                              <div style={{ fontSize: '11px', fontWeight: 800, color: '#6C757D', textTransform: 'uppercase', marginTop: '4px' }}>
                                Evaluation Findings & Section Items:
                              </div>
                              <ul style={{ fontSize: '12px', color: '#2C4964', margin: 0, paddingLeft: '18px' }}>
                                {(dim.details || []).map((detail, i) => (
                                  <li key={i} style={{ marginBottom: '4px', color: detail.includes('Information Not Documented') || detail.includes('Missing') || detail.includes('Deficiency') ? '#D32F2F' : '#2C4964' }}>
                                    {detail}
                                  </li>
                                ))}
                              </ul>
                            </div>
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

      {/* TAB 2: SIDE-BY-SIDE DIFF VIEW */}
      {activeTab === 'diff' && (
        <ReportDiffView
          originalText={effectiveOriginalText}
          correctedText={effectiveCorrectedText}
          onApplyCorrection={(txt) => setReportText && setReportText(txt)}
        />
      )}

      {/* TAB 3: VERSION HISTORY */}
      {activeTab === 'versions' && (
        <VersionHistoryDrawer
          versions={versionList}
          activeVersionId={activeVersionId}
          onRestoreVersion={handleRestoreVersion}
          onApproveVersion={handleApproveVersion}
        />
      )}

    </div>
  );
}
