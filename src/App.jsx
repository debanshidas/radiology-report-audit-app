import React, { useState, useEffect, useRef } from 'react';
import { ArrowUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';
import LandingPage from './pages/LandingPage';
import DashboardPage from './pages/DashboardPage';
import UploadPage from './pages/UploadPage';
import AnalysisPage from './pages/AnalysisPage';
import QualityDashboardPage from './pages/QualityDashboardPage';
import SuggestionsPage from './pages/SuggestionsPage';
import AuditReportPage from './pages/AuditReportPage';
import ReportViewer from './components/ReportViewer';
import AnalysisHistoryPage from './pages/AnalysisHistoryPage';
import ReportTemplatesPage from './pages/ReportTemplatesPage';
import AnalyticsPage from './pages/AnalyticsPage';
import AdminPage from './pages/AdminPage';
import SettingsPage from './pages/SettingsPage';
import AboutPage from './pages/AboutPage';
import { apiFetch } from './utils/apiClient';
import { directGroqAudit } from './utils/directGroqAudit';

export default function App() {
  const [currentView, setCurrentView] = useState('landing');
  const [activePage, setActivePage] = useState('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');
  const [provider, setProvider] = useState(() => localStorage.getItem('provider') || 'groq');

  const [reportText, setReportText] = useState('');
  const [modality, setModality] = useState('Chest X-Ray');
  const [mandatorySections, setMandatorySections] = useState([
    'Patient Demographics', 'Clinical Indication / History',
    'Procedure Details / Contrast Agent Details', 'Comparison Study',
    'Findings', 'Impression / Conclusion', 'Reporting Radiologist Signature'
  ]);
  const [serverConnected, setServerConnected] = useState(false);
  const [auditResult, setAuditResult] = useState(null);
  const [analysisError, setAnalysisError] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [showScrollTop, setShowScrollTop] = useState(false);

  const mainRef = useRef(null);

  const [historyItems, setHistoryItems] = useState(() => {
    try {
      const saved = localStorage.getItem('rad_audit_history');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('provider', provider);
  }, [provider]);

  useEffect(() => {
    const checkServer = () => {
      apiFetch(`/api/status?provider=${provider}`)
        .then((r) => r.json().then((d) => setServerConnected(Boolean(r.ok && d.online))))
        .catch(() => setServerConnected(false));
    };
    checkServer();
    const interval = setInterval(checkServer, 10000);
    return () => clearInterval(interval);
  }, [provider]);

  // Monitor main container scrolling to toggle Scroll-to-Top button
  const handleMainScroll = (e) => {
    if (e.target.scrollTop > 200) {
      setShowScrollTop(true);
    } else {
      setShowScrollTop(false);
    }
  };

  const scrollToTop = () => {
    if (mainRef.current) {
      mainRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleStartAudit = async () => {
    setActivePage('analysis');
    setIsAnalyzing(true);
    setAuditResult(null);
    setAnalysisError('');
    setCurrentStep(1);
    setTimeout(() => setCurrentStep(2), 600);
    setTimeout(() => setCurrentStep(3), 1200);

    let data;
    let isSuccess = false;

    try {
      const response = await apiFetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          report_text: reportText, modality,
          mandatory_sections: mandatorySections,
          provider: provider,
        })
      });
      data = await response.json();
      if (response.ok && data.quality_score !== undefined) {
        isSuccess = true;
      }
    } catch (err) {
      // Fallback to direct AI audit
    }

    if (!isSuccess) {
      try {
        data = await directGroqAudit({
          report_text: reportText,
          modality,
          mandatory_sections: mandatorySections,
          provider,
        });
        isSuccess = true;
      } catch (directErr) {
        setTimeout(() => {
          setAnalysisError(directErr.message || 'Audit failed. Check your API key in Settings.');
          setIsAnalyzing(false);
          setCurrentStep(6);
        }, 1500);
        return;
      }
    }

    setTimeout(() => setCurrentStep(4), 1800);
    setTimeout(() => setCurrentStep(5), 2400);

    setTimeout(() => {
      if (isSuccess && data && (data.quality_score !== undefined || data.overall_score !== undefined)) {
        if (data.quality_score === undefined && data.overall_score !== undefined) {
          data.quality_score = data.overall_score;
          data.readiness_status = data.readiness;
        }

        data.original_report_text = reportText;
        setAuditResult(data);
        if (data.effective_modality) setModality(data.effective_modality);

        const newItem = {
          id: 'audit_' + Date.now(),
          timestamp: new Date().toISOString(),
          report_title: reportText.substring(0, 45).split('\n')[0] || 'Radiology Report',
          modality: data.effective_modality || modality || 'Chest X-Ray',
          quality_score: data.quality_score,
          readiness_status: data.readiness_status,
          audit_result: data
        };
        setHistoryItems(prev => {
          const updated = [newItem, ...prev];
          localStorage.setItem('rad_audit_history', JSON.stringify(updated));
          return updated;
        });
      } else {
        setAnalysisError(data?.error || 'The audit could not be completed. Please try again.');
      }
      setCurrentStep(6);
      setIsAnalyzing(false);
    }, 3200);
  };

  const handleSelectAudit = (selectedItem) => {
    const resData = selectedItem.audit_result || selectedItem;
    const txt = resData.original_report_text || resData.report_text || selectedItem.report_title || '';
    if (txt) setReportText(txt);
  };

  const activeReportText = reportText || auditResult?.original_report_text || auditResult?.report_text || '';

  return (
    <AnimatePresence mode="wait">
      {currentView === 'landing' ? (
        <motion.div
          key="landing"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <LandingPage
            onLaunchApp={() => setCurrentView('app')}
            onOpenDoc={(doc) => {
              setCurrentView('app');
              setActivePage(doc);
            }}
          />
        </motion.div>
      ) : (
        <motion.div
          key="app"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          style={{ display: 'flex', height: '100vh', width: '100vw', overflow: 'hidden', background: 'var(--bg-app)' }}
        >
          <Sidebar
            activePage={activePage}
            setActivePage={setActivePage}
            collapsed={sidebarCollapsed}
            setCollapsed={setSidebarCollapsed}
            serverConnected={serverConnected}
            auditCount={historyItems.length}
          />

          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0, minHeight: 0, height: '100vh', overflow: 'hidden' }}>
            <Header
              sidebarCollapsed={sidebarCollapsed}
              setSidebarCollapsed={setSidebarCollapsed}
              theme={theme}
              setTheme={setTheme}
              provider={provider}
              setProvider={setProvider}
              serverConnected={serverConnected}
            />

            <main
              ref={mainRef}
              onScroll={handleMainScroll}
              style={{ flex: 1, minHeight: 0, padding: '24px', overflowY: 'auto', overflowX: 'hidden', position: 'relative', WebkitOverflowScrolling: 'touch' }}
            >
              <div>
                {activePage === 'dashboard' && <DashboardPage setActivePage={setActivePage} setReportText={setReportText} serverConnected={serverConnected} />}
                {activePage === 'upload' && <UploadPage reportText={reportText} setReportText={setReportText} modality={modality} setModality={setModality} mandatorySections={mandatorySections} setMandatorySections={setMandatorySections} onStartAudit={handleStartAudit} isLoading={isAnalyzing} />}
                {activePage === 'analysis' && <AnalysisPage isAnalyzing={isAnalyzing} currentStep={currentStep} auditResult={auditResult} analysisError={analysisError} setActivePage={setActivePage} provider={provider} />}
                {activePage === 'quality' && <QualityDashboardPage auditResult={auditResult} reportText={activeReportText} setReportText={setReportText} setActivePage={setActivePage} />}
                {activePage === 'suggestions' && <SuggestionsPage auditResult={auditResult} reportText={activeReportText} setReportText={setReportText} setActivePage={setActivePage} />}
                {activePage === 'report' && <AuditReportPage auditResult={auditResult} reportText={activeReportText} modality={modality} />}
                {activePage === 'viewer' && <ReportViewer reportText={activeReportText} auditResult={auditResult} />}
                {activePage === 'history' && <AnalysisHistoryPage historyItems={historyItems} setHistoryItems={setHistoryItems} onSelectAudit={handleSelectAudit} setActivePage={setActivePage} />}
                {activePage === 'templates' && <ReportTemplatesPage />}
                {activePage === 'downloads' && <ReportTemplatesPage />}
                {activePage === 'analytics' && <AnalyticsPage />}
                {activePage === 'admin' && <AdminPage />}
                {activePage === 'settings' && <SettingsPage theme={theme} setTheme={setTheme} serverConnected={serverConnected} setServerConnected={setServerConnected} provider={provider} setProvider={setProvider} />}
                {activePage === 'about' && <AboutPage />}
              </div>

              {/* Floating Scroll to Top Button */}
              {showScrollTop && (
                <button
                  onClick={scrollToTop}
                  title="Scroll to Top"
                  style={{
                    position: 'fixed', bottom: '32px', right: '32px', zIndex: 999,
                    width: '44px', height: '44px', borderRadius: '50%',
                    background: 'linear-gradient(135deg, #0284C7, #0D9488)', color: '#FFFFFF',
                    border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    boxShadow: '0 4px 14px rgba(2,132,199,0.4)', transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
                  onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                >
                  <ArrowUp size={20} />
                </button>
              )}
            </main>

            <Footer />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
