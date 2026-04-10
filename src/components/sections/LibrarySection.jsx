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

export function LibrarySection() {
  const { formData, updateLibrary } = useForm();

  return (
    <div>
      <div style={S.secHdr}>
        <div style={S.secTag}>Section 09</div>
        <h1 style={S.secTitle}>Library &amp; Computer Resources</h1>
      </div>
      <div style={S.card}>
        <CardTitle>Library Norms</CardTitle>
        <div style={S.grid2}>
          <Field label="Library Area (sq.ft)">
            <input type="number" value={formData.library.area} onChange={e => updateLibrary("area", e.target.value)} style={inputStyle(false)} />
          </Field>
          <Field label="Reading Room Seating Capacity">
            <input type="number" value={formData.library.readingCapacity} onChange={e => updateLibrary("readingCapacity", e.target.value)} style={inputStyle(false)} />
          </Field>
          <Field label="National Journals">
            <input type="number" value={formData.library.nationalJournals} onChange={e => updateLibrary("nationalJournals", e.target.value)} style={inputStyle(false)} />
          </Field>
          <Field label="International Journals">
            <input type="number" value={formData.library.intlJournals} onChange={e => updateLibrary("intlJournals", e.target.value)} style={inputStyle(false)} />
          </Field>
          <UploadField label="Journals Subscription Details" accept=".pdf" />
          <UploadField label="CA Certified GST Bills (Books & Journals)" accept=".pdf" />
        </div>
      </div>
    </div>
  );
}