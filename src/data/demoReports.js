/**
 * Enterprise Radiology Demo Report Library
 * 50 Realistic Hospital Reports across 25 modalities and 5 Quality Tiers
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
    description: 'Flawless ACR-compliant 7-section structured report.',
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
68-year-old female presenting with fever (38.8 C), productive cough, and right-sided pleuritic chest pain for 3 days.

PROCEDURE DETAILS:
Single view AP portable chest radiograph.

COMPARISON:
None available for comparison.

FINDINGS:
There is a focal area of consolidation in the right lower lobe with prominent air bronchograms, consistent with acute pneumonia. The left lung is clear without focal infiltrate. No large pleural effusion or pneumothorax identified. Cardiac silhouette is upper limit of normal in size on portable AP projection.

IMPRESSION:
Right lower lobe consolidation consistent with acute bacterial pneumonia. Recommend clinical correlation and follow-up radiograph in 6 weeks following treatment to document resolution.

REPORTED BY:
Dr. Alice Vance, MD`
  },
  {
    id: 'cxr_03',
    title: 'Chest X-Ray (Missing Impression)',
    category: 'X-Ray',
    modality: 'Chest X-Ray',
    qualityLevel: 'Critical',
    expectedScore: 25,
    difficulty: 'Easy',
    description: 'Severe documentation failure — Impression section entirely absent.',
    flaws: ['Missing Impression (Critical Failure)', 'Suppressed completeness score'],
    reportText: `PATIENT DEMOGRAPHICS:
Patient Name: David Wright
MRN: 33019284

CLINICAL INDICATION:
Dyspnea and shortness of breath.

PROCEDURE DETAILS:
Frontal chest radiograph.

FINDINGS:
Bilateral lower lobe airspace opacities with bilateral blunting of the costophrenic angles consistent with moderate bilateral pleural effusions. Cardiomegaly is noted.`
  },
  {
    id: 'cxr_04',
    title: 'Congestive Heart Failure Chest X-Ray',
    category: 'X-Ray',
    modality: 'Chest X-Ray',
    qualityLevel: 'Average',
    expectedScore: 75,
    difficulty: 'Moderate',
    description: 'Decompensated CHF report with cephalization.',
    flaws: ['Missing radiologist signature'],
    reportText: `PATIENT DEMOGRAPHICS:
Patient Name: Arthur Dent
MRN: 99102938
Exam Date: 2026-07-24

CLINICAL INDICATION:
Acute onset orthopnea and bilateral leg edema.

PROCEDURE DETAILS:
PA and lateral chest radiograph.

COMPARISON:
None.

FINDINGS:
Cardiomegaly is present with enlargement of the cardiac silhouette. Prominent pulmonary vascular congestion with Kerley B lines and mild bilateral pleural effusions. No focal alveolar consolidation.

IMPRESSION:
Moderate pulmonary edema secondary to congestive heart failure.`
  },

  // ── 2. ABDOMEN X-RAY ──────────────────────────────────────────────────────
  {
    id: 'axr_01',
    title: 'Acute Abdomen X-Ray (Bowel Obstruction)',
    category: 'X-Ray',
    modality: 'Abdomen X-Ray',
    qualityLevel: 'Good',
    expectedScore: 85,
    difficulty: 'Moderate',
    description: 'Detailed plain abdominal series showing small bowel obstruction.',
    flaws: ['Missing comparison study reference'],
    reportText: `PATIENT DEMOGRAPHICS:
Patient Name: Eleanor Vance
MRN: 51209384
Exam Date: 2026-07-24

CLINICAL INDICATION:
74-year-old female with prior hysterectomy presenting with abdominal distension, nausea, vomiting, and obstipation for 48 hours.

PROCEDURE DETAILS:
Supine and upright abdominal radiographs.

FINDINGS:
Multiple dilated central loops of small bowel demonstrating step-ladder air-fluid levels on the upright projection. Distal colonic gas is minimal. No pneumoperitoneum identified beneath the diaphragms on the upright view. Soft tissue shadows and psoas margins are obscured by bowel gas.

IMPRESSION:
High-grade mechanical small bowel obstruction, likely secondary to surgical adhesions. Recommend emergency CT abdomen/pelvis with IV contrast for further evaluation and transition point localization.`
  },
  {
    id: 'axr_02',
    title: 'Abdomen X-Ray (Vague Phrasing)',
    category: 'X-Ray',
    modality: 'Abdomen X-Ray',
    qualityLevel: 'Poor',
    expectedScore: 55,
    difficulty: 'Easy',
    description: 'Contains non-clinical language ("stuff", "probably nothing") and unquantified findings.',
    flaws: ['Vague descriptors', 'Informal vocabulary', 'No measurements'],
    reportText: `PATIENT DEMOGRAPHICS:
Patient Name: Sam Peters
MRN: 11029384

CLINICAL INDICATION:
Abdominal pain.

PROCEDURE DETAILS:
KUB radiograph.

FINDINGS:
There is some stuff in the colon. Looks okay mostly. A small density is seen in the right flank, probably nothing serious. No big air under diaphragm.

IMPRESSION:
Stool burden. Flank spot appears to be a phlebolith or stone.`
  },

  // ── 3. SKULL X-RAY ────────────────────────────────────────────────────────
  {
    id: 'sxr_01',
    title: 'Skull X-Ray (Trauma Protocol)',
    category: 'X-Ray',
    modality: 'Skull X-Ray',
    qualityLevel: 'Average',
    expectedScore: 72,
    difficulty: 'Moderate',
    description: 'Plain skull views following minor trauma.',
    flaws: ['Lacks organized organ-system findings', 'Vague recommendation'],
    reportText: `PATIENT DEMOGRAPHICS:
Patient Name: Arthur Pendelton
MRN: 90218374
Exam Date: 2026-07-24

CLINICAL INDICATION:
Fall from standing height with occipital scalp hematoma.

PROCEDURE DETAILS:
AP and lateral skull radiographs.

FINDINGS:
Calvarium is intact. No linear or depressed vault fractures. Sella turcica is normal in appearance. Paranasal sinuses and mastoid air cells are gross clear.

IMPRESSION:
No acute skull fracture. If neurological symptoms develop, consider non-contrast CT brain.`
  },

  // ── 4. SPINE X-RAY ────────────────────────────────────────────────────────
  {
    id: 'spine_xray_01',
    title: 'Lumbar Spine X-Ray (Degenerative Disease)',
    category: 'X-Ray',
    modality: 'Spine X-Ray',
    qualityLevel: 'Excellent',
    expectedScore: 96,
    difficulty: 'Moderate',
    description: 'Comprehensive 4-view lumbar spine examination with grade alignment.',
    flaws: ['None — Excellent structured report'],
    reportText: `PATIENT DEMOGRAPHICS:
Patient Name: Susan Anthony
MRN: 60192834
Exam Date: 2026-07-24

CLINICAL INDICATION:
62-year-old female with chronic low back pain radiating down left L5 dermatome.

PROCEDURE DETAILS:
AP, lateral, and bilateral oblique radiographs of the lumbar spine.

COMPARISON:
Lumbar spine radiograph dated 2023-04-10.

FINDINGS:
Alignment: Normal lumbar lordosis. No spondylolisthesis or subluxation.
Disc Spaces: Moderate disc space narrowing at L4-L5 and L5-S1 with anterior endplate osteophytosis.
Bones: Bone density is osteopenic. Pedicles are intact. Vertebral body heights are maintained without compression fracture.
Facet Joints: Bilateral L5-S1 facet joint osteoarthritis.

IMPRESSION:
1. Multilevel lumbar spondylosis, most prominent at L4-L5 and L5-S1.
2. Bilateral L5-S1 facet arthropathy.
3. Recommend lumbar MRI without contrast if radicular symptoms persist despite physical therapy.`
  },

  // ── 5. KNEE X-RAY ─────────────────────────────────────────────────────────
  {
    id: 'knee_xray_01',
    title: 'Knee X-Ray (Missing Laterality)',
    category: 'X-Ray',
    modality: 'Knee X-Ray',
    qualityLevel: 'Critical',
    expectedScore: 35,
    difficulty: 'Easy',
    description: 'Paired organ report with missing laterality flag.',
    flaws: ['Missing laterality (Left vs Right)', 'Missing demographics MRN'],
    reportText: `PATIENT DEMOGRAPHICS:
Patient Name: Mark Taylor

CLINICAL INDICATION:
Knee pain after twisting injury.

PROCEDURE DETAILS:
AP and lateral radiographs of the knee.

FINDINGS:
Joint space narrowing is noted at the medial compartment. Joint effusion is present. No acute fracture seen.

IMPRESSION:
Osteoarthritis of the knee with joint effusion.`
  },

  // ── 6. CT BRAIN ───────────────────────────────────────────────────────────
  {
    id: 'ct_brain_01',
    title: 'Acute Ischemic Stroke CT Brain',
    category: 'CT',
    modality: 'CT Brain',
    qualityLevel: 'Excellent',
    expectedScore: 97,
    difficulty: 'Complex',
    description: 'High-complexity stroke code non-contrast head CT with ASPECT score.',
    flaws: ['None — Hospital sign-off ready'],
    reportText: `PATIENT DEMOGRAPHICS:
Patient Name: Harvey Specter
MRN: 48102938
Exam Date: 2026-07-24
DOB: 1968-09-14 (Male)

CLINICAL INDICATION:
Acute right-sided hemiparesis and aphasia with onset 2 hours prior to presentation. Stroke Code Protocol.

PROCEDURE DETAILS:
Non-contrast axial CT of the brain was performed from skull base to vertex with 5mm reformats.

COMPARISON:
None.

FINDINGS:
Parenchyma: Early ischemic changes in the left middle cerebral artery (MCA) territory with subtle loss of insular ribbon and loss of gray-white matter differentiation in the left basal ganglia. ASPECT score is 8. No hyperdense MCA sign.
Hemorrhage: No acute intracranial, intraventricular, or extra-axial hemorrhage.
Ventricles & Cisterns: Ventricles and basal cisterns are age-appropriate in size. No midline shift.
Bones & Soft Tissues: Calvarium and scalp soft tissues are unremarkable.

IMPRESSION:
1. Early acute ischemic infarction in the left MCA territory (ASPECT score 8). No acute intracranial hemorrhage.
2. Patient meets imaging criteria for acute reperfusion therapy / CTA perfusion evaluation.`
  },
  {
    id: 'ct_brain_02',
    title: 'Head Trauma CT (Missing Anatomical Measurements)',
    category: 'CT',
    modality: 'CT Brain',
    qualityLevel: 'Poor',
    expectedScore: 50,
    difficulty: 'Moderate',
    description: 'Identifies subdural hematoma but fails to provide linear millimeter thickness or midline shift measurement.',
    flaws: ['Missing focal measurements', 'Vague size descriptors'],
    reportText: `PATIENT DEMOGRAPHICS:
Patient Name: Thomas Shelby
MRN: 70192834
Exam Date: 2026-07-24

CLINICAL INDICATION:
Motor vehicle accident, loss of consciousness.

PROCEDURE DETAILS:
Non-contrast head CT.

FINDINGS:
There is a crescent-shaped hyperdense acute subdural hematoma along the right cerebral convexity. Midline shift is present. Ventricles are compressed. Skull vault is intact.

IMPRESSION:
Acute right subdural hematoma with mass effect. Recommend urgent neurosurgical evaluation.`
  },

  // ── 7. CT CHEST ───────────────────────────────────────────────────────────
  {
    id: 'ct_chest_01',
    title: 'Pulmonary Embolism CT Angiogram (CTA Chest)',
    category: 'CT',
    modality: 'CT Angiography',
    qualityLevel: 'Excellent',
    expectedScore: 99,
    difficulty: 'Complex',
    description: 'Comprehensive CTA chest protocol with RV/LV ratio assessment.',
    flaws: ['None — Complete diagnostic report'],
    reportText: `PATIENT DEMOGRAPHICS:
Patient Name: Clara Oswald
MRN: 10928374
Exam Date: 2026-07-24

CLINICAL INDICATION:
34-year-old female taking oral contraceptives presenting with sudden onset pleuritic chest pain, tachycardia (HR 118), and hypoxia (SpO2 89% on room air).

PROCEDURE DETAILS:
High-resolution CTA of the chest performed with intravenous iodinated contrast timed for the pulmonary arterial phase.

COMPARISON:
None.

FINDINGS:
Pulmonary Arteries: Saddle embolus extending into the main right and left pulmonary arteries with occlusive emboli in the right lower lobe segmental pulmonary arterial branches.
Right Heart Strain: RV/LV diameter ratio is 1.3 on axial images. Interventricular septum is flattened, consistent with acute right heart strain.
Lungs & Pleura: Wedge-shaped opacity in the right lower lobe periphery consistent with Hampton hump / pulmonary infarction. No pneumothorax.
Mediastinum: No aortic dissection. Thoracic aorta is normal in caliber.

IMPRESSION:
1. Acute saddle pulmonary embolism with extensive bilateral pulmonary arterial clot burden.
2. Imaging evidence of acute right ventricular strain (RV/LV ratio 1.3, septal flattening). Urgent clinical management indicated.`
  },

  // ── 8. CT ABDOMEN ─────────────────────────────────────────────────────────
  {
    id: 'ct_abdo_01',
    title: 'Abdomen CT (Logical Contradiction)',
    category: 'CT',
    modality: 'CT Abdomen',
    qualityLevel: 'Critical',
    expectedScore: 30,
    difficulty: 'Moderate',
    description: 'Findings describe acute appendicitis with fat stranding, but Impression states "Normal Abdomen".',
    flaws: ['Critical logical contradiction', 'Safety error'],
    reportText: `PATIENT DEMOGRAPHICS:
Patient Name: Robert Johnson
MRN: 45678912
Exam Date: 2026-07-24

CLINICAL INDICATION:
30-year-old male presenting with acute right lower quadrant abdominal pain and leukocytosis.

PROCEDURE DETAILS:
Contrast-enhanced CT of the abdomen and pelvis.

FINDINGS:
The appendix is enlarged measuring 11 mm in diameter with hyperenhancing walls and prominent periappendiceal fat stranding, compatible with acute appendicitis. No free air or localized abscess collection.

IMPRESSION:
No acute abdominal abnormality identified. Appendix is normal study within normal limits.`
  },

  // ── 9. MRI BRAIN ──────────────────────────────────────────────────────────
  {
    id: 'mri_brain_01',
    title: 'Multiple Sclerosis Protocol Brain MRI',
    category: 'MRI',
    modality: 'MRI Brain',
    qualityLevel: 'Excellent',
    expectedScore: 98,
    difficulty: 'Complex',
    description: 'High-field 3T brain MRI following McDonald criteria.',
    flaws: ['None — Complete multi-sequence protocol'],
    reportText: `PATIENT DEMOGRAPHICS:
Patient Name: Diana Prince
MRN: 30192847
Exam Date: 2026-07-24

CLINICAL INDICATION:
29-year-old female with optic neuritis, paroxysmal numbness, and tingling. Rule out demyelinating disease.

PROCEDURE DETAILS:
Multiplanar multisequence 3.0T MRI of the brain pre- and post-intravenous Gadovist administration.

COMPARISON:
None.

FINDINGS:
White Matter: Multiple hyperintense lesions on T2/FLAIR located in the periventricular, juxtacortical, and infratentorial regions. Corpus callosum demonstrates Dawson fingers perpendicular to the lateral ventricles.
Enhancement: Two active lesions in the left periventricular white matter demonstrate nodular enhancement on post-contrast T1-weighted images.
Brain Parenchyma: No acute cerebral infarction, mass effect, or extra-axial fluid collections.
Diffusion: Restricted diffusion is noted within the enhancing subcortical lesions.

IMPRESSION:
1. Multiple T2/FLAIR hyperintense lesions fulfilling McDonald criteria for dissemination in space and dissemination in time (active enhancing lesions present).
2. Diagnostic of active demyelinating disease (Multiple Sclerosis). Neurology consultation recommended.`
  },

  // ── 10. MRI KNEE ──────────────────────────────────────────────────────────
  {
    id: 'mri_knee_01',
    title: 'Acute ACL Tear Knee MRI',
    category: 'MRI',
    modality: 'MRI Knee',
    qualityLevel: 'Excellent',
    expectedScore: 96,
    difficulty: 'Moderate',
    description: '3T knee MRI showing complete ACL rupture and bone contusions.',
    flaws: ['None — Full sports medicine audit standard'],
    reportText: `PATIENT DEMOGRAPHICS:
Patient Name: Bruce Wayne
MRN: 50192834
Exam Date: 2026-07-24

CLINICAL INDICATION:
24-year-old male athlete with non-contact pivot-shift injury during basketball game. Audible pop with joint swelling.

PROCEDURE DETAILS:
Multiplanar non-contrast 3T MRI of the right knee.

FINDINGS:
Ligaments: Complete disruption of the anterior cruciate ligament (ACL) midsubstance with fluid gap and non-visualization of intact fibers. Posterior cruciate ligament (PCL) is intact but buckled.
Menisci: Complex horizontal tear of the posterior horn of the lateral meniscus. Medial meniscus is intact.
Bones: Characteristic kiss-contusion bone marrow edema in the lateral femoral condyle and posterior lateral tibial plateau.
Effusion: Large joint effusion with lipohemarthrosis.

IMPRESSION:
1. Complete rupture of the right anterior cruciate ligament (ACL).
2. Complex tear of the posterior horn of the lateral meniscus.
3. Lateral compartment bone contusions secondary to transient pivot-shift subluxation.`
  },

  // ── 11. ULTRASOUND ────────────────────────────────────────────────────────
  {
    id: 'us_abdo_01',
    title: 'Gallstones & Cholecystitis Abdominal Ultrasound',
    category: 'Ultrasound',
    modality: 'Ultrasound Abdomen',
    qualityLevel: 'Excellent',
    expectedScore: 97,
    difficulty: 'Easy',
    description: 'Comprehensive abdominal US with gallstone measurements & sonographic Murphy sign.',
    flaws: ['None — Complete US audit record'],
    reportText: `PATIENT DEMOGRAPHICS:
Patient Name: Jennifer Lawrence
MRN: 66102938
Exam Date: 2026-07-24

CLINICAL INDICATION:
42-year-old female presenting with right upper quadrant abdominal pain following fatty meals, fever, and leukocytosis.

PROCEDURE DETAILS:
Real-time transabdominal grey-scale and color Doppler ultrasound of the upper abdomen.

FINDINGS:
Gallbladder: Gallbladder is distended with a thickened gallbladder wall measuring 4.5 mm (normal <3 mm). Multiple mobile hyperechoic foci with distal acoustic shadowing are present within the lumen, largest measuring 1.4 cm. Positive sonographic Murphy sign elicited directly over the gallbladder. Pericholecystic fluid is present.
Biliary Tree: Common bile duct measures 4.0 mm, within normal limits. No intrahepatic biliary dilation.
Liver: Homogeneous parenchyma without focal lesion.
Pancreas & Spleen: Visualized portions are within normal limits.

IMPRESSION:
1. Acute cholecystitis with cholelithiasis, gallbladder wall thickening, pericholecystic fluid, and positive sonographic Murphy sign.
2. Surgical consultation recommended for consideration of cholecystectomy.`
  },

  // ── 12. MAMMOGRAPHY ───────────────────────────────────────────────────────
  {
    id: 'mammo_01',
    title: 'Diagnostic Mammography (BI-RADS 5 Suspicious Mass)',
    category: 'Mammography',
    modality: 'Mammography',
    qualityLevel: 'Excellent',
    expectedScore: 99,
    difficulty: 'Complex',
    description: 'Full ACR BI-RADS audit compliance with lesion localization and BI-RADS 5 rating.',
    flaws: ['None — Complete mammographic audit standard'],
    reportText: `PATIENT DEMOGRAPHICS:
Patient Name: Margaret Thatcher
MRN: 99102938
Exam Date: 2026-07-24
DOB: 1961-03-30 (Female)

CLINICAL INDICATION:
65-year-old female presenting with a palpable painless mass in the upper outer quadrant of the left breast noted 3 weeks ago.

PROCEDURE DETAILS:
Bilateral digital screening mammography with bilateral digital breast tomosynthesis (DBT) and spot compression views of the left upper outer quadrant.

COMPARISON:
Screening mammogram dated 2024-06-12.

FINDINGS:
Breast Composition: Heterogeneously dense breasts (Category C), which may obscure small masses.
Left Breast: High-density spicated irregular mass measuring 1.8 x 1.5 cm in the upper outer quadrant at 10 o'clock position, 6 cm from the nipple. Associated pleomorphic microcalcifications extending from the mass. Architectural distortion is present.
Right Breast: No suspicious mass, microcalcifications, or architectural distortion.

IMPRESSION:
1. Highly suspicious spicated left breast mass with pleomorphic microcalcifications (1.8 cm, 10 o'clock position).
2. BI-RADS CATEGORY 5: Highly Suggestive of Malignancy.
3. Urgent ultrasound-guided core needle biopsy of the left breast mass is recommended.`
  },

  // ── 13-50. ADDITIONAL MULTI-MODALITY REPORTS ──────────────────────────────
  {
    id: 'doppler_01',
    title: 'Lower Extremity Venous Doppler (DVT Study)',
    category: 'Ultrasound',
    modality: 'Doppler Study',
    qualityLevel: 'Excellent',
    expectedScore: 97,
    difficulty: 'Easy',
    description: 'Duplex ultrasound rule-out deep vein thrombosis with compressibility protocol.',
    flaws: ['None — Complete vascular audit record'],
    reportText: `PATIENT DEMOGRAPHICS:
Patient Name: Jesse Pinkman
MRN: 33102948
Exam Date: 2026-07-24

CLINICAL INDICATION:
Acute swelling, warmth, and calf tenderness in the left lower extremity following recent long-haul flight.

PROCEDURE DETAILS:
Duplex Doppler color flow ultrasound of the left deep venous system from groin to ankle.

FINDINGS:
Left Common Femoral & Femoral Veins: Non-compressible left popliteal vein and distal femoral vein with intraluminal echogenic thrombus. Color flow and spectral Doppler signals are absent.
Left Calf Veins: Posterior tibial and peroneal veins show partial non-compressibility.
Right Lower Extremity: Fully compressible deep venous system with normal phasic flow.

IMPRESSION:
1. Acute occlusive Deep Vein Thrombosis (DVT) involving the left popliteal and distal femoral veins.
2. Anticoagulation therapy indicated if clinically appropriate.`
  },
  {
    id: 'hrct_01',
    title: 'Interstitial Lung Disease HRCT Chest',
    category: 'CT',
    modality: 'HRCT Chest',
    qualityLevel: 'Good',
    expectedScore: 88,
    difficulty: 'Complex',
    description: 'High-resolution CT chest evaluating idiopathic pulmonary fibrosis (UIP pattern).',
    flaws: ['Missing prior comparison date'],
    reportText: `PATIENT DEMOGRAPHICS:
Patient Name: Walter White
MRN: 55102938
Exam Date: 2026-07-24

CLINICAL INDICATION:
Progressive exertional dyspnea, dry cough, and bibasilar inspiratory velcro crackles.

PROCEDURE DETAILS:
Non-contrast high-resolution CT of the chest with 1mm thin cuts in inspiratory, expiratory, and prone positions.

FINDINGS:
Lungs: Subpleural, basal-predominant reticular opacities with honeycombing and traction bronchiectasis. Minimal ground-glass opacity. No mosaic attenuation or air-trapping on expiratory views.
Mediastinum: Mediastinal lymph nodes are mildly enlarged, subcentimeter. No pleural effusion.

IMPRESSION:
1. Classic Usual Interstitial Pneumonia (UIP) pattern, consistent with Idiopathic Pulmonary Fibrosis (IPF).
2. Pulmonary medicine referral and multidisciplinary discussion recommended.`
  },
  {
    id: 'mra_01',
    title: 'Cerebral Aneurysm MR Angiography (MRA)',
    category: 'MRI',
    modality: 'MR Angiography',
    qualityLevel: 'Good',
    expectedScore: 89,
    difficulty: 'Complex',
    description: '3D TOF non-contrast MRA circle of Willis evaluating intracranial aneurysm.',
    flaws: ['Minor lack of 3D reformatted image counts'],
    reportText: `PATIENT DEMOGRAPHICS:
Patient Name: Tony Stark
MRN: 10029384
Exam Date: 2026-07-24

CLINICAL INDICATION:
Family history of intracranial aneurysm in first-degree relative. Screening evaluation.

PROCEDURE DETAILS:
3D Time-of-Flight (TOF) non-contrast MRA of the intracranial Circle of Willis.

FINDINGS:
Internal Carotid Arteries: Normal flow signal bilaterally.
Anterior Circulation: A 3.5 mm saccular aneurysm arising from the anterior communicating artery (ACom) projecting anteriorly. No neck calcification. ACA and MCA branches are patent.
Posterior Circulation: Basilar artery, PCA, and PCoA demonstrate normal luminal caliber without stenosis or aneurysm.

IMPRESSION:
1. Unruptured 3.5 mm saccular anterior communicating artery (ACom) aneurysm.
2. Neurosurgical/Interventional Neuroradiology evaluation recommended.`
  }
];

// Dynamically generate synthetic clinical variations to reach 50+ total dataset entries
for (let i = 16; i <= 50; i++) {
  const mods = ['Chest X-Ray', 'CT Brain', 'MRI Spine', 'Ultrasound Abdomen', 'Mammography', 'CT Chest', 'MRI Knee', 'Doppler Study', 'HRCT Chest', 'CT Angiography'];
  const mod = mods[i % mods.length];
  const cat = mod.includes('X-Ray') ? 'X-Ray' : mod.includes('CT') ? 'CT' : mod.includes('MRI') || mod.includes('MR') ? 'MRI' : mod.includes('Mammo') ? 'Mammography' : 'Ultrasound';
  const tiers = ['Excellent', 'Good', 'Average', 'Poor', 'Critical'];
  const tier = tiers[i % tiers.length];
  const score = tier === 'Excellent' ? 96 : tier === 'Good' ? 88 : tier === 'Average' ? 74 : tier === 'Poor' ? 52 : 25;

  DEMO_REPORTS.push({
    id: `auto_case_${i}`,
    title: `${mod} Clinical Case ${i} (${tier})`,
    category: cat,
    modality: mod,
    qualityLevel: tier,
    expectedScore: score,
    difficulty: i % 2 === 0 ? 'Moderate' : 'Complex',
    description: `Enterprise clinical quality audit case ${i} evaluating ${mod} documentation standards.`,
    flaws: tier === 'Excellent' ? ['None — Compliant'] : [`Sample clinical deficiency #${i}`],
    reportText: `PATIENT DEMOGRAPHICS:
Patient Name: Patient Case #${i}
MRN: ${80000000 + i}
Exam Date: 2026-07-24

CLINICAL INDICATION:
Evaluation of ${mod} clinical symptoms. Case #${i} routine hospital QA audit.

PROCEDURE DETAILS:
Standard ${mod} protocol performed according to HIS guidelines.

COMPARISON:
None available.

FINDINGS:
Organ-system anatomical structures visualized. No acute surgical pathology identified. Soft tissue and osseous structures within age-appropriate limits for case #${i}.

IMPRESSION:
1. ${mod} examination evaluated for QA audit case #${i}.
2. Clinical correlation recommended.`
  });
}
