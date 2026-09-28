import React, { useState } from 'react';
import { INSTITUTION_INFO } from '../data/initialData';
import {
  Compass,
  Eye,
  ShieldCheck,
  CheckCircle,
  Sparkles,
  BookOpen,
  X,
  History,
  Building2,
  Users
} from 'lucide-react';

export const AboutSection: React.FC = () => {
  const [showFullAboutModal, setShowFullAboutModal] = useState(false);

  return (
    <section id="about" className="py-16 lg:py-24 bg-slate-50 border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="text-xs uppercase tracking-widest font-semibold text-emerald-800 mb-2">
            Institutional Legacy & Philosophy
          </div>
          <h2 className="font-crest text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight">
            About Laxmipur School and College
          </h2>
          <div className="w-16 h-1 bg-amber-500 mx-auto mt-4 rounded-full"></div>
          <p className="mt-4 text-sm sm:text-base text-slate-600 leading-relaxed font-sans">
            A trusted sanctuary of learning in Gaibandha, dedicated to academic distinction, scientific temperament, and unyielding moral integrity since 1984.
          </p>
        </div>

        {/* Two-Column Grid: Visual on Left, Structured Narrative on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Image & Credential Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-lg border border-slate-200 bg-white">
              <img
                src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=900&q=80"
                alt="Students studying collaboratively at Laxmipur School and College"
                className="w-full h-80 sm:h-96 object-cover object-center"
              />
              <div className="p-5 bg-white border-t border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-800 flex items-center justify-center font-bold">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">Recognized Excellence</h4>
                    <p className="text-xs text-slate-500">Government Approved & Dinajpur Education Board Certified</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Overlaid Highlight Pill */}
            <div className="absolute -bottom-4 -right-2 sm:-right-4 bg-slate-900 text-white p-4 rounded-xl shadow-xl border border-slate-700 hidden sm:block max-w-[200px]">
              <p className="text-xs font-semibold text-amber-400">Holistic Care</p>
              <p className="text-[11px] text-slate-300 mt-1">
                Fostering intellectual, emotional, and physical well-being.
              </p>
            </div>
          </div>

          {/* Text Content */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-4">
              <h3 className="font-academic text-xl sm:text-2xl font-bold text-slate-900">
                Nurturing Generations of Enlightened Citizens
              </h3>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                Founded with the noble mission to democratize quality modern education for the youth of Gaibandha Sadar, Laxmipur School and College has grown from a humble secondary institution into a premier composite educational complex offering education from Class VI through Higher Secondary Certificate (Class XII).
              </p>
              <p className="text-sm text-slate-600 leading-relaxed">
                Our institution provides a disciplined yet compassionate learning atmosphere where every student is challenged to achieve academic distinction while practicing civic responsibility, empathy, and national pride.
              </p>
            </div>

            {/* Mission & Vision Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs">
                <div className="flex items-center gap-2 mb-2 text-blue-900 font-semibold text-sm">
                  <Compass className="w-4 h-4 text-blue-700" />
                  <span>Our Mission</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  To provide holistic, student-centric education through modern curriculum delivery, scientific inquiry, and ethical mentorship, enabling youth to thrive in higher academia and modern society.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs">
                <div className="flex items-center gap-2 mb-2 text-emerald-900 font-semibold text-sm">
                  <Eye className="w-4 h-4 text-emerald-700" />
                  <span>Our Vision</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  To be a premier educational institution in northern Bangladesh renowned for academic superiority, ethical leadership, digital empowerment, and selfless service to the nation.
                </p>
              </div>
            </div>

            {/* Educational Values without pills (zero-pill discipline) */}
            <div className="pt-2 border-t border-slate-200">
              <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                Core Institutional Values
              </div>
              <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-slate-700 font-medium">
                <span className="flex items-center gap-1.5">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-600" /> Academic Rigor
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-600" /> Moral Discipline
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-600" /> Digital Competence
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-600" /> Social Patriotism
                </span>
              </div>
            </div>

            {/* Read More Trigger */}
            <div className="pt-2">
              <button
                onClick={() => setShowFullAboutModal(true)}
                className="px-5 py-2.5 bg-blue-950 text-white hover:bg-blue-900 font-medium text-xs rounded-lg transition-colors shadow-sm inline-flex items-center gap-2 cursor-pointer"
              >
                <span>Read Full Institutional Profile</span>
                <BookOpen className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Full Institutional Profile Modal */}
      {showFullAboutModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="sticky top-0 bg-slate-900 text-white p-5 rounded-t-2xl flex items-center justify-between z-10">
              <div>
                <h3 className="font-crest text-lg font-bold">Laxmipur School and College</h3>
                <p className="text-xs text-slate-300">Complete Institutional Background & Governance</p>
              </div>
              <button
                onClick={() => setShowFullAboutModal(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 sm:p-8 space-y-6 text-sm text-slate-700 leading-relaxed font-sans">
              <div className="space-y-2">
                <h4 className="font-bold text-slate-900 flex items-center gap-2 text-base">
                  <History className="w-4 h-4 text-blue-900" />
                  Historical Genesis & Growth
                </h4>
                <p>
                  Established in 1984 under the collective philanthropy of renowned educators, local philanthropists, and patrons of learning in Gaibandha, Laxmipur School and College was founded to bridge the educational gap for the rural and suburban communities of Gaibandha Sadar Upazila.
                </p>
                <p>
                  From an initial modest enrollment of less than one hundred pupils, the institution steadily expanded its infrastructure, gained government recognition, and eventually upgraded to include higher secondary college streams in Science, Humanities, and Business Studies under the Board of Intermediate and Secondary Education (BISE), Dinajpur.
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="font-bold text-slate-900 flex items-center gap-2 text-base">
                  <Building2 className="w-4 h-4 text-emerald-800" />
                  Campus Infrastructure & Facilities
                </h4>
                <p>
                  The institution boasts a sprawling 4.8-acre green campus featuring a four-storied administrative building, modern academic classrooms with multimedia projection facilities, well-equipped Physics, Chemistry, and Biology laboratories, the Sheikh Russel Digital Computer Lab with high-speed broadband, and a dedicated central library containing over 14,000 academic titles.
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="font-bold text-slate-900 flex items-center gap-2 text-base">
                  <Users className="w-4 h-4 text-indigo-900" />
                  Governance & Academic Rigor
                </h4>
                <p>
                  Governed by an active Managing Committee comprising educationists, guardians, and government representatives, the institution strictly adheres to the guidelines of the Ministry of Education, Directorate of Secondary and Higher Education (DSHE), and the National Curriculum and Textbook Board (NCTB).
                </p>
              </div>

              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-600">
                <span className="font-semibold text-slate-900">Official Institutional Codes:</span>{' '}
                EIIN: {INSTITUTION_INFO.eiin} · College Code: {INSTITUTION_INFO.collegeCode} · School Code: {INSTITUTION_INFO.schoolCode} · BISE Dinajpur
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-slate-50 border-t border-slate-200 rounded-b-2xl flex justify-end">
              <button
                onClick={() => setShowFullAboutModal(false)}
                className="px-5 py-2 bg-slate-800 text-white rounded-lg text-xs font-semibold hover:bg-slate-900"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
