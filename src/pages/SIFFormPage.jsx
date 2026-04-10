import { useState } from "react";
import { FormProvider, useForm } from "../context/FormContext";
import { SECTIONS } from "../utils/constants";
import { generatePDF } from "../utils/pdfGenerator";
import { InstitutionSection } from "../components/sections/InstitutionSection";
import { CoursesSection } from "../components/sections/CoursesSection";
import { InfrastructureSection } from "../components/sections/InfrastructureSection";
import { FacultySection } from "../components/sections/FacultySection";
import { NonTeachingSection } from "../components/sections/NonTeachingSection";
import { LabsSection } from "../components/sections/LabsSection";
import { EquipmentSection } from "../components/sections/EquipmentSection";
import { CurriculumSection } from "../components/sections/CurriculumSection";
import { LibrarySection } from "../components/sections/LibrarySection";
import { FinanceSection } from "../components/sections/FinanceSection";
import { ResearchSection } from "../components/sections/ResearchSection";
import { ComplianceSection } from "../components/sections/ComplianceSection";

const sectionComponents = [
  InstitutionSection, CoursesSection, InfrastructureSection, FacultySection,
  NonTeachingSection, LabsSection, EquipmentSection, CurriculumSection,
  LibrarySection, FinanceSection, ResearchSection, ComplianceSection
];

