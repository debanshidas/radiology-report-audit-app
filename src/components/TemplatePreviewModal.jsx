import React, { useState } from 'react';
import { X, Copy, Check, Download, FileText, Sparkles, ArrowRight, ShieldCheck, Eye } from 'lucide-react';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { downloadPdfBlob, downloadDocxBlob } from '../utils/downloadHelper';

export default function TemplatePreviewModal({ template, onClose, onUseTemplate }) {
  const [copied, setCopied] = useState(false);
  const [activeView, setActiveView] = useState('formatted'); // 'formatted' | 'raw'
  const [isDownloading, setIsDownloading] = useState(false);

  if (!template) return null;

  const rawText = generateFullTemplateText(template);

  const handleCopy = () => {
    navigator.clipboard.writeText(rawText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadPdf = () => {
    setIsDownloading(true);
    try {
      const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
      doc.setFillColor(15, 23, 42);
      doc.rect(0, 0, 210, 28, 'F');

      doc.setTextColor(255, 255, 255);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(14);
      doc.text('ACR STANDARDIZED RADIOLOGY TEMPLATE PREVIEW', 14, 14);

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8.5);
      doc.setTextColor(186, 230, 253);
      doc.text(`Modality: ${template.modality} • ${template.name}`, 14, 21);

      autoTable(doc, {
        startY: 34,
        body: [[rawText]],
        theme: 'plain',
        bodyStyles: {
          fontSize: 8.5,
          font: 'courier',
          textColor: [15, 23, 42],
          fillColor: [248, 250, 252],
          cellPadding: 8
        },
        margin: { left: 14, right: 14 }
      });

      const pdfBlob = doc.output('blob');
      downloadPdfBlob(pdfBlob, `ACR_Template_${template.modality.replace(/\s+/g, '_')}.pdf`);
    } catch (e) {
      alert('Download error: ' + e.message);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        background: 'rgba(15, 23, 42, 0.65)',
        backdropFilter: 'blur(4px)',
        display: 'flex',
        alignItems: 'center',
        justify: 'center',
        padding: '20px'
      }}
      onClick={onClose}
    >
      <div
        className="enterprise-card"
        style={{
          width: '100%',
          maxWidth: '780px',
          maxHeight: '90vh',
          display: 'flex',
          flexDirection: 'column',
          padding: 0,
          overflow: 'hidden',
          background: 'var(--surface)',
          boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
          border: '1px solid var(--border)'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div
          style={{
            padding: '16px 22px',
            background: 'linear-gradient(135deg, #0F172A, #1E293B)',
            color: '#FFFFFF',
            display: 'flex',
            alignItems: 'center',
            justify: 'space-between',
            borderBottom: '1px solid #334155'
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              <Eye size={18} color="#38BDF8" />
              <span style={{ fontSize: '15px', fontWeight: 800, letterSpacing: '-0.2px' }}>
                Structured Template Preview
              </span>
              <span style={{ fontSize: '10px', fontWeight: 700, padding: '2px 8px', borderRadius: '12px', background: 'rgba(56, 189, 248, 0.15)', color: '#38BDF8', border: '1px solid rgba(56, 189, 248, 0.3)' }}>
                {template.modality}
              </span>
            </div>
            <div style={{ fontSize: '12px', color: '#94A3B8' }}>
              {template.name} • ACR Practice Parameter Reference
            </div>
          </div>

          <button
            onClick={onClose}
            style={{
              background: 'rgba(255,255,255,0.1)',
              border: 'none',
              borderRadius: '50%',
              width: '32px',
              height: '32px',
              color: '#FFFFFF',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justify: 'center'
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal View Selector Bar */}
        <div
          style={{
            padding: '10px 22px',
            background: 'var(--surface-muted)',
            borderBottom: '1px solid var(--border)',
            display: 'flex',
            alignItems: 'center',
            justify: 'space-between'
          }}
        >
          <div style={{ display: 'flex', gap: '6px' }}>
            <button
              onClick={() => setActiveView('formatted')}
              style={{
                padding: '4px 12px',
                borderRadius: '4px',
                fontSize: '11.5px',
                fontWeight: activeView === 'formatted' ? 800 : 500,
                background: activeView === 'formatted' ? '#0284C7' : 'transparent',
                color: activeView === 'formatted' ? '#FFFFFF' : 'var(--text-secondary)',
                border: 'none',
                cursor: 'pointer'
              }}
            >
              Formatted Sections
            </button>
            <button
              onClick={() => setActiveView('raw')}
              style={{
                padding: '4px 12px',
                borderRadius: '4px',
                fontSize: '11.5px',
                fontWeight: activeView === 'raw' ? 800 : 500,
                background: activeView === 'raw' ? '#0284C7' : 'transparent',
                color: activeView === 'raw' ? '#FFFFFF' : 'var(--text-secondary)',
                border: 'none',
                cursor: 'pointer'
              }}
            >
              Raw ACR Text
            </button>
          </div>

          <button
            onClick={handleCopy}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '4px 10px',
              borderRadius: '4px',
              fontSize: '11.5px',
              fontWeight: 700,
              background: copied ? '#DCFCE7' : 'var(--surface)',
              color: copied ? '#16A34A' : 'var(--text-primary)',
              border: `1px solid ${copied ? '#86EFAC' : 'var(--border)'}`,
              cursor: 'pointer'
            }}
          >
            {copied ? <Check size={13} /> : <Copy size={13} />}
            {copied ? 'Copied to Clipboard!' : 'Copy Text'}
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '22px' }}>
          {activeView === 'formatted' ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              
              {/* Patient Demographics */}
              <div style={{ border: '1px solid var(--border)', borderRadius: '6px', overflow: 'hidden' }}>
                <div style={{ background: 'var(--surface-muted)', padding: '8px 12px', fontSize: '11px', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  Patient Demographics & Accession Header
                </div>
                <div style={{ padding: '12px', fontSize: '12px', fontFamily: 'monospace', color: 'var(--text-primary)', lineHeight: 1.6, background: 'var(--surface)' }}>
                  <div><strong>Patient Name:</strong> [Last Name, First Name]</div>
                  <div><strong>MRN / Patient ID:</strong> [Medical Record Number]</div>
                  <div><strong>DOB / Age / Gender:</strong> [MM/DD/YYYY / Age / M/F]</div>
                  <div><strong>Study Date & Accession:</strong> [YYYY-MM-DD / Accession ID]</div>
                </div>
              </div>

              {/* Clinical History */}
              <div style={{ border: '1px solid var(--border)', borderRadius: '6px', overflow: 'hidden' }}>
                <div style={{ background: '#E0F2FE', padding: '8px 12px', fontSize: '11px', fontWeight: 800, color: '#0369A1', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  Clinical History / Indication
                </div>
                <div style={{ padding: '12px', fontSize: '12.5px', color: 'var(--text-primary)', lineHeight: 1.6, background: 'var(--surface)' }}>
                  {getSectionText(template.id, 'history')}
                </div>
              </div>

              {/* Technique / Procedure Details */}
              <div style={{ border: '1px solid var(--border)', borderRadius: '6px', overflow: 'hidden' }}>
                <div style={{ background: 'var(--surface-muted)', padding: '8px 12px', fontSize: '11px', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  Procedure Details / Technique & Contrast
                </div>
                <div style={{ padding: '12px', fontSize: '12.5px', color: 'var(--text-primary)', lineHeight: 1.6, background: 'var(--surface)' }}>
                  {getSectionText(template.id, 'technique')}
                </div>
              </div>

              {/* Comparison Study */}
              <div style={{ border: '1px solid var(--border)', borderRadius: '6px', overflow: 'hidden' }}>
                <div style={{ background: 'var(--surface-muted)', padding: '8px 12px', fontSize: '11px', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  Comparison Study
                </div>
                <div style={{ padding: '12px', fontSize: '12.5px', color: 'var(--text-primary)', lineHeight: 1.6, background: 'var(--surface)' }}>
                  Prior study dated [YYYY-MM-DD] evaluated for interval change / None available for comparison.
                </div>
              </div>

              {/* Findings */}
              <div style={{ border: '1px solid var(--border)', borderRadius: '6px', overflow: 'hidden' }}>
                <div style={{ background: '#F0FDF4', padding: '8px 12px', fontSize: '11px', fontWeight: 800, color: '#15803D', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  Findings (Organ Systems Breakdown)
                </div>
                <div style={{ padding: '12px', fontSize: '12.5px', color: 'var(--text-primary)', lineHeight: 1.7, background: 'var(--surface)', whiteSpace: 'pre-wrap' }}>
                  {getSectionText(template.id, 'findings')}
                </div>
              </div>

              {/* Impression */}
              <div style={{ border: '1px solid #BAE6FD', borderRadius: '6px', overflow: 'hidden' }}>
                <div style={{ background: '#E0F2FE', padding: '8px 12px', fontSize: '11px', fontWeight: 800, color: '#0284C7', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  Impression / Conclusion
                </div>
                <div style={{ padding: '12px', fontSize: '12.5px', fontWeight: 600, color: 'var(--text-primary)', lineHeight: 1.7, background: 'var(--surface)', whiteSpace: 'pre-wrap' }}>
                  {getSectionText(template.id, 'impression')}
                </div>
              </div>

              {/* Recommendation */}
              <div style={{ border: '1px solid var(--border)', borderRadius: '6px', overflow: 'hidden' }}>
                <div style={{ background: 'var(--surface-muted)', padding: '8px 12px', fontSize: '11px', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  Recommendation (If Applicable)
                </div>
                <div style={{ padding: '12px', fontSize: '12.5px', color: 'var(--text-secondary)', lineHeight: 1.6, background: 'var(--surface)' }}>
                  {getSectionText(template.id, 'recommendation')}
                </div>
              </div>

              {/* Signature */}
              <div style={{ border: '1px solid var(--border)', borderRadius: '6px', padding: '12px', background: 'var(--surface-muted)', fontSize: '11.5px', color: 'var(--text-muted)', textAlign: 'right' }}>
                <div>Digitally signed by: <strong>Dr. [Radiologist Name], MD</strong></div>
                <div>Staff Radiologist • Board Certified Radiology</div>
              </div>

            </div>
          ) : (
            <div
              style={{
                background: '#0F172A',
                color: '#38BDF8',
                fontFamily: 'monospace',
                fontSize: '11.5px',
                padding: '16px',
                borderRadius: '6px',
                whiteSpace: 'pre-wrap',
                lineHeight: 1.6
              }}
            >
              {rawText}
            </div>
          )}
        </div>

        {/* Modal Footer Actions */}
        <div
          style={{
            padding: '14px 22px',
            background: 'var(--surface-muted)',
            borderTop: '1px solid var(--border)',
            display: 'flex',
            alignItems: 'center',
            justify: 'space-between',
            gap: '12px'
          }}
        >
          <button
            onClick={onClose}
            className="btn-secondary"
            style={{ padding: '8px 16px', fontSize: '12px' }}
          >
            Close
          </button>

          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              onClick={handleDownloadPdf}
              disabled={isDownloading}
              className="btn-secondary"
              style={{ padding: '8px 14px', fontSize: '12px' }}
            >
              <Download size={13} /> {isDownloading ? 'Saving PDF...' : 'Download PDF'}
            </button>

            {onUseTemplate && (
              <button
                onClick={() => {
                  onUseTemplate(template, rawText);
                  onClose();
                }}
                className="btn-primary"
                style={{ padding: '8px 16px', fontSize: '12px', fontWeight: 800 }}
              >
                Use in Audit Workspace <ArrowRight size={13} />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function generateFullTemplateText(t) {
  return `AMERICAN COLLEGE OF RADIOLOGY (ACR) STRUCTURED TEMPLATE
Exam Modality: ${t.modality}
Template Name: ${t.name}
Compliance Framework: ACR 7-Section Practice Parameter Standard

PATIENT DEMOGRAPHICS:
Patient Name: [Last Name, First Name]
MRN / Patient ID: [Medical Record Number]
DOB / Age / Gender: [MM/DD/YYYY / Age / M/F]
Date of Service: [YYYY-MM-DD]
Accession Number: [10-Digit Accession ID]

CLINICAL HISTORY / INDICATION:
${getSectionText(t.id, 'history')}

PROCEDURE DETAILS / TECHNIQUE:
${getSectionText(t.id, 'technique')}

COMPARISON STUDY:
[Prior study date and modality, or "None available for comparison."]

FINDINGS:
${getSectionText(t.id, 'findings')}

IMPRESSION / CONCLUSION:
${getSectionText(t.id, 'impression')}

RECOMMENDATION:
${getSectionText(t.id, 'recommendation')}

REPORTING RADIOLOGIST SIGNATURE:
Digitally signed by Dr. [Radiologist Name], MD
Staff Radiologist • Board Certified Radiology
Date Signed: [YYYY-MM-DD]`;
}

function getSectionText(id, section) {
  const map = {
    chest_xray: {
      history: '45-year-old male with persistent cough, fever, and shortness of breath. Assess for pneumonia, infiltrates, or pleural effusion.',
      technique: 'Upright PA and lateral chest radiographs obtained without contrast.',
      findings: 'Lungs & Pleura: Clear bilaterally without focal consolidation, pleural effusion, or pneumothorax.\nCardiomediastinal Silhouette: Normal size and contour. Thoracic aorta intact.\nOsseous Structures: Visualized ribs and clavicles unremarkable.',
      impression: '1. No acute cardiopulmonary disease.\n2. Lungs are clear bilaterally without consolidation or effusion.',
      recommendation: 'Routine clinical correlation. Repeat radiograph in 2-3 weeks if symptoms persist.'
    },
    brain_mri: {
      history: '52-year-old female presenting with chronic progressive headaches and dizziness. Rule out mass effect, aneurysm, or acute stroke.',
      technique: 'Multiplanar, multisequence MRI of the brain before and after administration of 10 mL IV Gadolinium contrast.',
      findings: 'Brain Parenchyma: No acute cortical infarction, hemorrhage, or mass effect. Mild scattered T2/FLAIR hyperintensities in cerebral white matter.\nVentricles & Extra-axial Spaces: Ventricles and sulci normal for age.\nPost-contrast: No abnormal parenchymal or meningeal enhancement.',
      impression: '1. No acute intracranial hemorrhage or mass effect.\n2. Mild scattered white matter ischemic changes.',
      recommendation: 'Clinical correlation recommended. Follow up in 12 months as indicated.'
    },
    abdomen_ct: {
      history: '68-year-old male with acute right lower quadrant abdominal pain and fever. Rule out acute appendicitis or diverticulitis.',
      technique: 'Axial CT of the abdomen and pelvis performed with 100 mL IV Omnipaque 350 contrast.',
      findings: 'Solid Organs: Liver, spleen, pancreas, and kidneys are normal in size and attenuation without focal lesions.\nBowel & Mesentery: Appendix is normal caliber without wall thickening or surrounding fat stranding. Bowel loops unremarkable.\nVascular & Bones: Abdominal aorta is normal caliber.',
      impression: '1. No acute appendicitis, diverticulitis, or intra-abdominal fluid collection.\n2. Normal CT abdomen and pelvis.',
      recommendation: 'Clinical re-evaluation if fever or abdominal pain persists.'
    },
    spine_mri: {
      history: '58-year-old male with chronic lower back pain radiating to left leg. Assess lumbar spine disc herniation.',
      technique: 'Sagittal T1, T2, and axial T2-weighted MRI of the lumbar spine without contrast.',
      findings: 'Alignment: Normal lumbar lordosis preserved.\nL4-L5: Mild disc space narrowing with circumferential disc bulge causing mild canal stenosis.\nL5-S1: No focal disc protrusion or neural foraminal compromise.',
      impression: '1. L4-L5 mild disc bulge with canal stenosis.\n2. No acute fracture or spinal cord compression.',
      recommendation: 'Physical therapy and clinical correlation.'
    },
    mammography: {
      history: '55-year-old female presenting for routine annual screening mammography.',
      technique: 'Bilateral digital 2D mammography and 3D digital breast tomosynthesis (DBT) CC and MLO views.',
      findings: 'Breast Density: Heterogeneously dense breasts, which may obscure small masses.\nRight / Left Breast: No focal masses, architectural distortion, or suspicious microcalcifications.',
      impression: 'BI-RADS Category 1: Negative. No evidence of malignancy.',
      recommendation: 'Routine annual screening mammography in 1 year.'
    },
    pet_ct: {
      history: '62-year-old male with non-small cell lung carcinoma undergoing response evaluation.',
      technique: 'Whole-body 18F-FDG PET-CT scan from skull base to mid-thigh following IV administration of 10 mCi 18F-FDG.',
      findings: 'Thorax: Primary right upper lobe mass shows decreased FDG uptake (SUVmax 2.4 vs 8.1 prior).\nNodes & Abdomen: No hypermetabolic mediastinal or distant visceral metastases.',
      impression: 'Partial metabolic response to therapy. No new FDG-avid lesions.',
      recommendation: 'Follow-up PET-CT in 3 months per oncology protocol.'
    },
    fluoroscopy: {
      history: '48-year-old female with dysphagia and retrosternal heartburn.',
      technique: 'Single and double-contrast barium swallow fluoroscopy.',
      findings: 'Esophagus: Normal luminal caliber and primary peristaltic waves. No stricture or mucosal ulceration.',
      impression: 'Normal esophageal motility study.',
      recommendation: 'Clinical management of GERD symptoms.'
    },
    dexa: {
      history: '65-year-old postmenopausal female evaluated for osteoporosis screening.',
      technique: 'Dual-energy X-ray absorptiometry (DEXA) of L1-L4 lumbar spine and left femoral neck.',
      findings: 'Lumbar Spine L1-L4: T-score -2.1 (BMD 0.880 g/cm²).\nLeft Femoral Neck: T-score -1.8 (BMD 0.760 g/cm²).',
      impression: 'WHO Category: Osteopenia (T-score between -1.0 and -2.5).',
      recommendation: 'Calcium/Vitamin D supplementation and weight-bearing exercises.'
    }
  };

  const defaultSec = {
    history: 'Standard clinical history and chief diagnostic question.',
    technique: 'Standard imaging protocol technique and parameters.',
    findings: 'Systematic anatomical findings and measurements.',
    impression: '1. Primary diagnostic conclusion.\n2. Secondary findings.',
    recommendation: 'Routine clinical follow-up.'
  };

  const item = map[id] || defaultSec;
  return item[section] || defaultSec[section] || 'Documented according to departmental SOP.';
}
