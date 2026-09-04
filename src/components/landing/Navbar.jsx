import React, { useState, useEffect } from 'react';
import BetaBadge from '@/components/landing/BetaBadge';
import Logo from '@/components/landing/Logo';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
    { label: 'How it works', href: '#how-it-works' },
    { label: 'Practice styles', href: '#practice-styles' },
    { label: 'Live Mode', href: '#live-mode' },
    { label: 'FAQ', href: '#faq' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'glass border-b border-sage-muted/10' : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-5 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <a href="#" aria-label="PracticePal home">
            <Logo size={28} />
          </a>
          <BetaBadge />
        </div>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {links.map(l => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm text-sage hover:text-chalk transition-colors duration-200"
            >
              {l.label}
            </a>
          ))}
          <a
            href="https://app.practicepal.ie/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-semibold text-court-deep bg-lawn hover:bg-lawn/90 px-5 py-2 rounded-full transition-colors duration-200"
          >
            Try it free
          </a>
        </div>

        {/* Mobile menu toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden p-2 text-chalk"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden glass border-t border-sage-muted/10 px-5 pb-6 pt-4 space-y-4">
          {links.map(l => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setMobileOpen(false)}
              className="block text-base text-sage hover:text-chalk transition-colors"
            >
              {l.label}
            </a>
          ))}
          <a
            href="https://app.practicepal.ie/"
            target="_blank"
            rel="noopener noreferrer"
            className="block text-center text-sm font-semibold text-court-deep bg-lawn px-5 py-3 rounded-full"
          >
            Try it free
          </a>
        </div>
      )}
    </nav>
  );
}
