import React, { useState } from 'react';
import { submitPipeline } from '../submit';

export function SubmitButton({ nodes, edges }) {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async () => {
    setLoading(true);
    setResult(null);
    setError(null);
    try {
      const data = await submitPipeline(nodes, edges);
      setResult(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={handleSubmit}
        disabled={loading}
        style={{
          position: 'fixed',
          bottom: 24,
          left: '50%',
          transform: 'translateX(-50%)',
          background: loading
            ? 'var(--surface2)'
            : 'linear-gradient(135deg, #7c6af7, #f76ac8)',
          border: 'none',
          borderRadius: 12,
          padding: '12px 32px',
          color: '#fff',
          fontSize: 14,
          fontWeight: 700,
          fontFamily: 'var(--font-display)',
          letterSpacing: '0.05em',
          cursor: loading ? 'not-allowed' : 'pointer',
          zIndex: 100,
          boxShadow: loading ? 'none' : '0 4px 24px rgba(124,106,247,0.5)',
          transition: 'all 0.2s',
          display: 'flex',
          alignItems: 'center',
          gap: 8,
        }}
        onMouseEnter={e => { if (!loading) e.currentTarget.style.transform = 'translateX(-50%) translateY(-2px)'; }}
        onMouseLeave={e => { e.currentTarget.style.transform = 'translateX(-50%)'; }}
      >
        {loading ? (
          <><span style={{ display: 'inline-block', animation: 'spin 1s linear infinite' }}>◌</span> Parsing...</>
        ) : (
          <><span>▶</span> Submit Pipeline</>
        )}
      </button>

      {/* Result Modal */}
      {(result || error) && (
        <div
          onClick={() => { setResult(null); setError(null); }}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.7)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 200,
            backdropFilter: 'blur(4px)',
          }}
        >
          <div
            onClick={e => e.stopPropagation()}
            style={{
              background: 'var(--surface)',
              border: `1px solid ${error ? '#f76a6a' : '#7c6af7'}`,
              borderRadius: 18,
              padding: '32px 40px',
              minWidth: 340,
              boxShadow: `0 24px 80px rgba(0,0,0,0.8), 0 0 40px ${error ? '#f76a6a33' : '#7c6af733'}`,
              textAlign: 'center',
            }}
          >
            {error ? (
              <>
                <div style={{ fontSize: 40, marginBottom: 12 }}>⚠️</div>
                <div style={{ fontWeight: 700, fontSize: 16, color: '#f76a6a', marginBottom: 8 }}>Connection Error</div>
                <div style={{ fontSize: 12, fontFamily: 'var(--font-mono)', color: 'var(--text-dim)', marginBottom: 20 }}>{error}</div>
                <div style={{ fontSize: 11, color: 'var(--text-dim)' }}>Make sure the backend is running on port 8000</div>
              </>
            ) : (
              <>
                <div style={{ fontSize: 40, marginBottom: 12 }}>
                  {result.is_dag ? '✅' : '⚠️'}
                </div>
                <div style={{ fontWeight: 800, fontSize: 18, color: 'var(--text)', marginBottom: 20, fontFamily: 'var(--font-display)' }}>
                  Pipeline Analysis
                </div>
                <div style={{ display: 'flex', gap: 16, justifyContent: 'center', marginBottom: 20 }}>
                  <StatBox label="Nodes" value={result.num_nodes} color="#7c6af7" />
                  <StatBox label="Edges" value={result.num_edges} color="#f76ac8" />
                  <StatBox label="DAG" value={result.is_dag ? 'Yes' : 'No'} color={result.is_dag ? '#6af7c8' : '#f76a6a'} />
                </div>
                <div style={{
                  fontSize: 12,
                  fontFamily: 'var(--font-mono)',
                  color: result.is_dag ? '#6af7c8' : '#f76a6a',
                  background: result.is_dag ? '#6af7c822' : '#f76a6a22',
                  borderRadius: 8,
                  padding: '8px 16px',
                }}>
                  {result.is_dag
                    ? '✓ Pipeline is a valid Directed Acyclic Graph'
                    : '✗ Pipeline contains cycles — not a valid DAG'}
                </div>
              </>
            )}
            <button
              onClick={() => { setResult(null); setError(null); }}
              style={{
                marginTop: 20,
                background: 'var(--surface2)',
                border: '1px solid var(--border)',
                borderRadius: 8,
                padding: '8px 24px',
                color: 'var(--text-dim)',
                fontSize: 12,
                fontFamily: 'var(--font-display)',
                cursor: 'pointer',
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}

      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </>
  );
}

function StatBox({ label, value, color }) {
  return (
    <div style={{
      background: `${color}18`,
      border: `1px solid ${color}44`,
      borderRadius: 10,
      padding: '12px 16px',
      minWidth: 70,
    }}>
      <div style={{ fontSize: 22, fontWeight: 800, color, fontFamily: 'var(--font-display)' }}>{value}</div>
      <div style={{ fontSize: 10, color: 'var(--text-dim)', fontFamily: 'var(--font-mono)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>{label}</div>
    </div>
  );
}