function SIFFormContent() {
  const [currentSection, setCurrentSection] = useState(0);
  const [savedDrafts, setSavedDrafts] = useState({});
  const { formData } = useForm();

  const saveDraft = (secIdx) => {
    setSavedDrafts(d => ({ ...d, [secIdx]: { ...formData, savedAt: new Date().toISOString() } }));
    alert(`Section "${SECTIONS[secIdx]}" saved as draft ✓`);
  };

  const goToSection = (n) => { setCurrentSection(n); window.scrollTo({ top:0, behavior:"smooth" }); };

  const CurrentSectionComponent = sectionComponents[currentSection];

  const S = {
    wrap:   { fontFamily:"'DM Sans', sans-serif", background:"#f7f8fa", minHeight:"100vh", fontSize:14 },
    header: { background:"#0d1b2a", color:"#fff", position:"sticky", top:0, zIndex:100, boxShadow:"0 2px 12px rgba(0,0,0,.25)" },
    hInner: { display:"flex", alignItems:"center", gap:12, padding:"12px 28px", borderBottom:"1px solid rgba(255,255,255,.08)" },
    badge:  { background:"#c8973a", color:"#0d1b2a", fontSize:10, fontWeight:700, padding:"3px 8px", borderRadius:4, letterSpacing:"0.08em" },
    hTitle: { fontSize:15, fontWeight:500, flex:1 },
    sess:   { fontFamily:"monospace", fontSize:12, color:"#e8b35a", background:"rgba(200,151,58,.12)", border:"1px solid rgba(200,151,58,.25)", padding:"4px 10px", borderRadius:4 },
    navBar: { background:"#1a2f45", overflowX:"auto", scrollbarWidth:"none" },
    navInner:{ display:"flex", padding:"0 20px", minWidth:"max-content" },
    layout: { display:"grid", gridTemplateColumns:"220px 1fr 260px", minHeight:"calc(100vh - 88px)" },
    sidebar:{ background:"#fff", borderRight:"1px solid #e2e6ec", padding:"20px 0", position:"sticky", top:88, height:"calc(100vh - 88px)", overflowY:"auto" },
    main:   { padding:"28px", maxWidth:900 },
    panel:  { background:"#fff", borderLeft:"1px solid #e2e6ec", padding:"20px", position:"sticky", top:88, height:"calc(100vh - 88px)", overflowY:"auto" },
    btnRow: { display:"flex", alignItems:"center", justifyContent:"space-between", marginTop:24, paddingTop:18, borderBottom:0, borderTop:"1px solid #e2e6ec" },
    btn:    (v) => ({ display:"inline-flex", alignItems:"center", gap:6, padding:"9px 18px", borderRadius:8, fontFamily:"'DM Sans', sans-serif", fontSize:13, fontWeight:500, cursor:"pointer", border:"none", transition:"all 0.15s", ...(v === "primary" ? { background:"#0d1b2a", color:"#fff" } : v === "accent" ? { background:"#c8973a", color:"#0d1b2a", fontWeight:700 } : v === "draft" ? { background:"#fdf3e3", color:"#8a5000", border:"1px solid rgba(200,151,58,.3)" } : { background:"transparent", color:"#4a5568", border:"1px solid #e2e6ec" }) }),
  };

  const NavStep = ({ i, label }) => {
    const active = i === currentSection;
    const done = i < currentSection;
    return (
      <div onClick={() => goToSection(i)} style={{ display:"flex", alignItems:"center", gap:8,
        padding:"10px 14px", cursor:"pointer", fontSize:12, whiteSpace:"nowrap",
        color: active ? "#e8b35a" : done ? "rgba(255,255,255,.6)" : "rgba(255,255,255,.4)",
        borderBottom:`2px solid ${active ? "#c8973a" : "transparent"}`, transition:"all 0.2s",
        userSelect:"none" }}>
        <span style={{ width:20, height:20, borderRadius:"50%", display:"flex", alignItems:"center",
          justifyContent:"center", fontSize:10, fontWeight:700, flexShrink:0,
          background: active ? "#c8973a" : done ? "#1e8a7a" : "rgba(255,255,255,.1)",
          color: active || done ? "#fff" : "rgba(255,255,255,.5)" }}>{i+1}</span>
        {label}
        {savedDrafts[i] && <span style={{ fontSize:9, background:"rgba(200,151,58,.25)", color:"#e8b35a", padding:"1px 4px", borderRadius:3 }}>DRAFT</span>}
      </div>
    );
  };

  const SideItem = ({ i, label }) => (
    <div onClick={() => goToSection(i)} style={{ display:"flex", alignItems:"center", gap:10,
      padding:"8px 18px", cursor:"pointer", fontSize:13, transition:"all 0.15s",
      color: i === currentSection ? "#c8973a" : "#4a5568",
      borderLeft:`2px solid ${i === currentSection ? "#c8973a" : "transparent"}`,
      background: i === currentSection ? "#fdf3e3" : "transparent",
      fontWeight: i === currentSection ? 500 : 400 }}>
      <span style={{ width:6, height:6, borderRadius:"50%", flexShrink:0,
        background: savedDrafts[i] ? "#1e8a7a" : i === currentSection ? "#c8973a" : "#e2e6ec" }} />
      {label}
    </div>
  );

  return (
    <div style={S.wrap}>
      <header style={S.header}>
        <div style={S.hInner}>
          <span style={S.badge}>PCI</span>
          <span style={S.hTitle}>Standard Inspection Form <span style={{ color:"rgba(255,255,255,.4)", fontWeight:300 }}>/ DIGI-PHARMed Portal</span></span>
          <span style={S.sess}>AY 2026–27</span>
        </div>
        <div style={S.navBar}>
          <div style={S.navInner}>
            {SECTIONS.map((s, i) => <NavStep key={i} i={i} label={s} />)}
          </div>
        </div>
      </header>

      <div style={S.layout}>
        <aside style={S.sidebar}>
          <div style={{ fontSize:10, fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase", color:"#8a97a8", padding:"0 18px 8px" }}>Navigation</div>
          {SECTIONS.map((s, i) => <SideItem key={i} i={i} label={s} />)}
        </aside>

        <main style={S.main}>
          <CurrentSectionComponent />
          <div style={S.btnRow}>
            <button style={S.btn("outline")} onClick={() => currentSection > 0 && goToSection(currentSection - 1)}>← Back</button>
            <div style={{ display:"flex", gap:10 }}>
              <button style={S.btn("draft")} onClick={() => saveDraft(currentSection)}>💾 Save Draft</button>
              {currentSection < SECTIONS.length - 1 && (
                <button style={S.btn("primary")} onClick={() => goToSection(currentSection + 1)}>
                  Next: {SECTIONS[currentSection + 1]} →
                </button>
              )}
              {currentSection === SECTIONS.length - 1 && (
                <button style={S.btn("accent")} onClick={() => generatePDF(formData)}>🖨 Generate PDF</button>
              )}
            </div>
          </div>
        </main>

        <aside style={S.panel}>
          <div style={{ fontSize:10, fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase", color:"#8a97a8", marginBottom:14 }}>Compliance Summary</div>
          {[["2","Total Deficiencies","Must resolve before submission","#c0392b"],
            ["3","Warnings","Can submit with flag","#8a6000"],
            ["68%","Completion","8 of 12 sections done","#0d1b2a"]].map(([val, label, meta, col]) => (
            <div key={label} style={{ background:"#f7f8fa", borderRadius:8, padding:"12px 14px", marginBottom:10, border:"1px solid #e2e6ec" }}>
              <div style={{ fontSize:10, color:"#8a97a8", marginBottom:4 }}>{label}</div>
              <div style={{ fontSize:22, fontWeight:700, fontFamily:"monospace", color:col }}>{val}</div>
              <div style={{ fontSize:11, color:"#8a97a8", marginTop:2 }}>{meta}</div>
            </div>
          ))}
          <div style={{ fontSize:10, fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase", color:"#8a97a8", margin:"18px 0 10px" }}>Deficiencies</div>
          {[
            ["error","Faculty Gap","Pharmacy Practice short 1 Prof/Assoc.Prof (Intake 100). App.-A, Cl.3(iii)"],
            ["error","Missing Doc","Building Fire Safety Certificate not uploaded."],
            ["warn","Lab Attenders","6 declared vs. 8 required (1 per lab)."],
            ["warn","Working Days","B.Pharm: 180 vs. 200 required."],
          ].map(([type, title, desc]) => (
            <div key={title} style={{ display:"flex", gap:10, padding:"10px", borderRadius:8, marginBottom:8, fontSize:12,
              background: type === "error" ? "#fdf0ef" : "#fdf3e3",
              border: `1px solid ${type === "error" ? "rgba(192,57,43,.15)" : "rgba(200,151,58,.2)"}` }}>
              <span style={{ flexShrink:0, fontSize:14 }}>{type === "error" ? "✗" : "⚠"}</span>
              <div><strong style={{ display:"block", marginBottom:2, color: type === "error" ? "#c0392b" : "#8a6000" }}>{title}</strong><span style={{ color: type === "error" ? "#7a2020" : "#7a5800" }}>{desc}</span></div>
            </div>
          ))}
          <div style={{ fontSize:10, fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase", color:"#8a97a8", margin:"18px 0 10px" }}>All Clear</div>
          {[["Land Area","2.68 acres — meets norms."],["CIR Equipment","All 13 items present."],["NAAC","Grade A · Valid until Dec 2025."]].map(([t,d]) => (
            <div key={t} style={{ display:"flex", gap:10, padding:"8px 10px", borderRadius:8, marginBottom:6, fontSize:12, background:"#eaf5ee", border:"1px solid rgba(26,122,74,.15)" }}>
              <span style={{ color:"#1a7a4a", flexShrink:0 }}>✓</span>
              <div><strong style={{ color:"#1a7a4a" }}>{t}</strong> — {d}</div>
            </div>
          ))}
        </aside>
      </div>
    </div>
  );
}

export function SIFFormPage() {
  return (
    <FormProvider>
      <SIFFormContent />
    </FormProvider>
  );
}