import React, { useState } from 'react';
import { Notice } from '../types';
import {
  Bell,
  Calendar,
  FileText,
  Search,
  ArrowRight,
  Filter,
  CheckCircle,
  ExternalLink
} from 'lucide-react';

interface NoticeBoardProps {
  notices: Notice[];
  onSelectNotice: (notice: Notice) => void;
}

export const NoticeBoard: React.FC<NoticeBoardProps> = ({ notices, onSelectNotice }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showAll, setShowAll] = useState<boolean>(false);

  const categories = ['All', 'Academic', 'Exam', 'Admission', 'Holiday'];

  const filteredNotices = notices.filter((notice) => {
    const matchesCategory = selectedCategory === 'All' || notice.category === selectedCategory;
    const matchesSearch =
      notice.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      notice.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      notice.refNo.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const displayedNotices = showAll ? filteredNotices : filteredNotices.slice(0, 5);

  return (
    <section id="notice" className="py-16 lg:py-24 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="text-xs uppercase tracking-widest font-semibold text-emerald-800 mb-2">
              Official Institutional Announcements
            </div>
            <h2 className="font-crest text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight">
              Notice Board
            </h2>
            <p className="mt-2 text-sm text-slate-600 font-sans max-w-xl">
              Stay informed with verified academic notices, examination schedules, admission guidelines, and administrative updates.
            </p>
          </div>

          {/* Quick Search */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search notices, ref no..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-sans focus:outline-none focus:ring-2 focus:ring-blue-900/30 focus:border-blue-900 transition-all"
            />
          </div>
        </div>

        {/* Interactive Category Filter Buttons (Functional controls per constitution) */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-4 mb-6 border-b border-slate-100">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:text-slate-900 hover:bg-slate-200/80'
              }`}
            >
              {cat === 'All' ? 'All Notices' : cat}
            </button>
          ))}
          <span className="text-xs text-slate-400 ml-auto hidden sm:inline">
            Showing {displayedNotices.length} of {filteredNotices.length} notices
          </span>
        </div>

        {/* Notices List */}
        {displayedNotices.length === 0 ? (
          <div className="text-center py-12 bg-slate-50 rounded-2xl border border-slate-200">
            <Bell className="w-8 h-8 text-slate-400 mx-auto mb-2 opacity-50" />
            <p className="text-sm font-semibold text-slate-700">No notices found</p>
            <p className="text-xs text-slate-500 mt-1">Try changing category filter or clear your search.</p>
          </div>
        ) : (
          <div className="divide-y divide-slate-100 border border-slate-200 rounded-2xl bg-white shadow-xs overflow-hidden">
            {displayedNotices.map((notice) => (
              <div
                key={notice.id}
                className="p-5 sm:p-6 hover:bg-slate-50/80 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4 group"
              >
                <div className="space-y-1.5 max-w-3xl">
                  {/* Clean unboxed text metadata (Zero-pill compliant) */}
                  <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
                    <span className="text-blue-900 font-semibold">{notice.category}</span>
                    <span aria-hidden="true">·</span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-slate-400" />
                      {notice.date}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span className="font-mono text-slate-400 text-[11px]">{notice.refNo}</span>
                    {notice.isImportant && (
                      <>
                        <span aria-hidden="true">·</span>
                        <span className="text-amber-600 font-semibold flex items-center gap-1">
                          Important
                        </span>
                      </>
                    )}
                  </div>

                  {/* Title */}
                  <h3
                    onClick={() => onSelectNotice(notice)}
                    className="font-academic text-base sm:text-lg font-bold text-slate-900 group-hover:text-blue-950 transition-colors cursor-pointer"
                  >
                    {notice.title}
                  </h3>

                  {/* Short description */}
                  <p className="text-xs sm:text-sm text-slate-600 line-clamp-2 leading-relaxed">
                    {notice.description}
                  </p>
                </div>

                {/* Right Action */}
                <div className="shrink-0 flex items-center gap-2">
                  <button
                    onClick={() => onSelectNotice(notice)}
                    className="px-4 py-2 bg-slate-100 hover:bg-blue-950 text-slate-700 hover:text-white rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
                  >
                    <span>View Details</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* View All / Collapse Button */}
        {filteredNotices.length > 5 && (
          <div className="mt-8 text-center">
            <button
              onClick={() => setShowAll(!showAll)}
              className="px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold transition-colors inline-flex items-center gap-2 cursor-pointer shadow-xs"
            >
              <span>{showAll ? 'Show Fewer Notices' : `View All Notices (${filteredNotices.length})`}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
