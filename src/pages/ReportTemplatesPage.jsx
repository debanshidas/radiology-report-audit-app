import React, { useState } from 'react';
import { Download, FileText, CheckCircle2, BookOpen, Sparkles, FileCode, Eye } from 'lucide-react';
import AICautionNotice from '../components/AICautionNotice';
import TemplatePreviewModal from '../components/TemplatePreviewModal';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { downloadPdfBlob, downloadDocxBlob } from '../utils/downloadHelper';

const TEMPLATES = [
  {
    id: 'chest_xray',
    name: 'Standard Chest Radiograph (PA & Lateral)',
    modality: 'Chest X-Ray',
    desc: 'Standardized 7-section ACR template for routine outpatient and emergency room chest radiograph reporting.',
    sections: ['Demographics', 'Indication', 'Technique', 'Comparison', 'Findings', 'Impression', 'Signature'],
  },
  {
    id: 'brain_mri',
    name: 'Brain MRI (Routine Neuro protocol)',
    modality: 'Brain MRI',
    desc: 'Multi-sequence MRI template evaluating parenchymal signal intensity, ventricular system, extra-axial spaces, and diffusion weighted imaging.',
    sections: ['Demographics', 'Indication', 'Pulse Sequences & Contrast', 'Comparison', 'Brain Parenchyma', 'Ventricles & Vessels', 'Impression'],
  },
  {
    id: 'abdomen_ct',
    name: 'Abdomen & Pelvis CT with IV Contrast',
    modality: 'Abdomen CT',
    desc: 'Multi-organ abdominal CT protocol evaluating solid organs (liver, spleen, pancreas, kidneys), bowel, mesentery, retroperitoneum, and vasculature.',
    sections: ['Demographics', 'Indication', 'Technique & Contrast Volume', 'Solid Organs', 'Bowel & Peritoneum', 'Vascular & Bones', 'Impression'],
  },
  {
    id: 'spine_mri',
    name: 'Lumbar Spine MRI (Degenerative & Disc)',
    modality: 'Spine MRI',
    desc: 'Structured spinal MRI template reporting intervertebral disc height, canal stenosis, neural foraminal narrowing, and spinal cord signal.',
    sections: ['Demographics', 'Indication', 'Sequences', 'Alignment & Bones', 'Level-by-Level Disc & Foramina', 'Impression'],
  },
  {
    id: 'mammography',
    name: 'Screening Mammography (BI-RADS)',
    modality: 'Mammography',
    desc: 'ACR BI-RADS 5th Edition standardized template for 2D/3D tomosynthesis breast cancer screening reports.',
    sections: ['Demographics', 'Indication', 'Composition', 'Bilateral Findings', 'BI-RADS Category (0-6)', 'Recommendation'],
  },
  {
    id: 'pet_ct',
    name: 'Whole-Body 18F-FDG PET-CT',
    modality: 'PET-CT',
    desc: 'Oncology staging template measuring metabolic SUVmax values across head, neck, chest, abdomen, and skeletal structures.',
    sections: ['Demographics', 'Indication', 'Radiotracer Dose & Glucose', 'SUVmax Findings', 'Impression', 'Signature'],
  },
  {
    id: 'fluoroscopy',
    name: 'Barium Swallow Fluoroscopy',
    modality: 'Fluoroscopy',
    desc: 'Dynamic fluoroscopic motility template evaluating swallowing mechanics, mucosal fold integrity, and esophageal transit.',
    sections: ['Demographics', 'Indication', 'Contrast Agent', 'Pharyngeal & Esophageal Transit', 'Impression', 'Signature'],
  },
  {
    id: 'dexa',
    name: 'Bone Density DEXA Scan',
    modality: 'DEXA Scan',
    desc: 'Dual-energy X-ray absorptiometry template reporting lumbar spine and femoral neck BMD, T-scores, and Z-scores.',
    sections: ['Demographics', 'Indication', 'L1-L4 BMD & T-score', 'Femoral Neck T-score', 'WHO Diagnostic Category', 'Recommendation'],
  },
];

const generateTemplateText = (template) => {
  return `AMERICAN COLLEGE OF RADIOLOGY (ACR) STANDARDIZED TEMPLATE
Exam Modality: ${template.modality}
Template Name: ${template.name}
Compliance Level: ACR 7-Section Practice Parameter Standard

PATIENT DEMOGRAPHICS:
Patient Name: [Last Name, First Name]
MRN: [Medical Record Number]
DOB / Age / Gender: [MM/DD/YYYY / Age / M/F]
Date of Service: [MM/DD/YYYY]
Accession Number: [10-Digit Accession ID]

CLINICAL INDICATION / HISTORY:
[Chief complaint, clinical symptoms, and primary diagnostic question to be evaluated.]

PROCEDURE DETAILS / TECHNIQUE:
[Modality technique details, slice thickness, pulse sequences, IV/Oral contrast agent type and volume.]

COMPARISON STUDY:
[Prior imaging study date and modality, or "None available for comparison."]

FINDINGS:
[Systematic anatomical observations by organ site/region:]
- Organ System / Primary Region: [Detailed description of normal structures and abnormal findings with quantitative measurements.]
- Secondary Regions: [Evaluation of adjacent tissues, lymph nodes, and vascular structures.]

IMPRESSION / CONCLUSION:
1. [Definitive primary diagnostic finding and conclusion.]
2. [Secondary findings and actionable clinical management recommendations.]

REPORTING RADIOLOGIST:
[Radiologist Name, MD / DNB]
Board Certified Radiologist
Date Signed: [MM/DD/YYYY]`;
};

