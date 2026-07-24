import React from 'react';
import { AlertTriangle } from 'lucide-react';

export default function AICautionNotice({ style }) {
  return (
    <div style={{
      background: 'linear-gradient(135deg, #FFF7ED, #FEF3C7)',
      border: '1px solid #FDE68A',
      borderRadius: '12px',
      padding: '14px 18px',
      display: 'flex',
      alignItems: 'flex-start',
      gap: '12px',
      boxShadow: '0 2px 8px rgba(217, 119, 6, 0.08)',
      ...style
    }}>
      <div style={{
        width: '32px', height: '32px', borderRadius: '8px',
        background: '#F59E0B', color: '#fff',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        flexShrink: 0, marginTop: '2px'
      }}>
        <AlertTriangle size={18} />
      </div>
      <div>
        <div style={{ fontSize: '13px', fontWeight: 800, color: '#92400E', letterSpacing: '-0.2px', marginBottom: '3px' }}>
          ⚠ AI Assistance Notice
        </div>
        <p style={{ fontSize: '12px', color: '#B45309', lineHeight: 1.6, margin: 0 }}>
          This evaluation is generated using Artificial Intelligence and is intended to support quality assessment and educational purposes only. It should not replace professional clinical judgment, radiologist review, or institutional quality assurance processes. Users are advised to independently verify all findings and recommendations before making any clinical decisions.
        </p>
      </div>
    </div>
  );
}
