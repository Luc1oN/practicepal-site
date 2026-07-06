import React from 'react';
import { useInView } from '@/hooks/useInView';

function CountdownRing() {
  return (
    <svg viewBox="0 0 120 120" className="w-32 h-32 animate-pulse-ring">
      {/* Track */}
      <circle cx="60" cy="60" r="52" fill="none" stroke="#8A9C8C" strokeWidth="3" opacity="0.2" />
      {/* Progress */}
      <circle
        cx="60" cy="60" r="52"
        fill="none"
        stroke="#DFF25E"
        strokeWidth="3"
        strokeLinecap="round"
        strokeDasharray="327"
        strokeDashoffset="80"
        transform="rotate(-90 60 60)"
      />
      {/* Time */}
      <text x="60" y="55" textAnchor="middle" fill="#F7F3E8" fontFamily="Fraunces" fontSize="24" fontWeight="300">
        2:45
      </text>
      <text x="60" y="72" textAnchor="middle" fill="#8A9C8C" fontFamily="Inter" fontSize="9" letterSpacing="0.1em">
        REMAINING
      </text>
    </svg>
  );
}

function FloatingCue({ text, position, delay, color = '#C9A445' }) {
  const [ref, inView] = useInView({ threshold: 0.2 });
  return (
    <div
      ref={ref}
      className={`absolute glass rounded-lg px-4 py-2.5 max-w-[180px] transition-all duration-700 ${position}`}
      style={{
        transitionDelay: `${delay}ms`,
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(16px)',
        borderColor: `${color}30`,
      }}
    >
      <p className="text-xs text-sage leading-relaxed">{text}</p>
    </div>
  );
}

export default function LiveModeShowcase() {
  const [ref, inView] = useInView({ threshold: 0.15 });

  return (
    <section id="live-mode" className="py-24 sm:py-32 overflow-hidden">
      <div className="max-w-6xl mx-auto px-5">
        <h2 className="font-tagline text-3xl sm:text-4xl text-chalk mb-4 text-center">
          Your courtside companion
        </h2>
        <p className="text-sage text-center text-lg mb-20 max-w-xl mx-auto">
          Live Mode turns the plan into a running session. Auto-advancing drills, a countdown ring for every block, swipe to navigate, and your screen stays on. Glance down, know exactly where you are.
        </p>

        <div className="relative flex justify-center items-center min-h-[500px]">
          {/* Floating coaching cues */}
          <FloatingCue
            text="🎯 Practice cue: 'Keep the racquet head up on the volley — punch, don't swing.'"
            position="top-8 -left-4 sm:left-8 lg:left-24"
            delay={300}
            color="#8A5BC7"
          />
          <FloatingCue
            text="⏭️ Up next: Cross-court rally — 3 min block, deuce side only"
            position="top-20 -right-4 sm:right-8 lg:right-24"
            delay={500}
            color="#6FA3C7"
          />
          <FloatingCue
            text="🏆 Finisher: King of the Court — first to 10 wins"
            position="bottom-16 -left-4 sm:left-12 lg:left-28"
            delay={700}
            color="#63B57F"
          />

          {/* Phone mockup */}
          <div
            ref={ref}
            className={`relative w-[260px] sm:w-[280px] transition-all duration-700 ${
              inView ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
            }`}
          >
            {/* Phone frame */}
            <div className="rounded-[2.5rem] border-2 border-sage-muted/20 bg-court-deep p-3 shadow-2xl shadow-black/40">
              <div className="rounded-[2rem] bg-court overflow-hidden">
                {/* Status bar */}
                <div className="flex items-center justify-between px-6 pt-4 pb-2">
                  <span className="text-[10px] text-sage-muted font-body">19:42</span>
                  <div className="w-20 h-5 rounded-full bg-court-deep" />
                  <span className="text-[10px] text-sage-muted font-body">87%</span>
                </div>

                {/* Live mode content */}
                <div className="px-6 py-6 flex flex-col items-center text-center space-y-5">
                  <span className="text-[10px] text-lawn font-body font-semibold tracking-widest uppercase">
                    ● Live — Drill 3 of 6
                  </span>

                  <h3 className="font-heading text-lg text-chalk leading-tight">
                    Volley-Lob<br/>
                    <span className="text-sage text-sm font-body font-normal">Deuce side, rotate after 4</span>
                  </h3>

                  <CountdownRing />

                  <div className="w-full glass rounded-lg p-3">
                    <p className="font-tagline text-xs text-gold-hi">
                      "Punch the volley deep, then recover to the T — make them hit up."
                    </p>
                  </div>

                  {/* Drill minimap */}
                  <div className="w-full">
                    <div className="flex items-center justify-between text-[9px] text-sage-muted mb-2 font-body">
                      <span>Warm-up</span>
                      <span className="text-lawn font-semibold">Drill 3</span>
                      <span>Finisher</span>
                    </div>
                    <div className="w-full h-1 bg-sage-muted/20 rounded-full overflow-hidden">
                      <div className="h-full bg-lawn rounded-full" style={{ width: '50%' }} />
                    </div>
                  </div>

                  <p className="text-[9px] text-sage-muted">Swipe → next drill</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
