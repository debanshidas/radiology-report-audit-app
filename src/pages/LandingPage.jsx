import React from 'react';
import { motion } from 'framer-motion';
import {
  ShieldCheck, Brain, FileText, Award, BookOpen,
  ArrowRight, CheckCircle2, Sparkles, Stethoscope
} from 'lucide-react';

const FEATURES = [
  {
    icon: FileText, color: '#0D9488', bg: '#F0FDFA', border: '#99F6E4',
    title: 'Section Completeness',
    desc: 'Verifies essential sections: Demographics, History, Technique, Findings, Impression, and Signature.'
  },
  {
    icon: Stethoscope, color: '#0284C7', bg: '#E0F2FE', border: '#BAE6FD',
    title: 'Anatomical Vocabulary',
    desc: 'Evaluates ACR/RadLex terminology compliance, flagging vague acronyms or informal anatomical jargon.'
  },
  {
    icon: Brain, color: '#D97706', bg: '#FFF7ED', border: '#FED7AA',
    title: 'Clinical Alignment',
    desc: 'Ensures logical agreement between Findings body text and final Impression conclusions.'
  },
  {
    icon: Award, color: '#7C3AED', bg: '#F5F3FF', border: '#DDD6FE',
    title: 'PDF Audit Certificate',
    desc: 'Generates branded clinical audit certificates for department quality logs and compliance records.'
  }
];

const WORKFLOW_STEPS = [
  { n: '1', title: 'Ingest Report', desc: 'Upload PDF, DOCX, or TXT clinical report files, or paste directly.' },
  { n: '2', title: 'Configure Parameters', desc: 'Select modality (CT, MRI, X-Ray) and toggle mandatory sections.' },
  { n: '3', title: 'Sub-Second AI Audit', desc: 'Llama 3.3 / Gemini evaluates completeness, terminology & consistency.' },
  { n: '4', title: 'Export Certificate', desc: 'Review AI suggestions and download official PDF audit report.' },
];

const CHECKS = ['ACR & RadLex Compliant', 'Sub-Second Analysis', 'Epic & Cerner Ready'];

