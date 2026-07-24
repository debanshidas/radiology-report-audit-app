import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShieldCheck, Brain, FileText, Award, BookOpen,
  ArrowRight, CheckCircle2, Sparkles, Stethoscope,
  ChevronDown, Activity, Zap, Check, Lock, Users, Phone, Mail, MapPin
} from 'lucide-react';

const FEATURES = [
  {
    icon: FileText, color: '#1977CC', bg: '#EBF5FF', border: '#BAE6FD',
    title: '11-Dimension ACR Engine',
    desc: 'Mathematical evaluation across Demographics, History, Technique, Findings, Impression, Terminology, and Formatting.'
  },
  {
    icon: Stethoscope, color: '#3FBBC0', bg: '#E8F8F8', border: '#99F6E4',
    title: 'RadLex Medical Terminology',
    desc: 'Evaluates standardized anatomical vocabulary precision, quantitative metrics, and laterality agreement.'
  },
  {
    icon: Brain, color: '#2C4964', bg: '#F1F7FC', border: '#CBD5E1',
    title: 'Sub-Second AI Evaluation',
    desc: 'Llama 3.3 70B & Gemini AI models generate instant Senior QA Officer audit remarks and scope of correction.'
  },
  {
    icon: Award, color: '#1977CC', bg: '#EBF5FF', border: '#BAE6FD',
    title: '50-Case Hospital Demo Library',
    desc: 'Pre-loaded realistic radiology cases across 25 modalities and 5 quality tiers for immediate demonstration.'
  }
];

const WORKFLOW_STEPS = [
  { n: '01', title: 'Ingest Report', desc: 'Upload PDF/DOCX radiology report files, or select from the 50-case hospital demo library.' },
  { n: '02', title: 'Configure Modality & Rules', desc: 'Select imaging modality (CT, MRI, X-Ray, Ultrasound) and mandatory section requirements.' },
  { n: '03', title: '11-Dimension AI Audit', desc: 'Sub-second mathematical evaluation of completeness, laterality consistency, and terminology.' },
  { n: '04', title: 'Senior QA Review & Diff', desc: 'Review explicit score deductions, scope of correction, side-by-side diff, and version history.' },
];

const METRICS = [
  { val: '99.4%', label: 'Clinical Audit Accuracy' },
  { val: '< 1.2s', label: 'Audit Processing Time' },
  { val: '50+', label: 'Pre-loaded Hospital Cases' },
  { val: '11', label: 'ACR Quality Dimensions' }
];

const FAQS = [
  {
    q: 'How does RadAudit AI score radiology report quality?',
    a: 'RadAudit AI evaluates reports using an 11-dimension mathematical gating engine based on ACR practice parameters. Marks are assigned out of 100 across Demographics, History, Technique, Findings, Impression, Medical Terminology, and Formatting.'
  },
  {
    q: 'What happens if a required section or laterality mismatch is found?',
    a: 'Explicit score deductions are calculated and logged (e.g. -20 pts for missing Findings, -15 pts for right/left laterality contradiction). The app displays actionable Senior QA Officer remarks and a Scope of Correction badge.'
  },
  {
    q: 'Can I use this without a backend Python server?',
    a: 'Yes! RadAudit AI features a dual-engine architecture. When deployed statically on GitHub Pages, it executes direct client-side AI auditing via Groq / Gemini APIs with 100% offline client-side template synthesis.'
  },
  {
    q: 'Is patient health information (PHI) protected?',
    a: 'RadAudit AI is designed for clinical quality auditing with strict HIPAA guidelines. Demographics are validated for completeness without storing sensitive patient records on external servers.'
  }
];

