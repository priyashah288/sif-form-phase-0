import React, { useRef, memo } from "react";
import { MultiSelect } from "../common/MultiSelect";
import { QUALIFICATIONS, DESIGNATIONS, DEPARTMENTS, WORKLOADS, COURSES_LIST } from "../../utils/constants";
import { inputStyle } from "../../styles/inputStyle";

const tdS = {
  padding: "8px 10px",
  verticalAlign: "top",
  fontSize: 12,
  position: "relative",
  overflow: "visible",
};

const tdQuals = { ...tdS, minWidth: 200, maxWidth: 240 };
const tdDepts = { ...tdS, minWidth: 200, maxWidth: 240 };

const FacultyRowComponent = ({ row, onChange, onRemove, index }) => {
  const photoRef = useRef();

  return (
    <tr style={{ borderBottom: "1px solid #e2e6ec" }}>
      <td style={tdS}>{index + 1}</td>
      <td style={tdS}>
        <div style={{ display: "flex", flexDirection: "column", gap: 4, alignItems: "center" }}>
          <div
            onClick={() => photoRef.current?.click()}
            style={{
              width: 40, height: 40, borderRadius: "50%", background: "#e2e6ec",
              display: "flex", alignItems: "center", justifyContent: "center",
              cursor: "pointer", overflow: "hidden", border: "1px solid #c8973a",
              fontSize: 18, flexShrink: 0,
            }}
          >
            {row.photoUrl ? (
              <img src={row.photoUrl} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            ) : (
              <span>👤</span>
            )}
          </div>
          <input
            ref={photoRef}
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            onChange={e => {
              const f = e.target.files[0];
              if (f) {
                onChange("photoUrl", URL.createObjectURL(f));
                onChange("photoFile", f);
              }
            }}
          />
        </div>
      </td>
      <td style={tdS}>
        <input
          id={`${row.id}-name`}
          name={`${row.id}-name`}
          style={{ ...inputStyle(false), width: 160, fontSize: 12 }}
          value={row.name}
          onChange={e => onChange("name", e.target.value)}
          placeholder="Full name"
          aria-label="Faculty name"
        />
      </td>
      <td style={tdS}>
        <input
          id={`${row.id}-council`}
          name={`${row.id}-council`}
          style={{ ...inputStyle(false), width: 110, fontSize: 12 }}
          value={row.councilNo}
          onChange={e => onChange("councilNo", e.target.value)}
          placeholder="BH-P-XX-XXXXX"
          aria-label="Council number"
        />
      </td>
      <td style={tdQuals}>
        <MultiSelect
          id={`${row.id}-quals`}
          options={QUALIFICATIONS}
          value={row.qualifications}
          placeholder="Select qualifications"
          onChange={v => onChange("qualifications", v)}
        />
      </td>
      <td style={tdS}>
        <select
          id={`${row.id}-designation`}
          name={`${row.id}-designation`}
          value={row.designation}
          onChange={e => onChange("designation", e.target.value)}
          style={{ ...inputStyle(false), width: 140, fontSize: 12 }}
          aria-label="Designation"
        >
          <option value="">— Select —</option>
          {DESIGNATIONS.map(d => <option key={d}>{d}</option>)}
        </select>
      </td>
      <td style={tdDepts}>
        <MultiSelect
          id={`${row.id}-depts`}
          options={DEPARTMENTS}
          value={row.departments}
          placeholder="Select departments"
          onChange={v => onChange("departments", v)}
        />
      </td>
      <td style={tdS}>
        <select
          id={`${row.id}-course`}
          name={`${row.id}-course`}
          value={row.course}
          onChange={e => onChange("course", e.target.value)}
          style={{ ...inputStyle(false), width: 90, fontSize: 12 }}
          aria-label="Course"
        >
          <option value="">—</option>
          {COURSES_LIST.map(c => <option key={c.id}>{c.label}</option>)}
          <option>All</option>
        </select>
      </td>
      <td style={tdS}>
        <input
          id={`${row.id}-exp`}
          name={`${row.id}-exp`}
          type="number"
          style={{ ...inputStyle(false), width: 55, fontSize: 12 }}
          value={row.exp}
          onChange={e => onChange("exp", e.target.value)}
          aria-label="Experience years"
        />
      </td>
      <td style={tdS}>
        <select
          id={`${row.id}-workload`}
          name={`${row.id}-workload`}
          value={row.workload}
          onChange={e => onChange("workload", e.target.value)}
          style={{ ...inputStyle(false), width: 65, fontSize: 12 }}
          aria-label="Workload hours per week"
        >
          {WORKLOADS.map(w => <option key={w}>{w}</option>)}
        </select>
      </td>
      <td style={tdS}>
        <input
          id={`${row.id}-doj`}
          name={`${row.id}-doj`}
          type="date"
          style={{ ...inputStyle(false), width: 120, fontSize: 12 }}
          value={row.doj}
          onChange={e => onChange("doj", e.target.value)}
          aria-label="Date of joining"
        />
      </td>
      <td style={tdS}>
        <select
          id={`${row.id}-aebas`}
          name={`${row.id}-aebas`}
          value={row.aebas}
          onChange={e => onChange("aebas", e.target.value)}
          style={{ ...inputStyle(false), width: 100, fontSize: 12 }}
          aria-label="AEBAS status"
        >
          <option>Not Verified</option>
          <option>Verified</option>
        </select>
      </td>
      <td style={tdS}>
        <select
          id={`${row.id}-ftpt`}
          name={`${row.id}-ftpt`}
          value={row.ftpt}
          onChange={e => onChange("ftpt", e.target.value)}
          style={{
            ...inputStyle(false),
            width: 80,
            fontSize: 12,
            background: row.ftpt === "Part-Time" ? "#fdf0ef" : "#f7f8fa",
          }}
          aria-label="Full-time / Part-time"
        >
          <option>Full-Time</option>
          <option>Part-Time</option>
        </select>
      </td>
      <td style={tdS}>
        <button
          onClick={onRemove}
          aria-label="Remove faculty member"
          style={{
            padding: "4px 8px",
            borderRadius: 6,
            border: "1px solid #f0a0a0",
            background: "#fdf0ef",
            color: "#c0392b",
            cursor: "pointer",
            fontSize: 11,
            fontFamily: "'DM Sans', sans-serif",
          }}
        >
          ✕
        </button>
      </td>
    </tr>
  );
};

FacultyRowComponent.displayName = "FacultyRow";
export const FacultyRow = memo(FacultyRowComponent);