import React, { useState } from 'react';
import { ShieldCheck, Lock, BookOpen, ChevronDown, ChevronUp, ShieldAlert, Building2 } from 'lucide-react';

export default function PrivacyStandardsCard({ defaultExpanded = true }) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  return (
    <div
      className="enterprise-card"
      style={{
        padding: '0',
        overflow: 'hidden',
        border: '1px solid var(--border)',
        background: 'var(--surface)',
        boxShadow: '0 4px 12px rgba(0,0,0,0.03)'
      }}
    >
      {/* Card Header */}
      <div
        onClick={() => setIsExpanded(!isExpanded)}
        style={{
          padding: '16px 20px',
          background: 'linear-gradient(135deg, rgba(2, 132, 199, 0.06), rgba(13, 148, 136, 0.04))',
          borderBottom: isExpanded ? '1px solid var(--border)' : 'none',
          display: 'flex',
          alignItems: 'center',
          justify: 'space-between',
          cursor: 'pointer',
          userSelect: 'none'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '8px',
              background: 'linear-gradient(135deg, #0284C7, #0D9488)',
              display: 'flex',
              alignItems: 'center',
              justify: 'center',
              color: '#FFFFFF',
              boxShadow: '0 2px 6px rgba(2,132,199,0.3)'
            }}
          >
            <ShieldCheck size={20} />
          </div>
          <div>
            <h3 style={{ fontSize: '15px', fontWeight: 800, color: 'var(--text-primary)', margin: 0, letterSpacing: '-0.2px' }}>
              Privacy & Standards
            </h3>
            <p style={{ fontSize: '11.5px', color: 'var(--text-muted)', margin: '2px 0 0' }}>
              Data Privacy Governance Framework & ACR Structured Reporting Principles
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span
            style={{
              fontSize: '10.5px',
              fontWeight: 700,
              padding: '3px 10px',
              borderRadius: '12px',
              background: 'rgba(2, 132, 199, 0.1)',
              color: '#0284C7',
              border: '1px solid rgba(2, 132, 199, 0.2)'
            }}
          >
            Privacy-Aware Proof of Concept
          </span>
          <button
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: 'var(--text-muted)',
              display: 'flex',
              alignItems: 'center'
            }}
          >
            {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </button>
        </div>
      </div>

      {/* Card Content Body */}
      {isExpanded && (
        <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
            
            {/* Section 1: HIPAA & Data Privacy */}
            <div
              style={{
                background: 'var(--surface-muted)',
                padding: '16px',
                borderRadius: '8px',
                border: '1px solid var(--border)',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Lock size={18} color="#0284C7" />
                <h4 style={{ fontSize: '13.5px', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
                  HIPAA & Data Privacy
                </h4>
              </div>

              <div style={{ fontSize: '12px', color: 'var(--text-secondary)', lineHeight: 1.6, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <p style={{ margin: 0 }}>
                  This application is a <strong>privacy-aware proof of concept</strong> for demonstration and clinical audit testing.
                </p>

                <div style={{ padding: '8px 12px', background: 'rgba(2, 132, 199, 0.08)', borderRadius: '6px', borderLeft: '3px solid #0284C7', fontSize: '11.5px', color: 'var(--text-primary)' }}>
                  🔒 <strong>Zero Patient Data Stored:</strong> No real patient data is stored or shared. The Executive Dashboard currently uses <strong>synthetic data</strong> for demonstration purposes.
                </div>

                <div style={{ marginTop: '4px' }}>
                  <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.4px' }}>
                    Requirements for Real Hospital Deployment:
                  </span>
                  <ul style={{ margin: '6px 0 0', paddingLeft: '18px', display: 'flex', flexDirection: 'column', gap: '4px', fontSize: '11.5px' }}>
                    <li><strong>Data Encryption:</strong> AES-256 in transit (TLS 1.3) and at rest.</li>
                    <li><strong>Role-Based Access Control (RBAC):</strong> Strict user roles for radiologists, QA staff, and admins.</li>
                    <li><strong>Audit Logging:</strong> Comprehensive logging for evaluations and access records.</li>
                    <li><strong>Secure Infrastructure:</strong> Dedicated HIPAA-compliant cloud or on-premise HIS hosting.</li>
                    <li><strong>Regulatory Compliance:</strong> Formal BAA agreements and compliance validation.</li>
                  </ul>
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '6px', background: '#FFFBEB', padding: '8px 10px', borderRadius: '6px', border: '1px solid #FDE68A', color: '#B45309', fontSize: '11px', fontWeight: 600, marginTop: '4px' }}>
                  <ShieldAlert size={15} style={{ flexShrink: 0, marginTop: '1px' }} />
                  <span>
                    <strong>Notice:</strong> This platform is designed with privacy-aware principles and does not claim official HIPAA compliance.
                  </span>
                </div>
              </div>
            </div>

            {/* Section 2: Why ACR-Inspired Reporting? */}
            <div
              style={{
                background: 'var(--surface-muted)',
                padding: '16px',
                borderRadius: '8px',
                border: '1px solid var(--border)',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <BookOpen size={18} color="#0D9488" />
                <h4 style={{ fontSize: '13.5px', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
                  Why ACR-Inspired Reporting?
                </h4>
              </div>

              <div style={{ fontSize: '12px', color: 'var(--text-secondary)', lineHeight: 1.6, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <p style={{ margin: 0 }}>
                  The application references <strong>American College of Radiology (ACR) structured reporting principles</strong> as an internationally recognized framework for report structure and documentation quality.
                </p>

                <div style={{ padding: '8px 12px', background: 'rgba(13, 148, 136, 0.08)', borderRadius: '6px', borderLeft: '3px solid #0D9488', fontSize: '11.5px', color: 'var(--text-primary)' }}>
                  📑 <strong>Reference Framework Only:</strong> ACR principles serve as a reference for standardized report structure, section completeness, and documentation quality.
                </div>

                <div style={{ marginTop: '4px' }}>
                  <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.4px' }}>
                    Institutional Customization & Protocol Flexibility:
                  </span>
                  <ul style={{ margin: '6px 0 0', paddingLeft: '18px', display: 'flex', flexDirection: 'column', gap: '4px', fontSize: '11.5px' }}>
                    <li><strong>Non-Certification Notice:</strong> The system is <strong>not officially ACR certified or ACR compliant</strong>.</li>
                    <li><strong>Custom SOP Alignment:</strong> Templates can be customized according to hospital SOPs, departmental protocols, or NABH documentation practices.</li>
                    <li><strong>Departmental Workflows:</strong> Flexibly adapts to specific subspecialty imaging rules.</li>
                  </ul>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', background: '#F0FDF4', padding: '8px 10px', borderRadius: '6px', border: '1px solid #BBF7D0', color: '#16A34A', fontSize: '11px', fontWeight: 600, marginTop: '4px' }}>
                  <Building2 size={15} style={{ flexShrink: 0 }} />
                  <span>Fully customizable to align with your hospital's SOPs and clinical documentation guidelines.</span>
                </div>
              </div>
            </div>

          </div>

        </div>
      )}
    </div>
  );
}
