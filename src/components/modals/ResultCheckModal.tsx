import React, { useState } from 'react';
import { searchResults } from '../../lib/storage';
import { StudentResult } from '../../types';
import { INSTITUTION_INFO } from '../../data/initialData';
import { InstitutionLogo } from '../InstitutionLogo';
import { Search, X, Award, CheckCircle2, AlertCircle, Printer, FileText } from 'lucide-react';

interface ResultCheckModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResultCheckModal: React.FC<ResultCheckModalProps> = ({ isOpen, onClose }) => {
  const [rollNo, setRollNo] = useState('');
  const [regNo, setRegNo] = useState('');
  const [year, setYear] = useState('2026');
  const [searched, setSearched] = useState(false);
  const [result, setResult] = useState<StudentResult | null>(null);

  if (!isOpen) return null;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!rollNo.trim()) return;
    const res = searchResults(rollNo, regNo, year);
    setResult(res);
    setSearched(true);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 max-h-[92vh] overflow-y-auto">
        {/* Modal Header */}
        <div className="sticky top-0 bg-slate-900 text-white p-5 rounded-t-2xl flex items-center justify-between z-10">
          <div>
            <span className="text-xs uppercase tracking-wider text-amber-400 font-semibold">
              Academic Examination Cell
            </span>
            <h3 className="font-crest text-lg font-bold">Online Result & Marksheet Inquiry</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search Filter Form */}
        <div className="p-6 bg-slate-50 border-b border-slate-200">
          <form onSubmit={handleSearch} className="grid grid-cols-1 sm:grid-cols-4 gap-3 items-end">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Student Roll No *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. 101 or 202"
                value={rollNo}
                onChange={(e) => setRollNo(e.target.value)}
                className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs font-mono focus:ring-2 focus:ring-blue-900/30"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Registration No (Optional)
              </label>
              <input
                type="text"
                placeholder="e.g. 1812345678"
                value={regNo}
                onChange={(e) => setRegNo(e.target.value)}
                className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Examination Year
              </label>
              <select
                value={year}
                onChange={(e) => setYear(e.target.value)}
                className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs"
              >
                <option value="2026">2026</option>
                <option value="2025">2025</option>
                <option value="2024">2024</option>
              </select>
            </div>

            <div>
              <button
                type="submit"
                className="w-full py-2 px-4 bg-blue-900 hover:bg-blue-950 text-white font-semibold text-xs rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
              >
                <Search className="w-3.5 h-3.5" />
                <span>Search</span>
              </button>
            </div>
          </form>
          <div className="mt-2 text-[11px] text-slate-500">
            💡 Sample test roll numbers: <code className="bg-white px-1.5 py-0.5 rounded border border-slate-200">101</code> (Tanvir Ahmed), <code className="bg-white px-1.5 py-0.5 rounded border border-slate-200">202</code> (Nusrat Jahan), <code className="bg-white px-1.5 py-0.5 rounded border border-slate-200">305</code> (Shakil Mahmud)
          </div>
        </div>

        {/* Marksheet Display Area */}
        <div className="p-6 sm:p-8">
          {searched ? (
            result ? (
              <div className="border border-slate-300 rounded-xl p-6 bg-white shadow-xs font-sans space-y-6">
                {/* Result Institutional Header */}
                <div className="text-center border-b border-slate-200 pb-4 space-y-1">
                  <div className="flex items-center justify-center gap-2">
                    <InstitutionLogo size="sm" />
                    <h4 className="font-crest font-bold text-slate-900 text-lg">
                      {INSTITUTION_INFO.name}
                    </h4>
                  </div>
                  <p className="text-xs text-slate-500">Official Student Academic Transcript / Marksheet</p>
                  <p className="text-xs font-semibold text-blue-950">{result.examName} ({result.year})</p>
                </div>

                {/* Candidate Overview */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-3 bg-slate-50 rounded-lg text-xs">
                  <div>
                    <span className="text-slate-500 block">Student Name:</span>
                    <span className="font-bold text-slate-800">{result.studentName}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Class:</span>
                    <span className="font-semibold text-slate-800">{result.className}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Roll / Reg:</span>
                    <span className="font-mono font-semibold text-slate-800">{result.rollNo} / {result.regNo}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Result Status:</span>
                    <span className="font-bold text-emerald-700">{result.status} (GPA: {result.gpa.toFixed(2)})</span>
                  </div>
                </div>

                {/* Subject Mark Breakdown Table */}
                <div>
                  <h5 className="font-bold text-xs text-slate-800 mb-2 uppercase tracking-wide">
                    Subject Wise Marksheet
                  </h5>
                  <div className="overflow-x-auto border border-slate-200 rounded-lg">
                    <table className="w-full text-xs text-left">
                      <thead className="bg-slate-100 text-slate-700 font-semibold border-b border-slate-200">
                        <tr>
                          <th className="py-2.5 px-3">Subject Name</th>
                          <th className="py-2.5 px-3 text-center">Marks Obtained</th>
                          <th className="py-2.5 px-3 text-center">Letter Grade</th>
                          <th className="py-2.5 px-3 text-center">Grade Point</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {result.subjects.map((sub, idx) => (
                          <tr key={idx} className="hover:bg-slate-50">
                            <td className="py-2 px-3 font-medium text-slate-800">{sub.subject}</td>
                            <td className="py-2 px-3 text-center font-mono">{sub.marks}</td>
                            <td className="py-2 px-3 text-center font-bold text-blue-900">{sub.grade}</td>
                            <td className="py-2 px-3 text-center font-mono">{sub.point.toFixed(2)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Summary Box */}
                <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center justify-between">
                  <div>
                    <span className="text-xs text-emerald-800 font-medium block">Total Calculated GPA</span>
                    <span className="text-xl font-extrabold text-emerald-900 font-mono">
                      {result.gpa.toFixed(2)}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-emerald-800 font-medium block">Overall Grade</span>
                    <span className="text-xl font-extrabold text-emerald-900 font-mono">
                      {result.grade}
                    </span>
                  </div>
                </div>

                <div className="flex justify-between items-center pt-2">
                  <span className="text-[11px] text-slate-400">
                    System generated online copy. Controller of Examinations, LSC.
                  </span>
                  <button
                    onClick={handlePrint}
                    className="px-4 py-2 border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded-lg flex items-center gap-1.5"
                  >
                    <Printer className="w-4 h-4" />
                    Print Transcript
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center py-10 space-y-2">
                <AlertCircle className="w-10 h-10 text-amber-500 mx-auto" />
                <h4 className="font-bold text-slate-800 text-sm">No Result Record Found</h4>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  No examination result found matching Roll "{rollNo}" for year {year}. Please verify your roll number with the academic registrar.
                </p>
              </div>
            )
          ) : (
            <div className="text-center py-10 space-y-2 text-slate-500">
              <FileText className="w-10 h-10 text-slate-300 mx-auto" />
              <p className="text-sm font-semibold text-slate-700">Enter Your Roll Number to View Result</p>
              <p className="text-xs text-slate-400">
                You can search by roll number and optional registration number.
              </p>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-slate-900 text-white rounded-lg text-xs font-semibold hover:bg-slate-800 cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
