import React from 'react';
import {
  LayoutDashboard, Upload, History, FileCode, BarChart3,
  Download, Settings, HelpCircle, FileCheck2, Lightbulb,
  ChevronLeft, ChevronRight, FileText, BookOpen
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
      background: 'var(--sidebar-bg)',
      borderRight: '1px solid #1E293B',
      display: 'flex', flexDirection: 'column',
      flexShrink: 0, zIndex: 30, position: 'relative',
      transition: 'width 0.15s ease-in-out'
    }}>
      {/* Sidebar Header */}
      <div style={{
        height: '48px', padding: '0 12px',
        borderBottom: '1px solid #1E293B',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        flexShrink: 0
      }}>
        {!collapsed && (
          <span style={{ fontSize: '10px', fontWeight: 800, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.6px' }}>
            Navigation Console
          </span>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          style={{
            background: 'none', border: 'none', color: '#94A3B8',
            cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: '4px', borderRadius: '4px'
          }}
          title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {collapsed ? <ChevronRight size={15} /> : <ChevronLeft size={15} />}
        </button>
      </div>

      {/* Nav items grouped list */}
      <nav style={{ flex: 1, padding: '12px 0', overflowY: 'auto' }}>
        {NAV_SECTIONS.map((sec, idx) => (
          <div key={idx} style={{ marginBottom: '16px' }}>
            {!collapsed && (
              <div style={{ padding: '0 16px 6px', fontSize: '9.5px', fontWeight: 800, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.6px' }}>
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
                        background: isActive ? '#1E293B' : 'transparent',
                        color: isActive ? '#38BDF8' : '#94A3B8',
                        border: 'none',
                        borderLeft: isActive ? '3px solid #0284C7' : '3px solid transparent',
                        fontSize: '12px',
                        fontWeight: isActive ? 700 : 500,
                        cursor: 'pointer',
                        textAlign: 'left',
                        transition: 'all 0.12s'
                      }}
                      title={collapsed ? item.label : undefined}
                    >
                      <Icon size={16} color={isActive ? '#38BDF8' : '#64748B'} style={{ flexShrink: 0 }} />
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
        <div style={{ padding: '12px 16px', borderTop: '1px solid #1E293B', background: '#0B132B', fontSize: '10px', color: '#64748B' }}>
          <div style={{ fontWeight: 700, color: '#94A3B8' }}>RadAudit HIS Gateway</div>
          <div>Last Sync: 13:55 PM (0 errors)</div>
        </div>
      )}
    </aside>
  );
}
