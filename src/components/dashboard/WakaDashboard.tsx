import React from 'react';
import {
  GraduationCap,
  AlertTriangle,
  Award,
  Compass,
  Sparkles,
  FileClock,
  FileCheck2,
  Wallet,
  Calendar,
  CheckCircle2,
  ArrowUpRight,
  Clock,
  ChevronRight,
} from 'lucide-react';

interface WakaDashboardProps {
  onNavigate: (view: string) => void;
}

export const WakaDashboard: React.FC<WakaDashboardProps> = ({ onNavigate }) => {
  return (
    <div className="space-y-6">
      {/* Executive Header */}
      <div className="bg-gradient-to-r from-emerald-900 via-teal-800 to-slate-900 rounded-2xl p-6 text-white shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold mb-2 border border-emerald-500/30">
              <Sparkles className="w-3.5 h-3.5" />
              <span>DASHBOARD EKSEKUTIF WAKA KESISWAAN</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight">
              Monitoring Terpadu Kesiswaan MAN 2 SBT
            </h1>
            <p className="text-emerald-100/80 text-xs sm:text-sm mt-1 max-w-2xl">
              Pengawasan menyeluruh terhadap kedisiplinan, prestasi siswa, program kerja OSIM & Sekbid, pengajuan proposal, verifikasi LPJ, dan akuntabilitas kas.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => onNavigate('proposals')}
              className="px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold shadow-xs transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <FileClock className="w-4 h-4" />
              <span>2 Proposal Menunggu Review</span>
            </button>
          </div>
        </div>
      </div>

      {/* 4 Primary Executive Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Siswa */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">Total Siswa Aktif</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <GraduationCap className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-slate-900">438</span>
            <span className="text-xs text-slate-500 font-medium">14 Rombel (X, XI, XII)</span>
          </div>
          <div className="mt-2 text-[11px] text-emerald-600 font-medium flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" />
            <span>Presensi Rata-rata 96.4%</span>
          </div>
        </div>

        {/* Pelanggaran & Poin */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">Catatan Pelanggaran</span>
            <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
              <AlertTriangle className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-slate-900">12</span>
            <span className="text-xs text-amber-600 font-medium">Bulan September 2026</span>
          </div>
          <div className="mt-2 text-[11px] text-slate-500">
            <span>Dominasi: Keterlambatan masuk kelas</span>
          </div>
        </div>

        {/* Prestasi Siswa */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">Prestasi Akademik & Ekskul</span>
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
              <Award className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-slate-900">19</span>
            <span className="text-xs text-blue-600 font-medium">Kab / Prov / Nas</span>
          </div>
          <div className="mt-2 text-[11px] text-slate-500">
            <span>Terbaru: Juara 1 KSM Geografi Kab. SBT</span>
          </div>
        </div>

        {/* Saldo Kas Kesiswaan */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">Total Kas Kesiswaan</span>
            <div className="w-8 h-8 rounded-lg bg-teal-50 text-teal-700 flex items-center justify-center">
              <Wallet className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-xl font-bold text-slate-900">Rp 14.850.000</span>
          </div>
          <div className="mt-2 text-[11px] text-emerald-600 font-medium">
            <span>Kas OSIM: Rp 4.320.000</span>
          </div>
        </div>
      </div>

      {/* Approval Section & Upcoming Activities */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Antrean Approval Proposal & LPJ */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <FileClock className="w-4 h-4 text-amber-600" />
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-800">
                Antrean Persetujuan Waka (Workflow)
              </h2>
            </div>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 font-semibold">
              Perlu Tindakan
            </span>
          </div>

          <div className="mt-4 space-y-3">
            <div className="p-3 rounded-lg border border-slate-200 bg-slate-50/60 flex items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-blue-100 text-blue-800">
                    PROPOSAL
                  </span>
                  <span className="text-xs font-bold text-slate-800">
                    Peringatan Maulid Nabi Muhammad SAW 1448 H
                  </span>
                </div>
                <div className="text-[11px] text-slate-500 mt-1">
                  Pengaju: Sekbid 1 (Keagamaan) • Pembina telah menyetujui • Anggaran: Rp 3.500.000
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => onNavigate('proposals')}
                  className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 cursor-pointer"
                >
                  Review
                </button>
              </div>
            </div>

            <div className="p-3 rounded-lg border border-slate-200 bg-slate-50/60 flex items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-purple-100 text-purple-800">
                    LPJ KEGIATAN
                  </span>
                  <span className="text-xs font-bold text-slate-800">
                    Latihan Dasar Kepemimpinan Siswa (LDKS) 2026
                  </span>
                </div>
                <div className="text-[11px] text-slate-500 mt-1">
                  Pengaju: BPH OSIM • Realisasi: 100% • Sisa Anggaran: Rp 250.000
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => onNavigate('lpj')}
                  className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 cursor-pointer"
                >
                  Verifikasi
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Agenda Kegiatan Kesiswaan & OSIM Terdekat */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-emerald-600" />
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-800">
                Agenda Kegiatan Mendatang
              </h2>
            </div>
            <button
              onClick={() => onNavigate('calendar')}
              className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 flex items-center gap-0.5 cursor-pointer"
            >
              <span>Buka Kalender</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="mt-4 space-y-3">
            <div className="flex items-start gap-3 p-2.5 rounded-lg bg-emerald-50/50 border border-emerald-100 text-xs">
              <div className="w-12 text-center shrink-0 bg-white p-1 rounded-md border border-emerald-200">
                <div className="text-[10px] font-bold text-emerald-700 uppercase">SEP</div>
                <div className="text-base font-extrabold text-slate-900">18</div>
              </div>
              <div className="flex-1">
                <div className="font-bold text-slate-800">Latihan Gabungan Pramuka & PMR MAN 2 SBT</div>
                <div className="text-[11px] text-slate-500 mt-0.5">Tempat: Lapangan Utama Madrasah • Pukul: 15.30 WIT</div>
              </div>
            </div>

            <div className="flex items-start gap-3 p-2.5 rounded-lg bg-slate-50 border border-slate-200 text-xs">
              <div className="w-12 text-center shrink-0 bg-white p-1 rounded-md border border-slate-200">
                <div className="text-[10px] font-bold text-slate-700 uppercase">SEP</div>
                <div className="text-base font-extrabold text-slate-900">24</div>
              </div>
              <div className="flex-1">
                <div className="font-bold text-slate-800">Peringatan Hari Besar Islam (PHBI) Maulid Nabi</div>
                <div className="text-[11px] text-slate-500 mt-0.5">Tempat: Aula MAN 2 Seram Bagian Timur • Penanggung Jawab: Sekbid 1</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
