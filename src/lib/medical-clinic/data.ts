export interface Doctor {
  id: string;
  slug: string;
  name: string;
  title: string;
  specialty: string;
  bio: string;
  qualifications: string[];
  languages: string[];
  availableDays: string[];
  image: string;
  consultationFee: number;
  rating: number;
  reviewCount: number;
  featured: boolean;
}

export interface Service {
  id: string;
  slug: string;
  name: string;
  category: ServiceCategory;
  description: string;
  shortDescription: string;
  duration: number; // minutes
  price: number;
  image: string;
  features: string[];
  featured: boolean;
}

export type ServiceCategory =
  | "general"
  | "cardiology"
  | "dermatology"
  | "physiotherapy"
  | "mental-health"
  | "nutrition"
  | "diagnostics"
  | "womens-health";

export const serviceCategoryLabels: Record<ServiceCategory, string> = {
  general: "General Practice",
  cardiology: "Cardiology",
  dermatology: "Dermatology",
  physiotherapy: "Physiotherapy",
  "mental-health": "Mental Health",
  nutrition: "Nutrition & Dietetics",
  diagnostics: "Diagnostics & Lab",
  "womens-health": "Women's Health",
};

export interface Appointment {
  id: string;
  patientName: string;
  patientEmail: string;
  patientPhone: string;
  doctorId: string;
  serviceId: string;
  date: string;
  time: string;
  type: "in-person" | "video" | "phone";
  status: "Pending" | "Confirmed" | "Completed" | "Cancelled" | "No-show";
  notes: string;
  createdAt: string;
}

export interface Offer {
  id: string;
  slug: string;
  title: string;
  description: string;
  originalPrice: number;
  discountedPrice: number;
  validUntil: string;
  category: string;
  image: string;
  badge: string;
  featured: boolean;
}

export interface PatientRecord {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  bloodType: string;
  allergies: string[];
  medications: string[];
  conditions: string[];
  files: MedicalFile[];
  registeredAt: string;
}

export interface MedicalFile {
  id: string;
  name: string;
  type: "scan" | "blood-test" | "report" | "prescription" | "other";
  date: string;
  notes: string;
}

export const serviceCategories: ServiceCategory[] = [
  "general",
  "cardiology",
  "dermatology",
  "physiotherapy",
  "mental-health",
  "nutrition",
  "diagnostics",
  "womens-health",
];

