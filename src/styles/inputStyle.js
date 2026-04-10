export const inputStyle = (invalid) => ({
  fontFamily:"'DM Sans', sans-serif", fontSize:13, color:"#0d1b2a",
  background: invalid ? "#fdf0ef" : "#f7f8fa",
  border: `1px solid ${invalid ? "#c0392b" : "#e2e6ec"}`,
  borderRadius:8, padding:"9px 12px", width:"100%", outline:"none",
  transition:"all 0.15s", boxSizing:"border-box",
});