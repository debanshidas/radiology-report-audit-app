"""
utils/pdf_generator.py
----------------------
ReportLab PDF report builder for the Radiology Audit Report.
Generates multi-page high-resolution audit certificates with page numbers,
explicit mathematical deductions, Red Flags, and 11-dimension scoring breakdown.
"""

import io
from datetime import datetime
from reportlab.lib import colors
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import cm
from reportlab.lib.enums import TA_CENTER, TA_LEFT, TA_RIGHT
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle,
    HRFlowable, KeepTogether
)
from reportlab.pdfgen import canvas
from reportlab.lib.colors import HexColor


# ── Brand Colors ──────────────────────────────────────────────────────────────
TEAL      = HexColor("#0d9488")
DARK_NAVY = HexColor("#0f172a")
SLATE     = HexColor("#475569")
LIGHT_BG  = HexColor("#f0fdfa")
RED       = HexColor("#ef4444")
AMBER     = HexColor("#f59e0b")
GREEN     = HexColor("#10b981")
WHITE     = colors.white
LIGHT_GRAY = HexColor("#f1f5f9")
BORDER    = HexColor("#e2e8f0")


class NumberedCanvas(canvas.Canvas):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self._saved_page_states = []

    def showPage(self):
        self._saved_page_states.append(dict(self.__dict__))
        self._startPage()

    def save(self):
        num_pages = len(self._saved_page_states)
        for state in self._saved_page_states:
            self.__dict__.update(state)
            self.draw_page_number(num_pages)
            canvas.Canvas.showPage(self)
        canvas.Canvas.save(self)

    def draw_page_number(self, page_count):
        self.setFont("Helvetica", 8)
        self.setFillColor(HexColor("#64748b"))
        text = f"Page {self._pageNumber} of {page_count}  •  RadAudit AI Enterprise Governance Platform"
        self.drawRightString(20*cm, 1.2*cm, text)


def _styles():
    base = getSampleStyleSheet()
    styles = {
        "title": ParagraphStyle(
            "title", parent=base["Normal"],
            fontName="Helvetica-Bold", fontSize=18,
            textColor=WHITE, alignment=TA_CENTER, spaceAfter=2
        ),
        "subtitle": ParagraphStyle(
            "subtitle", parent=base["Normal"],
            fontName="Helvetica", fontSize=10,
            textColor=HexColor("#94a3b8"), alignment=TA_CENTER, spaceAfter=0
        ),
        "section_heading": ParagraphStyle(
            "section_heading", parent=base["Normal"],
            fontName="Helvetica-Bold", fontSize=12,
            textColor=DARK_NAVY, spaceBefore=12, spaceAfter=4
        ),
        "body": ParagraphStyle(
            "body", parent=base["Normal"],
            fontName="Helvetica", fontSize=9,
            textColor=SLATE, leading=13, spaceAfter=3
        ),
        "body_bold": ParagraphStyle(
            "body_bold", parent=base["Normal"],
            fontName="Helvetica-Bold", fontSize=9,
            textColor=DARK_NAVY, leading=13
        ),
        "small": ParagraphStyle(
            "small", parent=base["Normal"],
            fontName="Helvetica", fontSize=8,
            textColor=SLATE, leading=11
        ),
    }
    return styles


def _section_title(text: str, s):
    return [
        Paragraph(text, s["section_heading"]),
        HRFlowable(width="100%", thickness=1.5, color=TEAL, spaceAfter=6),
    ]


