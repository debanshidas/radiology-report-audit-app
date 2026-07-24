import React from 'react';
import { BarChart3, TrendingUp, ShieldAlert, CheckCircle2, FileText, Calendar, Filter, Download } from 'lucide-react';
import { QualityTrendChart, ModalityDistributionChart, DeficienciesChart } from '../components/AnalyticsCharts';
import AICautionNotice from '../components/AICautionNotice';

export default function AnalyticsPage() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <h1 style={{ fontSize: '20px', fontWeight: 800, color: 'var(--text-primary)', margin: 0, letterSpacing: '-0.3px' }}>
            Clinical QA Governance & Analytics
          </h1>
          <p style={{ fontSize: '12px', color: 'var(--text-muted)', margin: '3px 0 0' }}>
            Department-wide quality indicators, compliance metrics, and modality benchmarks
          </p>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button className="btn-secondary">
            <Filter size={13} /> Filter Date Range
          </button>
          <button className="btn-primary">
            <Download size={13} /> Export QA Analytics (CSV)
          </button>
        </div>
      </div>

      <AICautionNotice />

      {/* KPI Cards Bar */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        {[
          { title: 'Audited Reports (MTD)', val: '1,190', note: '↑ 12% vs last month', color: '#0284C7' },
          { title: 'Mean Quality Score Index', val: '86.4 / 100', note: 'Compliant status', color: '#16A34A' },
          { title: 'Signing Readiness Rate', val: '84.2%', note: 'Ready without revision', color: '#0284C7' },
          { title: 'Critical Contradictions Flagged', val: '14', note: '0.01% patient safety risk', color: '#DC2626' },
        ].map((kpi, idx) => (
          <div key={idx} className="enterprise-card" style={{ padding: '16px' }}>
            <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.4px' }}>
              {kpi.title}
            </div>
            <div style={{ fontSize: '24px', fontWeight: 800, color: 'var(--text-primary)', margin: '6px 0 2px' }}>
              {kpi.val}
            </div>
            <div style={{ fontSize: '11px', fontWeight: 600, color: kpi.color }}>
              {kpi.note}
            </div>
          </div>
        ))}
      </div>

      {/* Grid of Analytics Visuals */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        
        {/* Quality Trend */}
        <div className="enterprise-card">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
            <div style={{ fontSize: '13px', fontWeight: 800, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <TrendingUp size={15} color="#0284C7" /> Overall QA Score Trend (YTD)
            </div>
            <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Target: ≥85</span>
          </div>
          <QualityTrendChart />
        </div>

        {/* Modality Distribution */}
        <div className="enterprise-card">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
            <div style={{ fontSize: '13px', fontWeight: 800, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <BarChart3 size={15} color="#0284C7" /> Modality Audit Volume Distribution
            </div>
            <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Total: 1,190</span>
          </div>
          <ModalityDistributionChart />
        </div>

      </div>

      {/* Common Quality Deficiencies */}
      <div className="enterprise-card">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
          <div style={{ fontSize: '13px', fontWeight: 800, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <ShieldAlert size={15} color="#DC2626" /> Frequent Clinical Report Deficiencies & Risk Pareto
          </div>
          <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Last 30 Days</span>
        </div>
        <DeficienciesChart />
      </div>

    </div>
  );
}
