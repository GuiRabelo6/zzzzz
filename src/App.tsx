import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Instagram, ArrowRight, Menu, X, Palette, Share2, MessageCircle, Mail } from 'lucide-react';
import { VideoCard } from './components/VideoCard';
import { IntroScreen } from './components/IntroScreen';
import { ExhibitionView } from './components/ExhibitionView';
import { DesignSolutions } from './components/DesignSolutions';
import { QuickServices } from './components/QuickServices';
import { 
  portfolioEvents, 
  portfolioIdentities, 
  portfolioMotion, 
  clients, 
  prints, 
  videos 
} from './data/portfolio';

const fallbackImage = 'data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22800%22%20height%3D%221000%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20fill%3D%22%23e5e5e5%22%2F%3E%3Ctext%20x%3D%2250%25%22%20y%3D%2250%25%22%20font-family%3D%22sans-serif%22%20font-size%3D%2220%22%20fill%3D%22%23a39a92%22%20text-anchor%3D%22middle%22%20dy%3D%22.3em%22%3EImagem%20Indispon%C3%ADvel%3C%2Ftext%3E%3C%2Fsvg%3E';

const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
  const target = e.currentTarget;
  const src = target.src;
  
  if (src === fallbackImage) return;

  if (src.endsWith('.heic') || src.endsWith('.HEIC')) {
    target.src = src.replace(/\.heic$/i, '.webp');
  } else if (src.endsWith('.webp')) {
    target.src = src.replace(/\.webp$/, '.jpg');
  } else if (src.endsWith('.jpg')) {
    target.src = src.replace(/\.jpg$/, '.JPG');
  } else if (src.endsWith('.JPG') && !src.includes('fallback')) {
    target.src = fallbackImage;
  } else {
    target.src = fallbackImage;
  }
};

