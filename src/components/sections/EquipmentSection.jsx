import React from "react";
import { Badge, UploadField } from "../common";
import { inputStyle } from "../../styles/inputStyle";

const S = {
  card:   { background:"#fff", border:"1px solid #e2e6ec", borderRadius:14, padding:22, marginBottom:18 },
  cardT:  { fontSize:13, fontWeight:600, color:"#0d1b2a", marginBottom:16, display:"flex", alignItems:"center", gap:8 },
  secHdr: { marginBottom:24, paddingBottom:18, borderBottom:"1px solid #e2e6ec" },
  secTag: { fontFamily:"monospace", fontSize:10, fontWeight:500, color:"#c8973a", letterSpacing:"0.08em", textTransform:"uppercase", marginBottom:6 },
  secTitle:{ fontSize:20, fontWeight:700, color:"#0d1b2a", marginBottom:4 },
  secDesc:{ fontSize:13, color:"#4a5568" },
  alert:  () => ({ display:"flex", gap:10, padding:"11px 14px", borderRadius:8, marginBottom:14, fontSize:12,
    background:"#e8f4fd", border:"1px solid rgba(30,100,180,.2)", color:"#1e5a9e" }),
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

export function EquipmentSection() {
  return (
    <div>
      <div style={S.secHdr}>
        <div style={S.secTag}>Section 07</div>
        <h1 style={S.secTitle}>Equipment &amp; Apparatus</h1>
        <p style={S.secDesc}>Quantities verified against PCI-prescribed minimums. Bill and DOP required per item.</p>
      </div>
      <div style={S.alert()}><span>ℹ</span><span>Equipment data carried over from previous SIF where available. Verify and update quantities. Upload bills for new purchases.</span></div>

      <div style={S.card}>
        <CardTitle>Central Instrumentation Room</CardTitle>
        {[["HPLC (Binary, UV, 3KVA UPS)",1],["UV-Vis Spectrophotometer (Double beam)",1],["FTIR",1],
          ["Deep Freezer (-20°C)",1],["Biochemistry Analyzer",1],["Digital Balance (1mg)",1],
          ["Colorimeter",1],["Flame Photometer",1],["Conductivity Meter",1],["Fluorimeter",1]].map(([name,min]) => (
          <div key={name} style={{ display:"grid", gridTemplateColumns:"2fr 1fr 1fr 1fr 80px", gap:10, alignItems:"center", padding:"8px 0", borderBottom:"1px solid #e2e6ec", fontSize:12 }}>
            <span style={{ color:"#4a5568" }}>{name}</span>
            <span style={{ fontFamily:"monospace", fontSize:11, color:"#8a97a8", textAlign:"center" }}>{min}</span>
            <input type="number" defaultValue={1} min={0} style={{ ...inputStyle(false), textAlign:"center", fontSize:12, padding:"5px 8px" }} />
            <input type="number" defaultValue={1} min={0} style={{ ...inputStyle(false), textAlign:"center", fontSize:12, padding:"5px 8px" }} />
            <Badge type="pass" />
          </div>
        ))}
      </div>

      <div style={S.card}>
        <CardTitle>Chemical Reagents &amp; Consumables</CardTitle>
        <table style={{ width:"100%", borderCollapse:"collapse", fontSize:12 }}>
          <thead>
            <tr>
              {["Type","Vendor","Purchase Date","Bill Upload"].map(h => <th key={h} style={thS}>{h}</th>)}
            </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom:"1px solid #e2e6ec" }}>
              <td style={tdS}><select style={{ ...inputStyle(false), width:100, fontSize:12 }}><option>Chemical</option><option>Glassware</option><option>Consumable</option></select></td>
              <td style={tdS}><input style={{ ...inputStyle(false), width:150, fontSize:12 }} defaultValue="Tharun Scientifics" /></td>
              <td style={tdS}><input type="date" style={{ ...inputStyle(false), width:120, fontSize:12 }} /></td>
              <td style={tdS}><UploadField accept=".pdf" /></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}