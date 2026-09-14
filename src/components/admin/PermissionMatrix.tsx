import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { UserRole, AppModule, AppPermissionAction } from '../../types/auth';
import {
  ShieldCheck,
  RotateCcw,
  Search,
  Filter,
  Check,
  X,
  AlertCircle,
  Sparkles,
} from 'lucide-react';

const MODULE_NAMES: Record<AppModule, { name: string; category: string }> = {
  dashboard: { name: 'Dashboard Terpadu', category: 'Utama' },
  users: { name: 'Manajemen Akun Pengguna', category: 'Administrasi' },
  school_settings: { name: 'Profil Madrasah & Kop', category: 'Master Data' },
  students: { name: 'Data Siswa & NISN', category: 'Master Data' },
  teachers: { name: 'Data Guru & NIP', category: 'Master Data' },
  classes: { name: 'Data Kelas & Rombel', category: 'Master Data' },
  activities: { name: 'Kegiatan Kesiswaan', category: 'Kesiswaan' },
  calendar: { name: 'Kalender Kegiatan', category: 'Kesiswaan' },
  attendance: { name: 'Presensi Kegiatan', category: 'Kesiswaan' },
  proposals: { name: 'Pengajuan & Verifikasi Proposal', category: 'Kesiswaan' },
  lpj: { name: 'Laporan Pertanggungjawaban (LPJ)', category: 'Kesiswaan' },
  osim_bph: { name: 'Program Kerja BPH OSIM', category: 'OSIM & Ekskul' },
  osim_sekbid: { name: 'Kegiatan Sekbid 1-8', category: 'OSIM & Ekskul' },
  extracurricular: { name: 'Ekstrakurikuler', category: 'OSIM & Ekskul' },
  rules: { name: 'Buku Tata Tertib 2026', category: 'Kedisiplinan & BK' },
  violations: { name: 'Poin Pelanggaran Siswa', category: 'Kedisiplinan & BK' },
  rewards: { name: 'Poin Reward Prestasi', category: 'Kedisiplinan & BK' },
  guidance: { name: 'Tahapan Pembinaan & Sanksi', category: 'Kedisiplinan & BK' },
  counseling_confidential: { name: 'Konseling BK (Rahasia)', category: 'Kedisiplinan & BK' },
  parent_calls: { name: 'Surat Panggilan Orang Tua', category: 'Kedisiplinan & BK' },
  treasury_kesiswaan: { name: 'Buku Kas Kesiswaan', category: 'Keuangan' },
  treasury_osim: { name: 'Buku Kas OSIM', category: 'Keuangan' },
  reports: { name: 'Pusat Laporan & Cetak', category: 'Pelaporan' },
  audit_logs: { name: 'Jejak Audit Aktivitas', category: 'Keamanan' },
  permissions: { name: 'Pengaturan Hak Akses RBAC', category: 'Keamanan' },
};

const ALL_ROLES: UserRole[] = [
  'SUPER_ADMIN',
  'WAKA_KESISWAAN',
  'GURU_BK',
  'PEMBINA_OSIM',
  'PEMBINA_EKSKUL',
  'BPH_OSIM',
  'SEKBID_1',
  'SEKBID_2',
  'SEKBID_3',
  'SEKBID_4',
  'SEKBID_5',
  'SEKBID_6',
  'SEKBID_7',
  'SEKBID_8',
  'BENDAHARA_KESISWAAN',
  'BENDAHARA_OSIM',
];

const ACTIONS: { key: AppPermissionAction; label: string }[] = [
  { key: 'view', label: 'View' },
  { key: 'create', label: 'Create' },
  { key: 'edit', label: 'Edit' },
  { key: 'delete', label: 'Delete' },
  { key: 'approve', label: 'Approve' },
  { key: 'print', label: 'Print' },
  { key: 'export', label: 'Export' },
];

