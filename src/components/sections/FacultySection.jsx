import { useForm } from "../../context/FormContext";
import { FacultyRow } from "../faculty/FacultyRow";

const S = {
  card:   { background:"#fff", border:"1px solid #e2e6ec", borderRadius:14, padding:22, marginBottom:18 },
  cardT:  { fontSize:13, fontWeight:600, color:"#0d1b2a", marginBottom:16, display:"flex", alignItems:"center", gap:8 },
  secHdr: { marginBottom:24, paddingBottom:18, borderBottom:"1px solid #e2e6ec" },
  secTag: { fontFamily:"monospace", fontSize:10, fontWeight:500, color:"#c8973a", letterSpacing:"0.08em", textTransform:"uppercase", marginBottom:6 },
  secTitle:{ fontSize:20, fontWeight:700, color:"#0d1b2a", marginBottom:4 },
  secDesc:{ fontSize:13, color:"#4a5568" },
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

const thS = { background:"#0d1b2a", color:"rgba(255,255,255,.85)", fontWeight:500,
  padding:"9px 10px", textAlign:"left", fontSize:11, letterSpacing:"0.03em", whiteSpace:"nowrap" };

export function FacultySection() {
  const { formData, updateFaculty, addFaculty, removeFaculty } = useForm();

  return (
    <div>
      <div style={S.secHdr}>
        <div style={S.secTag}>Section 04</div>
        <h1 style={S.secTitle}>Teaching Faculty</h1>
        <p style={S.secDesc}>All pharmacy subjects require full-time faculty. Allocation: course × department × designation. MQT Regulations 2014.</p>
      </div>
      <div style={S.alert()}>
        <span>⚠</span>
        <span>Part-time permitted ONLY for: Mathematics & Statistics, Basic Electronics, Computer Applications, Pathology (D.Pharm only). All pharmacy subjects must be full-time.</span>
      </div>
      <div style={S.card}>
        <CardTitle>Faculty Register</CardTitle>
        <div style={{ overflowX:"visible", overflowY:"visible" }}>
          <table style={{ width:"100%", borderCollapse:"collapse", fontSize:12 }}>
            <thead>
              <tr>
                {["#","Photo","Name","Council No.","Qualifications","Designation","Departments","Course","Exp","Workload","DOJ","AEBAS","FT/PT",""].map(h => (
                  <th key={h} style={thS}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {formData.faculty.map((f, i) => (
                <FacultyRow key={f.id} row={f} index={i}
                  onChange={(field, val) => updateFaculty(f.id, field, val)}
                  onRemove={() => removeFaculty(f.id)} />
              ))}
            </tbody>
          </table>
        </div>
        <button style={S.addBtn} onClick={addFaculty}>+ Add Faculty Member</button>
      </div>
    </div>
  );
}