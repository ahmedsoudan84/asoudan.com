import type { Appointment, PatientRecord, MedicalFile } from "./data";
import { DEMO_APPOINTMENTS } from "./data";

/* ── Helpers ──────────────────────────────────────────────────── */

const APPT_ADDED_KEY    = "vitalcare-appointments";      // user-booked appointments
const APPT_OVERRIDES_KEY = "vitalcare-appt-overrides";  // admin status/field changes
const APPT_DELETED_KEY  = "vitalcare-appt-deleted";     // admin deletions
const PATIENT_KEY       = "vitalcare-patients";          // registered + updated patients

function readJSON<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function writeJSON(key: string, value: unknown): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* noop */
  }
}

/* ── Appointments ─────────────────────────────────────────────── */
// Static DEMO_APPOINTMENTS always come from data.ts — never seeded into
// localStorage. Admin changes are stored as overlays so demo data is
// always restorable (same pattern as ecommerce / elite-diner templates).

export function getAppointments(): Appointment[] {
  if (typeof window === "undefined") return DEMO_APPOINTMENTS;
  const added     = readJSON<Appointment[]>(APPT_ADDED_KEY, []);
  const overrides = readJSON<Record<string, Partial<Appointment>>>(APPT_OVERRIDES_KEY, {});
  const deleted   = readJSON<string[]>(APPT_DELETED_KEY, []);
  return [...DEMO_APPOINTMENTS, ...added]
    .filter((a) => !deleted.includes(a.id))
    .map((a) => (overrides[a.id] ? { ...a, ...overrides[a.id] } : a));
}

export function addAppointment(appt: Appointment): void {
  if (typeof window === "undefined") return;
  const list = readJSON<Appointment[]>(APPT_ADDED_KEY, []);
  writeJSON(APPT_ADDED_KEY, [...list, appt]);
}

export function updateAppointment(id: string, patch: Partial<Appointment>): void {
  if (typeof window === "undefined") return;
  const overrides = readJSON<Record<string, Partial<Appointment>>>(APPT_OVERRIDES_KEY, {});
  overrides[id] = { ...(overrides[id] ?? {}), ...patch };
  writeJSON(APPT_OVERRIDES_KEY, overrides);
}

export function deleteAppointment(id: string): void {
  if (typeof window === "undefined") return;
  // If it's a user-booked appointment, remove from added list
  const added = readJSON<Appointment[]>(APPT_ADDED_KEY, []);
  const filtered = added.filter((a) => a.id !== id);
  if (filtered.length < added.length) {
    writeJSON(APPT_ADDED_KEY, filtered);
    return;
  }
  // Otherwise it's a demo appointment — add to deleted set
  const deleted = readJSON<string[]>(APPT_DELETED_KEY, []);
  if (!deleted.includes(id)) writeJSON(APPT_DELETED_KEY, [...deleted, id]);
}

export function getAppointmentsByPatientEmail(email: string): Appointment[] {
  return getAppointments().filter(
    (a) => a.patientEmail.toLowerCase() === email.toLowerCase()
  );
}

/* ── Patient Records ──────────────────────────────────────────── */
// DEMO_PATIENT is the static baseline for patient@demo.com.
// Registered patients and any updates go to localStorage under vitalcare-patients.
// getAllPatients() merges the demo patient with localStorage records.

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
  const stored = readJSON<PatientRecord[]>(PATIENT_KEY, []);
  const override = stored.find((p) => p.email.toLowerCase() === email.toLowerCase());
  if (override) return override;
  if (DEMO_PATIENT.email.toLowerCase() === email.toLowerCase()) return DEMO_PATIENT;
  return null;
}

export function registerPatient(patient: PatientRecord): void {
  if (typeof window === "undefined") return;
  const list = readJSON<PatientRecord[]>(PATIENT_KEY, []);
  writeJSON(PATIENT_KEY, [...list, patient]);
}

export function updatePatient(email: string, patch: Partial<PatientRecord>): void {
  if (typeof window === "undefined") return;
  const list = readJSON<PatientRecord[]>(PATIENT_KEY, []);
  const idx = list.findIndex((p) => p.email.toLowerCase() === email.toLowerCase());
  if (idx !== -1) {
    list[idx] = { ...list[idx], ...patch };
    writeJSON(PATIENT_KEY, list);
  } else {
    // Promote demo patient to localStorage with patch applied
    const base = DEMO_PATIENT.email.toLowerCase() === email.toLowerCase()
      ? DEMO_PATIENT
      : ({ email } as PatientRecord);
    writeJSON(PATIENT_KEY, [...list, { ...base, ...patch }]);
  }
}

export function addMedicalFile(email: string, file: MedicalFile): void {
  const patient = getPatientByEmail(email);
  if (!patient) return;
  updatePatient(email, { files: [...patient.files, file] });
}

export function getAllPatients(): PatientRecord[] {
  if (typeof window === "undefined") return [DEMO_PATIENT];
  const stored = readJSON<PatientRecord[]>(PATIENT_KEY, []);
  const hasDemoOverride = stored.some(
    (p) => p.email.toLowerCase() === DEMO_PATIENT.email.toLowerCase()
  );
  return hasDemoOverride ? stored : [DEMO_PATIENT, ...stored];
}
