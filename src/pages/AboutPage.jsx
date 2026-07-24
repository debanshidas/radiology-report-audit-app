import React from 'react';
import { Info, ShieldCheck, BookOpen, AlertTriangle } from 'lucide-react';

export default function AboutPage() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '36px', maxWidth: '720px' }}>

      {/* Page Title */}
      <div>
        <h1 style={{ fontSize: '22px', fontWeight: 900, color: '#0F172A', margin: 0, letterSpacing: '-0.5px' }}>
          About Radiology QA System
        </h1>
        <p style={{ fontSize: '13px', color: '#64748B', margin: '4px 0 0' }}>
          Clinical AI Governance Framework v4.5 for Hospital Information Systems
        </p>
      </div>

      {/* Scope */}
      <div style={{ paddingBottom: '28px', borderBottom: '1px solid #E2E8F0' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
          <ShieldCheck size={18} color="#0284C7" />
          <h2 style={{ fontSize: '15px', fontWeight: 800, color: '#0F172A', margin: 0 }}>Clinical QA Scope & Purpose</h2>
        </div>
        <p style={{ fontSize: '14px', color: '#475569', lineHeight: 1.8, margin: 0 }}>
          This platform acts as an automated <strong style={{ color: '#0F172A' }}>pre-signing quality gate</strong> for radiology reports. It evaluates structural completeness, RadLex anatomical vocabulary, and finding-to-impression consistency before a radiologist signs off.
        </p>
      </div>

      {/* Compliance */}
      <div style={{ paddingBottom: '28px', borderBottom: '1px solid #E2E8F0' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
          <BookOpen size={18} color="#0D9488" />
          <h2 style={{ fontSize: '15px', fontWeight: 800, color: '#0F172A', margin: 0 }}>ACR & RadLex Guidelines Compliance</h2>
        </div>
        <ul style={{ margin: 0, paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {[
            'American College of Radiology (ACR) practice parameters for communication of diagnostic imaging findings.',
            'RadLex standard anatomical terminology tree for eliminating ambiguous acronyms.',
            'Logical consistency checking between body text findings and conclusion impressions.'
          ].map((item, i) => (
            <li key={i} style={{ fontSize: '14px', color: '#475569', lineHeight: 1.7 }}>{item}</li>
          ))}
        </ul>
      </div>

      {/* Disclaimer */}
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
        <AlertTriangle size={18} color="#D97706" style={{ flexShrink: 0, marginTop: '2px' }} />
        <div>
          <h3 style={{ fontSize: '14px', fontWeight: 800, color: '#92400E', margin: '0 0 8px' }}>Clinical QA Disclaimer</h3>
          <p style={{ fontSize: '13px', color: '#78350F', lineHeight: 1.7, margin: 0 }}>
            This AI tool is designed strictly for evaluative quality audit support and clinical governance. It does <strong>NOT</strong> generate primary diagnostic interpretations of DICOM imaging. All AI recommendations must be validated by a licensed physician or clinical radiologist.
          </p>
        </div>
      </div>
    </div>
  );
}
