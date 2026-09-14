import React from 'react';
import {
  Lock,
  HeartHandshake,
  AlertTriangle,
  PhoneCall,
  ShieldCheck,
  GraduationCap,
  Award,
  BookOpen,
} from 'lucide-react';

interface BKDashboardProps {
  onNavigate: (view: string) => void;
}

export const BKDashboard: React.FC<BKDashboardProps> = ({ onNavigate }) => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-amber-950 via-slate-900 to-amber-900 rounded-2xl p-6 text-white shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-semibold mb-2 border border-amber-500/30">
              <Lock className="w-3.5 h-3.5" />
              <span>PORTAL BIMBINGAN KONSELING & PEMBINAAN SISWA</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight">
              Layanan Konseling & Kedisiplinan MAN 2 SBT
            </h1>
            <p className="text-amber-100/80 text-xs sm:text-sm mt-1 max-w-2xl">
              Pencatatan pelanggaran tata tertib 2026, akumulasi poin reward & sanksi, surat panggilan orang tua, dan catatan konseling rahasia.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => onNavigate('violations')}
              className="px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold shadow-xs transition-colors cursor-pointer"
            >
              + Catat Pelanggaran
            </button>
            <button
              onClick={() => onNavigate('counseling_confidential')}
              className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold border border-white/20 transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <Lock className="w-3.5 h-3.5 text-amber-300" />
              <span>Konseling Rahasia</span>
            </button>
          </div>
        </div>
      </div>

      {/* Confidentiality Reminder Banner */}
      <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 flex items-start gap-3">
        <ShieldCheck className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
        <div className="text-xs">
          <span className="font-bold">Protokol Kerahasiaan BK Terjamin:</span> Sesuai instruksi madrasah dan kode etik BK, catatan konseling bersifat <span className="font-semibold underline">RAHASIA</span> dan hanya dapat diakses oleh Guru BK dan Waka Kesiswaan. Sistem RBAC & Firestore Security Rules secara otomatis menolak akses role pembina, pengurus OSIM, maupun siswa.
        </div>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">Siswa Dalam Pembinaan</span>
            <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center">
              <HeartHandshake className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-slate-900">7 Siswa</span>
          </div>
          <p className="text-[11px] text-amber-600 mt-1 font-medium">Tahap 1: Peringatan Lisan (Poin 10-20)</p>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">Surat Panggilan Ortu (SP)</span>
            <div className="w-8 h-8 rounded-lg bg-red-50 text-red-700 flex items-center justify-center">
              <PhoneCall className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-slate-900">2 Kasus</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">Pemanggilan Tahap 1 (Poin 21-40)</p>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">Pemberian Reward Positif</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <Award className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-slate-900">28 Siswa</span>
          </div>
          <p className="text-[11px] text-emerald-600 mt-1 font-medium">Pengurangan Poin & Penghargaan</p>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">Sesi Konseling Aktif</span>
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center">
              <Lock className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-slate-900">4 Sesi</span>
          </div>
          <p className="text-[11px] text-blue-600 mt-1 font-medium">Bimbingan Pribadi & Belajar</p>
        </div>
      </div>
    </div>
  );
};
