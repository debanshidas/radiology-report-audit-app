import React from 'react';
import { History, CheckCircle2, RotateCcw, ShieldCheck, FileText, Clock } from 'lucide-react';

export default function VersionHistoryDrawer({ versions = [], activeVersionId, onRestoreVersion, onApproveVersion }) {
  if (!versions || versions.length === 0) return null;

  return (
    <div className="enterprise-card" style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid var(--border)', paddingBottom: '8px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <History size={16} color="#0284C7" />
          <span style={{ fontSize: '13px', fontWeight: 800, color: 'var(--text-primary)' }}>
            Report Version History & Approval Logs
          </span>
        </div>
        <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
          {versions.length} version(s) saved
        </span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {versions.map((ver) => {
          const isActive = ver.id === activeVersionId;
          const isApproved = ver.status === 'Approved';

          return (
            <div
              key={ver.id}
              style={{
                padding: '12px', borderRadius: '6px',
                background: isActive ? 'var(--surface-muted)' : 'var(--surface)',
                border: `1px solid ${isActive ? '#0284C7' : 'var(--border)'}`,
                display: 'flex', alignItems: 'center', justifyContent: 'space-between'
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontSize: '12px', fontWeight: 800, color: 'var(--text-primary)' }}>
                    {ver.name}
                  </span>
                  {isActive && (
                    <span style={{ fontSize: '9.5px', fontWeight: 800, padding: '2px 6px', borderRadius: '4px', background: '#0284C7', color: '#FFF' }}>
                      ACTIVE
                    </span>
                  )}
                  {isApproved && (
                    <span style={{ fontSize: '9.5px', fontWeight: 800, padding: '2px 6px', borderRadius: '4px', background: '#DCFCE7', color: '#15803D', border: '1px solid #86EFAC' }}>
                      ✓ APPROVED
                    </span>
                  )}
                </div>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '3px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Clock size={11} /> {ver.timestamp} • Created by {ver.author || 'System'}
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ textAlign: 'right', marginRight: '8px' }}>
                  <div style={{ fontSize: '13px', fontWeight: 900, color: ver.score >= 90 ? '#15803D' : '#B91C1C' }}>
                    {ver.score}/100
                  </div>
                  <div style={{ fontSize: '9.5px', color: 'var(--text-muted)' }}>Quality Index</div>
                </div>

                {!isActive && (
                  <button
                    onClick={() => onRestoreVersion(ver)}
                    className="btn-secondary"
                    style={{ fontSize: '11px', padding: '4px 8px' }}
                    title="Restore this version"
                  >
                    <RotateCcw size={12} /> Restore
                  </button>
                )}

                {onApproveVersion && !isApproved && (
                  <button
                    onClick={() => onApproveVersion(ver)}
                    className="btn-primary"
                    style={{ fontSize: '11px', padding: '4px 8px', background: '#16A34A', borderColor: '#16A34A' }}
                  >
                    <ShieldCheck size={12} /> Approve Sign-off
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
