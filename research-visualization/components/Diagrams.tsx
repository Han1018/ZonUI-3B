
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Crosshair, Monitor, Smartphone, Layers, ArrowRight, 
  CheckCircle2, Search, Settings, User, Bell, 
  ChevronRight, FileDown, MoreVertical, Menu, Home, PieChart, Users,
  Database, RefreshCcw, LogOut
} from 'lucide-react';

// --- CONFIGURATION: SHARED COORDINATE SYSTEM ---
// All values are percentages (0-100) relative to the viewport container.
type Platform = 'desktop' | 'mobile';

interface ElementPos {
  x: number; y: number; w: number; h: number; label: string;
}

const DESKTOP_GEOMETRY = {
  SEARCH: { x: 22, y: 4, w: 32, h: 8, label: "Search Input" },
  NOTIFY: { x: 84, y: 4, w: 4, h: 8, label: "Notifications" },
  AVATAR: { x: 92, y: 4, w: 4.5, h: 8, label: "User Profile" },
  EXPORT: { x: 72, y: 24, w: 12, h: 6, label: "CSV Export" },
  TABLE_ACTION: { x: 92, y: 64, w: 4, h: 6, label: "Edit Record" }
};

const MOBILE_GEOMETRY = {
  MENU: { x: 5, y: 4, w: 12, h: 8, label: "Menu Toggle" },
  SEARCH: { x: 82, y: 4, w: 12, h: 8, label: "Global Search" },
  LIST_CARD: { x: 5, y: 26, w: 90, h: 14, label: "Activity Card" }
};

interface Task {
  platform: Platform;
  instruction: string;
  target: ElementPos;
}

const TASKS: Task[] = [
  { platform: 'desktop', instruction: "Locate the main search bar in the dashboard header.", target: DESKTOP_GEOMETRY.SEARCH },
  { platform: 'desktop', instruction: "Find the system notification icon for pending alerts.", target: DESKTOP_GEOMETRY.NOTIFY },
  { platform: 'desktop', instruction: "Identify the user settings profile picture.", target: DESKTOP_GEOMETRY.AVATAR },
  { platform: 'desktop', instruction: "Locate the primary action button to export data to CSV.", target: DESKTOP_GEOMETRY.EXPORT },
  { platform: 'desktop', instruction: "Find the edit/more action for the third record in the table.", target: DESKTOP_GEOMETRY.TABLE_ACTION },
  { platform: 'mobile', instruction: "Locate the hamburger menu toggle in the mobile view.", target: MOBILE_GEOMETRY.MENU },
  { platform: 'mobile', instruction: "Find the search icon on the mobile navigation bar.", target: MOBILE_GEOMETRY.SEARCH },
  { platform: 'mobile', instruction: "Identify the primary list item in the mobile feed.", target: MOBILE_GEOMETRY.LIST_CARD },
];

// --- HELPER COMPONENTS ---

const TargetArea = ({ pos, children, className = "" }: { pos: ElementPos, children?: React.ReactNode, className?: string }) => (
  <div 
    className={`absolute flex items-center justify-center pointer-events-none ${className}`}
    style={{ left: `${pos.x}%`, top: `${pos.y}%`, width: `${pos.w}%`, height: `${pos.h}%` }}
  >
    {children}
  </div>
);