export default function LandingPage({ onStartAnalysis }) {
  return (
    <div style={{ minHeight: '100vh', background: '#F8FAFC', fontFamily: "'Inter', 'Segoe UI', sans-serif", overflowX: 'hidden' }}>

      {/* ═══ NAVIGATION ═══ */}
      <nav style={{
        position: 'sticky', top: 0, zIndex: 50,
        background: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(12px)',
        borderBottom: '1px solid #E2E8F0',
        padding: '0 40px', height: '60px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        boxShadow: '0 1px 12px rgba(15,23,42,0.06)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            width: '34px', height: '34px', borderRadius: '8px',
            background: 'linear-gradient(135deg, #0284C7, #0D9488)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 2px 8px rgba(2,132,199,0.3)'
          }}>
            <ShieldCheck size={18} color="#fff" />
          </div>
          <div>
            <span style={{ fontWeight: 800, fontSize: '16px', color: '#0F172A', letterSpacing: '-0.5px' }}>RadAudit AI</span>
            <span style={{
              marginLeft: '8px', fontSize: '10px', fontWeight: 700,
              background: '#F0FDFA', color: '#0D9488',
              border: '1px solid #99F6E4', padding: '2px 7px', borderRadius: '20px'
            }}>Clinical QA Platform</span>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '32px' }}>
          {['#features', '#workflow', '#tech', '#benefits'].map((href, i) => (
            <a key={i} href={href} style={{
              fontSize: '13px', fontWeight: 600, color: '#475569',
              textDecoration: 'none', transition: 'color 0.2s'
            }}
              onMouseEnter={e => e.target.style.color = '#0284C7'}
              onMouseLeave={e => e.target.style.color = '#475569'}
            >
              {['Features', 'Workflow', 'Technology', 'Benefits'][i]}
            </a>
          ))}
        </div>

        <button
          onClick={onStartAnalysis}
          style={{
            display: 'flex', alignItems: 'center', gap: '6px',
            background: 'linear-gradient(135deg, #0284C7, #0D9488)',
            color: '#fff', fontWeight: 700, fontSize: '13px',
            padding: '9px 20px', borderRadius: '8px',
            border: 'none', cursor: 'pointer',
            boxShadow: '0 2px 10px rgba(2,132,199,0.35)',
            transition: 'all 0.2s'
          }}
          onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = '0 4px 16px rgba(2,132,199,0.4)'; }}
          onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 2px 10px rgba(2,132,199,0.35)'; }}
        >
          Launch Platform <ArrowRight size={14} />
        </button>
      </nav>

      {/* ═══ HERO ═══ */}
      <section style={{
        padding: '80px 40px 60px',
        maxWidth: '1280px', margin: '0 auto'
      }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'center' }}>

          {/* Left: Text */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            style={{ maxWidth: '560px' }}
          >
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '6px',
              background: '#F0FDFA', border: '1px solid #99F6E4',
              borderRadius: '20px', padding: '5px 14px',
              fontSize: '12px', fontWeight: 700, color: '#0D9488',
              marginBottom: '24px'
            }}>
              <Sparkles size={13} color="#0D9488" />
              Next-Gen Enterprise Radiology QA
            </div>

            <h1 style={{
              fontSize: 'clamp(32px, 4vw, 52px)',
              fontWeight: 900, color: '#0F172A',
              lineHeight: 1.1, letterSpacing: '-1.5px',
              marginBottom: '20px'
            }}>
              AI-Powered{' '}
              <span style={{
                color: '#0284C7',
                textDecoration: 'underline',
                textDecorationColor: '#0D9488',
                textDecorationThickness: '3px',
                textUnderlineOffset: '5px'
              }}>
                Radiology Report
              </span>{' '}
              Quality Assurance
            </h1>

            <p style={{
              fontSize: '16px', color: '#475569', lineHeight: 1.7,
              marginBottom: '32px', fontWeight: 400
            }}>
              Evaluate completeness, anatomical terminology, finding-to-impression consistency,
              and formatting compliance across radiology reports{' '}
              <strong style={{ color: '#0F172A' }}>before final signature</strong>.
              Powered by Groq Llama 3.3 70B & Google Gemini 2.0 Flash.
            </p>

            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '36px' }}>
              <button
                onClick={onStartAnalysis}
                style={{
                  display: 'flex', alignItems: 'center', gap: '8px',
                  background: 'linear-gradient(135deg, #0284C7, #0D9488)',
                  color: '#fff', fontWeight: 800, fontSize: '14px',
                  padding: '13px 28px', borderRadius: '10px',
                  border: 'none', cursor: 'pointer',
                  boxShadow: '0 4px 16px rgba(2,132,199,0.35)',
                  transition: 'all 0.2s'
                }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(2,132,199,0.4)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 4px 16px rgba(2,132,199,0.35)'; }}
              >
                Start Report Analysis <ArrowRight size={16} />
              </button>

              <a
                href="#features"
                style={{
                  display: 'flex', alignItems: 'center', gap: '8px',
                  background: '#fff', color: '#334155', fontWeight: 700, fontSize: '14px',
                  padding: '13px 24px', borderRadius: '10px',
                  border: '1.5px solid #E2E8F0', cursor: 'pointer',
                  textDecoration: 'none', transition: 'all 0.2s'
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = '#0284C7'; e.currentTarget.style.color = '#0284C7'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = '#E2E8F0'; e.currentTarget.style.color = '#334155'; }}
              >
                <BookOpen size={15} /> Explore Features
              </a>
            </div>

            <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', paddingTop: '20px', borderTop: '1px solid #E2E8F0' }}>
              {CHECKS.map((c, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <CheckCircle2 size={15} color="#059669" />
                  <span style={{ fontSize: '12px', fontWeight: 600, color: '#334155' }}>{c}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right: Interactive Demo Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            style={{ position: 'relative' }}
          >
            {/* Ambient glow */}
            <div style={{
              position: 'absolute', inset: '-20px',
              background: 'radial-gradient(circle, rgba(13,148,136,0.12) 0%, transparent 70%)',
              borderRadius: '24px', zIndex: 0
            }} />

            <div style={{
              background: '#fff',
              border: '1px solid #E2E8F0',
              borderRadius: '16px', padding: '24px',
              boxShadow: '0 8px 32px rgba(15,23,42,0.10)',
              position: 'relative', zIndex: 1
            }}>
              {/* Card header */}
              <div style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                borderBottom: '1px solid #F1F5F9', paddingBottom: '14px', marginBottom: '16px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Stethoscope size={16} color="#0284C7" />
                  <span style={{ fontSize: '11px', fontWeight: 800, color: '#0F172A', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                    Clinical QA Radar Scanner
                  </span>
                </div>
                <span style={{
                  fontSize: '10px', fontWeight: 700,
                  background: '#ECFDF5', color: '#059669',
                  border: '1px solid #A7F3D0', padding: '3px 8px', borderRadius: '20px'
                }}>SYSTEM READY</span>
              </div>

              {/* Mock report snippet */}
              <div style={{
                background: '#F8FAFC', border: '1px solid #E2E8F0',
                borderRadius: '8px', padding: '14px', marginBottom: '14px',
                fontFamily: 'monospace', fontSize: '11px'
              }}>
                <div style={{
                  display: 'flex', justifyContent: 'space-between',
                  paddingBottom: '8px', marginBottom: '8px',
                  borderBottom: '1px solid #E2E8F0',
                  fontSize: '10px', color: '#64748B', fontFamily: "'Inter', sans-serif"
                }}>
                  <span>EXAM: CT ABDOMEN & PELVIS WITH CONTRAST</span>
                  <span style={{ fontWeight: 800, color: '#059669' }}>95/100 QUALITY</span>
                </div>
                <p style={{ color: '#334155', lineHeight: 1.6, fontFamily: "'Inter', sans-serif" }}>
                  <strong>FINDINGS:</strong> Appendix enlarged measuring 11mm with periappendiceal fat stranding.
                </p>
                <div style={{
                  marginTop: '10px', background: '#FFF7ED',
                  borderLeft: '3px solid #F59E0B',
                  borderRadius: '4px', padding: '8px 10px',
                  fontSize: '11px', color: '#92400E', fontFamily: "'Inter', sans-serif"
                }}>
                  <strong>⚠ AI ALERT:</strong> Impression omits appendiceal status despite Findings. Logical contradiction flagged.
                </div>
              </div>

              {/* Stats row */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div style={{
                  background: 'linear-gradient(135deg, #F0FDFA, #CCFBF1)',
                  border: '1px solid #99F6E4',
                  borderRadius: '10px', padding: '14px', textAlign: 'center'
                }}>
                  <div style={{ fontSize: '22px', fontWeight: 900, color: '#0D9488' }}>100%</div>
                  <div style={{ fontSize: '10px', fontWeight: 700, color: '#0F766E', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Section Completeness</div>
                </div>
                <div style={{
                  background: 'linear-gradient(135deg, #E0F2FE, #BAE6FD)',
                  border: '1px solid #7DD3FC',
                  borderRadius: '10px', padding: '14px', textAlign: 'center'
                }}>
                  <div style={{ fontSize: '22px', fontWeight: 900, color: '#0284C7' }}>&lt;400ms</div>
                  <div style={{ fontSize: '10px', fontWeight: 700, color: '#0369A1', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Groq AI Latency</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══ FEATURES ═══ */}
      <section id="features" style={{ padding: '80px 40px', background: '#fff', borderTop: '1px solid #E2E8F0', borderBottom: '1px solid #E2E8F0' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <span style={{
              fontSize: '11px', fontWeight: 700, color: '#0284C7',
              background: '#E0F2FE', border: '1px solid #BAE6FD',
              padding: '4px 14px', borderRadius: '20px', textTransform: 'uppercase', letterSpacing: '0.5px'
            }}>Enterprise Features</span>
            <h2 style={{ fontSize: 'clamp(24px, 3vw, 40px)', fontWeight: 900, color: '#0F172A', marginTop: '16px', marginBottom: '12px', letterSpacing: '-1px' }}>
              Comprehensive Quality Assurance Matrix
            </h2>
            <p style={{ fontSize: '15px', color: '#64748B', maxWidth: '560px', margin: '0 auto' }}>
              Built for clinical governance teams, department heads, and practicing radiologists.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }}>
            {FEATURES.map((f, i) => {
              const Icon = f.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  style={{
                    background: '#F8FAFC',
                    border: '1px solid #E2E8F0',
                    borderRadius: '12px', padding: '24px',
                    transition: 'all 0.25s', cursor: 'default'
                  }}
                  whileHover={{ y: -4, boxShadow: '0 8px 24px rgba(15,23,42,0.10)', borderColor: f.border }}
                >
                  <div style={{
                    width: '44px', height: '44px', borderRadius: '10px',
                    background: f.bg, border: `1px solid ${f.border}`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    marginBottom: '16px'
                  }}>
                    <Icon size={22} color={f.color} />
                  </div>
                  <h3 style={{ fontSize: '14px', fontWeight: 800, color: '#0F172A', marginBottom: '8px' }}>{f.title}</h3>
                  <p style={{ fontSize: '12px', color: '#64748B', lineHeight: 1.6 }}>{f.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══ WORKFLOW ═══ */}
      <section id="workflow" style={{ padding: '80px 40px' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', textAlign: 'center' }}>
          <span style={{
            fontSize: '11px', fontWeight: 700, color: '#0D9488',
            background: '#F0FDFA', border: '1px solid #99F6E4',
            padding: '4px 14px', borderRadius: '20px', textTransform: 'uppercase', letterSpacing: '0.5px'
          }}>Audit Workflow</span>
          <h2 style={{ fontSize: 'clamp(24px, 3vw, 40px)', fontWeight: 900, color: '#0F172A', marginTop: '16px', marginBottom: '48px', letterSpacing: '-1px' }}>
            How the Clinical AI Pipeline Operates
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', textAlign: 'left' }}>
            {WORKFLOW_STEPS.map((s, i) => (
              <div key={i} style={{
                background: '#fff', border: '1px solid #E2E8F0',
                borderRadius: '12px', padding: '24px',
                boxShadow: '0 2px 8px rgba(15,23,42,0.05)'
              }}>
                <div style={{
                  width: '36px', height: '36px', borderRadius: '10px',
                  background: 'linear-gradient(135deg, #0284C7, #0D9488)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontWeight: 900, fontSize: '14px', color: '#fff', marginBottom: '14px',
                  boxShadow: '0 3px 10px rgba(2,132,199,0.3)'
                }}>{s.n}</div>
                <h3 style={{ fontSize: '14px', fontWeight: 800, color: '#0F172A', marginBottom: '8px' }}>{s.title}</h3>
                <p style={{ fontSize: '12px', color: '#64748B', lineHeight: 1.6 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ FOOTER ═══ */}
      <footer style={{
        background: '#0F172A', color: '#94A3B8',
        borderTop: '1px solid #1E293B', padding: '48px 40px'
      }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: '40px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
              <div style={{
                width: '32px', height: '32px', borderRadius: '8px',
                background: 'linear-gradient(135deg, #0284C7, #0D9488)',
                display: 'flex', alignItems: 'center', justifyContent: 'center'
              }}>
                <ShieldCheck size={16} color="#fff" />
              </div>
              <span style={{ fontSize: '15px', fontWeight: 800, color: '#F1F5F9' }}>RadAudit AI</span>
            </div>
            <p style={{ fontSize: '12px', lineHeight: 1.8, color: '#64748B' }}>
              Enterprise Radiology Report Quality Assurance & Governance Platform for Hospital Information Systems.
            </p>
          </div>

          {[
            { title: 'Modules', links: ['Quality Analytics', 'Workflow Pipeline', 'Groq & Gemini AI'] },
            { title: 'Governance', links: ['ACR Guidelines', 'RadLex Vocabulary', 'QA Certificate'] },
          ].map((col, i) => (
            <div key={i}>
              <h4 style={{ fontSize: '11px', fontWeight: 800, color: '#F1F5F9', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '14px' }}>{col.title}</h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {col.links.map((l, j) => (
                  <li key={j} style={{ fontSize: '12px', color: '#64748B' }}>{l}</li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h4 style={{ fontSize: '11px', fontWeight: 800, color: '#F1F5F9', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '14px' }}>Get Started</h4>
            <button
              onClick={onStartAnalysis}
              style={{
                background: 'linear-gradient(135deg, #0284C7, #0D9488)',
                color: '#fff', fontWeight: 700, fontSize: '12px',
                padding: '10px 20px', borderRadius: '8px', border: 'none',
                cursor: 'pointer', width: '100%',
                boxShadow: '0 2px 10px rgba(2,132,199,0.3)'
              }}
            >
              Launch Audit App →
            </button>
          </div>
        </div>

        <div style={{ maxWidth: '1280px', margin: '32px auto 0', paddingTop: '24px', borderTop: '1px solid #1E293B', textAlign: 'center', fontSize: '11px', color: '#334155' }}>
          © 2026 RadAudit AI · Enterprise Clinical QA Platform · ACR & RadLex Compliant
        </div>
      </footer>
    </div>
  );
}
