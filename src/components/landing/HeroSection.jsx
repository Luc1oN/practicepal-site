import React, { useRef, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import HeroPhone from '@/components/landing/HeroPhone';

// Original large court (fills the canvas at load)
const COURT_LINES = [
  [15, 10, 85, 10], [85, 10, 85, 140], [85, 140, 15, 140], [15, 140, 15, 10],
  [23, 10, 23, 140], [77, 10, 77, 140],
  [15, 75, 85, 75],
  [23, 40, 77, 40], [23, 110, 77, 110],
  [50, 40, 50, 75], [50, 75, 50, 110],
];

// Court that wraps around the phone (phone sits inside this)
const SURROUND_COURT_LINES = [
  [22, 12, 78, 12], [78, 12, 78, 138], [78, 138, 22, 138], [22, 138, 22, 12],
  [30, 12, 30, 138], [70, 12, 70, 138],
  [30, 35, 70, 35], [30, 115, 70, 115],
  [50, 35, 50, 75], [50, 75, 50, 115],
];
const SURROUND_NET = [22, 75, 78, 75];

const PHONE_CENTER = { x: 50, y: 69 };
const PHONE_RECT = { x: 35, y: 20, w: 30, h: 98 };

function generateParticles() {
  const courtPoints = [];
  COURT_LINES.forEach(([x1, y1, x2, y2]) => {
    const len = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
    const numPoints = Math.max(4, Math.round(len / 2.5));
    for (let j = 0; j <= numPoints; j++) {
      const t = j / numPoints;
      courtPoints.push({ x: x1 + (x2 - x1) * t, y: y1 + (y2 - y1) * t });
    }
  });

  return courtPoints.map((court) => {
    const dx = court.x - PHONE_CENTER.x;
    const dy = court.y - PHONE_CENTER.y;
    return {
      court,
      startRadius: Math.sqrt(dx * dx + dy * dy),
      startAngle: Math.atan2(dy, dx),
      size: 0.9 + Math.random() * 1.6,
      color: Math.random() > 0.82 ? '#DFF25E' : Math.random() > 0.66 ? '#C9A445' : '#F7F3E8',
      phase: Math.random() * Math.PI * 2,
    };
  });
}

function lerp(a, b, t) { return a + (b - a) * t; }
function smoothstep(t) { return t * t * (3 - 2 * t); }

function getMapping(w, h) {
  const targetAspect = 100 / 150;
  const containerAspect = w / h;
  let scale, offsetX, offsetY;
  if (containerAspect > targetAspect) {
    scale = h / 150;
    offsetX = (w - 100 * scale) / 2;
    offsetY = 0;
  } else {
    scale = w / 100;
    offsetX = 0;
    offsetY = (h - 150 * scale) / 2;
  }
  return { scale, offsetX, offsetY };
}

export default function HeroSection() {
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);
  const contentRef = useRef(null);
  const phoneWrapRef = useRef(null);
  const finalTaglineRef = useRef(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const particles = generateParticles();
    let rafId;
    let currentProgress = 0;
    let targetProgress = 0;
    let drawProgress = 0;
    let loadProgress = 0;
    let mapping = { scale: 1, offsetX: 0, offsetY: 0 };

    const toCanvas = (p) => ({
      x: p.x * mapping.scale + mapping.offsetX,
      y: p.y * mapping.scale + mapping.offsetY,
    });

    function resize() {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = Math.max(1, rect.width * dpr);
      canvas.height = Math.max(1, rect.height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      mapping = getMapping(rect.width, rect.height);

      if (phoneWrapRef.current) {
        const pos = toCanvas({ x: PHONE_RECT.x, y: PHONE_RECT.y });
        phoneWrapRef.current.style.left = `${pos.x}px`;
        phoneWrapRef.current.style.top = `${pos.y}px`;
        phoneWrapRef.current.style.width = `${PHONE_RECT.w * mapping.scale}px`;
        phoneWrapRef.current.style.height = `${PHONE_RECT.h * mapping.scale}px`;
      }
    }

    function getParticlePos(p, progress, time) {
      if (progress < 0.1) {
        return { x: p.court.x, y: p.court.y };
      }
      // Funnel: spiral inward toward phone center
      const t = smoothstep(Math.min(1, (progress - 0.1) / 0.35));
      const radius = p.startRadius * (1 - t);
      const angle = p.startAngle + t * Math.PI * 2.8;
      const swirl = (1 - t) * Math.sin(time * 3 + p.phase) * 1.5;
      return {
        x: PHONE_CENTER.x + Math.cos(angle) * radius + swirl,
        y: PHONE_CENTER.y + Math.sin(angle) * radius + swirl,
      };
    }

    function drawLines(lines, opacity, drawProg, color, dash, lineWidth) {
      ctx.strokeStyle = color;
      ctx.lineWidth = lineWidth;
      ctx.setLineDash(dash);
      ctx.globalAlpha = opacity;
      lines.forEach(([x1, y1, x2, y2]) => {
        const ex = x1 + (x2 - x1) * drawProg;
        const ey = y1 + (y2 - y1) * drawProg;
        const start = toCanvas({ x: x1, y: y1 });
        const end = toCanvas({ x: ex, y: ey });
        ctx.beginPath();
        ctx.moveTo(start.x, start.y);
        ctx.lineTo(end.x, end.y);
        ctx.stroke();
      });
      ctx.globalAlpha = 1;
      ctx.setLineDash([]);
    }

    function drawAbsorptionGlow(intensity) {
      if (intensity < 0.01) return;
      const center = toCanvas(PHONE_CENTER);
      const radius = 20 * mapping.scale * (0.8 + intensity * 0.6);
      const grad = ctx.createRadialGradient(
        center.x, center.y, 0,
        center.x, center.y, radius
      );
      grad.addColorStop(0, `rgba(223, 242, 94, ${0.35 * intensity})`);
      grad.addColorStop(0.5, `rgba(201, 164, 69, ${0.15 * intensity})`);
      grad.addColorStop(1, 'rgba(223, 242, 94, 0)');
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(center.x, center.y, radius, 0, Math.PI * 2);
      ctx.fill();
    }

    function render() {
      const rect = canvas.getBoundingClientRect();
      ctx.clearRect(0, 0, rect.width, rect.height);

      currentProgress += (targetProgress - currentProgress) * 0.08;
      if (Math.abs(currentProgress - targetProgress) < 0.001) currentProgress = targetProgress;

      if (drawProgress < 1) drawProgress = Math.min(1, drawProgress + 0.008);
      if (loadProgress < 1) loadProgress = Math.min(1, loadProgress + 0.02);

      const time = performance.now() / 1000;

      // --- Original court (fades out as particles break free) ---
      const courtOpacity = Math.max(0, 1 - currentProgress * 4);
      if (courtOpacity > 0.01) {
        drawLines(COURT_LINES, courtOpacity * 0.25, drawProgress, '#F7F3E8', [3, 5], 1);
        // Net
        const netOpacity = courtOpacity * 0.35;
        if (netOpacity > 0.01) {
          drawLines([[15, 75, 85, 75]], netOpacity, drawProgress, '#C9A445', [4, 3], 1);
        }
      }

      // --- Absorption glow at phone center (pulses during funnel) ---
      const glowIntensity = Math.max(0, Math.sin(Math.max(0, Math.min(1, (currentProgress - 0.1) / 0.35)) * Math.PI));
      drawAbsorptionGlow(glowIntensity);

      // --- Particles funneling into phone ---
      let particleOpacity = Math.min(1, Math.max(0, (currentProgress - 0.08) * 12));
      if (currentProgress > 0.38) particleOpacity *= Math.max(0, 1 - (currentProgress - 0.38) / 0.12);
      if (particleOpacity > 0.01) {
        ctx.globalAlpha = particleOpacity;
        particles.forEach((p) => {
          const pos = getParticlePos(p, currentProgress, time);
          const cpos = toCanvas(pos);
          // Shrink as it approaches center
          const funnelT = Math.min(1, Math.max(0, (currentProgress - 0.1) / 0.35));
          const sizeFactor = 1 - funnelT * 0.75;
          ctx.beginPath();
          ctx.arc(cpos.x, cpos.y, p.size * mapping.scale * 0.4 * sizeFactor, 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.fill();
        });
        ctx.globalAlpha = 1;
      }

      // --- Surround court (draws in around phone after funnel) ---
      const surroundT = Math.max(0, Math.min(1, (currentProgress - 0.5) / 0.22));
      if (surroundT > 0) {
        const surroundDraw = smoothstep(surroundT);
        const surroundOpacity = Math.min(1, surroundT * 1.5);
        drawLines(SURROUND_COURT_LINES, surroundOpacity * 0.3, surroundDraw, '#F7F3E8', [3, 5], 1);
        // Net wrapping behind phone
        drawLines([SURROUND_NET], surroundOpacity * 0.4, surroundDraw, '#C9A445', [4, 3], 1);
      }

      // --- HTML overlays ---
      if (contentRef.current) {
        const op = loadProgress * Math.max(0, 1 - currentProgress * 5);
        contentRef.current.style.opacity = op;
        contentRef.current.style.transform = `translateY(${currentProgress * -24}px)`;
      }
      const phoneOp = Math.max(0, Math.min(1, (currentProgress - 0.45) / 0.2));
      // Zoom: phone starts small after funnel and grows as scroll develops
      const zoomT = Math.max(0, Math.min(1, (currentProgress - 0.45) / 0.55));
      const phoneScale = 0.8 + smoothstep(zoomT) * 1.0; // 0.8 → 1.8
      if (phoneWrapRef.current) {
        phoneWrapRef.current.style.opacity = phoneOp;
        phoneWrapRef.current.style.transformOrigin = 'center center';
        phoneWrapRef.current.style.transform = `scale(${phoneScale})`;
      }
      if (finalTaglineRef.current) {
        const ft = Math.max(0, Math.min(1, (currentProgress - 0.7) / 0.2));
        finalTaglineRef.current.style.opacity = ft;
        finalTaglineRef.current.style.transform = `translateY(${(1 - ft) * 20}px)`;
      }

      rafId = requestAnimationFrame(render);
    }

    function onScroll() {
      const el = sectionRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const scrollable = el.offsetHeight - window.innerHeight;
      targetProgress = scrollable > 0 ? Math.max(0, Math.min(1, -rect.top / scrollable)) : 0;
    }

    resize();
    window.addEventListener('resize', resize);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    if (!prefersReducedMotion) {
      rafId = requestAnimationFrame(render);
    } else {
      // Static: draw court + show tagline
      drawLines(COURT_LINES, 0.25, 1, '#F7F3E8', [3, 5], 1);
      drawLines([[15, 75, 85, 75]], 0.35, 1, '#C9A445', [4, 3], 1);
      if (contentRef.current) contentRef.current.style.opacity = '1';
    }

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  const prefersReducedMotion =
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  return (
    <section
      ref={sectionRef}
      className={`relative ${prefersReducedMotion ? 'min-h-screen' : 'h-[250vh]'}`}
    >
      <div className="sticky top-0 h-screen overflow-hidden flex items-center justify-center">
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

        <div className="absolute inset-0 bg-gradient-to-b from-court-deep/30 via-transparent to-court-deep pointer-events-none" />

        {/* Initial tagline + description + CTAs */}
        <div
          ref={contentRef}
          className="relative max-w-2xl mx-auto px-5 text-center"
          style={{ opacity: prefersReducedMotion ? 1 : 0, zIndex: 10 }}
        >
          <h1 className="font-tagline text-5xl sm:text-6xl lg:text-7xl text-chalk leading-[1.1] mb-6">
            Tonight's plan,{' '}
            <span className="text-lawn">sorted.</span>
          </h1>
          <p className="text-lg sm:text-xl text-sage leading-relaxed max-w-lg mx-auto mb-10">
            PracticePal generates a complete tennis practice session — warm-up through finisher — in under a minute. Pick a style, set your session, get a plan with animated court diagrams.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://luc1on.github.io/PracticePal/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 text-base font-semibold text-court-deep bg-lawn hover:bg-lawn/90 px-8 py-4 rounded-full transition-all duration-200 hover:shadow-[0_0_30px_rgba(223,242,94,0.2)]"
            >
              Try it free — no sign-up
              <ArrowRight size={18} />
            </a>
            <a
              href="#beta-signup"
              className="inline-flex items-center justify-center gap-2 text-base font-medium text-chalk border border-sage-muted/30 hover:border-sage/50 px-8 py-4 rounded-full transition-all duration-200 hover:bg-chalk/5"
            >
              Join the beta
            </a>
          </div>
        </div>

        {/* Phone mockup (fades in as particles funnel in, sits inside surround court) */}
        <div
          ref={phoneWrapRef}
          className="absolute"
          style={{ opacity: 0, zIndex: 20 }}
        >
          <HeroPhone />
        </div>

        {/* Final tagline */}
        <div
          ref={finalTaglineRef}
          className="absolute bottom-10 left-0 right-0 text-center px-5 pointer-events-none"
          style={{ opacity: 0, zIndex: 30 }}
        >
          <h2 className="font-tagline text-2xl sm:text-3xl lg:text-4xl text-chalk">
            From blank to courtside in{' '}
            <span className="text-lawn">under a minute.</span>
          </h2>
        </div>

        {/* Scroll indicator */}
        {!prefersReducedMotion && (
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-30 pointer-events-none" style={{ zIndex: 10 }}>
            <span className="text-[10px] text-sage-muted tracking-widest uppercase">Scroll</span>
            <div className="w-px h-6 bg-gradient-to-b from-sage-muted to-transparent" />
          </div>
        )}
      </div>
    </section>
  );
}
