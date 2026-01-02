
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useEffect } from 'react';
import { HeroScene, NeuralNetworkScene } from './components/QuantumScene';
import { GUIGroundingSimulation, TrainingPipelineDiagram, BenchmarkComparison } from './components/Diagrams';
import { Menu, X, Cpu, Database, Globe, Github, FileText, Award, ExternalLink, ClipboardCheck } from 'lucide-react';

const AuthorCard = ({ name, role, email, delay }: { name: string, role: string, email: string, delay: string }) => {
  return (
    <div className="flex flex-col group animate-fade-in-up items-center p-8 bg-white rounded-xl border border-stone-200 shadow-sm transition-all duration-300 w-full max-w-xs hover:border-nobel-gold/30" style={{ animationDelay: delay }}>
      <h3 className="font-serif text-2xl text-stone-900 text-center mb-1">{name}</h3>
      <p className="text-[10px] text-stone-400 font-bold uppercase tracking-widest mb-4">DeepCAT Lab, NYCU</p>
      <div className="w-12 h-0.5 bg-stone-200 mb-4 group-hover:bg-nobel-gold transition-colors"></div>
      <p className="text-sm text-stone-600 text-center leading-relaxed mb-4">{role}</p>
      <p className="text-xs font-mono text-stone-400">{email}</p>
    </div>
  );
};

