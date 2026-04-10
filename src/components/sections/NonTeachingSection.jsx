import { useForm } from "../../context/FormContext";
import { inputStyle } from "../../styles/inputStyle";
import { REGEX } from "../../utils/regex";

const S = {
  card:   { background:"#fff", border:"1px solid #e2e6ec", borderRadius:14, padding:22, marginBottom:18 },
  cardT:  { fontSize:13, fontWeight:600, color:"#0d1b2a", marginBottom:16, display:"flex", alignItems:"center", gap:8 },
  secHdr: { marginBottom:24, paddingBottom:18, borderBottom:"1px solid #e2e6ec" },
  secTag: { fontFamily:"monospace", fontSize:10, fontWeight:500, color:"#c8973a", letterSpacing:"0.08em", textTransform:"uppercase", marginBottom:6 },
  secTitle:{ fontSize:20, fontWeight:700, color:"#0d1b2a", marginBottom:4 },
  secDesc:{ fontSize:13, color:"#4a5568" },
  addBtn: { display:"flex", alignItems:"center", gap:6, padding:"8px 14px", border:"1.5px dashed #e2e6ec", borderRadius:8,
    background:"transparent", color:"#8a97a8", cursor:"pointer", fontSize:12, width:"100%", justifyContent:"center", marginTop:10 },
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

export function NonTeachingSection() {
  const { formData, updateNonTeaching, addNonTeaching, removeNonTeaching } = useForm();

  return (
    <div>
      <div style={S.secHdr}>
        <div style={S.secTag}>Section 05</div>
        <h1 style={S.secTitle}>Non-Teaching Staff</h1>
        <p style={S.secDesc}>Lab Technician: 1 per dept (D.Pharm qual.) · Lab Asst: 1 per lab (SSLC) · 9 fixed admin roles. Appendix-A, Cl.4.</p>
      </div>
      <div style={S.card}>
        <CardTitle>Staff Register</CardTitle>
        <div style={{ overflowX:"auto" }}>
          <table style={{ width:"100%", borderCollapse:"collapse", fontSize:12 }}>
            <thead>
              <tr>
                {["#","Name","Qualification","Designation","Department","Date of Joining","Mobile",""].map(h => (
                  <th key={h} style={thS}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {formData.nonTeaching.map((s, i) => (
                <tr key={s.id} style={{ borderBottom:"1px solid #e2e6ec" }}>
                  <td style={tdS}>{i+1}</td>
                  <td style={tdS}>
                    <input value={s.name} style={{ ...inputStyle(false), width:150, fontSize:12 }}
                      onChange={e => updateNonTeaching(s.id, "name", e.target.value)} />
                  </td>
                  <td style={tdS}>
                    <select value={s.qual} style={{ ...inputStyle(false), width:110, fontSize:12 }}
                      onChange={e => updateNonTeaching(s.id, "qual", e.target.value)}>
                      {["SSLC","D.Pharm","B.Pharm","B.Sc","Degree","BCA","B.Com","M.A","M.Sc"].map(q => <option key={q}>{q}</option>)}
                    </select>
                  </td>
                  <td style={tdS}>
                    <select value={s.designation} style={{ ...inputStyle(false), width:160, fontSize:12 }}
                      onChange={e => updateNonTeaching(s.id, "designation", e.target.value)}>
                      {["Laboratory Technician","Lab Asst / Attender","Office Superintendent","Accountant","Store Keeper","Computer Data Operator","Office Staff I","Office Staff II","Peon","Cleaning Personnel","Gardener"].map(d => <option key={d}>{d}</option>)}
                    </select>
                  </td>
                  <td style={tdS}>
                    <select value={s.dept} style={{ ...inputStyle(false), width:140, fontSize:12 }}
                      onChange={e => updateNonTeaching(s.id, "dept", e.target.value)}>
                      {["Pharmaceutics","Pharmaceutical Chemistry","Pharmacology","Pharmacognosy","Pharmacy Practice","Administration"].map(d => <option key={d}>{d}</option>)}
                    </select>
                  </td>
                  <td style={tdS}>
                    <input type="date" value={s.doj} style={{ ...inputStyle(false), width:120, fontSize:12 }}
                      onChange={e => updateNonTeaching(s.id, "doj", e.target.value)} />
                  </td>
                  <td style={tdS}>
                    <input type="tel" value={s.mobile} maxLength={10}
                      style={{ ...inputStyle(!REGEX.mobile.test(s.mobile) && s.mobile.length > 0), width:110, fontSize:12 }}
                      onChange={e => updateNonTeaching(s.id, "mobile", e.target.value)} />
                  </td>
                  <td style={tdS}>
                    <button onClick={() => removeNonTeaching(s.id)} style={{ padding:"4px 8px", borderRadius:6,
                      border:"1px solid #f0a0a0", background:"#fdf0ef", color:"#c0392b", cursor:"pointer", fontSize:11 }}>✕</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <button style={S.addBtn} onClick={addNonTeaching}>+ Add Non-Teaching Staff</button>
      </div>
    </div>
  );
}