import React from 'react';
import { Info, ShieldCheck, BookOpen, AlertTriangle } from 'lucide-react';
import PrivacyStandardsCard from '../components/PrivacyStandardsCard';

export default function AboutPage() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px', maxWidth: '840px' }}>

      {/* Page Title */}
      <div>
        <h1 style={{ fontSize: '22px', fontWeight: 900, color: 'var(--text-primary)', margin: 0, letterSpacing: '-0.5px' }}>
          About Radiology QA System
        </h1>
        <p style={{ fontSize: '13px', color: 'var(--text-muted)', margin: '4px 0 0' }}>
          Clinical AI Governance Framework v4.5 for Hospital Information Systems
        </p>
      </div>

      {/* Scope */}
      <div style={{ paddingBottom: '24px', borderBottom: '1px solid var(--border)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
          <ShieldCheck size={18} color="#0284C7" />
          <h2 style={{ fontSize: '15px', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>Clinical QA Scope & Purpose</h2>
        </div>
        <p style={{ fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: 1.8, margin: 0 }}>
          This platform acts as an automated <strong style={{ color: 'var(--text-primary)' }}>pre-signing quality gate</strong> for radiology reports. It evaluates structural completeness, RadLex anatomical vocabulary, and finding-to-impression consistency before a radiologist signs off.
        </p>
      </div>

      {/* Privacy & Standards Card */}
      <PrivacyStandardsCard defaultExpanded={true} />

      {/* Compliance */}
      <div style={{ paddingBottom: '24px', borderBottom: '1px solid var(--border)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
          <BookOpen size={18} color="#0D9488" />
          <h2 style={{ fontSize: '15px', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>ACR Reference & RadLex Guidelines</h2>
        </div>
        <ul style={{ margin: 0, paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {[
            'American College of Radiology (ACR) practice parameters referenced for communication of diagnostic imaging findings.',
            'RadLex standard anatomical terminology tree for eliminating ambiguous acronyms.',
            'Logical consistency checking between body text findings and conclusion impressions.'
          ].map((item, i) => (
            <li key={i} style={{ fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: 1.7 }}>{item}</li>
          ))}
        </ul>
      </div>

      {/* Disclaimer */}
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', background: 'rgba(217, 119, 6, 0.08)', padding: '16px', borderRadius: '8px', border: '1px solid rgba(217, 119, 6, 0.2)' }}>
        <AlertTriangle size={18} color="#D97706" style={{ flexShrink: 0, marginTop: '2px' }} />
        <div>
          <h3 style={{ fontSize: '14px', fontWeight: 800, color: '#92400E', margin: '0 0 6px' }}>Clinical QA Disclaimer</h3>
          <p style={{ fontSize: '12.5px', color: '#78350F', lineHeight: 1.7, margin: 0 }}>
            This AI tool is designed strictly for evaluative quality audit support and clinical governance. It does <strong>NOT</strong> generate primary diagnostic interpretations of DICOM imaging. All AI recommendations must be validated by a licensed physician or clinical radiologist.
          </p>
        </div>
      </div>
    </div>
  );
}
