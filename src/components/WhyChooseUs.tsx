import React from 'react';
import { ShieldCheck, Flame, Truck, Leaf, Sparkles } from 'lucide-react';

export const WhyChooseUs: React.FC = () => {
  const pillars = [
    {
      icon: Flame,
      title: 'Micro-Batch Kettle Cooking',
      description: 'Slow-cooked in cold-pressed high-oleic oils for maximum crunch and zero greasy residue.',
    },
    {
      icon: Leaf,
      title: '100% Natural Ingredients',
      description: 'Zero artificial preservatives, synthetic dyes, or MSG. Pure authentic spice blends.',
    },
    {
      icon: Truck,
      title: 'Express Temperature Controlled',
      description: 'Shipped in insulated protective nitrogen-flushed packages to preserve oven freshness.',
    },
    {
      icon: ShieldCheck,
      title: 'Quality Connoisseur Guarantee',
      description: 'If you are not 100% thrilled by the flavor depth, we refund or replace with zero friction.',
    },
  ];

  return (
    <section id="why-us" className="py-20 relative bg-[#f4eee3]/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-bold tracking-widest text-[#3d1a0e] uppercase mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#3d1a0e]" />
            <span>THE ARTISANAL DIFFERENCE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900 tracking-tight">
            Why FOODII Stands Apart
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {pillars.map((p, idx) => {
            const Icon = p.icon;
            return (
              <div
                key={idx}
                className="p-8 rounded-3xl glass-card border border-stone-200 hover:border-[#3d1a0e] transition-all duration-300 group hover:-translate-y-1 bg-white/90 shadow-md"
              >
                <div className="w-12 h-12 rounded-2xl bg-[#3d1a0e]/10 border border-[#3d1a0e]/20 flex items-center justify-center text-[#3d1a0e] mb-6 group-hover:bg-[#3d1a0e] group-hover:text-white transition-colors">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-xl font-bold text-stone-900 mb-2">{p.title}</h3>
                <p className="text-xs text-stone-600 leading-relaxed font-medium">{p.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
