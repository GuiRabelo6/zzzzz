import React from 'react';
import { motion } from 'motion/react';
import { Check, ArrowRight, MessageCircle, Sparkles, Target, Zap, ShieldCheck } from 'lucide-react';

const solutions = [
  {
    name: "Presença",
    tag: "Para começar",
    description: "Para quem precisa começar a ser visto",
    features: [
      "1 Reels estratégico",
      "4 artes para redes sociais",
      "Aplicação da identidade visual existente",
      "Direção criativa básica"
    ],
    microtext: "Ideal para manter sua marca ativa e profissional",
    highlight: false
  },
  {
    name: "Crescimento",
    tag: "Mais escolhido",
    description: "Para quem quer gerar resultado de verdade",
    features: [
      "3 Reels otimizados para engajamento",
      "10 artes para campanhas e redes sociais",
      "Criação de peças promocionais",
      "Overlay para stories",
      "Direção criativa aplicada"
    ],
    microtext: "Perfeito para campanhas e aumento de alcance",
    highlight: true
  },
  {
    name: "Autoridade",
    tag: "Alto nível",
    description: "Para marcas que querem se destacar de verdade",
    features: [
      "Criação de identidade visual completa",
      "Motion design para produto",
      "4 Reels estratégicos",
      "15 artes para redes sociais",
      "Direção criativa avançada",
      "Construção de posicionamento visual"
    ],
    microtext: "Ideal para marcas que querem ser referência",
    highlight: false
  }
];

const values = [
  { title: "Estratégia visual", desc: "Não apenas design, mas pensamento focado em objetivos." },
  { title: "Comunicação que chama atenção", desc: "Destaque sua marca em um mar de conteúdos genéricos." },
  { title: "Conteúdo pensado para resultado", desc: "Peças criadas para converter e gerar engajamento real." },
  { title: "Direção criativa profissional", desc: "Acompanhamento técnico para elevar o nível da sua marca." }
];

const steps = [
  {
    number: "01",
    title: "Briefing",
    description: "Você envia sua ideia ou necessidade através de um formulário ou conversa."
  },
  {
    number: "02",
    title: "Direção Criativa",
    description: "Eu traduzo suas necessidades em uma direção visual estratégica e única."
  },
  {
    number: "03",
    title: "Ajustes",
    description: "Ajustamos os detalhes juntos para garantir que tudo esteja perfeito."
  },
  {
    number: "04",
    title: "Entrega",
    description: "Entrega final dos arquivos prontos para uso em alta qualidade."
  }
];

