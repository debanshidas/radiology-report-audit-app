import React, { useState, useCallback } from 'react';
import { Upload, FileText, Trash2, Play, Sparkles, CheckCircle2, RefreshCw, File, BookOpen, Shuffle, AlertCircle } from 'lucide-react';
import AICautionNotice from '../components/AICautionNotice';
import DemoLibraryModal from '../components/DemoLibraryModal';
import { DEMO_REPORTS } from '../data/demoReports';

const SECTION_OPTIONS = [
  'Patient Demographics',
  'Clinical Indication / History',
  'Procedure Details / Contrast Agent Details',
  'Comparison Study',
  'Findings',
  'Impression / Conclusion',
  'Reporting Radiologist Signature'
];

export default function UploadPage({
  reportText, setReportText,
  modality, setModality,
  mandatorySections, setMandatorySections,
  onStartAudit, isLoading
}) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileSize, setFileSize] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');
  const [detectionConfidence, setDetectionConfidence] = useState(95);

  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);
  const [activeDemoCase, setActiveDemoCase] = useState(null);

  // Automatic Modality Detection Hook
  React.useEffect(() => {
    if (!reportText || !reportText.trim()) return;
    const txt = reportText.toLowerCase();

    if (/flair|brain|intracranial|cerebral|head mri/i.test(txt)) {
      setModality('Brain MRI'); setDetectionConfidence(98);
    } else if (/lumbar|cervical|spine|l4-l5|l5-s1/i.test(txt)) {
      setModality('Spine MRI'); setDetectionConfidence(95);
    } else if (/appendic|abdomen|pelvis|liver|spleen|pancreas|gallbladder/i.test(txt)) {
      setModality('Abdomen CT'); setDetectionConfidence(95);
    } else if (/chest x-ray|chest radiograph|cxr|lungs|cardiomediastinal|pa and lateral/i.test(txt)) {
      setModality('Chest X-Ray'); setDetectionConfidence(92);
    } else if (/ultrasound|sonogram|echogenicity|gallbladder wall/i.test(txt)) {
      setModality('Ultrasound'); setDetectionConfidence(90);
    } else if (/mammogram|breast|bi-rads|tomosynthesis/i.test(txt)) {
      setModality('Mammography'); setDetectionConfidence(95);
    } else if (/pet-ct|fdg|suvmax|positron/i.test(txt)) {
      setModality('PET-CT'); setDetectionConfidence(95);
    } else if (/dexa|t-score|bone mineral density/i.test(txt)) {
      setModality('DEXA Scan'); setDetectionConfidence(95);
    }
  }, [reportText, setModality]);

  const charCount = reportText.length;
  const wordCount = reportText.trim() ? reportText.trim().split(/\s+/).length : 0;

  const uploadFile = useCallback(async (file) => {
    setIsUploading(true);
    setUploadError('');

    try {
      const formData = new FormData();
      formData.append('file', file);
      const response = await fetch('/api/upload', { method: 'POST', body: formData });
      const data = await response.json();

      if (!response.ok || !data.text) {
        throw new Error(data.error || 'The report text could not be extracted.');
      }

      setSelectedFile(data.filename || file.name);
      setFileSize((file.size / 1024).toFixed(1) + ' KB');
      setReportText(data.text);
      setActiveDemoCase(null);
    } catch (error) {
      setSelectedFile(null);
      setFileSize(null);
      setUploadError(error.message || 'The report could not be uploaded.');
    } finally {
      setIsUploading(false);
    }
  }, [setReportText]);

  const handleDrop = useCallback((e) => {
    e.preventDefault(); setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) uploadFile(file);
  }, [uploadFile]);

  const handleSelectDemoReport = (demoCase) => {
    setReportText(demoCase.reportText);
    setModality(demoCase.modality);
    setActiveDemoCase(demoCase);
    setSelectedFile(null);
  };

  const handleRandomizeDemo = () => {
    const randomCase = DEMO_REPORTS[Math.floor(Math.random() * DEMO_REPORTS.length)];
    handleSelectDemoReport(randomCase);
  };

  const toggleSection = (sec) => {
    if (mandatorySections.includes(sec)) setMandatorySections(mandatorySections.filter(s => s !== sec));
    else setMandatorySections([...mandatorySections, sec]);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* Header */}
      <div>
        <h1 style={{ fontSize: '20px', fontWeight: 800, color: 'var(--text-primary)', margin: 0, letterSpacing: '-0.3px' }}>
          New Clinical Audit Workspace
        </h1>
        <p style={{ fontSize: '12px', color: 'var(--text-muted)', margin: '3px 0 0' }}>
          Upload a radiology report file (PDF/DOCX/TXT) or select from our 35+ Enterprise Demo Library cases
        </p>
      </div>

      <AICautionNotice />

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '24px', alignItems: 'start' }}>
        
        {/* Left Column: File Dropzone, Demo Library & Editor */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          
          {/* Upload Area: Pre or Post state */}
          {!selectedFile ? (
            <div
              onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={handleDrop}
              style={{
                background: isDragging ? 'var(--surface-muted)' : 'var(--surface)',
                border: `2px dashed ${isDragging ? '#0284C7' : 'var(--border)'}`,
                borderRadius: '8px', padding: '24px', textAlign: 'center',
                transition: 'all 0.15s'
              }}
            >
              <Upload size={28} color="#0284C7" style={{ marginBottom: '8px' }} />
              <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)' }}>
                Drag and drop report file here, or browse
              </div>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)', margin: '4px 0 14px' }}>
                Supported Formats: PDF, DOCX, TXT • Maximum File Size: 10 MB
              </div>
              <label className="btn-primary" style={{ display: 'inline-flex', cursor: 'pointer' }}>
                <span>Choose File</span>
                <input
                  type="file"
                  accept=".pdf,.docx,.txt"
                  style={{ display: 'none' }}
                  onChange={(e) => { if (e.target.files[0]) uploadFile(e.target.files[0]); }}
                />
              </label>
            </div>
          ) : (
            <div className="enterprise-card" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#F0FDF4', border: '1px solid #BBF7D0' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '6px', background: '#16A34A', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <CheckCircle2 size={18} />
                </div>
                <div>
                  <div style={{ fontSize: '13px', fontWeight: 700, color: '#14532D' }}>
                    {selectedFile}
                  </div>
                  <div style={{ fontSize: '11px', color: '#15803D' }}>
                    Successfully uploaded ({fileSize || 'Text Extracted'})
                  </div>
                </div>
              </div>
              <button
                onClick={() => { setSelectedFile(null); setFileSize(null); setReportText(''); setActiveDemoCase(null); }}
                className="btn-outline" style={{ fontSize: '11px', padding: '4px 10px', background: '#fff' }}
              >
                <RefreshCw size={12} /> Replace File
              </button>
            </div>
          )}

          {/* Enterprise Demo Library Control Bar */}
          <div className="enterprise-card" style={{ padding: '14px 18px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'var(--surface-muted)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <BookOpen size={18} color="#0284C7" />
              <div>
                <div style={{ fontSize: '13px', fontWeight: 800, color: 'var(--text-primary)' }}>
                  Enterprise Demo Case Library
                </div>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                  35+ pre-loaded hospital cases across 25 modalities
                </div>
              </div>
            </div>
            
            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                onClick={handleRandomizeDemo}
                className="btn-secondary"
                style={{ fontSize: '12px', padding: '6px 12px', background: '#F0FDF4', color: '#16A34A', borderColor: '#BBF7D0' }}
              >
                <Shuffle size={13} /> Surprise Me
              </button>
              <button
                onClick={() => setIsDemoModalOpen(true)}
                className="btn-primary"
                style={{ fontSize: '12px', padding: '6px 14px' }}
              >
                <BookOpen size={13} /> Browse 35+ Cases →
              </button>
            </div>
          </div>

          {/* Active Demo Case Info Banner */}
          {activeDemoCase && (
            <div style={{ padding: '12px 16px', background: '#F0F9FF', border: '1px solid #BAE6FD', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Sparkles size={16} color="#0284C7" />
                <span style={{ fontSize: '12px', fontWeight: 700, color: '#0369A1' }}>
                  Loaded Demo Case: "{activeDemoCase.title}" ({activeDemoCase.modality})
                </span>
              </div>
              <span style={{ fontSize: '11px', fontWeight: 800, padding: '2px 8px', borderRadius: '4px', background: '#0284C7', color: '#FFF' }}>
                Expected Score: {activeDemoCase.expectedScore}/100 ({activeDemoCase.qualityLevel})
              </span>
            </div>
          )}

          {/* Text Editor */}
          <div className="enterprise-card" style={{ padding: '0', overflow: 'hidden' }}>
            <div style={{
              background: 'var(--surface-muted)', borderBottom: '1px solid var(--border)',
              padding: '10px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between'
            }}>
              <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-primary)' }}>
                Clinical Report Text Editor
              </span>
              <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                {charCount} characters • {wordCount} words
              </span>
            </div>
            
            <textarea
              rows={16}
              value={reportText}
              onChange={(e) => { setReportText(e.target.value); setActiveDemoCase(null); }}
              placeholder="Paste radiology report text here or select a case from the Enterprise Demo Library above..."
              style={{
                width: '100%', padding: '16px', border: 'none', resize: 'vertical',
                fontFamily: 'monospace', fontSize: '12px', lineHeight: 1.6,
                background: 'var(--surface)', color: 'var(--text-primary)', outline: 'none'
              }}
            />
          </div>

        </div>

        {/* Right Column: Parameters & Launch Button */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          
          <div className="enterprise-card" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <h3 style={{ fontSize: '14px', fontWeight: 800, color: 'var(--text-primary)', margin: 0, borderBottom: '1px solid var(--border)', paddingBottom: '10px' }}>
              Audit Configuration
            </h3>

            {/* Modality Selector */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                  Target Exam Modality
                </span>
                <span style={{ fontSize: '10px', fontWeight: 700, color: '#16A34A', background: '#DCFCE7', padding: '2px 6px', borderRadius: '4px' }}>
                  ✨ Auto-Detected ({detectionConfidence}%)
                </span>
              </div>
              
              <select
                value={modality}
                onChange={(e) => setModality(e.target.value)}
                style={{
                  width: '100%', padding: '8px 12px', borderRadius: '6px',
                  border: '1px solid var(--border)', background: 'var(--surface-muted)',
                  fontSize: '12px', fontWeight: 600, color: 'var(--text-primary)', outline: 'none'
                }}
              >
                {['Chest X-Ray', 'Abdomen X-Ray', 'Skull X-Ray', 'Spine X-Ray', 'Knee X-Ray', 'Shoulder X-Ray', 'Pelvis X-Ray', 'CT Brain', 'CT Chest', 'CT Abdomen', 'CT Spine', 'MRI Brain', 'MRI Spine', 'MRI Knee', 'MRI Shoulder', 'MRI Abdomen', 'Ultrasound', 'Ultrasound Abdomen', 'Ultrasound Pelvis', 'Ultrasound Obstetrics', 'Thyroid Ultrasound', 'Doppler Study', 'Mammography', 'HRCT Chest', 'CT Angiography', 'MR Angiography', 'PET-CT', 'Fluoroscopy', 'DEXA Scan'].map(m => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </select>
            </div>

            {/* Mandatory Sections Checkboxes */}
            <div>
              <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '8px' }}>
                Mandatory ACR Audit Sections
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {SECTION_OPTIONS.map((sec) => (
                  <label key={sec} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: 'var(--text-secondary)', cursor: 'pointer' }}>
                    <input
                      type="checkbox"
                      checked={mandatorySections.includes(sec)}
                      onChange={() => toggleSection(sec)}
                      style={{ borderRadius: '4px', accentColor: '#0284C7' }}
                    />
                    <span>{sec}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Run Analysis Button */}
            <button
              onClick={onStartAudit}
              disabled={isLoading || !reportText.trim()}
              className="btn-primary"
              style={{
                width: '100%', padding: '12px', fontSize: '13px', fontWeight: 800,
                justifyContent: 'center', marginTop: '8px',
                opacity: (isLoading || !reportText.trim()) ? 0.6 : 1,
                cursor: (isLoading || !reportText.trim()) ? 'not-allowed' : 'pointer'
              }}
            >
              {isLoading ? (
                <>Analyzing Report Engine...</>
              ) : (
                <>Run QA Audit & Evaluation →</>
              )}
            </button>
          </div>

        </div>

      </div>

      {/* Demo Report Library Modal */}
      <DemoLibraryModal
        isOpen={isDemoModalOpen}
        onClose={() => setIsDemoModalOpen(false)}
        onSelectReport={handleSelectDemoReport}
      />

    </div>
  );
}
