import React from 'react';
import { LayoutDashboard, Upload, History, FileCode, BarChart3, TrendingUp, ShieldCheck, ArrowRight, FileText, CheckCircle2, AlertTriangle, Clock, ArrowLeft, Wifi } from 'lucide-react';
import { QualityTrendChart, ModalityDistributionChart } from '../components/AnalyticsCharts';

export default function DashboardPage({ setActivePage, setReportText, setModality, onBackToWelcome, serverConnected }) {
  const handleLaunchSample = (mod, sampleText) => {
    setModality(mod);
    setReportText(sampleText);
    setActivePage('upload');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      
      {/* Page Title & Context Header */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', borderBottom: '1px solid var(--border)', paddingBottom: '14px' }}>
        {onBackToWelcome && (
          <button
            onClick={onBackToWelcome}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 14px',
              fontSize: '11.5px',
              borderRadius: '20px',
              background: '#FFFFFF',
              cursor: 'pointer',
              border: '1px solid #CBD5E1',
              color: '#1977CC',
              fontWeight: 700,
              alignSelf: 'flex-start',
              boxShadow: '0 2px 5px rgba(0,0,0,0.04)',
              transition: 'all 0.2s ease',
              fontFamily: "'Poppins', sans-serif"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#EBF5FF';
              e.currentTarget.style.borderColor = '#1977CC';
              e.currentTarget.style.transform = 'translateX(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = '#FFFFFF';
              e.currentTarget.style.borderColor = '#CBD5E1';
              e.currentTarget.style.transform = 'translateX(0)';
            }}
          >
            <ArrowLeft size={13} /> Back to Welcome
          </button>
        )}
        
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
          <div>
            <h1 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--text-primary)', margin: 0, letterSpacing: '-0.3px' }}>
              Radiology Quality Assurance — Executive Dashboard
            </h1>
          <p style={{ fontSize: '12px', color: 'var(--text-muted)', margin: '2px 0 0' }}>
            Central Governance Console • Baystate Health System • Live HIS Feed
          </p>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button onClick={() => setActivePage('history')} className="btn-secondary">
            <History size={13} /> View Audit Logs
          </button>
          <button onClick={() => setActivePage('upload')} className="btn-primary">
            <Upload size={13} /> Run New Report Audit →
          </button>
        </div>
      </div>
      </div>

      {/* Quality Governance Metric Strip (Border-aligned compact toolbar) */}
      <div className="enterprise-card" style={{ padding: '0', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', divideX: '1px solid var(--border)' }}>
        <div style={{ padding: '14px 18px', borderRight: '1px solid var(--border)' }}>
          <div style={{ fontSize: '10.5px', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Reports Audited Today</div>
          <div style={{ fontSize: '22px', fontWeight: 900, color: 'var(--text-primary)', marginTop: '2px' }}>148</div>
          <div style={{ fontSize: '10.5px', color: '#16A34A', fontWeight: 600, marginTop: '2px' }}>↑ +12.4% vs last week</div>
        </div>

        <div style={{ padding: '14px 18px', borderRight: '1px solid var(--border)' }}>
          <div style={{ fontSize: '10.5px', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Average Quality Score</div>
          <div style={{ fontSize: '22px', fontWeight: 900, color: '#16A34A', marginTop: '2px' }}>91.4 <span style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: 600 }}>/ 100</span></div>
          <div style={{ fontSize: '10.5px', color: 'var(--text-muted)', marginTop: '2px' }}>Grade A • Hospital Sign-off Ready</div>
        </div>

        <div style={{ padding: '14px 18px', borderRight: '1px solid var(--border)' }}>
          <div style={{ fontSize: '10.5px', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>ACR Compliance Rate</div>
          <div style={{ fontSize: '22px', fontWeight: 900, color: '#0284C7', marginTop: '2px' }}>94.2%</div>
          <div style={{ fontSize: '10.5px', color: '#16A34A', fontWeight: 600, marginTop: '2px' }}>✓ Target &gt;90% Met</div>
        </div>

        <div style={{ padding: '14px 18px' }}>
          <div style={{ fontSize: '10.5px', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Flagged Red Flags</div>
          <div style={{ fontSize: '22px', fontWeight: 900, color: '#DC2626', marginTop: '2px' }}>6</div>
          <div style={{ fontSize: '10.5px', color: '#DC2626', fontWeight: 600, marginTop: '2px' }}>Requires Chief Radiologist Sign-off</div>
        </div>
      </div>

      {/* Main Grid: Quality Trends + Recent Audits */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: '20px' }}>
        
        {/* Left Column: Quality Score Trend Chart & Modality Breakdown */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          {/* Trend Chart Panel */}
          <div className="enterprise-card" style={{ padding: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
              <div>
                <h2 style={{ fontSize: '13.5px', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
                  Departmental Quality Score Trend (6-Month Benchmark)
                </h2>
                <p style={{ fontSize: '11px', color: 'var(--text-muted)', margin: '1px 0 0' }}>
                  Average quality score across Chest X-Ray, CT, and MRI modalities
                </p>
              </div>
              <span style={{ fontSize: '10px', fontWeight: 700, padding: '2px 8px', borderRadius: '4px', background: 'var(--surface-muted)', color: 'var(--text-muted)' }}>
                Target: 90/100
              </span>
            </div>

            <QualityTrendChart />
          </div>

          {/* Modality Distribution & Deficiencies Table Panel */}
          <div className="enterprise-card" style={{ padding: 0, overflow: 'hidden' }}>
            <div style={{ padding: '10px 16px', background: 'var(--surface-muted)', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '12px', fontWeight: 800, color: 'var(--text-primary)', textTransform: 'uppercase' }}>
                Modality Compliance & Common Deficiencies
              </span>
              <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Last 30 Days</span>
            </div>

            <table className="enterprise-table">
              <thead>
                <tr>
                  <th>Modality</th>
                  <th>Audits</th>
                  <th>Avg Score</th>
                  <th>Compliance</th>
                  <th>Primary Deficiencies</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { mod: 'Chest X-Ray', count: 68, score: 94, comp: '96%', issue: 'Missing comparison date (4%)' },
                  { mod: 'Brain MRI', count: 32, score: 89, comp: '91%', issue: 'Vague white matter descriptor (6%)' },
                  { mod: 'Abdomen CT', count: 28, score: 86, comp: '88%', issue: 'Unmeasured appendiceal wall (8%)' },
                  { mod: 'Ultrasound', count: 20, score: 92, comp: '94%', issue: 'Missing organ laterality (4%)' },
                ].map((row, i) => (
                  <tr key={i}>
                    <td style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{row.mod}</td>
                    <td style={{ color: 'var(--text-muted)' }}>{row.count}</td>
                    <td style={{ fontWeight: 800, color: row.score >= 90 ? '#16A34A' : '#D97706' }}>{row.score}/100</td>
                    <td style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{row.comp}</td>
                    <td style={{ color: 'var(--text-muted)', fontSize: '11px' }}>{row.issue}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>

        {/* Right Column: Recent Audits Queue & Quick Launch */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          {/* Quick Launch Panel */}
          <div className="enterprise-card" style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <h3 style={{ fontSize: '13px', fontWeight: 800, color: 'var(--text-primary)', margin: 0, borderBottom: '1px solid var(--border)', paddingBottom: '8px' }}>
              Quick Action Workspace
            </h3>

            <button onClick={() => setActivePage('upload')} className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
              <Upload size={14} /> Open Audit Workspace
            </button>
            <button onClick={() => setActivePage('templates')} className="btn-secondary" style={{ width: '100%', justifyContent: 'center' }}>
              <FileCode size={14} /> Download ACR Templates
            </button>
          </div>

          {/* Network Strength Diagnostic Panel */}
          <div className="enterprise-card" style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid var(--border)', paddingBottom: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Wifi size={14} color="var(--accent)" />
                <h3 style={{ fontSize: '12.5px', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
                  Network Strength
                </h3>
              </div>
              <span style={{ fontSize: '10px', fontWeight: 700, color: '#16A34A', background: 'rgba(22, 197, 94, 0.1)', padding: '2px 8px', borderRadius: '10px' }}>
                {serverConnected ? 'Excellent' : 'Stable'}
              </span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', background: 'var(--surface-muted)', padding: '10px', borderRadius: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'flex-end', gap: '2px', height: '16px' }}>
                {[1, 2, 3, 4, 5].map((b) => (
                  <div key={b} style={{ width: '3px', height: `${b * 20}%`, background: '#16A34A', borderRadius: '1px' }} />
                ))}
              </div>
              <div style={{ flex: 1, fontSize: '12px', fontWeight: 700, color: 'var(--text-primary)' }}>
                18 ms Latency
              </div>
            </div>

            <div style={{ fontSize: '10.5px', color: 'var(--text-muted)', display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <div>• Secure TLS 1.3 Transmission Gate</div>
              <div>• 0.00% Packet Loss (Direct Link)</div>
            </div>
          </div>

          {/* Recent Audit Log Feed */}
          <div className="enterprise-card" style={{ padding: 0, overflow: 'hidden' }}>
            <div style={{ padding: '10px 14px', background: 'var(--surface-muted)', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '11px', fontWeight: 800, color: 'var(--text-primary)', textTransform: 'uppercase' }}>
                Recent Audits Queue
              </span>
              <button onClick={() => setActivePage('history')} style={{ background: 'none', border: 'none', fontSize: '11px', color: '#0284C7', fontWeight: 700, cursor: 'pointer' }}>
                View All →
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', divideY: '1px solid var(--border)' }}>
              {[
                { title: 'Chest X-Ray (Johnathan Miller)', time: '10 mins ago', score: 98, status: 'Compliant', color: '#16A34A' },
                { title: 'CT Abdomen (Robert Johnson)', time: '35 mins ago', score: 30, status: 'Critical Failure', color: '#DC2626' },
                { title: 'Brain MRI (Diana Prince)', time: '1 hour ago', score: 98, status: 'Compliant', color: '#16A34A' },
                { title: 'Knee MRI (Bruce Wayne)', time: '2 hours ago', score: 96, status: 'Compliant', color: '#16A34A' },
                { title: 'Thyroid US (Rachel Green)', time: '3 hours ago', score: 55, status: 'Major Revision', color: '#D97706' },
              ].map((item, idx) => (
                <div key={idx} style={{ padding: '10px 14px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid var(--border)' }}>
                  <div>
                    <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-primary)' }}>{item.title}</div>
                    <div style={{ fontSize: '10px', color: 'var(--text-muted)', marginTop: '2px' }}>{item.time}</div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '13px', fontWeight: 900, color: item.color }}>{item.score}/100</div>
                    <div style={{ fontSize: '9.5px', fontWeight: 700, color: item.color }}>{item.status}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
