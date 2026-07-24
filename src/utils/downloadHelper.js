/**
 * Robust Cross-Browser File Download Utilities
 */

export function downloadPdfBlob(blobData, filename = 'radiology_audit_report.pdf') {
  try {
    const blob = new Blob([blobData], { type: 'application/pdf' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.style.display = 'none';
    link.href = url;
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    setTimeout(() => {
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    }, 300);
  } catch (err) {
    console.error('Blob download failed, attempting direct link fallback:', err);
    window.location.href = `/api/download-pdf?filename=${encodeURIComponent(filename)}`;
  }
}

export function downloadDocxBlob(blobData, filename = 'radiology_template.docx') {
  try {
    const blob = new Blob([blobData], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.style.display = 'none';
    link.href = url;
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    setTimeout(() => {
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    }, 300);
  } catch (err) {
    console.error('Docx blob download failed:', err);
  }
}

export function downloadUrlDirect(url) {
  const link = document.createElement('a');
  link.style.display = 'none';
  link.href = url;
  document.body.appendChild(link);
  link.click();
  setTimeout(() => {
    document.body.removeChild(link);
  }, 300);
}
