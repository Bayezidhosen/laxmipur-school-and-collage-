import React, { useState } from 'react';
import { User, Notice } from '../../types';
import { INSTITUTION_INFO } from '../../data/initialData';
import { searchResults } from '../../lib/storage';
import {
  GraduationCap,
  Calendar,
  Clock,
  BookOpen,
  Award,
  CheckCircle2,
  AlertCircle,
  FileText,
  DollarSign,
  Download,
  Printer,
  Bell,
  LogOut,
  ArrowLeft,
  ChevronRight
} from 'lucide-react';

interface StudentDashboardProps {
  currentUser: User;
  onLogout: () => void;
  onBackToHome: () => void;
  notices: Notice[];
  onSelectNotice: (notice: Notice) => void;
}

export const StudentDashboard: React.FC<StudentDashboardProps> = ({
  currentUser,
  onLogout,
  onBackToHome,
  notices,
  onSelectNotice,
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'results' | 'routine' | 'fees'>('overview');
  const [showAdmitCard, setShowAdmitCard] = useState(false);

  // Lookup results for this student (Roll 101)
  const studentResult = searchResults(currentUser.rollNo || '101', undefined, '2026');

  const todayClasses = [
    { period: '1st Period', time: '9:00 - 9:45 AM', subject: 'Higher Mathematics', teacher: 'Dr. Khandakar Mokhlesur', room: 'Room 204' },
    { period: '2nd Period', time: '9:45 - 10:30 AM', subject: 'Physics (Mechanics)', teacher: 'Prof. Md. Abdul Latif', room: 'Physics Lab' },
    { period: '3rd Period', time: '10:45 - 11:30 AM', subject: 'English 1st Paper', teacher: 'Sultana Razia Khatun', room: 'Room 204' },
    { period: '4th Period', time: '11:30 - 12:15 PM', subject: 'Chemistry Lab', teacher: 'Nazmul Haque Chowdhury', room: 'Chemistry Lab' },
    { period: '5th Period', time: '1:00 - 1:45 PM', subject: 'ICT Programming', teacher: 'Md. Tareq Hasan', room: 'Sheikh Russel Lab' },
  ];

  return (
    <div className="min-h-screen bg-slate-100 font-sans pb-16">
      {/* Top Navigation Banner */}
      <div className="bg-slate-900 text-white border-b border-slate-800 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={onBackToHome}
              className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors flex items-center gap-1.5 text-xs font-semibold"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Website</span>
            </button>
            <div className="h-4 w-px bg-slate-700 hidden sm:block"></div>
            <div className="hidden sm:block">
              <span className="text-xs uppercase tracking-wider text-amber-400 font-semibold block">
                Student Academic Portal
              </span>
              <h1 className="text-sm font-bold text-white font-crest">
                Laxmipur School and College
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <p className="text-xs font-bold text-white">{currentUser.name}</p>
              <p className="text-[11px] text-emerald-400 font-mono">
                ID: {currentUser.studentId} · Roll: {currentUser.rollNo}
              </p>
            </div>
            <button
              onClick={onLogout}
              className="p-2 bg-slate-800 hover:bg-red-950 text-slate-300 hover:text-red-400 rounded-lg text-xs font-medium flex items-center gap-1 transition-colors"
              title="Sign Out"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Sign Out</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* Profile Summary Banner */}
        <div className="bg-gradient-to-r from-blue-950 via-slate-900 to-slate-900 rounded-2xl p-6 sm:p-8 text-white shadow-md mb-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
            <div className="w-20 h-20 rounded-2xl bg-amber-400 text-slate-950 flex items-center justify-center font-crest text-2xl font-bold border-2 border-white/20 shadow-lg">
              {currentUser.name.charAt(0)}
            </div>
            <div className="space-y-1">
              <span className="text-xs uppercase tracking-widest text-amber-400 font-semibold">
                Enrolled Student Account
              </span>
              <h2 className="text-xl sm:text-2xl font-bold font-crest">{currentUser.name}</h2>
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 text-xs text-slate-300 font-medium">
                <span>Class: {currentUser.className || 'Class X (SSC)'}</span>
                <span>·</span>
                <span>Section: {currentUser.section || 'A (Science)'}</span>
                <span>·</span>
                <span className="font-mono">Roll: {currentUser.rollNo || '101'}</span>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setShowAdmitCard(true)}
              className="px-4 py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-950 rounded-lg text-xs font-bold transition-colors flex items-center gap-1.5 shadow-sm cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>Download Admit Card</span>
            </button>
          </div>
        </div>

        {/* Dashboard Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-6 border-b border-slate-200">
          {[
            { id: 'overview', label: 'Academic Overview' },
            { id: 'results', label: 'My Marksheet & Results' },
            { id: 'routine', label: 'Class Routine' },
            { id: 'fees', label: 'Tuition & Fees' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-blue-900 text-white shadow-xs'
                  : 'bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-200/70 border border-slate-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab 1: Overview */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Quick Metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
                <span className="text-xs font-semibold text-slate-500 block mb-1">
                  Overall Term CGPA
                </span>
                <div className="text-2xl font-extrabold text-blue-950 font-mono">
                  5.00 <span className="text-xs font-semibold text-emerald-600">(Grade A+)</span>
                </div>
                <span className="text-[11px] text-slate-500 mt-1 block">Class Rank: 1st Position</span>
              </div>

              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
                <span className="text-xs font-semibold text-slate-500 block mb-1">
                  Attendance Record
                </span>
                <div className="text-2xl font-extrabold text-emerald-800 font-mono">
                  94.8%
                </div>
                <span className="text-[11px] text-emerald-600 mt-1 block">Eligible for Board Exams</span>
              </div>

              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
                <span className="text-xs font-semibold text-slate-500 block mb-1">
                  Fee Clearance Status
                </span>
                <div className="text-2xl font-extrabold text-slate-800 font-mono">
                  Paid
                </div>
                <span className="text-[11px] text-emerald-600 mt-1 block">Cleared up to September 2026</span>
              </div>

              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
                <span className="text-xs font-semibold text-slate-500 block mb-1">
                  Upcoming Exam
                </span>
                <div className="text-lg font-bold text-slate-900 leading-tight">
                  Pre-Test Exam
                </div>
                <span className="text-[11px] text-blue-900 mt-1 block font-medium">Starts Oct 12, 2026</span>
              </div>
            </div>

            {/* Today's Classes & Important Notices Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Today's Routine */}
              <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
                <div className="flex items-center justify-between mb-4 border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-blue-900" />
                    <h3 className="font-bold text-sm text-slate-900">Today's Class Schedule</h3>
                  </div>
                  <span className="text-xs text-slate-500 font-mono">Regular Day</span>
                </div>

                <div className="space-y-3">
                  {todayClasses.map((cls, idx) => (
                    <div
                      key={idx}
                      className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 flex items-center justify-between text-xs"
                    >
                      <div className="space-y-0.5">
                        <span className="font-semibold text-slate-900 block">{cls.subject}</span>
                        <span className="text-[11px] text-slate-500">{cls.teacher} · {cls.room}</span>
                      </div>
                      <div className="text-right">
                        <span className="font-mono text-blue-900 font-semibold">{cls.time}</span>
                        <span className="text-[10px] text-slate-400 block">{cls.period}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Student Relevant Notices */}
              <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 p-6 shadow-xs flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-4 border-b border-slate-100 pb-3">
                    <Bell className="w-4 h-4 text-amber-500" />
                    <h3 className="font-bold text-sm text-slate-900">Academic Bulletins</h3>
                  </div>

                  <div className="space-y-3">
                    {notices.slice(0, 3).map((notice) => (
                      <div
                        key={notice.id}
                        onClick={() => onSelectNotice(notice)}
                        className="p-3 bg-slate-50 hover:bg-blue-50/60 rounded-xl border border-slate-200 transition-colors cursor-pointer group"
                      >
                        <div className="flex items-center justify-between text-[11px] text-slate-500 mb-1">
                          <span className="text-blue-900 font-semibold">{notice.category}</span>
                          <span>{notice.date}</span>
                        </div>
                        <h4 className="text-xs font-bold text-slate-800 group-hover:text-blue-900 line-clamp-1">
                          {notice.title}
                        </h4>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 text-center">
                  <button
                    onClick={onBackToHome}
                    className="text-xs text-blue-900 font-semibold hover:underline flex items-center justify-center gap-1 mx-auto"
                  >
                    <span>View All Notices on Website</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Marksheet & Results */}
        {activeTab === 'results' && (
          <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
              <div>
                <h3 className="font-crest text-lg font-bold text-slate-900">
                  Pre-Test Examination 2026 Marksheet
                </h3>
                <p className="text-xs text-slate-500">Board Curriculum Evaluation · Dinajpur Education Board</p>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold px-3 py-1 bg-emerald-100 text-emerald-800 rounded-md">
                  Status: Passed (GPA: 5.00)
                </span>
              </div>
            </div>

            {studentResult ? (
              <div className="space-y-6">
                <div className="overflow-x-auto border border-slate-200 rounded-xl">
                  <table className="w-full text-xs text-left">
                    <thead className="bg-slate-50 text-slate-700 font-semibold border-b border-slate-200">
                      <tr>
                        <th className="py-3 px-4">Subject Name</th>
                        <th className="py-3 px-4 text-center">Marks Obtained</th>
                        <th className="py-3 px-4 text-center">Letter Grade</th>
                        <th className="py-3 px-4 text-center">Grade Point</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-sans">
                      {studentResult.subjects.map((sub, idx) => (
                        <tr key={idx} className="hover:bg-slate-50/70">
                          <td className="py-2.5 px-4 font-medium text-slate-800">{sub.subject}</td>
                          <td className="py-2.5 px-4 text-center font-mono">{sub.marks}</td>
                          <td className="py-2.5 px-4 text-center font-bold text-blue-900">{sub.grade}</td>
                          <td className="py-2.5 px-4 text-center font-mono">{sub.point.toFixed(2)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl flex items-center justify-between text-xs">
                  <div>
                    <span className="font-bold text-blue-950 block">Cumulative Grade Point Average (CGPA)</span>
                    <span className="text-slate-600">Calculated on national 5.00 scaling format</span>
                  </div>
                  <div className="text-right">
                    <span className="text-2xl font-black text-blue-950 font-mono">5.00</span>
                    <span className="text-emerald-700 font-bold block">Excellent (A+)</span>
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-xs text-slate-500">Marksheet information currently being compiled.</p>
            )}
          </div>
        )}

        {/* Tab 3: Class Routine */}
        {activeTab === 'routine' && (
          <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-4">
            <h3 className="font-crest text-lg font-bold text-slate-900 mb-1">
              Class X (Science Group) Timetable
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              Regular academic hours: Saturday to Thursday (8:45 AM - 3:00 PM)
            </p>

            <div className="space-y-3">
              {todayClasses.map((item, idx) => (
                <div key={idx} className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                  <div>
                    <span className="font-bold text-slate-900 text-sm block">{item.subject}</span>
                    <span className="text-slate-600">{item.teacher} · Location: {item.room}</span>
                  </div>
                  <div className="text-left sm:text-right">
                    <span className="font-mono font-bold text-blue-900">{item.time}</span>
                    <span className="text-[11px] text-slate-500 block">{item.period}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 4: Tuition & Fees */}
        {activeTab === 'fees' && (
          <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
            <div>
              <h3 className="font-crest text-lg font-bold text-slate-900">
                Tuition & Examination Fee Ledger
              </h3>
              <p className="text-xs text-slate-500">Electronic payment status and clearance history</p>
            </div>

            <div className="overflow-x-auto border border-slate-200 rounded-xl">
              <table className="w-full text-xs text-left">
                <thead className="bg-slate-50 text-slate-700 font-semibold border-b border-slate-200">
                  <tr>
                    <th className="py-3 px-4">Fee Description</th>
                    <th className="py-3 px-4">Billing Month</th>
                    <th className="py-3 px-4 text-center">Amount (BDT)</th>
                    <th className="py-3 px-4 text-center">Status</th>
                    <th className="py-3 px-4 text-right">Receipt No</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-sans">
                  <tr className="hover:bg-slate-50/70">
                    <td className="py-2.5 px-4 font-medium text-slate-900">Monthly Tuition Fee</td>
                    <td className="py-2.5 px-4 text-slate-600">September 2026</td>
                    <td className="py-2.5 px-4 text-center font-mono">৳ 850</td>
                    <td className="py-2.5 px-4 text-center font-semibold text-emerald-700">Paid</td>
                    <td className="py-2.5 px-4 text-right font-mono text-slate-500">REC-2026-904</td>
                  </tr>
                  <tr className="hover:bg-slate-50/70">
                    <td className="py-2.5 px-4 font-medium text-slate-900">HSC Pre-Test Exam Fee</td>
                    <td className="py-2.5 px-4 text-slate-600">October 2026</td>
                    <td className="py-2.5 px-4 text-center font-mono">৳ 1,200</td>
                    <td className="py-2.5 px-4 text-center font-semibold text-emerald-700">Paid</td>
                    <td className="py-2.5 px-4 text-right font-mono text-slate-500">REC-2026-981</td>
                  </tr>
                  <tr className="hover:bg-slate-50/70">
                    <td className="py-2.5 px-4 font-medium text-slate-900">Science Lab & ICT Development Fee</td>
                    <td className="py-2.5 px-4 text-slate-600">Session 2026</td>
                    <td className="py-2.5 px-4 text-center font-mono">৳ 1,500</td>
                    <td className="py-2.5 px-4 text-center font-semibold text-emerald-700">Paid</td>
                    <td className="py-2.5 px-4 text-right font-mono text-slate-500">REC-2026-412</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-900 flex items-center justify-between">
              <span className="font-semibold">All due fees cleared. Student is in good financial standing.</span>
              <span className="font-mono font-bold">Total Dues: ৳ 0.00</span>
            </div>
          </div>
        )}
      </div>

      {/* Admit Card Modal */}
      {showAdmitCard && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in">
          <div className="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl border border-slate-200 p-6 sm:p-8 space-y-6">
            <div className="text-center border-b-2 border-slate-900 pb-4 space-y-1">
              <h3 className="font-crest text-lg font-bold text-slate-900">
                {INSTITUTION_INFO.name}
              </h3>
              <p className="text-xs text-slate-500 font-mono">EIIN: {INSTITUTION_INFO.eiin} · Dinajpur Board</p>
              <h4 className="text-xs uppercase font-bold text-blue-950 bg-slate-100 py-1 rounded mt-2">
                EXAMINATION ADMIT CARD · 2026
              </h4>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div>
                <span className="text-slate-500 block">Candidate Name:</span>
                <span className="font-bold text-slate-800">{currentUser.name}</span>
              </div>
              <div>
                <span className="text-slate-500 block">Student ID:</span>
                <span className="font-mono font-semibold text-slate-800">{currentUser.studentId}</span>
              </div>
              <div>
                <span className="text-slate-500 block">Class & Stream:</span>
                <span className="font-semibold text-slate-800">{currentUser.className}</span>
              </div>
              <div>
                <span className="text-slate-500 block">Class Roll No:</span>
                <span className="font-mono font-bold text-blue-900">{currentUser.rollNo}</span>
              </div>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-[11px] text-slate-600 space-y-1">
              <p className="font-bold text-slate-800">Exam Instructions:</p>
              <p>1. Must carry this card to the examination hall every day.</p>
              <p>2. Electronic smart devices or unauthorized papers are strictly prohibited.</p>
            </div>

            <div className="flex justify-between items-end pt-4 border-t border-slate-200 text-[11px] text-slate-500">
              <div>Student Signature</div>
              <div className="text-right font-academic italic">
                <span>Controller of Exams</span>
                <p className="text-[10px] text-slate-400">Laxmipur School and College</p>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => window.print()}
                className="px-4 py-2 border border-slate-300 rounded-lg text-xs font-semibold hover:bg-slate-50 flex items-center gap-1.5"
              >
                <Printer className="w-4 h-4" />
                Print
              </button>
              <button
                onClick={() => setShowAdmitCard(false)}
                className="px-5 py-2 bg-slate-900 text-white rounded-lg text-xs font-semibold hover:bg-slate-800"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