const DesktopUI = () => (
  <div className="absolute inset-0 bg-white flex flex-col font-sans overflow-hidden">
    {/* Header */}
    <div className="h-[16%] bg-stone-900 flex items-center px-4 justify-between border-b border-stone-800 relative">
      <div className="text-white font-serif font-bold text-xs tracking-widest hidden sm:block">Z-ADMIN</div>
      
      {/* Search Placement */}
      <TargetArea pos={DESKTOP_GEOMETRY.SEARCH} className="bg-stone-800 rounded border border-stone-700 px-3 justify-start gap-2">
        <Search size={12} className="text-stone-500" />
        <div className="text-[9px] text-stone-500 font-medium">Command + K...</div>
      </TargetArea>

      <div className="flex items-center gap-4 h-full">
        <TargetArea pos={DESKTOP_GEOMETRY.NOTIFY}><Bell size={16} className="text-stone-500" /></TargetArea>
        <TargetArea pos={DESKTOP_GEOMETRY.AVATAR} className="bg-stone-700 rounded-full border border-stone-600">
          <User size={14} className="text-stone-400" />
        </TargetArea>
      </div>
    </div>
    
    <div className="flex-1 flex">
      {/* Sidebar */}
      <div className="w-[20%] bg-stone-50 border-r border-stone-200 p-4 space-y-3 hidden md:block">
        {[Home, PieChart, Users, Database, Settings].map((Icon, i) => (
          <div key={i} className={`h-9 rounded-lg flex items-center px-2 gap-3 ${i === 0 ? 'bg-stone-200' : 'opacity-20'}`}>
            <Icon size={14} className="text-stone-600" />
            <div className="h-1.5 w-16 bg-stone-300 rounded-full"></div>
          </div>
        ))}
      </div>
      
      {/* Main Content */}
      <div className="flex-1 p-8 bg-white relative">
        <div className="flex justify-between items-start mb-10">
          <div className="space-y-1">
            <div className="text-xl font-serif font-bold text-stone-900">System Overview</div>
            <div className="text-[8px] text-stone-400 font-bold uppercase tracking-[0.2em]">Operational Telemetry</div>
          </div>
          <TargetArea pos={DESKTOP_GEOMETRY.EXPORT} className="bg-stone-900 rounded text-[9px] font-bold text-white shadow-lg">
             EXPORT CSV
          </TargetArea>
        </div>

        {/* Mock Table */}
        <div className="space-y-3">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="h-12 border border-stone-100 rounded-xl flex items-center px-4 gap-4 bg-stone-50/30 relative">
              <div className="w-6 h-6 rounded-lg bg-stone-100"></div>
              <div className="flex-1 h-1.5 bg-stone-200 rounded-full max-w-[120px]"></div>
              <div className="flex-1 h-1 bg-stone-100 rounded-full"></div>
              {i === 3 && (
                <TargetArea pos={{...DESKTOP_GEOMETRY.TABLE_ACTION, x: 80, y: 0, w: 20, h: 100}}>
                   <MoreVertical size={14} className="text-stone-300" />
                </TargetArea>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

const MobileUI = () => (
  <div className="absolute inset-0 bg-white flex flex-col font-sans overflow-hidden">
    {/* Status Bar */}
    <div className="h-[6%] bg-stone-100 flex justify-between items-center px-6">
      <div className="text-[8px] font-bold">9:41</div>
      <div className="flex gap-1.5 items-center">
        <div className="w-3 h-1.5 bg-stone-400 rounded-sm"></div>
        <div className="w-2 h-2 rounded-full bg-stone-400"></div>
      </div>
    </div>
    
    {/* App Header */}
    <div className="h-[12%] border-b border-stone-100 flex items-center justify-between px-5 relative">
      <TargetArea pos={MOBILE_GEOMETRY.MENU}>
        <Menu size={20} className="text-stone-900" />
      </TargetArea>
      <div className="text-[11px] font-black uppercase tracking-tighter">ZonUI Pro</div>
      <TargetArea pos={MOBILE_GEOMETRY.SEARCH}>
        <Search size={20} className="text-stone-900" />
      </TargetArea>
    </div>
    
    {/* Feed */}
    <div className="flex-1 p-5 space-y-4 bg-stone-50/50 relative">
      {[1, 2, 3, 4].map(i => (
        <div key={i} className="h-20 bg-white rounded-2xl border border-stone-100 shadow-sm flex items-center px-4 gap-4 relative overflow-hidden">
           {i === 1 ? (
             <TargetArea pos={{...MOBILE_GEOMETRY.LIST_CARD, x:0, y:0, w:100, h:100}} className="justify-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-stone-900 flex items-center justify-center text-nobel-gold">
                   <RefreshCcw size={16}/>
                </div>
                <div className="space-y-2">
                   <div className="h-2 w-32 bg-stone-200 rounded-full"></div>
                   <div className="h-1.5 w-20 bg-stone-100 rounded-full"></div>
                </div>
             </TargetArea>
           ) : (
             <>
               <div className="w-10 h-10 rounded-xl bg-stone-100"></div>
               <div className="flex-1 space-y-2">
                 <div className="h-2 w-40 bg-stone-200 rounded-full"></div>
                 <div className="h-1.5 w-24 bg-stone-100 rounded-full"></div>
               </div>
               <ChevronRight size={16} className="text-stone-200" />
             </>
           )}
        </div>
      ))}
    </div>
  </div>
);

// --- MAIN EXPORT ---

export const GUIGroundingSimulation: React.FC = () => {
  const [platform, setPlatform] = useState<Platform>('desktop');
  const [taskIdx, setTaskIdx] = useState(0);

  const filteredTasks = useMemo(() => TASKS.filter(t => t.platform === platform), [platform]);
  const current = filteredTasks[taskIdx % filteredTasks.length];

  useEffect(() => {
    const timer = setInterval(() => {
      setTaskIdx(prev => (prev + 1) % filteredTasks.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [filteredTasks.length]);

  return (
    <div className="w-full flex flex-col items-center">
      {/* Switcher */}
      <div className="flex bg-stone-200/50 p-1 rounded-2xl mb-12 backdrop-blur-md">
        <button 
          onClick={() => { setPlatform('desktop'); setTaskIdx(0); }}
          className={`flex items-center gap-3 px-8 py-3 rounded-xl text-xs font-bold transition-all ${platform === 'desktop' ? 'bg-white shadow-xl text-stone-900' : 'text-stone-500 hover:text-stone-800'}`}
        >
          <Monitor size={16} /> Desktop View
        </button>
        <button 
          onClick={() => { setPlatform('mobile'); setTaskIdx(0); }}
          className={`flex items-center gap-3 px-8 py-3 rounded-xl text-xs font-bold transition-all ${platform === 'mobile' ? 'bg-white shadow-xl text-stone-900' : 'text-stone-500 hover:text-stone-800'}`}
        >
          <Smartphone size={16} /> Mobile View
        </button>
      </div>

      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-12 bg-white rounded-[48px] border border-stone-200 shadow-2xl overflow-hidden">
        
        {/* VIEWPORT AREA */}
        <div className="lg:col-span-8 bg-[#F5F4EF] p-8 md:p-20 flex items-center justify-center relative min-h-[500px]">
          {/* Constrained Aspect Ratio Container */}
          <div 
            className={`relative bg-white shadow-2xl border border-stone-200 transition-all duration-1000 ease-in-out ${
              platform === 'desktop' ? 'w-full aspect-[16/10] max-w-2xl rounded-2xl overflow-hidden' : 'w-64 aspect-[9/19.5] rounded-[56px] border-[12px] border-stone-900 overflow-hidden'
            }`}
          >
            <AnimatePresence mode="wait">
              <motion.div 
                key={platform}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                className="absolute inset-0"
              >
                {platform === 'desktop' ? <DesktopUI /> : <MobileUI />}
              </motion.div>
            </AnimatePresence>

            {/* PREDICTION LAYER - Mathematically Aligned */}
            <AnimatePresence mode="wait">
              <motion.div 
                key={`${platform}-${taskIdx}`}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.5 }}
                className="absolute border-2 border-red-500 bg-red-500/10 z-[200] flex items-center justify-center pointer-events-none"
                style={{ 
                  left: `${current.target.x}%`, 
                  top: `${current.target.y}%`, 
                  width: `${current.target.w}%`, 
                  height: `${current.target.h}%` 
                }}
              >
                {/* Visual Guides */}
                <div className="absolute -top-1 -left-1 w-2.5 h-2.5 border-t-2 border-l-2 border-red-600"></div>
                <div className="absolute -top-1 -right-1 w-2.5 h-2.5 border-t-2 border-r-2 border-red-600"></div>
                <div className="absolute -bottom-1 -left-1 w-2.5 h-2.5 border-b-2 border-l-2 border-red-600"></div>
                <div className="absolute -bottom-1 -right-1 w-2.5 h-2.5 border-b-2 border-r-2 border-red-600"></div>
                <Crosshair size={14} className="text-red-600/40" />
                
                <div className="absolute -top-10 left-0 bg-red-600 text-white text-[10px] px-3 py-1 font-black rounded shadow-2xl uppercase tracking-tighter whitespace-nowrap">
                   {current.target.label} • p[{(current.target.x/100).toFixed(3)}, {(current.target.y/100).toFixed(3)}]
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* INFERENCE SIDEBAR */}
        <div className="lg:col-span-4 bg-stone-950 p-12 flex flex-col justify-center">
          <div className="mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-nobel-gold/10 border border-nobel-gold/20 rounded-full mb-6">
               <div className="w-1.5 h-1.5 bg-nobel-gold rounded-full animate-pulse"></div>
               <span className="text-nobel-gold text-[9px] font-black uppercase tracking-[0.4em]">Inference Live</span>
            </div>
            <h3 className="text-white font-serif text-2xl leading-tight italic opacity-90">
              "{current.instruction}"
            </h3>
          </div>
          
          <div className="space-y-4">
            <div className="p-6 bg-white/5 rounded-3xl border border-white/10 backdrop-blur-xl">
              <div className="text-[10px] uppercase font-black text-stone-500 mb-6 tracking-widest flex justify-between items-center">
                <span>Model Output</span>
                <span className="text-emerald-400">99.9% Prob</span>
              </div>
              <div className="font-mono text-[11px] space-y-4">
                <div className="flex justify-between items-center pb-3 border-b border-white/5">
                  <span className="text-stone-600">NORM_X</span>
                  <span className="text-stone-200">{(current.target.x / 100).toFixed(4)}</span>
                </div>
                <div className="flex justify-between items-center pb-3 border-b border-white/5">
                  <span className="text-stone-600">NORM_Y</span>
                  <span className="text-stone-200">{(current.target.y / 100).toFixed(4)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-stone-600">SEMANTIC</span>
                  <span className="text-nobel-gold font-bold">{current.target.label.toUpperCase().replace(' ', '_')}</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center justify-between px-2">
               <div className="text-[9px] text-stone-600 font-bold uppercase tracking-widest flex items-center gap-2">
                 <div className="w-1 h-1 bg-stone-600 rounded-full"></div>
                 Latency: 142ms
               </div>
               <div className="text-[9px] text-stone-600 font-bold uppercase tracking-widest">
                 Resolution: Multi
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- PREVIOUS COMPONENTS ---

export const TrainingPipelineDiagram: React.FC = () => {
    return (
        <div className="p-10 bg-white border border-stone-200 rounded-3xl shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
                <Database size={120} className="text-stone-900" />
            </div>
            
            <div className="grid grid-cols-1 gap-14">
                <div className="relative z-10">
                    <div className="flex items-center gap-6 mb-4">
                        <div className="w-12 h-12 bg-stone-900 rounded-xl flex items-center justify-center text-nobel-gold">
                            <Layers size={22}/>
                        </div>
                        <div className="flex-1">
                            <div className="flex justify-between items-end mb-2">
                                <div className="text-sm font-bold text-stone-900">Stage 1: Platform-Invariant Pretraining</div>
                                <div className="text-[10px] font-mono text-stone-400">Class-Balanced Dataset</div>
                            </div>
                            <div className="h-1.5 bg-stone-100 rounded-full overflow-hidden">
                                <motion.div 
                                  className="h-full bg-stone-900" 
                                  initial={{ width: 0 }} 
                                  animate={{ width: "100%" }} 
                                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                                />
                            </div>
                        </div>
                    </div>
                    <p className="text-xs text-stone-500 ml-18 leading-relaxed max-w-sm">
                        Establishing cross-platform semantic grounding by integrating Android, iOS, and Web data under a class-balanced sampling regime.
                    </p>
                </div>

                <div className="relative z-10">
                    <div className="flex items-center gap-6 mb-4">
                        <div className="w-12 h-12 bg-nobel-gold rounded-xl flex items-center justify-center text-stone-900">
                            <Monitor size={22}/>
                        </div>
                        <div className="flex-1">
                            <div className="flex justify-between items-end mb-2">
                                <div className="text-sm font-bold text-stone-900">Stage 2: Resolution-Focused Adaptation</div>
                                <div className="text-[10px] font-mono text-nobel-gold">Multi-Res Fine-tuning</div>
                            </div>
                            <div className="h-1.5 bg-stone-100 rounded-full overflow-hidden">
                                <motion.div 
                                  className="h-full bg-nobel-gold" 
                                  initial={{ width: 0 }} 
                                  animate={{ width: "100%" }} 
                                  transition={{ duration: 4, repeat: Infinity, ease: "linear", delay: 1 }}
                                />
                            </div>
                        </div>
                    </div>
                    <p className="text-xs text-stone-500 ml-18 leading-relaxed max-w-sm">
                        Optimizing visual perception for high-resolution professional software and variable desktop aspect ratios using UGround datasets.
                    </p>
                </div>
            </div>
            
            <div className="mt-12 pt-8 border-t border-stone-100 flex justify-between items-center">
                <div className="flex flex-col">
                    <span className="text-[9px] text-stone-400 uppercase font-bold tracking-[0.2em] mb-1">Architecture</span>
                    <span className="text-lg font-serif text-stone-900 font-bold">Qwen2.5-VL-3B LoRA</span>
                </div>
                <div className="px-4 py-2 bg-stone-900 text-nobel-gold text-[10px] font-bold rounded-full flex items-center gap-2">
                   DEPLOYABLE SCALE <ArrowRight size={14} />
                </div>
            </div>
        </div>
    );
};

export const BenchmarkComparison: React.FC = () => {
    const data = [
        { model: "ZonUI-3B (Ours)", ss: 84.9, sspro: 28.7, ss2: 86.4, gui: 82.4, color: "text-emerald-400", bold: true },
        { model: "UI-TARS-2B", ss: 82.3, sspro: 27.7, ss2: 84.7, gui: 74.1, color: "text-stone-100" },
        { model: "OS-Atlas-7B", ss: 82.4, sspro: 18.9, ss2: 84.1, gui: "N/A", color: "text-stone-500" },
        { model: "Claude-3.5-CU", ss: 84.0, sspro: 17.1, ss2: "N/A", gui: 16.3, color: "text-stone-500" },
        { model: "ShowUI-2B", ss: 74.9, sspro: 7.7, ss2: 77.3, gui: "N/A", color: "text-stone-500" },
    ];

    return (
        <div className="w-full overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[800px]">
                <thead>
                    <tr className="border-b border-stone-800">
                        <th className="py-8 text-[10px] uppercase font-bold text-stone-500 tracking-[0.3em]">Model Baseline</th>
                        <th className="py-8 text-[10px] uppercase font-bold text-stone-500 tracking-[0.3em] text-center">ScreenSpot-Pro (%)</th>
                        <th className="py-8 text-[10px] uppercase font-bold text-stone-500 tracking-[0.3em] text-center">ScreenSpot (%)</th>
                        <th className="py-8 text-[10px] uppercase font-bold text-stone-500 tracking-[0.3em] text-center">GroundUI-1K (%)</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((row, i) => (
                        <tr key={i} className={`border-b border-stone-900/50 transition-all ${row.bold ? 'bg-white/5' : 'opacity-60 hover:opacity-100'}`}>
                            <td className={`py-8 font-serif text-lg ${row.color}`}>
                                {row.model}
                                {row.bold && <span className="ml-3 text-[8px] bg-nobel-gold text-stone-900 px-2 py-0.5 rounded-full font-sans font-black uppercase align-middle">Optimal</span>}
                            </td>
                            <td className={`py-8 font-mono text-xl text-center ${row.bold ? 'text-nobel-gold' : 'text-stone-400'}`}>
                                {row.sspro}
                            </td>
                            <td className={`py-8 font-mono text-xl text-center ${row.bold ? 'text-nobel-gold' : 'text-stone-400'}`}>{row.ss}</td>
                            <td className={`py-8 font-mono text-xl text-center ${row.bold ? 'text-nobel-gold' : 'text-stone-400'}`}>{row.gui}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