export const doctors: Doctor[] = [
  {
    id: "dr-001",
    slug: "dr-sarah-mitchell",
    name: "Dr Sarah Mitchell",
    title: "MBBS, MRCGP",
    specialty: "General Practice",
    bio: "Dr Mitchell brings over 15 years of experience in general practice, with a particular interest in preventative medicine and chronic disease management. She is passionate about building long-term relationships with her patients and providing holistic, patient-centred care.",
    qualifications: ["MBBS — King's College London", "MRCGP — Royal College of GPs", "PGCert Diabetes Management"],
    languages: ["English", "French"],
    availableDays: ["Monday", "Tuesday", "Wednesday", "Friday"],
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=600&h=600&fit=crop&crop=face",
    consultationFee: 120,
    rating: 4.9,
    reviewCount: 312,
    featured: true,
  },
  {
    id: "dr-002",
    slug: "dr-james-osei",
    name: "Dr James Osei",
    title: "MD, FRCP",
    specialty: "Cardiology",
    bio: "Dr Osei is a consultant cardiologist with a subspecialty in preventive cardiology and heart failure. He has published extensively on cardiovascular risk reduction and lectures at University College London. His approach combines cutting-edge diagnostics with compassionate care.",
    qualifications: ["MD — University of Ghana", "FRCP — Royal College of Physicians", "Fellowship in Interventional Cardiology — Hammersmith Hospital"],
    languages: ["English", "Twi"],
    availableDays: ["Tuesday", "Thursday", "Saturday"],
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=600&h=600&fit=crop&crop=face",
    consultationFee: 280,
    rating: 4.8,
    reviewCount: 189,
    featured: true,
  },
  {
    id: "dr-003",
    slug: "dr-amelia-chen",
    name: "Dr Amelia Chen",
    title: "MBBS, MRCP(Derm)",
    specialty: "Dermatology",
    bio: "Dr Chen specialises in medical and cosmetic dermatology, treating everything from eczema and psoriasis to skin cancer screening and aesthetic procedures. She trained at the renowned St John's Institute of Dermatology and is a member of the British Association of Dermatologists.",
    qualifications: ["MBBS — Imperial College London", "MRCP (Dermatology)", "British Association of Dermatologists Member"],
    languages: ["English", "Mandarin", "Cantonese"],
    availableDays: ["Monday", "Wednesday", "Friday"],
    image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=600&h=600&fit=crop&crop=face",
    consultationFee: 220,
    rating: 4.9,
    reviewCount: 246,
    featured: true,
  },
  {
    id: "dr-004",
    slug: "dr-marcus-bell",
    name: "Dr Marcus Bell",
    title: "BSc(Physio), MSc, MCSP",
    specialty: "Physiotherapy",
    bio: "Marcus is a chartered physiotherapist specialising in sports injuries, musculoskeletal disorders, and post-surgical rehabilitation. He has worked with several professional sports teams and brings performance-level physiotherapy to everyday patients.",
    qualifications: ["BSc Physiotherapy — Leeds University", "MSc Sports Medicine", "MCSP — Chartered Society of Physiotherapy"],
    languages: ["English"],
    availableDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=600&h=600&fit=crop&crop=face",
    consultationFee: 95,
    rating: 4.7,
    reviewCount: 408,
    featured: false,
  },
  {
    id: "dr-005",
    slug: "dr-priya-sharma",
    name: "Dr Priya Sharma",
    title: "MBBCh, MRCPsych",
    specialty: "Psychiatry & Mental Health",
    bio: "Dr Sharma is a consultant psychiatrist with expertise in anxiety, depression, ADHD, and trauma-informed care. She offers both pharmacological management and integrates psychotherapy principles into her practice. She is dedicated to reducing stigma around mental health.",
    qualifications: ["MBBCh — Cardiff University", "MRCPsych — Royal College of Psychiatrists", "Diploma in Cognitive Behavioural Therapy"],
    languages: ["English", "Hindi", "Punjabi"],
    availableDays: ["Wednesday", "Thursday", "Friday"],
    image: "https://images.unsplash.com/photo-1638202993928-7267aad84c31?w=600&h=600&fit=crop&crop=face",
    consultationFee: 250,
    rating: 4.9,
    reviewCount: 178,
    featured: true,
  },
  {
    id: "dr-006",
    slug: "dr-elena-ross",
    name: "Dr Elena Ross",
    title: "BSc, MSc(Nutrition), RD",
    specialty: "Nutrition & Dietetics",
    bio: "Elena is a registered dietitian specialising in metabolic health, gut microbiome optimisation, and sports nutrition. She takes an evidence-based, personalised approach to nutrition, helping patients achieve lasting lifestyle change without restrictive diets.",
    qualifications: ["BSc Nutritional Science — University of Surrey", "MSc Clinical Nutrition — King's College London", "Registered Dietitian — HCPC"],
    languages: ["English", "Russian"],
    availableDays: ["Tuesday", "Thursday", "Saturday"],
    image: "https://images.unsplash.com/photo-1551836022-4c4c79ecde51?w=600&h=600&fit=crop&crop=face",
    consultationFee: 110,
    rating: 4.8,
    reviewCount: 293,
    featured: false,
  },
];

