import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Loader2 } from 'lucide-react';

const STEPS = [
  { id: 1, label: 'Report Uploaded', desc: 'File ingested & validated' },
  { id: 2, label: 'Text Extracted', desc: 'Sections & demographics parsed' },
  { id: 3, label: 'AI Processing', desc: 'Groq/Gemini Llama 3.3 audit' },
  { id: 4, label: 'Quality Assessment', desc: '5-dimensional quality matrix' },
  { id: 5, label: 'Suggestions Generated', desc: 'Clinical wording revisions' },
  { id: 6, label: 'Report Ready', desc: 'QA Certificate PDF signed' },
];

export default function WorkflowTracker({ currentStep = 3, isAnalyzing = false }) {
  return (
    <div>
      {/* Header row */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{
            width: '8px', height: '8px', borderRadius: '50%',
            background: isAnalyzing ? '#0284C7' : '#10B981',
            boxShadow: isAnalyzing ? '0 0 8px #0284C7' : '0 0 6px #10B981',
            display: 'inline-block'
          }} />
          <span style={{ fontSize: '13px', fontWeight: 800, color: '#0F172A', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            Real-Time Clinical AI Analysis Pipeline
          </span>
        </div>
        <span style={{
          fontSize: '11px', fontWeight: 700,
          color: isAnalyzing ? '#0284C7' : '#059669',
          background: isAnalyzing ? '#E0F2FE' : '#ECFDF5',
          padding: '4px 12px', borderRadius: '20px',
          border: `1px solid ${isAnalyzing ? '#BAE6FD' : '#A7F3D0'}`
        }}>
          {isAnalyzing ? '⟳ Processing Audit...' : '✓ Pipeline Complete'}
        </span>
      </div>

      {/* Steps */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '0', position: 'relative' }}>
        {STEPS.map((step, idx) => {
          const isDone = step.id < currentStep || (!isAnalyzing && currentStep >= 6);
          const isCurrent = step.id === currentStep && isAnalyzing;

          return (
            <div key={step.id} style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
              {/* Connector Line */}
              {idx < STEPS.length - 1 && (
                <div style={{
                  position: 'absolute', top: '13px',
                  left: '26px', right: '-50%',
                  height: '2px', background: '#E2E8F0', zIndex: 0
                }}>
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: isDone ? '100%' : '0%' }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    style={{ height: '100%', background: '#059669', borderRadius: '1px' }}
                  />
                </div>
              )}

              {/* Indicator */}
              <motion.div
                initial={false}
                animate={{ scale: isCurrent ? [1, 1.12, 1] : 1 }}
                transition={{ repeat: isCurrent ? Infinity : 0, duration: 1.4 }}
                style={{
                  width: '26px', height: '26px', borderRadius: '8px', flexShrink: 0,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  marginBottom: '10px', position: 'relative', zIndex: 1,
                  background: isDone ? '#059669' : isCurrent ? '#E0F2FE' : '#F8FAFC',
                  border: isDone ? 'none' : isCurrent ? '2px solid #0284C7' : '2px solid #E2E8F0',
                  boxShadow: isDone ? '0 2px 8px rgba(5,150,105,0.3)' : isCurrent ? '0 0 10px rgba(2,132,199,0.25)' : 'none',
                }}
              >
                {isDone ? (
                  <CheckCircle2 size={14} color="#fff" />
                ) : isCurrent ? (
                  <Loader2 size={13} color="#0284C7" style={{ animation: 'spin 1s linear infinite' }} />
                ) : (
                  <span style={{ fontSize: '10px', fontWeight: 700, color: '#CBD5E1' }}>{step.id}</span>
                )}
              </motion.div>

              <span style={{ fontSize: '11px', fontWeight: isDone ? 700 : isCurrent ? 800 : 500, color: isDone ? '#059669' : isCurrent ? '#0284C7' : '#94A3B8', lineHeight: 1.3, marginBottom: '2px' }}>
                {step.label}
              </span>
              <span style={{ fontSize: '10px', color: '#CBD5E1', lineHeight: 1.4 }}>
                {step.desc}
              </span>
            </div>
          );
        })}
      </div>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
