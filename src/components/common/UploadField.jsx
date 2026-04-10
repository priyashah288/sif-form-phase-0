import { useState, useRef } from "react";
import { Label } from "./Label";

export function UploadField({ label, value, onChange, accept = ".pdf,.jpg,.jpeg,.png", required, id }) {
  const [status, setStatus] = useState(null);
  const fileRef = useRef();

  const validatePDF = async (file) => {
    if (!file) return;
    setStatus("checking");
    if (file.type === "application/pdf") {
      try {
        const buf = await file.arrayBuffer();
        const text = new TextDecoder().decode(buf.slice(0, 4096));
        const streamCount = (text.match(/stream/g) || []).length;
        const hasImages = /DCTDecode|JPXDecode|CCITTFaxDecode|FlateDecode/i.test(text);
        if (streamCount < 2 && !hasImages) { setStatus("blank"); return; }
        setStatus("ok");
      } catch { setStatus("ok"); }
    } else if (file.type.startsWith("image/")) {
      try {
        const url = URL.createObjectURL(file);
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement("canvas");
          canvas.width = Math.min(img.width, 200);
          canvas.height = Math.min(img.height, 200);
          const ctx = canvas.getContext("2d");
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          const d = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
          let sum = 0, sumSq = 0, n = 0;
          for (let i = 0; i < d.length; i += 4) {
            const gray = 0.299 * d[i] + 0.587 * d[i+1] + 0.114 * d[i+2];
            sum += gray; sumSq += gray * gray; n++;
          }
          const mean = sum / n;
          const variance = (sumSq / n) - mean * mean;
          URL.revokeObjectURL(url);
          setStatus(variance < 50 ? "blurred" : "ok");
        };
        img.src = url;
      } catch { setStatus("ok"); }
    } else {
      setStatus("ok");
    }
  };

  const handleChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    validatePDF(file);
    onChange?.(file);
  };

  const statusConfig = {
    checking: { color:"#8a97a8", text:"Validating..." },
    ok:       { color:"#1a7a4a", text:"✓ File looks good" },
    blank:    { color:"#c0392b", text:"✗ PDF appears blank or empty — please re-upload" },
    blurred:  { color:"#c0392b", text:"✗ Image appears blurred — please upload a clearer photo" },
  };
  const sc = status ? statusConfig[status] : null;

  return (
    <div style={{ marginBottom:2 }}>
      {label && <Label required={required} htmlFor={id}>{label}</Label>}
      <div
        onClick={() => fileRef.current?.click()}
        style={{ border:"2px dashed #e2e6ec", borderRadius:8, padding:"14px 16px", textAlign:"center",
          cursor:"pointer", background:"#f7f8fa", transition:"all 0.15s",
          borderColor: status === "ok" ? "#1a7a4a" : status === "blank" || status === "blurred" ? "#c0392b" : "#e2e6ec" }}
        aria-labelledby={id}
      >
        <div style={{ fontSize:18, marginBottom:4 }}>📎</div>
        <div style={{ fontSize:12, fontWeight:500, color:"#4a5568" }}>
          {value ? value.name : "Click to upload"}
        </div>
        <div style={{ fontSize:11, color:"#8a97a8", marginTop:2 }}>PDF, JPG, PNG · Max 5 MB</div>
      </div>
      <input
        ref={fileRef}
        id={id}
        name={id}
        type="file"
        accept={accept}
        onChange={handleChange}
        style={{ display:"none" }}
      />
      {sc && <div style={{ fontSize:11, color:sc.color, marginTop:4, fontWeight:500 }}>{sc.text}</div>}
    </div>
  );
}