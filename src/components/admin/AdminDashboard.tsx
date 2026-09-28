import React, { useState } from 'react';
import {
  Notice,
  NewsItem,
  Teacher,
  GalleryItem,
  AdmissionApplication,
  ContactMessage,
  User
} from '../../types';
import {
  addNotice,
  updateNotice,
  deleteNotice,
  addNews,
  deleteNews,
  addTeacher,
  deleteTeacher,
  addGalleryItem,
  deleteGalleryItem,
  updateAdmissionStatus,
  markMessageStatus,
  resetDatabaseToDefault
} from '../../lib/storage';
import { INSTITUTION_INFO } from '../../data/initialData';
import {
  Shield,
  Bell,
  Newspaper,
  Users,
  Image as ImageIcon,
  UserCheck,
  MessageSquare,
  Settings,
  Plus,
  Trash2,
  Edit2,
  Check,
  X,
  ArrowLeft,
  LogOut,
  ExternalLink,
  CheckCircle,
  AlertTriangle,
  RotateCcw
} from 'lucide-react';

interface AdminDashboardProps {
  currentUser: User;
  onLogout: () => void;
  onBackToHome: () => void;
  notices: Notice[];
  news: NewsItem[];
  teachers: Teacher[];
  gallery: GalleryItem[];
  admissions: AdmissionApplication[];
  messages: ContactMessage[];
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  currentUser,
  onLogout,
  onBackToHome,
  notices,
  news,
  teachers,
  gallery,
  admissions,
  messages,
}) => {
  const [activeSection, setActiveSection] = useState<
    'overview' | 'notices' | 'news' | 'teachers' | 'gallery' | 'admissions' | 'messages' | 'settings'
  >('overview');

  // Modals for adding items
  const [showAddNotice, setShowAddNotice] = useState(false);
  const [newNotice, setNewNotice] = useState({
    title: '',
    category: 'Academic' as Notice['category'],
    refNo: `LSC/ACD/2026/${Math.floor(100 + Math.random() * 900)}`,
    description: '',
    content: '',
    publishedBy: 'Principal Office',
    isImportant: false,
  });

  const [showAddNews, setShowAddNews] = useState(false);
  const [newNewsItem, setNewNewsItem] = useState({
    title: '',
    category: 'Campus Event',
    summary: '',
    content: '',
    image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80',
    author: 'Editorial Desk',
  });

  const [showAddTeacher, setShowAddTeacher] = useState(false);
  const [newTeacher, setNewTeacher] = useState({
    name: '',
    designation: 'Lecturer',
    department: 'Science' as Teacher['department'],
    subject: '',
    qualification: 'M.Sc, B.Ed',
    email: '',
    phone: '+880 17XXXXXXXX',
    joiningYear: '2026',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
    bio: 'Dedicated faculty member supporting academic excellence.',
  });

  const [showAddPhoto, setShowAddPhoto] = useState(false);
  const [newPhoto, setNewPhoto] = useState({
    title: '',
    category: 'Campus' as GalleryItem['category'],
    imageUrl: 'https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?auto=format&fit=crop&w=900&q=80',
    description: '',
    date: '2026',
  });

  // Notice Submit
  const handleCreateNotice = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNotice.title || !newNotice.description) return;
    addNotice(newNotice);
    setShowAddNotice(false);
    setNewNotice({
      title: '',
      category: 'Academic',
      refNo: `LSC/ACD/2026/${Math.floor(100 + Math.random() * 900)}`,
      description: '',
      content: '',
      publishedBy: 'Principal Office',
      isImportant: false,
    });
  };

  // News Submit
  const handleCreateNews = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNewsItem.title || !newNewsItem.summary) return;
    addNews(newNewsItem);
    setShowAddNews(false);
    setNewNewsItem({
      title: '',
      category: 'Campus Event',
      summary: '',
      content: '',
      image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80',
      author: 'Editorial Desk',
    });
  };

  // Teacher Submit
  const handleCreateTeacher = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTeacher.name || !newTeacher.subject) return;
    addTeacher(newTeacher);
    setShowAddTeacher(false);
    setNewTeacher({
      name: '',
      designation: 'Lecturer',
      department: 'Science',
      subject: '',
      qualification: 'M.Sc, B.Ed',
      email: '',
      phone: '+880 17XXXXXXXX',
      joiningYear: '2026',
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
      bio: 'Dedicated faculty member supporting academic excellence.',
    });
  };

  // Photo Submit
  const handleCreatePhoto = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPhoto.title || !newPhoto.imageUrl) return;
    addGalleryItem(newPhoto);
    setShowAddPhoto(false);
    setNewPhoto({
      title: '',
      category: 'Campus',
      imageUrl: 'https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?auto=format&fit=crop&w=900&q=80',
      description: '',
      date: '2026',
    });
  };

  return (
    <div className="min-h-screen bg-slate-100 font-sans pb-16">
      {/* Top Navbar */}
      <div className="bg-slate-900 text-white border-b border-slate-800 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={onBackToHome}
              className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors flex items-center gap-1.5 text-xs font-semibold"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Public Website</span>
            </button>
            <div className="h-4 w-px bg-slate-700 hidden sm:block"></div>
            <div className="hidden sm:block">
              <span className="text-xs uppercase tracking-wider text-amber-400 font-semibold block">
                Administrative Control Panel
              </span>
              <h1 className="text-sm font-bold text-white font-crest">
                Laxmipur School and College, Gaibandha
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <p className="text-xs font-bold text-white">{currentUser.name}</p>
              <p className="text-[11px] text-amber-400 font-mono">Super Admin Session</p>
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        {/* Navigation Sidebar / Horizontal Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-6 border-b border-slate-200">
          {[
            { id: 'overview', label: 'Overview', icon: Shield },
            { id: 'notices', label: `Notices (${notices.length})`, icon: Bell },
            { id: 'news', label: `News (${news.length})`, icon: Newspaper },
            { id: 'teachers', label: `Teachers (${teachers.length})`, icon: Users },
            { id: 'gallery', label: `Gallery (${gallery.length})`, icon: ImageIcon },
            { id: 'admissions', label: `Admissions (${admissions.length})`, icon: UserCheck },
            { id: 'messages', label: `Messages (${messages.length})`, icon: MessageSquare },
            { id: 'settings', label: 'Data & Settings', icon: Settings },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeSection === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveSection(tab.id as any)}
                className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap flex items-center gap-2 cursor-pointer ${
                  isActive
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-200/70 border border-slate-200'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* SECTION 1: OVERVIEW */}
        {activeSection === 'overview' && (
          <div className="space-y-6">
            {/* Stat Counters */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
                <span className="text-[11px] font-semibold text-slate-500 uppercase">Active Notices</span>
                <div className="text-2xl font-black text-slate-900 font-mono mt-1">{notices.length}</div>
              </div>
              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
                <span className="text-[11px] font-semibold text-slate-500 uppercase">News Items</span>
                <div className="text-2xl font-black text-slate-900 font-mono mt-1">{news.length}</div>
              </div>
              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
                <span className="text-[11px] font-semibold text-slate-500 uppercase">Faculty Count</span>
                <div className="text-2xl font-black text-slate-900 font-mono mt-1">{teachers.length}</div>
              </div>
              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
                <span className="text-[11px] font-semibold text-slate-500 uppercase">Gallery Photos</span>
                <div className="text-2xl font-black text-slate-900 font-mono mt-1">{gallery.length}</div>
              </div>
              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
                <span className="text-[11px] font-semibold text-slate-500 uppercase">Pending Applications</span>
                <div className="text-2xl font-black text-blue-900 font-mono mt-1">
                  {admissions.filter((a) => a.status === 'Pending').length}
                </div>
              </div>
              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
                <span className="text-[11px] font-semibold text-slate-500 uppercase">Unread Inquiries</span>
                <div className="text-2xl font-black text-amber-600 font-mono mt-1">
                  {messages.filter((m) => m.status === 'Unread').length}
                </div>
              </div>
            </div>

            {/* Quick Actions Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Recent Admissions */}
              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
                <div className="flex items-center justify-between mb-4 border-b border-slate-100 pb-3">
                  <h3 className="font-bold text-sm text-slate-900">Recent Admission Submissions</h3>
                  <button
                    onClick={() => setActiveSection('admissions')}
                    className="text-xs text-blue-900 font-semibold hover:underline"
                  >
                    View All
                  </button>
                </div>
                <div className="space-y-3">
                  {admissions.slice(0, 3).map((app) => (
                    <div key={app.id} className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs flex items-center justify-between">
                      <div>
                        <span className="font-bold text-slate-900 block">{app.studentName}</span>
                        <span className="text-slate-500">{app.desiredClass} · {app.phone}</span>
                      </div>
                      <span className={`px-2 py-0.5 rounded text-[11px] font-semibold ${
                        app.status === 'Approved' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                      }`}>
                        {app.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Messages */}
              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
                <div className="flex items-center justify-between mb-4 border-b border-slate-100 pb-3">
                  <h3 className="font-bold text-sm text-slate-900">Recent Inquiries & Messages</h3>
                  <button
                    onClick={() => setActiveSection('messages')}
                    className="text-xs text-blue-900 font-semibold hover:underline"
                  >
                    View All
                  </button>
                </div>
                <div className="space-y-3">
                  {messages.slice(0, 3).map((msg) => (
                    <div key={msg.id} className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs flex items-center justify-between">
                      <div className="max-w-[70%]">
                        <span className="font-bold text-slate-900 block truncate">{msg.name}</span>
                        <span className="text-slate-500 truncate block">{msg.subject}</span>
                      </div>
                      <span className={`px-2 py-0.5 rounded text-[11px] font-semibold ${
                        msg.status === 'Unread' ? 'bg-rose-100 text-rose-800' : 'bg-slate-200 text-slate-700'
                      }`}>
                        {msg.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SECTION 2: NOTICES MANAGEMENT */}
        {activeSection === 'notices' && (
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <h3 className="font-crest text-lg font-bold text-slate-900">Manage Notices</h3>
                <p className="text-xs text-slate-500">Publish, update, or remove official school notices</p>
              </div>
              <button
                onClick={() => setShowAddNotice(true)}
                className="px-4 py-2 bg-blue-900 hover:bg-blue-950 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 cursor-pointer shadow-xs"
              >
                <Plus className="w-4 h-4" />
                <span>Create New Notice</span>
              </button>
            </div>

            <div className="overflow-x-auto border border-slate-200 rounded-xl">
              <table className="w-full text-xs text-left">
                <thead className="bg-slate-50 text-slate-700 font-semibold border-b border-slate-200">
                  <tr>
                    <th className="py-3 px-4">Ref No</th>
                    <th className="py-3 px-4">Notice Title</th>
                    <th className="py-3 px-4">Category</th>
                    <th className="py-3 px-4">Date</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {notices.map((n) => (
                    <tr key={n.id} className="hover:bg-slate-50">
                      <td className="py-3 px-4 font-mono text-slate-500">{n.refNo}</td>
                      <td className="py-3 px-4 font-medium text-slate-900 max-w-xs truncate">{n.title}</td>
                      <td className="py-3 px-4 text-blue-900 font-semibold">{n.category}</td>
                      <td className="py-3 px-4 text-slate-500">{n.date}</td>
                      <td className="py-3 px-4 text-right">
                        <button
                          onClick={() => {
                            if (confirm(`Delete notice "${n.title}"?`)) {
                              deleteNotice(n.id);
                            }
                          }}
                          className="p-1.5 text-red-600 hover:bg-red-50 rounded-md transition-colors"
                          title="Delete Notice"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* SECTION 3: NEWS MANAGEMENT */}
        {activeSection === 'news' && (
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <h3 className="font-crest text-lg font-bold text-slate-900">Manage News & Events</h3>
                <p className="text-xs text-slate-500">Share campus events, olympiad triumphs, and achievements</p>
              </div>
              <button
                onClick={() => setShowAddNews(true)}
                className="px-4 py-2 bg-blue-900 hover:bg-blue-950 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 cursor-pointer shadow-xs"
              >
                <Plus className="w-4 h-4" />
                <span>Publish News</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {news.map((item) => (
                <div key={item.id} className="p-4 bg-slate-50 border border-slate-200 rounded-xl flex flex-col justify-between">
                  <div>
                    <img src={item.image} alt={item.title} className="w-full h-32 object-cover rounded-lg mb-2" />
                    <span className="text-[11px] text-blue-900 font-semibold block">{item.category}</span>
                    <h4 className="font-bold text-xs text-slate-900 line-clamp-1">{item.title}</h4>
                    <p className="text-[11px] text-slate-600 line-clamp-2 mt-1">{item.summary}</p>
                  </div>
                  <div className="pt-3 mt-2 border-t border-slate-200 flex justify-between items-center text-xs">
                    <span className="text-slate-400 text-[10px]">{item.date}</span>
                    <button
                      onClick={() => deleteNews(item.id)}
                      className="text-red-600 hover:underline flex items-center gap-1 text-xs"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SECTION 4: TEACHERS MANAGEMENT */}
        {activeSection === 'teachers' && (
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <h3 className="font-crest text-lg font-bold text-slate-900">Faculty Directory Management</h3>
                <p className="text-xs text-slate-500">Add or remove teachers and lecturers</p>
              </div>
              <button
                onClick={() => setShowAddTeacher(true)}
                className="px-4 py-2 bg-blue-900 hover:bg-blue-950 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 cursor-pointer shadow-xs"
              >
                <Plus className="w-4 h-4" />
                <span>Add New Faculty</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {teachers.map((t) => (
                <div key={t.id} className="p-4 bg-slate-50 border border-slate-200 rounded-xl flex flex-col justify-between">
                  <div className="flex items-center gap-3 mb-2">
                    <img src={t.image} alt={t.name} className="w-12 h-12 rounded-lg object-cover" />
                    <div>
                      <h4 className="font-bold text-xs text-slate-900">{t.name}</h4>
                      <p className="text-[11px] text-emerald-800">{t.designation}</p>
                      <p className="text-[10px] text-slate-500">{t.department}</p>
                    </div>
                  </div>
                  <div className="pt-2 border-t border-slate-200 flex justify-end">
                    <button
                      onClick={() => {
                        if (confirm(`Remove teacher ${t.name}?`)) deleteTeacher(t.id);
                      }}
                      className="text-red-600 hover:text-red-800 text-xs flex items-center gap-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SECTION 5: GALLERY MANAGEMENT */}
        {activeSection === 'gallery' && (
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <h3 className="font-crest text-lg font-bold text-slate-900">Manage Photo Gallery</h3>
                <p className="text-xs text-slate-500">Upload or delete photographic records</p>
              </div>
              <button
                onClick={() => setShowAddPhoto(true)}
                className="px-4 py-2 bg-blue-900 hover:bg-blue-950 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 cursor-pointer shadow-xs"
              >
                <Plus className="w-4 h-4" />
                <span>Add Photo</span>
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {gallery.map((g) => (
                <div key={g.id} className="relative group rounded-xl overflow-hidden border border-slate-200">
                  <img src={g.imageUrl} alt={g.title} className="w-full h-36 object-cover" />
                  <div className="p-2 bg-white text-xs">
                    <p className="font-bold truncate text-slate-800">{g.title}</p>
                    <p className="text-[10px] text-slate-400">{g.category}</p>
                  </div>
                  <button
                    onClick={() => deleteGalleryItem(g.id)}
                    className="absolute top-2 right-2 p-1.5 bg-red-600 text-white rounded-md shadow-xs opacity-90 hover:opacity-100"
                    title="Delete Photo"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SECTION 6: ADMISSIONS APPLICATIONS */}
        {activeSection === 'admissions' && (
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-6">
            <div className="border-b border-slate-100 pb-4">
              <h3 className="font-crest text-lg font-bold text-slate-900">
                Online Admission Applications
              </h3>
              <p className="text-xs text-slate-500">Review, approve, or decline prospective student applications</p>
            </div>

            <div className="overflow-x-auto border border-slate-200 rounded-xl">
              <table className="w-full text-xs text-left">
                <thead className="bg-slate-50 text-slate-700 font-semibold border-b border-slate-200">
                  <tr>
                    <th className="py-3 px-4">Tracking Slip</th>
                    <th className="py-3 px-4">Student Name</th>
                    <th className="py-3 px-4">Applied Class & Stream</th>
                    <th className="py-3 px-4">Guardian Contact</th>
                    <th className="py-3 px-4">Prev. GPA / Marks</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {admissions.map((a) => (
                    <tr key={a.id} className="hover:bg-slate-50">
                      <td className="py-3 px-4 font-mono font-bold text-blue-950">{a.applicationNo}</td>
                      <td className="py-3 px-4 font-medium text-slate-900">{a.studentName}</td>
                      <td className="py-3 px-4 text-slate-600">{a.desiredClass} ({a.desiredStream || 'General'})</td>
                      <td className="py-3 px-4 font-mono text-slate-600">{a.phone}</td>
                      <td className="py-3 px-4 text-slate-600">{a.gpaOrMarks || 'N/A'}</td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-0.5 rounded text-[11px] font-semibold ${
                          a.status === 'Approved' ? 'bg-emerald-100 text-emerald-800' :
                          a.status === 'Rejected' ? 'bg-red-100 text-red-800' :
                          'bg-amber-100 text-amber-800'
                        }`}>
                          {a.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right space-x-1">
                        {a.status !== 'Approved' && (
                          <button
                            onClick={() => updateAdmissionStatus(a.id, 'Approved')}
                            className="px-2 py-1 bg-emerald-600 text-white rounded text-[11px] hover:bg-emerald-700"
                          >
                            Approve
                          </button>
                        )}
                        {a.status !== 'Rejected' && (
                          <button
                            onClick={() => updateAdmissionStatus(a.id, 'Rejected')}
                            className="px-2 py-1 bg-red-600 text-white rounded text-[11px] hover:bg-red-700"
                          >
                            Reject
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* SECTION 7: CONTACT MESSAGES */}
        {activeSection === 'messages' && (
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-6">
            <div className="border-b border-slate-100 pb-4">
              <h3 className="font-crest text-lg font-bold text-slate-900">
                Official Inquiries & Messages
              </h3>
              <p className="text-xs text-slate-500">Inbound inquiries submitted from the website Contact page</p>
            </div>

            <div className="space-y-4">
              {messages.map((m) => (
                <div key={m.id} className="p-5 bg-slate-50 border border-slate-200 rounded-xl space-y-2 text-xs">
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 pb-2">
                    <div>
                      <span className="font-bold text-slate-900 text-sm">{m.name}</span>
                      <span className="text-slate-500 ml-2 font-mono">({m.email} · {m.phone || 'No phone'})</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-slate-400 font-mono text-[11px]">{m.date}</span>
                      <span className={`px-2 py-0.5 rounded text-[11px] font-semibold ${
                        m.status === 'Unread' ? 'bg-rose-100 text-rose-800' : 'bg-slate-200 text-slate-700'
                      }`}>
                        {m.status}
                      </span>
                    </div>
                  </div>

                  <h4 className="font-bold text-slate-800">{m.subject}</h4>
                  <p className="text-slate-600 leading-relaxed font-sans">{m.message}</p>

                  <div className="pt-2 flex justify-end gap-2">
                    {m.status === 'Unread' && (
                      <button
                        onClick={() => markMessageStatus(m.id, 'Read')}
                        className="px-3 py-1 bg-slate-200 hover:bg-slate-300 text-slate-800 rounded font-semibold text-[11px]"
                      >
                        Mark as Read
                      </button>
                    )}
                    <a
                      href={`mailto:${m.email}?subject=RE: ${encodeURIComponent(m.subject)}`}
                      className="px-3 py-1 bg-blue-900 hover:bg-blue-950 text-white rounded font-semibold text-[11px]"
                    >
                      Reply via Email
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SECTION 8: SETTINGS & RESET */}
        {activeSection === 'settings' && (
          <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
            <div className="border-b border-slate-100 pb-4">
              <h3 className="font-crest text-lg font-bold text-slate-900">
                System & Database Configuration
              </h3>
              <p className="text-xs text-slate-500">Database collection status and administrative controls</p>
            </div>

            <div className="space-y-4 text-xs text-slate-700 font-sans">
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                <h4 className="font-bold text-slate-900">MongoDB-Compatible Storage Schema</h4>
                <p>
                  All collections (<code>notices</code>, <code>news</code>, <code>teachers</code>, <code>gallery</code>, <code>admissions</code>, <code>messages</code>, <code>results</code>) are persisted locally in browser state and are reactive across public and private portal views.
                </p>
              </div>

              <div className="p-4 bg-rose-50 border border-rose-200 rounded-xl space-y-3">
                <div className="flex items-center gap-2 text-rose-900 font-bold">
                  <AlertTriangle className="w-5 h-5 text-rose-600" />
                  <h4>Reset Database to Initial Sample State</h4>
                </div>
                <p className="text-rose-800 text-xs">
                  This will reset all notices, news, teachers, gallery, and admission applications back to the institution’s initial authentic seed data.
                </p>
                <button
                  onClick={() => {
                    if (confirm('Reset database to initial sample values? All custom edits will be reverted.')) {
                      resetDatabaseToDefault();
                      alert('Database reset to default.');
                    }
                  }}
                  className="px-4 py-2 bg-rose-700 hover:bg-rose-800 text-white font-semibold rounded-lg text-xs flex items-center gap-1.5 cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset All Collections</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Modal: Create Notice */}
      {showAddNotice && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
          <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200 p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-crest text-base font-bold text-slate-900">Publish New Notice</h3>
              <button onClick={() => setShowAddNotice(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleCreateNotice} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Notice Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Schedule of Annual Sports 2026"
                  value={newNotice.title}
                  onChange={(e) => setNewNotice({ ...newNotice, title: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Category</label>
                  <select
                    value={newNotice.category}
                    onChange={(e) => setNewNotice({ ...newNotice, category: e.target.value as any })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                  >
                    <option value="Academic">Academic</option>
                    <option value="Exam">Exam</option>
                    <option value="Admission">Admission</option>
                    <option value="Holiday">Holiday</option>
                    <option value="General">General</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Ref Number</label>
                  <input
                    type="text"
                    value={newNotice.refNo}
                    onChange={(e) => setNewNotice({ ...newNotice, refNo: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-mono"
                  />
                </div>
              </div>
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Short Summary *</label>
                <input
                  type="text"
                  required
                  placeholder="One sentence summary for notice board"
                  value={newNotice.description}
                  onChange={(e) => setNewNotice({ ...newNotice, description: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Complete Official Content</label>
                <textarea
                  rows={4}
                  placeholder="Enter full notice body..."
                  value={newNotice.content}
                  onChange={(e) => setNewNotice({ ...newNotice, content: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                />
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="notice-imp"
                  checked={newNotice.isImportant}
                  onChange={(e) => setNewNotice({ ...newNotice, isImportant: e.target.checked })}
                />
                <label htmlFor="notice-imp" className="font-medium text-slate-700">Mark as Important (High Priority)</label>
              </div>
              <div className="pt-3 border-t border-slate-100 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddNotice(false)}
                  className="px-4 py-2 text-slate-600 hover:text-slate-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-blue-900 text-white rounded-lg font-semibold hover:bg-blue-950"
                >
                  Publish Notice
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Create News */}
      {showAddNews && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
          <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200 p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-crest text-base font-bold text-slate-900">Publish News Story</h3>
              <button onClick={() => setShowAddNews(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleCreateNews} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Headline *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Science Fair 2026 Champion Award"
                  value={newNewsItem.title}
                  onChange={(e) => setNewNewsItem({ ...newNewsItem, title: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Category</label>
                  <input
                    type="text"
                    value={newNewsItem.category}
                    onChange={(e) => setNewNewsItem({ ...newNewsItem, category: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Author / Desk</label>
                  <input
                    type="text"
                    value={newNewsItem.author}
                    onChange={(e) => setNewNewsItem({ ...newNewsItem, author: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                  />
                </div>
              </div>
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Image URL</label>
                <input
                  type="url"
                  value={newNewsItem.image}
                  onChange={(e) => setNewNewsItem({ ...newNewsItem, image: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Summary *</label>
                <input
                  type="text"
                  required
                  placeholder="Short summary for card view"
                  value={newNewsItem.summary}
                  onChange={(e) => setNewNewsItem({ ...newNewsItem, summary: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Full Article</label>
                <textarea
                  rows={4}
                  placeholder="Complete news report..."
                  value={newNewsItem.content}
                  onChange={(e) => setNewNewsItem({ ...newNewsItem, content: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                />
              </div>
              <div className="pt-3 border-t border-slate-100 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddNews(false)}
                  className="px-4 py-2 text-slate-600 hover:text-slate-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-blue-900 text-white rounded-lg font-semibold hover:bg-blue-950"
                >
                  Publish Story
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Add Faculty */}
      {showAddTeacher && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
          <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200 p-6 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-crest text-base font-bold text-slate-900">Add Faculty Member</h3>
              <button onClick={() => setShowAddTeacher(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleCreateTeacher} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Teacher Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Dr. Md. Rafiqul Islam"
                  value={newTeacher.name}
                  onChange={(e) => setNewTeacher({ ...newTeacher, name: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Designation</label>
                  <input
                    type="text"
                    value={newTeacher.designation}
                    onChange={(e) => setNewTeacher({ ...newTeacher, designation: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Department</label>
                  <select
                    value={newTeacher.department}
                    onChange={(e) => setNewTeacher({ ...newTeacher, department: e.target.value as any })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                  >
                    <option value="Science">Science</option>
                    <option value="Mathematics">Mathematics</option>
                    <option value="English">English</option>
                    <option value="Bangla">Bangla</option>
                    <option value="ICT">ICT</option>
                    <option value="Commerce">Commerce</option>
                    <option value="Social Science">Social Science</option>
                    <option value="Administration">Administration</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Subject</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Physics"
                    value={newTeacher.subject}
                    onChange={(e) => setNewTeacher({ ...newTeacher, subject: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Academic Qualification</label>
                  <input
                    type="text"
                    value={newTeacher.qualification}
                    onChange={(e) => setNewTeacher({ ...newTeacher, qualification: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                  />
                </div>
              </div>
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Photo URL</label>
                <input
                  type="url"
                  value={newTeacher.image}
                  onChange={(e) => setNewTeacher({ ...newTeacher, image: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                />
              </div>
              <div className="pt-3 border-t border-slate-100 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddTeacher(false)}
                  className="px-4 py-2 text-slate-600 hover:text-slate-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-blue-900 text-white rounded-lg font-semibold hover:bg-blue-950"
                >
                  Save Faculty
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Add Photo */}
      {showAddPhoto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
          <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200 p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-crest text-base font-bold text-slate-900">Add Gallery Image</h3>
              <button onClick={() => setShowAddPhoto(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleCreatePhoto} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Science Olympiad Prize Ceremony"
                  value={newPhoto.title}
                  onChange={(e) => setNewPhoto({ ...newPhoto, title: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Category</label>
                <select
                  value={newPhoto.category}
                  onChange={(e) => setNewPhoto({ ...newPhoto, category: e.target.value as any })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                >
                  <option value="Campus">Campus</option>
                  <option value="Academic">Academic</option>
                  <option value="Sports">Sports</option>
                  <option value="Cultural">Cultural</option>
                  <option value="Students">Students</option>
                  <option value="Events">Events</option>
                </select>
              </div>
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Image URL *</label>
                <input
                  type="url"
                  required
                  placeholder="https://images.unsplash.com/..."
                  value={newPhoto.imageUrl}
                  onChange={(e) => setNewPhoto({ ...newPhoto, imageUrl: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Caption / Description</label>
                <input
                  type="text"
                  placeholder="Brief description of the photograph"
                  value={newPhoto.description}
                  onChange={(e) => setNewPhoto({ ...newPhoto, description: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                />
              </div>
              <div className="pt-3 border-t border-slate-100 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddPhoto(false)}
                  className="px-4 py-2 text-slate-600 hover:text-slate-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-blue-900 text-white rounded-lg font-semibold hover:bg-blue-950"
                >
                  Save Photo
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
