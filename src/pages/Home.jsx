import React from 'react';
import Navbar from '@/components/landing/Navbar';
import HeroSection from '@/components/landing/HeroSection';
import HowItWorks from '@/components/landing/HowItWorks';
import CoachCards from '@/components/landing/CoachCards';
import LiveModeShowcase from '@/components/landing/LiveModeShowcase';
import WhyBeta from '@/components/landing/WhyBeta';
import BetaSignupForm from '@/components/landing/BetaSignupForm';
import FAQ from '@/components/landing/FAQ';
import Footer from '@/components/landing/Footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-court-deep court-grid">
      <Navbar />
      <main>
        <HeroSection />
        <div className="max-w-6xl mx-auto">
          <div className="h-px bg-gradient-to-r from-transparent via-sage-muted/20 to-transparent" />
        </div>
        <HowItWorks />
        <div className="max-w-6xl mx-auto">
          <div className="h-px bg-gradient-to-r from-transparent via-sage-muted/20 to-transparent" />
        </div>
        <CoachCards />
        <div className="max-w-6xl mx-auto">
          <div className="h-px bg-gradient-to-r from-transparent via-sage-muted/20 to-transparent" />
        </div>
        <LiveModeShowcase />
        <div className="max-w-6xl mx-auto">
          <div className="h-px bg-gradient-to-r from-transparent via-sage-muted/20 to-transparent" />
        </div>
        <WhyBeta />
        <div className="max-w-6xl mx-auto">
          <div className="h-px bg-gradient-to-r from-transparent via-sage-muted/20 to-transparent" />
        </div>
        <BetaSignupForm />
        <div className="max-w-6xl mx-auto">
          <div className="h-px bg-gradient-to-r from-transparent via-sage-muted/20 to-transparent" />
        </div>
        <FAQ />
      </main>
      <Footer />
    </div>
  );
}
