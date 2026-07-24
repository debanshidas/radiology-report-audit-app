import React from 'react';

// Quality Score Trend SVG Line Chart
export function QualityTrendChart() {
  const points = [
    { label: 'Jan', score: 72 },
    { label: 'Feb', score: 76 },
    { label: 'Mar', score: 81 },
    { label: 'Apr', score: 79 },
    { label: 'May', score: 85 },
    { label: 'Jun', score: 88 },
    { label: 'Jul', score: 92 },
  ];

  const width = 540;
  const height = 180;
  const padding = 30;

  const pointsSvg = points.map((p, i) => {
    const x = padding + (i / (points.length - 1)) * (width - 2 * padding);
    const y = height - padding - ((p.score - 50) / 50) * (height - 2 * padding);
    return { ...p, x, y };
  });

  const pathD = pointsSvg.reduce((acc, p, i) => i === 0 ? `M ${p.x} ${p.y}` : `${acc} L ${p.x} ${p.y}`, '');

  return (
    <div style={{ width: '100%', overflowX: 'auto' }}>
      <svg viewBox={`0 0 ${width} ${height}`} style={{ width: '100%', height: 'auto', background: 'transparent' }}>
        {/* Gridlines */}
        {[60, 70, 80, 90, 100].map(val => {
          const y = height - padding - ((val - 50) / 50) * (height - 2 * padding);
          return (
            <g key={val}>
              <line x1={padding} y1={y} x2={width - padding} y2={y} stroke="var(--border)" strokeDasharray="3 3" />
              <text x={padding - 8} y={y + 3} fontSize="9" fill="var(--text-muted)" textAnchor="end">{val}</text>
            </g>
          );
        })}

        {/* Trend line */}
        <path d={pathD} fill="none" stroke="#0284C7" strokeWidth="2.5" />

        {/* Data points */}
        {pointsSvg.map((p, i) => (
          <g key={i}>
            <circle cx={p.x} cy={p.y} r="4" fill="#0284C7" stroke="#FFFFFF" strokeWidth="1.5" />
            <text x={p.x} y={height - 8} fontSize="10" fill="var(--text-muted)" textAnchor="middle">{p.label}</text>
            <text x={p.x} y={p.y - 8} fontSize="9" fontWeight="700" fill="var(--text-primary)" textAnchor="middle">{p.score}</text>
          </g>
        ))}
      </svg>
    </div>
  );
}

// Modality Distribution Bar Chart
export function ModalityDistributionChart() {
  const data = [
    { name: 'Chest X-Ray', count: 420, pct: '38%', color: '#0284C7' },
    { name: 'Brain MRI', count: 290, pct: '26%', color: '#0369A1' },
    { name: 'Abdomen CT', count: 210, pct: '19%', color: '#0284C7' },
    { name: 'Spine MRI', count: 110, pct: '10%', color: '#0D9488' },
    { name: 'Ultrasound', count: 80, pct: '7%', color: '#64748B' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      {data.map((item, idx) => (
        <div key={idx} style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', fontWeight: 600, color: 'var(--text-primary)' }}>
            <span>{item.name}</span>
            <span style={{ color: 'var(--text-muted)' }}>{item.count} reports ({item.pct})</span>
          </div>
          <div style={{ height: '7px', background: 'var(--surface-muted)', borderRadius: '4px', overflow: 'hidden' }}>
            <div style={{ height: '100%', width: item.pct, background: item.color, borderRadius: '4px' }} />
          </div>
        </div>
      ))}
    </div>
  );
}

// Common Deficiencies Pareto Chart
export function DeficienciesChart() {
  const deficiencies = [
    { title: 'Missing Radiologist Signature Attestation', count: 142, severity: 'High' },
    { title: 'Vague / Informal Medical Terminology', count: 98, severity: 'Medium' },
    { title: 'Pathology vs Normal Impression Contradiction', count: 64, severity: 'High' },
    { title: 'Missing Comparison Study Reference', count: 52, severity: 'Low' },
    { title: 'Absence of Lesion Dimensions / Measurements', count: 45, severity: 'Medium' },
  ];

  return (
    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
      <thead>
        <tr style={{ borderBottom: '1px solid var(--border)', textAlign: 'left', color: 'var(--text-muted)', fontSize: '10px', textTransform: 'uppercase' }}>
          <th style={{ padding: '6px 8px' }}>Quality Deficiency</th>
          <th style={{ padding: '6px 8px', textAlign: 'center' }}>Incidence</th>
          <th style={{ padding: '6px 8px', textAlign: 'right' }}>Severity Risk</th>
        </tr>
      </thead>
      <tbody>
        {deficiencies.map((d, i) => (
          <tr key={i} style={{ borderBottom: '1px solid var(--border)' }}>
            <td style={{ padding: '8px', color: 'var(--text-primary)', fontWeight: 600 }}>{d.title}</td>
            <td style={{ padding: '8px', textAlign: 'center', fontWeight: 700, color: 'var(--text-muted)' }}>{d.count}</td>
            <td style={{ padding: '8px', textAlign: 'right' }}>
              <span style={{
                fontSize: '10px', fontWeight: 700, padding: '2px 8px', borderRadius: '4px',
                background: d.severity === 'High' ? '#FEE2E2' : d.severity === 'Medium' ? '#FEF3C7' : '#E0F2FE',
                color: d.severity === 'High' ? '#DC2626' : d.severity === 'Medium' ? '#D97706' : '#0284C7'
              }}>
                {d.severity}
              </span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
