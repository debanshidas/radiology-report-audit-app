import React, { useState } from 'react';
import { FileText, Download, Check, FileCode, ShieldCheck } from 'lucide-react';
import AICautionNotice from '../components/AICautionNotice';

const TEMPLATES = [
  {
    id: 'chest_xray',
    name: 'Chest X-Ray (PA & Lateral)',
    modality: 'Chest X-Ray',
    desc: 'Standard ACR practice parameter template for frontal and lateral chest radiographs evaluating cardiopulmonary structures.',
    sections: ['Patient Demographics', 'Clinical Indication', 'Procedure Details', 'Comparison', 'Findings', 'Impression', 'Signature'],
  },
  {
    id: 'brain_mri',
    name: 'Brain MRI (Multisequence)',
    modality: 'Brain MRI',
    desc: 'High-field MRI protocol template with FLAIR, DWI, T1, and T2 sequences for evaluating neurological and ischemic pathology.',
    sections: ['Demographics', 'Indication', 'Technique / Contrast', 'Comparison', 'Parenchyma & Ventricles', 'Impression', 'Signature'],
  },
  {
    id: 'abdomen_ct',
    name: 'Abdomen & Pelvis CT',
    modality: 'Abdomen CT',
    desc: 'Contrast-enhanced CT template evaluating solid organs, bowel loops, appendix, vasculature, and retroperitoneum.',
    sections: ['Demographics', 'Indication', 'Contrast Protocol', 'Comparison', 'Organ-System Findings', 'Impression', 'Signature'],
  },
  {
    id: 'spine_mri',
    name: 'Lumbar / Cervical Spine MRI',
    modality: 'Spine MRI',
    desc: 'Detailed spinal imaging template evaluating vertebral alignment, disc spaces, neural foramina, and nerve root compression.',
    sections: ['Demographics', 'Indication', 'Sequences', 'Alignment & Marrow', 'Level-by-Level Discs', 'Impression', 'Signature'],
  },
  {
    id: 'ultrasound',
    name: 'Abdominal / Pelvic Ultrasound',
    modality: 'Ultrasound',
    desc: 'Sonographic reporting template for gallbladder, liver, pancreas, kidneys, and pelvic structures with Doppler findings.',
    sections: ['Demographics', 'Indication', 'Transducer Protocol', 'Gallbladder & Liver', 'Impression', 'Signature'],
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

export default function ReportTemplatesPage() {
  const [downloadingKey, setDownloadingKey] = useState(null);

  const handleDownload = (template, format) => {
    const url = `/api/download-template?modality=${encodeURIComponent(template.modality)}&format=${format}`;
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `ACR_Template_${template.modality.replace(/\s+/g, '_')}.${format}`);
    document.body.appendChild(link);
    link.click();
    setTimeout(() => {
      document.body.removeChild(link);
    }, 200);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* Header */}
      <div>
        <h1 style={{ fontSize: '20px', fontWeight: 800, color: 'var(--text-primary)', margin: 0, letterSpacing: '-0.3px' }}>
          ACR Standardized Report Template Library
        </h1>
        <p style={{ fontSize: '12px', color: 'var(--text-muted)', margin: '3px 0 0' }}>
          Download ACR & RadLex compliant radiology reporting templates for clinical documentation
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
                <span style={{ fontSize: '10px', fontWeight: 700, color: '#16A34A', background: '#DCFCE7', padding: '1px 6px', borderRadius: '4px' }}>
                  ACR Compliant
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

            {/* Actions */}
            <div style={{ display: 'flex', gap: '8px', paddingTop: '12px', borderTop: '1px solid var(--border)' }}>
              <button
                onClick={() => handleDownload(t, 'docx')}
                disabled={downloadingKey === `${t.id}_docx`}
                className="btn-primary" style={{ flex: 1, fontSize: '11px', padding: '6px 10px' }}
              >
                <Download size={12} /> DOCX
              </button>
              <button
                onClick={() => handleDownload(t, 'pdf')}
                disabled={downloadingKey === `${t.id}_pdf`}
                className="btn-secondary" style={{ flex: 1, fontSize: '11px', padding: '6px 10px' }}
              >
                <Download size={12} /> PDF
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
