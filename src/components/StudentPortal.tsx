import React, { useState } from 'react';
import { ResultCheckModal } from './modals/ResultCheckModal';
import { User } from '../types';
import {
  GraduationCap,
  Calendar,
  FileCheck,
  Download,
  BookOpen,
  Clock,
  Award,
  ArrowRight,
  ExternalLink,
  Laptop
} from 'lucide-react';

interface StudentPortalProps {
  currentUser: User | null;
  onOpenLogin: (role: 'student' | 'admin') => void;
  onGoToDashboard: () => void;
}

export const StudentPortal: React.FC<StudentPortalProps> = ({
  currentUser,
  onOpenLogin,
  onGoToDashboard,
}) => {
  const [showResultModal, setShowResultModal] = useState(false);
  const [activeTab, setActiveTab] = useState<'routine' | 'calendar' | 'resources'>('routine');

  const routines = [
    { class: 'Class VI', time: '8:45 AM - 1:30 PM', sections: 'Section A & B', shifts: 'Morning' },
    { class: 'Class VII - VIII', time: '8:45 AM - 2:15 PM', sections: 'Section A, B & C', shifts: 'Regular' },
    { class: 'Class IX - X (SSC)', time: '8:45 AM - 3:00 PM', sections: 'Science, Arts, Business', shifts: 'Regular + Lab' },
    { class: 'Class XI - XII (HSC)', time: '9:00 AM - 3:30 PM', sections: 'Science, Arts, Commerce', shifts: 'College Wing' },
  ];

  return (
    <section className="py-16 lg:py-24 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="text-xs uppercase tracking-widest font-semibold text-emerald-800 mb-2">
            Student Academic Services
          </div>
          <h2 className="font-crest text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight">
            Student Corner & Resources
          </h2>
          <div className="w-16 h-1 bg-amber-500 mx-auto mt-4 rounded-full"></div>
          <p className="mt-4 text-sm sm:text-base text-slate-600 font-sans">
            Quick access to term results, class timetables, examination schedules, syllabus downloads, and the protected student dashboard.
          </p>
        </div>

        {/* 4 Feature Action Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {/* 1. Exam Results Search */}
          <div className="bg-gradient-to-br from-blue-950 to-slate-900 text-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center font-bold mb-4">
                <Award className="w-5 h-5" />
              </div>
              <h3 className="font-crest text-base font-bold mb-1">Online Exam Results</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Check terminal, half-yearly, and pre-test examination marks and print official marksheets instantly.
              </p>
            </div>
            <button
              onClick={() => setShowResultModal(true)}
              className="mt-6 w-full py-2 px-3 bg-white hover:bg-slate-100 text-slate-900 rounded-lg text-xs font-bold transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span>Check Result Now</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* 2. Class Routine */}
          <div className="bg-slate-50 border border-slate-200 p-6 rounded-2xl shadow-xs hover:shadow-md transition-all flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-900 flex items-center justify-center font-bold mb-4">
                <Clock className="w-5 h-5" />
              </div>
              <h3 className="font-academic text-base font-bold text-slate-900 mb-1">Class Schedules</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                View updated daily class routines, practical laboratory batches, and teacher allocation charts.
              </p>
            </div>
            <button
              onClick={() => setActiveTab('routine')}
              className="mt-6 w-full py-2 px-3 bg-slate-200/80 hover:bg-slate-300 text-slate-800 rounded-lg text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span>View Timetable</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* 3. Academic Calendar */}
          <div className="bg-slate-50 border border-slate-200 p-6 rounded-2xl shadow-xs hover:shadow-md transition-all flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-900 flex items-center justify-center font-bold mb-4">
                <Calendar className="w-5 h-5" />
              </div>
              <h3 className="font-academic text-base font-bold text-slate-900 mb-1">Academic Calendar</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Official institutional yearly calendar including exam dates, vacations, sports events, and national observances.
              </p>
            </div>
            <button
              onClick={() => setActiveTab('calendar')}
              className="mt-6 w-full py-2 px-3 bg-slate-200/80 hover:bg-slate-300 text-slate-800 rounded-lg text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span>View Calendar</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* 4. Student Portal Login */}
          <div className="bg-gradient-to-br from-emerald-950 to-slate-900 text-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-emerald-400 text-slate-950 flex items-center justify-center font-bold mb-4">
                <GraduationCap className="w-5 h-5" />
              </div>
              <h3 className="font-crest text-base font-bold mb-1">Student Portal</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Log in to view personalized attendance history, monthly tuition dues, admit card download, and course routine.
              </p>
            </div>
            {currentUser && currentUser.role === 'student' ? (
              <button
                onClick={onGoToDashboard}
                className="mt-6 w-full py-2 px-3 bg-emerald-400 hover:bg-emerald-300 text-slate-950 rounded-lg text-xs font-bold transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>Open My Dashboard</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                onClick={() => onOpenLogin('student')}
                className="mt-6 w-full py-2 px-3 bg-emerald-400 hover:bg-emerald-300 text-slate-950 rounded-lg text-xs font-bold transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>Student Sign In</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Dynamic Detail Viewer Box */}
        <div className="bg-slate-50 rounded-2xl border border-slate-200 p-6 sm:p-8">
          <div className="flex items-center gap-2 mb-6 border-b border-slate-200 pb-3">
            <button
              onClick={() => setActiveTab('routine')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                activeTab === 'routine' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-200'
              }`}
            >
              Class Daily Routines
            </button>
            <button
              onClick={() => setActiveTab('calendar')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                activeTab === 'calendar' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-200'
              }`}
            >
              Academic Year Calendar 2026
            </button>
            <button
              onClick={() => setActiveTab('resources')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                activeTab === 'resources' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-200'
              }`}
            >
              Syllabi & NCTB E-Books
            </button>
          </div>

          {activeTab === 'routine' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {routines.map((r, idx) => (
                <div key={idx} className="p-4 bg-white rounded-xl border border-slate-200 shadow-xs space-y-2">
                  <span className="font-bold text-sm text-slate-900 block">{r.class}</span>
                  <div className="text-xs text-slate-600 space-y-1">
                    <p className="flex items-center gap-1.5 text-blue-900 font-medium">
                      <Clock className="w-3 h-3 text-slate-400" />
                      {r.time}
                    </p>
                    <p className="text-[11px] text-slate-500">{r.sections}</p>
                    <p className="text-[11px] text-emerald-700 font-semibold">{r.shifts}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'calendar' && (
            <div className="space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div className="p-3 bg-white rounded-lg border border-slate-200">
                  <span className="font-semibold text-slate-900 block">October 12, 2026</span>
                  <span className="text-slate-600">HSC 2nd Year Pre-Test Examination begins</span>
                </div>
                <div className="p-3 bg-white rounded-lg border border-slate-200">
                  <span className="font-semibold text-slate-900 block">November 18, 2026</span>
                  <span className="text-slate-600">Secondary Annual Examinations (Class VI - IX)</span>
                </div>
                <div className="p-3 bg-white rounded-lg border border-slate-200">
                  <span className="font-semibold text-slate-900 block">December 20, 2026</span>
                  <span className="text-slate-600">Annual Result Publication & Prize Giving Day</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'resources' && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-4 bg-white rounded-xl border border-slate-200 flex items-center justify-between">
                <div>
                  <h5 className="font-bold text-slate-900">Class IX-X NCTB E-Books</h5>
                  <p className="text-[11px] text-slate-500">Board Textbooks PDF Catalog</p>
                </div>
                <a
                  href="https://nctb.gov.bd"
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
              <div className="p-4 bg-white rounded-xl border border-slate-200 flex items-center justify-between">
                <div>
                  <h5 className="font-bold text-slate-900">HSC Model Questions</h5>
                  <p className="text-[11px] text-slate-500">Physics, Chemistry, Math & Accounting</p>
                </div>
                <button
                  onClick={() => alert('Model question pack distributed in student dashboard.')}
                  className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg"
                >
                  <Download className="w-4 h-4" />
                </button>
              </div>
              <div className="p-4 bg-white rounded-xl border border-slate-200 flex items-center justify-between">
                <div>
                  <h5 className="font-bold text-slate-900">Dinajpur Board Syllabus</h5>
                  <p className="text-[11px] text-slate-500">Class VI - XII Revised Curriculum</p>
                </div>
                <a
                  href="https://dinajpureducationboard.gov.bd"
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Result Check Modal */}
      <ResultCheckModal
        isOpen={showResultModal}
        onClose={() => setShowResultModal(false)}
      />
    </section>
  );
};
