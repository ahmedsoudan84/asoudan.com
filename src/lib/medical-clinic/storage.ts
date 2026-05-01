import type { Appointment, PatientRecord, MedicalFile } from "./data";
import { DEMO_APPOINTMENTS } from "./data";

/* ── Appointments ─────────────────────────────────────────────── */

const APPT_KEY = "vc_appointments";

export function getAppointments(): Appointment[] {
  if (typeof window === "undefined") return DEMO_APPOINTMENTS;
  try {
    const raw = localStorage.getItem(APPT_KEY);
    if (!raw) {
      localStorage.setItem(APPT_KEY, JSON.stringify(DEMO_APPOINTMENTS));
      return DEMO_APPOINTMENTS;
    }
    return JSON.parse(raw) as Appointment[];
  } catch {
    return DEMO_APPOINTMENTS;
  }
}

export function addAppointment(appt: Appointment): void {
  if (typeof window === "undefined") return;
  const list = getAppointments();
  list.push(appt);
  localStorage.setItem(APPT_KEY, JSON.stringify(list));
}

export function updateAppointment(id: string, patch: Partial<Appointment>): void {
  if (typeof window === "undefined") return;
  const list = getAppointments().map((a) => (a.id === id ? { ...a, ...patch } : a));
  localStorage.setItem(APPT_KEY, JSON.stringify(list));
}

export function deleteAppointment(id: string): void {
  if (typeof window === "undefined") return;
  const list = getAppointments().filter((a) => a.id !== id);
  localStorage.setItem(APPT_KEY, JSON.stringify(list));
}

export function getAppointmentsByPatientEmail(email: string): Appointment[] {
  return getAppointments().filter((a) => a.patientEmail.toLowerCase() === email.toLowerCase());
}

/* ── Patient Records ──────────────────────────────────────────── */

const PATIENT_KEY = "vc_patients";

const DEMO_PATIENT: PatientRecord = {
  id: "pat-demo",
  firstName: "Alex",
  lastName: "Demo",
  email: "patient@demo.com",
  phone: "07700 900000",
  dateOfBirth: "1990-03-15",
  bloodType: "O+",
  allergies: ["Penicillin", "Pollen"],
  medications: ["Lisinopril 10mg", "Atorvastatin 20mg"],
  conditions: ["Hypertension", "Seasonal Allergies"],
  files: [
    {
      id: "file-001",
      name: "Full Blood Count — April 2026",
      type: "blood-test",
      date: "2026-04-10",
      notes: "Haemoglobin slightly low at 11.8 g/dL. Recommended dietary iron increase.",
    },
    {
      id: "file-002",
      name: "Chest X-Ray — March 2026",
      type: "scan",
      date: "2026-03-22",
      notes: "No significant abnormalities detected.",
    },
    {
      id: "file-003",
      name: "GP Letter — Cardiology Referral",
      type: "report",
      date: "2026-02-14",
      notes: "Referral to Dr James Osei for cardiovascular risk assessment.",
    },
  ],
  registeredAt: "2025-11-01T09:00:00Z",
};

export function getPatientByEmail(email: string): PatientRecord | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(PATIENT_KEY);
    const list: PatientRecord[] = raw ? JSON.parse(raw) : [DEMO_PATIENT];
    if (!raw) localStorage.setItem(PATIENT_KEY, JSON.stringify([DEMO_PATIENT]));
    return list.find((p) => p.email.toLowerCase() === email.toLowerCase()) ?? null;
  } catch {
    return null;
  }
}

export function registerPatient(patient: PatientRecord): void {
  if (typeof window === "undefined") return;
  try {
    const raw = localStorage.getItem(PATIENT_KEY);
    const list: PatientRecord[] = raw ? JSON.parse(raw) : [DEMO_PATIENT];
    list.push(patient);
    localStorage.setItem(PATIENT_KEY, JSON.stringify(list));
  } catch {
    /* noop */
  }
}

export function updatePatient(email: string, patch: Partial<PatientRecord>): void {
  if (typeof window === "undefined") return;
  try {
    const raw = localStorage.getItem(PATIENT_KEY);
    const list: PatientRecord[] = raw ? JSON.parse(raw) : [DEMO_PATIENT];
    const updated = list.map((p) =>
      p.email.toLowerCase() === email.toLowerCase() ? { ...p, ...patch } : p
    );
    localStorage.setItem(PATIENT_KEY, JSON.stringify(updated));
  } catch {
    /* noop */
  }
}

export function addMedicalFile(email: string, file: MedicalFile): void {
  if (typeof window === "undefined") return;
  const patient = getPatientByEmail(email);
  if (!patient) return;
  const updatedFiles = [...patient.files, file];
  updatePatient(email, { files: updatedFiles });
}

export function getAllPatients(): PatientRecord[] {
  if (typeof window === "undefined") return [DEMO_PATIENT];
  try {
    const raw = localStorage.getItem(PATIENT_KEY);
    if (!raw) {
      localStorage.setItem(PATIENT_KEY, JSON.stringify([DEMO_PATIENT]));
      return [DEMO_PATIENT];
    }
    return JSON.parse(raw) as PatientRecord[];
  } catch {
    return [DEMO_PATIENT];
  }
}
