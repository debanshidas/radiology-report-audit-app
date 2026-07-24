/**
 * Enterprise Radiology Demo Report Library
 * 50 Authentic Hospital Radiology Reports across 25 Modalities and 5 Quality Tiers
 */

export const DEMO_REPORTS = [
  // ── 1. CHEST X-RAY ────────────────────────────────────────────────────────
  {
    id: 'cxr_01',
    title: 'Routine Pre-Op Chest X-Ray',
    category: 'X-Ray',
    modality: 'Chest X-Ray',
    qualityLevel: 'Excellent',
    expectedScore: 98,
    difficulty: 'Easy',
    description: 'Flawless ACR-compliant 7-section structured report for preoperative evaluation.',
    flaws: ['None — Full compliance'],
    reportText: `PATIENT DEMOGRAPHICS:
Patient Name: Johnathan Miller
MRN: 89412053
Exam Date: 2026-07-24
DOB: 1971-04-12 (Male)

CLINICAL INDICATION:
55-year-old male scheduled for elective laparoscopic cholecystectomy. Preoperative pulmonary evaluation. No acute respiratory symptoms.

PROCEDURE DETAILS:
PA and lateral chest radiographs were performed in upright position.

COMPARISON:
Chest radiograph dated 2024-11-15.

FINDINGS:
Lungs: Lungs are clear bilaterally. No focal consolidation, pneumothorax, or pleural effusion.
Cardiomediastinal Silhouette: Cardiac shadow and mediastinal contours are within normal limits for age and body habitus.
Bones & Soft Tissues: Thoracic cage and surrounding soft tissues are unremarkable. No acute osseous abnormality.

IMPRESSION:
1. Normal PA and lateral chest radiograph.
2. No acute cardiopulmonary disease.

SIGNATURE:
Electronically signed by Dr. Robert Chen, MD - Board Certified Radiologist`
  },
  {
    id: 'cxr_02',
    title: 'Community-Acquired Pneumonia Chest X-Ray',
    category: 'X-Ray',
    modality: 'Chest X-Ray',
    qualityLevel: 'Good',
    expectedScore: 88,
    difficulty: 'Easy',
    description: 'Well documented pneumonia report with clinical follow-up advice.',
    flaws: ['Minor formatting spacing issue'],
    reportText: `PATIENT DEMOGRAPHICS:
Patient Name: Maria Rodriguez
MRN: 74129805
Exam Date: 2026-07-24

CLINICAL INDICATION:
62-year-old female presenting with fever (102°F), productive cough, and right-sided pleuritic chest pain for 4 days.

PROCEDURE DETAILS:
Single view AP portable chest radiograph.

COMPARISON:
None available.

FINDINGS:
Focal opacity observed in the right lower lobe with faint air bronchograms, concerning for acute lobar pneumonia. No bilateral pleural effusion. Heart size is normal. Pulmonary vasculature is not engorged. Trace right pleural thickening.

IMPRESSION:
1. Right lower lobe consolidation consistent with acute lobar pneumonia.
2. Recommend clinical correlation and follow-up radiograph in 6 weeks to confirm resolution.

SIGNATURE:
Dr. Sarah Jenkins, MD`
  },
  {
    id: 'cxr_03',
    title: 'Mild Pulmonary Edema Chest X-Ray',
    category: 'X-Ray',
    modality: 'Chest X-Ray',
    qualityLevel: 'Average',
    expectedScore: 74,
    difficulty: 'Moderate',
    description: 'Contains non-specific terminology and lacks comparison study details.',
    flaws: ['Vague terms ("probably congestive")', 'Missing comparison study date'],
    reportText: `EXAM: Chest AP view
PATIENT: Unknown Male, MRN: 90214

CLINICAL HISTORY:
Shortness of breath.

FINDINGS:
Lungs show some hazy density at the bases, probably congestive in nature. Heart looks somewhat enlarged. Blunting of costophrenic angles bilaterally, likely trace effusion. No pneumothorax seen.

IMPRESSION:
Features suggesting mild pulmonary edema or fluid overload. Clinical correlation advised.`
  },
  {
    id: 'cxr_04',
    title: 'Severe Pleural Effusion (Incomplete Report)',
    category: 'X-Ray',
    modality: 'Chest X-Ray',
    qualityLevel: 'Poor',
    expectedScore: 52,
    difficulty: 'Easy',
    description: 'Missing technique details, radiologist signature, and clinical history.',
    flaws: ['Missing Clinical History', 'Missing Procedure Details', 'Missing Signature'],
    reportText: `CHEST X-RAY

FINDINGS:
Large left pleural effusion with partial compressive atelectasis of the left lower lobe. Trachea is mildly shifted to the right. Right lung field is clear. No free air under diaphragm.

IMPRESSION:
Massive left-sided pleural effusion with mediastinal shift. Urgent thoracentesis recommended.`
  },
  {
    id: 'cxr_05',
    title: 'Contradictory Pneumothorax Chest X-Ray',
    category: 'X-Ray',
    modality: 'Chest X-Ray',
    qualityLevel: 'Critical',
    expectedScore: 28,
    difficulty: 'Complex',
    description: 'Severe safety error: Findings describe RIGHT pneumothorax, Impression states LEFT pneumothorax.',
    flaws: ['Contradictory Laterality (Right vs Left)', 'Missing Patient Demographics', 'Missing Procedure Details'],
    reportText: `CHEST RADIOGRAPH

FINDINGS:
There is a moderate right-sided apical pneumothorax measuring approximately 2.4 cm visceral pleural line separation. The left lung remains clear without effusion or pneumothorax. Mediastinum is centered.

IMPRESSION:
1. Moderate LEFT-sided apical pneumothorax requiring immediate clinical attention.
2. Recommend immediate chest tube placement.`
  },

  // ── 2. ABDOMEN X-RAY ──────────────────────────────────────────────────────
  {
    id: 'axr_01',
    title: 'Acute Bowel Obstruction Abdomen X-Ray',
    category: 'X-Ray',
    modality: 'Abdomen X-Ray',
    qualityLevel: 'Excellent',
    expectedScore: 96,
    difficulty: 'Moderate',
    description: 'Detailed erect and supine abdominal views with air-fluid level tracking.',
    flaws: ['None'],
    reportText: `PATIENT DEMOGRAPHICS:
Patient Name: David Thompson
MRN: 33419082
Exam Date: 2026-07-24

CLINICAL INDICATION:
68-year-old male with 2-day history of obstipation, progressive colicky abdominal pain, and bilious vomiting. Prior appendectomy 20 years ago.

PROCEDURE DETAILS:
Supine KUB and erect abdominal radiographs were obtained.

COMPARISON:
Abdominal radiograph dated 2025-03-12.

FINDINGS:
Bowel Gas Pattern: Multiple dilated small bowel loops in the central abdomen measuring up to 4.2 cm in diameter. Multiple staircase air-fluid levels visualized on erect view. Sparse gas in the colon and rectum.
Pneumoperitoneum: No free subdiaphragmatic air under the right hemidiaphragm on erect view.
Calcifications: Unremarkable abdominal vascular calcifications. No radio-opaque renal or ureteric calculi.

IMPRESSION:
1. Mechanical high-grade small bowel obstruction, likely secondary to postoperative adhesions.
2. No evidence of pneumoperitoneum.

SIGNATURE:
Dr. Alan Vance, MD`
  },
  {
    id: 'axr_02',
    title: 'Vague Abdomen Pain X-Ray',
    category: 'X-Ray',
    modality: 'Abdomen X-Ray',
    qualityLevel: 'Critical',
    expectedScore: 35,
    difficulty: 'Easy',
    description: 'Missing Impression section and patient MRN.',
    flaws: ['Missing Impression', 'Missing Demographics (MRN)', 'Vague terminology'],
    reportText: `KUB ABDOMINAL X-RAY

CLINICAL HISTORY: Abdominal discomfort.

FINDINGS:
Bowel gas pattern is somewhat non-specific. Maybe some mild stool burden in the colon. No big calcifications. Bones look ok.`
  },

  // ── 3. SKULL X-RAY ────────────────────────────────────────────────────────
  {
    id: 'sxr_01',
    title: 'Post-Trauma Skull Radiograph',
    category: 'X-Ray',
    modality: 'Skull X-Ray',
    qualityLevel: 'Average',
    expectedScore: 70,
    difficulty: 'Moderate',
    description: 'Evaluates trauma skull series but lacks detailed suture line annotations.',
    flaws: ['Missing comparison study', 'Incomplete anatomical detail'],
    reportText: `PATIENT DEMOGRAPHICS:
Patient Name: Kevin Lee
MRN: 11094827
Exam Date: 2026-07-24

CLINICAL INDICATION:
22-year-old male following blunt head injury during athletic event. Loss of consciousness reported.

PROCEDURE DETAILS:
AP, lateral, and Townes views of the skull.

FINDINGS:
No radiographically demonstrable linear fracture of the calvarium. Suture lines are normal in position. Vascular grooves intact. Sella turcica is within normal limits. Paranasal sinuses appear clear.

IMPRESSION:
No acute skull fracture identified. CT head recommended if neurological symptoms persist.`
  },

  // ── 4. SPINE X-RAY ────────────────────────────────────────────────────────
  {
    id: 'spx_01',
    title: 'Lumbar Spine Degenerative Disease X-Ray',
    category: 'X-Ray',
    modality: 'Spine X-Ray',
    qualityLevel: 'Good',
    expectedScore: 89,
    difficulty: 'Easy',
    description: 'Detailed weight-bearing lumbar spine series documenting spondylosis.',
    flaws: ['Minor formatting omission'],
    reportText: `PATIENT DEMOGRAPHICS:
Patient Name: Patricia Vance
MRN: 55421980
Exam Date: 2026-07-24

CLINICAL INDICATION:
67-year-old female with chronic lower back pain radiating down L5 dermatome.

PROCEDURE DETAILS:
AP, lateral, and oblique views of the lumbar spine.

COMPARISON:
Lumbar spine X-ray dated 2023-08-10.

FINDINGS:
Alignment: Normal lumbar lordosis preserved. Grade I anterior spondylolisthesis of L4 on L5.
Disc Spaces: Moderate disc space narrowing at L4-L5 and L5-S1 with anterior osteophytosis.
Bones: Mild endplate sclerosis. Sacroiliac joints intact.

IMPRESSION:
1. L4-L5 Grade 1 degenerative anterolisthesis.
2. Moderate multi-level lumbar spondylosis and disc space narrowing at L4-L5 and L5-S1.

SIGNATURE:
Dr. Marcus Brody, MD`
  },
  {
    id: 'spx_02',
    title: 'Cervical Spine Trauma (Missing Technique)',
    category: 'X-Ray',
    modality: 'Spine X-Ray',
    qualityLevel: 'Poor',
    expectedScore: 58,
    difficulty: 'Moderate',
    description: 'C-spine trauma radiograph missing procedure details and radiation dose note.',
    flaws: ['Missing Procedure Details', 'Missing Comparison', 'Vague alignment comment'],
    reportText: `CERVICAL SPINE RADIOGRAPH
PATIENT: Frank Wright | MRN: 884129

CLINICAL INDICATION: Motor vehicle collision, neck soreness.

FINDINGS:
Normal C-spine alignment. C1 through C7 visualized. No obvious teardrop or burst fractures. Disc spaces appear preserved. Soft tissue shadow anterior to spine is not widened.

IMPRESSION:
No gross cervical fracture. MRI advised if radiculopathy develops.`
  },

  // ── 5. KNEE X-RAY ─────────────────────────────────────────────────────────
  {
    id: 'knx_01',
    title: 'Bilateral Knee Osteoarthritis Radiograph',
    category: 'X-Ray',
    modality: 'Knee X-Ray',
    qualityLevel: 'Excellent',
    expectedScore: 97,
    difficulty: 'Easy',
    description: 'Comprehensive weight-bearing knee series with Kellgren-Lawrence grading.',
    flaws: ['None'],
    reportText: `PATIENT DEMOGRAPHICS:
Patient Name: Dorothy Gale
MRN: 66520194
Exam Date: 2026-07-24

CLINICAL INDICATION:
71-year-old female with bilateral mechanical knee pain, right greater than left. Stiffness worse upon weight bearing.

PROCEDURE DETAILS:
Weight-bearing bilateral AP, lateral, and Rosenberg knee radiographs.

COMPARISON:
None.

FINDINGS:
Right Knee: Severe medial joint space narrowing, prominent subchondral sclerosis, and marginal osteophytes. Patellofemoral compartment narrowing noted.
Left Knee: Moderate medial joint space narrowing with mild osteophytosis.
No joint effusion or loose bodies identified in either knee. No fracture.

IMPRESSION:
1. Severe right knee tricompartmental osteoarthritis (Kellgren-Lawrence Grade 3-4).
2. Moderate left knee osteoarthritis (Kellgren-Lawrence Grade 2).

SIGNATURE:
Dr. Robert Chen, MD`
  },
  {
    id: 'knx_02',
    title: 'Contradictory Knee Injury Radiograph',
    category: 'X-Ray',
    modality: 'Knee X-Ray',
    qualityLevel: 'Critical',
    expectedScore: 32,
    difficulty: 'Complex',
    description: 'Dangerous contradiction: Describes Left knee fracture in findings, Impression calls it Right knee.',
    flaws: ['Contradictory Laterality (Left vs Right)', 'Missing Clinical History'],
    reportText: `KNEE RADIOGRAPH
PATIENT: Samuel Green | MRN: 994012

FINDINGS:
AP and lateral views of the LEFT knee demonstrate a non-displaced fracture of the tibial plateau with joint effusion. Soft tissue swelling present surrounding the proximal fibula.

IMPRESSION:
1. Acute non-displaced RIGHT tibial plateau fracture.
2. Orthopedic consultation advised.`
  },

  // ── 6. SHOULDER X-RAY ─────────────────────────────────────────────────────
  {
    id: 'shx_01',
    title: 'Acute Anterior Shoulder Dislocation X-Ray',
    category: 'X-Ray',
    modality: 'Shoulder X-Ray',
    qualityLevel: 'Good',
    expectedScore: 86,
    difficulty: 'Easy',
    description: 'Documents shoulder dislocation and Hill-Sachs lesion.',
    flaws: ['Missing comparison study line'],
    reportText: `PATIENT DEMOGRAPHICS:
Patient Name: Brian O'Connor
MRN: 44102938
Exam Date: 2026-07-24

CLINICAL INDICATION:
29-year-old male with acute right shoulder deformity following mountain bike fall.

PROCEDURE DETAILS:
AP, scapular Y, and axillary views of the right shoulder.

FINDINGS:
Humeral head is anteriorly and inferiorly displaced relative to the glenoid fossa. A small cortical defect is noted on the posterolateral aspect of the humeral head, consistent with a Hill-Sachs lesion. No acute fracture of the acromion or clavicle.

IMPRESSION:
1. Acute anterior right glenohumeral dislocation with a small Hill-Sachs lesion.
2. Post-reduction radiographs recommended.`
  },

  // ── 7. PELVIS X-RAY ───────────────────────────────────────────────────────
  {
    id: 'plx_01',
    title: 'Total Hip Arthroplasty Pelvis Radiograph',
    category: 'X-Ray',
    modality: 'Pelvis X-Ray',
    qualityLevel: 'Excellent',
    expectedScore: 99,
    difficulty: 'Moderate',
    description: 'Postoperative pelvis radiograph detailing prosthesis orientation and cement mantle.',
    flaws: ['None'],
    reportText: `PATIENT DEMOGRAPHICS:
Patient Name: Eleanor Rigby
MRN: 77210948
Exam Date: 2026-07-24

CLINICAL INDICATION:
74-year-old female post left total hip arthroplasty (THA) 6 weeks ago. Routine follow-up alignment evaluation.

PROCEDURE DETAILS:
AP pelvis and frog-leg lateral radiographs of the left hip.

COMPARISON:
Immediate postoperative pelvis radiograph dated 2026-06-12.

FINDINGS:
Left THA components are well-aligned. The acetabular cup abduction angle measures approximately 42 degrees. The femoral stem is anatomical in position without peri-prosthetic fracture or lucency. Sacroiliac joints and right hip are unremarkable.

IMPRESSION:
Stable left total hip arthroplasty without hardware failure, loosening, or acute osseous abnormality.

SIGNATURE:
Dr. Alan Vance, MD`
  },

  // ── 8. CT BRAIN ───────────────────────────────────────────────────────────
  {
    id: 'ctb_01',
    title: 'Acute Ischemic Stroke CT Brain',
    category: 'CT',
    modality: 'CT Brain',
    qualityLevel: 'Excellent',
    expectedScore: 98,
    difficulty: 'Complex',
    description: 'High-acuity non-contrast head CT detailing hyperdense MCA sign and ASPECT score.',
    flaws: ['None'],
    reportText: `PATIENT DEMOGRAPHICS:
Patient Name: Walter White
MRN: 90124857
Exam Date: 2026-07-24
DOB: 1968-09-07

CLINICAL INDICATION:
57-year-old male presenting to Emergency Department with acute right hemiparesis and expressive aphasia. Onset 90 minutes prior to arrival. Stroke alert protocol.

PROCEDURE DETAILS:
Non-contrast axial CT scan of the brain performed from skull base to vertex with 5mm slice thickness.

COMPARISON:
None.

FINDINGS:
Parenchyma: Early ischemic loss of gray-white matter differentiation in the left insular cortex and basal ganglia. Hyperdense middle cerebral artery (MCA) sign noted in the M1 segment of the left MCA. ASPECT score is 8. No intracranial hemorrhage or midline shift.
Ventricles & Basal Cisterns: Ventricles are within normal limits. Basal cisterns are patent.
Calvarium: Intact.

IMPRESSION:
1. Early signs of acute left MCA territorial ischemic infarction without hemorrhagic transformation.
2. ASPECT score: 8.
3. Recommend urgent CTA head/neck and perfusion evaluation for mechanical thrombectomy eligibility.

SIGNATURE:
Dr. Robert Chen, MD`
  },
  {
    id: 'ctb_02',
    title: 'Traumatic Subdural Hematoma CT Brain',
    category: 'CT',
    modality: 'CT Brain',
    qualityLevel: 'Good',
    expectedScore: 87,
    difficulty: 'Moderate',
    description: 'Accurate acute subdural hemorrhage measurements with minor anatomical detail shorthand.',
    flaws: ['Minor acronym shorthand without definition'],
    reportText: `PATIENT DEMOGRAPHICS:
Patient Name: George Clark
MRN: 54109238
Exam Date: 2026-07-24

CLINICAL INDICATION:
82-year-old male with ground-level fall, taking warfarin (INR 2.8). Loss of consciousness.

PROCEDURE DETAILS:
Non-contrast head CT.

FINDINGS:
Crescentic hyperdense extra-axial fluid collection along the right frontoparietal convexities measuring up to 8 mm in maximal thickness. Associated 3 mm leftward midline shift. Mild effacement of the right lateral ventricle. No scalp hematoma fracture.

IMPRESSION:
1. Acute right frontoparietal subdural hematoma with 3 mm midline shift.
2. Recommend STAT neurosurgical consultation and reversal of anticoagulation.

SIGNATURE:
Dr. Sarah Jenkins, MD`
  },
  {
    id: 'ctb_03',
    title: 'Headache CT Brain (Missing Impression)',
    category: 'CT',
    modality: 'CT Brain',
    qualityLevel: 'Critical',
    expectedScore: 25,
    difficulty: 'Easy',
    description: 'Critical defect: Findings note hyperdense lesion, but IMPRESSION section is completely missing!',
    flaws: ['Missing Impression Section', 'Missing Contrast Details'],
    reportText: `NON-CONTRAST HEAD CT
PATIENT: Linda Taylor | MRN: 339012

CLINICAL HISTORY: Severe sudden onset thunderclap headache.

FINDINGS:
High-attenuation hyperdensity filling the suprasellar cistern and anterior anterior communicating artery complex, measuring 60 Hounsfield units. Ventricles are top of normal. Sulci are effaced. No skull fracture.`
  },

  // ── 9. CT CHEST ───────────────────────────────────────────────────────────
  {
    id: 'ctc_01',
    title: 'Pulmonary Embolism CT Angiogram Chest',
    category: 'CT',
    modality: 'CT Chest',
    qualityLevel: 'Excellent',
    expectedScore: 99,
    difficulty: 'Complex',
    description: 'Flawless CTA Chest protocol documenting saddle embolism and right heart strain.',
    flaws: ['None'],
    reportText: `PATIENT DEMOGRAPHICS:
Patient Name: Susan Anthony
MRN: 88129034
Exam Date: 2026-07-24

CLINICAL INDICATION:
49-year-old female post total knee replacement 10 days ago, presenting with sudden chest pain, hypoxia (SpO2 86%), and tachycardia.

PROCEDURE DETAILS:
Contrast-enhanced multidetector CT pulmonary angiography. Intravenous non-ionic contrast (75 mL Omnipaque 350) administered via right antecubital fossa.

COMPARISON:
None.

FINDINGS:
Pulmonary Arteries: Saddle embolus straddling the main pulmonary artery bifurcation with extension into the right and left main pulmonary arteries.
Right Heart Strain: Right ventricle to left ventricle (RV/LV) diameter ratio is elevated at 1.4, with flattening of the interventricular septum.
Lungs & Pleura: Wedge-shaped opacity in the right lower lobe periphery consistent with Hampton hump (pulmonary infarction). No pleural effusion.

IMPRESSION:
1. Acute saddle pulmonary embolism with bilateral main branch involvement.
2. Imaging evidence of acute right heart strain (RV/LV ratio 1.4).
3. Right lower lobe pulmonary infarction.

SIGNATURE:
Dr. Alan Vance, MD`
  },

  // ── 10. CT ABDOMEN ────────────────────────────────────────────────────────
  {
    id: 'cta_01',
    title: 'Acute Appendicitis CT Abdomen & Pelvis',
    category: 'CT',
    modality: 'CT Abdomen',
    qualityLevel: 'Excellent',
    expectedScore: 97,
    difficulty: 'Moderate',
    description: 'Complete 3-phase abdominal CT documenting acute perforated appendicitis.',
    flaws: ['None'],
    reportText: `PATIENT DEMOGRAPHICS:
Patient Name: Christopher Nolan
MRN: 20941823
Exam Date: 2026-07-24

CLINICAL INDICATION:
28-year-old male with 36-hour history of RLQ abdominal pain, rebound tenderness, leukocytosis (WBC 16.5), and fever.

PROCEDURE DETAILS:
Axial CT of abdomen and pelvis performed with IV and oral contrast.

FINDINGS:
Appendix: Dilated, non-compressible blind-ending tubular structure in the right lower quadrant measuring 11 mm in outer diameter. Prominent appendicolith visualized at the base. Surrounding cecal fat stranding and a 1.8 cm fluid collection noted.
Liver, Spleen, Pancreas, Kidneys: Within normal limits for age.
Bowel: No free air. No bowel obstruction.

IMPRESSION:
1. Acute appendicitis with appendicolith and localized microperforation/small fluid collection (1.8 cm).
2. General Surgery consultation recommended.

SIGNATURE:
Dr. Robert Chen, MD`
  },
  {
    id: 'cta_02',
    title: 'Vague Renal Mass CT Abdomen',
    category: 'CT',
    modality: 'CT Abdomen',
    qualityLevel: 'Poor',
    expectedScore: 48,
    difficulty: 'Moderate',
    description: 'Lacks measurements of suspicious renal mass and omits contrast phase information.',
    flaws: ['Missing Contrast Phase details', 'Vague lesion measurements', 'Non-specific terminology'],
    reportText: `CT ABDOMEN & PELVIS
PATIENT: Henry Ford | MRN: 671290

CLINICAL HISTORY: Flank pain.

FINDINGS:
Liver is ok. Spleen ok. Right kidney shows something in the upper pole. It looks like a lesion, maybe a cyst or tumor. Left kidney is fine. No obvious enlarged lymph nodes.

IMPRESSION:
Renal lesion right kidney. Needs further workup.`
  },

  // ── 11. CT SPINE ──────────────────────────────────────────────────────────
  {
    id: 'cts_01',
    title: 'Thoracic Burst Fracture CT Spine',
    category: 'CT',
    modality: 'CT Spine',
    qualityLevel: 'Good',
    expectedScore: 89,
    difficulty: 'Complex',
    description: 'Detailed trauma spine reconstruction detailing retropulsion and canal compromise.',
    flaws: ['Minor anatomical wording repetition'],
    reportText: `PATIENT DEMOGRAPHICS:
Patient Name: Timothy Miller
MRN: 41092837
Exam Date: 2026-07-24

CLINICAL INDICATION:
34-year-old male high-energy fall from scaffold. Mid-back pain.

PROCEDURE DETAILS:
Multiplanar reformatted CT scan of the thoracic spine without intravenous contrast.

FINDINGS:
Comminuted burst fracture of the T12 vertebral body with 30% height loss. Posterosuperior bone fragment retropulsed into the spinal canal causing 40% spinal canal stenosis. Transverse processes of T11 and T12 are intact. Posterior neural arch fractures not identified.

IMPRESSION:
1. Acute T12 burst fracture with retropulsed fragment resulting in 40% spinal canal occlusion.
2. Spine Surgery emergency evaluation recommended.`
  },

  // ── 12. MRI BRAIN ─────────────────────────────────────────────────────────
  {
    id: 'mrb_01',
    title: 'Multiple Sclerosis Protocol MRI Brain',
    category: 'MRI',
    modality: 'MRI Brain',
    qualityLevel: 'Excellent',
    expectedScore: 99,
    difficulty: 'Complex',
    description: 'Comprehensive 3T MRI brain protocol applying McDonald Criteria for MS.',
    flaws: ['None'],
    reportText: `PATIENT DEMOGRAPHICS:
Patient Name: Claire Underwood
MRN: 99182304
Exam Date: 2026-07-24

CLINICAL INDICATION:
31-year-old female presenting with optic neuritis, Lhermitte sign, and lower extremity paresthesias. Rule out demyelinating disease.

PROCEDURE DETAILS:
Multiplanar multisequence 3 Tesla MRI of the brain before and after intravenous administration of 10 mL Gadavist.

COMPARISON:
None.

FINDINGS:
Periventricular & Juxtacortical: Multiple hyperintense ovoid lesions on T2/FLAIR aligned perpendicular to the ventricles (Dawson fingers).
Enhancement: Active nodular gadolinium enhancement demonstrated in 2 periventricular lesions (left frontal white matter).
Infratentorial: Two non-enhancing lesions in the right cerebellar peduncle.
Diffusion: No restricted diffusion. Brain volume preserved for age.

IMPRESSION:
1. Multiple hyperintense demyelinating lesions meeting McDonald Criteria for dissemination in space and time.
2. Active inflammatory demyelinating disease indicated by enhancing left frontal lesions.

SIGNATURE:
Dr. Robert Chen, MD`
  },
  {
    id: 'mrb_02',
    title: 'Brain Tumor MRI (Missing Measurements)',
    category: 'MRI',
    modality: 'MRI Brain',
    qualityLevel: 'Critical',
    expectedScore: 36,
    difficulty: 'Complex',
    description: 'Fails to provide 3D dimensions of glioblastoma mass and omits contrast dose.',
    flaws: ['Missing Lesion Dimensions', 'Missing Contrast Dose', 'Missing Signature'],
    reportText: `MRI BRAIN WITH CONTRAST
PATIENT: Edward Norton | MRN: 412093

CLINICAL HISTORY: New onset seizures.

FINDINGS:
Large ring-enhancing mass in the temporal lobe with central necrosis and surrounding vasogenic edema. Significant mass effect on the lateral ventricle. Midline shift present.

IMPRESSION:
High-grade glial neoplasm (Glioblastoma suspect). Neurosurgery consult.`
  },

  // ── 13. MRI SPINE ─────────────────────────────────────────────────────────
  {
    id: 'mrs_01',
    title: 'L4-L5 Disc Herniation MRI Lumbar Spine',
    category: 'MRI',
    modality: 'MRI Spine',
    qualityLevel: 'Excellent',
    expectedScore: 96,
    difficulty: 'Moderate',
    description: 'Detailed multi-sequence lumbar spine MRI detailing nerve root impingement.',
    flaws: ['None'],
    reportText: `PATIENT DEMOGRAPHICS:
Patient Name: James Logan
MRN: 88210943
Exam Date: 2026-07-24

CLINICAL INDICATION:
42-year-old male with acute severe left L5 radiculopathy and positive straight leg raise.

PROCEDURE DETAILS:
Sagittal and axial T1, T2, and STIR MR sequences of the lumbar spine.

FINDINGS:
L4-L5: Large left paracentral extruded disc herniation measuring 7 x 11 mm. The herniated disc fragment migrates 4 mm inferiorly and causes severe left lateral recess stenosis with direct compression of the descending left L5 nerve root.
L5-S1: Mild posterior disc bulge without focal nerve impingement.
Conus Medullaris: Terminates normally at L1. Neural foramina otherwise patent.

IMPRESSION:
1. Left paracentral L4-L5 extruded disc herniation resulting in severe left L5 nerve root compression.
2. Clinical correlation with L5 radicular deficit recommended.`
  },

  // ── 14. MRI KNEE ──────────────────────────────────────────────────────────
  {
    id: 'mrk_01',
    title: 'ACL Tear & Meniscal Tear MRI Knee',
    category: 'MRI',
    modality: 'MRI Knee',
    qualityLevel: 'Good',
    expectedScore: 88,
    difficulty: 'Moderate',
    description: 'Accurate athletic knee injury protocol detailing ACL disruption.',
    flaws: ['Minor formatting omission in signature'],
    reportText: `PATIENT DEMOGRAPHICS:
Patient Name: Tyler Durden
MRN: 31092847
Exam Date: 2026-07-24

CLINICAL INDICATION:
24-year-old male with acute twisting injury playing soccer. Audible pop and joint swelling.

PROCEDURE DETAILS:
Multiplanar T1, T2, and proton density (PD) fat-suppressed MRI of the right knee.

FINDINGS:
Ligaments: Complete disruption of the anterior cruciate ligament (ACL) fibers with bone bruising of the lateral femoral condyle and posterior tibial plateau (pivot-shift pattern). Posterior cruciate ligament (PCL) is intact.
Menisci: Horizontal tear of the posterior horn of the medial meniscus extending to the inferior articular surface. Lateral meniscus intact.
Joint: Large joint effusion with lipohemarthrosis.

IMPRESSION:
1. Complete acute tear of the right ACL.
2. Complex tear of the medial meniscus posterior horn.
3. Pivot-shift bone contusion pattern.

SIGNATURE:
Dr. Sarah Jenkins, MD`
  },

  // ── 15. MRI SHOULDER ──────────────────────────────────────────────────────
  {
    id: 'mrh_01',
    title: 'Full-Thickness Supraspinatus Tear MRI Shoulder',
    category: 'MRI',
    modality: 'MRI Shoulder',
    qualityLevel: 'Excellent',
    expectedScore: 97,
    difficulty: 'Moderate',
    description: 'Detailed shoulder cuff evaluation measuring tendon retraction.',
    flaws: ['None'],
    reportText: `PATIENT DEMOGRAPHICS:
Patient Name: Diana Prince
MRN: 60928471
Exam Date: 2026-07-24

CLINICAL INDICATION:
58-year-old female with chronic shoulder pain, inability to abduct arm above 90 degrees.

PROCEDURE DETAILS:
1.5T MRI of the left shoulder with T1, T2, and PDFS sequences.

FINDINGS:
Rotator Cuff: Full-thickness tear of the distal supraspinatus tendon measuring 1.8 cm anteroposteriorly with 2.2 cm proximal tendon retraction to the level of the glenoid apex. Mild fatty atrophy (Goutallier Grade 2) of the supraspinatus muscle belly. Infraspinatus, subscapularis, and teres minor tendons are intact.
Biceps: Long head of biceps tendon is intact within the bicipital groove.
Acromion: Type II curved acromion with inferior spurring causing subacromial impingement.

IMPRESSION:
1. Full-thickness tear of the left supraspinatus tendon with 2.2 cm tendon retraction.
2. Subacromial impinement secondary to acromial spurring.

SIGNATURE:
Dr. Alan Vance, MD`
  },

  // ── 16. MRI ABDOMEN ───────────────────────────────────────────────────────
  {
    id: 'mra_01',
    title: 'Hepatic Hemangioma MRI Abdomen (MRCP)',
    category: 'MRI',
    modality: 'MRI Abdomen',
    qualityLevel: 'Good',
    expectedScore: 86,
    difficulty: 'Complex',
    description: 'Abdominal MRCP evaluation characterizing focal liver lesion.',
    flaws: ['Missing comparison date'],
    reportText: `PATIENT DEMOGRAPHICS:
Patient Name: Bruce Wayne
MRN: 10092847
Exam Date: 2026-07-24

CLINICAL INDICATION:
45-year-old male with incidental liver lesion detected on ultrasound.

PROCEDURE DETAILS:
Multiplanar abdominal MRI with Eovist dynamic gadolinium contrast and MRCP.

FINDINGS:
Liver: 3.2 cm well-circumscribed lesion in Segment VI. T1 hypointense, markedly T2 hyperintense. Dynamic post-contrast images demonstrate peripheral nodular discontinuous enhancement with progressive centripetal fill-in on delayed phases.
Biliary Tree: Normal caliber common bile duct (4 mm). No cholelithiasis.
Pancreas: Unremarkable.

IMPRESSION:
1. 3.2 cm Segment VI hepatic hemangioma. Benign findings. No intervention required.`
  },

  // ── 17. ULTRASOUND ABDOMEN ────────────────────────────────────────────────
  {
    id: 'usa_01',
    title: 'Acute Cholecystitis Abdominal Ultrasound',
    category: 'Ultrasound',
    modality: 'Ultrasound Abdomen',
    qualityLevel: 'Excellent',
    expectedScore: 98,
    difficulty: 'Easy',
    description: 'High-quality sonogram documenting gallstones, gallbladder wall thickness, and sonographic Murphy sign.',
    flaws: ['None'],
    reportText: `PATIENT DEMOGRAPHICS:
Patient Name: Margaret Thatcher
MRN: 55190284
Exam Date: 2026-07-24

CLINICAL INDICATION:
64-year-old female with acute postprandial RUQ abdominal pain, fever, and nausea.

PROCEDURE DETAILS:
Real-time grayscale and color Doppler sonography of the upper abdomen.

FINDINGS:
Gallbladder: Distended gallbladder containing multiple mobile impact-free acoustic shadowing gallstones. The gallbladder wall is diffusely thickened measuring 4.8 mm (normal <3 mm). Pericholecystic fluid streak present. Positive sonographic Murphy sign elicited directly over the gallbladder.
Biliary Tree: Common bile duct measures 4.2 mm, non-dilated.
Liver & Pancreas: Homogeneous echotexture without focal mass.

IMPRESSION:
1. Acute calculous cholecystitis with positive sonographic Murphy sign and pericholecystic fluid.
2. Surgical consultation recommended.

SIGNATURE:
Dr. Robert Chen, MD`
  },
  {
    id: 'usa_02',
    title: 'Fatty Liver Ultrasound (Poor Details)',
    category: 'Ultrasound',
    modality: 'Ultrasound Abdomen',
    qualityLevel: 'Poor',
    expectedScore: 49,
    difficulty: 'Easy',
    description: 'Lacks measurements of organ dimensions and liver echogenicity grading.',
    flaws: ['Missing liver dimensions', 'Vague organ description', 'Missing signature'],
    reportText: `ABDOMINAL ULTRASOUND
PATIENT: Gary Oldman | MRN: 290182

CLINICAL HISTORY: Elevated LFTs.

FINDINGS:
Liver looks bright, probably fatty infiltration. Gallbladder has no stones. Kidneys look okay. Pancreas partially obscured by bowel gas.

IMPRESSION:
Hepatic steatosis. Recheck LFTs.`
  },

  // ── 18. ULTRASOUND PELVIS ─────────────────────────────────────────────────
  {
    id: 'usp_01',
    title: 'Uterine Fibroid Pelvic Ultrasound',
    category: 'Ultrasound',
    modality: 'Ultrasound Pelvis',
    qualityLevel: 'Good',
    expectedScore: 89,
    difficulty: 'Moderate',
    description: 'Transabdominal and transvaginal pelvic ultrasound detailing leiomyoma.',
    flaws: ['Minor typo in technique section'],
    reportText: `PATIENT DEMOGRAPHICS:
Patient Name: Jennifer Lawrence
MRN: 48920193
Exam Date: 2026-07-24

CLINICAL INDICATION:
38-year-old female with menorrhagia and pelvic pressure.

PROCEDURE DETAILS:
Transabdominal and transvaginal endovaginal sonography.

FINDINGS:
Uterus: Anteverted, enlarged measuring 10.4 x 6.2 x 5.8 cm. Intramural hypoechoic mass in the posterior uterine body measuring 3.4 x 3.1 cm with peripheral vascularity on color Doppler. Endometrial stripe is uniform measuring 6.5 mm.
Ovaries: Right ovary measures 2.8 x 1.9 cm. Left ovary measures 3.0 x 2.1 cm. Both ovaries exhibit normal follicular architecture. No free pelvic fluid.

IMPRESSION:
1. Uterine leiomyoma (3.4 cm posterior intramural fibroid).
2. Otherwise normal pelvic ultrasound.

SIGNATURE:
Dr. Sarah Jenkins, MD`
  },

  // ── 19. ULTRASOUND OBSTETRICS ─────────────────────────────────────────────
  {
    id: 'uso_01',
    title: 'Second Trimester Anatomy Scan Ultrasound',
    category: 'Ultrasound',
    modality: 'Ultrasound Obstetrics',
    qualityLevel: 'Excellent',
    expectedScore: 99,
    difficulty: 'Complex',
    description: 'Complete 20-week fetal biometry and anatomical survey.',
    flaws: ['None'],
    reportText: `PATIENT DEMOGRAPHICS:
Patient Name: Emma Watson
MRN: 71209384
Exam Date: 2026-07-24

CLINICAL INDICATION:
26-year-old female, G1P0, at 20 weeks 2 days gestation for routine fetal anatomical survey.

PROCEDURE DETAILS:
Transabdominal obstetric sonography with Doppler.

FINDINGS:
Fetal Number & Viability: Single live intrauterine fetus in cephalic presentation. Fetal heart rate is 148 bpm with normal rhythm.
Biometry: BPD 48 mm, HC 178 mm, AC 154 mm, FL 33 mm. Estimated fetal weight: 345 grams (52nd percentile). Gestational age by ultrasound: 20 weeks 3 days.
Anatomy: Fetal cranium, 4-chamber heart view, stomach bubble, kidneys, bladder, and 4-extremity long bones visualized and anatomically normal.
Placenta & Amniotic Fluid: Placenta is anterior, clear of internal os. Amniotic fluid index (AFI) is 14.2 cm (normal).

IMPRESSION:
1. Single live intrauterine pregnancy at 20 weeks 3 days gestation.
2. Normal detailed fetal anatomical survey.

SIGNATURE:
Dr. Alan Vance, MD`
  },

  // ── 20. THYROID ULTRASOUND ────────────────────────────────────────────────
  {
    id: 'ust_01',
    title: 'Thyroid Nodule Ultrasound (TI-RADS 4)',
    category: 'Ultrasound',
    modality: 'Thyroid Ultrasound',
    qualityLevel: 'Excellent',
    expectedScore: 97,
    difficulty: 'Moderate',
    description: 'ACR TI-RADS risk stratification for thyroid nodule biopsy guidance.',
    flaws: ['None'],
    reportText: `PATIENT DEMOGRAPHICS:
Patient Name: Elizabeth Bennet
MRN: 39012847
Exam Date: 2026-07-24

CLINICAL INDICATION:
48-year-old female with palpable right thyroid nodule.

PROCEDURE DETAILS:
High-resolution 12 MHz linear ultrasound of the thyroid gland.

FINDINGS:
Right Lobe: Measures 4.8 x 1.8 x 1.6 cm. In the mid right lobe, there is a solid hypoechoic nodule measuring 1.4 x 1.1 x 1.2 cm with microcalcifications and lobulated margins.
TI-RADS Scoring: Composition: Solid (2), Echogenicity: Hypoechoic (2), Shape: Wider-than-tall (0), Margin: Lobulated (2), Echogenic Foci: Punctate microcalcifications (3). Total TI-RADS score: 9 points (TR5 - Highly Suspicious).
Left Lobe & Isthmus: Normal in size and echotexture without focal lesion.

IMPRESSION:
1. 1.4 cm right thyroid nodule categorized as ACR TI-RADS 5 (Highly Suspicious).
2. Ultrasound-guided fine-needle aspiration (FNA) biopsy recommended.`
  },
  {
    id: 'ust_02',
    title: 'Thyroid Nodule US (Missing TI-RADS Score)',
    category: 'Ultrasound',
    modality: 'Thyroid Ultrasound',
    qualityLevel: 'Poor',
    expectedScore: 55,
    difficulty: 'Easy',
    description: 'Fails to classify thyroid nodule according to ACR TI-RADS system.',
    flaws: ['Missing TI-RADS Score', 'Vague biopsy recommendation'],
    reportText: `THYROID ULTRASOUND
PATIENT: Scarlett Johansson | MRN: 902814

CLINICAL HISTORY: Neck swelling.

FINDINGS:
Right lobe has a 1.5 cm dark nodule. Left lobe is normal. No bad lymph nodes seen in the neck.

IMPRESSION:
Right thyroid nodule. Biopsy if doctor wants.`
  },

  // ── 21. DOPPLER STUDY ─────────────────────────────────────────────────────
  {
    id: 'dop_01',
    title: 'Carotid Artery Duplex Ultrasound',
    category: 'Angiography / Doppler',
    modality: 'Doppler Study',
    qualityLevel: 'Excellent',
    expectedScore: 98,
    difficulty: 'Moderate',
    description: 'Intersocietal Accreditation Commission (IAC) compliant carotid Doppler report.',
    flaws: ['None'],
    reportText: `PATIENT DEMOGRAPHICS:
Patient Name: Harrison Ford
MRN: 88102947
Exam Date: 2026-07-24

CLINICAL INDICATION:
72-year-old male with transient ischemic attack (right amaurosis fugax).

PROCEDURE DETAILS:
B-mode, color, and spectral Doppler ultrasound of the carotid and vertebral arteries.

FINDINGS:
Right Carotid: Dense calcified plaque at the carotid bifurcation. Peak systolic velocity (PSV) in the right internal carotid artery (ICA) is 245 cm/s with end-diastolic velocity (EDV) of 85 cm/s. ICA/CCA ratio is 3.4.
Left Carotid: Soft plaque causing 30-49% stenosis. Left ICA PSV is 82 cm/s.
Vertebral Arteries: Antegrade flow bilaterally.

IMPRESSION:
1. 70-80% high-grade stenosis of the right internal carotid artery by NASCET criteria.
2. 30-49% mild stenosis of the left internal carotid artery.
3. Vascular surgery consultation recommended for right CEA or stenting.

SIGNATURE:
Dr. Robert Chen, MD`
  },
  {
    id: 'dop_02',
    title: 'Lower Extremity DVT Doppler (Critical Defect)',
    category: 'Angiography / Doppler',
    modality: 'Doppler Study',
    qualityLevel: 'Critical',
    expectedScore: 30,
    difficulty: 'Moderate',
    description: 'Critical patient safety defect: Fails to specify WHICH leg (Right vs Left) has DVT.',
    flaws: ['Missing Anatomical Laterality', 'Missing Vein Segment Name'],
    reportText: `DOPPLER VENOUS ULTRASOUND

CLINICAL HISTORY: Leg swelling and pain.

FINDINGS:
Non-compressible vein lumen with loss of color fill and absence of augmentation on calf squeeze. Thrombus appears acute.

IMPRESSION:
Acute Deep Vein Thrombosis (DVT) present. Start anticoagulation immediately.`
  },

  // ── 22. MAMMOGRAPHY ───────────────────────────────────────────────────────
  {
    id: 'mam_01',
    title: 'Screening Mammogram (BI-RADS 1)',
    category: 'Mammography',
    modality: 'Mammography',
    qualityLevel: 'Excellent',
    expectedScore: 100,
    difficulty: 'Easy',
    description: 'Standard MQSA-compliant digital breast tomosynthesis screening report.',
    flaws: ['None'],
    reportText: `PATIENT DEMOGRAPHICS:
Patient Name: Meryl Streep
MRN: 54901823
Exam Date: 2026-07-24

CLINICAL INDICATION:
52-year-old female presenting for routine annual screening mammography. No family history of breast cancer.

PROCEDURE DETAILS:
Bilateral 3D digital breast tomosynthesis (DBT) with 2D synthetic CC and MLO views.

COMPARISON:
Screening mammogram dated 2025-06-18.

FINDINGS:
Breast Tissue Density: Category B - Scattered areas of fibroglandular density.
Right Breast: No focal mass, architectural distortion, or suspicious microcalcifications.
Left Breast: No focal mass, architectural distortion, or suspicious microcalcifications.
Axillae: Unremarkable bilateral axillary lymph nodes.

IMPRESSION:
BI-RADS CATEGORY 1: Negative.
RECOMMENDATION: Routine annual screening mammography in 1 year.

SIGNATURE:
Dr. Sarah Jenkins, MD - MQSA Certified Mammographer`
  },
  {
    id: 'mam_02',
    title: 'Diagnostic Mammogram (BI-RADS 4)',
    category: 'Mammography',
    modality: 'Mammography',
    qualityLevel: 'Good',
    expectedScore: 90,
    difficulty: 'Moderate',
    description: 'Diagnostic evaluation of suspicious microcalcifications.',
    flaws: ['Minor formatting spacing issue'],
    reportText: `PATIENT DEMOGRAPHICS:
Patient Name: Cate Blanchett
MRN: 90182347
Exam Date: 2026-07-24

CLINICAL INDICATION:
56-year-old female with microcalcifications noted on screening.

PROCEDURE DETAILS:
Left diagnostic spot compression and magnification mammography.

FINDINGS:
Grouped pleomorphic microcalcifications in the upper outer quadrant of the left breast spanning 1.2 cm. No discrete mass.

IMPRESSION:
BI-RADS CATEGORY 4B: Suspicious abnormality.
RECOMMENDATION: Stereotactic core needle biopsy of left breast calcifications.

SIGNATURE:
Dr. Sarah Jenkins, MD`
  },

  // ── 23. HRCT CHEST ────────────────────────────────────────────────────────
  {
    id: 'hrc_01',
    title: 'Idiopathic Pulmonary Fibrosis HRCT Chest',
    category: 'CT',
    modality: 'HRCT Chest',
    qualityLevel: 'Excellent',
    expectedScore: 98,
    difficulty: 'Complex',
    description: 'High-resolution CT documenting Usual Interstitial Pneumonia (UIP) pattern.',
    flaws: ['None'],
    reportText: `PATIENT DEMOGRAPHICS:
Patient Name: Ian McKellen
MRN: 39018274
Exam Date: 2026-07-24

CLINICAL INDICATION:
70-year-old male with progressive exertional dyspnea and dry cough for 18 months. Fine velcro crackles on auscultation.

PROCEDURE DETAILS:
High-resolution 1 mm thin-section volumetric non-contrast CT of the chest in prone and supine inspiratory/expiratory views.

FINDINGS:
Subpleural, basal-predominant reticular opacities with prominent peripheral honeycombing and traction bronchiectasis. No ground-glass opacities. No pleural effusion or mediastinal lymphadenopathy.

IMPRESSION:
1. Definitive Usual Interstitial Pneumonia (UIP) pattern, consistent with Idiopathic Pulmonary Fibrosis (IPF).
2. Pulmonology multidisciplinary discussion recommended.`
  },

  // ── 24. CT ANGIOGRAPHY ────────────────────────────────────────────────────
  {
    id: 'cta_ang_01',
    title: 'Coronary CT Angiography (C-RADS 3)',
    category: 'Angiography / Doppler',
    modality: 'CT Angiography',
    qualityLevel: 'Excellent',
    expectedScore: 99,
    difficulty: 'Complex',
    description: 'ECG-gated coronary artery calcium and stenosis quantification.',
    flaws: ['None'],
    reportText: `PATIENT DEMOGRAPHICS:
Patient Name: Anthony Hopkins
MRN: 80192837
Exam Date: 2026-07-24

CLINICAL INDICATION:
61-year-old male with atypical chest pain and intermediate pre-test probability of CAD.

PROCEDURE DETAILS:
ECG-gated prospective coronary CT angiography following oral beta-blocker administration. 60 mL Isovue 370 IV contrast.

FINDINGS:
Agatston Calcium Score: 184 (Moderate calcification).
LAD: Mixed non-calcified plaque in the proximal LAD causing 50-69% moderate luminal stenosis.
LCx: Mild non-calcified atheroma (<30% stenosis).
RCA: Normal vessel caliber without stenosis.
Heart & Pericardium: Normal left ventricular ejection fraction. No pericardial effusion.

IMPRESSION:
1. C-RADS Category 3: Moderate stenosis (50-69%) of the proximal left anterior descending (LAD) artery.
2. Agatston calcium score: 184.
3. Recommend aggressive lipid lowering and functional stress testing.`
  },

  // ── 25. MR ANGIOGRAPHY ────────────────────────────────────────────────────
  {
    id: 'mra_ang_01',
    title: 'Brain Circle of Willis MRA',
    category: 'Angiography / Doppler',
    modality: 'MR Angiography',
    qualityLevel: 'Good',
    expectedScore: 89,
    difficulty: 'Moderate',
    description: '3D Time-of-Flight intracranial MR angiography evaluating cerebral aneurysm.',
    flaws: ['Minor acronym omission'],
    reportText: `PATIENT DEMOGRAPHICS:
Patient Name: Nicole Kidman
MRN: 70192847
Exam Date: 2026-07-24

CLINICAL INDICATION:
46-year-old female with family history of intracranial aneurysm in first-degree relative.

PROCEDURE DETAILS:
3D Time-of-Flight (TOF) unenhanced MR angiography of the intracranial vasculature.

FINDINGS:
A 3.5 mm saccular aneurysm is visualized at the anterior communicating artery (ACom) junction pointing anteriorly. No vessel spasm. Bilateral internal carotid, middle cerebral, and vertebrobasilar arteries are normal in caliber.

IMPRESSION:
1. 3.5 mm unruptured anterior communicating artery saccular aneurysm.
2. Neurovascular clinic follow-up recommended.`
  }
];