export const services: Service[] = [
  {
    id: "svc-001",
    slug: "gp-consultation",
    name: "GP Consultation",
    category: "general",
    description: "A comprehensive face-to-face or video consultation with one of our experienced GPs. Whether you have a new concern, need a follow-up, or require a referral to a specialist, our GPs take a holistic view of your health.",
    shortDescription: "Comprehensive same-day GP appointments with experienced practitioners.",
    duration: 20,
    price: 120,
    image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800&h=500&fit=crop",
    features: ["New & follow-up concerns", "Referral letters", "Sick notes & prescriptions", "Video or in-person", "Same-day availability"],
    featured: true,
  },
  {
    id: "svc-002",
    slug: "cardiology-assessment",
    name: "Cardiology Assessment",
    category: "cardiology",
    description: "A thorough cardiovascular assessment including ECG, blood pressure monitoring, and cholesterol screening. Our consultant cardiologist will assess your heart health, interpret results, and provide a detailed management plan.",
    shortDescription: "Full cardiovascular health screening with ECG and specialist review.",
    duration: 60,
    price: 350,
    image: "https://images.unsplash.com/photo-1551190822-a9333d879b1f?w=800&h=500&fit=crop",
    features: ["Resting 12-lead ECG", "Blood pressure monitoring", "Cholesterol & lipid panel", "Cardiac risk assessment", "Personalised heart health plan"],
    featured: true,
  },
  {
    id: "svc-003",
    slug: "dermatology-consultation",
    name: "Dermatology Consultation",
    category: "dermatology",
    description: "Expert assessment of skin conditions including acne, eczema, psoriasis, rosacea, and suspicious moles. Our dermatologist uses dermoscopy and advanced imaging to provide accurate diagnoses and effective treatment plans.",
    shortDescription: "Expert skin assessment with dermoscopy and tailored treatment plans.",
    duration: 30,
    price: 220,
    image: "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?w=800&h=500&fit=crop",
    features: ["Full skin examination", "Dermoscopy", "Mole mapping & screening", "Acne & eczema treatment", "Prescription skincare"],
    featured: true,
  },
  {
    id: "svc-004",
    slug: "physiotherapy-session",
    name: "Physiotherapy Session",
    category: "physiotherapy",
    description: "Personalised physiotherapy for musculoskeletal injuries, chronic pain, post-surgical rehabilitation, and sports performance. Our chartered physiotherapists use manual therapy, exercise prescription, and the latest rehabilitation techniques.",
    shortDescription: "Expert physiotherapy for injuries, pain, and rehabilitation.",
    duration: 45,
    price: 95,
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=500&fit=crop",
    features: ["Musculoskeletal assessment", "Manual therapy", "Exercise prescription", "Sports injury rehabilitation", "Post-surgical recovery"],
    featured: false,
  },
  {
    id: "svc-005",
    slug: "mental-health-consultation",
    name: "Mental Health Consultation",
    category: "mental-health",
    description: "A confidential, compassionate consultation with our consultant psychiatrist. Whether you are experiencing anxiety, depression, stress, or other mental health challenges, we provide evidence-based assessment and a personalised care plan.",
    shortDescription: "Confidential mental health assessment with consultant psychiatrist.",
    duration: 60,
    price: 250,
    image: "https://images.unsplash.com/photo-1493836512294-502baa1986e2?w=800&h=500&fit=crop",
    features: ["Comprehensive mental health assessment", "Medication review & management", "Referrals to therapists", "ADHD & anxiety screening", "Crisis support planning"],
    featured: true,
  },
  {
    id: "svc-006",
    slug: "nutrition-consultation",
    name: "Nutrition & Dietetics",
    category: "nutrition",
    description: "Evidence-based nutritional support tailored to your health goals. Our registered dietitian will assess your dietary habits, run relevant tests, and create a sustainable nutrition plan for weight management, gut health, sports performance, or chronic disease management.",
    shortDescription: "Personalised nutrition plans from a registered dietitian.",
    duration: 45,
    price: 110,
    image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800&h=500&fit=crop",
    features: ["Full dietary assessment", "Body composition analysis", "Gut health optimisation", "Sports nutrition", "Follow-up support"],
    featured: false,
  },
  {
    id: "svc-007",
    slug: "full-health-screen",
    name: "Executive Health Screen",
    category: "diagnostics",
    description: "Our comprehensive health screen covers over 50 biomarkers including full blood count, liver and kidney function, hormones, thyroid, vitamins, and cardiovascular risk markers. Includes a 30-minute GP review of all results.",
    shortDescription: "50+ biomarker blood panel with GP results review.",
    duration: 90,
    price: 495,
    image: "https://images.unsplash.com/photo-1530026405186-ed1f139313f3?w=800&h=500&fit=crop",
    features: ["Full blood count", "Liver & kidney function", "Thyroid panel", "Hormone profiling", "Vitamin D, B12 & iron", "Cardiovascular risk markers", "GP results review"],
    featured: true,
  },
  {
    id: "svc-008",
    slug: "womens-health",
    name: "Women's Health Clinic",
    category: "womens-health",
    description: "Dedicated women's health services including cervical screening, contraception advice, menopause management, PCOS assessment, and fertility discussions. Our GPs provide sensitive, confidential, and patient-centred care.",
    shortDescription: "Comprehensive women's health services in a safe, confidential setting.",
    duration: 30,
    price: 150,
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&h=500&fit=crop",
    features: ["Cervical screening (smear test)", "Contraception review", "Menopause management", "PCOS & hormonal imbalance", "Fertility discussions"],
    featured: false,
  },
];