function MotionCard({ project, index, onClick }: { project: any, index: number, onClick: () => void, key?: string | number }) {
  const [error, setError] = useState(false);
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group cursor-pointer"
      onClick={onClick}
    >
      <div className="relative overflow-hidden rounded-2xl aspect-video bg-km-black/5 mb-6">
        {!error ? (
          <video
            src={project.videoUrl}
            poster={project.poster}
            autoPlay
            muted
            loop
            playsInline
            controls={false}
            preload="auto"
            onError={() => setError(true)}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <img 
            src={project.poster} 
            alt={project.title} 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            referrerPolicy="no-referrer"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-km-black/60 via-km-black/0 to-km-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
           <span className="bg-km-cream text-km-black text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">{project.category}</span>
        </div>
      </div>
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-xl font-semibold tracking-tight group-hover:text-km-red-bright transition-colors">{project.title}</h3>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full border border-km-maroon/30 text-km-red-bright flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-x-4 group-hover:translate-x-0 group-hover:bg-km-maroon/5">
            <ArrowRight size={14} />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function App() {
  const [showIntro, setShowIntro] = useState(true);
  const [currentView, setCurrentView] = useState<'home' | 'exhibition'>('home');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const [selectedPortfolio, setSelectedPortfolio] = useState<typeof portfolioEvents[0] | null>(null);
  const [selectedIdentity, setSelectedIdentity] = useState<typeof portfolioIdentities[0] | null>(null);
  const [selectedMotion, setSelectedMotion] = useState<typeof portfolioMotion[0] | null>(null);
  const [selectedPrint, setSelectedPrint] = useState<typeof prints[0] | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<typeof videos[0] | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setIsMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (currentView === 'exhibition') {
    return <ExhibitionView onBack={() => setCurrentView('home')} handleImageError={handleImageError} />;
  }

  return (
    <div className="min-h-screen bg-km-cream text-km-black font-sans selection:bg-km-red-bright selection:text-km-cream">
      <AnimatePresence>
        {showIntro && <IntroScreen onComplete={() => setShowIntro(false)} />}
      </AnimatePresence>

      {/* Navigation */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? 'bg-km-cream/90 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('home');
            }}
            className="flex items-center gap-3 text-xl font-bold tracking-tighter"
          >
            <img 
              src="/logo.webp" 
              alt="Keep Moving Art Studio" 
              className="h-8 w-auto object-contain"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
                const fallback = document.getElementById('logo-fallback');
                if (fallback) fallback.style.display = 'block';
              }}
            />
            <span id="logo-fallback" className="hidden sm:inline-block" style={{ display: 'none' }}>
              KEEP MOVING<span className="text-km-red-bright">.</span>
            </span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {['Work', 'About', 'Prints', 'Contact'].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item.toLowerCase())}
                className="text-sm font-medium text-km-maroon hover:text-km-red-bright transition-colors"
              >
                {item}
              </button>
            ))}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-km-black"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-km-cream flex flex-col items-center justify-center gap-8 md:hidden">
          {['Home', 'Work', 'About', 'Prints', 'Contact'].map((item) => (
            <button
              key={item}
              onClick={() => scrollToSection(item.toLowerCase())}
              className="text-3xl font-bold tracking-tight text-km-black hover:text-km-red-bright transition-colors"
            >
              {item}
            </button>
          ))}
        </div>
      )}

      {/* Hero Section */}
      <section
        id="home"
        className="min-h-screen flex items-center pt-20 pb-12 px-6 md:px-12 max-w-7xl mx-auto"
      >
        <div className="max-w-4xl">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="block text-sm font-bold tracking-widest uppercase text-km-maroon mb-6"
          >
            Keep Moving Art Studio
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-[1.1]"
          >
            Designer & <br className="hidden md:block" />
            <span className="text-km-red-bright italic font-serif">Illustrator</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="mt-8 text-lg md:text-xl text-km-black/80 max-w-2xl leading-relaxed"
          >
            Ilustrações sobre silêncio, espera e pensamentos que nunca param.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="mt-12 flex flex-col sm:flex-row items-start sm:items-center gap-6"
          >
            <button
              onClick={() => setCurrentView('exhibition')}
              className="bg-km-red-bright text-km-cream px-8 py-4 rounded-full font-medium hover:bg-km-red-deep transition-all duration-300 flex items-center gap-2 shadow-lg shadow-km-red-bright/20 hover:shadow-xl hover:shadow-km-red-bright/30 hover:-translate-y-1"
            >
              Ver exposição digital <ArrowRight size={18} />
            </button>
            <button
              onClick={() => scrollToSection('work')}
              className="text-km-maroon hover:text-km-red-bright transition-colors font-medium flex items-center gap-2"
            >
              Ver Projetos
            </button>
            <div className="flex items-center gap-4 text-km-maroon sm:ml-4">
              <a href="https://www.instagram.com/studiokeepmoving/" target="_blank" rel="noopener noreferrer" className="hover:text-km-red-bright transition-colors" title="Instagram Studio">
                <Instagram size={20} />
              </a>
              <a href="https://www.instagram.com/guilhermerabbelo_/" target="_blank" rel="noopener noreferrer" className="hover:text-km-red-bright transition-colors" title="Instagram Artista">
                <Instagram size={20} />
              </a>
              <a href="https://www.behance.net/guilhermerabeloms" target="_blank" rel="noopener noreferrer" className="hover:text-km-red-bright transition-colors" title="Behance">
                <Palette size={20} />
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <QuickServices />

      {/* Clients Section */}
      <section className="py-24 px-6 md:px-12 bg-[#000000] text-white border-y border-km-maroon/10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter mb-4"
            >
              Cases de <span className="text-km-red-bright italic font-serif">Sucesso</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-lg text-gray-400 max-w-2xl mx-auto"
            >
              Algumas marcas de sucesso que confiaram no meu trabalho.
            </motion.p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-12 md:gap-16 items-center justify-items-center">
            {clients.map((client, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05, filter: 'drop-shadow(0 0 10px rgba(255,255,255,0.2))' }}
                className="w-32 h-20 flex items-center justify-center relative group grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-500"
              >
                {client.type === 'image' ? (
                  <img
                    src={client.file}
                    alt={client.name}
                    className="max-w-full max-h-full object-contain"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                      const fallback = document.getElementById(`client-fallback-${index}`);
                      if (fallback) fallback.classList.remove('hidden');
                    }}
                  />
                ) : (
                  <object
                    data={client.file}
                    type="application/pdf"
                    className="max-w-full max-h-full pointer-events-none"
                  >
                    <span className="text-white font-bold text-lg text-center leading-tight">{client.name}</span>
                  </object>
                )}
                <span id={`client-fallback-${index}`} className="text-white font-bold text-lg text-center leading-tight hidden">
                  {client.name}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="work" className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tighter uppercase">Projetos</h2>
            <p className="mt-4 text-km-maroon text-lg max-w-2xl">Seleção de projetos desenvolvidos nas áreas de design, branding, motion design e comunicação visual.</p>
          </div>
        </div>

        {/* Categoria: Eventos */}
        <div className="mb-20">
          <h3 className="text-2xl font-bold tracking-tighter uppercase mb-8 border-b border-km-maroon/10 pb-4">Design para Eventos</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
            {portfolioEvents.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group cursor-pointer"
                onClick={() => setSelectedPortfolio(project)}
              >
                <div className="relative overflow-hidden rounded-2xl aspect-[4/5] bg-km-black/5 mb-6">
                  <img
                    src={project.coverImage}
                    alt={project.title}
                    loading="lazy"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-km-black/60 via-km-black/0 to-km-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                     <span className="bg-km-cream text-km-black text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">{project.category}</span>
                  </div>
                </div>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-semibold tracking-tight group-hover:text-km-red-bright transition-colors">{project.title}</h3>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full border border-km-maroon/30 text-km-red-bright flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-x-4 group-hover:translate-x-0 group-hover:bg-km-maroon/5">
                      <ArrowRight size={14} />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Categoria: Identidades Visuais */}
        <div className="mb-20">
          <h3 className="text-2xl font-bold tracking-tighter uppercase mb-8 border-b border-km-maroon/10 pb-4">Branding & Identidade Visual</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
            {portfolioIdentities.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group cursor-pointer"
                onClick={() => setSelectedIdentity(project)}
              >
                <div className="relative overflow-hidden rounded-2xl aspect-[4/5] bg-km-black/5 mb-6">
                  <img
                    src={project.coverImage}
                    alt={project.title}
                    loading="lazy"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    onError={handleImageError}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-km-black/60 via-km-black/0 to-km-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                     <span className="bg-km-cream text-km-black text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">{project.category}</span>
                  </div>
                </div>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-semibold tracking-tight group-hover:text-km-red-bright transition-colors">{project.title}</h3>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full border border-km-maroon/30 text-km-red-bright flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-x-4 group-hover:translate-x-0 group-hover:bg-km-maroon/5">
                      <ArrowRight size={14} />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Categoria: Motion */}
        <div>
          <h3 className="text-2xl font-bold tracking-tighter uppercase mb-2 border-b border-km-maroon/10 pb-4">Motion Design & Video</h3>
          <p className="text-km-maroon text-sm mb-8">Projetos de animação e edição de vídeo desenvolvidos para comunicação visual, conteúdos digitais e divulgação de eventos.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            {portfolioMotion.map((project, index) => (
              <MotionCard 
                key={project.id} 
                project={project} 
                index={index} 
                onClick={() => setSelectedMotion(project)} 
              />
            ))}
          </div>
        </div>
      </section>

      <DesignSolutions />

      {/* Prints Section */}
      <section id="prints" className="py-24 px-6 md:px-12 bg-km-cream">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tighter uppercase">Prints & Processo</h2>
              <p className="mt-4 text-km-maroon text-lg max-w-2xl">Obras autorais disponíveis em tiragem limitada e registros do processo criativo.</p>
            </div>
            <button
              onClick={() => setCurrentView('exhibition')}
              className="text-km-red-bright font-bold uppercase tracking-widest text-sm flex items-center gap-2 hover:gap-4 transition-all"
            >
              Ver exposição completa <ArrowRight size={16} />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {videos.map((video) => (
              <VideoCard key={video.id} video={video} onClick={() => setSelectedVideo(video)} />
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 px-6 md:px-12 bg-km-black text-km-cream">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 items-center">
          <div className="w-full lg:w-1/2">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="aspect-square rounded-3xl overflow-hidden bg-km-maroon/20 relative"
            >
              <img
                src="/fotoperfil.jpg"
                alt="Guilherme Rabelo"
                loading="lazy"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-700 relative z-10"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
              {/* Fallback background */}
              <div className="absolute inset-0 flex items-center justify-center bg-km-maroon/10 text-km-maroon/50">
                <span className="font-serif italic text-2xl">Keep Moving</span>
              </div>
            </motion.div>
          </div>
          <div className="w-full lg:w-1/2">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-5xl font-bold tracking-tighter mb-8"
            >
              Sobre o artista
            </motion.h2>
            <motion.blockquote
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-2xl md:text-3xl font-serif italic text-km-red-bright mb-8 border-l-4 border-km-red-bright pl-6"
            >
              "A maior parte das nossas conversas acontece dentro da nossa própria cabeça."
            </motion.blockquote>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-6 text-km-cream/80 text-lg leading-relaxed"
            >
              <p>
                Sou ilustrador, artista visual e designer. Minha produção combina arte autoral e projetos de comunicação visual, explorando narrativas visuais e identidade estética.
              </p>
              <p>
                Além do trabalho artístico, também desenvolvo projetos de social media, identidade visual e edição de vídeos, criando peças visuais, campanhas digitais e conteúdos para diferentes plataformas.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-12 grid grid-cols-2 gap-8"
            >
              <div>
                <h4 className="text-km-cream font-semibold mb-4">Temas</h4>
                <ul className="space-y-2 text-km-cream/70">
                  <li>Introspecção</li>
                  <li>Isolamento</li>
                  <li>Pensamentos excessivos</li>
                  <li>Humor melancólico</li>
                </ul>
              </div>
              <div>
                <h4 className="text-km-cream font-semibold mb-4">Serviços</h4>
                <ul className="space-y-2 text-km-cream/70">
                  <li>Identidade Visual</li>
                  <li>Motion Design</li>
                  <li>Ilustração Digital</li>
                  <li>Social Media</li>
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-32 px-6 md:px-12 bg-km-cream">
        <div className="max-w-7xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter mb-12 uppercase"
          >
            Vamos <br className="md:hidden" />
            <span className="text-km-red-bright italic font-serif">Conversar?</span>
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex flex-col items-center gap-8"
          >
            <p className="text-xl text-km-maroon max-w-xl">
              Tem um projeto em mente ou quer adquirir um print? Entre em contato por qualquer um dos canais abaixo.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="mailto:guilhermerabelo.ms@gmail.com"
                className="bg-km-black text-km-cream px-8 py-4 rounded-full font-medium hover:bg-km-red-bright transition-all duration-300 flex items-center gap-2"
              >
                <Mail size={18} /> E-mail
              </a>
              <a
                href="https://wa.me/5532999302800"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-km-red-bright text-km-cream px-8 py-4 rounded-full font-medium hover:bg-km-red-deep transition-all duration-300 flex items-center gap-2"
              >
                <MessageCircle size={18} /> WhatsApp
              </a>
              <a
                href="https://www.instagram.com/guilhermerabbelo_/"
                target="_blank"
                rel="noopener noreferrer"
                className="border border-km-maroon/30 text-km-maroon px-8 py-4 rounded-full font-medium hover:border-km-red-bright hover:text-km-red-bright transition-all duration-300 flex items-center gap-2"
              >
                <Instagram size={18} /> Instagram
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 md:px-12 border-t border-km-maroon/10 bg-km-cream">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-sm font-bold tracking-tighter uppercase">
            Keep Moving<span className="text-km-red-bright">.</span> © 2024
          </div>
          <div className="flex items-center gap-8 text-sm text-km-maroon font-medium uppercase tracking-widest">
            <a href="https://www.behance.net/guilhermerabeloms" target="_blank" rel="noopener noreferrer" className="hover:text-km-red-bright transition-colors">Behance</a>
            <a href="https://www.instagram.com/studiokeepmoving/" target="_blank" rel="noopener noreferrer" className="hover:text-km-red-bright transition-colors">Studio</a>
            <a href="https://www.instagram.com/guilhermerabbelo_/" target="_blank" rel="noopener noreferrer" className="hover:text-km-red-bright transition-colors">Artista</a>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <AnimatePresence>
        {selectedPortfolio && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-km-black/90 backdrop-blur-sm"
              onClick={() => setSelectedPortfolio(null)}
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-5xl bg-km-cream rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
            >
              <button 
                onClick={() => setSelectedPortfolio(null)}
                className="absolute top-4 right-4 z-20 w-10 h-10 bg-white/50 hover:bg-white backdrop-blur-md rounded-full flex items-center justify-center text-km-black transition-colors"
              >
                <X size={20} />
              </button>

              <div className="p-6 md:p-8 bg-km-cream border-b border-km-maroon/10">
                <div className="inline-block bg-km-maroon/10 text-km-maroon text-[10px] font-bold px-2 py-1 rounded-sm uppercase tracking-wider mb-2">
                  {selectedPortfolio.category}
                </div>
                <h2 className="text-3xl font-bold tracking-tighter uppercase">{selectedPortfolio.title}</h2>
              </div>

              <div className="overflow-y-auto p-6 md:p-8 bg-[#f4f4f2] flex-1">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {selectedPortfolio.images.map((img, idx) => (
                    <div key={idx} className="rounded-xl overflow-hidden shadow-md border border-km-maroon/10 bg-white">
                      <img 
                        src={img} 
                        alt={`${selectedPortfolio.title} - Imagem ${idx + 1}`}
                        loading="lazy"
                        referrerPolicy="no-referrer"
                        className="w-full h-auto object-cover"
                        onError={handleImageError}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        )}

        {selectedIdentity && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-km-black/90 backdrop-blur-sm"
              onClick={() => setSelectedIdentity(null)}
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-5xl bg-km-cream rounded-2xl overflow-hidden shadow-2xl flex flex-col h-[90vh]"
            >
              <button 
                onClick={() => setSelectedIdentity(null)}
                className="absolute top-4 right-4 z-20 w-10 h-10 bg-white/50 hover:bg-white backdrop-blur-md rounded-full flex items-center justify-center text-km-black transition-colors shadow-sm"
              >
                <X size={20} />
              </button>

              <div className="p-6 md:p-8 bg-km-cream border-b border-km-maroon/10">
                <div className="inline-block bg-km-maroon/10 text-km-maroon text-[10px] font-bold px-2 py-1 rounded-sm uppercase tracking-wider mb-2">
                  {selectedIdentity.category}
                </div>
                <h2 className="text-3xl font-bold tracking-tighter uppercase mb-2">{selectedIdentity.title}</h2>
                <p className="text-km-maroon text-sm max-w-2xl">{selectedIdentity.description}</p>
              </div>

              <div className="flex-1 overflow-y-auto p-6 md:p-8 bg-[#f4f4f2]">
                <div className="grid grid-cols-1 gap-8">
                  {selectedIdentity.images.map((img, idx) => (
                    <div key={idx} className="rounded-xl overflow-hidden shadow-lg border border-km-maroon/5 bg-white">
                      <img 
                        src={img} 
                        alt={`${selectedIdentity.title} - Slide ${idx + 1}`}
                        loading="lazy"
                        referrerPolicy="no-referrer"
                        className="w-full h-auto object-cover"
                        onError={handleImageError}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        )}

        {selectedMotion && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-km-black/90 backdrop-blur-sm"
              onClick={() => setSelectedMotion(null)}
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-5xl bg-km-black rounded-2xl overflow-hidden shadow-2xl flex flex-col"
            >
              <button 
                onClick={() => setSelectedMotion(null)}
                className="absolute top-4 right-4 z-20 w-10 h-10 bg-white/10 hover:bg-white/30 backdrop-blur-md rounded-full flex items-center justify-center text-white transition-colors"
              >
                <X size={20} />
              </button>

              <div className="w-full aspect-video bg-black">
                <video 
                  src={selectedMotion.videoUrl} 
                  poster={selectedMotion.poster}
                  controls 
                  autoPlay 
                  loop
                  muted={false}
                  playsInline
                  preload="auto"
                  className="w-full h-full object-contain"
                />
              </div>
              
              <div className="p-6 bg-km-black text-km-cream border-t border-white/10">
                <div className="inline-block bg-white/10 text-white/70 text-[10px] font-bold px-2 py-1 rounded-sm uppercase tracking-wider mb-2">
                  {selectedMotion.category}
                </div>
                <h2 className="text-2xl font-bold tracking-tighter uppercase">{selectedMotion.title}</h2>
              </div>
            </motion.div>
          </div>
        )}

        {selectedVideo && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-km-black/90 backdrop-blur-sm"
              onClick={() => setSelectedVideo(null)}
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-4xl bg-km-cream rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
            >
              <button 
                onClick={() => setSelectedVideo(null)}
                className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/50 hover:bg-white backdrop-blur-md rounded-full flex items-center justify-center text-km-black transition-colors"
              >
                <X size={20} />
              </button>

              <div className="w-full bg-km-black relative flex items-center justify-center min-h-[50vh] max-h-[70vh] overflow-hidden py-4 md:py-8">
                <video
                  src={selectedVideo.file}
                  poster={selectedVideo.poster}
                  autoPlay
                  loop
                  muted
                  controls
                  playsInline
                  preload="auto"
                  className="h-full w-auto max-w-full aspect-[9/16] object-cover rounded-xl shadow-2xl"
                />
              </div>

              <div className="p-6 md:p-8 bg-km-cream flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                  <div className="inline-block bg-km-maroon/10 text-km-maroon text-[10px] font-bold px-2 py-1 rounded-sm uppercase tracking-wider mb-2">
                    Timelapse do processo
                  </div>
                  <h3 className="text-2xl font-bold tracking-tighter mb-2">
                    {selectedVideo.name}
                  </h3>
                  <p className="text-sm text-km-maroon leading-relaxed max-w-lg">
                    {selectedVideo.description}
                  </p>
                </div>
                <a
                  href="https://www.instagram.com/guilhermerabbelo_/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border border-km-maroon/30 text-km-maroon px-6 py-3 rounded-full font-medium hover:text-km-red-bright hover:border-km-red-bright transition-all duration-300 flex items-center justify-center gap-2 text-sm"
                >
                  <Share2 size={16} /> Compartilhar
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
