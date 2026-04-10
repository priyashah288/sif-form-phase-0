import { useForm } from "../../context/FormContext";
import { Badge, UploadField } from "../common";
import { COMMON_FACILITIES } from "../../utils/constants";
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

const thS = { background:"#0d1b2a", color:"rgba(255,255,255,.85)", fontWeight:500,
  padding:"9px 10px", textAlign:"left", fontSize:11, letterSpacing:"0.03em", whiteSpace:"nowrap" };
const tdS = { padding:"8px 10px", verticalAlign:"middle", fontSize:12 };

export function InfrastructureSection() {
  const { formData, updateInfrastructure, updateClassroom, addClassroom, updateCommonFacility } = useForm();

  return (
    <div>
      <div style={S.secHdr}>
        <div style={S.secTag}>Section 03</div>
        <h1 style={S.secTitle}>Physical Infrastructure</h1>
        <p style={S.secDesc}>Land, building, classrooms, and common facilities. Min. 900 sq.ft per lab · 30 sq.ft per concurrent student.</p>
      </div>

      <div style={S.card}>
        <CardTitle>Land &amp; Building</CardTitle>
        <div style={S.grid3}>
          <Field label="Total Land Area (Acres)" required>
            <input type="number" step="0.01" value={formData.infrastructure.landArea}
              onChange={e => updateInfrastructure("landArea", e.target.value)} style={inputStyle(false)} placeholder="e.g. 2.68" />
          </Field>
          <Field label="Survey Number"><input style={inputStyle(false)} placeholder="e.g. 123/2A" /></Field>
          <Field label="Total Floors"><input type="number" style={inputStyle(false)} min={1} max={20} defaultValue={3} /></Field>
          <Field label="Total Built-up Area (sq.mt)">
            <input type="number" value={formData.infrastructure.totalBuiltup}
              onChange={e => updateInfrastructure("totalBuiltup", e.target.value)} style={inputStyle(false)} />
          </Field>
          <Field label="Instructional Area (sq.mt)">
            <input type="number" value={formData.infrastructure.instructional}
              onChange={e => updateInfrastructure("instructional", e.target.value)} style={inputStyle(false)} defaultValue="3101" />
          </Field>
          <Field label="Admin Area (sq.mt)">
            <input type="number" value={formData.infrastructure.admin}
              onChange={e => updateInfrastructure("admin", e.target.value)} style={inputStyle(false)} defaultValue="630" />
          </Field>
        </div>
      </div>

      <div style={S.card}>
        <CardTitle>Classrooms — Min. 2 required · 36 sq.mt each (B.Pharm: Appendix-A, Cl.5)</CardTitle>
        <div style={{ overflowX:"auto" }}>
          <table style={{ width:"100%", borderCollapse:"collapse", fontSize:12 }}>
            <thead>
              <tr>
                {["#","Room Name","Course","Req. Area (sq.mt)","Available Area (sq.mt)","Indoor Photo","Outdoor Photo","Status"].map(h => (
                  <th key={h} style={thS}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {formData.infrastructure.classrooms.map((room, i) => (
                <tr key={room.id} style={{ borderBottom:"1px solid #e2e6ec" }}>
                  <td style={tdS}>{i+1}</td>
                  <td style={tdS}>
                    <input value={room.name} style={{ ...inputStyle(false), width:120, fontSize:12 }}
                      onChange={e => updateClassroom(room.id, "name", e.target.value)} />
                  </td>
                  <td style={tdS}>
                    <select value={room.course} style={{ ...inputStyle(false), width:100, fontSize:12 }}
                      onChange={e => updateClassroom(room.id, "course", e.target.value)}>
                      {["B.Pharm","D.Pharm","M.Pharm","Pharm.D"].map(c => <option key={c}>{c}</option>)}
                    </select>
                  </td>
                  <td style={tdS}><span style={{ fontFamily:"monospace", fontSize:12, color:"#8a97a8" }}>{room.reqArea}</span></td>
                  <td style={tdS}>
                    <input type="number" value={room.availArea} style={{ ...inputStyle(parseFloat(room.availArea) < room.reqArea), width:70, fontSize:12 }}
                      onChange={e => updateClassroom(room.id, "availArea", e.target.value)} />
                  </td>
                  <td style={tdS}>
                    <UploadField accept=".jpg,.jpeg,.png" onChange={f => updateClassroom(room.id, "indoorPhoto", f)} />
                  </td>
                  <td style={tdS}>
                    <UploadField accept=".jpg,.jpeg,.png" onChange={f => updateClassroom(room.id, "outdoorPhoto", f)} />
                  </td>
                  <td style={tdS}><Badge type={parseFloat(room.availArea) >= room.reqArea ? "pass" : "fail"} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <button style={S.addBtn} onClick={addClassroom}>+ Add Classroom</button>
      </div>

      <div style={S.card}>
        <CardTitle>Common Facilities</CardTitle>
        <div style={{ overflowX:"auto" }}>
          <table style={{ width:"100%", borderCollapse:"collapse", fontSize:12 }}>
            <thead>
              <tr>
                {["Facility","Type","Req. Area","Unit","Available Area / Count","Status"].map(h => (
                  <th key={h} style={thS}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {COMMON_FACILITIES.map((f) => {
                const saved = (formData.infrastructure.facilities || {})[f.name] || {};
                const avail = saved.availArea || "";
                const compliant = f.reqArea ? parseFloat(avail) >= f.reqArea : avail !== "";
                return (
                  <tr key={f.name} style={{ borderBottom:"1px solid #e2e6ec" }}>
                    <td style={tdS}><span style={{ fontWeight:500 }}>{f.name}</span></td>
                    <td style={tdS}><Badge type={f.type} /></td>
                    <td style={{ ...tdS, fontFamily:"monospace", color:"#8a97a8" }}>{f.reqArea || "—"}</td>
                    <td style={{ ...tdS, fontFamily:"monospace", color:"#8a97a8" }}>{f.unit}</td>
                    <td style={tdS}>
                      {f.unit === "—" ? (
                        <select value={avail} onChange={e => updateCommonFacility(f.name, e.target.value)}
                          style={{ ...inputStyle(false), width:80, fontSize:12 }}>
                          <option value="">—</option><option>Yes</option><option>No</option>
                        </select>
                      ) : (
                        <input type="number" value={avail} onChange={e => updateCommonFacility(f.name, e.target.value)}
                          style={{ ...inputStyle(false), width:80, fontSize:12 }} placeholder="Enter" />
                      )}
                    </td>
                    <td style={tdS}><Badge type={avail ? (compliant ? "pass" : "fail") : "pending"} /></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}