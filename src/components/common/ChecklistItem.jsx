import { useState } from "react";

export function ChecklistItem({ text, ref_ }) {
  const [status, setStatus] = useState(null);
  const id = `checklist-${text.replace(/\s/g, "-")}`;

  return (
    <li style={{ display:"flex", alignItems:"flex-start", gap:10, padding:"10px 14px",
      background: status === "yes" ? "#eaf5ee" : status === "no" ? "#fdf0ef" : "#f7f8fa",
      borderRadius:8, border:"1px solid #e2e6ec", transition:"background 0.2s" }}>
      <div style={{ display:"flex", gap:5, flexShrink:0, marginTop:2 }}>
        {[["yes","✓","#1e8a7a"],["no","✗","#c0392b"],["na","NA","#8a97a8"]].map(([v,l,c]) => (
          <button
            key={v}
            onClick={() => setStatus(v === status ? null : v)}
            aria-label={`Mark as ${v}`}
            style={{ padding:"2px 8px", borderRadius:4, fontSize:10, fontWeight:700, cursor:"pointer",
              fontFamily:"'DM Sans', sans-serif", transition:"all 0.15s",
              border:`1px solid ${status === v ? c : "#e2e6ec"}`,
              background: status === v ? c : "#fff",
              color: status === v ? "#fff" : c }}>{l}</button>
        ))}
      </div>
      <div>
        <div style={{ fontSize:12, color:"#4a5568", lineHeight:1.5 }}>{text}</div>
        <div style={{ fontSize:10, color:"#8a97a8", fontFamily:"monospace", marginTop:2 }}>{ref_}</div>
      </div>
    </li>
  );
}