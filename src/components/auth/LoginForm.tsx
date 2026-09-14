import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { UserRole } from '../../types/auth';
import {
  Building2,
  Lock,
  Mail,
  ShieldCheck,
  AlertCircle,
  Sparkles,
  ArrowRight,
  UserCheck,
} from 'lucide-react';

interface LoginFormProps {
  onLoginSuccess?: () => void;
}

const PRESET_ROLES: { role: UserRole; title: string; email: string; color: string }[] = [
  { role: 'SUPER_ADMIN', title: 'Super Admin', email: 'admin.sim@man2sbt.sch.id', color: 'bg-red-50 text-red-700 border-red-200' },
  { role: 'WAKA_KESISWAAN', title: 'Waka Kesiswaan', email: 'waka.kesiswaan@man2sbt.sch.id', color: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
  { role: 'GURU_BK', title: 'Guru BK', email: 'bk.madrasah@man2sbt.sch.id', color: 'bg-amber-50 text-amber-700 border-amber-200' },
  { role: 'PEMBINA_OSIM', title: 'Pembina OSIM', email: 'pembina.osim@man2sbt.sch.id', color: 'bg-blue-50 text-blue-700 border-blue-200' },
  { role: 'PEMBINA_EKSKUL', title: 'Pembina Ekskul', email: 'pembina.pramuka@man2sbt.sch.id', color: 'bg-indigo-50 text-indigo-700 border-indigo-200' },
  { role: 'BPH_OSIM', title: 'Ketua OSIM', email: 'ketua.osim@man2sbt.sch.id', color: 'bg-teal-50 text-teal-700 border-teal-200' },
  { role: 'SEKBID_1', title: 'Sekbid 1 (Agama)', email: 'sekbid1.keagamaan@man2sbt.sch.id', color: 'bg-cyan-50 text-cyan-700 border-cyan-200' },
  { role: 'BENDAHARA_KESISWAAN', title: 'Bendahara Kesiswaan', email: 'bendahara.kesiswaan@man2sbt.sch.id', color: 'bg-purple-50 text-purple-700 border-purple-200' },
  { role: 'BENDAHARA_OSIM', title: 'Bendahara OSIM', email: 'bendahara.osim@man2sbt.sch.id', color: 'bg-violet-50 text-violet-700 border-violet-200' },
];

export const LoginForm: React.FC<LoginFormProps> = ({ onLoginSuccess }) => {
  const { login, loginAsRole, isLoading } = useAuth();
  const [email, setEmail] = useState('admin.sim@man2sbt.sch.id');
  const [password, setPassword] = useState('••••••••');
  const [errorMessage, setErrorMessage] = useState('');

  const handleManualLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    const success = await login(email, password);
    if (success) {
      if (onLoginSuccess) onLoginSuccess();
    } else {
      setErrorMessage('Akun tidak ditemukan atau berstatus nonaktif. Silakan gunakan email resmi madrasah.');
    }
  };

  const handleQuickRole = (role: UserRole) => {
    loginAsRole(role);
    if (onLoginSuccess) onLoginSuccess();
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none" />

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10 px-4">
        {/* Madrasah Logo & Header */}
        <div className="text-center">
          <div className="mx-auto w-14 h-14 rounded-2xl bg-emerald-600 flex items-center justify-center text-white shadow-lg shadow-emerald-600/30 mb-3">
            <Building2 className="w-8 h-8" />
          </div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold mb-2">
            <span>KEMENTERIAN AGAMA REPUBLIK INDONESIA</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
            SIM KESISWAAN
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 font-medium">
            MAN 2 Seram Bagian Timur • Tahun Ajaran 2025/2026
          </p>
        </div>

        {/* Login Box */}
        <div className="mt-6 bg-white py-8 px-6 sm:px-8 shadow-2xl rounded-2xl border border-slate-100">
          <div className="mb-6 pb-4 border-b border-slate-100">
            <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Autentikasi Akses Terpadu (SSO)</span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Masuk sesuai dengan kredensial jabatan atau pilih role simulasi di bawah
            </p>
          </div>

          {errorMessage && (
            <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-start gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
          )}

          <form onSubmit={handleManualLogin} className="space-y-4 text-xs">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Alamat Email Madrasah
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="user@man2sbt.sch.id"
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 text-slate-900 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Kata Sandi (Password)
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 text-slate-900 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-2.5 px-4 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs shadow-md shadow-emerald-700/20 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {isLoading ? (
                <span>Memverifikasi...</span>
              ) : (
                <>
                  <span>Masuk ke Sistem</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Quick Testing Shortcuts (Phase 1 Testing Matrix Requirement) */}
          <div className="mt-6 pt-5 border-t border-slate-100">
            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700 mb-2.5">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              <span>Akses Cepat Pengujian Role (Phase 1 Testing):</span>
            </div>
            <p className="text-[11px] text-slate-500 mb-3">
              Klik salah satu tombol untuk langsung menguji tampilan antarmuka dan isolasi izin role tersebut:
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
              {PRESET_ROLES.map(p => (
                <button
                  key={p.role}
                  type="button"
                  id={`btn-quick-login-${p.role}`}
                  onClick={() => handleQuickRole(p.role)}
                  className={`p-2 rounded-lg border text-[11px] font-semibold text-left transition-all hover:scale-[1.02] cursor-pointer ${p.color}`}
                >
                  <div className="truncate">{p.title}</div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Security Footer Notice */}
        <div className="text-center mt-6 text-slate-500 text-xs">
          <p>© 2026 MAN 2 Seram Bagian Timur • Kemenag RI</p>
          <p className="text-[11px] text-slate-600 mt-0.5">
            Sistem Informasi Manajemen Kesiswaan Terintegrasi • Phase 1 Foundation
          </p>
        </div>
      </div>
    </div>
  );
};