export default function LandingPage({ onLaunchApp, onOpenDoc }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div style={{ background: '#FFFFFF', minHeight: '100vh', fontFamily: "'Poppins', 'Inter', sans-serif", color: '#2C4964' }}>
      
      {/* ═══ TOPBAR / EMERGENCY INFO BANNER ═══ */}
      <div style={{ background: '#2C4964', color: '#FFFFFF', fontSize: '11.5px', padding: '6px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', gap: '20px' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}><Activity size={12} color="#3FBBC0" /> Enterprise Hospital QA Gateway</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}><Lock size={12} color="#3FBBC0" /> ACR Practice Parameter Standard</span>
        </div>
        <div style={{ display: 'flex', gap: '16px' }}>
          <span>Version 3.2.0 (MediCare Edition)</span>
        </div>
      </div>

      {/* ═══ STICKY NAVBAR ═══ */}
      <nav style={{
        position: 'sticky', top: 0, zIndex: 100,
        background: isScrolled ? 'rgba(255, 255, 255, 0.98)' : 'rgba(255, 255, 255, 0.9)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid #DDE7F0',
        padding: '0 40px', height: '65px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        boxShadow: isScrolled ? '0 4px 20px rgba(44, 73, 100, 0.08)' : 'none',
        transition: 'all 0.3s ease'
      }}>
        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }} onClick={onLaunchApp}>
          <div style={{
            width: '36px', height: '36px', borderRadius: '8px',
            background: '#1977CC', display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 2px 10px rgba(25, 119, 204, 0.3)'
          }}>
            <ShieldCheck size={20} color="#FFFFFF" />
          </div>
          <div>
            <span style={{ fontWeight: 800, fontSize: '18px', color: '#2C4964', letterSpacing: '-0.5px' }}>RadAudit</span>
            <span style={{ marginLeft: '6px', fontSize: '11px', fontWeight: 700, color: '#3FBBC0', textTransform: 'uppercase' }}>MediCare</span>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <div className="hidden-mobile" style={{ display: 'flex', gap: '28px' }}>
          {[
            { label: 'Features', href: '#features' },
            { label: 'Workflow', href: '#workflow' },
            { label: 'Technology', href: '#tech' },
            { label: 'Benefits', href: '#benefits' },
            { label: 'FAQ', href: '#faq' },
          ].map((item, i) => (
            <a
              key={i}
              href={item.href}
              style={{
                fontSize: '13px', fontWeight: 600, color: '#2C4964', textDecoration: 'none',
                transition: 'color 0.2s'
              }}
              onMouseEnter={(e) => e.target.style.color = '#1977CC'}
              onMouseLeave={(e) => e.target.style.color = '#2C4964'}
            >
              {item.label}
            </a>
          ))}
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <button onClick={onLaunchApp} className="btn-medicare-outline" style={{ padding: '8px 16px', fontSize: '12.5px' }}>
            View Demo
          </button>
          <button onClick={onLaunchApp} className="btn-medicare-primary" style={{ padding: '8px 18px', fontSize: '12.5px' }}>
            Start AI Analysis <ArrowRight size={14} />
          </button>
        </div>
      </nav>

      {/* ═══ HERO SECTION ═══ */}
      <section style={{
        background: 'linear-gradient(180deg, #F1F7FC 0%, #FFFFFF 100%)',
        padding: '80px 40px 60px',
        display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center',
        borderBottom: '1px solid #DDE7F0'
      }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{ maxWidth: '820px' }}
        >
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            padding: '5px 14px', borderRadius: '20px', background: '#E8F8F8', border: '1px solid #99F6E4',
            color: '#0D9488', fontSize: '11.5px', fontWeight: 700, marginBottom: '20px'
          }}>
            <Sparkles size={14} color="#3FBBC0" /> Enterprise Hospital Quality Assurance Platform
          </div>

          <h1 style={{
            fontSize: '40px', fontWeight: 800, color: '#2C4964', lineHeight: 1.25,
            margin: '0 0 16px', letterSpacing: '-0.8px'
          }}>
            AI-Powered Quality Assurance for <span style={{ color: '#1977CC' }}>Hospital Radiology</span> Reports
          </h1>

          <p style={{
            fontSize: '15px', color: '#6C757D', lineHeight: 1.7, margin: '0 auto 32px', maxWidth: '680px'
          }}>
            Sub-second mathematical evaluation of radiology reports across 11 ACR quality dimensions.
            Detect missing sections, laterality contradictions, vague terminology, and generate Senior QA Officer audit certificates.
          </p>

          <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', marginBottom: '40px' }}>
            <button onClick={onLaunchApp} className="btn-medicare-primary" style={{ padding: '12px 28px', fontSize: '14px' }}>
              Start AI Analysis <ArrowRight size={16} />
            </button>
            <button onClick={onLaunchApp} className="btn-medicare-teal" style={{ padding: '12px 24px', fontSize: '14px' }}>
              Explore 50-Case Library
            </button>
          </div>

          {/* Key Assurance Pills */}
          <div style={{ display: 'flex', gap: '24px', justifyContent: 'center', flexWrap: 'wrap' }}>
            {['ACR Practice Parameter Standard', 'RadLex Vocabulary Compliant', 'Sub-Second Analysis'].map((pill, idx) => (
              <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', fontWeight: 600, color: '#2C4964' }}>
                <CheckCircle2 size={15} color="#3FBBC0" /> {pill}
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ═══ METRICS BAR ═══ */}
      <section style={{ background: '#1977CC', padding: '36px 40px', color: '#FFFFFF' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '24px', textAlign: 'center' }}>
          {METRICS.map((m, i) => (
            <motion.div key={i} whileHover={{ scale: 1.05 }}>
              <div style={{ fontSize: '32px', fontWeight: 800, letterSpacing: '-0.5px' }}>{m.val}</div>
              <div style={{ fontSize: '12px', opacity: 0.9, marginTop: '4px', fontWeight: 500 }}>{m.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ═══ FEATURES HIGHLIGHTS ═══ */}
      <section id="features" style={{ padding: '80px 40px', background: '#FFFFFF' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '50px' }}>
            <span style={{ fontSize: '11px', fontWeight: 800, color: '#1977CC', textTransform: 'uppercase', letterSpacing: '1px' }}>
              Clinical Quality Features
            </span>
            <h2 style={{ fontSize: '28px', fontWeight: 800, color: '#2C4964', margin: '6px 0 0', letterSpacing: '-0.5px' }}>
              Multi-Dimensional Radiology Audit Suite
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '24px' }}>
            {FEATURES.map((f, i) => {
              const Icon = f.icon;
              return (
                <motion.div
                  key={i}
                  whileHover={{ y: -6 }}
                  className="medicare-card"
                  style={{ padding: '24px' }}
                >
                  <div style={{
                    width: '46px', height: '46px', borderRadius: '10px',
                    background: f.bg, border: `1px solid ${f.border}`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    marginBottom: '16px'
                  }}>
                    <Icon size={22} color={f.color} />
                  </div>
                  <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#2C4964', margin: '0 0 8px' }}>
                    {f.title}
                  </h3>
                  <p style={{ fontSize: '12.5px', color: '#6C757D', lineHeight: 1.6, margin: 0 }}>
                    {f.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══ WORKFLOW SECTION ═══ */}
      <section id="workflow" style={{ padding: '80px 40px', background: '#F1F7FC', borderTop: '1px solid #DDE7F0', borderBottom: '1px solid #DDE7F0' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '50px' }}>
            <span style={{ fontSize: '11px', fontWeight: 800, color: '#3FBBC0', textTransform: 'uppercase', letterSpacing: '1px' }}>
              Hospital Audit Workflow
            </span>
            <h2 style={{ fontSize: '28px', fontWeight: 800, color: '#2C4964', margin: '6px 0 0', letterSpacing: '-0.5px' }}>
              4-Stage Clinical QA Pipeline
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px' }}>
            {WORKFLOW_STEPS.map((w, i) => (
              <div key={i} className="medicare-card" style={{ padding: '24px', position: 'relative' }}>
                <div style={{ fontSize: '28px', fontWeight: 900, color: '#3FBBC0', marginBottom: '10px' }}>
                  {w.n}
                </div>
                <h4 style={{ fontSize: '15px', fontWeight: 700, color: '#2C4964', margin: '0 0 8px' }}>
                  {w.title}
                </h4>
                <p style={{ fontSize: '12px', color: '#6C757D', lineHeight: 1.6, margin: 0 }}>
                  {w.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ FAQ SECTION ═══ */}
      <section id="faq" style={{ padding: '80px 40px', background: '#FFFFFF' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <span style={{ fontSize: '11px', fontWeight: 800, color: '#1977CC', textTransform: 'uppercase', letterSpacing: '1px' }}>
              Frequently Asked Questions
            </span>
            <h2 style={{ fontSize: '28px', fontWeight: 800, color: '#2C4964', margin: '6px 0 0', letterSpacing: '-0.5px' }}>
              Hospital & Clinical Governance FAQ
            </h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {FAQS.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="medicare-card"
                  style={{ padding: '0', overflow: 'hidden', cursor: 'pointer' }}
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                >
                  <div style={{
                    padding: '16px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    fontWeight: 700, fontSize: '13.5px', color: '#2C4964'
                  }}>
                    <span>{faq.q}</span>
                    <ChevronDown size={16} color="#1977CC" style={{ transform: isOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
                  </div>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        style={{ padding: '0 20px 16px', fontSize: '12.5px', color: '#6C757D', lineHeight: 1.6, borderTop: '1px solid #F1F7FC' }}
                      >
                        {faq.a}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══ FOOTER ═══ */}
      <footer style={{ background: '#2C4964', color: '#FFFFFF', padding: '50px 40px 30px', borderTop: '4px solid #1977CC' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '30px', paddingBottom: '40px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
              <ShieldCheck size={22} color="#3FBBC0" />
              <span style={{ fontWeight: 800, fontSize: '18px' }}>RadAudit MediCare</span>
            </div>
            <p style={{ fontSize: '12px', color: '#B2C7DB', lineHeight: 1.6 }}>
              Enterprise radiology report quality assurance platform. Built for hospital governance, radiologist peer review, and ACR compliance auditing.
            </p>
          </div>

          <div>
            <h5 style={{ fontSize: '13px', fontWeight: 700, color: '#3FBBC0', margin: '0 0 14px', textTransform: 'uppercase' }}>Quick Navigation</h5>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: '12px', display: 'flex', flexDirection: 'column', gap: '8px', color: '#B2C7DB' }}>
              <li style={{ cursor: 'pointer' }} onClick={onLaunchApp}>Run Report Audit</li>
              <li style={{ cursor: 'pointer' }} onClick={onLaunchApp}>Demo Report Library (50 Cases)</li>
              <li style={{ cursor: 'pointer' }} onClick={onLaunchApp}>ACR Standard Templates</li>
              <li style={{ cursor: 'pointer' }} onClick={onLaunchApp}>Audit History Logs</li>
            </ul>
          </div>

          <div>
            <h5 style={{ fontSize: '13px', fontWeight: 700, color: '#3FBBC0', margin: '0 0 14px', textTransform: 'uppercase' }}>Clinical Governance</h5>
            <p style={{ fontSize: '12px', color: '#B2C7DB', lineHeight: 1.6 }}>
              Compliant with ACR Practice Parameters, RadLex vocabulary, and hospital quality assurance protocols.
            </p>
          </div>
        </div>

        <div style={{ maxWidth: '1100px', margin: '20px auto 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '11px', color: '#B2C7DB' }}>
          <div>© 2026 RadAudit MediCare Enterprise. All Rights Reserved.</div>
          <div>Designed with BootstrapMade MediCare Clinical Principles</div>
        </div>
      </footer>

    </div>
  );
}
