import React from 'react';
import {
  LayoutDashboard, Upload, History, FileCode, BarChart3,
  Settings, HelpCircle, ChevronLeft, ChevronRight, Activity, ShieldCheck
} from 'lucide-react';

const NAV_SECTIONS = [
  {
    title: 'Clinical QA Workspace',
    items: [
      { id: 'dashboard', label: 'Executive Dashboard', icon: LayoutDashboard },
      { id: 'upload', label: 'New Report Audit', icon: Upload },
      { id: 'history', label: 'Audit History Logs', icon: History },
    ]
  },
  {
    title: 'Standards & Library',
    items: [
      { id: 'templates', label: 'ACR Standard Templates', icon: FileCode },
      { id: 'analytics', label: 'Governance Analytics', icon: BarChart3 },
    ]
  },
  {
    title: 'System & Admin',
    items: [
      { id: 'settings', label: 'HIS Settings', icon: Settings },
      { id: 'about', label: 'Help & Compliance', icon: HelpCircle },
    ]
  }
];

export default function Sidebar({ activePage, setActivePage, collapsed, setCollapsed }) {
  return (
    <aside style={{
      width: collapsed ? '56px' : '230px',
      background: '#2C4964',
      borderRight: '1px solid #162C40',
      display: 'flex', flexDirection: 'column',
      flexShrink: 0, zIndex: 30, position: 'relative',
      transition: 'width 0.2s ease-in-out'
    }}>
      {/* Sidebar Header */}
      <div style={{
        height: '48px', padding: '0 12px',
        borderBottom: '1px solid rgba(255,255,255,0.1)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        flexShrink: 0
      }}>
        {!collapsed && (
          <span style={{ fontSize: '10px', fontWeight: 800, color: '#3FBBC0', textTransform: 'uppercase', letterSpacing: '0.6px' }}>
            Navigation Console
          </span>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          style={{
            background: 'none', border: 'none', color: '#B2C7DB',
            cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: '4px', borderRadius: '4px'
          }}
          title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {collapsed ? <ChevronRight size={15} color="#FFFFFF" /> : <ChevronLeft size={15} color="#FFFFFF" />}
        </button>
      </div>

      {/* Nav items grouped list */}
      <nav style={{ flex: 1, padding: '12px 0', overflowY: 'auto' }}>
        {NAV_SECTIONS.map((sec, idx) => (
          <div key={idx} style={{ marginBottom: '16px' }}>
            {!collapsed && (
              <div style={{ padding: '0 16px 6px', fontSize: '9.5px', fontWeight: 800, color: '#B2C7DB', textTransform: 'uppercase', letterSpacing: '0.6px', opacity: 0.7 }}>
                {sec.title}
              </div>
            )}
            <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '2px' }}>
              {sec.items.map((item) => {
                const Icon = item.icon;
                const isActive = activePage === item.id;

                return (
                  <li key={item.id}>
                    <button
                      onClick={() => setActivePage(item.id)}
                      style={{
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        padding: collapsed ? '9px 0' : '9px 16px',
                        justifyContent: collapsed ? 'center' : 'flex-start',
                        background: isActive ? '#1977CC' : 'transparent',
                        color: isActive ? '#FFFFFF' : '#B2C7DB',
                        border: 'none',
                        borderLeft: isActive ? '4px solid #3FBBC0' : '4px solid transparent',
                        fontSize: '12.5px',
                        fontWeight: isActive ? 700 : 500,
                        cursor: 'pointer',
                        textAlign: 'left',
                        transition: 'all 0.15s'
                      }}
                      title={collapsed ? item.label : undefined}
                    >
                      <Icon size={16} color={isActive ? '#FFFFFF' : '#3FBBC0'} style={{ flexShrink: 0 }} />
                      {!collapsed && <span>{item.label}</span>}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      {/* Sidebar Footer — HIS Status */}
      {!collapsed && (
        <div style={{ padding: '12px 16px', borderTop: '1px solid rgba(255,255,255,0.1)', background: '#162C40', fontSize: '10px', color: '#B2C7DB' }}>
          <div style={{ fontWeight: 700, color: '#FFFFFF' }}>RadAudit MediCare Gateway</div>
          <div style={{ color: '#3FBBC0', marginTop: '2px' }}>ACR Standard Audit v3.2</div>
        </div>
      )}
    </aside>
  );
}
