import type { Service } from "./data";
import { services, doctors } from "./data";

/* ── Symptom → Specialist Matcher ─────────────────────────────── */

interface SymptomResult {
  urgency: "emergency" | "urgent" | "routine" | "lifestyle";
  conditions: string[];
  recommendedService: Service | null;
  doctorName: string;
  advice: string;
  disclaimer: string;
}

const SYMPTOM_MAP: Array<{
  keywords: string[];
  urgency: SymptomResult["urgency"];
  conditions: string[];
  serviceSlug: string;
  advice: string;
}> = [
  {
    keywords: ["chest pain", "chest tightness", "heart attack", "palpitation", "irregular heartbeat", "shortness of breath", "breathless"],
    urgency: "emergency",
    conditions: ["Cardiac event", "Angina", "Arrhythmia"],
    serviceSlug: "cardiology-assessment",
    advice: "IMPORTANT: If you are experiencing severe chest pain right now, please call 999 immediately. For non-emergency cardiac concerns, our cardiologist Dr James Osei can see you urgently.",
  },
  {
    keywords: ["anxiety", "panic", "panic attack", "depression", "sad", "mental health", "stress", "insomnia", "sleep", "adhd", "focus", "mood"],
    urgency: "urgent",
    conditions: ["Anxiety disorder", "Depression", "Sleep disorder", "ADHD"],
    serviceSlug: "mental-health-consultation",
    advice: "Mental health concerns deserve prompt, expert attention. Dr Priya Sharma offers a confidential, compassionate assessment. Video appointments are available.",
  },
  {
    keywords: ["skin", "rash", "eczema", "psoriasis", "acne", "mole", "spot", "itchy", "dermatitis", "hives", "rosacea"],
    urgency: "routine",
    conditions: ["Eczema / Dermatitis", "Psoriasis", "Acne", "Rosacea", "Contact dermatitis"],
    serviceSlug: "dermatology-consultation",
    advice: "Dr Amelia Chen can assess your skin condition, perform dermoscopy, and create a personalised treatment plan. Early assessment of moles is always recommended.",
  },
  {
    keywords: ["back pain", "knee pain", "shoulder", "hip", "joint", "muscle", "injury", "sprain", "strain", "physiotherapy", "rehabilitation", "physio", "sport", "posture"],
    urgency: "routine",
    conditions: ["Musculoskeletal injury", "Chronic pain", "Post-surgical rehabilitation"],
    serviceSlug: "physiotherapy-session",
    advice: "Marcus Bell is our chartered physiotherapist. Early physiotherapy prevents chronic pain and speeds recovery. He sees patients 5 days a week.",
  },
  {
    keywords: ["diet", "weight", "nutrition", "gut", "bloating", "ibs", "irritable bowel", "food intolerance", "cholesterol", "energy", "fatigue", "vitamin"],
    urgency: "routine",
    conditions: ["Nutritional deficiency", "IBS", "Metabolic syndrome", "Weight management"],
    serviceSlug: "nutrition-consultation",
    advice: "Dr Elena Ross, our registered dietitian, takes an evidence-based approach to nutrition. She can identify deficiencies, optimise your gut health, and create a sustainable plan.",
  },
  {
    keywords: ["period", "menstrual", "menopause", "contraception", "fertility", "pregnancy", "smear", "cervical", "pcos", "endometriosis", "hormones"],
    urgency: "routine",
    conditions: ["Hormonal imbalance", "PCOS", "Menopause", "Contraception review"],
    serviceSlug: "womens-health",
    advice: "Our women's health clinic offers sensitive, confidential care. A GP with women's health expertise can assess your concerns and provide a clear management plan.",
  },
  {
    keywords: ["blood test", "checkup", "check up", "health screen", "cholesterol", "diabetes", "blood sugar", "annual", "executive", "biomarker"],
    urgency: "lifestyle",
    conditions: ["Preventive health screen", "Metabolic health review"],
    serviceSlug: "full-health-screen",
    advice: "Our Executive Health Screen covers 50+ biomarkers including full blood count, thyroid, hormones, vitamins, and cardiovascular markers — with a GP review of all results.",
  },
  {
    keywords: ["flu", "cold", "fever", "cough", "infection", "antibiotic", "prescription", "sick", "ill", "temperature", "uti", "urine"],
    urgency: "urgent",
    conditions: ["Viral / bacterial infection", "Respiratory illness", "UTI"],
    serviceSlug: "gp-consultation",
    advice: "Our GPs offer same-day appointments for acute illness. We can assess, diagnose, and prescribe where appropriate — both in person and via video.",
  },
];

