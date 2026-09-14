import React from 'react';
import { useAuth } from '../../context/AuthContext';
import {
  Compass,
  Calendar,
  FileSpreadsheet,
  FileClock,
  FileCheck2,
  Users,
  Award,
  Clock,
  CheckCircle2,
} from 'lucide-react';

interface PembinaDashboardProps {
  onNavigate: (view: string) => void;
}

export const PembinaDashboard: React.FC<PembinaDashboardProps> = ({ onNavigate }) => {
  const { currentUser } = useAuth();
  const isOsim = currentUser?.role === 'PEMBINA_OSIM';

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-800 to-slate-900 rounded-2xl p-6 text-white shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-semibold mb-2 border border-blue-500/30">
              <Users className="w-3.5 h-3.5" />
              <span>{isOsim ? 'PEMBINA UTAMA OSIM' : 'PEMBINA EKSTRAKURIKULER'}</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight">
              Portal Pembina: {currentUser?.displayName}
            </h1>
            <p className="text-blue-100/80 text-xs sm:text-sm mt-1 max-w-2xl">
              {isOsim
                ? 'Monitoring program kerja BPH OSIM, Sekbid 1 s/d 8, evaluasi proposal kegiatan, presensi rapat, dan buku kas OSIM.'
                : 'Pengelolaan jadwal latihan rutin, absensi anggota binaan, pencapaian prestasi, dan pengajuan proposal kegiatan ekskul.'}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => onNavigate('activities')}
              className="px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer"
            >
              + Buat Kegiatan
            </button>
          </div>
        </div>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">Anggota Binaan</span>
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-slate-900">{isOsim ? '48 Siswa' : '36 Siswa'}</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">{isOsim ? 'BPH + 8 Sekbid Terdaftar' : 'Anggota Aktif Terdaftar'}</p>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">Kegiatan Berjalan</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Compass className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-slate-900">4 Kegiatan</span>
          </div>
          <p className="text-[11px] text-emerald-600 mt-1 font-medium">Dalam Tahap Pelaksanaan</p>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">Proposal Perlu Ditinjau</span>
            <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
              <FileClock className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-slate-900">1 Baru</span>
          </div>
          <p className="text-[11px] text-amber-600 mt-1 font-medium">Sekbid 1: Maulid Nabi</p>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">Rata-rata Presensi</span>
            <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <FileSpreadsheet className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-slate-900">94.8%</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">Kehadiran 4 Sesi Terakhir</p>
        </div>
      </div>

      {/* Task & Review Lists */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-700">
              Pemeriksaan Proposal & LPJ Binaan
            </h2>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 font-semibold">
              Tahap Pembina
            </span>
          </div>
          <div className="mt-4 space-y-3">
            <div className="p-3 rounded-lg border border-slate-200 bg-slate-50 flex items-center justify-between">
              <div>
                <div className="text-xs font-bold text-slate-800">Draft Proposal Maulid Nabi 1448 H</div>
                <div className="text-[11px] text-slate-500 mt-0.5">Oleh: Sekbid 1 • Anggaran diajukan: Rp 3.500.000</div>
              </div>
              <button
                onClick={() => onNavigate('proposals')}
                className="px-2.5 py-1 text-xs font-semibold rounded bg-blue-600 text-white hover:bg-blue-700 cursor-pointer"
              >
                Periksa
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-700">
              Jadwal Pembinaan Terdekat
            </h2>
            <span className="text-xs text-blue-600 font-medium">Minggu Ini</span>
          </div>
          <div className="mt-4 space-y-3">
            <div className="p-3 rounded-lg border border-slate-200 bg-slate-50 flex items-center justify-between text-xs">
              <div>
                <div className="font-bold text-slate-800">Rapat Koordinasi Evaluasi Sekbid</div>
                <div className="text-[11px] text-slate-500 mt-0.5">Jumat, 16.00 WIT • Ruang OSIM MAN 2 SBT</div>
              </div>
              <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                Terjadwal
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
