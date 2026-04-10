import { useForm } from "../../context/FormContext";
import { Badge, MultiSelect } from "../common";
import { COURSES_LIST, MPHARM_SPECS } from "../../utils/constants";
import { inputStyle } from "../../styles/inputStyle";

const S = {
  card:   { background:"#fff", border:"1px solid #e2e6ec", borderRadius:14, padding:22, marginBottom:18 },
  cardT:  { fontSize:13, fontWeight:600, color:"#0d1b2a", marginBottom:16, display:"flex", alignItems:"center", gap:8 },
  secHdr: { marginBottom:24, paddingBottom:18, borderBottom:"1px solid #e2e6ec" },
  secTag: { fontFamily:"monospace", fontSize:10, fontWeight:500, color:"#c8973a", letterSpacing:"0.08em", textTransform:"uppercase", marginBottom:6 },
  secTitle:{ fontSize:20, fontWeight:700, color:"#0d1b2a", marginBottom:4 },
  secDesc:{ fontSize:13, color:"#4a5568" },
  alert:  (t) => ({ display:"flex", gap:10, padding:"11px 14px", borderRadius:8, marginBottom:14, fontSize:12, lineHeight:1.5,
    background: t === "info" ? "#e8f4fd" : "#fdf3e3", border: t === "info" ? "1px solid rgba(30,100,180,.2)" : "1px solid rgba(200,151,58,.25)", color: t === "info" ? "#1e5a9e" : "#7a5800" }),
  sep:    { height:1, background:"#e2e6ec", margin:"16px 0" },
};

const CardTitle = ({ children }) => (
  <div style={S.cardT}>
    <span style={{ width:3, height:14, background:"#c8973a", borderRadius:2, flexShrink:0 }} />
    {children}
  </div>
);

const thS = { background:"#0d1b2a", color:"rgba(255,255,255,.85)", fontWeight:500,
  padding:"9px 10px", textAlign:"left", fontSize:11, letterSpacing:"0.03em", whiteSpace:"nowrap" };
const tdS = { padding:"8px 10px", verticalAlign:"middle", fontSize:12 };

export function CoursesSection() {
  const { formData, updateCourses } = useForm();

  return (
    <div>
      <div style={S.secHdr}>
        <div style={S.secTag}>Section 02</div>
        <h1 style={S.secTitle}>Courses &amp; Intake</h1>
        <p style={S.secDesc}>Course selection drives all downstream validations and requirements.</p>
      </div>
      <div style={S.alert("info")}><span>ℹ</span><span>Only PCI-approved courses shown. Contact PCI if a course is missing.</span></div>

      <div style={S.card}>
        <CardTitle>Approved Courses</CardTitle>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12, marginBottom:20 }}>
          {COURSES_LIST.map(c => {
            const sel = formData.courses.selected[c.id];
            return (
              <div key={c.id}
                onClick={() => updateCourses("selected", { ...formData.courses.selected, [c.id]:!sel })}
                style={{ border:`2px solid ${sel ? "#c8973a" : "#e2e6ec"}`, borderRadius:8, padding:14,
                  cursor:"pointer", userSelect:"none", background: sel ? "#fdf3e3" : "transparent" }}>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start" }}>
                  <span style={{ fontWeight:600, fontSize:13, color: sel ? "#0d1b2a" : "#4a5568" }}>{c.label}</span>
                  <span style={{ width:18, height:18, borderRadius:4, border:`2px solid ${sel ? "#c8973a" : "#e2e6ec"}`,
                    background: sel ? "#c8973a" : "transparent", display:"flex", alignItems:"center",
                    justifyContent:"center", color:"#fff", fontSize:10, flexShrink:0 }}>{sel ? "✓" : ""}</span>
                </div>
                <div style={{ fontSize:11, color:"#8a97a8", marginTop:4 }}>{c.meta}</div>
              </div>
            );
          })}
        </div>

        {formData.courses.selected.mpharm && (
          <div>
            <div style={S.sep} />
            <CardTitle>M.Pharm Specialisations</CardTitle>
            <MultiSelect
              id="mpharm-specs"
              options={MPHARM_SPECS}
              value={formData.courses.mpharmSpecs}
              onChange={v => updateCourses("mpharmSpecs", v)}
              placeholder="Select specialisations..."
            />
          </div>
        )}
      </div>

      <div style={S.card}>
        <CardTitle>Sanctioned Intake</CardTitle>
        <div style={{ overflowX:"auto" }}>
          <table style={{ width:"100%", borderCollapse:"collapse", fontSize:12 }}>
            <thead>
              <tr>
                {["Course","Sanctioned Intake (60/100)","Actual Admissions","Section 12 Status"].map(h => (
                  <th key={h} style={thS}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {formData.courses.intakes.map((row, i) => (
                <tr key={i} style={{ borderBottom:"1px solid #e2e6ec" }}>
                  <td style={tdS}><strong>{row.course}</strong></td>
                  <td style={tdS}>
                    <div style={{ display:"flex", gap:0, border:"1px solid #e2e6ec", borderRadius:8, overflow:"hidden", width:"fit-content" }}>
                      {["60","100"].map(v => (
                        <button key={v} onClick={() => {
                          const updated = [...formData.courses.intakes];
                          updated[i] = { ...updated[i], sanctioned:v };
                          updateCourses("intakes", updated);
                        }} style={{ padding:"6px 16px", border:"none", fontFamily:"'DM Sans',sans-serif", fontSize:12, fontWeight:500, cursor:"pointer",
                          background: row.sanctioned === v ? "#0d1b2a" : "transparent",
                          color: row.sanctioned === v ? "#fff" : "#4a5568",
                          borderRight: v === "60" ? "1px solid #e2e6ec" : "none" }}>{v}</button>
                      ))}
                    </div>
                  </td>
                  <td style={tdS}>
                    <input type="number" value={row.actual} style={{ ...inputStyle(false), width:80, fontSize:12 }}
                      onChange={e => { const u = [...formData.courses.intakes]; u[i] = { ...u[i], actual:e.target.value }; updateCourses("intakes", u); }} />
                  </td>
                  <td style={tdS}><Badge type="pass" /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}