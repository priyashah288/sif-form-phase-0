import { useForm } from "../../context/FormContext";
import { UploadField } from "../common";
import { inputStyle } from "../../styles/inputStyle";
import React from "react";
const S = {
  card:   { background:"#fff", border:"1px solid #e2e6ec", borderRadius:14, padding:22, marginBottom:18 },
  cardT:  { fontSize:13, fontWeight:600, color:"#0d1b2a", marginBottom:16, display:"flex", alignItems:"center", gap:8 },
  secHdr: { marginBottom:24, paddingBottom:18, borderBottom:"1px solid #e2e6ec" },
  secTag: { fontFamily:"monospace", fontSize:10, fontWeight:500, color:"#c8973a", letterSpacing:"0.08em", textTransform:"uppercase", marginBottom:6 },
  secTitle:{ fontSize:20, fontWeight:700, color:"#0d1b2a", marginBottom:4 },
  grid2:  { display:"grid", gridTemplateColumns:"1fr 1fr", gap:14 },
  sep:    { height:1, background:"#e2e6ec", margin:"16px 0" },
};

const CardTitle = ({ children }) => (
  <div style={S.cardT}>
    <span style={{ width:3, height:14, background:"#c8973a", borderRadius:2, flexShrink:0 }} />
    {children}
  </div>
);

const Field = ({ label, required, children, hint }) => {
  const id = label?.toLowerCase().replace(/\s/g, "-") || Math.random().toString(36);
  return (
    <div style={{ display:"flex", flexDirection:"column", gap:4 }}>
      {label && <label htmlFor={id} style={{ fontSize:12, fontWeight:500, color:"#4a5568" }}>{label}{required && <span style={{ color:"#c0392b" }}>*</span>}</label>}
      {React.isValidElement(children) ? React.cloneElement(children, { id, name: id }) : children}
      {hint && <span style={{ fontSize:11, color:"#8a97a8" }}>{hint}</span>}
    </div>
  );
};

export function CurriculumSection() {
  const { formData, updateCurriculum } = useForm();

  return (
    <div>
      <div style={S.secHdr}>
        <div style={S.secTag}>Section 08</div>
        <h1 style={S.secTitle}>Curriculum &amp; Examination</h1>
      </div>
      <div style={S.card}>
        <CardTitle>Academic Calendar</CardTitle>
        <div style={S.grid2}>
          <Field label="Working Days — B.Pharm">
            <input type="number" value={formData.curriculum.wdBpharm}
              onChange={e => updateCurriculum("wdBpharm", e.target.value)}
              style={inputStyle(parseInt(formData.curriculum.wdBpharm) < 200)} />
            {parseInt(formData.curriculum.wdBpharm) < 200 && <span style={{ fontSize:11, color:"#c0392b" }}>Min. 200 days required</span>}
          </Field>
          <Field label="Working Days — Pharm.D">
            <input type="number" value={formData.curriculum.wdPharmd}
              onChange={e => updateCurriculum("wdPharmd", e.target.value)} style={inputStyle(false)} />
          </Field>
          <Field label="Min. Sessional Exams / Year">
            <input type="number" min={3} value={formData.curriculum.sessionalCount}
              onChange={e => updateCurriculum("sessionalCount", e.target.value)}
              style={inputStyle(parseInt(formData.curriculum.sessionalCount) < 3)} />
          </Field>
          <Field label="Attendance Tracked Separately (Theory + Practical)?">
            <select value={formData.curriculum.attendanceTracked}
              onChange={e => updateCurriculum("attendanceTracked", e.target.value)} style={inputStyle(false)}>
              <option>Yes — separate registers</option><option>No</option>
            </select>
          </Field>
        </div>
        <div style={S.sep} />
        <div style={S.grid2}>
          <UploadField label="Academic Calendar (Previous Year)" accept=".pdf" />
          <UploadField label="Timetable for All Courses" accept=".pdf" />
        </div>
      </div>
    </div>
  );
}