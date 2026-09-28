import React from 'react';
import { INSTITUTION_INFO } from '../data/initialData';
import {
  Calendar,
  Users,
  GraduationCap,
  Layers,
  BookOpenCheck,
  Award
} from 'lucide-react';

export const QuickInfo: React.FC = () => {
  const stats = [
    {
      label: 'Established',
      value: INSTITUTION_INFO.stats.establishedYear.toString(),
      subtext: '40+ Years of Excellence',
      icon: Calendar,
      color: 'text-blue-900',
      bg: 'bg-blue-50',
    },
    {
      label: 'Enrolled Students',
      value: `${INSTITUTION_INFO.stats.totalStudents}+`,
      subtext: 'School & College Wings',
      icon: Users,
      color: 'text-emerald-800',
      bg: 'bg-emerald-50',
    },
    {
      label: 'Teachers & Staff',
      value: `${INSTITUTION_INFO.stats.totalTeachers}+`,
      subtext: 'Dedicated Educators',
      icon: GraduationCap,
      color: 'text-indigo-900',
      bg: 'bg-indigo-50',
    },
    {
      label: 'Academic Classes',
      value: INSTITUTION_INFO.stats.classesOffered,
      subtext: 'With Primary Wing',
      icon: Layers,
      color: 'text-amber-800',
      bg: 'bg-amber-50',
    },
    {
      label: 'Academic Streams',
      value: `${INSTITUTION_INFO.stats.academicStreams} Streams`,
      subtext: 'Science, Arts & Commerce',
      icon: BookOpenCheck,
      color: 'text-teal-800',
      bg: 'bg-teal-50',
    },
    {
      label: 'Board Pass Rate',
      value: INSTITUTION_INFO.stats.passRateSSC,
      subtext: 'Dinajpur Education Board',
      icon: Award,
      color: 'text-rose-900',
      bg: 'bg-rose-50',
    },
  ];

  return (
    <section className="relative -mt-8 z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
        {stats.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              className="bg-white rounded-xl p-4 sm:p-5 border border-slate-200 shadow-sm hover:shadow-md transition-shadow group flex flex-col justify-between"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  {item.label}
                </span>
                <div className={`p-2 rounded-lg ${item.bg} ${item.color} group-hover:scale-105 transition-transform`}>
                  <Icon className="w-4 h-4" />
                </div>
              </div>

              <div>
                <div className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 font-sans">
                  {item.value}
                </div>
                <div className="text-[11px] text-slate-500 mt-0.5 truncate font-medium">
                  {item.subtext}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