export default function ReportTemplatesPage({ setReportText, setModality, setActivePage }) {
  const [downloadingKey, setDownloadingKey] = useState(null);
  const [previewTemplate, setPreviewTemplate] = useState(null);

  const handleDownload = async (template, format) => {
    const key = `${template.id}_${format}`;
    setDownloadingKey(key);

    const templateText = generateTemplateText(template);
    const filename = `ACR_Template_${template.modality.replace(/\s+/g, '_')}.${format}`;

    try {
      if (format === 'pdf') {
        const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
        
        // Header Banner
        doc.setFillColor(15, 23, 42);
        doc.rect(0, 0, 210, 26, 'F');

        doc.setTextColor(255, 255, 255);
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(14);
        doc.text('ACR STANDARDIZED RADIOLOGY REPORT TEMPLATE', 14, 13);

        doc.setFont('helvetica', 'normal');
        doc.setFontSize(8.5);
        doc.setTextColor(186, 230, 253);
        doc.text(`Modality: ${template.modality} • ${template.name}`, 14, 20);

        doc.setFont('helvetica', 'bold');
        doc.setFontSize(9);
        doc.setTextColor(255, 255, 255);
        doc.text('ACR REFERENCE', 196, 16, { align: 'right' });

        // Body Text Table Container
        autoTable(doc, {
          startY: 32,
          body: [[templateText]],
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

        // Footer
        const pageCount = doc.internal.getNumberOfPages();
        for (let i = 1; i <= pageCount; i++) {
          doc.setPage(i);
          doc.setFont('helvetica', 'normal');
          doc.setFontSize(8);
          doc.setTextColor(100, 116, 139);
          doc.text(`Page ${i} of ${pageCount} • RadAudit Enterprise Template Repository`, 14, 287);
        }

        const pdfBlob = doc.output('blob');
        downloadPdfBlob(pdfBlob, filename);
      } else if (format === 'docx' || format === 'txt') {
        const textBlob = new Blob([templateText], { type: 'text/plain;charset=utf-8' });
        downloadDocxBlob(textBlob, filename);
      }
    } catch (err) {
      alert('Template Download Error: ' + err.message);
    } finally {
      setTimeout(() => setDownloadingKey(null), 400);
    }
  };

  const handleUseTemplateInWorkspace = (template, rawText) => {
    if (setReportText) setReportText(rawText);
    if (setModality) setModality(template.modality);
    if (setActivePage) setActivePage('upload');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* Header */}
      <div>
        <h1 style={{ fontSize: '20px', fontWeight: 800, color: 'var(--text-primary)', margin: 0, letterSpacing: '-0.3px' }}>
          ACR Standardized Report Template Library
        </h1>
        <p style={{ fontSize: '12px', color: 'var(--text-muted)', margin: '3px 0 0' }}>
          Preview and inspect structured reporting templates or download in PDF and text formats
        </p>
      </div>

      <AICautionNotice />

      {/* Grid of Templates */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '16px' }}>
        {TEMPLATES.map((t) => (
          <div key={t.id} className="enterprise-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ fontSize: '10px', fontWeight: 700, padding: '2px 8px', borderRadius: '4px', background: 'var(--surface-muted)', border: '1px solid var(--border)', color: 'var(--text-primary)' }}>
                  {t.modality}
                </span>
                <span style={{ fontSize: '10px', fontWeight: 700, color: '#0284C7', background: 'rgba(2, 132, 199, 0.1)', padding: '1px 6px', borderRadius: '4px', border: '1px solid rgba(2, 132, 199, 0.2)' }}>
                  ACR Reference
                </span>
              </div>

              <h3 style={{ fontSize: '14px', fontWeight: 800, color: 'var(--text-primary)', margin: '0 0 6px' }}>
                {t.name}
              </h3>

              <p style={{ fontSize: '11px', color: 'var(--text-muted)', lineHeight: 1.5, margin: '0 0 12px' }}>
                {t.desc}
              </p>

              <div style={{ marginBottom: '16px' }}>
                <div style={{ fontSize: '10px', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '4px' }}>
                  Includes Sections:
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                  {t.sections.map((s, idx) => (
                    <span key={idx} style={{ fontSize: '10px', color: 'var(--text-secondary)', background: 'var(--surface-muted)', border: '1px solid var(--border)', padding: '1px 6px', borderRadius: '4px' }}>
                      ✓ {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Actions: Replaced Docs with Preview Template */}
            <div style={{ display: 'flex', gap: '8px', paddingTop: '12px', borderTop: '1px solid var(--border)' }}>
              <button
                onClick={() => setPreviewTemplate(t)}
                className="btn-primary"
                style={{ flex: 1, fontSize: '11px', padding: '6px 10px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '5px' }}
              >
                <Eye size={13} /> Preview Template
              </button>
              <button
                onClick={() => handleDownload(t, 'pdf')}
                disabled={downloadingKey === `${t.id}_pdf`}
                className="btn-secondary"
                style={{ flex: 1, fontSize: '11px', padding: '6px 10px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '5px' }}
              >
                <Download size={12} /> PDF
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Render */}
      {previewTemplate && (
        <TemplatePreviewModal
          template={previewTemplate}
          onClose={() => setPreviewTemplate(null)}
          onUseTemplate={setReportText || setModality || setActivePage ? handleUseTemplateInWorkspace : null}
        />
      )}

    </div>
  );
}
