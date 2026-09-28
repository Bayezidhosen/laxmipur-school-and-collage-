import React from 'react';
import { INSTITUTION_INFO } from '../data/initialData';
import { InstitutionLogo } from './InstitutionLogo';
import {
  MapPin,
  Phone,
  Mail,
  ExternalLink,
  ChevronRight,
  Shield,
  Heart,
  Facebook,
  Youtube,
  Globe
} from 'lucide-react';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
  onOpenAdminLogin: () => void;
  onOpenStudentLogin: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigate,
  onOpenAdminLogin,
  onOpenStudentLogin,
}) => {
  return (
    <footer className="bg-slate-950 text-slate-300 font-sans border-t border-slate-800">
      {/* Main Footer Navigation & Details */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
          {/* Col 1: Identity & Motto */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <InstitutionLogo size="md" />
              <div>
                <span className="font-crest text-lg font-bold text-white block">
                  {INSTITUTION_INFO.name}
                </span>
                <span className="text-xs text-emerald-400 font-semibold">
                  {INSTITUTION_INFO.bengaliName}
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed font-academic italic">
              "{INSTITUTION_INFO.slogan}"
            </p>

            <p className="text-xs text-slate-400 leading-relaxed">
              A distinguished institution in Gaibandha committed to intellectual rigor, moral values, scientific empowerment, and patriotic character development since 1984.
            </p>

            <div className="text-[11px] text-slate-500 font-mono space-y-0.5 border-t border-slate-900 pt-3">
              <div>EIIN: {INSTITUTION_INFO.eiin} · BISE Dinajpur</div>
              <div>College Code: {INSTITUTION_INFO.collegeCode} · School Code: {INSTITUTION_INFO.schoolCode}</div>
            </div>

            {/* Social Media Links */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook Page"
                className="w-8 h-8 rounded-lg bg-slate-900 hover:bg-blue-600 hover:text-white text-slate-400 flex items-center justify-center transition-colors border border-slate-800"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                aria-label="YouTube Channel"
                className="w-8 h-8 rounded-lg bg-slate-900 hover:bg-red-600 hover:text-white text-slate-400 flex items-center justify-center transition-colors border border-slate-800"
              >
                <Youtube className="w-4 h-4" />
              </a>
              <a
                href="https://moedu.gov.bd"
                target="_blank"
                rel="noreferrer"
                aria-label="Ministry of Education"
                className="w-8 h-8 rounded-lg bg-slate-900 hover:bg-emerald-600 hover:text-white text-slate-400 flex items-center justify-center transition-colors border border-slate-800"
              >
                <Globe className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider border-b border-slate-800 pb-2">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs">
              {['home', 'about', 'academic', 'notice', 'admission', 'teachers', 'gallery', 'contact'].map((id) => (
                <li key={id}>
                  <button
                    onClick={() => onNavigate(id)}
                    className="hover:text-amber-400 transition-colors flex items-center gap-1.5 capitalize text-slate-400 hover:translate-x-1 transition-transform"
                  >
                    <ChevronRight className="w-3 h-3 text-slate-600" />
                    <span>{id}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Academic & Portals */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider border-b border-slate-800 pb-2">
              Academic & Portals
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button
                  onClick={onOpenStudentLogin}
                  className="hover:text-amber-400 transition-colors flex items-center gap-1.5"
                >
                  <ChevronRight className="w-3 h-3 text-slate-600" />
                  <span>Student Portal Login</span>
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenAdminLogin}
                  className="hover:text-amber-400 transition-colors flex items-center gap-1.5"
                >
                  <ChevronRight className="w-3 h-3 text-slate-600" />
                  <span>Administration Dashboard</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('academic')}
                  className="hover:text-amber-400 transition-colors flex items-center gap-1.5"
                >
                  <ChevronRight className="w-3 h-3 text-slate-600" />
                  <span>NCTB Curriculum Streams</span>
                </button>
              </li>
              <li>
                <a
                  href="https://dinajpureducationboard.gov.bd"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-amber-400 transition-colors flex items-center gap-1.5"
                >
                  <ExternalLink className="w-3 h-3 text-slate-600" />
                  <span>BISE Dinajpur Official</span>
                </a>
              </li>
              <li>
                <a
                  href="https://moedu.gov.bd"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-amber-400 transition-colors flex items-center gap-1.5"
                >
                  <ExternalLink className="w-3 h-3 text-slate-600" />
                  <span>Ministry of Education Bangladesh</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact & Hours */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider border-b border-slate-800 pb-2">
              Institution Contact
            </h4>
            <div className="space-y-2.5 text-xs text-slate-400">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>{INSTITUTION_INFO.fullAddress}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="font-mono">{INSTITUTION_INFO.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{INSTITUTION_INFO.email}</span>
              </div>
              <div className="text-[11px] text-slate-500 pt-2 border-t border-slate-900">
                {INSTITUTION_INFO.officeHours}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Sub-bar */}
      <div className="border-t border-slate-900 py-6 px-4 sm:px-6 lg:px-8 bg-black/40 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>© 2026 Laxmipur School and College. All rights reserved.</p>
          <p className="flex items-center gap-1">
            <span>Designed & Developed with</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
            <span>for academic excellence</span>
          </p>
        </div>
      </div>
    </footer>
  );
};
