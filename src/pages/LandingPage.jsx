import React from 'react';
import { motion } from 'framer-motion';
import {
  Brain, BarChart3, ClipboardCheck, FileText, History, ShieldCheck, Zap, Stethoscope,
  ChevronDown, Heart, Activity as PulseIcon
} from 'lucide-react';

const FEATURES = [
  {
    icon: Brain,
    title: 'AI Report Evaluation',
    desc: 'Automatically evaluates radiology reports using artificial intelligence and advanced quality assessment techniques.',
    stats: ['Multi-Dimensional Analysis', 'Clinical Accuracy Assurance', 'Intelligent Cognitive Insights']
  },
  {
    icon: BarChart3,
    title: 'Quality Scoring',
    desc: 'Provides detailed scoring across multiple quality dimensions with an overall audit score.',
    stats: ['11 Evaluation Dimensions', 'Overall Quality Index', 'Mathematical Deduction Log']
  },
  {
    icon: ClipboardCheck,
    title: 'Clinical Recommendations',
    desc: 'Generates intelligent recommendations to improve report quality and standardization.',
    stats: ['Actionable Correction Proposals', 'Quality & Precision Boost', 'Best Documentation Practices']
  },
  {
    icon: FileText,
    title: 'PDF Audit Reports',
    desc: 'Download comprehensive audit reports containing scores, observations, and recommendations.',
    stats: ['One-Click Client Synthesis', 'Compliance Validation Stamps', 'Score Log File Export']
  },
  {
    icon: History,
    title: 'Report History',
    desc: 'View and manage previously audited reports with complete tracking history.',
    stats: ['Log Database Records', 'Active Version History', 'Accession ID Filtering']
  },
  {
    icon: ShieldCheck,
    title: 'Secure Processing',
    desc: 'Ensures uploaded reports remain secure and confidential throughout the audit process.',
    stats: ['Strict HIPAA Compliance', '100% In-Browser Execution', 'Encrypted Api Key Gate']
  },
  {
    icon: Zap,
    title: 'Fast Analysis',
    desc: 'Receive audit results within seconds using optimized AI processing.',
    stats: ['Sub-Second Processing', 'Real-Time QA Feedback', 'Optimized Model Routing']
  },
  {
    icon: Stethoscope,
    title: 'Standardized Reporting',
    desc: 'Promotes structured and standardized radiology documentation aligned with best practices.',
    stats: ['ACR Practice Parameters', 'RadLex Anatomical Vocabulary', 'Structured Header Check']
  }
];

