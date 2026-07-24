import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard, Upload, History, FileCode, BarChart3,
  Settings, HelpCircle, ChevronLeft, ChevronRight, Menu, X
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
  const [isMobile, setIsMobile] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isExpanded = isMobile ? !collapsed : (!collapsed || isHovered);

  // Transitions & Variant Configurations
  const sidebarVariants = {
    expanded: {
      width: '240px',
      transition: { duration: 0.3, ease: [0.25, 0.1, 0.25, 1.0] }
    },
    collapsed: {
      width: '60px',
      transition: { duration: 0.3, ease: [0.25, 0.1, 0.25, 1.0] }
    }
  };

  const mobileSidebarVariants = {
    open: {
      x: 0,
      transition: { type: 'spring', damping: 25, stiffness: 200 }
    },
    closed: {
      x: '-100%',
      transition: { type: 'spring', damping: 25, stiffness: 200 }
    }
  };

  const textVariants = {
    expanded: {
      opacity: 1,
      x: 0,
      display: 'inline-block',
      transition: { duration: 0.2, delay: 0.1 }
    },
    collapsed: {
      opacity: 0,
      x: -10,
      transitionEnd: { display: 'none' },
      transition: { duration: 0.15 }
    }
  };

  const renderContent = () => (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden' }}>
      
      {/* Sidebar Header */}
      <div style={{
        height: '52px', padding: '0 16px',
        borderBottom: '1px solid rgba(255,255,255,0.08)',
        display: 'flex', alignItems: 'center', justifyContent: isExpanded ? 'space-between' : 'center',
        flexShrink: 0, background: '#223B52'
      }}>
        <AnimatePresence mode="wait">
          {isExpanded ? (
            <motion.span
              initial={{ opacity: 0, x: -5 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -5 }}
              style={{ fontSize: '10.5px', fontWeight: 800, color: '#3FBBC0', textTransform: 'uppercase', letterSpacing: '0.8px' }}
            >
              Navigation Console
            </motion.span>
          ) : null}
        </AnimatePresence>

        {!isMobile && (
          <button
            onClick={() => setCollapsed(!collapsed)}
            style={{
              background: 'none', border: 'none', color: '#B2C7DB',
              cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
              padding: '6px', borderRadius: '6px', transition: 'background 0.2s',
              background: 'rgba(255,255,255,0.05)'
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
            onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}
            title={collapsed ? 'Pin Sidebar' : 'Collapse Sidebar'}
          >
            {collapsed ? <ChevronRight size={14} color="#FFFFFF" /> : <ChevronLeft size={14} color="#FFFFFF" />}
          </button>
        )}

        {isMobile && (
          <button
            onClick={() => setCollapsed(true)}
            style={{
              background: 'none', border: 'none', color: '#FFFFFF',
              cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
              padding: '6px'
            }}
          >
            <X size={18} />
          </button>
        )}
      </div>

      {/* Nav items grouped list */}
      <nav style={{ flex: 1, padding: '16px 0', overflowY: 'auto', overflowX: 'hidden' }}>
        {NAV_SECTIONS.map((sec, idx) => (
          <div key={idx} style={{ marginBottom: '20px' }}>
            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 0.6, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  style={{
                    padding: '0 20px 8px', fontSize: '9px', fontWeight: 800,
                    color: '#B2C7DB', textTransform: 'uppercase', letterSpacing: '0.8px',
                    whiteSpace: 'nowrap'
                  }}
                >
                  {sec.title}
                </motion.div>
              )}
            </AnimatePresence>
            
            <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '4px' }}>
              {sec.items.map((item) => {
                const Icon = item.icon;
                const isActive = activePage === item.id;

                return (
                  <li key={item.id}>
                    <button
                      onClick={() => {
                        setActivePage(item.id);
                        if (isMobile) setCollapsed(true);
                      }}
                      style={{
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        padding: '10px 20px',
                        background: isActive ? '#1977CC' : 'transparent',
                        color: isActive ? '#FFFFFF' : '#B2C7DB',
                        border: 'none',
                        borderLeft: isActive ? '4px solid #3FBBC0' : '4px solid transparent',
                        fontSize: '13px',
                        fontWeight: isActive ? 700 : 500,
                        cursor: 'pointer',
                        textAlign: 'left',
                        transition: 'background 0.2s, color 0.2s',
                        position: 'relative',
                        overflow: 'hidden'
                      }}
                      onMouseEnter={(e) => {
                        if (!isActive) {
                          e.currentTarget.style.background = 'rgba(25, 119, 204, 0.08)';
                          e.currentTarget.style.color = '#FFFFFF';
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!isActive) {
                          e.currentTarget.style.background = 'transparent';
                          e.currentTarget.style.color = '#B2C7DB';
                        }
                      }}
                      title={!isExpanded ? item.label : undefined}
                    >
                      <Icon
                        size={17}
                        color={isActive ? '#FFFFFF' : '#3FBBC0'}
                        style={{ flexShrink: 0, transition: 'transform 0.2s' }}
                      />
                      
                      <motion.span
                        variants={textVariants}
                        animate={isExpanded ? 'expanded' : 'collapsed'}
                        style={{ whiteSpace: 'nowrap' }}
                      >
                        {item.label}
                      </motion.span>

                      {/* Active indicator dot for collapsed state */}
                      {!isExpanded && isActive && (
                        <div style={{
                          position: 'absolute', right: '6px', top: '50%', transform: 'translateY(-50%)',
                          width: '5px', height: '5px', borderRadius: '50%', background: '#3FBBC0'
                        }} />
                      )}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      {/* Sidebar Footer — HIS Status */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            style={{
              padding: '14px 20px',
              borderTop: '1px solid rgba(255,255,255,0.08)',
              background: '#1D3245', fontSize: '10.5px', color: '#B2C7DB',
              whiteSpace: 'nowrap'
            }}
          >
            <div style={{ fontWeight: 700, color: '#FFFFFF' }}>RadAudit QA Gateway</div>
            <div style={{ color: '#3FBBC0', marginTop: '3px' }}>ACR Standard Audit v3.2</div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );

  // MOBILE VIEW RENDERING
  if (isMobile) {
    return (
      <>
        {/* Mobile Backdrop */}
        <AnimatePresence>
          {!collapsed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setCollapsed(true)}
              style={{
                position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
                background: '#000000', zIndex: 900
              }}
            />
          )}
        </AnimatePresence>

        {/* Mobile Sidebar Sliding Drawer */}
        <motion.aside
          variants={mobileSidebarVariants}
          animate={collapsed ? 'closed' : 'open'}
          initial="closed"
          style={{
            position: 'fixed', top: 0, left: 0, bottom: 0,
            width: '240px', background: '#2C4964',
            borderRight: '1px solid #162C40', zIndex: 1000,
            display: 'flex', flexDirection: 'column',
            boxShadow: '4px 0 16px rgba(0,0,0,0.2)'
          }}
        >
          {renderContent()}
        </motion.aside>
      </>
    );
  }

  // DESKTOP VIEW RENDERING
  return (
    <motion.aside
      variants={sidebarVariants}
      animate={isExpanded ? 'expanded' : 'collapsed'}
      initial={collapsed ? 'collapsed' : 'expanded'}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        background: '#2C4964',
        borderRight: '1px solid #162C40',
        display: 'flex', flexDirection: 'column',
        flexShrink: 0, zIndex: 30, position: 'relative',
        height: '100vh', overflow: 'hidden'
      }}
    >
      {renderContent()}
    </motion.aside>
  );
}
