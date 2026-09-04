import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { useInView } from '@/hooks/useInView';

const faqs = [
  {
    q: 'Is it free?',
    a: 'Yes — completely free during the beta. No card, no trial that auto-charges. When we eventually introduce paid features, beta testers will be the first to know and the last to pay.',
  },
  {
    q: 'Do I need to create an account?',
    a: 'Nope. Guest use works fully — generate sessions, run Live Mode, share plans. Signing in just unlocks saving, favouriting, and session history. Your call.',
  },
  {
    q: 'What does "beta" actually mean here?',
    a: 'It means the app is real and working — players use it weekly — but it\'s still being actively developed. You might hit the occasional rough edge. The upside: you have a direct line to the person building it, and your feedback shapes what comes next.',
  },
  {
    q: 'How does the beta work?',
    a: 'Signing up gets you a beta spot, and the app is open to you straight away — build your first session tonight, racquets and balls are all you need. Shane emails every tester personally within a couple of days with what to try first and how to send feedback, and there is a "Tell Shane" link inside the app for anything that feels off. It\'s small and closed on purpose while the app is still taking shape, and it\'ll open up as PracticePal grows.',
  },
  {
    q: 'Is my data safe?',
    a: 'We collect minimal data (name, email for beta signup). The app itself stores sessions locally unless you sign in. Infrastructure is EU-hosted. No tracking, no selling data. We\'re a practice tool, not an ad platform.',
  },
  {
    q: 'What level of player is this for?',
    a: 'PracticePal is built for club and social players — the kind hitting with 2–8 mates on a Tuesday evening. Not elite academy training. The drills scale from beginner to advanced, and the practice styles adjust their complexity accordingly.',
  },
  {
    q: 'Can I share a session with my hitting partners?',
    a: 'Yes — every session generates a shareable link. Send it to the group chat, save it for next week, or post it in your club WhatsApp. No sign-in needed to view a shared plan.',
  },
];

export default function FAQ() {
  const [ref, inView] = useInView({ threshold: 0.1 });

  return (
    <section id="faq" className="py-24 sm:py-32">
      <div
        ref={ref}
        className={`max-w-2xl mx-auto px-5 transition-all duration-700 ${
          inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        <h2 className="font-tagline text-3xl sm:text-4xl text-chalk mb-12 text-center">
          Questions you'd actually ask
        </h2>

        <Accordion type="single" collapsible className="space-y-3">
          {faqs.map((faq, i) => (
            <AccordionItem
              key={i}
              value={`faq-${i}`}
              className="glass rounded-xl border-sage-muted/10 px-6"
            >
              <AccordionTrigger className="text-left font-heading text-base sm:text-lg text-chalk hover:no-underline py-5">
                {faq.q}
              </AccordionTrigger>
              <AccordionContent className="text-sage text-base leading-relaxed pb-5">
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