// Helper to push 25 additional cases dynamically to reach 50 comprehensive cases
const MODALITIES_EXTENDED = [
  { mod: 'Abdomen X-Ray', cat: 'X-Ray', title: 'Renal Calculus KUB X-Ray', level: 'Good', score: 85, diff: 'Easy', text: 'KUB RADIOGRAPH\nPATIENT: Tom Hanks | MRN: 881290\n\nCLINICAL INDICATION: Acute right flank pain.\n\nFINDINGS: 6 mm radio-opaque calcification projected over the right distal uretervesical junction. Bowel gas pattern normal.\n\nIMPRESSION: Right distal ureteric calculus causing mild obstructive uropathy.' },
  { mod: 'Spine X-Ray', cat: 'X-Ray', title: 'Scoliosis Assessment Spine Radiograph', level: 'Excellent', score: 96, diff: 'Moderate', text: 'PATIENT DEMOGRAPHICS:\nPatient Name: Sophia Loren | MRN: 901827 | Date: 2026-07-24\n\nCLINICAL INDICATION: 16-year-old female scoliosis screening.\n\nFINDINGS: Right thoracic scoliosis with Cobb angle measuring 24 degrees extending from T5 to T11. Risser grade 3.\n\nIMPRESSION: Moderate right thoracic adolescent idiopathic scoliosis (Cobb angle 24°).' },
  { mod: 'Knee X-Ray', cat: 'X-Ray', title: 'Patellar Fracture Knee Radiograph', level: 'Poor', score: 58, diff: 'Easy', text: 'KNEE RADIOGRAPH\nPATIENT: Mark Ruffalo\n\nFINDINGS: Transverse fracture line across mid patella with 3mm displacement. Effusion present.\n\nIMPRESSION: Patellar fracture. Ortho consult.' },
  { mod: 'Shoulder X-Ray', cat: 'X-Ray', title: 'Calcific Tendonitis Shoulder X-Ray', level: 'Average', score: 72, diff: 'Easy', text: 'SHOULDER RADIOGRAPH\nPATIENT: Hugh Jackman | MRN: 390182\n\nCLINICAL INDICATION: Shoulder pain.\n\nFINDINGS: Dense cloud-like calcification adjacent to greater tuberosity. Joint space preserved.\n\nIMPRESSION: Supraspinatus calcific tendonitis.' },
  { mod: 'CT Brain', cat: 'CT', title: 'Normal Screening CT Head', level: 'Excellent', score: 98, diff: 'Easy', text: 'PATIENT DEMOGRAPHICS:\nPatient Name: Matt Damon | MRN: 701928 | Date: 2026-07-24\n\nCLINICAL INDICATION: Syncope evaluation.\n\nPROCEDURE: Non-contrast CT brain.\n\nFINDINGS: Brain parenchyma normal. Ventricles and sulci age-appropriate. No mass, hemorrhage, or stroke.\n\nIMPRESSION: Unremarkable non-contrast head CT.' },
  { mod: 'CT Chest', cat: 'CT', title: 'Solitary Pulmonary Nodule CT Chest', level: 'Good', score: 87, diff: 'Moderate', text: 'CT CHEST WITH CONTRAST\nPATIENT: Scarlett Johansson | MRN: 490182\n\nCLINICAL INDICATION: 8 mm lung nodule follow-up.\n\nFINDINGS: 8 mm smooth solid nodule in right upper lobe, unchanged from prior CT 6 months ago. No lymphadenopathy.\n\nIMPRESSION: Stable 8 mm right upper lobe nodule (Fleischner Criteria follow-up in 12 months).' },
  { mod: 'CT Abdomen', cat: 'CT', title: 'Diverticulitis CT Abdomen & Pelvis', level: 'Excellent', score: 97, diff: 'Moderate', text: 'PATIENT DEMOGRAPHICS:\nPatient Name: Morgan Freeman | MRN: 290182 | Date: 2026-07-24\n\nCLINICAL INDICATION: LLQ pain, fever, leukocytosis.\n\nFINDINGS: Sigmoid colon diverticulosis with pericolic fat stranding and 1 cm colonic wall thickening. No microperforation.\n\nIMPRESSION: Acute uncomplicated sigmoid diverticulitis.' },
  { mod: 'CT Spine', cat: 'CT', title: 'Lumbar Spinal Stenosis CT Spine', level: 'Average', score: 75, diff: 'Moderate', text: 'CT LUMBAR SPINE\nPATIENT: Keanu Reeves | MRN: 880192\n\nFINDINGS: L4-L5 facet hypertrophy and ligamentum flavum thickening causing central canal stenosis.\n\nIMPRESSION: Moderate L4-L5 lumbar spinal stenosis.' },
  { mod: 'MRI Brain', cat: 'MRI', title: 'Acute Ischemic Stroke MRI Brain (DWI)', level: 'Excellent', score: 99, diff: 'Complex', text: 'PATIENT DEMOGRAPHICS:\nPatient Name: Leonardo DiCaprio | MRN: 990182 | Date: 2026-07-24\n\nFINDINGS: Diffusion-weighted imaging (DWI) shows hyperintensity in right MCA cortex with corresponding ADC map hypointensity.\n\nIMPRESSION: Acute right MCA cortical territorial cerebral infarction.' },
  { mod: 'MRI Spine', cat: 'MRI', title: 'Cervical Myelopathy MRI C-Spine', level: 'Good', score: 89, diff: 'Complex', text: 'MRI CERVICAL SPINE WITH & WITHOUT CONTRAST\nPATIENT: Christian Bale | MRN: 390182\n\nFINDINGS: C5-C6 disc osteophyte complex with T2 hyperintensity within the spinal cord consistent with compressive myelopathy.\n\nIMPRESSION: Severe C5-C6 spinal cord compression with myelomalacia.' },
  { mod: 'MRI Knee', cat: 'MRI', title: 'Patellar Tendonitis MRI Knee', level: 'Average', score: 73, diff: 'Easy', text: 'MRI KNEE\nPATIENT: Brad Pitt | MRN: 201928\n\nFINDINGS: Thickening and T2 hyperintensity of proximal patellar tendon (Jumper\'s knee).\n\nIMPRESSION: Proximal patellar tendinopathy.' },
  { mod: 'MRI Shoulder', cat: 'MRI', title: 'Labral Tear MRI Shoulder (Arthrogram)', level: 'Excellent', score: 96, diff: 'Complex', text: 'PATIENT DEMOGRAPHICS:\nPatient Name: Tom Cruise | MRN: 110928 | Date: 2026-07-24\n\nFINDINGS: Contrast extends into the anterior inferior glenoid labrum consistent with a Bankart lesion.\n\nIMPRESSION: Anterior inferior labral tear (Bankart lesion).' },
  { mod: 'MRI Abdomen', cat: 'MRI', title: 'Pancreatic Cyst MRI (MRCP)', level: 'Good', score: 86, diff: 'Moderate', text: 'MRI ABDOMEN & MRCP\nPATIENT: Natalie Portman | MRN: 661902\n\nFINDINGS: 1.6 cm septated cystic lesion in pancreatic tail without main pancreatic duct communication.\n\nIMPRESSION: 1.6 cm branch-duct IPMN or mucinous cystadenoma.' },
  { mod: 'Ultrasound Abdomen', cat: 'Ultrasound', title: 'Renal Hydronephrosis Ultrasound', level: 'Good', score: 88, diff: 'Easy', text: 'RENAL ULTRASOUND\nPATIENT: Charlize Theron | MRN: 551902\n\nFINDINGS: Moderate right renal pelvis pelvicalyceal dilatation. Left kidney normal.\n\nIMPRESSION: Moderate right hydronephrosis secondary to distal obstruction.' },
  { mod: 'Ultrasound Pelvis', cat: 'Ultrasound', title: 'Ovarian Cyst Ultrasound', level: 'Excellent', score: 97, diff: 'Easy', text: 'PATIENT DEMOGRAPHICS:\nPatient Name: Anne Hathaway | MRN: 881029 | Date: 2026-07-24\n\nFINDINGS: Left ovary contains a 4.2 cm simple anechoic fluid collection with posterior acoustic enhancement.\n\nIMPRESSION: Simple benign-appearing left ovarian follicular cyst (4.2 cm).' },
  { mod: 'Ultrasound Obstetrics', cat: 'Ultrasound', title: 'First Trimester Dating Scan US', level: 'Good', score: 90, diff: 'Easy', text: 'OBSTETRIC ULTRASOUND\nPATIENT: Gal Gadot | MRN: 440192\n\nFINDINGS: Single live embryo, Crown-Rump Length (CRL) 32 mm corresponding to 10 weeks 1 day gestation. FHR 162 bpm.\n\nIMPRESSION: Viable 10-week intrauterine pregnancy.' },
  { mod: 'Thyroid Ultrasound', cat: 'Ultrasound', title: 'Multinodular Goiter Ultrasound', level: 'Average', score: 71, diff: 'Moderate', text: 'THYROID SONOGRAM\nPATIENT: Viola Davis | MRN: 901823\n\nFINDINGS: Both thyroid lobes enlarged containing multiple spongiform nodules up to 2.1 cm.\n\nIMPRESSION: Benign multinodular goiter (TI-RADS 2).' },
  { mod: 'Doppler Study', cat: 'Angiography / Doppler', title: 'Renal Artery Stenosis Doppler', level: 'Good', score: 87, diff: 'Complex', text: 'RENAL DOPPLER ULTRASOUND\nPATIENT: Denzel Washington | MRN: 770192\n\nFINDINGS: Right main renal artery peak systolic velocity 220 cm/s with RAR ratio >3.5.\n\nIMPRESSION: Hemodynamically significant (>60%) right renal artery stenosis.' },
  { mod: 'Mammography', cat: 'Mammography', title: 'Asymmetric Density Mammogram (BI-RADS 0)', level: 'Excellent', score: 98, diff: 'Moderate', text: 'PATIENT DEMOGRAPHICS:\nPatient Name: Sandra Bullock | MRN: 330192 | Date: 2026-07-24\n\nFINDINGS: Focal asymmetry in right upper outer quadrant on CC view.\n\nIMPRESSION: BI-RADS 0 (Incomplete). Spot compression & ultrasound needed.' },
  { mod: 'HRCT Chest', cat: 'CT', title: 'Bronchiectasis HRCT Chest', level: 'Good', score: 89, diff: 'Moderate', text: 'HRCT CHEST\nPATIENT: Javier Bardem | MRN: 110928\n\nFINDINGS: Cylindrical bronchodilation with signet-ring sign in bilateral lower lobes.\n\nIMPRESSION: Bilateral lower lobe bronchiectasis.' },
  { mod: 'CT Angiography', cat: 'Angiography / Doppler', title: 'Aortic Aneurysm CT Angiogram', level: 'Excellent', score: 99, diff: 'Complex', text: 'PATIENT DEMOGRAPHICS:\nPatient Name: Al Pacino | MRN: 881902 | Date: 2026-07-24\n\nFINDINGS: Infrarenal abdominal aortic aneurysm measuring 5.4 x 5.2 cm with mural thrombus.\n\nIMPRESSION: 5.4 cm infrarenal AAA without rupture.' },
  { mod: 'MR Angiography', cat: 'Angiography / Doppler', title: 'Renal Artery MRA', level: 'Average', score: 74, diff: 'Moderate', text: 'MRA RENAL ARTERIES\nPATIENT: Robert De Niro | MRN: 550192\n\nFINDINGS: Smooth narrowing proximal left renal artery.\n\nIMPRESSION: Left renal artery fibromuscular dysplasia.' },
  { mod: 'Chest X-Ray', cat: 'X-Ray', title: 'Atelectasis Chest Radiograph', level: 'Good', score: 85, diff: 'Easy', text: 'CHEST X-RAY\nPATIENT: Willem Dafoe | MRN: 441092\n\nFINDINGS: Bandlike opacity in left base with volume loss.\n\nIMPRESSION: Left basilar discoid atelectasis.' },
  { mod: 'CT Brain', cat: 'CT', title: 'Subarachnoid Hemorrhage CT Head', level: 'Critical', score: 38, diff: 'Complex', text: 'HEAD CT\nPATIENT: Joaquin Phoenix | MRN: 990182\n\nFINDINGS: Hyperdense fluid in basal cisterns.\n\nIMPRESSION: [Missing Detailed Analysis]' },
  { mod: 'MRI Spine', cat: 'MRI', title: 'Lumbar Spinal Fusion MRI Spine', level: 'Good', score: 87, diff: 'Moderate', text: 'MRI LUMBAR SPINE POST-OP\nPATIENT: Christian Slater | MRN: 220192\n\nFINDINGS: L4-L5 posterior interbody fusion hardware intact.\n\nIMPRESSION: Intact L4-L5 lumbar spinal instrumentation.' }
];

// Append extended modalities
MODALITIES_EXTENDED.forEach((m, idx) => {
  DEMO_REPORTS.push({
    id: `ext_${idx + 1}`,
    title: m.title,
    category: m.cat,
    modality: m.mod,
    qualityLevel: m.level,
    expectedScore: m.score,
    difficulty: m.diff,
    description: `Clinical hospital case: ${m.title}`,
    flaws: m.level === 'Excellent' ? ['None'] : [m.level === 'Critical' ? 'Critical omission' : 'Minor defect'],
    reportText: m.text
  });
});
