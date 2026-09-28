import React from 'react';
import { INSTITUTION_INFO } from '../data/initialData';
import { Quote, Award, Mail, Phone } from 'lucide-react';

export const PrincipalSection: React.FC = () => {
  const principal = INSTITUTION_INFO.principal;

  return (
    <section className="py-16 lg:py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 rounded-3xl text-white p-8 sm:p-12 lg:p-14 shadow-xl relative overflow-hidden">
          {/* Subtle Background Academic Motif */}
          <div className="absolute right-0 top-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Principal Photo & Identity Card */}
            <div className="lg:col-span-4 flex flex-col items-center sm:items-start text-center sm:text-left">
              <div className="relative mb-4 group">
                <div className="w-44 h-52 sm:w-52 sm:h-60 rounded-2xl overflow-hidden border-2 border-amber-400/40 shadow-2xl bg-slate-800">
                  <img
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80"
                    alt={principal.name}
                    className="w-full h-full object-cover object-top filter contrast-105"
                  />
                </div>
                {/* Official seal badge */}
                <div className="absolute -bottom-3 -right-3 bg-amber-400 text-slate-950 p-2 rounded-xl shadow-lg border border-amber-300 flex items-center justify-center font-bold">
                  <Award className="w-5 h-5" />
                </div>
              </div>

              <div className="space-y-1">
                <h3 className="font-crest text-lg sm:text-xl font-bold text-white tracking-wide">
                  {principal.name}
                </h3>
                <p className="text-xs sm:text-sm font-semibold text-amber-300">
                  {principal.designation}
                </p>
                <p className="text-xs text-slate-400 font-sans">
                  {principal.qualifications}
                </p>
              </div>

              {/* Direct Official Contact */}
              <div className="mt-4 pt-3 border-t border-white/10 w-full flex flex-col gap-1.5 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-amber-400" />
                  <span>principal@laxmipursc.edu.bd</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-amber-400" />
                  <span>+880 1711-223344 (Office)</span>
                </div>
              </div>
            </div>

            {/* Principal's Official Message */}
            <div className="lg:col-span-8 space-y-6">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-white/10 rounded-xl text-amber-400">
                  <Quote className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs uppercase tracking-widest font-semibold text-amber-400">
                    Institutional Leadership
                  </span>
                  <h2 className="font-crest text-2xl sm:text-3xl font-bold text-white tracking-tight">
                    Message from the Principal
                  </h2>
                </div>
              </div>

              <div className="space-y-4 text-sm sm:text-base text-slate-300 font-sans leading-relaxed">
                <p className="font-academic italic text-slate-200 text-base sm:text-lg border-l-2 border-amber-400 pl-4">
                  "Education is the most potent instrument for personal transformation and societal progress. At Laxmipur School and College, we do not merely instruct; we inspire."
                </p>
                <p>
                  Welcome to Laxmipur School and College, Gaibandha. For over four decades, our institution has stood as a beacon of academic rigor, character development, and social responsibility in northern Bangladesh. We believe that true education extends far beyond memorizing textbooks—it instills critical thinking, ethical integrity, scientific temperament, and an ardent love for our motherland.
                </p>
                <p>
                  Supported by a highly competent and compassionate faculty, modernized science and computer laboratories, and an inspiring learning campus, we nurture every child to realize their fullest potential. In our classrooms, boys and girls learn mutual respect, discipline, and the joy of intellectual discovery.
                </p>
                <p>
                  We warmly invite prospective students, parents, alumni, and community members to partner with us as we continue to shape tomorrow’s enlightened citizens.
                </p>
              </div>

              {/* Official Signature and Seal Representation */}
              <div className="pt-4 border-t border-white/15 flex flex-wrap items-center justify-between gap-4">
                <div>
                  <p className="font-academic italic text-lg text-amber-200">
                    Md. Abdul Latif
                  </p>
                  <p className="text-xs text-slate-400">
                    Principal, Laxmipur School and College, Gaibandha
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-[11px] text-slate-400 uppercase tracking-wider font-semibold">
                    Official Institutional Seal
                  </div>
                  <div className="text-xs text-emerald-400 font-medium">
                    Office of the Principal & Head of Institution
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
