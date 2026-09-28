import React from 'react';
import { INSTITUTION_INFO } from '../data/initialData';
import { Notice } from '../types';
import {
  ArrowRight,
  GraduationCap,
  Calendar,
  CheckCircle2,
  Bell,
  BookOpen,
  Award,
  ChevronRight
} from 'lucide-react';

interface HeroProps {
  onExplore: () => void;
  onAdmissionInfo: () => void;
  latestNotice?: Notice;
  onSelectNotice?: (notice: Notice) => void;
}

export const Hero: React.FC<HeroProps> = ({
  onExplore,
  onAdmissionInfo,
  latestNotice,
  onSelectNotice,
}) => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-slate-900 to-blue-950 text-white pt-8 pb-16 lg:pt-14 lg:pb-24">
      {/* Background Subtle Geometric Architectural Grid */}
      <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px]"></div>
      
      {/* Soft Ambient Radial Accents */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-blue-600/20 blur-[100px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-emerald-600/15 blur-[90px] rounded-full pointer-events-none"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breaking Notice Highlight Ticker */}
        {latestNotice && (
          <div className="mb-6 lg:mb-8 inline-flex max-w-3xl items-center gap-2 p-1 pr-3 bg-white/10 hover:bg-white/15 backdrop-blur-md rounded-lg border border-white/15 text-xs transition-colors cursor-pointer"
            onClick={() => onSelectNotice && onSelectNotice(latestNotice)}
          >
            <div className="flex items-center gap-1.5 px-2.5 py-1 bg-amber-400 text-slate-950 font-bold rounded text-[11px] uppercase tracking-wide">
              <Bell className="w-3 h-3" />
              Latest Notice
            </div>
            <p className="truncate text-slate-200 hover:text-white font-medium">
              {latestNotice.title}
            </p>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0 ml-auto" />
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Headlines & Call to Action */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-2">
              <div className="text-xs uppercase tracking-widest font-semibold text-emerald-400 flex items-center gap-2">
                <span>Estd. 1984</span>
                <span className="text-slate-500">·</span>
                <span>Gaibandha Sadar, Bangladesh</span>
                <span className="text-slate-500">·</span>
                <span>EIIN: {INSTITUTION_INFO.eiin}</span>
              </div>
              
              <h1 className="font-crest text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
                Welcome to{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-200 to-amber-400">
                  Laxmipur School and College
                </span>
              </h1>

              <p className="text-lg sm:text-xl font-academic italic text-slate-300">
                "{INSTITUTION_INFO.slogan}"
              </p>
            </div>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl font-normal">
              For over four decades, Laxmipur School and College has stood as a bastion of academic rigor, character cultivation, and moral distinction in Gaibandha. We empower young minds from primary to higher secondary levels through national curriculum excellence, scientific inquiry, and values-centered citizenship.
            </p>

            {/* Value checkmarks without pill enclosures (Zero-pill discipline) */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-1 text-xs text-slate-300 font-medium">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Modern Science & ICT Labs</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Dedicated Faculty</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Rich Sports & Co-Curricular</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={onExplore}
                className="px-6 py-3 bg-white text-slate-900 hover:bg-slate-100 font-semibold text-sm rounded-lg shadow-md hover:shadow-lg transition-all flex items-center gap-2 group cursor-pointer"
              >
                <span>Explore Our Institution</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </button>

              <button
                onClick={onAdmissionInfo}
                className="px-6 py-3 bg-transparent hover:bg-white/10 text-white border border-white/30 hover:border-white/50 font-semibold text-sm rounded-lg transition-all flex items-center gap-2 cursor-pointer"
              >
                <GraduationCap className="w-4 h-4 text-amber-400" />
                <span>Admission Information</span>
              </button>
            </div>
          </div>

          {/* Right Column: Campus Visual Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Outer Decorative Glow Border */}
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/20 bg-slate-800">
                <img
                  src="https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?auto=format&fit=crop&w=1000&q=80"
                  alt="Laxmipur School and College Academic Campus"
                  className="w-full h-80 sm:h-96 object-cover object-center filter brightness-95 hover:scale-105 transition-transform duration-700"
                />
                
                {/* Subtle Image Bottom Vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>

                {/* Overlaid Institutional Seal Tag */}
                <div className="absolute bottom-4 left-4 right-4 p-3 bg-slate-900/90 backdrop-blur-md rounded-xl border border-white/10 text-xs">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-white">Central Academic Building</p>
                      <p className="text-[11px] text-slate-300">Laxmipur, Gaibandha Sadar</p>
                    </div>
                    <div className="text-right">
                      <span className="text-[11px] text-amber-400 font-semibold">Dinajpur Board</span>
                      <p className="text-[10px] text-slate-400">Class VI – XII</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Stat Badge */}
              <div className="absolute -top-4 -right-4 sm:-right-6 bg-slate-900/95 backdrop-blur-md text-white p-3 sm:p-4 rounded-xl border border-amber-400/40 shadow-xl hidden sm:flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-amber-400/20 text-amber-400 flex items-center justify-center font-bold">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-lg font-bold text-amber-400 leading-tight">40+ Years</div>
                  <div className="text-[11px] text-slate-300 font-medium">Educational Legacy</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
