
import { useForm } from "../../context/FormContext";
import { Label, PincodeLookup, LocationPicker, UploadField } from "../common";
import { INST_TYPES } from "../../utils/constants";
import { REGEX } from "../../utils/regex";
import { inputStyle } from "../../styles/inputStyle";
import React, { useState } from "react";
const S = {
  card:   { background:"#fff", border:"1px solid #e2e6ec", borderRadius:14, padding:22, marginBottom:18, boxShadow:"0 1px 4px rgba(13,27,42,.06)" },
  cardT:  { fontSize:13, fontWeight:600, color:"#0d1b2a", marginBottom:16, display:"flex", alignItems:"center", gap:8 },
  secHdr: { marginBottom:24, paddingBottom:18, borderBottom:"1px solid #e2e6ec" },
  secTag: { fontFamily:"monospace", fontSize:10, fontWeight:500, color:"#c8973a", letterSpacing:"0.08em", textTransform:"uppercase", marginBottom:6 },
  secTitle:{ fontSize:20, fontWeight:700, color:"#0d1b2a", marginBottom:4 },
  secDesc:{ fontSize:13, color:"#4a5568" },
  grid2:  { display:"grid", gridTemplateColumns:"1fr 1fr", gap:14 },
  grid3:  { display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:14 },
  sep:    { height:1, background:"#e2e6ec", margin:"16px 0" },
};

const CardTitle = ({ children }) => (
  <div style={S.cardT}>
    <span style={{ width:3, height:14, background:"#c8973a", borderRadius:2, flexShrink:0 }} />
    {children}
  </div>
);

const Field = ({ label, required, children, hint, error }) => {
  const id = label?.toLowerCase().replace(/\s/g, "-") || Math.random().toString(36);
  return (
    <div style={{ display:"flex", flexDirection:"column", gap:4 }}>
      {label && <Label required={required} htmlFor={id}>{label}</Label>}
      {React.isValidElement(children) ? React.cloneElement(children, { id, name: id }) : children}
      {hint && <span style={{ fontSize:11, color:"#8a97a8" }}>{hint}</span>}
      {error && <span style={{ fontSize:11, color:"#c0392b" }}>{error}</span>}
    </div>
  );
};

