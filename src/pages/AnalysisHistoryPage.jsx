import React, { useState } from 'react';
import { History, Search, Filter, Download, Eye, Trash2, Calendar, FileText, CheckCircle2, AlertTriangle, XCircle, ArrowUpDown } from 'lucide-react';
import AICautionNotice from '../components/AICautionNotice';
import { downloadPdfBlob } from '../utils/downloadHelper';

export default function AnalysisHistoryPage({ historyItems, setHistoryItems, onSelectAudit, setActivePage }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedModality, setSelectedModality] = useState('All');
  const [selectedScoreFilter, setSelectedScoreFilter] = useState('All');
  const [sortBy, setSortBy] = useState('newest'); // newest, score_desc, score_asc

  const filteredItems = historyItems
    .filter((item) => {
      const auditId = item.audit_result?.audit_id || '';
      const text = item.audit_result?.overall_justification || '';
      const matchesSearch = (item.report_title || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
                            (item.modality || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
                            auditId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            text.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesModality = selectedModality === 'All' || item.modality === selectedModality;
      const score = item.quality_score || 0;
      let matchesScore = true;
      if (selectedScoreFilter === 'green') matchesScore = score >= 90;
      else if (selectedScoreFilter === 'amber') matchesScore = score >= 70 && score < 90;
      else if (selectedScoreFilter === 'red') matchesScore = score < 70;

      return matchesSearch && matchesModality && matchesScore;
    })
    .sort((a, b) => {
      if (sortBy === 'score_desc') return (b.quality_score || 0) - (a.quality_score || 0);
      if (sortBy === 'score_asc') return (a.quality_score || 0) - (b.quality_score || 0);
      return new Date(b.timestamp || 0) - new Date(a.timestamp || 0);
    });

  const handleDelete = (id) => {
    const updated = historyItems.filter(item => item.id !== id);
    setHistoryItems(updated);
    localStorage.setItem('rad_audit_history', JSON.stringify(updated));
  };

  const handleDownloadPDF = async (item) => {
    try {
      const resp = await fetch('/api/generate-pdf', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          filename: item.report_title || 'radiology_report.txt',
          modality: item.modality || 'Chest X-Ray',
          audit_result: item.audit_result
        })
      });
      if (!resp.ok) throw new Error('Failed to generate PDF');
      const blob = await resp.blob();
      const fn = `radiology_audit_${(item.modality || 'report').replace(/\s+/g, '_')}_${Date.now()}.pdf`;
      downloadPdfBlob(blob, fn);
    } catch (e) {
      alert('PDF Download Error: ' + e.message);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid var(--border)', paddingBottom: '12px' }}>
        <div>
          <h1 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--text-primary)', margin: 0, letterSpacing: '-0.3px' }}>
            Analysis History & Audit Repository
          </h1>
          <p style={{ fontSize: '12px', color: 'var(--text-muted)', margin: '2px 0 0' }}>
            Historical log of clinical radiology QA evaluations, compliance audits, and exported records
          </p>
        </div>
        <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-muted)' }}>
          Total Archival Records: <strong style={{ color: 'var(--text-primary)' }}>{historyItems.length}</strong>
        </span>
      </div>

      <AICautionNotice />

      {/* Search & Multi-Parametric Filter Toolbar */}
      <div className="enterprise-card" style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '12px', padding: '10px 14px' }}>
        <div style={{ position: 'relative', width: '300px' }}>
          <Search size={14} color="var(--text-muted)" style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)' }} />
          <input
            type="text"
            placeholder="Search Audit ID, Patient, Modality, or keyword..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            style={{
              width: '100%', padding: '6px 10px 6px 30px', borderRadius: '4px',
              border: '1px solid var(--border)', fontSize: '12px',
              background: 'var(--surface-muted)', color: 'var(--text-primary)', outline: 'none'
            }}
          />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <select
            value={selectedModality}
            onChange={e => setSelectedModality(e.target.value)}
            style={{
              padding: '6px 10px', borderRadius: '4px', border: '1px solid var(--border)',
              fontSize: '11.5px', fontWeight: 600, background: 'var(--surface-muted)', color: 'var(--text-primary)'
            }}
          >
            <option value="All">All Modalities</option>
            <option value="Chest X-Ray">Chest X-Ray</option>
            <option value="Brain MRI">Brain MRI</option>
            <option value="Abdomen CT">Abdomen CT</option>
            <option value="Spine MRI">Spine MRI</option>
            <option value="Ultrasound">Ultrasound</option>
            <option value="Mammography">Mammography</option>
          </select>

          <select
            value={selectedScoreFilter}
            onChange={e => setSelectedScoreFilter(e.target.value)}
            style={{
              padding: '6px 10px', borderRadius: '4px', border: '1px solid var(--border)',
              fontSize: '11.5px', fontWeight: 600, background: 'var(--surface-muted)', color: 'var(--text-primary)'
            }}
          >
            <option value="All">All Scores</option>
            <option value="green">Compliant (≥90)</option>
            <option value="amber">Minor Issues (70-89)</option>
            <option value="red">Non-Compliant (&lt;70)</option>
          </select>

          <select
            value={sortBy}
            onChange={e => setSortBy(e.target.value)}
            style={{
              padding: '6px 10px', borderRadius: '4px', border: '1px solid var(--border)',
              fontSize: '11.5px', fontWeight: 600, background: 'var(--surface-muted)', color: 'var(--text-primary)'
            }}
          >
            <option value="newest">Sort: Newest First</option>
            <option value="score_desc">Sort: Score High to Low</option>
            <option value="score_asc">Sort: Score Low to High</option>
          </select>
        </div>
      </div>

      {/* History Data Table */}
      <div className="enterprise-card" style={{ padding: 0, overflow: 'hidden' }}>
        <table className="enterprise-table">
          <thead>
            <tr>
              <th>Audit Reference ID</th>
              <th>Report Title / Modality</th>
              <th>Audit Date</th>
              <th>Quality Index</th>
              <th>Status Grade</th>
              <th style={{ textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredItems.length === 0 ? (
              <tr>
                <td colSpan="6" style={{ textAlign: 'center', padding: '36px', color: 'var(--text-muted)' }}>
                  <FileText size={28} style={{ opacity: 0.5, marginBottom: '6px' }} />
                  <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)' }}>No audit records found</div>
                  <div style={{ fontSize: '11.5px' }}>Run a report audit to populate the archival history log.</div>
                </td>
              </tr>
            ) : (
              filteredItems.map((item) => {
                const score = item.quality_score || 0;
                const pass = score >= 90;
                const warn = score >= 70 && score < 90;
                const auditId = item.audit_result?.audit_id || `RAD-QA-2026-${item.id.slice(0, 4)}`;

                return (
                  <tr key={item.id}>
                    <td style={{ fontWeight: 800, color: 'var(--text-primary)', fontFamily: 'monospace' }}>
                      {auditId}
                    </td>
                    <td>
                      <div style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{item.report_title || 'Radiology Report'}</div>
                      <div style={{ fontSize: '10.5px', color: 'var(--text-muted)' }}>{item.modality}</div>
                    </td>
                    <td style={{ color: 'var(--text-muted)', fontSize: '11px' }}>
                      {item.timestamp ? new Date(item.timestamp).toLocaleString() : 'Recent'}
                    </td>
                    <td style={{ fontWeight: 900, color: pass ? '#15803D' : warn ? '#B45309' : '#B91C1C' }}>
                      {score} / 100
                    </td>
                    <td>
                      <span style={{
                        fontSize: '9.5px', fontWeight: 700, padding: '2px 6px', borderRadius: '4px',
                        background: pass ? '#DCFCE7' : warn ? '#FEF3C7' : '#FEE2E2',
                        color: pass ? '#15803D' : warn ? '#B45309' : '#B91C1C'
                      }}>
                        {item.readiness_status || (pass ? 'Hospital Ready' : 'Requires Review')}
                      </span>
                    </td>
                    <td style={{ textAlign: 'right' }}>
                      <div style={{ display: 'flex', gap: '6px', justifyContent: 'flex-end' }}>
                        <button
                          onClick={() => { onSelectAudit(item); setActivePage('quality'); }}
                          className="btn-secondary"
                          style={{ fontSize: '11px', padding: '4px 8px' }}
                          title="View Quality Dashboard"
                        >
                          <Eye size={12} /> Inspect
                        </button>
                        <button
                          onClick={() => handleDownloadPDF(item)}
                          className="btn-outline"
                          style={{ fontSize: '11px', padding: '4px 8px' }}
                          title="Download PDF Certificate"
                        >
                          <Download size={12} /> PDF
                        </button>
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="btn-destructive"
                          style={{ fontSize: '11px', padding: '4px 8px' }}
                          title="Delete Record"
                        >
                          <Trash2 size={12} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

    </div>
  );
}
