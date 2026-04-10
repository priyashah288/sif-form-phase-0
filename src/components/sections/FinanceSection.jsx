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

export function FinanceSection() {
  const { formData, updateFinance } = useForm();

  return (
    <div>
      <div style={S.secHdr}>
        <div style={S.secTag}>Section 10</div>
        <h1 style={S.secTitle}>Income &amp; Expenditure</h1>
      </div>
      <div style={S.card}>
        <CardTitle>Institution Identification</CardTitle>
        <div style={S.grid2}>
          <Field label="PAN Number">
            <input value={formData.finance.pan} onChange={e => updateFinance("pan", e.target.value)} style={inputStyle(false)} maxLength={10} />
          </Field>
          <Field label="GST Registration No.">
            <input placeholder="15-digit GSTIN (if applicable)" style={inputStyle(false)} />
          </Field>
        </div>
      </div>
      <div style={S.card}>
        <CardTitle>Income Statement</CardTitle>
        {[["Tuition Fee","61071411"],["Grants — Government","0"],["Grants — Others","1190000"],["Other Income","0"]].map(([label, def]) => (
          <div key={label} style={{ display:"grid", gridTemplateColumns:"1fr 200px", gap:14, alignItems:"center", padding:"6px 0", borderBottom:"1px solid #e2e6ec" }}>
            <span style={{ fontSize:13, color:"#4a5568" }}>{label}</span>
            <input type="number" defaultValue={def} style={{ ...inputStyle(false), fontSize:13 }} />
          </div>
        ))}
        <div style={{ display:"grid", gridTemplateColumns:"1fr 200px", gap:14, alignItems:"center", padding:"8px 8px 8px 8px", background:"#f7f8fa", borderRadius:6, marginTop:8 }}>
          <span style={{ fontSize:13, fontWeight:700, color:"#0d1b2a" }}>Total Income (₹)</span>
          <input type="number" value={formData.finance.totalIncome} readOnly style={{ ...inputStyle(false), fontWeight:700, background:"#eaf5ee", color:"#1a7a4a" }} />
        </div>
      </div>
      <div style={S.card}>
        <CardTitle>Expenditure</CardTitle>
        <UploadField label="Audited Accounts (Previous Year)" accept=".pdf" />
      </div>
    </div>
  );
}