import React, { useState } from 'react';
import { INITIAL_ACADEMIC_PROGRAMS } from '../data/initialData';
import { AcademicProgram } from '../types';
import {
  GraduationCap,
  BookOpen,
  CheckCircle2,
  Clock,
  Layers,
  ArrowRight,
  X,
  FileText,
  Sparkles
} from 'lucide-react';

export const AcademicSection: React.FC = () => {
  const [selectedProgram, setSelectedProgram] = useState<AcademicProgram | null>(null);

  return (
    <section id="academic" className="py-16 lg:py-24 bg-slate-100/70 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="text-xs uppercase tracking-widest font-semibold text-emerald-800 mb-2">
            Curriculum & Pedagogy
          </div>
          <h2 className="font-crest text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight">
            Academic Programs
          </h2>
          <div className="w-16 h-1 bg-amber-500 mx-auto mt-4 rounded-full"></div>
          <p className="mt-4 text-sm sm:text-base text-slate-600 font-sans">
            Comprehensive national curriculum offerings aligned with NCTB and Dinajpur Education Board standards, tailored to foster intellectual independence and examination excellence.
          </p>
        </div>

        {/* Programs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {INITIAL_ACADEMIC_PROGRAMS.map((program) => (
            <div
              key={program.id}
              className="bg-white rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-md transition-all flex flex-col justify-between p-6 group hover:border-blue-900/30"
            >
              <div>
                {/* Header text metadata (Zero-pill compliant: unboxed text with subtle separator) */}
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 mb-3">
                  <span className="text-blue-900">{program.level}</span>
                  <span aria-hidden="true">·</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-slate-400" />
                    {program.duration}
                  </span>
                </div>

                <h3 className="font-academic text-lg font-bold text-slate-900 group-hover:text-blue-950 transition-colors">
                  {program.name}
                </h3>
                
                <p className="text-xs font-medium text-emerald-700 mt-1">
                  {program.classes}
                </p>

                <p className="text-xs text-slate-600 mt-3 leading-relaxed line-clamp-3">
                  {program.description}
                </p>

                {/* Streams or Highlights preview */}
                {program.streams && (
                  <div className="mt-4 pt-3 border-t border-slate-100">
                    <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block mb-1.5">
                      Available Streams:
                    </span>
                    <div className="flex flex-wrap gap-1.5 text-xs text-slate-700">
                      {program.streams.map((stream, sIdx) => (
                        <span key={sIdx} className="bg-slate-50 px-2 py-0.5 rounded text-[11px] border border-slate-200">
                          {stream}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Highlights List */}
                <div className="mt-4 space-y-1.5 text-xs text-slate-600">
                  {program.highlights.slice(0, 2).map((item, idx) => (
                    <div key={idx} className="flex items-start gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span className="line-clamp-1">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-5 mt-4 border-t border-slate-100">
                <button
                  onClick={() => setSelectedProgram(program)}
                  className="w-full py-2 px-3 bg-slate-50 hover:bg-blue-900 text-slate-700 hover:text-white rounded-lg text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>Learn More</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Program Details Modal */}
      {selectedProgram && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="sticky top-0 bg-slate-900 text-white p-6 rounded-t-2xl flex items-center justify-between z-10">
              <div>
                <span className="text-xs uppercase tracking-wider text-amber-400 font-semibold">
                  {selectedProgram.level} · {selectedProgram.duration}
                </span>
                <h3 className="font-crest text-xl font-bold mt-0.5">{selectedProgram.name}</h3>
                <p className="text-xs text-slate-300 mt-1">{selectedProgram.classes}</p>
              </div>
              <button
                onClick={() => setSelectedProgram(null)}
                className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 sm:p-8 space-y-6 text-sm text-slate-700 font-sans">
              <div>
                <h4 className="font-bold text-slate-900 mb-2">Program Overview</h4>
                <p className="leading-relaxed text-slate-600">{selectedProgram.description}</p>
              </div>

              <div className="p-4 bg-blue-50/60 rounded-xl border border-blue-100 text-xs">
                <span className="font-bold text-blue-950">Curriculum & Accreditation:</span>{' '}
                <span className="text-blue-900">{selectedProgram.curriculum}</span>
              </div>

              {selectedProgram.streams && (
                <div>
                  <h4 className="font-bold text-slate-900 mb-2">Academic Streams</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {selectedProgram.streams.map((stream, idx) => (
                      <div key={idx} className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                        <span className="font-semibold text-xs text-slate-900 block">{stream}</span>
                        <span className="text-[11px] text-slate-500">Board Approved Syllabi</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <h4 className="font-bold text-slate-900 mb-2">Core & Elective Subject Offerings</h4>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  {selectedProgram.subjects.map((sub, idx) => (
                    <div key={idx} className="flex items-center gap-2 p-2 bg-slate-50 rounded border border-slate-100">
                      <BookOpen className="w-3.5 h-3.5 text-blue-700 shrink-0" />
                      <span className="font-medium text-slate-800">{sub}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 mb-2">Special Pedagogical Highlights</h4>
                <div className="space-y-2 text-xs">
                  {selectedProgram.highlights.map((h, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-slate-50 border-t border-slate-200 rounded-b-2xl flex justify-end">
              <button
                onClick={() => setSelectedProgram(null)}
                className="px-5 py-2 bg-slate-900 text-white rounded-lg text-xs font-semibold hover:bg-slate-800 cursor-pointer"
              >
                Close Program Details
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
