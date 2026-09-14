import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { AppModule } from '../../types/auth';
import {
  LayoutDashboard,
  Users,
  Building,
  GraduationCap,
  Briefcase,
  Layers,
  CalendarDays,
  FileSpreadsheet,
  FileCheck2,
  FileClock,
  Sparkles,
  Award,
  AlertTriangle,
  HeartHandshake,
  BookOpen,
  Lock,
  PhoneCall,
  Wallet,
  Coins,
  FileText,
  History,
  ShieldCheck,
  ShieldAlert,
  X,
  Compass,
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  activeView: string;
  setActiveView: (view: string) => void;
}

interface NavItem {
  id: string;
  label: string;
  module: AppModule;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
  category: 'UTAMA' | 'KESISWAAN' | 'OSIM & EKSKUL' | 'KEDISIPLINAN & BK' | 'KEUANGAN' | 'ADMINISTRASI';
}

const ALL_NAV_ITEMS: NavItem[] = [
  // Utama
  { id: 'dashboard', label: 'Dashboard', module: 'dashboard', icon: LayoutDashboard, category: 'UTAMA' },

  // Master Data & Kesiswaan
  { id: 'school_settings', label: 'Profil Madrasah & Kop', module: 'school_settings', icon: Building, category: 'KESISWAAN' },
  { id: 'students', label: 'Data Siswa', module: 'students', icon: GraduationCap, category: 'KESISWAAN' },
  { id: 'teachers', label: 'Data Guru & Pembina', module: 'teachers', icon: Briefcase, category: 'KESISWAAN' },
  { id: 'classes', label: 'Data Kelas & Rombel', module: 'classes', icon: Layers, category: 'KESISWAAN' },
  { id: 'activities', label: 'Kegiatan Kesiswaan', module: 'activities', icon: Compass, category: 'KESISWAAN' },
  { id: 'calendar', label: 'Kalender Kegiatan', module: 'calendar', icon: CalendarDays, category: 'KESISWAAN' },
  { id: 'attendance', label: 'Presensi Kegiatan', module: 'attendance', icon: FileSpreadsheet, category: 'KESISWAAN' },
  { id: 'proposals', label: 'Pengajuan Proposal', module: 'proposals', icon: FileClock, category: 'KESISWAAN' },
  { id: 'lpj', label: 'Verifikasi LPJ', module: 'lpj', icon: FileCheck2, category: 'KESISWAAN' },

  // OSIM & Ekskul
  { id: 'osim_bph', label: 'Program Kerja OSIM', module: 'osim_bph', icon: Sparkles, category: 'OSIM & EKSKUL' },
  { id: 'osim_sekbid', label: 'Kegiatan Sekbid', module: 'osim_sekbid', icon: Layers, category: 'OSIM & EKSKUL' },
  { id: 'extracurricular', label: 'Ekstrakurikuler', module: 'extracurricular', icon: Award, category: 'OSIM & EKSKUL' },

  // Kedisiplinan & BK
  { id: 'rules', label: 'Tata Tertib 2026', module: 'rules', icon: BookOpen, category: 'KEDISIPLINAN & BK' },
  { id: 'violations', label: 'Pelanggaran & Poin', module: 'violations', icon: AlertTriangle, category: 'KEDISIPLINAN & BK' },
  { id: 'rewards', label: 'Poin Reward Siswa', module: 'rewards', icon: Award, category: 'KEDISIPLINAN & BK' },
  { id: 'guidance', label: 'Pembinaan & Sanksi', module: 'guidance', icon: HeartHandshake, category: 'KEDISIPLINAN & BK' },
  { id: 'counseling_confidential', label: 'Konseling BK (Rahasia)', module: 'counseling_confidential', icon: Lock, category: 'KEDISIPLINAN & BK', badge: 'Rahasia' },
  { id: 'parent_calls', label: 'Surat Panggilan Ortu', module: 'parent_calls', icon: PhoneCall, category: 'KEDISIPLINAN & BK' },

  // Keuangan
  { id: 'treasury_kesiswaan', label: 'Kas Kesiswaan', module: 'treasury_kesiswaan', icon: Wallet, category: 'KEUANGAN' },
  { id: 'treasury_osim', label: 'Kas OSIM', module: 'treasury_osim', icon: Coins, category: 'KEUANGAN' },

  // Administrasi & Audit
  { id: 'users', label: 'Manajemen Pengguna', module: 'users', icon: Users, category: 'ADMINISTRASI' },
  { id: 'permissions', label: 'Hak Akses / RBAC', module: 'permissions', icon: ShieldCheck, category: 'ADMINISTRASI' },
  { id: 'reports', label: 'Laporan Terpadu', module: 'reports', icon: FileText, category: 'ADMINISTRASI' },
  { id: 'audit_logs', label: 'Audit Log Aktivitas', module: 'audit_logs', icon: History, category: 'ADMINISTRASI' },
];

