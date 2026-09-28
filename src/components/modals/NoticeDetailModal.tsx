import React from 'react';
import { Notice } from '../../types';
import { INSTITUTION_INFO } from '../../data/initialData';
import { InstitutionLogo } from '../InstitutionLogo';
import { X, Printer, Download, Share2, Calendar, Tag, FileText, CheckCircle2 } from 'lucide-react';

interface NoticeDetailModalProps {
  notice: Notice | null;
  onClose: () => void;
}

export const NoticeDetailModal: React.FC<NoticeDetailModalProps> = ({ notice, onClose }) => {
  if (!notice) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 max-h-[92vh] flex flex-col overflow-hidden">
        {/* Top Controls Bar */}
        <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2 text-xs">
            <span className="font-semibold text-amber-400">Official Notice Document</span>
            <span className="text-slate-500">·</span>
            <span className="text-slate-300 font-mono">{notice.refNo}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition-colors flex items-center gap-1 text-xs"
              title="Print Document"
            >
              <Printer className="w-4 h-4" />
              <span className="hidden sm:inline">Print</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Official Academic Letterhead & Document Body */}
        <div className="p-6 sm:p-10 overflow-y-auto font-sans print:p-0">
          {/* Institutional Letterhead Banner */}
          <div className="text-center pb-6 border-b-2 border-slate-900 space-y-1.5">
            <div className="flex items-center justify-center gap-3">
              <InstitutionLogo size="sm" />
              <h2 className="font-crest text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
                {INSTITUTION_INFO.name}
              </h2>
            </div>
            <p className="text-sm font-semibold text-emerald-800 font-sans">
              {INSTITUTION_INFO.bengaliName}
            </p>
            <p className="text-xs text-slate-600">
              {INSTITUTION_INFO.fullAddress}
            </p>
            <div className="text-[11px] text-slate-500 font-mono flex items-center justify-center gap-3 pt-1">
              <span>EIIN: {INSTITUTION_INFO.eiin}</span>
              <span>·</span>
              <span>College Code: {INSTITUTION_INFO.collegeCode}</span>
              <span>·</span>
              <span>Dinajpur Board</span>
            </div>
          </div>

          {/* Reference & Date Metadata (Zero-pill compliant) */}
          <div className="flex flex-wrap items-center justify-between text-xs text-slate-600 py-4 border-b border-slate-200">
            <div>
              <span className="font-semibold text-slate-800">Ref:</span>{' '}
              <span className="font-mono text-slate-700">{notice.refNo}</span>
            </div>
            <div>
              <span className="font-semibold text-slate-800">Date:</span>{' '}
              <span>{notice.date}</span>
            </div>
            <div>
              <span className="font-semibold text-slate-800">Category:</span>{' '}
              <span className="text-blue-900 font-medium">{notice.category}</span>
            </div>
          </div>

          {/* Notice Title */}
          <div className="py-6">
            <h3 className="font-academic text-xl font-bold text-slate-900 leading-snug text-center">
              {notice.title}
            </h3>
          </div>

          {/* Notice Detailed Paragraphs */}
          <div className="space-y-4 text-sm text-slate-700 leading-relaxed">
            <p className="font-medium text-slate-800">
              {notice.description}
            </p>
            <div className="whitespace-pre-line text-slate-700 leading-relaxed">
              {notice.content}
            </div>
            <p className="text-xs text-slate-500 pt-2">
              Note: All concerned students, guardians, and faculty members are requested to take necessary note and comply accordingly. For further clarification, contact the administrative office.
            </p>
          </div>

          {/* Signature & Seal */}
          <div className="pt-12 mt-8 border-t border-slate-200 flex items-end justify-between">
            <div className="text-xs text-slate-500">
              <p>Published By: {notice.publishedBy}</p>
              <p>Laxmipur School and College</p>
            </div>

            <div className="text-right">
              <div className="font-academic italic text-base font-bold text-slate-900">
                Professor Md. Abdul Latif
              </div>
              <div className="text-xs text-slate-600">
                Principal & Head of Institution
              </div>
              <div className="text-[11px] text-slate-400">
                Laxmipur School and College, Gaibandha
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer Controls */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between shrink-0">
          <span className="text-xs text-slate-500">
            Official archival copy
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2 bg-slate-800 text-white rounded-lg text-xs font-semibold hover:bg-slate-900 cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