export const PermissionMatrix: React.FC = () => {
  const { permissions, updatePermission, resetPermissions, currentUser } = useAuth();
  const [selectedRole, setSelectedRole] = useState<UserRole>('WAKA_KESISWAAN');
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('ALL');

  const isSuperAdmin = currentUser?.role === 'SUPER_ADMIN';

  const modules = (Object.keys(MODULE_NAMES) as AppModule[]).filter(mod => {
    const meta = MODULE_NAMES[mod];
    const matchSearch =
      meta.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      mod.toLowerCase().includes(searchTerm.toLowerCase());
    const matchCat = categoryFilter === 'ALL' || meta.category === categoryFilter;
    return matchSearch && matchCat;
  });

  const categories = Array.from(new Set(Object.values(MODULE_NAMES).map(m => m.category)));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-emerald-700 text-xs font-bold uppercase tracking-wider mb-1">
            <ShieldCheck className="w-4 h-4" />
            <span>PENGATURAN HAK AKSES SISTEM (RBAC)</span>
          </div>
          <h1 className="text-xl font-bold text-slate-900">
            Matriks Hak Akses & Pembatasan Otorisasi
          </h1>
          <p className="text-xs text-slate-500 mt-1 max-w-2xl">
            Atur izin akses granular per Role, Modul, dan Tindakan (View, Create, Edit, Delete, Approve, Print, Export). Perubahan izin langsung tersinkronisasi ke proteksi UI dan dicatat pada audit log.
          </p>
        </div>

        {isSuperAdmin && (
          <button
            onClick={() => {
              if (window.confirm('Apakah Anda yakin ingin mengatur ulang seluruh hak akses ke default pabrik?')) {
                resetPermissions();
              }
            }}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-semibold transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Standar RBAC</span>
          </button>
        )}
      </div>

      {!isSuperAdmin && (
        <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 flex items-start gap-3">
          <AlertCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
          <div className="text-xs">
            <span className="font-bold">Mode Tinjauan Hak Akses (Read-Only):</span> Anda saat ini melihat matriks izin sebagai {currentUser?.role}. Hanya Super Admin yang berwenang memodifikasi izin checkbox di bawah.
          </div>
        </div>
      )}

      {/* Role Selection Tabs */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs space-y-3">
        <div className="text-xs font-bold text-slate-700 uppercase tracking-wider">
          Pilih Role yang Akan Dikonfigurasi:
        </div>
        <div className="flex flex-wrap gap-1.5">
          {ALL_ROLES.map(role => {
            const isSelected = selectedRole === role;
            return (
              <button
                key={role}
                id={`btn-select-role-${role}`}
                onClick={() => setSelectedRole(role)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-emerald-700 text-white shadow-xs ring-2 ring-emerald-700/20'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {role.replace(/_/g, ' ')}
              </button>
            );
          })}
        </div>
      </div>

      {/* Filter and Search */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Cari modul..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 rounded-lg border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Filter className="w-4 h-4 text-slate-400 shrink-0" />
          <select
            value={categoryFilter}
            onChange={e => setCategoryFilter(e.target.value)}
            className="px-3 py-1.5 rounded-lg border border-slate-200 text-xs text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            <option value="ALL">Semua Kategori</option>
            {categories.map(c => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Permissions Matrix Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-700">
              <tr>
                <th className="py-3 px-4 font-bold uppercase tracking-wider min-w-[220px]">
                  Modul Sistem
                </th>
                <th className="py-3 px-3 font-semibold text-slate-500 text-[11px] min-w-[100px]">
                  Kategori
                </th>
                {ACTIONS.map(act => (
                  <th
                    key={act.key}
                    className="py-3 px-3 text-center font-bold uppercase tracking-wider text-[11px] w-20"
                  >
                    {act.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {modules.map(mod => {
                const meta = MODULE_NAMES[mod];
                const rolePerms = permissions[selectedRole]?.[mod];

                return (
                  <tr key={mod} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3 px-4">
                      <div className="font-semibold text-slate-800">{meta.name}</div>
                      <div className="text-[11px] text-slate-400 font-mono">{mod}</div>
                    </td>
                    <td className="py-3 px-3">
                      <span className="inline-block px-2 py-0.5 rounded-full text-[10px] font-medium bg-slate-100 text-slate-600">
                        {meta.category}
                      </span>
                    </td>
                    {ACTIONS.map(act => {
                      const isAllowed = !!rolePerms?.[act.key];

                      return (
                        <td key={act.key} className="py-3 px-3 text-center">
                          <label className="inline-flex items-center justify-center cursor-pointer">
                            <input
                              type="checkbox"
                              checked={isAllowed}
                              disabled={!isSuperAdmin}
                              onChange={e => {
                                updatePermission(selectedRole, mod, act.key, e.target.checked);
                              }}
                              className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 border-slate-300 disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed"
                            />
                          </label>
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="p-4 bg-slate-50 border-t border-slate-200 text-[11px] text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>
            Menampilkan {modules.length} modul untuk Role <strong className="text-slate-800">{selectedRole}</strong>
          </span>
          <span className="text-emerald-700 font-semibold flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Pemeriksaan Berlaku Dua Arah: UI & Firestore Rules</span>
          </span>
        </div>
      </div>
    </div>
  );
};
