import React from 'react';

const LOGO_URL = 'https://app.practicepal.ie/icons/icon-512.png';

export default function Logo({ size = 28, className = '' }) {
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <img
        src={LOGO_URL}
        alt="PracticePal logo"
        width={size}
        height={size}
        className="rounded-md"
        style={{ width: size, height: size }}
      />
      <span className="font-heading text-xl text-chalk tracking-tight leading-none">
        PracticePal
      </span>
    </div>
  );
}