export const Sidebar: React.FC<SidebarProps> = ({
  isOpen,
  onClose,
  activeView,
  setActiveView,
}) => {
  const { currentUser, hasPermission } = useAuth();

  if (!currentUser) return null;

  // Filter items based on RBAC permission: user must have 'view' permission on that module
  const allowedItems = ALL_NAV_ITEMS.filter(item => {
    if (item.id === 'dashboard') return true;
    return hasPermission(item.module, 'view');
  });

  // Group by category
  const categories: Array<NavItem['category']> = [
    'UTAMA',
    'KESISWAAN',
    'OSIM & EKSKUL',
    'KEDISIPLINAN & BK',
    'KEUANGAN',
    'ADMINISTRASI',
  ];

  const roleThemeBadge = () => {
    if (currentUser.role === 'SUPER_ADMIN') {
      return { title: 'PORTAL ADMINISTRATOR', bg: 'bg-red-950/20 text-red-900 border-red-200' };
    }
    if (currentUser.role === 'WAKA_KESISWAAN') {
      return { title: 'PORTAL WAKA KESISWAAN', bg: 'bg-emerald-950/20 text-emerald-900 border-emerald-200' };
    }
    if (currentUser.role === 'GURU_BK') {
      return { title: 'PORTAL BIMBINGAN KONSELING', bg: 'bg-amber-950/20 text-amber-900 border-amber-200' };
    }
    if (currentUser.role.startsWith('PEMBINA')) {
      return { title: 'PORTAL PEMBINA MADRASAH', bg: 'bg-blue-950/20 text-blue-900 border-blue-200' };
    }
    if (currentUser.role.startsWith('BENDAHARA')) {
      return { title: 'PORTAL KEUANGAN & KAS', bg: 'bg-purple-950/20 text-purple-900 border-purple-200' };
    }
    return { title: 'PORTAL OSIM MADRASAH', bg: 'bg-teal-950/20 text-teal-900 border-teal-200' };
  };

  const themeMeta = roleThemeBadge();

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-xs lg:hidden"
        />
      )}

      {/* Sidebar container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-40 w-64 bg-slate-900 text-slate-200 flex flex-col border-r border-slate-800 transition-transform duration-200 ease-in-out lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Header Branding */}
        <div className="h-16 px-4 flex items-center justify-between border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center text-white font-bold text-sm shadow-xs">
              M2
            </div>
            <div>
              <div className="text-xs font-bold text-white tracking-wider">
                SIM KESISWAAN
              </div>
              <div className="text-[10px] text-emerald-400 font-medium">
                MAN 2 Seram Bagian Timur
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 lg:hidden"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Current Portal Theme Pill */}
        <div className="px-3 pt-3 pb-1">
          <div className={`px-2.5 py-1.5 rounded-lg border text-[11px] font-semibold tracking-wide flex items-center justify-between bg-slate-800/80 text-emerald-400 border-slate-700/60`}>
            <span>{themeMeta.title}</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
          </div>
        </div>

        {/* Navigation list */}
        <div className="flex-1 overflow-y-auto px-3 py-2 space-y-4 text-xs scrollbar-thin scrollbar-thumb-slate-700">
          {categories.map(cat => {
            const itemsInCat = allowedItems.filter(item => item.category === cat);
            if (itemsInCat.length === 0) return null;

            return (
              <div key={cat} className="space-y-1">
                <div className="px-2.5 py-1 text-[10px] font-semibold text-slate-400 tracking-wider">
                  {cat}
                </div>
                {itemsInCat.map(item => {
                  const Icon = item.icon;
                  const isActive = activeView === item.id;

                  return (
                    <button
                      key={item.id}
                      id={`nav-item-${item.id}`}
                      onClick={() => {
                        setActiveView(item.id);
                        if (window.innerWidth < 1024) {
                          onClose();
                        }
                      }}
                      className={`w-full flex items-center justify-between px-2.5 py-2 rounded-lg font-medium transition-all ${
                        isActive
                          ? 'bg-emerald-600 text-white shadow-xs'
                          : 'text-slate-300 hover:bg-slate-800/70 hover:text-white'
                      }`}
                    >
                      <div className="flex items-center gap-2.5 truncate">
                        <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                        <span className="truncate">{item.label}</span>
                      </div>
                      {item.badge && (
                        <span className="text-[10px] px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300 font-medium shrink-0 border border-amber-500/30">
                          {item.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            );
          })}
        </div>

        {/* Footer info */}
        <div className="p-3 border-t border-slate-800 text-[11px] text-slate-500 shrink-0">
          <div className="flex items-center justify-between text-slate-400 font-medium">
            <span>Versi Aplikasi</span>
            <span className="text-emerald-400 font-mono">v1.0 (Phase 1)</span>
          </div>
          <p className="text-[10px] text-slate-500 mt-0.5">
            Sistem Terproteksi RBAC & Firebase
          </p>
        </div>
      </aside>
    </>
  );
};
