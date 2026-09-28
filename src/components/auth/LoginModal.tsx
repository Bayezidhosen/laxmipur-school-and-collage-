import React, { useState } from 'react';
import { loginUser } from '../../lib/auth';
import { User, UserRole } from '../../types';
import { InstitutionLogo } from '../InstitutionLogo';
import {
  GraduationCap,
  Shield,
  Lock,
  Mail,
  X,
  AlertCircle,
  CheckCircle2,
  ArrowRight,
  KeyRound
} from 'lucide-react';

interface LoginModalProps {
  isOpen: boolean;
  initialRole?: 'student' | 'admin';
  onClose: () => void;
  onSuccess: (user: User) => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({
  isOpen,
  initialRole = 'student',
  onClose,
  onSuccess,
}) => {
  const [activeTab, setActiveTab] = useState<'student' | 'admin'>(initialRole);
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [showForgot, setShowForgot] = useState(false);

  // Sync tab if initialRole changes when opening
  React.useEffect(() => {
    setActiveTab(initialRole);
    setError(null);
  }, [initialRole, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const res = loginUser(identifier, password);
    if (res.success && res.user) {
      onSuccess(res.user);
      onClose();
    } else {
      setError(res.error || 'Authentication failed. Please check credentials.');
    }
  };

  const handleAutofill = (role: 'student' | 'admin') => {
    if (role === 'student') {
      setActiveTab('student');
      setIdentifier('student@laxmipur.edu.bd');
      setPassword('student123');
      setError(null);
    } else {
      setActiveTab('admin');
      setIdentifier('admin@laxmipur.edu.bd');
      setPassword('admin123');
      setError(null);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/65 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden font-sans">
        {/* Modal Top Header */}
        <div className="bg-slate-900 text-white p-6 pb-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2.5">
              <InstitutionLogo size="sm" />
              <div>
                <h3 className="font-crest text-base font-bold">Laxmipur SC Portal</h3>
                <p className="text-[11px] text-slate-400">Institutional Access Control</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Role Switcher Tabs */}
          <div className="grid grid-cols-2 p-1 bg-slate-800 rounded-xl gap-1">
            <button
              type="button"
              onClick={() => {
                setActiveTab('student');
                setError(null);
              }}
              className={`py-2 px-3 text-xs font-semibold rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                activeTab === 'student'
                  ? 'bg-blue-900 text-white shadow-xs'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <GraduationCap className="w-3.5 h-3.5 text-blue-400" />
              <span>Student Sign In</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setActiveTab('admin');
                setError(null);
              }}
              className={`py-2 px-3 text-xs font-semibold rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                activeTab === 'admin'
                  ? 'bg-slate-700 text-white shadow-xs'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Shield className="w-3.5 h-3.5 text-amber-400" />
              <span>Admin Sign In</span>
            </button>
          </div>
        </div>

        {/* Modal Form Body */}
        <div className="p-6">
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-800 flex items-start gap-2 animate-in fade-in">
              <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {showForgot ? (
            <div className="space-y-4 py-2">
              <div className="text-center space-y-1">
                <KeyRound className="w-8 h-8 text-blue-900 mx-auto" />
                <h4 className="font-bold text-sm text-slate-900">Forgot Your Password?</h4>
                <p className="text-xs text-slate-500">
                  Students and guardians must visit the School IT Cell or call the administrative helpline (+880 1712-345678) with their student ID to reset their credentials.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowForgot(false)}
                className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold rounded-lg"
              >
                Back to Sign In
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  {activeTab === 'student' ? 'Email or Student ID' : 'Administrator Email'}
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    placeholder={activeTab === 'student' ? 'e.g. student@laxmipur.edu.bd' : 'admin@laxmipur.edu.bd'}
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-blue-900/30 focus:border-blue-900"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-xs font-semibold text-slate-700">Password</label>
                  <button
                    type="button"
                    onClick={() => setShowForgot(true)}
                    className="text-[11px] text-blue-900 hover:underline"
                  >
                    Forgot Password?
                  </button>
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    required
                    placeholder="Enter account password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-blue-900/30 focus:border-blue-900"
                  />
                </div>
              </div>

              <button
                type="submit"
                className={`w-full py-2.5 text-white font-semibold text-xs rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-xs ${
                  activeTab === 'student'
                    ? 'bg-blue-900 hover:bg-blue-950'
                    : 'bg-slate-900 hover:bg-slate-800'
                }`}
              >
                <span>Sign In as {activeTab === 'student' ? 'Student' : 'Administrator'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </form>
          )}

          {/* Quick Demo Credentials Assistant */}
          <div className="mt-6 pt-4 border-t border-slate-100">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-2 text-center">
              Quick One-Click Demo Credentials
            </span>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => handleAutofill('student')}
                className="py-1.5 px-2 bg-blue-50 hover:bg-blue-100 border border-blue-200 text-blue-950 rounded-lg text-[11px] font-medium transition-colors text-center"
              >
                Fill Student Demo
              </button>
              <button
                type="button"
                onClick={() => handleAutofill('admin')}
                className="py-1.5 px-2 bg-slate-100 hover:bg-slate-200 border border-slate-300 text-slate-900 rounded-lg text-[11px] font-medium transition-colors text-center"
              >
                Fill Admin Demo
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
