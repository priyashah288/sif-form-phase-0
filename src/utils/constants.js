export const SECTIONS = [
  "Institution Details","Courses & Intake","Infrastructure","Teaching Faculty",
  "Non-Teaching Staff","Laboratories","Equipment","Curriculum","Library","Finance","Research","Compliance"
];

export const QUALIFICATIONS = ["B.Pharm","M.Pharm","M.Pharm + Ph.D","Ph.D","Pharm.D","MBBS","M.Sc","B.E. (CS)","MCA","D.Pharm"];
export const DESIGNATIONS   = ["Director/Principal/HOI","Professor","Associate Professor","Assistant Professor","Lecturer"];
export const DEPARTMENTS    = ["Pharmaceutics","Pharmaceutical Chemistry","Pharmacology","Pharmacognosy","Pharmacy Practice","Administration","Pharmaceutical Biotechnology","Industrial Pharmacy"];
export const WORKLOADS      = ["8","12","16"];
export const INST_TYPES     = ["Private Autonomous Institute","Government Institute","Aided Institute","Deemed University"];
export const COURSES_LIST   = [
  { id:"bpharm", label:"B.Pharm", meta:"Bachelor of Pharmacy · Est. 2007–08 · Appendix-A, PCI 2014" },
  { id:"dpharm", label:"D.Pharm", meta:"Diploma in Pharmacy · ER-2020 · Gazette No. 435" },
  { id:"mpharm", label:"M.Pharm", meta:"Master of Pharmacy · Appendix-D, PCI 2014 · PG Course" },
  { id:"pharmd", label:"Pharm.D", meta:"Doctor of Pharmacy · Pharm.D Regulations 2008" },
];
export const MPHARM_SPECS   = ["Pharmaceutical Analysis","Pharmaceutics","Pharmacology","Pharmacognosy","Pharmacy Practice","Industrial Pharmacy","Pharmaceutical Technology","Pharmaceutical Quality Assurance","Regulatory Affairs","Pharmaceutical Biotechnology"];
export const COMMON_FACILITIES = [
  { name:"Auditorium",                 type:"Essential",   reqArea:300,   unit:"sq.mt" },
  { name:"Seminar Hall",               type:"Essential",   reqArea:100,   unit:"sq.mt" },
  { name:"Central Instrumentation Room",type:"Essential",  reqArea:80,    unit:"sq.mt" },
  { name:"Museum",                     type:"Essential",   reqArea:50,    unit:"sq.mt" },
  { name:"Machine Room",               type:"Essential",   reqArea:100,   unit:"sq.mt" },
  { name:"Herbal Garden",              type:"Essential",   reqArea:1,  unit:"count" },
  { name:"Store Room I (Main)",        type:"Essential",   reqArea:1,     unit:"count" },
  { name:"Store Room II (Inflammable)",type:"Essential",   reqArea:1,     unit:"count" },
  { name:"Preparation Room (per lab)", type:"Essential",   reqArea:10,    unit:"sq.mt" },
  { name:"First Aid Room",             type:"Essential",   reqArea:10,    unit:"sq.mt" },
  { name:"Boys' Common Room",          type:"Essential",   reqArea:60,    unit:"sq.mt" },
  { name:"Girls' Common Room",         type:"Essential",   reqArea:60,    unit:"sq.mt" },
  { name:"Animal House (PG only)",     type:"Conditional", reqArea:80,    unit:"sq.mt" },
  { name:"Boys' Hostel",               type:"Desirable",   reqArea:null,  unit:"count" },
  { name:"Girls' Hostel",              type:"Desirable",   reqArea:null,  unit:"count" },
  { name:"Canteen",                    type:"Essential",   reqArea:100,   unit:"sq.mt" },
  { name:"Drinking Water / Cooler",    type:"Essential",   reqArea:null,  unit:"—" },
  { name:"Power Backup",               type:"Desirable",   reqArea:null,  unit:"—" },
  { name:"CCTV Surveillance",          type:"Essential",   reqArea:null,  unit:"—" },
  { name:"Biometric Device",           type:"Essential",   reqArea:null,  unit:"—" },
  { name:"Smart Classroom",            type:"Desirable",   reqArea:null,  unit:"—" },
  { name:"Parking Area",               type:"Essential",   reqArea:null,  unit:"sq.mt" },
  { name:"Transport Facility",         type:"Desirable",   reqArea:null,  unit:"—" },
];
export const LAB_NAMES = [
  "Pharmaceutics & Pharmacokinetics Lab","Pharmaceutical Chemistry Lab",
  "Life Sciences Lab (Pharmacology/Physiology/Pathophysiology)","Pharmacognosy Lab",
  "Pharmaceutical Analysis Lab","Pharmaceutics Lab (D.Pharm)","Physiology, Pharmacology & Pharmacognosy Lab (D.Pharm)",
  "Pharmaceutical Chemistry / Biochemistry Lab (D.Pharm)","Hospital & Clinical Pharmacy Lab (D.Pharm)",
  "Instrumentation Lab (M.Pharm)","Research Lab (M.Pharm)","Pharmacy Practice Lab (Pharm.D)","Skill Development Lab",
];