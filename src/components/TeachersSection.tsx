import React, { useState } from 'react';
import { Teacher } from '../types';
import { Mail, Phone, BookOpen, GraduationCap, ArrowRight, UserCheck } from 'lucide-react';

interface TeachersSectionProps {
  teachers: Teacher[];
}

export const TeachersSection: React.FC<TeachersSectionProps> = ({ teachers }) => {
  const [selectedDept, setSelectedDept] = useState<string>('All');
  const [showAll, setShowAll] = useState<boolean>(false);

  const departments = [
    'All',
    'Administration',
    'Science',
    'Mathematics',
    'English',
    'Bangla',
    'ICT',
    'Commerce',
    'Social Science'
  ];

  const filteredTeachers = teachers.filter((t) => {
    if (selectedDept === 'All') return true;
    return t.department === selectedDept;
  });

  const displayedTeachers = showAll ? filteredTeachers : filteredTeachers.slice(0, 4);

  return (
    <section id="teachers" className="py-16 lg:py-24 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="text-xs uppercase tracking-widest font-semibold text-emerald-800 mb-2">
            Academic Mentorship & Guidance
          </div>
          <h2 className="font-crest text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight">
            Our Distinguished Faculty
          </h2>
          <div className="w-16 h-1 bg-amber-500 mx-auto mt-4 rounded-full"></div>
          <p className="mt-4 text-sm sm:text-base text-slate-600 font-sans">
            A committed community of scholars, researchers, and pedagogical experts passionate about fostering student curiosity and character.
          </p>
        </div>

        {/* Department Filter Bar */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-4 mb-8 justify-start sm:justify-center border-b border-slate-100">
          {departments.map((dept) => (
            <button
              key={dept}
              onClick={() => setSelectedDept(dept)}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                selectedDept === dept
                  ? 'bg-blue-950 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:text-slate-900 hover:bg-slate-200/70'
              }`}
            >
              {dept === 'All' ? 'All Departments' : dept}
            </button>
          ))}
        </div>

        {/* Teachers Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayedTeachers.map((teacher) => (
            <div
              key={teacher.id}
              className="bg-white rounded-2xl border border-slate-200 shadow-xs hover:shadow-md transition-all flex flex-col justify-between overflow-hidden group hover:border-blue-900/30"
            >
              <div>
                {/* Photo with subtle aspect ratio and department kicker */}
                <div className="relative h-60 overflow-hidden bg-slate-100">
                  <img
                    src={teacher.image}
                    alt={teacher.name}
                    className="w-full h-full object-cover object-top filter contrast-105 group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute bottom-2 left-2 right-2 bg-slate-900/80 backdrop-blur-xs text-white px-2.5 py-1 rounded text-[11px] font-medium flex items-center justify-between">
                    <span>{teacher.department}</span>
                    <span className="text-amber-400 font-mono text-[10px]">Since {teacher.joiningYear}</span>
                  </div>
                </div>

                <div className="p-5">
                  <h3 className="font-academic text-base font-bold text-slate-900 group-hover:text-blue-950 transition-colors">
                    {teacher.name}
                  </h3>

                  <p className="text-xs font-semibold text-emerald-800 mt-0.5">
                    {teacher.designation}
                  </p>

                  <p className="text-xs font-medium text-slate-600 mt-1 flex items-center gap-1">
                    <BookOpen className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>{teacher.subject}</span>
                  </p>

                  <p className="text-[11px] text-slate-500 mt-2 font-sans line-clamp-1 border-t border-slate-100 pt-2">
                    🎓 {teacher.qualification}
                  </p>

                  <p className="text-xs text-slate-600 mt-2.5 line-clamp-2 leading-relaxed font-sans">
                    {teacher.bio}
                  </p>
                </div>
              </div>

              {/* Card Footer with quick contact info */}
              <div className="p-5 pt-0 border-t border-slate-100 mt-2 text-[11px] text-slate-500 space-y-1">
                <a
                  href={`mailto:${teacher.email}`}
                  className="hover:text-blue-900 flex items-center gap-1.5 truncate pt-2"
                >
                  <Mail className="w-3 h-3 text-slate-400 shrink-0" />
                  <span className="truncate">{teacher.email}</span>
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* View All Teachers Toggle */}
        {filteredTeachers.length > 4 && (
          <div className="mt-10 text-center">
            <button
              onClick={() => setShowAll(!showAll)}
              className="px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold transition-colors inline-flex items-center gap-2 cursor-pointer shadow-xs"
            >
              <span>{showAll ? 'Show Fewer Teachers' : `View All Teachers (${filteredTeachers.length})`}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
