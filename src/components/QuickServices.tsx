import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Sparkles, Target, Zap } from 'lucide-react';

const quickPlans = [
  {
    name: "Presença",
    desc: "Destaque sua marca com uma identidade visual forte e memorável.",
    icon: <Zap size={20} className="text-km-red-bright" />
  },
  {
    name: "Consistência",
    desc: "Mantenha sua comunicação alinhada em todos os pontos de contato.",
    icon: <Target size={20} className="text-km-red-bright" />
  },
  {
    name: "Posicionamento",
    desc: "Atraia o público certo com um design estratégico e profissional.",
    icon: <Sparkles size={20} className="text-km-red-bright" />
  }
];

export function QuickServices() {
  return (
    <section className="py-20 px-6 md:px-12 bg-white border-b border-km-maroon/5">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-12 mb-16">
          <div className="max-w-2xl">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-bold tracking-tighter uppercase mb-6 leading-tight"
            >
              Transformo ideias em design que gera <span className="text-km-red-bright italic font-serif">resultado</span>
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-lg text-km-maroon mb-8"
            >
              Do conceito à execução, soluções visuais para marcas que querem se destacar.
            </motion.p>
            <div className="flex flex-wrap gap-4">
              <a 
                href="#work" 
                className="bg-km-black text-km-cream px-8 py-4 rounded-full font-bold text-sm uppercase tracking-widest hover:bg-km-red-bright transition-colors"
              >
                Ver projetos
              </a>
              <a 
                href="#solutions" 
                className="border border-km-black text-km-black px-8 py-4 rounded-full font-bold text-sm uppercase tracking-widest hover:bg-km-black hover:text-km-cream transition-all"
              >
                Ver soluções
              </a>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-1 gap-4 w-full lg:w-80">
            {quickPlans.map((plan, index) => (
              <motion.a
                key={plan.name}
                href="#solutions"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group p-6 bg-km-cream/30 rounded-2xl border border-km-maroon/5 hover:border-km-red-bright/30 hover:bg-white hover:shadow-xl transition-all duration-300 flex items-center gap-4"
              >
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                  {plan.icon}
                </div>
                <div className="flex-grow">
                  <h4 className="font-bold text-sm uppercase tracking-tight mb-0.5">{plan.name}</h4>
                  <p className="text-[10px] text-km-maroon uppercase tracking-wider opacity-70 mb-2">{plan.desc}</p>
                  <span className="text-[9px] font-bold text-km-red-bright uppercase tracking-widest flex items-center gap-1 group-hover:gap-2 transition-all">
                    Quero esse <ArrowRight size={10} />
                  </span>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
