import React, { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useInView } from '@/hooks/useInView';
import { ArrowRight, Check } from 'lucide-react';

export default function BetaSignupForm() {
  const [form, setForm] = useState({ name: '', email: '', club: '', motivation: '' });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [ref, inView] = useInView({ threshold: 0.1 });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim()) return;
    setSubmitting(true);
    setError('');
    try {
      const { error: insertError } = await supabase.from('practicepal_beta_signups').insert({
        name: form.name.trim(),
        email: form.email.trim(),
        club: form.club.trim() || null,
        motivation: form.motivation.trim() || null,
      });
      if (insertError) throw insertError;
      setSubmitted(true);
    } catch (err) {
      setError('Something went wrong — try again or email us directly.');
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <section id="beta-signup" className="py-24 sm:py-32">
        <div className="max-w-lg mx-auto px-5 text-center">
          {/* Member card */}
          <div className="glass rounded-2xl p-8 sm:p-10 border border-lawn/20">
            <div className="w-14 h-14 rounded-full bg-lawn/10 flex items-center justify-center mx-auto mb-6">
              <Check size={28} className="text-lawn" />
            </div>
            <h3 className="font-heading text-2xl text-chalk mb-2">You're in, {form.name.split(' ')[0]}.</h3>
            <p className="text-sage mb-4">You can start right now: open PracticePal, pick a practice style, and build tonight's session. Racquets and balls are all you need.</p>
            <a
              href="https://luc1on.github.io/PracticePal/"
              className="inline-flex items-center gap-2 text-base font-semibold text-court-deep bg-lawn hover:bg-lawn/90 px-6 py-3 rounded-full transition-all duration-200 mb-6"
            >
              Open PracticePal <ArrowRight size={18} />
            </a>
            <p className="text-sage-muted text-sm mb-6">Shane will email you personally within a couple of days with what to try first and how to send feedback. On your phone, add the app to your Home Screen from the share menu.</p>
            <div className="glass rounded-lg p-4 inline-block">
              <p className="text-[10px] text-sage-muted uppercase tracking-widest mb-1">Beta Tester</p>
              <p className="font-heading text-lg text-chalk">{form.name}</p>
              {form.club && <p className="text-sm text-sage">{form.club}</p>}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="beta-signup" className="py-24 sm:py-32">
      <div
        ref={ref}
        className={`max-w-lg mx-auto px-5 transition-all duration-700 ${
          inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        <h2 className="font-tagline text-3xl sm:text-4xl text-chalk mb-4 text-center">
          Join the beta
        </h2>
        <p className="text-sage text-center text-lg mb-10">
          Free. No commitment. Just a front-row seat to what's coming.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-xs text-sage-muted uppercase tracking-widest mb-2 font-body">
              Name *
            </label>
            <input
              type="text"
              required
              value={form.name}
              onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
              placeholder="Your name"
              className="w-full bg-transparent border-b border-sage-muted/30 focus:border-lawn text-chalk placeholder:text-sage-muted/40 pb-3 text-base font-body outline-none transition-colors duration-200"
            />
          </div>

          <div>
            <label className="block text-xs text-sage-muted uppercase tracking-widest mb-2 font-body">
              Email *
            </label>
            <input
              type="email"
              required
              value={form.email}
              onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
              placeholder="you@email.com"
              className="w-full bg-transparent border-b border-sage-muted/30 focus:border-lawn text-chalk placeholder:text-sage-muted/40 pb-3 text-base font-body outline-none transition-colors duration-200"
            />
          </div>

          <div>
            <label className="block text-xs text-sage-muted uppercase tracking-widest mb-2 font-body">
              Home club <span className="normal-case tracking-normal">(optional)</span>
            </label>
            <input
              type="text"
              value={form.club}
              onChange={e => setForm(f => ({ ...f, club: e.target.value }))}
              placeholder="e.g. Sunday's Well, Rushbrooke"
              className="w-full bg-transparent border-b border-sage-muted/30 focus:border-lawn text-chalk placeholder:text-sage-muted/40 pb-3 text-base font-body outline-none transition-colors duration-200"
            />
          </div>

          <div>
            <label className="block text-xs text-sage-muted uppercase tracking-widest mb-2 font-body">
              What would make you actually use this every week?{' '}
              <span className="normal-case tracking-normal">(optional)</span>
            </label>
            <textarea
              value={form.motivation}
              onChange={e => setForm(f => ({ ...f, motivation: e.target.value }))}
              placeholder="Be honest — it helps us build the right thing"
              rows={3}
              className="w-full bg-transparent border-b border-sage-muted/30 focus:border-lawn text-chalk placeholder:text-sage-muted/40 pb-3 text-base font-body outline-none transition-colors duration-200 resize-none"
            />
          </div>

          {error && (
            <p className="text-sm text-red-400">{error}</p>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 text-base font-semibold text-court-deep bg-lawn hover:bg-lawn/90 disabled:opacity-60 px-8 py-4 rounded-full transition-all duration-200 hover:shadow-[0_0_30px_rgba(223,242,94,0.2)]"
          >
            {submitting ? 'Signing up…' : 'Count me in'}
            {!submitting && <ArrowRight size={18} />}
          </button>
        </form>
      </div>
    </section>
  );
}
