import { useState } from "react";
import { useForm } from "../../context/FormContext";
import { UploadField, ChecklistItem } from "../common";
import { inputStyle } from "../../styles/inputStyle";
import { generatePDF } from "../../utils/pdfGenerator";
import React from "react";
const S = {
  card:   { background:"#fff", border:"1px solid #e2e6ec", borderRadius:14, padding:22, marginBottom:18 },
  cardT:  { fontSize:13, fontWeight:600, color:"#0d1b2a", marginBottom:16, display:"flex", alignItems:"center", gap:8 },
  secHdr: { marginBottom:24, paddingBottom:18, borderBottom:"1px solid #e2e6ec" },
  secTag: { fontFamily:"monospace", fontSize:10, fontWeight:500, color:"#c8973a", letterSpacing:"0.08em", textTransform:"uppercase", marginBottom:6 },
  secTitle:{ fontSize:20, fontWeight:700, color:"#0d1b2a", marginBottom:4 },
  grid2:  { display:"grid", gridTemplateColumns:"1fr 1fr", gap:14 },
  alert:  () => ({ display:"flex", gap:10, padding:"11px 14px", borderRadius:8, marginBottom:14, fontSize:12,
    background:"#fdf3e3", border:"1px solid rgba(200,151,58,.25)", color:"#7a5800" }),
  btn:    { background:"#c8973a", color:"#0d1b2a", fontWeight:700, padding:"12px 28px", borderRadius:8,
    border:"none", cursor:"pointer", fontSize:14, width:"100%", justifyContent:"center", display:"flex", alignItems:"center", gap:6 },
};

const CardTitle = ({ children }) => (
  <div style={S.cardT}>
    <span style={{ width:3, height:14, background:"#c8973a", borderRadius:2, flexShrink:0 }} />
    {children}
  </div>
);

const Field = ({ label, required, children }) => {
  const id = label?.toLowerCase().replace(/\s/g, "-") || Math.random().toString(36);
  return (
    <div style={{ display:"flex", flexDirection:"column", gap:4 }}>
      {label && <label htmlFor={id} style={{ fontSize:12, fontWeight:500, color:"#4a5568" }}>{label}{required && <span style={{ color:"#c0392b" }}>*</span>}</label>}
      {React.isValidElement(children) ? React.cloneElement(children, { id, name: id }) : children}
    </div>
  );
};

export function ComplianceSection() {
  const { formData } = useForm();
  const [declared, setDeclared] = useState(false);

  const checklistGroups = [
    ["Admission & Approval", [
      ["10+2 mark sheet verified — English, Physics, Chemistry, Maths/Biology","Reg. 4(A)(i)"],
      ["NIOS/open school certificates excluded (ineligible category)","Reg. 4(A)(i) Proviso"],
      ["Total admissions within PCI-prescribed intake","Reg. 5"],
      ["PCI prior approval obtained before course commencement","Reg. 9(1)"],
    ]],
    ["Teaching Faculty", [
      ["All faculty appointment orders confirmed as FULL-TIME","Appendix-A, Cl.3(i) | MQT 2014"],
      ["1 Director / Principal / HOI appointed","Appendix-A, Cl.3(ii)"],
      ["All faculty registered with State Pharmacy Council","MQT 2014, Cl.(ii)"],
      ["No concurrent employment — Staff Declaration Form verified","MQT 2014, Cl.(x)"],
      ["Workload verified: Prof.=8 · Asst.Prof.=12 · Lecturer=16 hrs/wk","Appendix-A, Cl.3(v)"],
    ]],
    ["Infrastructure & Labs", [
      ["Minimum 2 lecture halls available (36 sq.mt each)","Appendix-A, Cl.5"],
      ["8 labs present for B.Pharm (2+2+2+1+1)","Appendix-A, Cl.5"],
      ["Lab area ≥ 900 sq.ft and ≥ 30 sq.ft per concurrent student","Appendix-A, Cl.5"],
      ["Balance room, aseptic cabinet, animal house, machine room available","Appendix-A, Cl.5"],
    ]],
  ];

  return (
    <div>
      <div style={S.secHdr}>
        <div style={S.secTag}>Section 12</div>
        <h1 style={S.secTitle}>Compliance Checklist &amp; Submission</h1>
      </div>

      {checklistGroups.map(([group, items]) => (
        <div key={group} style={S.card}>
          <CardTitle>{group}</CardTitle>
          <ul style={{ listStyle:"none", display:"flex", flexDirection:"column", gap:8 }}>
            {items.map(([text, ref_]) => (
              <ChecklistItem key={text} text={text} ref_={ref_} />
            ))}
          </ul>
        </div>
      ))}

      <div style={S.card}>
        <CardTitle>Declaration &amp; Final Submission</CardTitle>
        <div style={S.alert()}><span>⚠</span><span>Review all deficiencies in the right panel before submitting. Deficiencies will appear in PCI scrutiny report.</span></div>
        <label style={{ display:"flex", gap:10, alignItems:"flex-start", cursor:"pointer", fontSize:13, marginBottom:16 }}>
          <input type="checkbox" checked={declared} onChange={() => setDeclared(!declared)} style={{ width:16, height:16, marginTop:2, accentColor:"#c8973a" }} />
          <span>I hereby declare that all information in this SIF is true and correct. I understand that false statements may lead to cancellation of approval and action under the Pharmacy Act, 1948.</span>
        </label>
        <div style={S.grid2}>
          <Field label="Name of HOI"><input style={inputStyle(false)} defaultValue={formData.institution.hoiName || ""} /></Field>
          <Field label="Date of Submission"><input type="date" style={inputStyle(false)} /></Field>
          <UploadField label="Signed Declaration (PDF)" accept=".pdf" />
        </div>
        <div style={{ marginTop:20 }}>
          <button onClick={() => generatePDF(formData)} style={S.btn}>🖨 Generate &amp; Download Complete SIF as PDF</button>
        </div>
      </div>
    </div>
  );
}