export function analyseSymptoms(input: string): SymptomResult {
  const q = input.toLowerCase();

  for (const map of SYMPTOM_MAP) {
    const matched = map.keywords.some((kw) => q.includes(kw));
    if (matched) {
      const service = services.find((s) => s.slug === map.serviceSlug) ?? null;
      const doctor = doctors.find((d) =>
        service ? d.specialty.toLowerCase().includes(service.category.split("-")[0]) : false
      ) ?? doctors[0];

      return {
        urgency: map.urgency,
        conditions: map.conditions,
        recommendedService: service,
        doctorName: doctor.name,
        advice: map.advice,
        disclaimer:
          "This is an AI-assisted triage tool only and does not constitute a medical diagnosis. Always consult a qualified healthcare professional for medical advice.",
      };
    }
  }

  return {
    urgency: "routine",
    conditions: ["General health concern"],
    recommendedService: services.find((s) => s.slug === "gp-consultation") ?? null,
    doctorName: "Dr Sarah Mitchell",
    advice: "Our GPs are here to help with any concern, big or small. Book a consultation and let us help you get to the bottom of it.",
    disclaimer:
      "This is an AI-assisted triage tool only and does not constitute a medical diagnosis. Always consult a qualified healthcare professional for medical advice.",
  };
}

/* ── AI Chat Responses ─────────────────────────────────────────── */

const CHAT_RESPONSES: Record<string, string> = {
  default:
    "Hello! I'm the VitalCare AI health assistant. I can help you find the right specialist, answer questions about our services, or guide you through booking an appointment. How can I help you today?",
  book:
    "Booking an appointment is easy! Head to our Book page to choose your preferred doctor, service, date, and time. We offer same-day GP appointments, and specialist slots can usually be arranged within 2–5 days.",
  services:
    "We offer a wide range of services: GP Consultations, Cardiology, Dermatology, Physiotherapy, Mental Health, Nutrition & Dietetics, Executive Health Screening, and Women's Health. Which would you like to know more about?",
  doctors:
    "Our team includes GPs, a consultant cardiologist, dermatologist, chartered physiotherapist, consultant psychiatrist, and a registered dietitian. You can view full profiles and book directly on our Doctors page.",
  price:
    "GP consultations start at £120. Specialist consultations range from £95 (physiotherapy) to £350 (cardiology). Our Executive Health Screen is £495 and covers 50+ biomarkers. Check our Offers page for bundle deals.",
  hours:
    "The clinic is open Monday–Friday 8am–6pm, with Saturday appointments available for selected services. Video consultations can be arranged outside standard hours by request.",
  emergency:
    "If this is a medical emergency, please call 999 immediately or go to your nearest A&E. For urgent but non-emergency concerns, we offer same-day GP appointments — call us or book online now.",
  ai:
    "Our AI Symptom Checker can analyse your symptoms and recommend the right specialist — no waiting, no gatekeeping. It's designed to help you navigate your healthcare faster and more confidently. Head to the AI Tools page to try it.",
  mental:
    "Mental health is just as important as physical health. Dr Priya Sharma, our consultant psychiatrist, offers confidential assessments for anxiety, depression, ADHD, and more. Video appointments are available for added comfort.",
  insurance:
    "We work with most major private health insurers. Please mention your insurance provider when booking and we will confirm coverage before your appointment. We also offer competitive self-pay rates.",
  location:
    "VitalCare Clinic is located in central London, with excellent transport links. Full address and directions are on our Contact page. Parking is available nearby.",
};

