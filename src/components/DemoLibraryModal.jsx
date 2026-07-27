import React, { useState, useMemo } from 'react';
import { Search, Filter, Shuffle, FileText, CheckCircle2, AlertTriangle, XCircle, Eye, X, Sparkles, BookOpen } from 'lucide-react';
import { DEMO_REPORTS } from '../data/demoReports';

export default function DemoLibraryModal({ isOpen, onClose, onSelectReport, onSelectDemo }) {
  const handleSelect = (rep) => {
    if (typeof onSelectReport === 'function') onSelectReport(rep);
    if (typeof onSelectDemo === 'function') onSelectDemo(rep);
    onClose();
  };
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedQuality, setSelectedQuality] = useState('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');
  const [previewReport, setPreviewReport] = useState(null);

  const categories = ['All', 'X-Ray', 'CT', 'MRI', 'Ultrasound', 'Mammography', 'Angiography / Doppler'];
  const qualityTiers = ['All', 'Excellent', 'Good', 'Average', 'Poor', 'Critical'];
  const difficulties = ['All', 'Easy', 'Moderate', 'Complex'];

  const filteredReports = useMemo(() => {
    return DEMO_REPORTS.filter((rep) => {
      const q = searchQuery.toLowerCase();
      const matchSearch =
        !q ||
        rep.title.toLowerCase().includes(q) ||
        rep.modality.toLowerCase().includes(q) ||
        rep.description.toLowerCase().includes(q) ||
        rep.reportText.toLowerCase().includes(q) ||
        (rep.flaws && rep.flaws.some((f) => f.toLowerCase().includes(q)));

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
        background: 'var(--surface)', width: '100%', maxWidth: '1150px',
        maxHeight: '92vh', borderRadius: '14px', border: '1px solid var(--border)',
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
            <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: '#0284C7', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FFF' }}>
              <BookOpen size={22} />
            </div>
            <div>
              <h2 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--text-primary)', margin: 0, letterSpacing: '-0.3px' }}>
                Enterprise Radiology Demo Report Library
              </h2>
              <p style={{ fontSize: '12px', color: 'var(--text-muted)', margin: '2px 0 0' }}>
                50 authentic clinical hospital cases across 25 modalities and 5 quality evaluation tiers
              </p>
            </div>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button
              onClick={handleRandomize}
              style={{
                display: 'flex', alignItems: 'center', gap: '6px',
                padding: '8px 16px', borderRadius: '8px',
                background: '#F0FDF4', color: '#16A34A', border: '1px solid #BBF7D0',
                fontSize: '12px', fontWeight: 700, cursor: 'pointer'
              }}
            >
              <Shuffle size={14} /> Surprise Me (Random Case)
            </button>
            <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', display: 'flex' }}>
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Filter Controls Bar */}
        <div style={{ padding: '16px 24px', borderBottom: '1px solid var(--border)', display: 'flex', flexDirection: 'column', gap: '14px', background: 'var(--surface)' }}>
          {/* Search bar */}
          <div style={{ position: 'relative', width: '100%' }}>
            <Search size={16} color="var(--text-muted)" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
            <input
              type="text"
              placeholder="Search reports by title, modality, clinical finding, or embedded flaw..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%', padding: '10px 14px 10px 40px', borderRadius: '8px',
                border: '1px solid var(--border)', fontSize: '13px', background: 'var(--surface-muted)',
                color: 'var(--text-primary)', outline: 'none'
              }}
            />
          </div>

          {/* Filter Pills Rows */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', alignItems: 'center', fontSize: '12px' }}>
            {/* Category Filter */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', fontSize: '10px' }}>Modality:</span>
              <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
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

            {/* Difficulty Filter */}
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

        {/* Reports Content Grid */}
        <div style={{ padding: '24px', overflowY: 'auto', flex: 1, display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '16px', alignContent: 'start' }}>
          {filteredReports.length === 0 ? (
            <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '48px', color: 'var(--text-muted)' }}>
              <FileText size={36} style={{ opacity: 0.5, marginBottom: '12px' }} />
              <div style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text-primary)' }}>No matching hospital reports found</div>
              <div style={{ fontSize: '12px', marginTop: '4px' }}>Try adjusting your search keywords or resetting your filters.</div>
            </div>
          ) : (
            filteredReports.map((rep) => {
              const qBadge = getQualityBadgeColor(rep.qualityLevel);
              return (
                <div
                  key={rep.id}
                  style={{
                    display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
                    padding: '18px', border: '1px solid var(--border)', borderRadius: '10px',
                    background: 'var(--surface)', transition: 'all 0.15s ease'
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                      <span style={{ fontSize: '10px', fontWeight: 800, padding: '3px 8px', borderRadius: '4px', background: 'var(--surface-muted)', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                        {rep.modality}
                      </span>
                      <span style={{ fontSize: '11px', fontWeight: 800, padding: '3px 9px', borderRadius: '4px', background: qBadge.bg, color: qBadge.text, border: `1px solid ${qBadge.border}` }}>
                        {rep.qualityLevel}
                      </span>
                    </div>

                    <h3 style={{ fontSize: '14px', fontWeight: 800, color: 'var(--text-primary)', margin: '0 0 6px 0', lineHeight: 1.4 }}>
                      {rep.title}
                    </h3>
                    <p style={{ fontSize: '12px', color: 'var(--text-muted)', margin: '0 0 14px 0', lineHeight: 1.5 }}>
                      {rep.description}
                    </p>

                    {/* Flaws list preview */}
                    {rep.flaws && rep.flaws.length > 0 && (
                      <div style={{ fontSize: '11px', color: 'var(--text-muted)', background: 'var(--surface-muted)', padding: '8px 10px', borderRadius: '6px', marginBottom: '16px' }}>
                        <span style={{ fontWeight: 700, color: rep.qualityLevel === 'Excellent' ? '#16A34A' : '#DC2626' }}>
                          {rep.qualityLevel === 'Excellent' ? 'Quality Highlights: ' : 'Embedded Flaws: '}
                        </span>
                        {rep.flaws.join(' • ')}
                      </div>
                    )}
                  </div>

                  {/* Card Actions */}
                  <div style={{ display: 'flex', gap: '10px', borderTop: '1px solid var(--border)', paddingTop: '14px' }}>
                    <button
                      onClick={() => setPreviewReport(rep)}
                      style={{
                        flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px',
                        padding: '8px 12px', borderRadius: '8px', background: 'var(--surface-muted)',
                        border: '1px solid var(--border)', color: 'var(--text-primary)',
                        fontSize: '12px', fontWeight: 600, cursor: 'pointer'
                      }}
                    >
                      <Eye size={14} /> Preview
                    </button>
                    <button
                      onClick={() => handleSelect(rep)}
                      style={{
                        flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px',
                        padding: '8px 12px', borderRadius: '8px', background: 'var(--accent)',
                        border: 'none', color: '#ffffff',
                        fontSize: '12px', fontWeight: 700, cursor: 'pointer'
                      }}
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
        <div style={{ padding: '14px 24px', borderTop: '1px solid var(--border)', background: 'var(--surface-muted)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '12px', color: 'var(--text-muted)' }}>
          <span>Showing <strong>{filteredReports.length}</strong> of {DEMO_REPORTS.length} hospital training cases</span>
          <span>Click <strong>Load Report</strong> to populate the editor and execute AI evaluation</span>
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
            background: 'var(--surface)', width: '100%', maxWidth: '750px',
            maxHeight: '88vh', borderRadius: '14px', border: '1px solid var(--border)',
            display: 'flex', flexDirection: 'column', overflow: 'hidden'
          }}>
            <div style={{ padding: '18px 24px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'var(--surface-muted)' }}>
              <div>
                <h3 style={{ fontSize: '16px', fontWeight: 800, margin: 0, color: 'var(--text-primary)' }}>{previewReport.title}</h3>
                <span style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '2px', display: 'inline-block' }}>
                  Modality: <strong>{previewReport.modality}</strong> | Quality Tier: <strong>{previewReport.qualityLevel}</strong>
                </span>
              </div>
              <button onClick={() => setPreviewReport(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}>
                <X size={20} />
              </button>
            </div>

            <div style={{ padding: '24px', overflowY: 'auto', flex: 1, fontFamily: 'monospace', fontSize: '13px', lineHeight: 1.7, background: 'var(--surface)', whiteSpace: 'pre-wrap', color: 'var(--text-primary)' }}>
              {previewReport.reportText}
            </div>

            <div style={{ padding: '16px 24px', borderTop: '1px solid var(--border)', display: 'flex', justifyContent: 'flex-end', gap: '12px', background: 'var(--surface-muted)' }}>
              <button
                onClick={() => setPreviewReport(null)}
                style={{
                  padding: '8px 16px', borderRadius: '8px', background: 'var(--surface-muted)',
                  border: '1px solid var(--border)', color: 'var(--text-primary)', fontSize: '13px', fontWeight: 600, cursor: 'pointer'
                }}
              >
                Close Preview
              </button>
              <button
                onClick={() => { handleSelect(previewReport); setPreviewReport(null); }}
                style={{
                  padding: '8px 20px', borderRadius: '8px', background: 'var(--accent)',
                  border: 'none', color: '#ffffff', fontSize: '13px', fontWeight: 700, cursor: 'pointer'
                }}
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
