import React from 'react';
import { useInView } from '@/hooks/useInView';
import { MessageCircle, Lightbulb, Trophy } from 'lucide-react';

const reasons = [
  {
    icon: MessageCircle,
    title: 'Direct line to the builder',
    description: 'PracticePal is built by a player, for players. Beta testers talk directly to the person writing the code — no support tickets, no feature-request forms that vanish into a backlog.',
  },
  {
    icon: Lightbulb,
    title: 'Shape what gets built next',
    description: 'What drills are missing? What does your group actually need on a Wednesday night? Your input drives the roadmap. This is your chance to build the tool you always wished existed.',
  },
  {
    icon: Trophy,
    title: 'Early adopter bragging rights',
    description: 'When everyone at your club is using PracticePal next year, you\'ll be the one who found it first. Plus, beta testers get lifetime access to whatever we build.',
  },
];

export default function WhyBeta() {
  const [ref, inView] = useInView({ threshold: 0.15 });

  return (
    <section className="py-24 sm:py-32">
      <div className="max-w-5xl mx-auto px-5">
        <div
          ref={ref}
          className={`transition-all duration-700 ${
            inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <h2 className="font-tagline text-3xl sm:text-4xl text-chalk mb-4 text-center">
            Why beta, and why you
          </h2>
          <p className="text-sage text-center text-lg mb-6 max-w-2xl mx-auto">
            PracticePal is already a real, working app — used weekly by players in Cork. But it's still early, still growing, and the best tools are built with the people who use them, not for them from a distance.
          </p>
          <p className="text-sage-muted text-center text-base mb-16 max-w-xl mx-auto">
            No dark patterns. No fake countdown. Just a genuine invite to help shape something useful.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reasons.map((reason, i) => {
            const Icon = reason.icon;
            return (
              <div
                key={reason.title}
                className={`glass rounded-xl p-6 sm:p-8 transition-all duration-700 ${
                  inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${200 + i * 150}ms` }}
              >
                <div className="w-10 h-10 rounded-lg bg-lawn/10 flex items-center justify-center mb-5">
                  <Icon size={20} className="text-lawn" />
                </div>
                <h3 className="font-heading text-lg text-chalk mb-3">{reason.title}</h3>
                <p className="text-sage text-sm leading-relaxed">{reason.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
