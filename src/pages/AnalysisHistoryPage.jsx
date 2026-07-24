import React, { useState } from 'react';
import { History, Search, Filter, Eye, Trash2, Calendar, FileText, CheckCircle2, AlertTriangle, XCircle, ArrowUpDown } from 'lucide-react';
import AICautionNotice from '../components/AICautionNotice';

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

  const handleClearAll = () => {
    if (window.confirm('Are you sure you want to clear all audit history records?')) {
      setHistoryItems([]);
      localStorage.removeItem('rad_audit_history');
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #DDE7F0', paddingBottom: '12px' }}>
        <div>
          <h1 style={{ fontSize: '20px', fontWeight: 800, color: '#2C4964', margin: 0, letterSpacing: '-0.3px' }}>
            Radiology Audit History Logs
          </h1>
          <p style={{ fontSize: '12px', color: '#6C757D', margin: '3px 0 0' }}>
            Central repository of evaluated radiology reports and departmental quality records ({historyItems.length} records)
          </p>
        </div>
        {historyItems.length > 0 && (
          <button onClick={handleClearAll} className="btn-destructive">
            <Trash2 size={13} /> Clear Log History
          </button>
        )}
      </div>

      <AICautionNotice />

      {/* Filter & Search Bar */}
      <div className="medicare-card" style={{ padding: '16px', display: 'flex', gap: '14px', flexWrap: 'wrap', alignItems: 'center' }}>
        {/* Search Input */}
        <div style={{ position: 'relative', flex: 1, minWidth: '220px' }}>
          <Search size={15} color="#6C757D" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
          <input
            type="text"
            placeholder="Search by accession ID, modality, or report text..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: '100%', padding: '8px 12px 8px 34px', borderRadius: '6px',
              border: '1px solid #CBD5E1', fontSize: '12.5px', color: '#2C4964', outline: 'none'
            }}
          />
        </div>

        {/* Modality Filter */}
        <select
          value={selectedModality}
          onChange={(e) => setSelectedModality(e.target.value)}
          style={{
            padding: '8px 12px', borderRadius: '6px', border: '1px solid #CBD5E1',
            fontSize: '12px', fontWeight: 600, color: '#2C4964', background: '#FFFFFF', outline: 'none'
          }}
        >
          <option value="All">All Modalities</option>
          {Array.from(new Set(historyItems.map(i => i.modality))).filter(Boolean).map(m => (
            <option key={m} value={m}>{m}</option>
          ))}
        </select>

        {/* Score Filter */}
        <select
          value={selectedScoreFilter}
          onChange={(e) => setSelectedScoreFilter(e.target.value)}
          style={{
            padding: '8px 12px', borderRadius: '6px', border: '1px solid #CBD5E1',
            fontSize: '12px', fontWeight: 600, color: '#2C4964', background: '#FFFFFF', outline: 'none'
          }}
        >
          <option value="All">All Scores</option>
          <option value="green">Compliant (90-100)</option>
          <option value="amber">Needs Review (70-89)</option>
          <option value="red">Critical Revision (&lt; 70)</option>
        </select>

        {/* Sort Order */}
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          style={{
            padding: '8px 12px', borderRadius: '6px', border: '1px solid #CBD5E1',
            fontSize: '12px', fontWeight: 600, color: '#2C4964', background: '#FFFFFF', outline: 'none'
          }}
        >
          <option value="newest">Sort: Newest First</option>
          <option value="score_desc">Sort: Highest Score</option>
          <option value="score_asc">Sort: Lowest Score</option>
        </select>
      </div>

      {/* History Items Table */}
      {filteredItems.length === 0 ? (
        <div className="medicare-card" style={{ padding: '36px', textAlign: 'center' }}>
          <History size={32} color="#CBD5E1" style={{ marginBottom: '12px' }} />
          <h3 style={{ fontSize: '15px', fontWeight: 800, color: '#2C4964', margin: '0 0 6px' }}>
            No Audit Logs Found
          </h3>
          <p style={{ fontSize: '12px', color: '#6C757D', margin: '0 0 16px' }}>
            No evaluated radiology reports match your current search or filter criteria.
          </p>
          <button onClick={() => setActivePage('upload')} className="btn-medicare-primary">
            Run New Audit →
          </button>
        </div>
      ) : (
        <div className="medicare-card" style={{ padding: '0', overflow: 'hidden' }}>
          <table className="medicare-table">
            <thead>
              <tr>
                <th>Audit ID & Timestamp</th>
                <th>Report Title / Accession</th>
                <th>Modality</th>
                <th>Quality Index</th>
                <th>ACR Status</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredItems.map((item) => {
                const score = item.quality_score || 0;
                const pass = score >= 90;
                const warn = score >= 70 && score < 90;
                const auditId = item.audit_result?.audit_id || item.id;
                const dateStr = item.timestamp ? new Date(item.timestamp).toLocaleString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }) : 'Recent';

                return (
                  <tr key={item.id}>
                    <td>
                      <div style={{ fontWeight: 800, color: '#1977CC', fontSize: '12px' }}>{auditId}</div>
                      <div style={{ fontSize: '10.5px', color: '#6C757D', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '2px' }}>
                        <Calendar size={11} /> {dateStr}
                      </div>
                    </td>
                    <td>
                      <div style={{ fontWeight: 700, color: '#2C4964', fontSize: '12.5px' }}>{item.report_title}</div>
                    </td>
                    <td>
                      <span style={{ fontSize: '10px', fontWeight: 700, padding: '2px 8px', borderRadius: '4px', background: '#F1F7FC', border: '1px solid #DDE7F0', color: '#2C4964' }}>
                        {item.modality}
                      </span>
                    </td>
                    <td>
                      <div style={{ fontWeight: 900, fontSize: '14px', color: pass ? '#15803D' : warn ? '#B45309' : '#D32F2F' }}>
                        {score} / 100
                      </div>
                    </td>
                    <td>
                      <span style={{
                        fontSize: '10px', fontWeight: 700, padding: '2px 6px', borderRadius: '4px',
                        background: pass ? '#E8F5E9' : warn ? '#FFF8E1' : '#FFEBEE',
                        color: pass ? '#15803D' : warn ? '#B45309' : '#D32F2F'
                      }}>
                        {item.readiness_status || (pass ? 'Hospital Ready' : 'Requires Review')}
                      </span>
                    </td>
                    <td style={{ textAlign: 'right' }}>
                      <div style={{ display: 'flex', gap: '6px', justifyContent: 'flex-end' }}>
                        <button
                          onClick={() => { onSelectAudit(item); setActivePage('quality'); }}
                          className="btn-medicare-teal"
                          style={{ fontSize: '11px', padding: '4px 8px' }}
                          title="View Quality Dashboard"
                        >
                          <Eye size={12} /> Inspect
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
              })}
            </tbody>
          </table>
        </div>
      )}

    </div>
  );
}
