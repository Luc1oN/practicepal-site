import React from 'react';
import { useInView } from '@/hooks/useInView';

const steps = [
  {
    number: '01',
    title: 'Pick your style',
    description: 'Four practice styles, four vibes. The Technician sharpens fundamentals. The Tactician builds patterns. The Grinder tests fitness. The Entertainer makes it a party. Pick the one that matches tonight\'s energy.',
    color: '#8A5BC7',
  },
  {
    number: '02',
    title: 'Set the session',
    description: 'How many of you, how many courts, how long, what level, what to work on. Thirty seconds of input — PracticePal handles the rest.',
    color: '#6FA3C7',
  },
  {
    number: '03',
    title: 'Get your plan',
    description: 'A structured session lands in under a minute: warm-up through competitive finisher, each drill with Aim, Drill, Cycle, and Target. Every drill includes a court diagram showing player positions and ball movement.',
    color: '#C9A445',
  },
  {
    number: '04',
    title: 'Run it live',
    description: 'Tap "Go" and Live Mode takes over. A running clock, an auto-advancing view of what\'s happening now, a full-screen glance display with a countdown ring, and swipe to move through drills. Your screen won\'t sleep mid-session.',
    color: '#63B57F',
  },
];

function StepCard({ step, index }) {
  const [ref, inView] = useInView({ threshold: 0.2 });

  return (
    <div
      ref={ref}
      className={`relative transition-all duration-700 ${
        inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      {/* Connector line */}
      {index < steps.length - 1 && (
        <div className="hidden md:block absolute top-12 left-1/2 w-px h-[calc(100%+2rem)] border-l border-dashed border-gold/20" />
      )}

      <div className="glass rounded-xl p-6 sm:p-8 hover:bg-chalk/[0.03] transition-colors duration-300">
        <div className="flex items-start gap-5">
          <span
            className="font-heading text-3xl font-light shrink-0"
            style={{ color: step.color }}
          >
            {step.number}
          </span>
          <div>
            <h3 className="font-heading text-xl sm:text-2xl text-chalk mb-3">
              {step.title}
            </h3>
            <p className="text-sage text-base leading-relaxed">
              {step.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 sm:py-32">
      <div className="max-w-3xl mx-auto px-5">
        <h2 className="font-tagline text-3xl sm:text-4xl text-chalk mb-4 text-center">
          Start your session in four easy steps
        </h2>
        <p className="text-sage text-center text-lg mb-16 max-w-xl mx-auto">
          No templates. No copy-paste. Just tell it what you want to work on and PracticePal builds the session.
        </p>
        <div className="space-y-6">
          {steps.map((step, i) => (
            <StepCard key={step.number} step={step} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
