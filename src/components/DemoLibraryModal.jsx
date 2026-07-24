import React, { useState, useMemo } from 'react';
import { Search, Filter, Shuffle, FileText, CheckCircle2, AlertTriangle, XCircle, ArrowRight, Eye, X, Sparkles, BookOpen } from 'lucide-react';
import { DEMO_REPORTS } from '../data/demoReports';

export default function DemoLibraryModal({ isOpen, onClose, onSelectReport }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedQuality, setSelectedQuality] = useState('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');
  const [previewReport, setPreviewReport] = useState(null);

  const categories = ['All', 'X-Ray', 'CT', 'MRI', 'Ultrasound', 'Mammography'];
  const qualityTiers = ['All', 'Excellent', 'Good', 'Average', 'Poor', 'Critical'];
  const difficulties = ['All', 'Easy', 'Moderate', 'Complex'];

  const filteredReports = useMemo(() => {
    return DEMO_REPORTS.filter((rep) => {
      const matchSearch =
        rep.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        rep.modality.toLowerCase().includes(searchQuery.toLowerCase()) ||
        rep.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        rep.reportText.toLowerCase().includes(searchQuery.toLowerCase());

      const matchCat = selectedCategory === 'All' || rep.category === selectedCategory;
      const matchQual = selectedQuality === 'All' || rep.qualityLevel === selectedQuality;
      const matchDiff = selectedDifficulty === 'All' || rep.difficulty === selectedDifficulty;

      return matchSearch && matchCat && matchQual && matchDiff;
    });
  }, [searchQuery, selectedCategory, selectedQuality, selectedDifficulty]);

  if (!isOpen) return null;

  const handleRandomize = () => {
    const pool = filteredReports.length > 0 ? filteredReports : DEMO_REPORTS;
    const randomCase = pool[Math.floor(Math.random() * pool.length)];
    onSelectReport(randomCase);
    onClose();
  };

  const getQualityBadgeColor = (level) => {
    switch (level) {
      case 'Excellent': return { bg: '#DCFCE7', text: '#15803D', border: '#86EFAC' };
      case 'Good': return { bg: '#FEF3C7', text: '#B45309', border: '#FDE68A' };
      case 'Average': return { bg: '#FEF08A', text: '#A16207', border: '#FDE047' };
      case 'Poor': return { bg: '#FFEDD5', text: '#C2410C', border: '#FDBA74' };
      case 'Critical': return { bg: '#FEE2E2', text: '#991B1B', border: '#FCA5A5' };
      default: return { bg: '#F1F5F9', text: '#475569', border: '#CBD5E1' };
    }
  };

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      background: 'rgba(15, 23, 42, 0.65)', backdropFilter: 'blur(4px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      zIndex: 1000, padding: '24px'
    }}>
      <div style={{
        background: 'var(--surface)', width: '100%', maxWidth: '1100px',
        maxHeight: '90vh', borderRadius: '12px', border: '1px solid var(--border)',
        boxShadow: '0 20px 50px rgba(0,0,0,0.3)', display: 'flex', flexDirection: 'column',
        overflow: 'hidden'
      }}>
        
        {/* Header Bar */}
        <div style={{
          padding: '20px 24px', borderBottom: '1px solid var(--border)',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          background: 'var(--surface-muted)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <BookOpen size={22} color="#0284C7" />
            <div>
              <h2 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
                Enterprise Radiology Demo Report Library
              </h2>
              <p style={{ fontSize: '12px', color: 'var(--text-muted)', margin: '2px 0 0' }}>
                35+ realistic clinical cases across 25 modalities and 5 quality evaluation tiers
              </p>
            </div>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button
              onClick={handleRandomize}
              className="btn-secondary"
              style={{ display: 'flex', alignItems: 'center', gap: '6px', background: '#F0FDF4', color: '#16A34A', borderColor: '#BBF7D0' }}
            >
              <Shuffle size={14} /> Surprise Me (Random Case)
            </button>
            <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}>
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Filter Controls Bar */}
        <div style={{ padding: '16px 24px', borderBottom: '1px solid var(--border)', display: 'flex', flexDirection: 'column', gap: '14px', background: 'var(--surface)' }}>
          {/* Search bar */}
          <div style={{ position: 'relative', width: '100%' }}>
            <Search size={16} color="var(--text-muted)" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
            <input
              type="text"
              placeholder="Search reports by title, modality, clinical finding, or pathology..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%', padding: '10px 12px 10px 38px', borderRadius: '8px',
                border: '1px solid var(--border)', fontSize: '13px', background: 'var(--surface-muted)',
                color: 'var(--text-primary)', outline: 'none'
              }}
            />
          </div>

          {/* Filter Pills Row */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', alignItems: 'center', fontSize: '12px' }}>
            {/* Category Filter */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', fontSize: '10px' }}>Modality:</span>
              <div style={{ display: 'flex', gap: '4px' }}>
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    style={{
                      padding: '4px 10px', borderRadius: '6px', fontSize: '11px', fontWeight: 600, border: 'none', cursor: 'pointer',
                      background: selectedCategory === cat ? '#0284C7' : 'var(--surface-muted)',
                      color: selectedCategory === cat ? '#FFF' : 'var(--text-secondary)'
                    }}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Quality Tier Filter */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', fontSize: '10px' }}>Quality Tier:</span>
              <div style={{ display: 'flex', gap: '4px' }}>
                {qualityTiers.map((q) => (
                  <button
                    key={q}
                    onClick={() => setSelectedQuality(q)}
                    style={{
                      padding: '4px 10px', borderRadius: '6px', fontSize: '11px', fontWeight: 600, border: 'none', cursor: 'pointer',
                      background: selectedQuality === q ? '#0F172A' : 'var(--surface-muted)',
                      color: selectedQuality === q ? '#FFF' : 'var(--text-secondary)'
                    }}
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>

            {/* Complexity Filter */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', fontSize: '10px' }}>Difficulty:</span>
              <div style={{ display: 'flex', gap: '4px' }}>
                {difficulties.map((d) => (
                  <button
                    key={d}
                    onClick={() => setSelectedDifficulty(d)}
                    style={{
                      padding: '4px 10px', borderRadius: '6px', fontSize: '11px', fontWeight: 600, border: 'none', cursor: 'pointer',
                      background: selectedDifficulty === d ? '#64748B' : 'var(--surface-muted)',
                      color: selectedDifficulty === d ? '#FFF' : 'var(--text-secondary)'
                    }}
                  >
                    {d}
                  </button>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* Reports Content Area */}
        <div style={{ padding: '24px', overflowY: 'auto', flex: 1, display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '16px', alignContent: 'start' }}>
          {filteredReports.length === 0 ? (
            <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '48px', color: 'var(--text-muted)' }}>
              <FileText size={32} style={{ opacity: 0.5, marginBottom: '8px' }} />
              <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-primary)' }}>No matching demo reports found</div>
              <div style={{ fontSize: '12px' }}>Try resetting your filters or search query.</div>
            </div>
          ) : (
            filteredReports.map((rep) => {
              const qBadge = getQualityBadgeColor(rep.qualityLevel);
              return (
                <div
                  key={rep.id}
                  className="enterprise-card"
                  style={{
                    display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
                    padding: '16px', border: '1px solid var(--border)', borderRadius: '8px',
                    transition: 'all 0.15s ease', cursor: 'pointer'
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                      <span style={{ fontSize: '10px', fontWeight: 800, padding: '2px 6px', borderRadius: '4px', background: 'var(--surface-muted)', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                        {rep.modality}
                      </span>
                      <span style={{ fontSize: '10px', fontWeight: 800, padding: '2px 8px', borderRadius: '4px', background: qBadge.bg, color: qBadge.text, border: `1px solid ${qBadge.border}` }}>
                        Expected: {rep.expectedScore}/100 ({rep.qualityLevel})
                      </span>
                    </div>

                    <h3 style={{ fontSize: '14px', fontWeight: 800, color: 'var(--text-primary)', margin: '0 0 6px 0', lineHeight: 1.4 }}>
                      {rep.title}
                    </h3>
                    <p style={{ fontSize: '12px', color: 'var(--text-secondary)', margin: '0 0 12px 0', lineHeight: 1.5 }}>
                      {rep.description}
                    </p>

                    {/* Flaws list preview */}
                    {rep.flaws && rep.flaws.length > 0 && (
                      <div style={{ fontSize: '11px', color: 'var(--text-muted)', background: 'var(--surface-muted)', padding: '8px', borderRadius: '6px', marginBottom: '16px' }}>
                        <span style={{ fontWeight: 700, color: '#DC2626' }}>Embedded Flaws: </span>
                        {rep.flaws.join(' • ')}
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div style={{ display: 'flex', gap: '8px', borderTop: '1px solid var(--border)', paddingTop: '12px' }}>
                    <button
                      onClick={() => setPreviewReport(rep)}
                      className="btn-secondary"
                      style={{ flex: 1, fontSize: '12px', padding: '6px 10px', justifyContent: 'center' }}
                    >
                      <Eye size={13} /> Preview
                    </button>
                    <button
                      onClick={() => { onSelectReport(rep); onClose(); }}
                      className="btn-primary"
                      style={{ flex: 1, fontSize: '12px', padding: '6px 10px', justifyContent: 'center' }}
                    >
                      Load Report →
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer info bar */}
        <div style={{ padding: '12px 24px', borderTop: '1px solid var(--border)', background: 'var(--surface-muted)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '12px', color: 'var(--text-muted)' }}>
          <span>Showing <strong>{filteredReports.length}</strong> of {DEMO_REPORTS.length} hospital cases</span>
          <span>Click <strong>Load Report</strong> to populate the editor and run AI analysis</span>
        </div>

      </div>

      {/* Preview Modal Overlay Drawer */}
      {previewReport && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(0, 0, 0, 0.7)', zIndex: 1100,
          display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px'
        }}>
          <div style={{
            background: 'var(--surface)', width: '100%', maxWidth: '720px',
            maxHeight: '85vh', borderRadius: '12px', border: '1px solid var(--border)',
            display: 'flex', flexDirection: 'column', overflow: 'hidden'
          }}>
            <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'var(--surface-muted)' }}>
              <div>
                <h3 style={{ fontSize: '15px', fontWeight: 800, margin: 0, color: 'var(--text-primary)' }}>{previewReport.title}</h3>
                <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Modality: {previewReport.modality} | Expected Score: {previewReport.expectedScore}/100</span>
              </div>
              <button onClick={() => setPreviewReport(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}><X size={18} /></button>
            </div>

            <div style={{ padding: '20px', overflowY: 'auto', flex: 1, fontFamily: 'monospace', fontSize: '12px', lineHeight: 1.7, background: 'var(--surface)', whiteSpace: 'pre-wrap', color: 'var(--text-primary)' }}>
              {previewReport.reportText}
            </div>

            <div style={{ padding: '14px 20px', borderTop: '1px solid var(--border)', display: 'flex', justifyContent: 'flex-end', gap: '12px', background: 'var(--surface-muted)' }}>
              <button onClick={() => setPreviewReport(null)} className="btn-secondary">Close Preview</button>
              <button
                onClick={() => { onSelectReport(previewReport); setPreviewReport(null); onClose(); }}
                className="btn-primary"
              >
                Load This Report →
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
