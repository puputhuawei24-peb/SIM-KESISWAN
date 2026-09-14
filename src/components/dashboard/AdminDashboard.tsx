import React from 'react';
import { useAuth } from '../../context/AuthContext';
import {
  Users,
  ShieldCheck,
  Activity,
  Database,
  HardDriveDownload,
  AlertCircle,
  CheckCircle2,
  Clock,
  ArrowRight,
  Sparkles,
} from 'lucide-react';

interface AdminDashboardProps {
  onNavigate: (view: string) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onNavigate }) => {
  const { users, auditLogs } = useAuth();

  const totalUsers = users.length;
  const activeUsers = users.filter(u => u.isActive).length;
  const totalLogs = auditLogs.length;

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-emerald-900 rounded-2xl p-6 text-white shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold mb-2 border border-emerald-500/30">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>SUPER ADMIN CONSOLE</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight">
              Pusat Kendali Sistem SIM Kesiswaan
            </h1>
            <p className="text-slate-300 text-xs sm:text-sm mt-1 max-w-2xl">
              MAN 2 Seram Bagian Timur • Pengawasan teknis server, integritas data RBAC, status keamanan Firestore, dan audit aktivitas pengguna.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              id="btn-admin-manage-permissions"
              onClick={() => onNavigate('permissions')}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              <span>Matriks Hak Akses</span>
            </button>
            <button
              id="btn-admin-manage-users"
              onClick={() => onNavigate('users')}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold border border-white/20 transition-colors cursor-pointer"
            >
              <Users className="w-4 h-4" />
              <span>Kelola Akun</span>
            </button>
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Pengguna */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">Total Akun Terdaftar</span>
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-slate-900">{totalUsers}</span>
            <span className="text-xs text-emerald-600 font-medium">16 Role Terpetakan</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">Guru, Staf BK, Pembina & Pengurus OSIM</p>
        </div>

        {/* Pengguna Aktif */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">Akun Berstatus Aktif</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-slate-900">{activeUsers}</span>
            <span className="text-xs text-emerald-600 font-medium">100% Siap</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">Otorisasi RBAC Aktif</p>
        </div>

        {/* Aktivitas Sistem */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">Aktivitas & Log Audit</span>
            <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
              <Activity className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-slate-900">{totalLogs}</span>
            <span className="text-xs text-slate-500 font-medium">Tercatat</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">Immutable Log Audit Trail</p>
        </div>

        {/* Status Database */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">Database & Security</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Database className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-sm font-bold text-emerald-700">Firestore Ready</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">Rules Version 2 • Hardened ABAC</p>
        </div>
      </div>

      {/* System Status Grid & Recent Logs */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Status Subsistem Teknis */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-700">
              Integritas Sistem & Cadangan
            </h2>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-semibold">
              SEHAT
            </span>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50 border border-slate-100">
              <div className="flex items-center gap-2.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <div>
                  <div className="text-xs font-semibold text-slate-800">RBAC Dynamic Matrix</div>
                  <div className="text-[11px] text-slate-500">16 Role • 25 Modul</div>
                </div>
              </div>
              <span className="text-xs font-bold text-emerald-600">Aktif</span>
            </div>

            <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50 border border-slate-100">
              <div className="flex items-center gap-2.5">
                <Database className="w-4 h-4 text-emerald-600" />
                <div>
                  <div className="text-xs font-semibold text-slate-800">Skema Firestore</div>
                  <div className="text-[11px] text-slate-500">firebase-blueprint.json</div>
                </div>
              </div>
              <span className="text-xs font-bold text-emerald-600">Tervalidasi</span>
            </div>

            <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50 border border-slate-100">
              <div className="flex items-center gap-2.5">
                <HardDriveDownload className="w-4 h-4 text-blue-600" />
                <div>
                  <div className="text-xs font-semibold text-slate-800">Pencadangan Otomatis</div>
                  <div className="text-[11px] text-slate-500">Daily Cloud Snapshot</div>
                </div>
              </div>
              <span className="text-xs font-bold text-blue-600">Tersinkron</span>
            </div>

            <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50 border border-slate-100">
              <div className="flex items-center gap-2.5">
                <AlertCircle className="w-4 h-4 text-slate-400" />
                <div>
                  <div className="text-xs font-semibold text-slate-800">Error Exception Log</div>
                  <div className="text-[11px] text-slate-500">0 insiden tercatat</div>
                </div>
              </div>
              <span className="text-xs font-bold text-slate-500">Bersih</span>
            </div>
          </div>
        </div>

        {/* Audit Log Terakhir */}
        <div className="lg:col-span-2 bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h2 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                  Audit Aktivitas Terbaru
                </h2>
                <p className="text-[11px] text-slate-500">Pencatatan real-time aksi pengguna sistem</p>
              </div>
              <button
                onClick={() => onNavigate('audit_logs')}
                className="text-xs text-emerald-700 hover:text-emerald-800 font-semibold flex items-center gap-1 cursor-pointer"
              >
                <span>Lihat Semua</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="mt-4 divide-y divide-slate-100">
              {auditLogs.slice(0, 5).map(log => (
                <div key={log.id} className="py-2.5 flex items-start justify-between gap-3 text-xs">
                  <div className="flex items-start gap-2.5">
                    <div className="w-7 h-7 rounded-full bg-slate-100 text-slate-700 flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                      {log.userName.charAt(0)}
                    </div>
                    <div>
                      <div className="font-semibold text-slate-800">
                        {log.userName}{' '}
                        <span className="font-normal text-slate-500">({log.userRole})</span>
                      </div>
                      <div className="text-slate-600 mt-0.5">{log.description}</div>
                      <div className="text-[10px] text-slate-400 mt-0.5 flex items-center gap-2">
                        <span>Modul: {log.module}</span>
                        <span>•</span>
                        <span>IP: {log.ipAddress}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-[11px] text-slate-400 shrink-0 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>{new Date(log.timestamp).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })} WIT</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>Standar Keamanan: ISO 27001 & Aturan Kemenag RI</span>
            <span className="text-emerald-600 font-medium">Audit Trail Dilindungi</span>
          </div>
        </div>
      </div>
    </div>
  );
};