export function DesignSolutions() {
  const whatsappUrl = (plan?: string) => {
    const text = plan 
      ? `Olá! Gostaria de saber mais sobre o plano ${plan}.`
      : "Olá! Gostaria de falar sobre um projeto de design.";
    return `https://wa.me/5532999302800?text=${encodeURIComponent(text)}`;
  };

  return (
    <section id="solutions" className="py-24 bg-km-cream overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="max-w-4xl mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter uppercase mb-8 leading-[0.95]"
          >
            Design que posiciona, comunica e gera <span className="text-km-red-bright italic font-serif">resultado</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xl md:text-2xl text-km-maroon max-w-2xl leading-relaxed"
          >
            Os mesmos princípios criativos aplicados nos projetos acima agora podem ser usados para impulsionar a sua marca.
          </motion.p>
        </div>

        {/* Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-32 items-stretch">
          {solutions.map((plan, index) => (
            <motion.article
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              className={`relative p-8 md:p-10 rounded-[2rem] border transition-all duration-500 flex flex-col ${
                plan.highlight 
                  ? 'bg-km-black text-km-cream border-km-black shadow-2xl lg:scale-[1.03] z-10 ring-1 ring-km-red-bright/30' 
                  : 'bg-white text-km-black border-km-maroon/10 hover:shadow-xl hover:border-km-red-bright/20'
              }`}
            >
              <div className="mb-8">
                <div className={`inline-block text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest mb-4 ${
                  plan.highlight ? 'bg-km-red-bright text-km-cream' : 'bg-km-maroon/10 text-km-maroon'
                }`}>
                  {plan.tag}
                </div>
                <h3 className="text-3xl font-bold tracking-tighter uppercase mb-2">
                  {plan.name}
                </h3>
                <p className={`text-sm font-medium ${plan.highlight ? 'text-km-cream/70' : 'text-km-maroon'}`}>
                  {plan.description}
                </p>
              </div>

              <ul className="space-y-4 mb-10 flex-grow">
                {plan.features.map((feature, fIdx) => (
                  <li key={fIdx} className="flex items-start gap-3">
                    <Check size={18} className="text-km-red-bright shrink-0 mt-0.5" />
                    <span className="text-sm leading-tight">{feature}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-auto">
                <p className={`text-[11px] uppercase tracking-wider font-bold mb-6 opacity-60 ${plan.highlight ? 'text-km-cream' : 'text-km-maroon'}`}>
                  {plan.microtext}
                </p>
                
                <div className="space-y-3">
                  <a
                    href={whatsappUrl(plan.name)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-full py-4 rounded-xl font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-all duration-300 ${
                      plan.highlight
                        ? 'bg-km-red-bright text-km-cream hover:bg-km-red-deep shadow-lg shadow-km-red-bright/20'
                        : 'bg-km-black text-km-cream hover:bg-km-red-bright'
                    }`}
                  >
                    Quero esse plano <ArrowRight size={14} />
                  </a>
                  <a
                    href={whatsappUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-full py-4 rounded-xl font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-all duration-300 border ${
                      plan.highlight
                        ? 'border-km-cream/20 text-km-cream hover:bg-km-cream hover:text-km-black'
                        : 'border-km-black/10 text-km-black hover:bg-km-black hover:text-km-cream'
                    }`}
                  >
                    Falar sobre meu projeto
                  </a>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Value Section */}
        <div className="mb-32">
          <motion.h3 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold tracking-tighter uppercase mb-12 text-center"
          >
            O que você está <span className="text-km-red-bright italic font-serif">contratando</span>
          </motion.h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-8 bg-white rounded-3xl border border-km-maroon/5 hover:border-km-red-bright/20 transition-all group"
              >
                <div className="w-10 h-10 rounded-full bg-km-cream flex items-center justify-center mb-6 group-hover:bg-km-red-bright group-hover:text-km-cream transition-colors">
                  <ShieldCheck size={20} />
                </div>
                <h4 className="font-bold text-lg mb-3 leading-tight">{item.title}</h4>
                <p className="text-km-maroon text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* How it works */}
        <div className="mb-32">
          <div className="text-center mb-16">
            <h3 className="text-3xl md:text-4xl font-bold tracking-tighter uppercase mb-4">Como funciona</h3>
            <div className="w-16 h-1 bg-km-red-bright mx-auto rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative group"
              >
                <span className="text-7xl font-bold text-km-maroon/5 absolute -top-10 -left-4 select-none group-hover:text-km-red-bright/10 transition-colors">
                  {step.number}
                </span>
                <h4 className="text-xl font-bold mb-4 relative z-10 uppercase tracking-tight">{step.title}</h4>
                <p className="text-km-maroon text-sm leading-relaxed relative z-10">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Final CTA */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="bg-km-black text-km-cream p-12 md:p-24 rounded-[3rem] text-center relative overflow-hidden shadow-2xl"
        >
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-km-red-bright/10 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-km-red-bright/5 blur-[120px] rounded-full translate-y-1/2 -translate-x-1/2" />

          <div className="relative z-10 max-w-3xl mx-auto">
            <h3 className="text-3xl md:text-5xl font-bold tracking-tighter mb-10 leading-[1.1]">
              Se você gostou dos projetos que viu, imagine o que podemos criar para a sua marca.
            </h3>
            <div className="flex flex-col items-center gap-6">
              <a
                href={whatsappUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-4 bg-km-red-bright text-km-cream px-12 py-6 rounded-full font-bold text-xl hover:bg-km-red-deep transition-all duration-300 shadow-2xl shadow-km-red-bright/30 hover:-translate-y-1"
              >
                <MessageCircle size={28} /> Falar comigo no WhatsApp
              </a>
              <div className="flex items-center gap-2 text-km-cream/50 text-sm font-medium uppercase tracking-widest">
                <Sparkles size={16} className="text-km-red-bright" />
                Projetos limitados por mês
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
