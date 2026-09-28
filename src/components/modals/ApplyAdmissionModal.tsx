import React, { useState } from 'react';
import { submitAdmission } from '../../lib/storage';
import { AdmissionApplication } from '../../types';
import { INSTITUTION_INFO } from '../../data/initialData';
import { X, CheckCircle, Printer, Download, Sparkles, AlertCircle } from 'lucide-react';

interface ApplyAdmissionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ApplyAdmissionModal: React.FC<ApplyAdmissionModalProps> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState<'form' | 'success'>('form');
  const [submittedApp, setSubmittedApp] = useState<AdmissionApplication | null>(null);

  const [formData, setFormData] = useState({
    studentName: '',
    fatherName: '',
    motherName: '',
    gender: 'Male' as 'Male' | 'Female' | 'Other',
    dateOfBirth: '',
    desiredClass: 'Class VI',
    desiredStream: 'General',
    previousSchool: '',
    gpaOrMarks: '',
    phone: '',
    email: '',
    address: '',
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.studentName || !formData.phone || !formData.dateOfBirth) {
      alert('Please fill out student name, date of birth, and guardian contact phone.');
      return;
    }

    const app = submitAdmission(formData);
    setSubmittedApp(app);
    setStep('success');
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
              Academic Session 2026-2027
            </span>
            <h3 className="font-crest text-lg font-bold">Online Admission Application</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {step === 'form' ? (
          <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6">
            <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl text-xs text-blue-900 flex items-start gap-2">
              <Sparkles className="w-4 h-4 text-blue-700 shrink-0 mt-0.5" />
              <span>
                Please ensure all spelling matches the applicant’s official Birth Registration Certificate or Primary/JSC/SSC transcript.
              </span>
            </div>

            {/* Applicant Information */}
            <div className="space-y-4">
              <h4 className="font-bold text-slate-900 text-sm border-b border-slate-100 pb-2">
                1. Student Profile
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Student Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Mahfuzur Rahman"
                    value={formData.studentName}
                    onChange={(e) => setFormData({ ...formData, studentName: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-blue-900/30 focus:border-blue-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Date of Birth *
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.dateOfBirth}
                    onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-blue-900/30 focus:border-blue-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Gender</label>
                  <select
                    value={formData.gender}
                    onChange={(e) => setFormData({ ...formData, gender: e.target.value as any })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Desired Class for Admission *
                  </label>
                  <select
                    value={formData.desiredClass}
                    onChange={(e) => setFormData({ ...formData, desiredClass: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                  >
                    <option value="Class VI">Class VI (Junior Secondary)</option>
                    <option value="Class VII">Class VII</option>
                    <option value="Class VIII">Class VIII</option>
                    <option value="Class IX">Class IX (SSC)</option>
                    <option value="Class XI (HSC)">Class XI (Higher Secondary)</option>
                  </select>
                </div>
              </div>

              {formData.desiredClass.includes('IX') || formData.desiredClass.includes('XI') ? (
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Academic Group / Stream
                  </label>
                  <select
                    value={formData.desiredStream}
                    onChange={(e) => setFormData({ ...formData, desiredStream: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                  >
                    <option value="Science">Science Group</option>
                    <option value="Business Studies">Business Studies (Commerce)</option>
                    <option value="Humanities">Humanities (Arts)</option>
                  </select>
                </div>
              ) : null}
            </div>

            {/* Parent & Previous School Info */}
            <div className="space-y-4">
              <h4 className="font-bold text-slate-900 text-sm border-b border-slate-100 pb-2">
                2. Guardian & Academic Background
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Father's Name
                  </label>
                  <input
                    type="text"
                    placeholder="Father's full name"
                    value={formData.fatherName}
                    onChange={(e) => setFormData({ ...formData, fatherName: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Mother's Name
                  </label>
                  <input
                    type="text"
                    placeholder="Mother's full name"
                    value={formData.motherName}
                    onChange={(e) => setFormData({ ...formData, motherName: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Previous School / Institution
                  </label>
                  <input
                    type="text"
                    placeholder="Name of last attended school"
                    value={formData.previousSchool}
                    onChange={(e) => setFormData({ ...formData, previousSchool: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Previous Exam GPA / Marks
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. GPA 5.00 or 88%"
                    value={formData.gpaOrMarks}
                    onChange={(e) => setFormData({ ...formData, gpaOrMarks: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                  />
                </div>
              </div>
            </div>

            {/* Contact Details */}
            <div className="space-y-4">
              <h4 className="font-bold text-slate-900 text-sm border-b border-slate-100 pb-2">
                3. Contact Information
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Guardian Mobile Number *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+880 17XXXXXXXX"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="guardian@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Present Address (Village, Post, Thana, District)
                  </label>
                  <textarea
                    rows={2}
                    placeholder="e.g. Vill: Laxmipur, Post: Laxmipur, Gaibandha Sadar, Gaibandha"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                  />
                </div>
              </div>
            </div>

            {/* Submit Bar */}
            <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 bg-blue-900 hover:bg-blue-950 text-white font-semibold text-xs rounded-lg shadow-sm transition-colors cursor-pointer"
              >
                Submit Application
              </button>
            </div>
          </form>
        ) : (
          /* Success Receipt Card */
          <div className="p-6 sm:p-10 space-y-6 text-center font-sans">
            <div className="w-14 h-14 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle className="w-8 h-8" />
            </div>

            <div className="space-y-1">
              <h3 className="font-crest text-xl font-bold text-slate-900">
                Application Successfully Submitted!
              </h3>
              <p className="text-xs text-slate-600">
                Your admission application has been registered with Laxmipur School and College.
              </p>
            </div>

            {submittedApp && (
              <div className="max-w-md mx-auto bg-slate-50 border border-slate-200 rounded-xl p-5 text-left text-xs space-y-2.5">
                <div className="flex justify-between border-b border-slate-200 pb-2">
                  <span className="font-semibold text-slate-500">Tracking Slip No:</span>
                  <span className="font-mono font-bold text-blue-950">{submittedApp.applicationNo}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Applicant:</span>
                  <span className="font-semibold text-slate-800">{submittedApp.studentName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Applied Class:</span>
                  <span className="font-semibold text-slate-800">{submittedApp.desiredClass}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Stream / Group:</span>
                  <span className="font-semibold text-slate-800">{submittedApp.desiredStream || 'General'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Guardian Contact:</span>
                  <span className="font-semibold text-slate-800">{submittedApp.phone}</span>
                </div>
                <div className="flex justify-between border-t border-slate-200 pt-2">
                  <span className="text-slate-500">Status:</span>
                  <span className="text-emerald-700 font-semibold">{submittedApp.status} (In Review)</span>
                </div>
              </div>
            )}

            <div className="text-xs text-slate-500 max-w-md mx-auto">
              Please preserve this Tracking Slip Number. Bring photocopies of your birth certificate, recent passport photos, and last exam transcript during verification.
            </div>

            <div className="flex justify-center gap-3 pt-2">
              <button
                onClick={handlePrint}
                className="px-4 py-2 border border-slate-300 text-slate-700 rounded-lg text-xs font-semibold hover:bg-slate-50 flex items-center gap-1.5"
              >
                <Printer className="w-4 h-4" />
                Print Confirmation
              </button>
              <button
                onClick={() => {
                  setStep('form');
                  onClose();
                }}
                className="px-5 py-2 bg-slate-900 text-white rounded-lg text-xs font-semibold hover:bg-slate-800"
              >
                Done
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
