import React from 'react';

export function Card({ className, children }: { className?: string, children: React.ReactNode }) {
  return (
    <div className={`rounded-2xl border border-white/10 ${className || ''}`}>
      {children}
    </div>
  );
}
