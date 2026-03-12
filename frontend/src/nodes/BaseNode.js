import React from "react";
import { Handle, Position } from "reactflow";

const handleStyle = (index, total, accent) => ({
  background: "var(--node-bg)",
  border: `2px solid ${accent || "var(--accent)"}`,
  top: total === 1 ? "50%" : `${((index + 1) / (total + 1)) * 100}%`,
});

export function BaseNode({
  id,
  data,
  title,
  icon,
  accentColor = "var(--accent)",
  inputs = [],
  outputs = [],
  children,
  minWidth = 220,
  minHeight,
  style = {},
}) {
  return (
    <div
      style={{
        background: "var(--node-bg)",
        border: `1.5px solid ${accentColor}`,
        borderRadius: 14,
        minWidth,
        minHeight,
        boxShadow: `0 0 0 1px rgba(0,0,0,0.5), 0 8px 32px rgba(0,0,0,0.5), 0 0 20px ${accentColor}22`,
        fontFamily: "var(--font-display)",
        overflow: "hidden",
        transition: "box-shadow 0.2s",
        ...style,
      }}
    >
      {/* Header */}
      <div
        style={{
          background: `linear-gradient(135deg, ${accentColor}33, ${accentColor}11)`,
          borderBottom: `1px solid ${accentColor}44`,
          padding: "10px 14px",
          display: "flex",
          alignItems: "center",
          gap: 8,
        }}
      >
        {icon && <span style={{ fontSize: 16, lineHeight: 1 }}>{icon}</span>}
        <span
          style={{
            fontSize: 12,
            fontWeight: 700,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: accentColor,
            fontFamily: "var(--font-display)",
          }}
        >
          {title}
        </span>
        <span
          style={{
            marginLeft: "auto",
            fontSize: 9,
            fontFamily: "var(--font-mono)",
            color: "var(--text-dim)",
            opacity: 0.6,
          }}
        >
          {id?.slice(0, 8)}
        </span>
      </div>

      {/* Body */}
      <div style={{ padding: "12px 14px" }}>{children}</div>

      {/* Input Handles */}
      {inputs.map((input, i) => (
        <Handle
          key={`in-${input.id || i}`}
          type="target"
          position={Position.Left}
          id={input.id || `input-${i}`}
          style={handleStyle(i, inputs.length, accentColor)}
        >
          {input.label && (
            <span
              style={{
                position: "absolute",
                left: 14,
                top: "50%",
                transform: "translateY(-50%)",
                fontSize: 9,
                fontFamily: "var(--font-mono)",
                color: "var(--text-dim)",
                whiteSpace: "nowrap",
                pointerEvents: "none",
              }}
            >
              {input.label}
            </span>
          )}
        </Handle>
      ))}

      {/* Output Handles */}
      {outputs.map((output, i) => (
        <Handle
          key={`out-${output.id || i}`}
          type="source"
          position={Position.Right}
          id={output.id || `output-${i}`}
          style={handleStyle(i, outputs.length, accentColor)}
        >
          {output.label && (
            <span
              style={{
                position: "absolute",
                right: 14,
                top: "50%",
                transform: "translateY(-50%)",
                fontSize: 9,
                fontFamily: "var(--font-mono)",
                color: "var(--text-dim)",
                whiteSpace: "nowrap",
                pointerEvents: "none",
              }}
            >
              {output.label}
            </span>
          )}
        </Handle>
      ))}
    </div>
  );
}

// Shared field components
export const FieldLabel = ({ children }) => (
  <div
    style={{
      fontSize: 10,
      fontWeight: 600,
      letterSpacing: "0.06em",
      textTransform: "uppercase",
      color: "var(--text-dim)",
      marginBottom: 5,
      fontFamily: "var(--font-mono)",
    }}
  >
    {children}
  </div>
);

export const FieldInput = ({ value, onChange, placeholder, style = {} }) => (
  <input
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    style={{
      width: "100%",
      background: "var(--surface)",
      border: "1px solid var(--border)",
      borderRadius: 6,
      padding: "6px 10px",
      color: "var(--text)",
      fontSize: 12,
      fontFamily: "var(--font-mono)",
      outline: "none",
      transition: "border-color 0.2s",
      ...style,
    }}
    onFocus={(e) => (e.target.style.borderColor = "var(--accent)")}
    onBlur={(e) => (e.target.style.borderColor = "var(--border)")}
  />
);

export const FieldSelect = ({ value, onChange, options }) => (
  <select
    value={value}
    onChange={onChange}
    style={{
      width: "100%",
      background: "var(--surface)",
      border: "1px solid var(--border)",
      borderRadius: 6,
      padding: "6px 10px",
      color: "var(--text)",
      fontSize: 12,
      fontFamily: "var(--font-mono)",
      outline: "none",
      cursor: "pointer",
    }}
  >
    {options.map((opt) => (
      <option key={opt.value} value={opt.value}>
        {opt.label}
      </option>
    ))}
  </select>
);
