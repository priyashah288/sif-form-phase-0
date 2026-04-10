import { useState } from "react";
import { Label } from "./Label";
import { inputStyle } from "../../styles/inputStyle";
import { REGEX } from "../../utils/regex";

export function PincodeLookup({ value, onChange, onDataFetched }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const id = "pincode";

  const lookup = async (pin) => {
    if (!REGEX.pincode.test(pin)) return;
    setLoading(true); setError("");
    try {
      const res = await fetch(`https://api.postalpincode.in/pincode/${pin}`);
      const data = await res.json();
      if (data[0]?.Status === "Success") {
        const records = data[0].PostOffice;
        const first = records[0];
        onDataFetched?.({
          district: first.District,
          state: first.State,
          postOffices: records.map(r => r.Name),
          taluk: first.Taluk,
          division: first.Division,
        });
      } else {
        setError("Invalid pincode or no data found");
      }
    } catch { setError("Failed to fetch pincode data"); }
    setLoading(false);
  };

  return (
    <div>
      <Label required htmlFor={id}>Pin Code</Label>
      <div style={{ position:"relative" }}>
        <input
          id={id}
          name={id}
          type="text"
          maxLength={6}
          value={value}
          onChange={e => { onChange(e.target.value); if (e.target.value.length === 6) lookup(e.target.value); }}
          style={{ ...inputStyle(!REGEX.pincode.test(value) && value.length > 0), paddingRight:32 }}
          placeholder="6-digit PIN"
        />
        {loading && <span style={{ position:"absolute", right:10, top:"50%", transform:"translateY(-50%)", fontSize:12 }}>⏳</span>}
      </div>
      {error && <span style={{ fontSize:11, color:"#c0392b" }}>{error}</span>}
    </div>
  );
}