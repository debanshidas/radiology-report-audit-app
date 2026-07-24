import React, { useState, useCallback } from 'react';
import { Upload, FileText, Trash2, Play, Sparkles, CheckCircle2, RefreshCw, File, BookOpen, Shuffle, AlertCircle, ArrowLeft } from 'lucide-react';
import AICautionNotice from '../components/AICautionNotice';
import DemoLibraryModal from '../components/DemoLibraryModal';
import { apiFetch } from '../utils/apiClient';
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
  onStartAudit, isLoading,
  onBackToWelcome
}) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileSize, setFileSize] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');
  const [detectionConfidence, setDetectionConfidence] = useState(95);

  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);
  const [activeDemoCase, setActiveDemoCase] = useState(null);

  const charCount = reportText.length;
  const wordCount = reportText.trim() ? reportText.trim().split(/\s+/).length : 0;

  const uploadFile = useCallback(async (file) => {
    setIsUploading(true);
    setUploadError('');

    try {
      const formData = new FormData();
      formData.append('file', file);
      const response = await apiFetch('/api/upload', { method: 'POST', body: formData });
      const data = await response.json();

      if (!response.ok || !data.text) {
        throw new Error(data.error || 'The report text could not be extracted.');
      }

      setReportText(data.text);
      setSelectedFile(file);
      setFileSize(data.filesize_kb ? `${data.filesize_kb} KB` : `${(file.size / 1024).toFixed(1)} KB`);
      if (data.detected_modality) setModality(data.detected_modality);
      if (data.detection_confidence) setDetectionConfidence(data.detection_confidence);
    } catch (err) {
      setUploadError(err.message || 'Error processing file. Please paste report text directly.');
    } finally {
      setIsUploading(false);
    }
  }, [setReportText, setModality]);

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer?.files?.[0];
    if (file) uploadFile(file);
  };

  const handleFileSelect = (e) => {
    const file = e.target.files?.[0];
    if (file) uploadFile(file);
  };

  const toggleSection = (sec) => {
    if (mandatorySections.includes(sec)) {
      setMandatorySections(mandatorySections.filter((s) => s !== sec));
    } else {
      setMandatorySections([...mandatorySections, sec]);
    }
  };

  const handleSelectDemoCase = (demoCase) => {
    setReportText(demoCase.reportText);
    setModality(demoCase.modality);
    setActiveDemoCase(demoCase);
    setSelectedFile({ name: `${demoCase.title}.txt` });
    setFileSize('Demo Case');
  };

  const handleRandomizeDemo = () => {
    const randomIndex = Math.floor(Math.random() * DEMO_REPORTS.length);
    handleSelectDemoCase(DEMO_REPORTS[randomIndex]);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* Header */}
      <div>
        {onBackToWelcome && (
          <button
            onClick={onBackToWelcome}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 14px',
              fontSize: '11.5px',
              borderRadius: '20px',
              background: '#FFFFFF',
              cursor: 'pointer',
              border: '1px solid #CBD5E1',
              color: '#1977CC',
              fontWeight: 700,
              marginBottom: '14px',
              boxShadow: '0 2px 5px rgba(0,0,0,0.04)',
              transition: 'all 0.2s ease',
              fontFamily: "'Poppins', sans-serif"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#EBF5FF';
              e.currentTarget.style.borderColor = '#1977CC';
              e.currentTarget.style.transform = 'translateX(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = '#FFFFFF';
              e.currentTarget.style.borderColor = '#CBD5E1';
              e.currentTarget.style.transform = 'translateX(0)';
            }}
          >
            <ArrowLeft size={13} /> Back to Welcome
          </button>
        )}
        <h1 style={{ fontSize: '20px', fontWeight: 800, color: 'var(--text-primary)', margin: 0, letterSpacing: '-0.3px' }}>
          Upload Radiology Report for Clinical Audit
        </h1>
        <p style={{ fontSize: '12px', color: 'var(--text-muted)', margin: '3px 0 0' }}>
          Ingest clinical report text, configure modality parameters, and trigger sub-second 11-dimension ACR quality evaluation
        </p>
      </div>

      <AICautionNotice />

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '24px' }}>
        
        {/* Left Main Column: File Upload & Text Editor */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          {/* File Drag-and-Drop Area */}
          {!selectedFile ? (
            <div
              onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={handleDrop}
              style={{
                border: `2px dashed ${isDragging ? '#1977CC' : '#CBD5E1'}`,
                borderRadius: '8px',
                background: isDragging ? '#EBF5FF' : 'var(--surface)',
                padding: '32px 24px',
                textAlign: 'center',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              <input
                type="file"
                id="fileInput"
                accept=".txt,.docx,.pdf"
                onChange={handleFileSelect}
                style={{ display: 'none' }}
              />
              <label htmlFor="fileInput" style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#F1F7FC', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Upload size={22} color="#1977CC" />
                </div>
                <div>
                  <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-primary)' }}>
                    {isUploading ? 'Extracting report text...' : 'Drag & drop clinical report file here'}
                  </div>
                  <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '3px' }}>
                    Supports <strong>PDF, DOCX, TXT</strong> files (max 10MB) or paste directly below
                  </div>
                </div>
              </label>
              {uploadError && (
                <div style={{ color: '#D32F2F', fontSize: '12px', marginTop: '10px', fontWeight: 600 }}>
                  ⚠️ {uploadError}
                </div>
              )}
            </div>
          ) : (
            <div className="medicare-card" style={{ padding: '14px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#E8F8F8', border: '1px solid #99F6E4' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <FileText size={20} color="#3FBBC0" />
                <div>
                  <div style={{ fontSize: '13px', fontWeight: 700, color: '#2C4964' }}>
                    {selectedFile.name}
                  </div>
                  <div style={{ fontSize: '11px', color: '#6C757D' }}>
                    Successfully loaded ({fileSize || 'Text Ready'})
                  </div>
                </div>
              </div>
              <button
                onClick={() => { setSelectedFile(null); setFileSize(null); setReportText(''); setActiveDemoCase(null); }}
                className="btn-medicare-outline" style={{ fontSize: '11px', padding: '4px 10px', background: '#FFF' }}
              >
                <RefreshCw size={12} /> Clear / Replace File
              </button>
            </div>
          )}

          {/* MediCare 50-Case Demo Library Banner */}
          <div className="medicare-card" style={{ padding: '16px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#F1F7FC', border: '1px solid #DDE7F0' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ width: '38px', height: '38px', borderRadius: '8px', background: '#1977CC', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <BookOpen size={20} color="#FFFFFF" />
              </div>
              <div>
                <div style={{ fontSize: '13.5px', fontWeight: 800, color: '#2C4964' }}>
                  Enterprise Hospital Demo Library (50 Cases)
                </div>
                <div style={{ fontSize: '11.5px', color: '#6C757D' }}>
                  Select pre-loaded cases across 25 modalities and 5 quality tiers (Excellent to Critical)
                </div>
              </div>
            </div>
            
            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                onClick={handleRandomizeDemo}
                className="btn-medicare-teal"
                style={{ fontSize: '12px', padding: '7px 14px' }}
              >
                <Shuffle size={13} /> Surprise Me
              </button>
              <button
                onClick={() => setIsDemoModalOpen(true)}
                className="btn-medicare-primary"
                style={{ fontSize: '12px', padding: '7px 16px' }}
              >
                <BookOpen size={13} /> Browse 50 Cases →
              </button>
            </div>
          </div>

          {/* Loaded Demo Case Banner */}
          {activeDemoCase && (
            <div style={{ padding: '12px 16px', background: '#EBF5FF', border: '1px solid #BAE6FD', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Sparkles size={16} color="#1977CC" />
                <span style={{ fontSize: '12.5px', fontWeight: 700, color: '#2C4964' }}>
                  Active Case: "{activeDemoCase.title}" ({activeDemoCase.modality})
                </span>
              </div>
              <span style={{ fontSize: '11px', fontWeight: 800, padding: '3px 10px', borderRadius: '4px', background: '#1977CC', color: '#FFFFFF' }}>
                Tier: {activeDemoCase.qualityLevel} ({activeDemoCase.expectedScore}/100)
              </span>
            </div>
          )}

          {/* Text Editor */}
          <div className="medicare-card" style={{ padding: '0', overflow: 'hidden' }}>
            <div style={{
              background: '#F1F7FC', borderBottom: '1px solid #DDE7F0',
              padding: '12px 18px', display: 'flex', alignItems: 'center', justifyContent: 'space-between'
            }}>
              <span style={{ fontSize: '13px', fontWeight: 700, color: '#2C4964' }}>
                Clinical Radiology Report Editor
              </span>
              <span style={{ fontSize: '11.5px', color: '#6C757D', fontWeight: 600 }}>
                {charCount} chars • {wordCount} words
              </span>
            </div>

            <textarea
              value={reportText}
              onChange={(e) => setReportText(e.target.value)}
              placeholder="Paste complete radiology report text here (including Patient Demographics, History, Technique, Findings, and Impression)..."
              style={{
                width: '100%', minHeight: '320px', padding: '16px',
                border: 'none', resize: 'vertical', fontFamily: 'monospace',
                fontSize: '12.5px', lineHeight: 1.6, background: 'var(--surface)',
                color: 'var(--text-primary)', outline: 'none'
              }}
            />

            {reportText && (
              <div style={{ padding: '10px 16px', background: 'var(--surface-muted)', borderTop: '1px solid var(--border)', display: 'flex', justifyContent: 'flex-end' }}>
                <button
                  onClick={() => { setReportText(''); setActiveDemoCase(null); setSelectedFile(null); }}
                  className="btn-destructive"
                >
                  <Trash2 size={12} /> Clear Text
                </button>
              </div>
            )}
          </div>

          {/* Big Action CTA Button */}
          <button
            onClick={onStartAudit}
            disabled={!reportText.trim() || isLoading}
            className="btn-medicare-primary"
            style={{
              width: '100%', padding: '14px', fontSize: '15px', fontWeight: 800,
              justifyContent: 'center', borderRadius: '8px', opacity: (!reportText.trim() || isLoading) ? 0.6 : 1
            }}
          >
            {isLoading ? (
              <>
                <RefreshCw size={18} className="animate-spin" /> Evaluating 11 ACR Quality Dimensions...
              </>
            ) : (
              <>
                <Play size={18} /> Run Sub-Second AI Quality Audit →
              </>
            )}
          </button>

        </div>

        {/* Right Column: Parameters & Mandatory Sections */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          {/* Modality Selector */}
          <div className="medicare-card" style={{ padding: '18px' }}>
            <label style={{ fontSize: '12px', fontWeight: 800, color: '#2C4964', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>
              Target Imaging Modality
            </label>
            <select
              value={modality}
              onChange={(e) => setModality(e.target.value)}
              style={{
                width: '100%', padding: '10px', borderRadius: '6px',
                border: '1px solid #CBD5E1', fontSize: '13px', fontWeight: 600,
                color: '#2C4964', background: '#FFFFFF', outline: 'none'
              }}
            >
              {[
                'Chest X-Ray', 'Abdomen X-Ray', 'Skull X-Ray', 'Spine X-Ray', 'Knee X-Ray', 'Shoulder X-Ray', 'Pelvis X-Ray',
                'CT Brain', 'CT Chest', 'CT Abdomen', 'CT Spine', 'CT Angiography', 'HRCT Chest',
                'MRI Brain', 'MRI Spine', 'MRI Knee', 'MRI Shoulder', 'MRI Abdomen', 'MR Angiography',
                'Ultrasound Abdomen', 'Ultrasound Pelvis', 'Ultrasound Obstetrics', 'Thyroid Ultrasound', 'Doppler Study',
                'Mammography'
              ].map((m) => (
                <option key={m} value={m}>{m}</option>
              ))}
            </select>

            <div style={{ fontSize: '11px', color: '#6C757D', marginTop: '8px', lineHeight: 1.4 }}>
              Determines modality-specific ACR practice parameters and required technique parameters.
            </div>
          </div>

          {/* Mandatory ACR Sections Checkbox List */}
          <div className="medicare-card" style={{ padding: '18px' }}>
            <div style={{ fontSize: '12px', fontWeight: 800, color: '#2C4964', textTransform: 'uppercase', marginBottom: '12px' }}>
              Mandatory ACR Report Sections
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {SECTION_OPTIONS.map((sec) => {
                const isChecked = mandatorySections.includes(sec);
                return (
                  <label key={sec} style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '12px', color: '#2C4964', fontWeight: isChecked ? 600 : 400 }}>
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => toggleSection(sec)}
                      style={{ accentColor: '#1977CC', width: '15px', height: '15px', cursor: 'pointer' }}
                    />
                    <span>{sec}</span>
                  </label>
                );
              })}
            </div>
          </div>

        </div>

      </div>

      <DemoLibraryModal
        isOpen={isDemoModalOpen}
        onClose={() => setIsDemoModalOpen(false)}
        onSelectReport={handleSelectDemoCase}
        onSelectDemo={handleSelectDemoCase}
      />

    </div>
  );
}
