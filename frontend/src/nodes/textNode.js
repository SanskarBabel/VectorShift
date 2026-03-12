import React, { useState, useEffect, useRef } from 'react';
import { Handle, Position } from 'reactflow';

const VARIABLE_REGEX = /\{\{\s*([a-zA-Z_][a-zA-Z0-9_]*)\s*\}\}/g;

function extractVariables(text) {
  const vars = new Set();
  let match;
  const regex = new RegExp(VARIABLE_REGEX.source, 'g');
  while ((match = regex.exec(text)) !== null) {
    vars.add(match[1]);
  }
  return [...vars];
}

export function TextNode({ id, data }) {
  const [text, setText] = useState(data?.text || '');
  const textareaRef = useRef(null);
  const [size, setSize] = useState({ width: 240, height: 'auto' });
  const variables = extractVariables(text);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      const newHeight = Math.max(60, textareaRef.current.scrollHeight);
      textareaRef.current.style.height = newHeight + 'px';
      const lines = text.split('\n');
      const maxLineLen = Math.max(...lines.map(l => l.length), 20);
      const newWidth = Math.max(240, Math.min(500, maxLineLen * 8 + 60));
      setSize({ width: newWidth });
    }
  }, [text]);

  const accentColor = '#f7c86a';

  return (
    <div style={{
      background: 'var(--node-bg)',
      border: `1.5px solid ${accentColor}`,
      borderRadius: 14,
      width: size.width,
      boxShadow: `0 0 0 1px rgba(0,0,0,0.5), 0 8px 32px rgba(0,0,0,0.5), 0 0 20px ${accentColor}22`,
      fontFamily: 'var(--font-display)',
      overflow: 'hidden',
      transition: 'width 0.1s',
      position: 'relative',
    }}>
      {/* Header */}
      <div style={{
        background: `linear-gradient(135deg, ${accentColor}33, ${accentColor}11)`,
        borderBottom: `1px solid ${accentColor}44`,
        padding: '10px 14px',
        display: 'flex',
        alignItems: 'center',
        gap: 8,
      }}>
        <span style={{ fontSize: 16 }}>✏️</span>
        <span style={{
          fontSize: 12,
          fontWeight: 700,
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          color: accentColor,
          fontFamily: 'var(--font-display)',
        }}>Text</span>
        <span style={{ marginLeft: 'auto', fontSize: 9, fontFamily: 'var(--font-mono)', color: 'var(--text-dim)', opacity: 0.6 }}>
          {id?.slice(0, 8)}
        </span>
      </div>

      {/* Body */}
      <div style={{ padding: '12px 14px' }}>
        <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--text-dim)', marginBottom: 5, fontFamily: 'var(--font-mono)' }}>
          Text Content
        </div>
        <textarea
          ref={textareaRef}
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder="Enter text... use {{variable}} for inputs"
          style={{
            width: '100%',
            minHeight: 60,
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            borderRadius: 6,
            padding: '6px 10px',
            color: 'var(--text)',
            fontSize: 12,
            fontFamily: 'var(--font-mono)',
            outline: 'none',
            resize: 'none',
            overflow: 'hidden',
            lineHeight: 1.5,
            transition: 'border-color 0.2s',
          }}
          onFocus={e => e.target.style.borderColor = accentColor}
          onBlur={e => e.target.style.borderColor = 'var(--border)'}
        />
        {variables.length > 0 && (
          <div style={{ marginTop: 8, display: 'flex', flexWrap: 'wrap', gap: 4 }}>
            {variables.map(v => (
              <span key={v} style={{
                fontSize: 9,
                fontFamily: 'var(--font-mono)',
                background: `${accentColor}22`,
                border: `1px solid ${accentColor}44`,
                color: accentColor,
                borderRadius: 4,
                padding: '2px 6px',
              }}>
                {`{{${v}}}`}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Dynamic variable input handles */}
      {variables.map((varName, i) => (
        <Handle
          key={`var-${varName}`}
          type="target"
          position={Position.Left}
          id={`var-${varName}`}
          style={{
            background: 'var(--node-bg)',
            border: `2px solid ${accentColor}`,
            top: variables.length === 1 ? '50%' : `${((i + 1) / (variables.length + 1)) * 100}%`,
          }}
        >
          <span style={{
            position: 'absolute',
            left: 14,
            top: '50%',
            transform: 'translateY(-50%)',
            fontSize: 9,
            fontFamily: 'var(--font-mono)',
            color: accentColor,
            whiteSpace: 'nowrap',
            pointerEvents: 'none',
          }}>
            {varName}
          </span>
        </Handle>
      ))}

      {/* Output handle */}
      <Handle
        type="source"
        position={Position.Right}
        id="output"
        style={{
          background: 'var(--node-bg)',
          border: `2px solid ${accentColor}`,
          top: '50%',
        }}
      />
    </div>
  );
}
