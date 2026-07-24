import React from 'react';
import { Activity, ShieldCheck, Sun, Moon, Building2, User } from 'lucide-react';

export default function Header({ currentView, setCurrentView, serverConnected, theme, setTheme }) {
  return (
    <header className="app-header">
      {/* Brand & Facility Info */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <div
          onClick={() => setCurrentView('app')}
          style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}
        >
          <div style={{
            width: '30px', height: '30px', borderRadius: '4px',
            background: '#0284C7', color: '#FFFFFF',
            display: 'flex', alignItems: 'center', justifyContent: 'center'
          }}>
            <Activity size={16} />
          </div>
          <div>
            <div style={{ fontSize: '13px', fontWeight: 800, color: '#F8FAFC', letterSpacing: '-0.2px', lineHeight: 1.1 }}>
              RadAudit Enterprise <span style={{ fontSize: '10px', color: '#38BDF8', fontWeight: 700, marginLeft: '4px' }}>HIS v2.4</span>
            </div>
            <div style={{ fontSize: '10px', color: '#94A3B8', marginTop: '1px' }}>
              Radiology Report Quality Assurance Platform
            </div>
          </div>
        </div>

        {/* Facility Divider */}
        <div style={{ height: '18px', width: '1px', background: '#334155' }} />

        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#CBD5E1', fontSize: '11px', fontWeight: 600 }}>
          <Building2 size={13} color="#94A3B8" />
          <span>Central Radiology QA Unit — Baystate Health System</span>
        </div>
      </div>

      {/* Center/Right Status & User Info */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        {/* Status Pill */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: '6px',
          background: '#1E293B', border: '1px solid #334155',
          borderRadius: '4px', padding: '3px 10px'
        }}>
          <span style={{
            width: '6px', height: '6px', borderRadius: '50%',
            background: serverConnected ? '#22C55E' : '#F59E0B'
          }} />
          <span style={{ fontSize: '11px', fontWeight: 600, color: '#E2E8F0' }}>
            {serverConnected ? 'HIS Gateway Online' : 'Connecting to Server...'}
          </span>
        </div>

        {/* Theme Toggle */}
        <button
          onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
          style={{
            background: '#1E293B', border: '1px solid #334155', borderRadius: '4px',
            padding: '5px 9px', color: '#94A3B8', cursor: 'pointer',
            display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', fontWeight: 600
          }}
          title="Toggle Theme"
        >
          {theme === 'light' ? <Moon size={13} /> : <Sun size={13} />}
          <span>{theme === 'light' ? 'Dark' : 'Light'}</span>
        </button>

        {/* User Credential Badge */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: '8px',
          background: '#1E293B', border: '1px solid #334155',
          borderRadius: '4px', padding: '4px 10px'
        }}>
          <div style={{
            width: '22px', height: '22px', borderRadius: '50%',
            background: '#0284C7', color: '#FFFFFF', fontSize: '10px',
            fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center'
          }}>
            DA
          </div>
          <div style={{ fontSize: '11px', lineHeight: 1.2 }}>
            <div style={{ fontWeight: 700, color: '#F8FAFC' }}>Dr. Admin, MD</div>
            <div style={{ fontSize: '9.5px', color: '#94A3B8' }}>Chief QA Radiologist</div>
          </div>
        </div>
      </div>
    </header>
  );
}
