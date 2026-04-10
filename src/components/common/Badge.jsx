export function Badge({ type }) {
  const styles = {
    pass:    { bg:"#eaf5ee", color:"#1a7a4a", border:"rgba(26,122,74,.2)" },
    fail:    { bg:"#fdf0ef", color:"#c0392b", border:"rgba(192,57,43,.2)" },
    warn:    { bg:"#fdf3e3", color:"#8a6000", border:"rgba(200,151,58,.3)" },
    pending: { bg:"#f7f8fa", color:"#8a97a8", border:"#e2e6ec" },
    Essential:   { bg:"#fff3e0", color:"#8a5000", border:"rgba(200,120,0,.25)" },
    Conditional: { bg:"#e8f4fd", color:"#1e5a9e", border:"rgba(30,100,180,.2)" },
    Desirable:   { bg:"#f7f8fa", color:"#8a97a8", border:"#e2e6ec" },
  };
  const s = styles[type] || styles.pending;
  return (
    <span style={{ display:"inline-flex", alignItems:"center", gap:3, fontSize:10, fontWeight:600,
      padding:"2px 7px", borderRadius:4, fontFamily:"monospace", letterSpacing:"0.04em",
      background:s.bg, color:s.color, border:`1px solid ${s.border}` }}>
      {type === "pass" ? "✓ Pass" : type === "fail" ? "✗ Fail" : type === "warn" ? "⚠ Warn" : type}
    </span>
  );
}