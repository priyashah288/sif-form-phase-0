import React, { useState, useEffect, useRef } from "react";
import { inputStyle } from "../../styles/inputStyle";

export function MultiSelect({ options, value = [], onChange, placeholder = "Select...", id }) {
  const [open, setOpen] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const toggle = (opt) => {
    const next = value.includes(opt) ? value.filter(v => v !== opt) : [...value, opt];
    onChange(next);
  };

  return (
    <div ref={ref} style={{ position: "relative", overflow: "visible" }}>
      <div
        onClick={() => setOpen(!open)}
        style={{
          ...inputStyle(false),
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          userSelect: "none",
          minHeight: 38,
        }}
        id={id}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span style={{ fontSize: 12, color: value.length ? "#0d1b2a" : "#8a97a8", flexWrap: "wrap", display: "flex", gap: 4 }}>
          {value.length === 0 ? placeholder : value.map(v => (
            <span key={v} style={{ background: "#e2e6ec", borderRadius: 4, padding: "1px 6px", fontSize: 11 }}>{v}</span>
          ))}
        </span>
        <span style={{ color: "#8a97a8", fontSize: 10 }}>{open ? "▲" : "▼"}</span>
      </div>
      {open && (
        <div
          role="listbox"
          aria-labelledby={id}
          style={{
            position: "absolute",
            top: "100%",
            left: 0,
            right: 0,
            zIndex: 9999,
            background: "#fff",
            border: "1px solid #e2e6ec",
            borderRadius: 8,
            boxShadow: "0 4px 16px rgba(0,0,0,.1)",
            maxHeight: 220,
            overflowY: "auto",
            marginTop: 4,
          }}
        >
          {options.map(opt => (
            <label
              key={opt}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                padding: "8px 12px",
                cursor: "pointer",
                fontSize: 13,
                borderBottom: "1px solid #f7f8fa",
                background: value.includes(opt) ? "#fdf3e3" : "transparent",
              }}
            >
              <input
                type="checkbox"
                checked={value.includes(opt)}
                onChange={() => toggle(opt)}
                style={{ width: 14, height: 14, accentColor: "#c8973a" }}
              />
              {opt}
            </label>
          ))}
        </div>
      )}
    </div>
  );
}