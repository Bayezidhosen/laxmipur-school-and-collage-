import React, { useState, useEffect } from 'react';
import { User, Notice, NewsItem, Teacher, GalleryItem, AdmissionApplication, ContactMessage } from './types';
import {
  getCurrentUser,
  subscribeAuth,
  logoutUser
} from './lib/auth';
import {
  getNotices,
  getNews,
  getTeachers,
  getGallery,
  getAdmissions,
  getMessages,
  subscribeStorage
} from './lib/storage';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { QuickInfo } from './components/QuickInfo';
import { AboutSection } from './components/AboutSection';
import { PrincipalSection } from './components/PrincipalSection';
import { AcademicSection } from './components/AcademicSection';
import { NoticeBoard } from './components/NoticeBoard';
import { LatestNews } from './components/LatestNews';
import { TeachersSection } from './components/TeachersSection';
import { AdmissionSection } from './components/AdmissionSection';
import { GallerySection } from './components/GallerySection';
import { StudentPortal } from './components/StudentPortal';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { LoginModal } from './components/auth/LoginModal';
import { StudentDashboard } from './components/student/StudentDashboard';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { NoticeDetailModal } from './components/modals/NoticeDetailModal';

export default function App() {
  // Authentication & View State
  const [currentUser, setCurrentUser] = useState<User | null>(getCurrentUser());
  const [currentView, setCurrentView] = useState<'home' | 'student-dashboard' | 'admin-dashboard'>('home');
  const [activeSection, setActiveSection] = useState<string>('home');

  // Login Modal State
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [loginModalRole, setLoginModalRole] = useState<'student' | 'admin'>('student');

  // Notice Detail Modal State
  const [selectedNotice, setSelectedNotice] = useState<Notice | null>(null);

  // Reactive Data Collections
  const [notices, setNotices] = useState<Notice[]>(getNotices());
  const [news, setNews] = useState<NewsItem[]>(getNews());
  const [teachers, setTeachers] = useState<Teacher[]>(getTeachers());
  const [gallery, setGallery] = useState<GalleryItem[]>(getGallery());
  const [admissions, setAdmissions] = useState<AdmissionApplication[]>(getAdmissions());
  const [messages, setMessages] = useState<ContactMessage[]>(getMessages());

  // Listen to Storage Updates
  useEffect(() => {
    const unsubStorage = subscribeStorage(() => {
      setNotices(getNotices());
      setNews(getNews());
      setTeachers(getTeachers());
      setGallery(getGallery());
      setAdmissions(getAdmissions());
      setMessages(getMessages());
    });
    return () => unsubStorage();
  }, []);

  // Listen to Auth State Updates
  useEffect(() => {
    const unsubAuth = subscribeAuth((user) => {
      setCurrentUser(user);
    });
    return () => unsubAuth();
  }, []);

  // Section Observer for Active Navigation Highlighting
  useEffect(() => {
    if (currentView !== 'home') return;

    const sections = ['home', 'about', 'academic', 'notice', 'admission', 'teachers', 'gallery', 'contact'];
    const handleScroll = () => {
      const scrollPos = window.scrollY + 140;
      for (const sectionId of [...sections].reverse()) {
        const el = document.getElementById(sectionId);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(sectionId);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentView]);

  // Navigation Handler
  const handleNavigate = (sectionId: string) => {
    if (currentView !== 'home') {
      setCurrentView('home');
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        } else if (sectionId === 'home') {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }, 50);
    } else {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      } else if (sectionId === 'home') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  const handleOpenLogin = (role: 'student' | 'admin') => {
    setLoginModalRole(role);
    setLoginModalOpen(true);
  };

  const handleLogout = () => {
    logoutUser();
    setCurrentView('home');
  };

  const handleLoginSuccess = (user: User) => {
    setCurrentUser(user);
    if (user.role === 'admin') {
      setCurrentView('admin-dashboard');
    } else {
      setCurrentView('student-dashboard');
    }
  };

  // Safe Guard for Protected Views
  const handleViewChange = (view: 'home' | 'student-dashboard' | 'admin-dashboard') => {
    if (view === 'admin-dashboard') {
      if (!currentUser || currentUser.role !== 'admin') {
        handleOpenLogin('admin');
        return;
      }
    }
    if (view === 'student-dashboard') {
      if (!currentUser) {
        handleOpenLogin('student');
        return;
      }
    }
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans selection:bg-blue-900 selection:text-white">
      {/* Dynamic View Display */}
      {currentView === 'student-dashboard' && currentUser ? (
        <StudentDashboard
          currentUser={currentUser}
          onLogout={handleLogout}
          onBackToHome={() => setCurrentView('home')}
          notices={notices}
          onSelectNotice={(n) => setSelectedNotice(n)}
        />
      ) : currentView === 'admin-dashboard' && currentUser && currentUser.role === 'admin' ? (
        <AdminDashboard
          currentUser={currentUser}
          onLogout={handleLogout}
          onBackToHome={() => setCurrentView('home')}
          notices={notices}
          news={news}
          teachers={teachers}
          gallery={gallery}
          admissions={admissions}
          messages={messages}
        />
      ) : (
        /* Public Institutional Website View */
        <>
          <Header
            activeSection={activeSection}
            onNavigate={handleNavigate}
            currentUser={currentUser}
            onOpenLogin={handleOpenLogin}
            onLogout={handleLogout}
            currentView={currentView}
            onChangeView={handleViewChange}
          />

          <main className="flex-1">
            <div id="home">
              <Hero
                onExplore={() => handleNavigate('about')}
                onAdmissionInfo={() => handleNavigate('admission')}
                latestNotice={notices[0]}
                onSelectNotice={(n) => setSelectedNotice(n)}
              />
              <QuickInfo />
            </div>

            <AboutSection />

            <PrincipalSection />

            <AcademicSection />

            <NoticeBoard
              notices={notices}
              onSelectNotice={(n) => setSelectedNotice(n)}
            />

            <LatestNews news={news} />

            <TeachersSection teachers={teachers} />

            <AdmissionSection />

            <GallerySection galleryItems={gallery} />

            <StudentPortal
              currentUser={currentUser}
              onOpenLogin={handleOpenLogin}
              onGoToDashboard={() => setCurrentView('student-dashboard')}
            />

            <ContactSection />
          </main>

          <Footer
            onNavigate={handleNavigate}
            onOpenAdminLogin={() => handleOpenLogin('admin')}
            onOpenStudentLogin={() => handleOpenLogin('student')}
          />
        </>
      )}

      {/* Login Authentication Modal */}
      <LoginModal
        isOpen={loginModalOpen}
        initialRole={loginModalRole}
        onClose={() => setLoginModalOpen(false)}
        onSuccess={handleLoginSuccess}
      />

      {/* Official Notice Detail Letterhead Modal */}
      <NoticeDetailModal
        notice={selectedNotice}
        onClose={() => setSelectedNotice(null)}
      />
    </div>
  );
}
