import React from 'react';
import { useAuth } from '../../context/AuthContext';
import {
  Wallet,
  Coins,
  ArrowUpRight,
  ArrowDownRight,
  Receipt,
  FileText,
  ShieldCheck,
} from 'lucide-react';

interface BendaharaDashboardProps {
  onNavigate: (view: string) => void;
}

export const BendaharaDashboard: React.FC<BendaharaDashboardProps> = ({ onNavigate }) => {
  const { currentUser } = useAuth();
  const isKesiswaan = currentUser?.role === 'BENDAHARA_KESISWAAN';

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-950 via-slate-900 to-indigo-900 rounded-2xl p-6 text-white shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-purple-500/20 text-purple-300 text-xs font-semibold mb-2 border border-purple-500/30">
              <Wallet className="w-3.5 h-3.5" />
              <span>{isKesiswaan ? 'BENDAHARA BIDANG KESISWAAN' : 'BENDAHARA OSIM MADRASAH'}</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight">
              Manajemen Buku Kas & Transparansi Keuangan
            </h1>
            <p className="text-purple-100/80 text-xs sm:text-sm mt-1 max-w-2xl">
              {isKesiswaan
                ? 'Pengelolaan arus kas kesiswaan, pencatatan dana BOS/komite kesiswaan, realisasi kegiatan madrasah, dan laporan pertanggungjawaban keuangan.'
                : 'Pencatatan kas iuran OSIM, operasional program kerja sekbid, pengeluaran perlengkapan, dan buku kas bendahara OSIM.'}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => onNavigate(isKesiswaan ? 'treasury_kesiswaan' : 'treasury_osim')}
              className="px-3.5 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer"
            >
              + Transaksi Baru
            </button>
          </div>
        </div>
      </div>

      {/* Financial Formula Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Saldo Saat Ini */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">Saldo Akhir Saat Ini</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <Wallet className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-2xl font-bold text-slate-900">
              {isKesiswaan ? 'Rp 14.850.000' : 'Rp 4.320.000'}
            </span>
          </div>
          <p className="text-[11px] text-emerald-600 mt-1 font-medium">Buku Kas Real-Time</p>
        </div>

        {/* Pemasukan */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">Total Pemasukan (Sept 2026)</span>
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
              <ArrowUpRight className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-xl font-bold text-slate-900">
              {isKesiswaan ? 'Rp 18.500.000' : 'Rp 5.200.000'}
            </span>
          </div>
          <p className="text-[11px] text-blue-600 mt-1 font-medium">Anggaran Disetujui</p>
        </div>

        {/* Pengeluaran */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">Total Pengeluaran</span>
            <div className="w-8 h-8 rounded-lg bg-red-50 text-red-600 flex items-center justify-center">
              <ArrowDownRight className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-xl font-bold text-slate-900">
              {isKesiswaan ? 'Rp 3.650.000' : 'Rp 880.000'}
            </span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">Disertai Bukti Kuitansi & Nota</p>
        </div>

        {/* Akuntabilitas */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">Status Audit Keuangan</span>
            <div className="w-8 h-8 rounded-lg bg-teal-50 text-teal-700 flex items-center justify-center">
              <ShieldCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-sm font-bold text-emerald-700">Terverifikasi Waka</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">Semua transaksi ber-timestamp</p>
        </div>
      </div>
    </div>
  );
};
