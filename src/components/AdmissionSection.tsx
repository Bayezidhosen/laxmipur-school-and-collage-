import React, { useState } from 'react';
import { ApplyAdmissionModal } from './modals/ApplyAdmissionModal';
import {
  FileCheck2,
  Calendar,
  CheckCircle,
  HelpCircle,
  GraduationCap,
  ArrowRight,
  BookOpen,
  ClipboardList,
  AlertCircle,
  X
} from 'lucide-react';

export const AdmissionSection: React.FC = () => {
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [showGuidelinesModal, setShowGuidelinesModal] = useState(false);

  const admissionSteps = [
    {
      step: '01',
      title: 'Online Application',
      description: 'Fill in candidate personal details, academic background, and select desired stream.',
    },
    {
      step: '02',
      title: 'Document Verification',
      description: 'Submit academic transcript copies, birth registration certificate, and guardian ID.',
    },
    {
      step: '03',
      title: 'Merit Assessment',
      description: 'Publication of class-wise admission merit list in accordance with board regulations.',
    },
    {
      step: '04',
      title: 'Formal Enrollment',
      description: 'Deposit institutional admission fees, collect syllabus pack, and receive student ID.',
    },
  ];

  const requiredDocs = [
    'Attested photocopy of Digital Birth Registration Certificate',
    'Previous academic progress report card / PSC / JSC / SSC transcript copy',
    '3 copies of passport-size and 1 stamp-size recent color photograph',
    'Photocopy of Parent / Legal Guardian National ID Card (NID)',
    'Original Transfer Certificate (TC) for Class VII to X candidates',
  ];

  const importantDates = [
    { event: 'Application Form Window Opens', date: 'September 20, 2026' },
    { event: 'Last Date for Online Submission', date: 'October 25, 2026' },
    { event: 'Document Verification at Campus', date: 'October 28 – 30, 2026' },
    { event: 'Publication of 1st Merit List', date: 'November 05, 2026' },
    { event: 'Orientation & Class Commencement', date: 'January 01, 2027' },
  ];

  return (
    <section id="admission" className="py-16 lg:py-24 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="text-xs uppercase tracking-widest font-semibold text-emerald-800 mb-2">
            Enrollment & Future Pathways
          </div>
          <h2 className="font-crest text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight">
            Admission Information
          </h2>
          <div className="w-16 h-1 bg-amber-500 mx-auto mt-4 rounded-full"></div>
          <p className="mt-4 text-sm sm:text-base text-slate-600 font-sans">
            Transparent, merit-driven admission procedures for prospective students aiming to join our disciplined academic family for Session 2026-2027.
          </p>
        </div>

        {/* 4-Step Process Visual */}
        <div className="mb-14">
          <h3 className="font-academic text-lg font-bold text-slate-900 mb-6 text-center">
            Four-Step Admission Roadmap
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {admissionSteps.map((s, idx) => (
              <div
                key={idx}
                className="relative bg-slate-50 p-6 rounded-2xl border border-slate-200/90 shadow-xs flex flex-col justify-between group hover:border-blue-900/40 transition-colors"
              >
                <div>
                  <span className="font-crest text-3xl font-extrabold text-blue-900/30 group-hover:text-blue-900/60 transition-colors block mb-2">
                    {s.step}
                  </span>
                  <h4 className="font-bold text-slate-900 text-sm mb-1">{s.title}</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">{s.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Two Columns: Requirements & Dates */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
          {/* Required Documents */}
          <div className="lg:col-span-6 bg-slate-50 rounded-2xl p-6 sm:p-8 border border-slate-200">
            <div className="flex items-center gap-2 mb-4 text-slate-900 font-bold text-base">
              <ClipboardList className="w-5 h-5 text-blue-900" />
              <h4>Mandatory Documentation Checklist</h4>
            </div>

            <p className="text-xs text-slate-500 mb-4 font-sans">
              Candidates must present genuine copies during in-person verification counter hours:
            </p>

            <ul className="space-y-3 text-xs text-slate-700">
              {requiredDocs.map((doc, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{doc}</span>
                </li>
              ))}
            </ul>

            <div className="mt-6 p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-900 flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
              <span>
                Note: Incomplete applications or forged academic credentials will lead to immediate cancellation of admission.
              </span>
            </div>
          </div>

          {/* Important Dates */}
          <div className="lg:col-span-6 bg-slate-50 rounded-2xl p-6 sm:p-8 border border-slate-200 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-4 text-slate-900 font-bold text-base">
                <Calendar className="w-5 h-5 text-emerald-800" />
                <h4>Schedule & Important Deadlines</h4>
              </div>

              <p className="text-xs text-slate-500 mb-4 font-sans">
                Official calendar for Academic Session 2026-2027 admissions:
              </p>

              <div className="space-y-3">
                {importantDates.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex flex-col sm:flex-row sm:items-center justify-between p-3 bg-white rounded-xl border border-slate-200/80 gap-1 text-xs"
                  >
                    <span className="font-medium text-slate-800">{item.event}</span>
                    <span className="font-semibold text-blue-900 shrink-0 font-mono text-[11px] sm:text-xs">
                      {item.date}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <p className="text-[11px] text-slate-500 mt-4 italic">
              * Official admission calendar subject to minor revisions per Ministry of Education directives.
            </p>
          </div>
        </div>

        {/* CTA Bar */}
        <div className="bg-gradient-to-r from-blue-950 via-slate-900 to-slate-900 rounded-2xl p-8 sm:p-10 text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-lg">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="font-crest text-xl font-bold text-amber-400">
              Ready to Join Laxmipur School and College?
            </h4>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
              Submit your preliminary application online today or download the comprehensive prospectus and criteria guidelines.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
            <button
              onClick={() => setShowGuidelinesModal(true)}
              className="px-5 py-2.5 bg-transparent border border-white/30 hover:border-white/60 text-white rounded-lg text-xs font-semibold transition-colors cursor-pointer"
            >
              Admission Guidelines
            </button>
            <button
              onClick={() => setShowApplyModal(true)}
              className="px-6 py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-950 rounded-lg text-xs font-bold transition-colors shadow-md flex items-center gap-1.5 cursor-pointer"
            >
              <span>Apply Now</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Guidelines Modal */}
      {showGuidelinesModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-slate-900 text-white p-5 rounded-t-2xl flex items-center justify-between z-10">
              <h3 className="font-crest text-lg font-bold">Admission Criteria & Guidelines</h3>
              <button
                onClick={() => setShowGuidelinesModal(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 sm:p-8 space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed font-sans">
              <h4 className="font-bold text-slate-900 text-base">Eligibility Requirements:</h4>
              <ul className="list-disc pl-5 space-y-2 text-xs">
                <li><strong>Class VI:</strong> Successful completion of Class V / Primary Education Completion (PEC) equivalency from any registered institution.</li>
                <li><strong>Class IX (Science):</strong> Minimum GPA 4.00 in Junior Secondary terminal examinations with strong marks in General Science and Mathematics.</li>
                <li><strong>Class IX (Humanities & Business Studies):</strong> Minimum GPA 3.00 in Junior Secondary examinations.</li>
                <li><strong>Class XI (HSC Science Group):</strong> Minimum GPA 4.50 in SSC Examination from any education board of Bangladesh.</li>
                <li><strong>Class XI (HSC Commerce & Humanities):</strong> Minimum GPA 3.00 to 3.50 in SSC Examination.</li>
              </ul>
              <div className="p-3 bg-slate-100 rounded-lg text-xs text-slate-600 mt-4">
                For special quota categories (Freedom Fighter descendants, merit scholarships, teacher ward quotas), contact the Admission Desk with authentic certification.
              </div>
            </div>
            <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end">
              <button
                onClick={() => setShowGuidelinesModal(false)}
                className="px-5 py-2 bg-slate-900 text-white rounded-lg text-xs font-semibold hover:bg-slate-800"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Online Apply Modal */}
      <ApplyAdmissionModal
        isOpen={showApplyModal}
        onClose={() => setShowApplyModal(false)}
      />
    </section>
  );
};
