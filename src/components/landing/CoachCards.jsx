import React, { useState } from 'react';
import { useInView } from '@/hooks/useInView';

function TargetIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>
    </svg>
  );
}
function CompassIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/>
    </svg>
  );
}
function FlameIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/>
    </svg>
  );
}
function TrophyIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2z"/>
    </svg>
  );
}

const styles = [
  {
    name: 'The Technician',
    mantra: 'Sharpen one thing until it sticks.',
    color: '#8A5BC7',
    description: 'Pick this when you want to groove a stroke. Every drill isolates a specific shot, angle, or footwork pattern. Repetition is the point.',
    icon: TargetIcon,
  },
  {
    name: 'The Tactician',
    mantra: 'Win with patterns, not power.',
    color: '#6FA3C7',
    description: 'Pick this when you want to play smarter. Serve-plus-one, approach patterns, court geometry — the plan always has a "why."',
    icon: CompassIcon,
  },
  {
    name: 'The Grinder',
    mantra: 'Legs tonight, trophies Sunday.',
    color: '#C9A445',
    description: 'Pick this when you want a workout. High-intensity, low-rest, maximum sweat. Drills that build match stamina and mental toughness.',
    icon: FlameIcon,
  },
  {
    name: 'The Entertainer',
    mantra: 'Games, chaos, bragging rights.',
    color: '#63B57F',
    description: 'Pick this when it\'s about the banter. Points-based games, team challenges, and creative chaos. Everyone leaves smiling and slightly out of breath.',
    icon: TrophyIcon,
  },
];

function StyleCard({ style, index }) {
  const [hovered, setHovered] = useState(false);
  const [ref, inView] = useInView({ threshold: 0.15 });

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`glass rounded-xl p-6 sm:p-8 cursor-default transition-all duration-500 ${
        inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
      style={{
        transitionDelay: `${index * 120}ms`,
        borderColor: hovered ? `${style.color}40` : 'rgba(138,156,140,0.15)',
        boxShadow: hovered ? `0 0 40px ${style.color}10` : 'none',
      }}
    >
      <div className="mb-4" style={{ color: style.color }}>
        <style.icon className="w-7 h-7" />
      </div>
      <h3
        className="font-heading text-xl sm:text-2xl mb-2 transition-colors duration-300"
        style={{ color: hovered ? style.color : '#F7F3E8' }}
      >
        {style.name}
      </h3>
      <p className="text-sage text-sm leading-relaxed mb-4">
        {style.description}
      </p>
      <p
        className="font-tagline text-sm transition-all duration-500"
        style={{
          color: style.color,
          opacity: hovered ? 1 : 0.5,
          transform: hovered ? 'translateY(0)' : 'translateY(4px)',
        }}
      >
        "{style.mantra}"
      </p>
    </div>
  );
}

export default function CoachCards() {
  return (
    <section id="practice-styles" className="py-24 sm:py-32">
      <div className="max-w-6xl mx-auto px-5">
        <h2 className="font-tagline text-3xl sm:text-4xl text-chalk mb-4 text-center">
          Pick your practice style
        </h2>
        <p className="text-sage text-center text-lg mb-16 max-w-xl mx-auto">
          Four styles, four vibes. Pick the one that matches tonight's energy — or try a different one each week.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {styles.map((style, i) => (
            <StyleCard key={style.name} style={style} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
