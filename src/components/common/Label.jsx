export function Label({ children, required, htmlFor }) {
  return (
    <label
      htmlFor={htmlFor}
      style={{ fontSize:12, fontWeight:500, color:"#4a5568", letterSpacing:"0.01em", display:"block", marginBottom:4 }}
    >
      {children}{required && <span style={{ color:"#c0392b", marginLeft:2 }}>*</span>}
    </label>
  );
}