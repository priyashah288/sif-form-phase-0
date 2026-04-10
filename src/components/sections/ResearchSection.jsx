import React from "react";
import { inputStyle } from "../../styles/inputStyle";

const S = {
  card:   { background:"#fff", border:"1px solid #e2e6ec", borderRadius:14, padding:22, marginBottom:18 },
  cardT:  { fontSize:13, fontWeight:600, color:"#0d1b2a", marginBottom:16, display:"flex", alignItems:"center", gap:8 },
  secHdr: { marginBottom:24, paddingBottom:18, borderBottom:"1px solid #e2e6ec" },
  secTag: { fontFamily:"monospace", fontSize:10, fontWeight:500, color:"#c8973a", letterSpacing:"0.08em", textTransform:"uppercase", marginBottom:6 },
  secTitle:{ fontSize:20, fontWeight:700, color:"#0d1b2a", marginBottom:4 },
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

export function ResearchSection() {
  return (
    <div>
      <div style={S.secHdr}>
        <div style={S.secTag}>Section 11</div>
        <h1 style={S.secTitle}>Research &amp; Publications</h1>
      </div>
      <div style={S.card}>
        <CardTitle>PG/PhD Projects</CardTitle>
        <table style={{ width:"100%", borderCollapse:"collapse", fontSize:12 }}>
          <thead>
            <tr>
              {["#","Supervisor","Candidate","Type","Title","Duration (months)","Year"].map(h => <th key={h} style={thS}>{h}</th>)}
            </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom:"1px solid #e2e6ec" }}>
              <td style={tdS}>1</td>
              <td style={tdS}><input style={{ ...inputStyle(false), width:130, fontSize:12 }} defaultValue="Dr B Jyothi" /></td>
              <td style={tdS}><input style={{ ...inputStyle(false), width:130, fontSize:12 }} defaultValue="P Sushmitha" /></td>
              <td style={tdS}><select style={{ ...inputStyle(false), width:65, fontSize:12 }}><option>PG</option><option>PhD</option></select></td>
              <td style={tdS}><input style={{ ...inputStyle(false), width:200, fontSize:12 }} defaultValue="Protective effect of Piperine on liver damage in rats" /></td>
              <td style={tdS}><input type="number" style={{ ...inputStyle(false), width:60, fontSize:12 }} defaultValue={12} /></td>
              <td style={tdS}><input type="number" style={{ ...inputStyle(false), width:65, fontSize:12 }} defaultValue={2023} /></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}