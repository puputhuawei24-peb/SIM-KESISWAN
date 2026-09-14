import React from 'react';
import { useAuth } from '../../context/AuthContext';
import {
  Sparkles,
  Calendar,
  Layers,
  FileClock,
  Coins,
  CheckCircle2,
  Clock,
  ArrowRight,
  Shield,
} from 'lucide-react';

interface OsimDashboardProps {
  onNavigate: (view: string) => void;
}

export const OsimDashboard: React.FC<OsimDashboardProps> = ({ onNavigate }) => {
  const { currentUser } = useAuth();
  const isSekbid = currentUser?.role.startsWith('SEKBID');
  const sekbidNum = currentUser?.assignedSekbid;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-teal-900 via-slate-800 to-emerald-900 rounded-2xl p-6 text-white shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-teal-500/20 text-teal-300 text-xs font-semibold mb-2 border border-teal-500/30">
              <Sparkles className="w-3.5 h-3.5" />
              <span>
                {isSekbid ? `RUANG KERJA SEKBID ${sekbidNum || ''}` : 'ORGANISASI SISWA INTRA MADRASAH (OSIM)'}
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight">
              Selamat Bertugas, {currentUser?.displayName}
            </h1>
            <p className="text-teal-100/80 text-xs sm:text-sm mt-1 max-w-2xl">
              {isSekbid
                ? `Fokus pada pengelolaan program kerja, draf proposal kegiatan, presensi peserta, dan pelaporan LPJ Sekbid ${sekbidNum} MAN 2 Seram Bagian Timur.`
                : 'Pusat komando BPH OSIM: Mengoordinasikan 8 Sekbid, mengontrol pelaksanaan kalender kerja, dan transparansi administrasi.'}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => onNavigate('proposals')}
              className="px-3.5 py-2 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 text-xs font-bold shadow-xs transition-colors cursor-pointer"
            >
              + Ajukan Proposal
            </button>
          </div>
        </div>
      </div>

      {/* Scope Isolation Notice for Sekbid */}
      {isSekbid && (
        <div className="p-4 rounded-xl bg-cyan-50/80 border border-cyan-200 text-cyan-900 flex items-start gap-3">
          <Shield className="w-5 h-5 text-cyan-700 shrink-0 mt-0.5" />
          <div className="text-xs">
            <span className="font-bold">Keamanan & Isolasi Data Sekbid Terverifikasi:</span> Anda terotentikasi untuk mengelola data kegiatan dan proposal Sekbid {sekbidNum}. Sesuai kebijakan tata kelola madrasah, data BK, data pelanggaran siswa, dan data sekbid lain diisolasi secara ketat oleh sistem RBAC.
          </div>
        </div>
      )}

      {/* Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">Program Kerja Aktif</span>
            <div className="w-8 h-8 rounded-lg bg-teal-50 text-teal-700 flex items-center justify-center">
              <Layers className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-slate-900">{isSekbid ? '3 Program' : '24 Program'}</span>
          </div>
          <p className="text-[11px] text-teal-600 mt-1 font-medium">Tahun Ajaran 2025/2026</p>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">Status Proposal</span>
            <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
              <FileClock className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-slate-900">1 Diajukan</span>
          </div>
          <p className="text-[11px] text-amber-600 mt-1 font-medium">Menunggu Verifikasi Pembina</p>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">Agenda Terdekat</span>
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
              <Calendar className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-slate-900">2 Kegiatan</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">Dalam 14 Hari Kedepan</p>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">Buku Kas OSIM</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Coins className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-xl font-bold text-slate-900">Rp 4.320.000</span>
          </div>
          <p className="text-[11px] text-emerald-600 mt-1 font-medium">Dikelola Bendahara & Pembina</p>
        </div>
      </div>

      {/* Program Kerja Quick List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-700">
              {isSekbid ? `Daftar Kegiatan Sekbid ${sekbidNum}` : 'Program Kerja Prioritas OSIM'}
            </h2>
            <button
              onClick={() => onNavigate('activities')}
              className="text-xs font-semibold text-teal-700 hover:text-teal-800 flex items-center gap-1 cursor-pointer"
            >
              <span>Selengkapnya</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="mt-4 space-y-3">
            <div className="p-3 rounded-lg border border-slate-200 bg-slate-50/60 flex items-center justify-between text-xs">
              <div>
                <div className="font-bold text-slate-800">Peringatan Maulid Nabi Muhammad SAW</div>
                <div className="text-[11px] text-slate-500 mt-0.5">Status: Proposal Diajukan • 24 September 2026</div>
              </div>
              <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-800 text-[10px] font-bold">
                Review Waka
              </span>
            </div>

            <div className="p-3 rounded-lg border border-slate-200 bg-slate-50/60 flex items-center justify-between text-xs">
              <div>
                <div className="font-bold text-slate-800">Latihan Rutin Gabungan Ekskul</div>
                <div className="text-[11px] text-slate-500 mt-0.5">Status: Berjalan • 18 September 2026</div>
              </div>
              <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                Disetujui
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-700">
              Alur Pengajuan Proposal & LPJ Mandiri
            </h2>
            <span className="text-[10px] text-teal-700 font-bold bg-teal-50 px-2 py-0.5 rounded">
              SOP Madrasah
            </span>
          </div>
          <div className="mt-4 space-y-2.5 text-xs text-slate-600">
            <div className="flex items-center gap-2 p-2 rounded-md bg-slate-50">
              <span className="w-5 h-5 rounded-full bg-teal-600 text-white flex items-center justify-center font-bold text-[10px]">1</span>
              <span>Input Draf Proposal & Rencana Anggaran Biaya (RAB)</span>
            </div>
            <div className="flex items-center gap-2 p-2 rounded-md bg-slate-50">
              <span className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-[10px]">2</span>
              <span>Pemeriksaan dan Persetujuan oleh Pembina OSIM</span>
            </div>
            <div className="flex items-center gap-2 p-2 rounded-md bg-slate-50">
              <span className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-[10px]">3</span>
              <span>Otorisasi & Pengesahan Akhir oleh Waka Kesiswaan</span>
            </div>
            <div className="flex items-center gap-2 p-2 rounded-md bg-slate-50">
              <span className="w-5 h-5 rounded-full bg-slate-700 text-white flex items-center justify-center font-bold text-[10px]">4</span>
              <span>Pelaksanaan Kegiatan & Pengunggahan LPJ + Bukti Kas</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