export function InstitutionSection() {
  const { formData, updateInstitution, errors, setErrors } = useForm();
  const [pincodeData, setPincodeData] = useState({ postOffices:[], district:"", state:"" });

  const validate = (field, val) => {
    const errs = { ...errors };
    if (field === "email" && val && !REGEX.email.test(val)) errs.email = "Invalid email address";
    else if (field === "email") delete errs.email;
    if (field === "mobile" && val && !REGEX.mobile.test(val)) errs.mobile = "Must be 10 digits starting with 6-9";
    else if (field === "mobile") delete errs.mobile;
    if (field === "pciCode" && val && !REGEX.pci.test(val)) errs.pciCode = "Format: PCI-XXXX";
    else if (field === "pciCode") delete errs.pciCode;
    setErrors(errs);
  };

  const handlePincodeData = (data) => {
    setPincodeData(data);
    updateInstitution("district", data.district);
    updateInstitution("state", data.state);
  };

  const inp = (field, opts = {}) => (
    <input
      {...opts}
      value={formData.institution[field] || ""}
      onChange={e => { updateInstitution(field, e.target.value); validate(field, e.target.value); }}
      style={{ ...inputStyle(!!errors[field]), ...(opts.style || {}) }}
    />
  );

  return (
    <div>
      <div style={S.secHdr}>
        <div style={S.secTag}>Section 01</div>
        <h1 style={S.secTitle}>Institution Details</h1>
        <p style={S.secDesc}>Basic identification, address, and administrative information.</p>
      </div>

      <div style={S.card}>
        <CardTitle>Institution Identity</CardTitle>
        <div style={S.grid2}>
          <div style={{ gridColumn:"1 / -1" }}>
            <Field label="Institution Name" required error={errors.instName}>
              {inp("name", { placeholder:"Full legal name as per PCI registration" })}
            </Field>
          </div>
          <Field label="PCI Code" required error={errors.pciCode}>
            {inp("pciCode", { placeholder:"PCI-XXXX" })}
          </Field>
          <Field label="Pharmacy Council Reg. No." required>
            {inp("hoiCouncilNo", { placeholder:"BH-P-XX-XXXXX" })}
          </Field>
          <Field label="Year of Establishment" required>
            {inp("yearEst", { type:"number", placeholder:"YYYY", min:1900, max:2026 })}
          </Field>
          <Field label="Institution Type" required>
            <select value={formData.institution.instType}
              onChange={e => updateInstitution("instType", e.target.value)} style={inputStyle(false)}>
              <option value="">— Select —</option>
              {INST_TYPES.map(t => <option key={t}>{t}</option>)}
            </select>
          </Field>
        </div>
      </div>

      <div style={S.card}>
        <CardTitle>Institution Address</CardTitle>
        <div style={S.grid2}>
          <div style={{ gridColumn:"1 / -1" }}>
            <Field label="Address Line 1" required>
              {inp("address1", { placeholder:"House/Apt No., Street/Road" })}
            </Field>
          </div>
          <div style={{ gridColumn:"1 / -1" }}>
            <Field label="Address Line 2">
              {inp("address2", { placeholder:"Area/Locality, Landmark" })}
            </Field>
          </div>
          <PincodeLookup
            value={formData.institution.pincode || ""}
            onChange={v => updateInstitution("pincode", v)}
            onDataFetched={handlePincodeData}
          />
          <Field label="District">
            <input value={formData.institution.district || ""} readOnly
              onChange={e => updateInstitution("district", e.target.value)}
              style={{ ...inputStyle(false), background: pincodeData.district ? "#eaf5ee" : "#f7f8fa" }}
              placeholder="Auto-filled from PIN" />
          </Field>
          <Field label="State">
            <input value={formData.institution.state || ""} readOnly
              onChange={e => updateInstitution("state", e.target.value)}
              style={{ ...inputStyle(false), background: pincodeData.state ? "#eaf5ee" : "#f7f8fa" }}
              placeholder="Auto-filled from PIN" />
          </Field>
          <Field label="Village / Town">{inp("village", { placeholder:"Village or town name" })}</Field>
          <Field label="Block / Tehsil">{inp("tehsil", { placeholder:"Block name" })}</Field>
          <Field label="Gram Panchayat">{inp("gramPanchayat", { placeholder:"Gram Panchayat" })}</Field>
          <Field label="Post Office" hint="Fetched from PIN code">
            {pincodeData.postOffices?.length > 0 ? (
              <select value={formData.institution.postOffice || ""}
                onChange={e => updateInstitution("postOffice", e.target.value)}
                style={{ ...inputStyle(false), background:"#eaf5ee" }}>
                <option value="">— Select Post Office —</option>
                {pincodeData.postOffices.map(po => <option key={po}>{po}</option>)}
              </select>
            ) : (
              <input value={formData.institution.postOffice || ""}
                onChange={e => updateInstitution("postOffice", e.target.value)}
                style={inputStyle(false)} placeholder="Enter after PIN lookup" />
            )}
          </Field>
          <Field label="Police Station">{inp("policeStation", { placeholder:"Nearest police station" })}</Field>
          <Field label="Nearest Railway Station">{inp("nearestRailway", { placeholder:"Station name" })}</Field>
          <Field label="Nearest Airport">{inp("nearestAirport", { placeholder:"Airport name" })}</Field>
        </div>
        <div style={S.sep} />
        <LocationPicker
          lat={formData.institution.lat || ""}
          lng={formData.institution.lng || ""}
          onFetch={(la, ln) => { updateInstitution("lat", la); updateInstitution("lng", ln); }}
          onLatChange={v => updateInstitution("lat", v)}
          onLngChange={v => updateInstitution("lng", v)}
        />
      </div>

      <div style={S.card}>
        <CardTitle>Contact Details</CardTitle>
        <div style={S.grid2}>
          <Field label="Mobile Number" required error={errors.mobile}>
            <input type="tel" value={formData.institution.mobile || ""}
              onChange={e => { updateInstitution("mobile", e.target.value); validate("mobile", e.target.value); }}
              style={inputStyle(!!errors.mobile)} placeholder="10-digit (starts 6-9)" maxLength={10} />
          </Field>
          <Field label="Landline (with STD)">{inp("landline", { type:"tel", placeholder:"STD + number" })}</Field>
          <Field label="Email ID" required error={errors.email}>
            <input type="email" value={formData.institution.email || ""}
              onChange={e => { updateInstitution("email", e.target.value); validate("email", e.target.value); }}
              style={inputStyle(!!errors.email)} placeholder="principal@institution.edu.in" />
          </Field>
        </div>
      </div>

      <div style={S.card}>
        <CardTitle>Head of Institution</CardTitle>
        <div style={S.grid2}>
          <div style={{ gridColumn:"1 / -1" }}>
            <Field label="Name of Principal / Director / HOI" required>
              {inp("hoiName", { placeholder:"Full name with title" })}
            </Field>
          </div>
          <Field label="Pharmacy Council No." required>{inp("hoiCouncilNo", { placeholder:"BH-P-XX-XXXXX" })}</Field>
          <Field label="Qualification">{inp("hoiQual", { placeholder:"e.g. Ph.D., M.Pharm" })}</Field>
          <Field label="HOI Mobile" error={errors.hoiMobile}>
            <input type="tel" value={formData.institution.hoiMobile || ""}
              onChange={e => { updateInstitution("hoiMobile", e.target.value); validate("hoiMobile", e.target.value); }}
              style={inputStyle(!!errors.hoiMobile)} placeholder="10-digit" maxLength={10} />
          </Field>
          <Field label="HOI Email" error={errors.hoiEmail}>
            <input type="email" value={formData.institution.hoiEmail || ""}
              onChange={e => { updateInstitution("hoiEmail", e.target.value); validate("hoiEmail", e.target.value); }}
              style={inputStyle(!!errors.hoiEmail)} placeholder="hoi@institution.edu.in" />
          </Field>
        </div>
      </div>

      <div style={S.card}>
        <CardTitle>Accreditation</CardTitle>
        <div style={S.grid3}>
          <Field label="NAAC From"><input type="date" style={inputStyle(false)} /></Field>
          <Field label="NAAC Upto"><input type="date" style={inputStyle(false)} /></Field>
          <Field label="NAAC Grade">
            <select style={inputStyle(false)}>
              <option>— Select —</option>
              {["A++","A+","A","B++","B+","B","C"].map(g => <option key={g}>{g}</option>)}
            </select>
          </Field>
          <Field label="NIRF Ranking"><input type="number" placeholder="Rank (if any)" style={inputStyle(false)} /></Field>
          <Field label="NBA — B.Pharm From"><input type="date" style={inputStyle(false)} /></Field>
          <Field label="NBA — B.Pharm Upto"><input type="date" style={inputStyle(false)} /></Field>
        </div>
      </div>
    </div>
  );
}