const App: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    setMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-[#F9F8F4] text-stone-800 selection:bg-nobel-gold selection:text-white">
      
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-[#F9F8F4]/95 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-6'}`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-4 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="w-8 h-8 bg-stone-900 rounded-lg flex items-center justify-center text-nobel-gold font-serif font-bold text-xl shadow-sm">Z</div>
            <span className={`font-serif font-bold text-lg tracking-wide transition-opacity ${scrolled ? 'opacity-100' : 'opacity-0 md:opacity-100'}`}>
              ZonUI-3B <span className="font-normal text-stone-500">Project</span>
            </span>
          </div>
          
          <div className="hidden md:flex items-center gap-8 text-sm font-medium tracking-wide text-stone-600">
            <a href="#abstract" onClick={scrollToSection('abstract')} className="hover:text-nobel-gold transition-colors cursor-pointer uppercase">Abstract</a>
            <a href="#methodology" onClick={scrollToSection('methodology')} className="hover:text-nobel-gold transition-colors cursor-pointer uppercase">Approach</a>
            <a href="#benchmarks" onClick={scrollToSection('benchmarks')} className="hover:text-nobel-gold transition-colors cursor-pointer uppercase">Evaluation</a>
            <a href="#authors" onClick={scrollToSection('authors')} className="hover:text-nobel-gold transition-colors cursor-pointer uppercase">Authors</a>
            <div className="flex items-center gap-4 ml-4">
               <a href="https://github.com/Han1018/ZonUI-3B" target="_blank" rel="noopener noreferrer" className="p-2 hover:text-stone-900 transition-colors"><Github size={18} /></a>
               <a href="https://arxiv.org/abs/2506.23491" target="_blank" rel="noopener noreferrer" className="p-2 hover:text-stone-900 transition-colors"><FileText size={18} /></a>
            </div>
          </div>

          <button className="md:hidden text-stone-900 p-2" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative h-screen flex items-center justify-center overflow-hidden bg-[#121210]">
        <HeroScene />
        <div className="absolute inset-0 z-0 pointer-events-none bg-gradient-to-b from-transparent to-[#121210]/90" />

        <div className="relative z-10 container mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-1 border border-stone-700 text-stone-400 text-[10px] tracking-[0.2em] uppercase font-bold rounded-full bg-white/5 backdrop-blur-sm">
            <Award size={12} className="text-nobel-gold" /> WACV 2026 Accepted
          </div>
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-medium leading-tight mb-8 text-white max-w-5xl mx-auto">
            ZonUI-3B
          </h1>
          <p className="max-w-2xl mx-auto text-lg md:text-xl text-stone-400 font-light leading-relaxed mb-12">
            Efficient GUI Grounding optimized for consumer-grade hardware. Exploring the capabilities of lightweight vision-language models in professional environments.
          </p>
          
          <div className="flex flex-col md:flex-row justify-center items-center gap-6">
             <a href="https://github.com/Han1018/ZonUI-3B" target="_blank" rel="noopener noreferrer" className="px-8 py-4 bg-nobel-gold text-stone-900 font-bold rounded-full hover:bg-white transition-all shadow-lg flex items-center gap-2">
                <Github size={18} /> GitHub Repository
             </a>
             <a href="https://arxiv.org/abs/2506.23491" target="_blank" rel="noopener noreferrer" className="px-8 py-4 border border-stone-700 text-stone-300 font-bold rounded-full hover:bg-white/5 transition-all flex items-center gap-2">
                <FileText size={18} /> arXiv Preprint
             </a>
          </div>
        </div>
      </header>

      <main>
        {/* Abstract Section */}
        <section id="abstract" className="py-32 bg-white">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-16 items-start">
              <div className="md:col-span-6">
                <div className="inline-block mb-3 text-xs font-bold tracking-widest text-stone-400 uppercase">Abstract</div>
                <h2 className="font-serif text-4xl mb-8 leading-tight text-stone-900">Resource-Efficient GUI Grounding</h2>
                <p className="text-lg text-stone-600 leading-relaxed mb-8">
                  This work introduces <b>ZonUI-3B</b>, an empirical study on achieving high-precision GUI grounding within a 3B-parameter scale. Our results demonstrate that with a targeted two-stage training strategy and curated data sampling, ZonUI-3B achieves competitive performance on benchmarks like <b>ScreenSpot-Pro</b>, comparable to much larger models. Accepted at <b>WACV 2026</b>, this research highlights the feasibility of deploying specialized UI agents on edge-computing environments.
                </p>
                <div className="flex flex-wrap gap-6 text-sm text-stone-500 font-medium">
                   <div className="flex items-center gap-2"><ClipboardCheck size={16} className="text-nobel-gold"/> Based on Qwen2.5-VL-3B</div>
                   <div className="flex items-center gap-2"><Database size={16} className="text-nobel-gold"/> 24K Curated Samples</div>
                </div>
              </div>
              <div className="md:col-span-6">
                 <div className="grid grid-cols-2 gap-6">
                    {[
                      { label: "ScreenSpot-v2", value: "86.4%", sub: "SOTA for Models <4B" },
                      { label: "ScreenSpot-Pro", value: "28.7%", sub: "Stable Performance" },
                      { label: "GroundUI-1K", value: "82.4%", sub: "Cross-platform consistency" },
                      { label: "Training Cycle", value: "< 48h", sub: "Single RTX 4090" }
                    ].map((stat, i) => (
                      <div key={i} className="p-10 bg-stone-50 rounded-2xl border border-stone-100 flex flex-col items-center justify-center text-center hover:border-nobel-gold/20 transition-colors">
                         <div className="text-4xl font-serif font-bold text-stone-900 mb-2">{stat.value}</div>
                         <div className="text-xs font-bold text-stone-400 uppercase tracking-widest mb-1">{stat.label}</div>
                         <div className="text-[10px] text-stone-400 font-mono italic">{stat.sub}</div>
                      </div>
                    ))}
                 </div>
              </div>
            </div>
          </div>
        </section>

        {/* GUI Simulation */}
        <section id="grounding-viz" className="py-32 bg-[#F9F8F4]">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="font-serif text-4xl mb-4 text-stone-900">Grounding Task Simulation</h2>
                    <p className="text-stone-500 max-w-2xl mx-auto">Visualizing the model's ability to interpret natural language instructions and predict coordinates within a simulated desktop dashboard.</p>
                </div>
                <GUIGroundingSimulation />
            </div>
        </section>

        {/* Methodology */}
        <section id="methodology" className="py-32 bg-white overflow-hidden">
           <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                    <div className="order-2 lg:order-1">
                        <TrainingPipelineDiagram />
                    </div>
                    <div className="order-1 lg:order-2">
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-stone-100 text-stone-500 text-xs font-bold tracking-widest uppercase rounded-full mb-6">
                            <Cpu size={14}/> Training Pipeline
                        </div>
                        <h2 className="font-serif text-4xl mb-8 text-stone-900">Strategy & Methodology</h2>
                        <div className="space-y-10">
                            <div className="flex gap-6">
                                <div className="flex-shrink-0 w-10 h-10 border border-stone-200 text-stone-900 rounded-full flex items-center justify-center font-serif font-bold text-lg">I</div>
                                <div>
                                    <h4 className="font-bold text-stone-900 mb-2">Stage 1: Platform-Invariant Pretraining</h4>
                                    <p className="text-stone-500 leading-relaxed">
                                        Using <b>Class-Balanced Sampling</b>, we integrate heterogeneous data across Android, iOS, and Web platforms. This stage establishes foundational cross-platform GUI semantic understanding and visual-language alignment.
                                    </p>
                                </div>
                            </div>
                            <div className="flex gap-6">
                                <div className="flex-shrink-0 w-10 h-10 border border-nobel-gold/30 text-nobel-gold rounded-full flex items-center justify-center font-serif font-bold text-lg">II</div>
                                <div>
                                    <h4 className="font-bold text-stone-900 mb-2">Stage 2: Resolution-Focused Specialization</h4>
                                    <p className="text-stone-500 leading-relaxed">
                                        Optimized for desktop environments using datasets like <b>UGround</b>. This stage enhances the model's robustness across varied aspect ratios and improves precision for grounding small targets in high-resolution professional interfaces.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
           </div>
        </section>

        {/* Evaluation Section */}
        <section id="benchmarks" className="py-32 bg-stone-950 text-white">
           <div className="container mx-auto px-6">
               <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
                   <div className="max-w-xl">
                       <h2 className="font-serif text-4xl mb-6">Evaluation & Analysis</h2>
                       <p className="text-stone-500">
                          Comprehensive benchmarks against closed-source and open-source models. Our experiments show that optimized data curation enables smaller models to reach performance levels previously associated with much larger architectures.
                       </p>
                   </div>
                   <div className="flex gap-4">
                      <div className="px-6 py-4 bg-white/5 border border-stone-800 rounded-xl">
                         <div className="text-[10px] text-stone-600 uppercase font-bold mb-1 tracking-widest">Conference</div>
                         <div className="font-serif text-nobel-gold">WACV 2026 Accepted</div>
                      </div>
                   </div>
               </div>
               <BenchmarkComparison />
           </div>
        </section>

        {/* Authors */}
        <section id="authors" className="py-32 bg-[#F5F4F0]">
           <div className="container mx-auto px-6 text-center">
                <div className="inline-block mb-3 text-xs font-bold tracking-widest text-stone-400 uppercase">Research Team</div>
                <h2 className="font-serif text-3xl md:text-5xl mb-16 text-stone-900">DeepCAT Lab, NYCU</h2>
                
                <div className="flex flex-col md:flex-row gap-8 justify-center items-center flex-wrap">
                    <AuthorCard 
                        name="ZongHan Hsieh" 
                        role="Lead Researcher, VLM Optimization" 
                        email="zonghan.ai12@nycu.edu.tw"
                        delay="0s" 
                    />
                    <AuthorCard 
                        name="ShengJing Yang" 
                        role="Data Scientist, GUI Data Curation" 
                        email="billy004104.ai12@nycu.edu.tw"
                        delay="0.1s" 
                    />
                    <AuthorCard 
                        name="Tzer-Jen Wei" 
                        role="Advising Professor, DeepCAT Lab" 
                        email="tjwei@nycu.edu.tw"
                        delay="0.2s" 
                    />
                </div>
           </div>
        </section>

      </main>

      <footer className="bg-stone-950 text-stone-500 py-20 border-t border-stone-900">
        <div className="container mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-12 pb-16 border-b border-stone-900">
                <div className="text-center md:text-left">
                    <div className="text-white font-serif font-bold text-2xl mb-4">ZonUI-3B</div>
                    <p className="text-sm max-w-xs leading-relaxed">Advancing lightweight vision-language models for intelligent GUI perception.</p>
                </div>
                <div className="flex gap-10 text-sm font-medium">
                   <a href="https://arxiv.org/abs/2506.23491" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center gap-2">arXiv <ExternalLink size={14} /></a>
                   <a href="https://github.com/Han1018/ZonUI-3B" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center gap-2">GitHub <ExternalLink size={14} /></a>
                   <a href="#" className="hover:text-white transition-colors">WACV 2026</a>
                </div>
            </div>
            <div className="flex flex-col md:flex-row justify-between items-center mt-12 text-[10px] uppercase tracking-widest gap-4">
                <span>© 2025 DeepCAT Lab, NYCU. </span>
                <div className="flex items-center gap-2">
                   <Globe size={12}/> Hsinchu, Taiwan
                </div>
            </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