export function getMedicalChatResponse(input: string): string {
  const q = input.toLowerCase();

  if (q.includes("999") || q.includes("emergency") || q.includes("dying") || q.includes("ambulance"))
    return CHAT_RESPONSES.emergency;
  if (q.includes("book") || q.includes("appoint") || q.includes("schedule"))
    return CHAT_RESPONSES.book;
  if (q.includes("service") || q.includes("treatment") || q.includes("offer") || q.includes("what do you"))
    return CHAT_RESPONSES.services;
  if (q.includes("doctor") || q.includes("specialist") || q.includes("gp") || q.includes("consultant"))
    return CHAT_RESPONSES.doctors;
  if (q.includes("price") || q.includes("cost") || q.includes("fee") || q.includes("how much") || q.includes("charge"))
    return CHAT_RESPONSES.price;
  if (q.includes("open") || q.includes("hours") || q.includes("time") || q.includes("saturday") || q.includes("weekend"))
    return CHAT_RESPONSES.hours;
  if (q.includes("mental") || q.includes("anxiety") || q.includes("depress") || q.includes("stress") || q.includes("adhd"))
    return CHAT_RESPONSES.mental;
  if (q.includes("insur") || q.includes("bupa") || q.includes("axa") || q.includes("private") || q.includes("cover"))
    return CHAT_RESPONSES.insurance;
  if (q.includes("ai") || q.includes("symptom") || q.includes("checker") || q.includes("diagnos"))
    return CHAT_RESPONSES.ai;
  if (q.includes("location") || q.includes("address") || q.includes("where") || q.includes("direction") || q.includes("park"))
    return CHAT_RESPONSES.location;

  return CHAT_RESPONSES.default;
}

/* ── Semantic Service Search ───────────────────────────────────── */

const SERVICE_SYNONYMS: Record<string, string[]> = {
  heart: ["cardiology", "cardiac", "ecg", "cholesterol", "blood pressure"],
  skin: ["dermatology", "eczema", "psoriasis", "acne", "mole", "rash"],
  physio: ["physiotherapy", "back", "knee", "shoulder", "joint", "pain", "rehabilitation"],
  mental: ["mental-health", "psychiatry", "anxiety", "depression", "adhd", "therapy"],
  gp: ["general", "doctor", "consultation", "sick", "illness", "prescription"],
  nutrition: ["diet", "weight", "gut", "bloating", "food", "vitamin"],
  women: ["womens-health", "menopause", "contraception", "period", "fertility", "smear"],
  screen: ["diagnostics", "blood test", "health check", "biomarker", "executive"],
};

function expandServiceQuery(query: string): string[] {
  const words = query.toLowerCase().split(/\s+/);
  const expanded = new Set(words);
  for (const word of words) {
    for (const [key, syns] of Object.entries(SERVICE_SYNONYMS)) {
      if (word === key || syns.some((s) => word.includes(s) || s.includes(word))) {
        expanded.add(key);
        syns.forEach((s) => expanded.add(s));
      }
    }
  }
  return Array.from(expanded);
}

export function searchServices(query: string, items: Service[]): Service[] {
  if (!query.trim()) return items;
  const tokens = expandServiceQuery(query);

  const scored = items.map((svc) => {
    const text = `${svc.name} ${svc.description} ${svc.category} ${svc.features.join(" ")}`.toLowerCase();
    let score = 0;
    for (const token of tokens) {
      if (text.includes(token)) score += 2;
      if (token.length > 3 && text.includes(token.slice(0, -1))) score += 1;
    }
    return { svc, score };
  });

  return scored
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((s) => s.svc);
}
