import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Share2 } from 'lucide-react';
import { prints } from '../data/portfolio';

export function ExhibitionView({ onBack, handleImageError }: { onBack: () => void, handleImageError: (e: React.SyntheticEvent<HTMLImageElement, Event>) => void }) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-[#f4f4f2] text-km-black pt-24 pb-32 px-6 md:px-12"
    >
      <div className="max-w-5xl mx-auto">
        <button onClick={onBack} className="flex items-center gap-2 text-km-maroon hover:text-km-red-bright transition-colors mb-16 font-medium uppercase tracking-widest text-sm">
          <ArrowLeft size={16} /> Voltar para o portfólio
        </button>
        
        <div className="text-center mb-32">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-block bg-km-black text-km-cream text-sm font-bold px-4 py-1.5 rounded-full uppercase tracking-widest mb-8"
          >
            Drop 01
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter mb-12 uppercase"
          >
            Monólogos<br/>Silenciosos
          </motion.h1>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="max-w-2xl mx-auto text-lg md:text-xl text-km-black/80 leading-relaxed space-y-6 text-left"
          >
            <p>Às vezes pensamos tanto em silêncio que parece que vivemos dentro de um monólogo eterno. Nunca nos calamos — tampouco conseguimos realmente ouvir o silêncio que nos cerca.</p>
            <p>Cada obra desta série representa esse processo: a desconexão com a realidade, o isolamento dentro da própria mente e o fluxo incessante de pensamentos que criamos para nós mesmos.</p>
            <p className="font-serif italic text-2xl text-km-red-bright text-center my-12">"O que temos em comum é a espera."</p>
            <p className="text-center font-medium uppercase tracking-widest text-sm text-km-maroon">Edição limitada — 30 prints numerados</p>
          </motion.div>
        </div>

        <div className="space-y-48">
          {prints.map((print) => (
            <div key={print.id} className="flex flex-col items-center">
              <motion.div 
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1 }}
                className="w-full max-w-4xl relative bg-white p-6 md:p-12 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.3)] border-[12px] border-[#1a1a1a] mb-12"
              >
                <img src={print.file} alt={print.name} loading="lazy" onError={handleImageError} className="w-full h-auto" />
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="max-w-2xl text-center"
              >
                <h2 className="text-3xl md:text-4xl font-bold tracking-tighter mb-6">{print.name}</h2>
                <p className="text-lg text-km-black/70 leading-relaxed mb-8">{print.description}</p>
                
                <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                  <div className="text-left">
                    <span className="block text-sm text-km-maroon uppercase tracking-widest mb-1">Disponibilidade</span>
                    <span className="font-mono font-medium text-lg">{print.available} / {print.total}</span>
                  </div>
                  <div className="w-px h-12 bg-km-maroon/20 hidden sm:block"></div>
                  <div className="text-left">
                    <span className="block text-sm text-km-maroon uppercase tracking-widest mb-1">Valor</span>
                    <span className="font-medium text-2xl">R$ 50,00</span>
                  </div>
                  <a
                    href={`https://wa.me/5532999302800?text=${encodeURIComponent(`Olá! Tenho interesse no print da arte ${print.name} por R$50.`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ml-0 sm:ml-4 bg-km-red-bright text-km-cream px-8 py-4 rounded-full font-medium hover:bg-km-red-deep transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-km-red-bright/20 hover:shadow-xl hover:-translate-y-1"
                  >
                    Adquirir Obra
                  </a>
                  <a
                    href="https://www.instagram.com/guilhermerabbelo_/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ml-0 sm:ml-2 w-14 h-14 rounded-full border border-km-maroon/30 text-km-maroon hover:text-km-red-bright hover:border-km-red-bright transition-all duration-300 flex items-center justify-center"
                    title="Compartilhar no Instagram"
                  >
                    <Share2 size={20} />
                  </a>
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