export default function LandingPage({ onLaunchApp }) {
  // Container variant for staggering cards
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1.0] }
    }
  };

  return (
    <div style={{
      background: 'radial-gradient(circle at 10% 20%, #F1F7FC 0%, #FFFFFF 90%)',
      minHeight: '100vh',
      fontFamily: "'Poppins', 'Inter', sans-serif",
      color: '#2C4964',
      position: 'relative',
      overflowX: 'hidden'
    }}>
      
      {/* Light Clinical Grid Pattern Overlay */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
        backgroundImage: 'linear-gradient(rgba(25, 119, 204, 0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(25, 119, 204, 0.02) 1px, transparent 1px)',
        backgroundSize: '24px 24px',
        pointerEvents: 'none',
        zIndex: 1
      }} />

      {/* Floating Glowing Decorative Circles */}
      <motion.div
        animate={{
          y: [0, -15, 0],
          x: [0, 10, 0]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
        style={{
          position: 'absolute', top: '10%', right: '15%',
          width: '300px', height: '300px', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(63, 187, 192, 0.08) 0%, rgba(63, 187, 192, 0) 70%)',
          filter: 'blur(30px)', pointerEvents: 'none', zIndex: 1
        }}
      />
      <motion.div
        animate={{
          y: [0, 20, 0],
          x: [0, -15, 0]
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
        style={{
          position: 'absolute', bottom: '20%', left: '5%',
          width: '400px', height: '400px', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(25, 119, 204, 0.06) 0%, rgba(25, 119, 204, 0) 70%)',
          filter: 'blur(40px)', pointerEvents: 'none', zIndex: 1
        }}
      />

      {/* Welcome Hero Content */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '50px 24px', position: 'relative', zIndex: 2 }}>
        
        {/* Header Bar */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '50px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: '32px', height: '32px', borderRadius: '8px',
              background: '#1977CC', color: '#FFFFFF',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 4px 10px rgba(25, 119, 204, 0.3)'
            }}>
              <ShieldCheck size={20} />
            </div>
            <span style={{ fontSize: '16px', fontWeight: 800, color: '#2C4964', letterSpacing: '-0.3px' }}>
              RadAudit <span style={{ color: '#3FBBC0', fontWeight: 700, fontSize: '12px' }}>Clinical AI</span>
            </span>
          </div>
          <div style={{ fontSize: '12px', fontWeight: 600, color: '#6C757D', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#3FBBC0', display: 'inline-block' }} />
            HIS Integrated Gateway v3.2
          </div>
        </div>

        {/* Main Two-Column Hero Layout */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1.05fr)',
          gap: '40px',
          alignItems: 'center',
          minHeight: '60vh',
          marginBottom: '60px'
        }} className="landing-grid">
          
          {/* Left Column: Text & CTA Button */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span style={{
                fontSize: '11px', fontWeight: 800, color: '#1977CC',
                background: '#EBF5FF', padding: '6px 14px', borderRadius: '20px',
                textTransform: 'uppercase', letterSpacing: '1px', display: 'inline-block',
                marginBottom: '16px', border: '1px solid #DDE7F0'
              }}>
                ACR Standard Quality Assurance
              </span>
              
              <h1 style={{
                fontSize: '40px', fontWeight: 900, color: '#2C4964',
                lineHeight: 1.15, margin: '0 0 10px 0', letterSpacing: '-1px'
              }}>
                Radiology Report<br />
                <span style={{
                  background: 'linear-gradient(135deg, #1977CC 0%, #3FBBC0 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}>
                  Audit System
                </span>
              </h1>
              
              <p style={{ fontSize: '15px', fontWeight: 700, color: '#3FBBC0', margin: '0 0 18px 0', letterSpacing: '-0.2px' }}>
                AI-Powered Quality Assessment & Standardization Platform
              </p>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              style={{ fontSize: '13.5px', color: '#6C757D', lineHeight: 1.6, margin: 0 }}
            >
              The Radiology Report Audit System is an intelligent platform designed to evaluate the quality, completeness, and consistency of radiology reports using artificial intelligence.
            </motion.p>
            
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              style={{ fontSize: '13.5px', color: '#6C757D', lineHeight: 1.6, margin: 0 }}
            >
              The system analyzes uploaded reports across multiple quality dimensions, including clinical completeness, terminology consistency, report structure, readability, findings, impressions, and overall documentation quality. It provides detailed scoring, actionable recommendations, and downloadable audit reports to help improve reporting standards and support continuous quality improvement in radiology.
            </motion.p>

            {/* CTA Button Block (Learn More removed completely) */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              style={{ display: 'flex', marginTop: '10px' }}
            >
              <button
                onClick={onLaunchApp}
                style={{
                  padding: '12px 36px',
                  borderRadius: '30px',
                  border: 'none',
                  color: '#FFFFFF',
                  fontWeight: 700,
                  fontSize: '14px',
                  cursor: 'pointer',
                  overflow: 'hidden',
                  outline: 'none',
                  boxShadow: '0 6px 20px rgba(25, 119, 204, 0.35)',
                  background: 'linear-gradient(135deg, #1977CC 0%, #3FBBC0 50%, #1977CC 100%)',
                  backgroundSize: '200% auto',
                  transition: 'all 0.4s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundPosition = 'right center';
                  e.currentTarget.style.transform = 'scale(1.04) translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 8px 24px rgba(63, 187, 192, 0.4)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundPosition = 'left center';
                  e.currentTarget.style.transform = 'scale(1) translateY(0)';
                  e.currentTarget.style.boxShadow = '0 6px 20px rgba(25, 119, 204, 0.35)';
                }}
              >
                Get Started
              </button>
            </motion.div>
          </div>

          {/* Right Column: Scan MRI graphic */}
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative' }}>
            <motion.div
              animate={{
                y: [0, -12, 0]
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
              style={{
                width: '100%',
                maxWidth: '440px',
                background: '#FFFFFF',
                borderRadius: '20px',
                border: '1px solid #DDE7F0',
                boxShadow: '0 20px 40px rgba(44, 73, 100, 0.08)',
                padding: '24px',
                position: 'relative',
                zIndex: 2
              }}
            >
              <div style={{ background: '#162C40', borderRadius: '12px', height: '200px', width: '100%', position: 'relative', overflow: 'hidden', border: '1px solid #2C4964' }}>
                <svg viewBox="0 0 100 100" style={{ width: '100%', height: '100%', opacity: 0.85 }}>
                  <circle cx="50" cy="50" r="32" fill="none" stroke="#3FBBC0" strokeWidth="1.5" strokeDasharray="3, 3" />
                  <motion.line
                    x1="10" y1="20" x2="90" y2="20"
                    stroke="#1977CC" strokeWidth="2"
                    animate={{
                      y: [0, 60, 0]
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: 'easeInOut'
                    }}
                  />
                  <path d="M50,22 C32,22 30,40 30,55 C30,70 42,78 50,78 C58,78 70,70 70,55 C70,40 68,22 50,22 Z" fill="rgba(63, 187, 192, 0.15)" stroke="#3FBBC0" strokeWidth="2" />
                  <path d="M45,45 Q40,55 45,65 Q50,55 45,45 Z M55,45 Q60,55 55,65 Q50,55 55,45 Z" fill="#1977CC" opacity="0.6" />
                </svg>
                <div style={{ position: 'absolute', bottom: '12px', left: '12px', fontSize: '10px', color: '#3FBBC0', fontFamily: 'monospace', fontWeight: 'bold' }}>
                  [SCAN SYSTEM AI ENGINE ACTIVE]
                </div>
                <div style={{ position: 'absolute', top: '12px', right: '12px', fontSize: '9px', color: '#B2C7DB', fontFamily: 'monospace' }}>
                  Slice: 34/60 • Ax T2
                </div>
              </div>

              <div style={{ marginTop: '20px', borderTop: '1px solid #DDE7F0', paddingTop: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <span style={{ fontSize: '11px', fontWeight: 800, color: '#1977CC', textTransform: 'uppercase' }}>Report Compliance Index</span>
                  <span style={{ fontSize: '13px', fontWeight: 900, color: '#15803D' }}>95 / 100</span>
                </div>
                <div style={{ width: '100%', height: '6px', background: '#F1F7FC', borderRadius: '4px', overflow: 'hidden' }}>
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: '95%' }}
                    transition={{ duration: 1.5, delay: 0.5 }}
                    style={{ height: '100%', background: 'linear-gradient(90deg, #1977CC, #3FBBC0)' }}
                  />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginTop: '14px' }}>
                  <div style={{ background: '#F8FAFC', padding: '8px 10px', borderRadius: '8px', border: '1px solid #E2E8F0', fontSize: '10.5px' }}>
                    <div style={{ color: '#6C757D', fontWeight: 600 }}>Findings status</div>
                    <div style={{ fontWeight: 800, color: '#15803D', marginTop: '2px' }}>✓ Compliant</div>
                  </div>
                  <div style={{ background: '#F8FAFC', padding: '8px 10px', borderRadius: '8px', border: '1px solid #E2E8F0', fontSize: '10.5px' }}>
                    <div style={{ color: '#6C757D', fontWeight: 600 }}>RadLex vocabulary</div>
                    <div style={{ fontWeight: 800, color: '#1977CC', marginTop: '2px' }}>✓ 98% Precision</div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Floating items */}
            <motion.div
              animate={{ y: [-5, 5, -5] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              style={{ position: 'absolute', top: '15%', left: '5%', zIndex: 3, background: '#FFFFFF', padding: '8px', borderRadius: '50%', boxShadow: '0 4px 10px rgba(0,0,0,0.06)', border: '1px solid #E2E8F0' }}
            >
              <Stethoscope size={16} color="#1977CC" />
            </motion.div>
          </div>

        </div>

      </div>

      {/* Platform Features Section (Animated Cards) */}
      <div style={{ background: 'rgba(255, 255, 255, 0.85)', borderTop: '1px solid #DDE7F0', padding: '80px 24px', position: 'relative', zIndex: 2 }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          
          {/* Section Header */}
          <div style={{ textAlign: 'center', marginBottom: '56px' }}>
            <h2 style={{ fontSize: '26px', fontWeight: 900, color: '#2C4964', margin: '0 0 12px 0', letterSpacing: '-0.5px' }}>
              Why Choose Radiology Report Audit System?
            </h2>
            <p style={{ fontSize: '13.5px', color: '#6C757D', maxWidth: '750px', margin: '0 auto', lineHeight: 1.6, fontWeight: 500 }}>
              Experience AI-powered radiology quality assessment through an intelligent, secure, and easy-to-use platform designed to standardize radiology reporting and improve clinical documentation.
            </p>
          </div>

          {/* Cards Grid: Responsive Desktop:4, Tablet:2, Mobile:1 */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
              gap: '24px'
            }}
          >
            {FEATURES.map((feat, idx) => {
              const IconComponent = feat.icon;
              return (
                <motion.div
                  key={idx}
                  variants={cardVariants}
                  whileHover={{
                    scale: 1.03,
                    y: -8,
                    boxShadow: '0 16px 32px rgba(44, 73, 100, 0.12)',
                    borderColor: '#1977CC'
                  }}
                  style={{
                    background: 'rgba(255, 255, 255, 0.8)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid #E2E8F0',
                    borderRadius: '16px',
                    padding: '24px',
                    transition: 'all 0.3s cubic-bezier(0.25, 0.1, 0.25, 1.0)',
                    cursor: 'default',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    boxShadow: '0 4px 12px rgba(44, 73, 100, 0.03)'
                  }}
                >
                  <div>
                    {/* Floating Icon Box */}
                    <div style={{
                      width: '44px', height: '44px', borderRadius: '12px',
                      background: 'rgba(25, 119, 204, 0.05)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      marginBottom: '18px', border: '1px solid rgba(25, 119, 204, 0.12)'
                    }}>
                      <IconComponent size={20} color="#1977CC" />
                    </div>
                    
                    <h3 style={{ fontSize: '15px', fontWeight: 800, color: '#2C4964', margin: '0 0 10px 0', letterSpacing: '-0.2px' }}>
                      {feat.title}
                    </h3>
                    
                    <p style={{ fontSize: '12.5px', color: '#6C757D', lineHeight: 1.55, margin: '0 0 20px 0' }}>
                      {feat.desc}
                    </p>
                  </div>

                  {/* Bulleted Feature Highlights/Statistics */}
                  <div style={{
                    borderTop: '1px solid #E2E8F0',
                    paddingTop: '14px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '6px'
                  }}>
                    {feat.stats.map((stat, sIdx) => (
                      <div key={sIdx} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <span style={{
                          width: '4px', height: '4px', borderRadius: '50%',
                          background: '#3FBBC0', display: 'inline-block'
                        }} />
                        <span style={{ fontSize: '11px', fontWeight: 600, color: '#2C4964' }}>
                          {stat}
                        </span>
                      </div>
                    ))}
                  </div>

                </motion.div>
              );
            })}
          </motion.div>

        </div>
      </div>

      {/* Compliance Footer */}
      <div style={{ background: '#F1F7FC', borderTop: '1px solid #DDE7F0', padding: '24px', textAlign: 'center', fontSize: '11.5px', color: '#6C757D', position: 'relative', zIndex: 2 }}>
        © 2026 Radiology Report Audit System (RadAudit). HIPAA Compliant In-Browser Execution.
      </div>

    </div>
  );
}
