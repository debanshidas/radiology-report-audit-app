import React from 'react';

export function SkeletonText({ width = '100%', height = '14px', style = {} }) {
  return (
    <div
      className="skeleton-pulse"
      style={{
        width,
        height,
        ...style
      }}
    />
  );
}

export function SkeletonPanel({ height = '120px', style = {} }) {
  return (
    <div
      className="enterprise-card"
      style={{
        padding: '16px',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        ...style
      }}
    >
      <SkeletonText width="40%" height="16px" />
      <SkeletonText width="90%" height="12px" />
      <SkeletonText width="75%" height="12px" />
    </div>
  );
}

export function SkeletonTable({ rows = 5, cols = 4 }) {
  return (
    <div className="enterprise-card" style={{ padding: 0, overflow: 'hidden' }}>
      <div style={{ padding: '12px 16px', background: 'var(--surface-muted)', borderBottom: '1px solid var(--border)' }}>
        <SkeletonText width="200px" height="14px" />
      </div>
      <table className="enterprise-table">
        <thead>
          <tr>
            {Array.from({ length: cols }).map((_, i) => (
              <th key={i}><SkeletonText width="60px" height="10px" /></th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: rows }).map((_, r) => (
            <tr key={r}>
              {Array.from({ length: cols }).map((_, c) => (
                <td key={c}><SkeletonText width={c === 0 ? '140px' : '60px'} height="12px" /></td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function SkeletonLoader({ type = 'panel', ...props }) {
  if (type === 'table') return <SkeletonTable {...props} />;
  if (type === 'text') return <SkeletonText {...props} />;
  return <SkeletonPanel {...props} />;
}
