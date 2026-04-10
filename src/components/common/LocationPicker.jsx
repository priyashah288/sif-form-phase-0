import { useState } from "react";
import { Label } from "./Label";
import { inputStyle } from "../../styles/inputStyle";
import { REGEX } from "../../utils/regex";

export function LocationPicker({ lat, lng, onFetch, onLatChange, onLngChange }) {
  const [fetching, setFetching] = useState(false);
  const [status, setStatus] = useState("");
  const latId = "latitude";
  const lngId = "longitude";

  const fetchLocation = () => {
    if (!navigator.geolocation) { setStatus("Geolocation not supported"); return; }
    setFetching(true); setStatus("Fetching location...");
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const la = pos.coords.latitude.toFixed(6);
        const ln = pos.coords.longitude.toFixed(6);
        onFetch?.(la, ln);
        setStatus("✓ Location fetched");
        setFetching(false);
      },
      () => { setStatus("❌ Permission denied or unavailable"); setFetching(false); }
    );
  };

  return (
    <div>
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12, marginBottom:6 }}>
        <div>
          <Label htmlFor={latId}>Latitude</Label>
          <input
            id={latId}
            name={latId}
            type="text"
            value={lat}
            onChange={e => onLatChange(e.target.value)}
            style={inputStyle(!REGEX.lat.test(lat) && lat.length > 0)}
            placeholder="e.g. 13.568788"
          />
        </div>
        <div>
          <Label htmlFor={lngId}>Longitude</Label>
          <input
            id={lngId}
            name={lngId}
            type="text"
            value={lng}
            onChange={e => onLngChange(e.target.value)}
            style={inputStyle(!REGEX.lng.test(lng) && lng.length > 0)}
            placeholder="e.g. 79.441517"
          />
        </div>
      </div>
      <button onClick={fetchLocation} disabled={fetching}
        style={{ display:"flex", alignItems:"center", gap:6, padding:"7px 14px",
          borderRadius:7, border:"1px dashed #c8973a", background:"#fdf3e3",
          color:"#8a5000", fontSize:12, fontWeight:500, cursor:"pointer", fontFamily:"'DM Sans', sans-serif" }}>
        📍 {fetching ? "Fetching..." : "Fetch My Location"}
      </button>
      {status && <div style={{ fontSize:11, color: status.startsWith("✓") ? "#1a7a4a" : "#c0392b", marginTop:4 }}>{status}</div>}
    </div>
  );
}