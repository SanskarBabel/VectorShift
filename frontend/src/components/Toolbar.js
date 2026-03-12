import React from 'react';
import { nodeMenu } from '../nodes/nodeTypes';

export function Toolbar({ onAddNode }) {
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      height: 56,
      background: 'rgba(10,10,15,0.95)',
      backdropFilter: 'blur(20px)',
      borderBottom: '1px solid var(--border)',
      display: 'flex',
      alignItems: 'center',
      padding: '0 20px',
      gap: 8,
      zIndex: 100,
    }}>
      {/* Logo */}
      <div style={{
        fontFamily: 'var(--font-display)',
        fontWeight: 800,
        fontSize: 18,
        letterSpacing: '-0.02em',
        background: 'linear-gradient(135deg, #7c6af7, #f76ac8)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        marginRight: 16,
        whiteSpace: 'nowrap',
      }}>
        VectorShift
      </div>

      <div style={{ width: 1, height: 30, background: 'var(--border)', margin: '0 8px' }} />

      <span style={{ fontSize: 11, color: 'var(--text-dim)', fontFamily: 'var(--font-mono)', marginRight: 8 }}>
        ADD NODE
      </span>

      {/* Node buttons */}
      <div style={{ display: 'flex', gap: 6, flex: 1, overflowX: 'auto', padding: '4px 0' }}>
        {nodeMenu.map(({ type, label, icon, color }) => (
          <button
            key={type}
            onClick={() => onAddNode(type)}
            title={label}
            style={{
              background: `${color}18`,
              border: `1px solid ${color}44`,
              borderRadius: 8,
              padding: '5px 12px',
              color: color,
              fontSize: 11,
              fontFamily: 'var(--font-display)',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 5,
              whiteSpace: 'nowrap',
              transition: 'all 0.15s',
              letterSpacing: '0.02em',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = `${color}33`;
              e.currentTarget.style.borderColor = color;
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = `${color}18`;
              e.currentTarget.style.borderColor = `${color}44`;
            }}
          >
            <span style={{ fontSize: 13 }}>{icon}</span>
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}
