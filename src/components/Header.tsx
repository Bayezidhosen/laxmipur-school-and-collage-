import React, { useState, useEffect } from 'react';
import { InstitutionLogo } from './InstitutionLogo';
import { INSTITUTION_INFO } from '../data/initialData';
import { User } from '../types';
import {
  Menu,
  X,
  UserCheck,
  Shield,
  Phone,
  Mail,
  GraduationCap,
  LogOut,
  MapPin,
  Clock,
  Sparkles
} from 'lucide-react';

interface HeaderProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  currentUser: User | null;
  onOpenLogin: (role: 'student' | 'admin') => void;
  onLogout: () => void;
  currentView: 'home' | 'student-dashboard' | 'admin-dashboard';
  onChangeView: (view: 'home' | 'student-dashboard' | 'admin-dashboard') => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeSection,
  onNavigate,
  currentUser,
  onOpenLogin,
  onLogout,
  currentView,
  onChangeView,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'academic', label: 'Academic' },
    { id: 'notice', label: 'Notice' },
    { id: 'admission', label: 'Admission' },
    { id: 'teachers', label: 'Teachers' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleLinkClick = (id: string) => {
    setMobileMenuOpen(false);
    if (currentView !== 'home') {
      onChangeView('home');
      setTimeout(() => {
        onNavigate(id);
      }, 50);
    } else {
      onNavigate(id);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full transition-all duration-300">
      {/* Top Academic Sub-bar with EIIN, Contacts, and Affiliation */}
      <div className="bg-slate-900 text-slate-300 text-xs py-1.5 px-4 sm:px-6 lg:px-8 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          {/* Left: EIIN & Accreditation */}
          <div className="flex items-center gap-3 sm:gap-4 flex-wrap">
            <span className="font-medium text-amber-400 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              EIIN: {INSTITUTION_INFO.eiin}
            </span>
            <span className="text-slate-600 hidden sm:inline">|</span>
            <span className="hidden md:inline text-slate-400">
              College Code: {INSTITUTION_INFO.collegeCode} · School Code: {INSTITUTION_INFO.schoolCode}
            </span>
            <span className="text-slate-600 hidden lg:inline">|</span>
            <span className="hidden lg:inline text-slate-400">
              Affiliated with Dinajpur Education Board
            </span>
          </div>

          {/* Right: Phone, Email, Office Hours */}
          <div className="flex items-center gap-4 text-slate-400 ml-auto sm:ml-0">
            <a
              href={`tel:${INSTITUTION_INFO.phone}`}
              className="hover:text-white transition-colors flex items-center gap-1 text-[11px] sm:text-xs"
            >
              <Phone className="w-3 h-3 text-emerald-400" />
              <span>{INSTITUTION_INFO.phone}</span>
            </a>
            <span className="text-slate-600 hidden sm:inline">|</span>
            <a
              href={`mailto:${INSTITUTION_INFO.email}`}
              className="hover:text-white transition-colors hidden sm:flex items-center gap-1 text-xs"
            >
              <Mail className="w-3 h-3 text-emerald-400" />
              <span>{INSTITUTION_INFO.email}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav
        className={`w-full bg-white/95 backdrop-blur-md transition-shadow duration-300 ${
          scrolled ? 'shadow-md border-b border-slate-200/80' : 'border-b border-slate-100'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Left: Institution Logo and Name */}
            <div
              onClick={() => handleLinkClick('home')}
              className="flex items-center gap-3 cursor-pointer group py-1"
            >
              <InstitutionLogo size="md" />
              <div className="flex flex-col">
                <span className="font-crest text-lg sm:text-xl font-bold tracking-tight text-slate-900 group-hover:text-blue-900 transition-colors">
                  Laxmipur School and College
                </span>
                <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
                  <span className="text-emerald-700 font-semibold">{INSTITUTION_INFO.bengaliName}</span>
                  <span>·</span>
                  <span className="flex items-center gap-0.5">
                    <MapPin className="w-3 h-3 text-slate-400" />
                    Gaibandha
                  </span>
                  <span>·</span>
                  <span>Estd. {INSTITUTION_INFO.established}</span>
                </div>
              </div>
            </div>

            {/* Desktop Navigation Links */}
            <div className="hidden xl:flex items-center space-x-1 lg:space-x-2">
              {navLinks.map((link) => {
                const isActive = currentView === 'home' && activeSection === link.id;
                return (
                  <button
                    key={link.id}
                    onClick={() => handleLinkClick(link.id)}
                    className={`relative px-3 py-2 text-sm font-medium transition-colors ${
                      isActive
                        ? 'text-blue-950 font-semibold'
                        : 'text-slate-600 hover:text-blue-950 hover:bg-slate-50 rounded-md'
                    }`}
                  >
                    {link.label}
                    {isActive && (
                      <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-blue-900 rounded-full" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Right Side: Auth Action Buttons */}
            <div className="hidden md:flex items-center gap-2.5">
              {currentUser ? (
                <div className="flex items-center gap-2">
                  {currentUser.role === 'admin' ? (
                    <button
                      onClick={() => onChangeView(currentView === 'admin-dashboard' ? 'home' : 'admin-dashboard')}
                      className={`flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-lg transition-colors border ${
                        currentView === 'admin-dashboard'
                          ? 'bg-slate-900 text-white border-slate-900'
                          : 'bg-slate-50 text-slate-800 border-slate-300 hover:bg-slate-100'
                      }`}
                    >
                      <Shield className="w-3.5 h-3.5 text-amber-500" />
                      <span>{currentView === 'admin-dashboard' ? 'View Website' : 'Admin Panel'}</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => onChangeView(currentView === 'student-dashboard' ? 'home' : 'student-dashboard')}
                      className={`flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-lg transition-colors border ${
                        currentView === 'student-dashboard'
                          ? 'bg-blue-900 text-white border-blue-900'
                          : 'bg-blue-50 text-blue-900 border-blue-200 hover:bg-blue-100'
                      }`}
                    >
                      <GraduationCap className="w-3.5 h-3.5 text-blue-600" />
                      <span>{currentView === 'student-dashboard' ? 'View Website' : 'Student Portal'}</span>
                    </button>
                  )}

                  <button
                    onClick={onLogout}
                    title="Sign Out"
                    className="p-2 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onOpenLogin('student')}
                    className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-700 hover:text-blue-900 bg-slate-100 hover:bg-slate-200/80 rounded-lg transition-colors"
                  >
                    <GraduationCap className="w-3.5 h-3.5 text-blue-700" />
                    <span>Student Login</span>
                  </button>
                  <button
                    onClick={() => onOpenLogin('admin')}
                    className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-blue-950 rounded-lg shadow-sm transition-colors"
                  >
                    <Shield className="w-3.5 h-3.5 text-amber-400" />
                    <span>Admin Login</span>
                  </button>
                </div>
              )}
            </div>

            {/* Mobile Hamburger Button */}
            <div className="flex items-center gap-2 xl:hidden">
              {currentUser && (
                <button
                  onClick={() => onChangeView(currentUser.role === 'admin' ? 'admin-dashboard' : 'student-dashboard')}
                  className="px-2.5 py-1.5 text-xs font-medium bg-blue-50 text-blue-900 rounded border border-blue-200"
                >
                  Dashboard
                </button>
              )}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-lg text-slate-700 hover:text-slate-900 hover:bg-slate-100 transition-colors"
                aria-label="Toggle Navigation Menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer / Dropdown */}
        {mobileMenuOpen && (
          <div className="xl:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-6 space-y-3 shadow-xl animate-in slide-in-from-top duration-200">
            <div className="grid grid-cols-2 gap-1 pt-1 pb-2 border-b border-slate-100">
              {navLinks.map((link) => {
                const isActive = currentView === 'home' && activeSection === link.id;
                return (
                  <button
                    key={link.id}
                    onClick={() => handleLinkClick(link.id)}
                    className={`px-3 py-2 text-sm font-medium text-left rounded-md transition-colors ${
                      isActive
                        ? 'bg-blue-50 text-blue-900 font-semibold'
                        : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    {link.label}
                  </button>
                );
              })}
            </div>

            {/* Mobile Auth Controls */}
            <div className="pt-2">
              {currentUser ? (
                <div className="space-y-2">
                  <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 flex items-center justify-between">
                    <div>
                      <p className="text-xs font-semibold text-slate-900">{currentUser.name}</p>
                      <p className="text-[11px] text-slate-500 capitalize">{currentUser.role} Account</p>
                    </div>
                    <button
                      onClick={onLogout}
                      className="text-xs text-red-600 font-medium hover:underline flex items-center gap-1"
                    >
                      <LogOut className="w-3 h-3" />
                      Sign Out
                    </button>
                  </div>
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onChangeView(currentUser.role === 'admin' ? 'admin-dashboard' : 'student-dashboard');
                    }}
                    className="w-full py-2.5 px-4 text-center text-sm font-semibold rounded-lg bg-blue-900 text-white"
                  >
                    Go to {currentUser.role === 'admin' ? 'Admin Dashboard' : 'Student Portal'}
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onOpenLogin('student');
                    }}
                    className="py-2.5 px-3 text-center text-xs font-semibold rounded-lg bg-slate-100 text-slate-800 hover:bg-slate-200"
                  >
                    Student Login
                  </button>
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onOpenLogin('admin');
                    }}
                    className="py-2.5 px-3 text-center text-xs font-semibold rounded-lg bg-slate-900 text-white hover:bg-slate-800"
                  >
                    Admin Login
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};
