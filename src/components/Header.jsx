import React from 'react';
import { Activity, ShieldCheck, Sun, Moon, Building2, Menu, Sparkles } from 'lucide-react';

export default function Header({ sidebarCollapsed, setSidebarCollapsed, theme, setTheme, provider, setProvider, serverConnected }) {
  return (
    <header style={{
      height: '52px',
      background: '#2C4964',
      borderBottom: '1px solid #162C40',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 20px',
      color: '#FFFFFF',
      boxShadow: '0 2px 8px rgba(44, 73, 100, 0.15)',
      flexShrink: 0
    }}>
      {/* Brand & Facility Info */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
        <button
          onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          style={{
            background: 'rgba(255,255,255,0.08)',
            border: '1px solid rgba(255,255,255,0.15)',
            borderRadius: '4px',
            color: '#FFFFFF',
            padding: '5px 8px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justify: 'center'
          }}
          title="Toggle Navigation Menu"
        >
          <Menu size={16} />
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            width: '30px', height: '30px', borderRadius: '6px',
            background: '#1977CC', color: '#FFFFFF',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 2px 6px rgba(25, 119, 204, 0.4)'
          }}>
            <ShieldCheck size={18} />
          </div>
          <div>
            <div style={{ fontSize: '13.5px', fontWeight: 800, color: '#FFFFFF', letterSpacing: '-0.2px', lineHeight: 1.1 }}>
              RadAudit <span style={{ fontSize: '10px', color: '#3FBBC0', fontWeight: 700, marginLeft: '4px' }}>Enterprise QA</span>
            </div>
            <div style={{ fontSize: '10px', color: '#B2C7DB', marginTop: '1px' }}>
              ACR Clinical Quality Assurance Gateway
            </div>
          </div>
        </div>

        {/* Facility Divider */}
        <div className="hidden-mobile" style={{ height: '18px', width: '1px', background: 'rgba(255,255,255,0.15)', margin: '0 4px' }} />

        <div className="hidden-mobile" style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#B2C7DB', fontSize: '11px', fontWeight: 500 }}>
          <Building2 size={13} color="#3FBBC0" />
          <span>Central Radiology QA Unit • Baystate Health System</span>
        </div>
      </div>

      {/* Right Controls & User Credential */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        {/* Connection Status Pill */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: '6px',
          background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)',
          borderRadius: '4px', padding: '4px 10px'
        }}>
          <span style={{
            width: '6px', height: '6px', borderRadius: '50%',
            background: '#3FBBC0'
          }} />
          <span style={{ fontSize: '11px', fontWeight: 600, color: '#FFFFFF' }}>
            {serverConnected ? 'HIS Online (Flask)' : 'Cloud AI (Groq/OpenAI)'}
          </span>
        </div>

        {/* Theme Toggle */}
        <button
          onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
          style={{
            background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '4px',
            padding: '5px 9px', color: '#FFFFFF', cursor: 'pointer',
            display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', fontWeight: 600
          }}
          title="Toggle Theme"
        >
          {theme === 'light' ? <Moon size={13} color="#3FBBC0" /> : <Sun size={13} color="#3FBBC0" />}
          <span>{theme === 'light' ? 'Dark' : 'Light'}</span>
        </button>

        {/* User Credential Badge */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: '8px',
          background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)',
          borderRadius: '4px', padding: '4px 10px'
        }}>
          <div style={{
            width: '22px', height: '22px', borderRadius: '50%',
            background: '#1977CC', color: '#FFFFFF', fontSize: '10px',
            fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center'
          }}>
            QA
          </div>
          <div style={{ fontSize: '11px', lineHeight: 1.2 }}>
            <div style={{ fontWeight: 700, color: '#FFFFFF' }}>Dr. QA Officer, MD</div>
            <div style={{ fontSize: '9.5px', color: '#3FBBC0' }}>Senior Radiologist</div>
          </div>
        </div>
      </div>
    </header>
  );
}