def generate_audit_pdf(
    report_filename: str,
    modality: str,
    audit_result: dict,
    audit_timestamp: datetime = None,
) -> bytes:
    """
    Generates a professional PDF audit report certificate with page numbers and explicit deduction math.
    """
    buf = io.BytesIO()
    doc = SimpleDocTemplate(
        buf,
        pagesize=A4,
        leftMargin=1.5*cm, rightMargin=1.5*cm,
        topMargin=1.5*cm, bottomMargin=1.8*cm,
        title="Radiology Quality Audit Certificate",
        author="RadAudit AI Enterprise Governance Platform",
    )

    s = _styles()
    story = []
    ts = audit_timestamp or datetime.now()
    audit_id = audit_result.get("audit_id", f"RAD-QA-2026-{abs(hash(report_filename)) % 9000 + 1000}")

    # ── HEADER BANNER ────────────────────────────────────────────────────────
    header_table = Table(
        [[
            Paragraph(f"⚕️  RadAudit AI — Radiology Quality Audit Certificate<br/><font size='8' color='#94a3b8'>Audit ID: {audit_id}</font>", s["title"]),
        ]],
        colWidths=[18*cm]
    )
    header_table.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, -1), DARK_NAVY),
        ("TOPPADDING", (0, 0), (-1, -1), 12),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 12),
        ("LEFTPADDING", (0, 0), (-1, -1), 12),
        ("RIGHTPADDING", (0, 0), (-1, -1), 12),
    ]))
    story.append(header_table)
    story.append(Spacer(1, 10))

    # ── METADATA TABLE ────────────────────────────────────────────────────────
    eff_mod = audit_result.get("effective_modality") or modality or "Chest X-Ray"
    meta_data = [
        ["Audit Reference ID", audit_id],
        ["Report Filename", report_filename or "radiology_report.txt"],
        ["Exam Modality", eff_mod],
        ["Audit Timestamp", ts.strftime("%d %B %Y  •  %I:%M %p")],
    ]
    meta_table = Table(meta_data, colWidths=[5*cm, 13*cm])
    meta_table.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (0, -1), LIGHT_BG),
        ("FONTNAME", (0, 0), (0, -1), "Helvetica-Bold"),
        ("FONTSIZE", (0, 0), (-1, -1), 8.5),
        ("TEXTCOLOR", (0, 0), (0, -1), DARK_NAVY),
        ("TEXTCOLOR", (1, 0), (1, -1), SLATE),
        ("ROWBACKGROUNDS", (0, 0), (-1, -1), [WHITE, LIGHT_GRAY]),
        ("GRID", (0, 0), (-1, -1), 0.5, BORDER),
        ("TOPPADDING", (0, 0), (-1, -1), 5),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 5),
        ("LEFTPADDING", (0, 0), (-1, -1), 8),
        ("RIGHTPADDING", (0, 0), (-1, -1), 8),
    ]))
    story.append(meta_table)
    story.append(Spacer(1, 10))

    # ── OVERALL SCORE + STATUS ────────────────────────────────────────────────
    story += _section_title("📊  Overall Quality Assessment", s)
    score = audit_result.get("quality_score", 0)
    status = audit_result.get("readiness_status", "Pending")
    justification = audit_result.get("overall_justification") or ""

    score_color = GREEN if score >= 90 else (AMBER if score >= 70 else RED)

    score_table = Table([
        [
            Paragraph(f'<font size="28" color="{score_color.hexval()}"><b>{score}</b></font><br/><font size="9" color="#64748b">/ 100</font>', ParagraphStyle("sc", alignment=TA_CENTER, fontName="Helvetica-Bold")),
            Table([
                [Paragraph(f'Status Grade: <b><font color="{score_color.hexval()}">{status}</font></b>', ParagraphStyle("st", fontName="Helvetica-Bold", fontSize=10))],
                [Paragraph(justification, s["body"])],
            ], colWidths=[13.5*cm]),
        ]
    ], colWidths=[4.5*cm, 13.5*cm])
    score_table.setStyle(TableStyle([
        ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
        ("GRID", (0, 0), (-1, -1), 0.5, BORDER),
        ("TOPPADDING", (0, 0), (-1, -1), 8),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 8),
        ("LEFTPADDING", (0, 0), (-1, -1), 8),
        ("RIGHTPADDING", (0, 0), (-1, -1), 8),
    ]))
    story.append(score_table)
    story.append(Spacer(1, 10))

    # ── EXPLICIT DEDUCTIONS LOG TABLE ──────────────────────────────────────────
    deductions = audit_result.get("deductions_log", [])
    if deductions:
        story += _section_title("📉  Explicit Mathematical Score Deductions", s)
        ded_rows = [["Deduction", "Deficiency Reason", "Clinical Impact & Suggested Fix"]]
        for d in deductions:
            pts = f"<font color='#dc2626'><b>{d.get('points', 0)} pts</b></font>"
            reason = f"<b>{d.get('section', '')}:</b> {d.get('reason', '')}"
            impact_fix = f"<b>Impact:</b> {d.get('clinical_impact', '')}<br/><font color='#0d9488'><b>Fix:</b> {d.get('suggested_improvement', '')}</font>"
            ded_rows.append([
                Paragraph(pts, ParagraphStyle("p", alignment=TA_CENTER, fontName="Helvetica-Bold")),
                Paragraph(reason, s["body_bold"]),
                Paragraph(impact_fix, s["small"])
            ])
        ded_table = Table(ded_rows, colWidths=[2.5*cm, 6*cm, 9.5*cm])
        ded_table.setStyle(TableStyle([
            ("BACKGROUND", (0, 0), (-1, 0), DARK_NAVY),
            ("TEXTCOLOR", (0, 0), (-1, 0), WHITE),
            ("FONTNAME", (0, 0), (-1, 0), "Helvetica-Bold"),
            ("FONTSIZE", (0, 0), (-1, -1), 8),
            ("ROWBACKGROUNDS", (0, 1), (-1, -1), [WHITE, LIGHT_GRAY]),
            ("GRID", (0, 0), (-1, -1), 0.5, BORDER),
            ("VALIGN", (0, 0), (-1, -1), "TOP"),
            ("TOPPADDING", (0, 0), (-1, -1), 5),
            ("BOTTOMPADDING", (0, 0), (-1, -1), 5),
            ("LEFTPADDING", (0, 0), (-1, -1), 6),
            ("RIGHTPADDING", (0, 0), (-1, -1), 6),
        ]))
        story.append(ded_table)
        story.append(Spacer(1, 10))

    # ── 11-DIMENSIONAL BREAKDOWN ─────────────────────────────────────────────
    dimensions = audit_result.get("dimensions", [])
    if dimensions:
        story += _section_title("📈  11-Dimension Component Score Breakdown", s)
        bd_rows = [["Dimension", "Score", "Weight", "Audit Findings & Notes"]]
        for d in dimensions:
            name = d.get("name", "")
            val = d.get("score", 0)
            mx = d.get("max_marks", 100)
            weight = d.get("weight", "")
            sc_clr = GREEN if val >= mx * 0.9 else (AMBER if val >= mx * 0.6 else RED)
            details_html = "<br/>".join([f"• {x}" for x in d.get("details", [])])

            bd_rows.append([
                Paragraph(f"<b>{name}</b>", s["body_bold"]),
                Paragraph(f'<b><font color="{sc_clr.hexval()}">{val} / {mx}</font></b>', ParagraphStyle("c", fontName="Helvetica-Bold", alignment=TA_CENTER)),
                Paragraph(weight, ParagraphStyle("w", fontName="Helvetica", alignment=TA_CENTER)),
                Paragraph(details_html, s["small"])
            ])

        bd_table = Table(bd_rows, colWidths=[4*cm, 2.2*cm, 1.8*cm, 10*cm])
        bd_table.setStyle(TableStyle([
            ("BACKGROUND", (0, 0), (-1, 0), DARK_NAVY),
            ("TEXTCOLOR", (0, 0), (-1, 0), WHITE),
            ("FONTNAME", (0, 0), (-1, 0), "Helvetica-Bold"),
            ("FONTSIZE", (0, 0), (-1, -1), 8),
            ("ROWBACKGROUNDS", (0, 1), (-1, -1), [WHITE, LIGHT_GRAY]),
            ("GRID", (0, 0), (-1, -1), 0.5, BORDER),
            ("VALIGN", (0, 0), (-1, -1), "TOP"),
            ("TOPPADDING", (0, 0), (-1, -1), 4),
            ("BOTTOMPADDING", (0, 0), (-1, -1), 4),
            ("LEFTPADDING", (0, 0), (-1, -1), 6),
            ("RIGHTPADDING", (0, 0), (-1, -1), 6),
        ]))
        story.append(bd_table)
        story.append(Spacer(1, 10))

    # ── DISCLAIMER ────────────────────────────────────────────────────────────
    disc_text = (
        "<b>Institutional Disclaimer:</b> This Quality Assurance Audit Report is generated using AI-assisted deterministic "
        "rules and language model synthesis for clinical governance and departmental QA tracking only. "
        "It does not constitute a primary diagnostic report or replace radiologist sign-off."
    )
    story.append(Paragraph(disc_text, s["small"]))

    doc.build(story, canvasmaker=NumberedCanvas)
    return buf.getvalue()