export const offers: Offer[] = [
  {
    id: "off-001",
    slug: "new-patient-welcome",
    title: "New Patient Welcome Package",
    description: "First time at VitalCare? Get 20% off your first consultation with any of our GPs. Includes a free basic health assessment form and priority booking for follow-ups.",
    originalPrice: 120,
    discountedPrice: 96,
    validUntil: "2026-06-30",
    category: "General Practice",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&h=500&fit=crop",
    badge: "20% Off",
    featured: true,
  },
  {
    id: "off-002",
    slug: "executive-health-bundle",
    title: "Executive Health Bundle",
    description: "Our most popular bundle: Executive Health Screen (50+ biomarkers) + GP results review + Nutrition consultation. Everything you need to understand your body and take control of your health.",
    originalPrice: 605,
    discountedPrice: 449,
    validUntil: "2026-05-31",
    category: "Diagnostics",
    image: "https://images.unsplash.com/photo-1559757175-5700dde675bc?w=800&h=500&fit=crop",
    badge: "Save £156",
    featured: true,
  },
  {
    id: "off-003",
    slug: "heart-health-package",
    title: "Heart Health Package",
    description: "Cardiology consultation + ECG + full lipid and cardiovascular biomarker panel. Know your heart health inside out with our consultant cardiologist.",
    originalPrice: 480,
    discountedPrice: 350,
    validUntil: "2026-07-31",
    category: "Cardiology",
    image: "https://images.unsplash.com/photo-1530026405186-ed1f139313f3?w=800&h=500&fit=crop",
    badge: "Save £130",
    featured: true,
  },
  {
    id: "off-004",
    slug: "physio-5-session-pack",
    title: "Physiotherapy 5-Session Pack",
    description: "Commit to your recovery with our 5-session physiotherapy pack. Includes initial assessment, tailored exercise plan, and priority appointment scheduling throughout your treatment.",
    originalPrice: 475,
    discountedPrice: 375,
    validUntil: "2026-08-31",
    category: "Physiotherapy",
    image: "https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?w=800&h=500&fit=crop",
    badge: "Save £100",
    featured: false,
  },
  {
    id: "off-005",
    slug: "mental-wellness-package",
    title: "Mental Wellness Package",
    description: "Psychiatry consultation + 3 follow-up sessions + nutrition assessment for gut-brain connection. A holistic approach to mental wellbeing.",
    originalPrice: 690,
    discountedPrice: 545,
    validUntil: "2026-06-30",
    category: "Mental Health",
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&h=500&fit=crop",
    badge: "Save £145",
    featured: false,
  },
];

export const AVAILABLE_TIMES = [
  "08:00", "08:30", "09:00", "09:30", "10:00", "10:30",
  "11:00", "11:30", "12:00", "13:00", "13:30", "14:00",
  "14:30", "15:00", "15:30", "16:00", "16:30", "17:00",
];

export const DEMO_APPOINTMENTS: Appointment[] = [
  {
    id: "APT-001",
    patientName: "Alice Hargreaves",
    patientEmail: "alice@example.com",
    patientPhone: "07700 900001",
    doctorId: "dr-001",
    serviceId: "svc-001",
    date: "2026-05-05",
    time: "09:00",
    type: "in-person",
    status: "Confirmed",
    notes: "Follow-up on blood pressure management",
    createdAt: "2026-04-28T10:00:00Z",
  },
  {
    id: "APT-002",
    patientName: "Robert Chen",
    patientEmail: "robert@example.com",
    patientPhone: "07700 900002",
    doctorId: "dr-002",
    serviceId: "svc-002",
    date: "2026-05-06",
    time: "11:00",
    type: "in-person",
    status: "Pending",
    notes: "First cardiology assessment, family history of heart disease",
    createdAt: "2026-04-29T14:30:00Z",
  },
  {
    id: "APT-003",
    patientName: "Maya Patel",
    patientEmail: "maya@example.com",
    patientPhone: "07700 900003",
    doctorId: "dr-003",
    serviceId: "svc-003",
    date: "2026-05-07",
    time: "14:00",
    type: "in-person",
    status: "Confirmed",
    notes: "Eczema flare-up on arms and legs",
    createdAt: "2026-04-30T09:15:00Z",
  },
  {
    id: "APT-004",
    patientName: "Tom Williams",
    patientEmail: "tom@example.com",
    patientPhone: "07700 900004",
    doctorId: "dr-004",
    serviceId: "svc-004",
    date: "2026-05-08",
    time: "10:30",
    type: "in-person",
    status: "Confirmed",
    notes: "Rotator cuff injury — 4 weeks post-op",
    createdAt: "2026-05-01T08:00:00Z",
  },
  {
    id: "APT-005",
    patientName: "Sarah Johnson",
    patientEmail: "sarah@example.com",
    patientPhone: "07700 900005",
    doctorId: "dr-005",
    serviceId: "svc-005",
    date: "2026-05-09",
    time: "15:00",
    type: "video",
    status: "Pending",
    notes: "Anxiety and sleep issues, no prior psychiatric history",
    createdAt: "2026-05-01T11:45:00Z",
  },
  {
    id: "APT-006",
    patientName: "James McKenzie",
    patientEmail: "james@example.com",
    patientPhone: "07700 900006",
    doctorId: "dr-001",
    serviceId: "svc-007",
    date: "2026-05-05",
    time: "08:30",
    type: "in-person",
    status: "Completed",
    notes: "Annual executive health screen — results reviewed",
    createdAt: "2026-04-15T09:00:00Z",
  },
];
