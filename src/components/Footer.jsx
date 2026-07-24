import React from 'react';
import { ShieldCheck, FileText, Lock, Mail, ExternalLink } from 'lucide-react';

export default function Footer() {
  return (
    <footer style={{
      borderTop: '1px solid var(--border)',
      padding: '16px 32px',
      background: 'var(--surface)',
      marginTop: 'auto',
      fontSize: '11px',
      color: 'var(--text-muted)',
      display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '12px'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>
          RadAudit Enterprise HIS v2.4.0
        </span>
        <span>•</span>
        <span>Last System Sync: July 2026</span>
        <span>•</span>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', color: '#16A34A', fontWeight: 600 }}>
          <ShieldCheck size={12} /> HIPAA & ACR Compliant
        </span>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '18px' }}>
        <a href="#privacy" onClick={e => e.preventDefault()} style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>
          Privacy Policy
        </a>
        <a href="#terms" onClick={e => e.preventDefault()} style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>
          Terms of Service
        </a>
        <a href="#contact" onClick={e => e.preventDefault()} style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>
          Support Contact
        </a>
        <span>© 2026 RadAudit Health Systems</span>
      </div>
    </footer>
  );
}
