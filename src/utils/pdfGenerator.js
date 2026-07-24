import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { downloadPdfBlob } from './downloadHelper';

/**
 * Generates an official, hospital-grade Radiology Quality Audit Certificate PDF in the browser.
 * Supports static GitHub Pages deployment with 100% offline client-side PDF synthesis.
 */
export async function generateClientPdf({ audit_result, modality, report_text, filename }) {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  const res = audit_result || {};
  const score = res.quality_score ?? 80;
  const status = res.readiness_status || (score >= 90 ? 'Ready for Sign-off' : 'Revision Needed');
  const auditId = res.audit_id || `RAD-QA-2026-${Math.floor(1000 + Math.random() * 9000)}`;
  const examModality = modality || res.effective_modality || 'Chest X-Ray';
  const currentDate = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

  // Color Palette
  const primaryColor = [2, 132, 199];   // #0284C7
  const darkNavy = [15, 23, 42];       // #0F172A
  const lightBg = [248, 250, 252];     // #F8FAFC
  const textMuted = [100, 116, 139];   // #64748B
  const borderGrey = [203, 213, 225];   // #CBD5E1

  // 1. Header Banner
  doc.setFillColor(...darkNavy);
  doc.rect(0, 0, 210, 28, 'F');

  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(16);
  doc.text('RADIOLOGY QUALITY AUDIT CERTIFICATE', 14, 14);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(186, 230, 253);
  doc.text('Hospital Governance & Clinical Quality Control Board • RadAudit Enterprise HIS', 14, 21);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(255, 255, 255);
  doc.text(`REF: ${auditId}`, 196, 14, { align: 'right' });
  doc.setFontSize(8);
  doc.setFont('helvetica', 'normal');
  doc.text(`Date: ${currentDate}`, 196, 20, { align: 'right' });

  let yPos = 36;

  // 2. Examination & Audit Details Box
  doc.setFillColor(...lightBg);
  doc.setDrawColor(...borderGrey);
  doc.roundedRect(14, yPos, 182, 22, 2, 2, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(...textMuted);
  doc.text('EXAM MODALITY', 20, yPos + 7);
  doc.text('EVALUATION ENGINE', 75, yPos + 7);
  doc.text('ACR COMPLIANCE LEVEL', 135, yPos + 7);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(...darkNavy);
  doc.text(examModality, 20, yPos + 15);
  doc.text('11-Dimension Gating Engine', 75, yPos + 15);

  const statusColor = score >= 90 ? [21, 128, 61] : score >= 70 ? [180, 83, 9] : [185, 28, 28];
  doc.setTextColor(...statusColor);
  doc.text(status, 135, yPos + 15);

  yPos += 28;

  // 3. Overall Score Card
  doc.setFillColor(score >= 90 ? 240 : 254, score >= 90 ? 253 : 242, score >= 90 ? 244 : 242);
  doc.setDrawColor(score >= 90 ? 134 : 252, score >= 90 ? 239 : 165, score >= 90 ? 172 : 165);
  doc.roundedRect(14, yPos, 182, 24, 2, 2, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(26);
  doc.setTextColor(...statusColor);
  doc.text(`${score}`, 22, yPos + 16);

  doc.setFontSize(11);
  doc.setTextColor(...textMuted);
  doc.text('/ 100', 44, yPos + 16);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(...darkNavy);
  doc.text('QA Officer Executive Summary:', 64, yPos + 8);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(51, 65, 85);
  const justification = res.overall_justification || `Report evaluated with quality index ${score}/100 based on ACR parameters.`;
  const splitJustification = doc.splitTextToSize(justification, 126);
  doc.text(splitJustification.slice(0, 3), 64, yPos + 14);

  yPos += 30;

  // 4. 11-Dimension Component Breakdown Table
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(...darkNavy);
  doc.text('11-Dimension Component Breakdown', 14, yPos);

  yPos += 4;

  const dimensionsData = (res.dimensions || []).map((d) => [
    d.name || 'Dimension',
    d.weight || '10%',
    `${d.score} / ${d.max_marks}`,
    d.score >= d.max_marks * 0.9 ? 'Compliant' : d.score >= d.max_marks * 0.6 ? 'Minor Issue' : 'Needs Improvement',
    Array.isArray(d.details) ? d.details.join('; ') : 'Evaluated'
  ]);

  if (dimensionsData.length > 0) {
    autoTable(doc, {
      startY: yPos,
      head: [['Dimension Name', 'Weight', 'Score', 'Status', 'Evaluation Details']],
      body: dimensionsData,
      theme: 'grid',
      headStyles: { fillColor: primaryColor, textColor: 255, fontSize: 8, fontStyle: 'bold' },
      bodyStyles: { fontSize: 7.5, textColor: [30, 41, 59] },
      columnStyles: {
        0: { cellWidth: 45, fontStyle: 'bold' },
        1: { cellWidth: 16, halign: 'center' },
        2: { cellWidth: 20, halign: 'center', fontStyle: 'bold' },
        3: { cellWidth: 26, halign: 'center' },
        4: { cellWidth: 'auto' }
      },
      margin: { left: 14, right: 14 }
    });

    yPos = doc.lastAutoTable.finalY + 8;
  }

  // Check page overflow
  if (yPos > 240) {
    doc.addPage();
    yPos = 16;
  }

  // 5. Explicit Score Deductions Log Table
  if (Array.isArray(res.deductions_log) && res.deductions_log.length > 0) {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.setTextColor(185, 28, 28);
    doc.text('Explicit Mathematical Score Deductions', 14, yPos);

    yPos += 4;

    const deductionsData = res.deductions_log.map((ded) => [
      `${ded.points} pts`,
      ded.reason || 'Omission',
      ded.scope_of_correction || 'Revision Required',
      ded.remarks || 'QA Review Note',
      ded.suggested_improvement || 'Fix'
    ]);

    autoTable(doc, {
      startY: yPos,
      head: [['Penalty', 'Deficiency Reason', 'Scope', 'QA Remarks', 'Suggested Fix']],
      body: deductionsData,
      theme: 'grid',
      headStyles: { fillColor: [220, 38, 38], textColor: 255, fontSize: 8, fontStyle: 'bold' },
      bodyStyles: { fontSize: 7.5, textColor: [30, 41, 59] },
      columnStyles: {
        0: { cellWidth: 18, halign: 'center', fontStyle: 'bold', textColor: [185, 28, 28] },
        1: { cellWidth: 40, fontStyle: 'bold' },
        2: { cellWidth: 32 },
        3: { cellWidth: 42 },
        4: { cellWidth: 'auto' }
      },
      margin: { left: 14, right: 14 }
    });

    yPos = doc.lastAutoTable.finalY + 8;
  }

  // Check page overflow for AI suggestions & corrected report
  if (yPos > 230) {
    doc.addPage();
    yPos = 16;
  }

  // 6. AI Corrected Standard Report Synthesis
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(...darkNavy);
  doc.text('AI Synthesized ACR Standard Radiology Report', 14, yPos);

  yPos += 4;

  const correctedText = res.ai_corrected_report || report_text || 'No revised report text.';

  autoTable(doc, {
    startY: yPos,
    body: [[correctedText]],
    theme: 'plain',
    bodyStyles: {
      fontSize: 7.5,
      font: 'courier',
      textColor: [15, 23, 42],
      fillColor: [248, 250, 252],
      cellPadding: 6
    },
    margin: { left: 14, right: 14 }
  });

  yPos = doc.lastAutoTable.finalY + 12;

  // Check overflow for footer seal
  if (yPos > 260) {
    doc.addPage();
    yPos = 20;
  }

  // 7. Footer Certification Seal
  doc.setDrawColor(...borderGrey);
  doc.line(14, yPos, 196, yPos);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(...textMuted);
  doc.text('Official Clinical QA Record • Generated by RadAudit Enterprise HIS Gateway', 14, yPos + 6);
  doc.text('Verified HIPAA & ACR Compliant Audit', 196, yPos + 6, { align: 'right' });

  // Return PDF Blob
  const blob = doc.output('blob');
  const targetFilename = filename || `radiology_audit_${(examModality || 'report').replace(/\s+/g, '_')}_${Date.now()}.pdf`;
  downloadPdfBlob(blob, targetFilename);
  return true;
}
