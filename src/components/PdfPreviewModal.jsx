import React, { useState, useEffect } from 'react';
import { Download, X, Eye, FileText, Loader2 } from 'lucide-react';
import { apiFetch } from '../utils/apiClient';
import { downloadPdfBlob } from '../utils/downloadHelper';

export default function PdfPreviewModal({ isOpen, onClose, auditResult, modality, filename = 'radiology_report.txt' }) {
  const [pdfUrl, setPdfUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [pdfBlob, setPdfBlob] = useState(null);

  useEffect(() => {
    if (isOpen && auditResult) {
      fetchPdf();
    } else {
      if (pdfUrl) URL.revokeObjectURL(pdfUrl);
      setPdfUrl(null);
      setPdfBlob(null);
    }
  }, [isOpen, auditResult]);

  const fetchPdf = async () => {
    setIsLoading(true);
    try {
      const resp = await apiFetch('/api/generate-pdf', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          filename,
          modality: modality || auditResult?.effective_modality || 'Chest X-Ray',
          audit_result: auditResult
        })
      });
      if (!resp.ok) throw new Error('PDF generation failed');
      const blob = await resp.blob();
      setPdfBlob(blob);
      const url = URL.createObjectURL(blob);
      setPdfUrl(url);
    } catch (e) {
      alert('Error previewing PDF: ' + e.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownload = () => {
    if (!pdfBlob) return;
    const fn = `radiology_audit_${(modality || auditResult?.effective_modality || 'report').replace(/\s+/g, '_')}_${Date.now()}.pdf`;
    downloadPdfBlob(pdfBlob, fn);
  };

  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      background: 'rgba(15, 23, 42, 0.75)', backdropFilter: 'blur(4px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      zIndex: 1200, padding: '24px'
    }}>
      <div style={{
        background: 'var(--surface)', width: '100%', maxWidth: '900px',
        height: '90vh', borderRadius: '8px', border: '1px solid var(--border)',
        display: 'flex', flexDirection: 'column', overflow: 'hidden'
      }}>
        {/* Modal Header */}
        <div style={{
          padding: '14px 20px', borderBottom: '1px solid var(--border)',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          background: 'var(--surface-muted)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <FileText size={18} color="#0284C7" />
            <h3 style={{ fontSize: '14px', fontWeight: 800, margin: 0, color: 'var(--text-primary)' }}>
              PDF Certificate Preview — {auditResult?.audit_id || 'RAD-QA-2026'}
            </h3>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button
              onClick={handleDownload}
              disabled={!pdfBlob || isLoading}
              className="btn-primary"
              style={{ fontSize: '12px', padding: '6px 12px' }}
            >
              <Download size={13} /> Download PDF
            </button>
            <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}>
              <X size={18} />
            </button>
          </div>
        </div>

        {/* PDF Viewer Body */}
        <div style={{ flex: 1, background: '#0F172A', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {isLoading ? (
            <div style={{ textAlign: 'center', color: '#FFF' }}>
              <Loader2 size={32} color="#38BDF8" className="animate-spin" style={{ marginBottom: '8px' }} />
              <div style={{ fontSize: '13px', fontWeight: 600 }}>Generating PDF Certificate Preview...</div>
            </div>
          ) : pdfUrl ? (
            <iframe
              src={pdfUrl}
              title="PDF Certificate Preview"
              style={{ width: '100%', height: '100%', border: 'none' }}
            />
          ) : (
            <div style={{ color: '#F87171', fontSize: '13px' }}>Failed to render PDF preview.</div>
          )}
        </div>
      </div>
    </div>
  );
}
