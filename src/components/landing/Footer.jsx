import React from 'react';
import Logo from '@/components/landing/Logo';
import { ArrowUpRight } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-sage-muted/10 py-12">
      <div className="max-w-6xl mx-auto px-5">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div>
            <div className="mb-2">
              <Logo size={32} />
            </div>
            <p className="text-sm text-sage-muted">
              Built in Cork, Ireland 🇮🇪
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-sm">
            <a
              href="https://luc1on.github.io/PracticePal/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sage hover:text-chalk transition-colors inline-flex items-center gap-1"
            >
              Try the app
              <ArrowUpRight size={14} />
            </a>
            <a
              href="#beta-signup"
              className="text-sage hover:text-chalk transition-colors"
            >
              Join the beta
            </a>
            <a
              href="mailto:practicepal.cork@gmail.com"
              className="text-sage hover:text-chalk transition-colors"
            >
              Feedback & contact
            </a>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-sage-muted/10 text-center">
          <p className="text-xs text-sage-muted">
            © {new Date().getFullYear()} PracticePal. Free during beta. Made with love for club tennis.
          </p>
        </div>
      </div>
    </footer>
  );
}
