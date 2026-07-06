import React from 'react';

export default function HeroPhone() {
  return (
    <svg
      viewBox="0 0 120 200"
      className="w-full h-full"
      preserveAspectRatio="xMidYMid meet"
    >
      {/* Phone frame */}
      <rect x="1" y="1" width="118" height="198" rx="16" fill="#081F17" stroke="#8A9C8C" strokeWidth="0.6" opacity="0.95" />
      {/* Screen */}
      <rect x="4" y="4" width="112" height="192" rx="14" fill="#0D2E22" />
      {/* Notch */}
      <rect x="50" y="6" width="20" height="4" rx="2" fill="#081F17" />

      {/* Status bar */}
      <text x="10" y="16" fill="#8A9C8C" fontSize="4" fontFamily="Inter">19:42</text>
      <text x="100" y="16" fill="#8A9C8C" fontSize="4" fontFamily="Inter">87%</text>

      {/* App header */}
      <text x="10" y="28" fill="#F7F3E8" fontSize="6.5" fontFamily="Fraunces">PracticePal</text>
      <rect x="58" y="23" width="14" height="7" rx="1.5" fill="none" stroke="#DFF25E" strokeWidth="0.4" opacity="0.5" />
      <text x="61" y="28" fill="#DFF25E" fontSize="3.5" fontFamily="Inter" fontWeight="600" letterSpacing="0.3">BETA</text>

      <line x1="4" y1="33" x2="116" y2="33" stroke="#8A9C8C" strokeWidth="0.3" opacity="0.15" />

      {/* Session title */}
      <text x="10" y="42" fill="#8A9C8C" fontSize="3.2" fontFamily="Inter" letterSpacing="0.6">TUESDAY · 4 PLAYERS · 60 MIN</text>
      <text x="10" y="50" fill="#F7F3E8" fontSize="6" fontFamily="Fraunces">Cross-court + Volley</text>

      {/* Court diagram */}
      <g transform="translate(22, 56)">
        <rect x="0" y="0" width="76" height="56" fill="none" stroke="#F7F3E8" strokeWidth="0.4" strokeDasharray="2 2.5" opacity="0.25" />
        <line x1="0" y1="28" x2="76" y2="28" stroke="#C9A445" strokeWidth="0.5" strokeDasharray="2.5 1.5" opacity="0.4" />
        <line x1="9" y1="0" x2="9" y2="56" stroke="#F7F3E8" strokeWidth="0.3" strokeDasharray="2 2.5" opacity="0.18" />
        <line x1="67" y1="0" x2="67" y2="56" stroke="#F7F3E8" strokeWidth="0.3" strokeDasharray="2 2.5" opacity="0.18" />
        <line x1="9" y1="14" x2="67" y2="14" stroke="#F7F3E8" strokeWidth="0.3" strokeDasharray="2 2.5" opacity="0.18" />
        <line x1="9" y1="42" x2="67" y2="42" stroke="#F7F3E8" strokeWidth="0.3" strokeDasharray="2 2.5" opacity="0.18" />
        <line x1="38" y1="14" x2="38" y2="42" stroke="#F7F3E8" strokeWidth="0.3" strokeDasharray="2 2.5" opacity="0.18" />
        {/* Players */}
        <circle cx="26" cy="22" r="2.5" fill="#8A5BC7" />
        <circle cx="50" cy="36" r="2.5" fill="#63B57F" />
        <text x="26" y="23.5" fill="#F7F3E8" fontSize="2.5" fontFamily="Inter" fontWeight="600" textAnchor="middle">1</text>
        <text x="50" y="37.5" fill="#F7F3E8" fontSize="2.5" fontFamily="Inter" fontWeight="600" textAnchor="middle">2</text>
        {/* Ball path */}
        <path d="M 26 22 Q 38 12 50 36" fill="none" stroke="#DFF25E" strokeWidth="0.7" strokeDasharray="1.5 1.5" opacity="0.7" />
        <circle cx="50" cy="36" r="1.3" fill="#DFF25E" />
        {/* Target */}
        <circle cx="62" cy="10" r="3" fill="none" stroke="#C9A445" strokeWidth="0.4" strokeDasharray="1 1" opacity="0.4" />
      </g>

      {/* Drill meta */}
      <text x="10" y="120" fill="#C2CDBA" fontSize="3" fontFamily="Inter">
        <tspan x="10" dy="0">Aim: Consistent cross-court depth</tspan>
        <tspan x="10" dy="4.5">Cycle: 4 balls · Target: 8/10</tspan>
      </text>

      {/* Coaching cue */}
      <rect x="8" y="133" width="104" height="26" rx="4" fill="#F7F3E8" opacity="0.05" />
      <text x="12" y="142" fill="#E8CF86" fontSize="3.8" fontFamily="Fraunces" fontStyle="italic">
        <tspan x="12" dy="0">"Hit cross-court, close the</tspan>
        <tspan x="12" dy="5">net, punch the volley deep."</tspan>
      </text>

      {/* Progress */}
      <rect x="10" y="170" width="10" height="2.5" rx="1" fill="#DFF25E" />
      <rect x="22" y="170" width="10" height="2.5" rx="1" fill="#8A9C8C" opacity="0.2" />
      <rect x="34" y="170" width="10" height="2.5" rx="1" fill="#8A9C8C" opacity="0.2" />
      <text x="100" y="173.5" fill="#8A9C8C" fontSize="3" fontFamily="Inter">1/3</text>

      {/* Generated badge */}
      <text x="10" y="185" fill="#63B57F" fontSize="2.8" fontFamily="Inter">⚡ Generated in 42s</text>
    </svg>
  );
}
