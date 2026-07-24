import React, { useState, useEffect } from 'react';
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
  const [currentView, setCurrentView] = useState('app');
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

        // Attach original report text directly to auditResult object
        data.original_report_text = reportText;

        setAuditResult(data);
        if (data.effective_modality) setModality(data.effective_modality);

        // Save to history
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
    setAuditResult(resData);
  };

  const activeReportText = reportText || auditResult?.original_report_text || auditResult?.report_text || '';

  if (currentView === 'landing') {
    return (
      <LandingPage
        onLaunchApp={() => setCurrentView('app')}
        onOpenDoc={(doc) => {
          setCurrentView('app');
          setActivePage(doc);
        }}
      />
    );
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--bg-app)' }}>
      <Sidebar
        activePage={activePage}
        setActivePage={setActivePage}
        collapsed={sidebarCollapsed}
        setCollapsed={setSidebarCollapsed}
        serverConnected={serverConnected}
        auditCount={historyItems.length}
      />

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        <Header
          sidebarCollapsed={sidebarCollapsed}
          setSidebarCollapsed={setSidebarCollapsed}
          theme={theme}
          setTheme={setTheme}
          provider={provider}
          setProvider={setProvider}
          serverConnected={serverConnected}
        />

        <main style={{ flex: 1, padding: '24px', overflowY: 'auto' }}>
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
        </main>

        <Footer />
      </div>
    </div>
  );
}
