import { useForm } from "../../context/FormContext";
import { Badge, LocationPicker, UploadField } from "../common";
import { DEPARTMENTS, LAB_NAMES } from "../../utils/constants";
import { inputStyle } from "../../styles/inputStyle";
import React from "react";
const S = {
  card:   { background:"#fff", border:"1px solid #e2e6ec", borderRadius:14, padding:22, marginBottom:18 },
  cardT:  { fontSize:13, fontWeight:600, color:"#0d1b2a", marginBottom:16, display:"flex", alignItems:"center", gap:8 },
  secHdr: { marginBottom:24, paddingBottom:18, borderBottom:"1px solid #e2e6ec" },
  secTag: { fontFamily:"monospace", fontSize:10, fontWeight:500, color:"#c8973a", letterSpacing:"0.08em", textTransform:"uppercase", marginBottom:6 },
  secTitle:{ fontSize:20, fontWeight:700, color:"#0d1b2a", marginBottom:4 },
  secDesc:{ fontSize:13, color:"#4a5568" },
  grid3:  { display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:14 },
  addBtn: { display:"flex", alignItems:"center", gap:6, padding:"8px 14px", border:"1.5px dashed #e2e6ec", borderRadius:8,
    background:"transparent", color:"#8a97a8", cursor:"pointer", fontSize:12, width:"100%", justifyContent:"center", marginTop:10 },
  alert:  () => ({ display:"flex", gap:10, padding:"11px 14px", borderRadius:8, marginBottom:14, fontSize:12,
    background:"#fdf3e3", border:"1px solid rgba(200,151,58,.25)", color:"#7a5800" }),
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

export function LabsSection() {
  const { formData, updateLab, addLab, removeLab } = useForm();

  return (
    <div>
      <div style={S.secHdr}>
        <div style={S.secTag}>Section 06</div>
        <h1 style={S.secTitle}>Laboratory Registration</h1>
        <p style={S.secDesc}>Controlled lab names only. Min: 900 sq.ft (83.6 sq.mt) per lab · 30 sq.ft per concurrent student. B.Pharm: 8 labs · D.Pharm: 4 labs.</p>
      </div>
      <div style={S.alert()}><span>⚠</span><span>Lab names must match PCI-approved list for your course. Indoor and outdoor geotagged photos mandatory.</span></div>

      {formData.labs.map((lab, i) => (
        <div key={lab.id} style={{ ...S.card, borderLeft:`3px solid ${parseFloat(lab.availArea) >= 83.6 ? "#1e8a7a" : "#c0392b"}` }}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:14 }}>
            <span style={{ fontWeight:600, fontSize:13, color:"#0d1b2a" }}>Lab {i+1}: {lab.name || "Unnamed Lab"}</span>
            <div style={{ display:"flex", gap:8, alignItems:"center" }}>
              <Badge type={parseFloat(lab.availArea) >= 83.6 ? "pass" : lab.availArea ? "fail" : "pending"} />
              <button onClick={() => removeLab(lab.id)} style={{ padding:"4px 8px", borderRadius:6, border:"1px solid #f0a0a0",
                background:"#fdf0ef", color:"#c0392b", cursor:"pointer", fontSize:11 }}>Remove</button>
            </div>
          </div>
          <div style={S.grid3}>
            <Field label="Lab Name (controlled)" required>
              <select value={lab.name} onChange={e => updateLab(lab.id, "name", e.target.value)} style={inputStyle(false)}>
                <option value="">— Select —</option>
                {LAB_NAMES.map(n => <option key={n}>{n}</option>)}
              </select>
            </Field>
            <Field label="Course">
              <select value={lab.course} onChange={e => updateLab(lab.id, "course", e.target.value)} style={inputStyle(false)}>
                {["B.Pharm","D.Pharm","M.Pharm","Pharm.D"].map(c => <option key={c}>{c}</option>)}
              </select>
            </Field>
            <Field label="Department">
              <select value={lab.dept} onChange={e => updateLab(lab.id, "dept", e.target.value)} style={inputStyle(false)}>
                {DEPARTMENTS.map(d => <option key={d}>{d}</option>)}
              </select>
            </Field>
            <Field label="Required Area (sq.mt)" hint="Regulation minimum">
              <input type="number" value={lab.reqArea} readOnly style={{ ...inputStyle(false), background:"#f0f0f0" }} />
            </Field>
            <Field label="Available Area (sq.mt)" required hint="Min. 83.6 sq.mt (900 sq.ft)">
              <input type="number" value={lab.availArea} onChange={e => updateLab(lab.id, "availArea", e.target.value)}
                style={inputStyle(lab.availArea && parseFloat(lab.availArea) < 83.6)} />
              {lab.availArea && parseFloat(lab.availArea) < 83.6 && <span style={{ fontSize:11, color:"#c0392b" }}>Below minimum 83.6 sq.mt</span>}
            </Field>
            <Field label="Max Concurrent Students" hint="For 30 sq.ft/student check">
              <input type="number" value={lab.concStudents} onChange={e => updateLab(lab.id, "concStudents", e.target.value)} style={inputStyle(false)} />
            </Field>
            <div style={{ gridColumn:"1 / -1" }}>
              <LocationPicker lat={lab.lat} lng={lab.lng}
                onFetch={(la, ln) => { updateLab(lab.id, "lat", la); updateLab(lab.id, "lng", ln); }}
                onLatChange={v => updateLab(lab.id, "lat", v)}
                onLngChange={v => updateLab(lab.id, "lng", v)} />
            </div>
            <div style={{ display:"flex", gap:10 }}>
              {[["gas","Gas Supply"],["water","Water Supply"],["electricity","Electricity Supply"]].map(([k,l]) => (
                <label key={k} style={{ display:"flex", alignItems:"center", gap:5, fontSize:12, cursor:"pointer" }}>
                  <input type="checkbox" checked={lab[k]} onChange={e => updateLab(lab.id, k, e.target.checked)} style={{ width:14, height:14, accentColor:"#c8973a" }} />
                  {l}
                </label>
              ))}
            </div>
            <UploadField label="Indoor Lab Photo (Geotagged)" accept=".jpg,.jpeg,.png"
              value={lab.indoorPhoto} onChange={f => updateLab(lab.id, "indoorPhoto", f)} />
            <UploadField label="Outdoor Lab Photo (Geotagged)" accept=".jpg,.jpeg,.png"
              value={lab.outdoorPhoto} onChange={f => updateLab(lab.id, "outdoorPhoto", f)} />
          </div>
        </div>
      ))}
      <button style={S.addBtn} onClick={addLab}>+ Add Laboratory</button>
    </div>
  );
}