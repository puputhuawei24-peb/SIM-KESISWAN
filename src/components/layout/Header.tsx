import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { UserRole } from '../../types/auth';
import {
  Bell,
  ShieldCheck,
  LogOut,
  UserCheck,
  ChevronDown,
  Building2,
  Menu,
  Sparkles,
} from 'lucide-react';

interface HeaderProps {
  onToggleSidebar: () => void;
  activeView: string;
}

const ROLE_LABELS: Record<UserRole, { label: string; badgeColor: string }> = {
  SUPER_ADMIN: { label: 'Super Admin', badgeColor: 'bg-red-50 text-red-700 border-red-200' },
  WAKA_KESISWAAN: { label: 'Waka Kesiswaan', badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
  GURU_BK: { label: 'Guru BK', badgeColor: 'bg-amber-50 text-amber-700 border-amber-200' },
  PEMBINA_OSIM: { label: 'Pembina OSIM', badgeColor: 'bg-blue-50 text-blue-700 border-blue-200' },
  PEMBINA_EKSKUL: { label: 'Pembina Ekskul', badgeColor: 'bg-indigo-50 text-indigo-700 border-indigo-200' },
  BPH_OSIM: { label: 'BPH OSIM', badgeColor: 'bg-teal-50 text-teal-700 border-teal-200' },
  SEKBID_1: { label: 'Sekbid 1 (Agama)', badgeColor: 'bg-cyan-50 text-cyan-700 border-cyan-200' },
  SEKBID_2: { label: 'Sekbid 2 (Budi Pekerti)', badgeColor: 'bg-cyan-50 text-cyan-700 border-cyan-200' },
  SEKBID_3: { label: 'Sekbid 3 (Kebangsaan)', badgeColor: 'bg-cyan-50 text-cyan-700 border-cyan-200' },
  SEKBID_4: { label: 'Sekbid 4 (Prestasi)', badgeColor: 'bg-cyan-50 text-cyan-700 border-cyan-200' },
  SEKBID_5: { label: 'Sekbid 5 (Demokrasi)', badgeColor: 'bg-cyan-50 text-cyan-700 border-cyan-200' },
  SEKBID_6: { label: 'Sekbid 6 (Kreativitas)', badgeColor: 'bg-cyan-50 text-cyan-700 border-cyan-200' },
  SEKBID_7: { label: 'Sekbid 7 (Jasmani)', badgeColor: 'bg-cyan-50 text-cyan-700 border-cyan-200' },
  SEKBID_8: { label: 'Sekbid 8 (Sastra/Digital)', badgeColor: 'bg-cyan-50 text-cyan-700 border-cyan-200' },
  BENDAHARA_KESISWAAN: { label: 'Bendahara Kesiswaan', badgeColor: 'bg-purple-50 text-purple-700 border-purple-200' },
  BENDAHARA_OSIM: { label: 'Bendahara OSIM', badgeColor: 'bg-violet-50 text-violet-700 border-violet-200' },
};

export const Header: React.FC<HeaderProps> = ({ onToggleSidebar }) => {
  const { currentUser, users, switchUser, logout } = useAuth();
  const [showSwitchDropdown, setShowSwitchDropdown] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  if (!currentUser) return null;

  const currentRoleMeta = ROLE_LABELS[currentUser.role] || {
    label: currentUser.role,
    badgeColor: 'bg-slate-50 text-slate-700 border-slate-200',
  };

  return (
    <header className="sticky top-0 z-30 bg-white border-b border-slate-200 shadow-xs">
      <div className="px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Left: Mobile Toggle & Madrasah Info */}
        <div className="flex items-center gap-3">
          <button
            id="btn-toggle-sidebar"
            onClick={onToggleSidebar}
            className="p-2 -ml-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
            title="Buka / Tutup Menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-700 flex items-center justify-center text-white font-bold text-xs shadow-xs">
              <Building2 className="w-4 h-4" />
            </div>
            <div className="hidden sm:block">
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-semibold uppercase tracking-wider text-emerald-800">
                  MAN 2 Seram Bagian Timur
                </span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-100/80 text-emerald-800 font-medium">
                  KEMENAG RI
                </span>
              </div>
              <p className="text-xs text-slate-500 font-normal">
                SIM Kesiswaan • Tahun Ajaran 2025/2026
              </p>
            </div>
          </div>
        </div>

        {/* Right: Quick Role Switcher, Notifications, User Menu */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Quick Role Switcher Dropdown (Phase 1 Testing Matrix) */}
          <div className="relative">
            <button
              id="btn-role-switcher"
              onClick={() => setShowSwitchDropdown(!showSwitchDropdown)}
              className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-medium transition-colors"
              title="Ganti akun untuk menguji hak akses (RBAC Testing)"
            >
              <UserCheck className="w-3.5 h-3.5 text-emerald-700" />
              <span className="hidden md:inline">Uji Role:</span>
              <span className="font-semibold text-slate-900 truncate max-w-[130px]">
                {currentRoleMeta.label}
              </span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </button>

            {showSwitchDropdown && (
              <div className="absolute right-0 mt-2 w-72 bg-white rounded-xl border border-slate-200 shadow-xl py-2 z-50 animate-in fade-in zoom-in-95 duration-100 max-h-96 overflow-y-auto">
                <div className="px-3 py-1.5 border-b border-slate-100 mb-1">
                  <div className="flex items-center gap-1.5 text-emerald-700 text-xs font-bold">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Uji Hak Akses 16 Role (Phase 1)</span>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    Pilih salah satu profil untuk memverifikasi isolasi menu & permission RBAC
                  </p>
                </div>
                {users.map(u => (
                  <button
                    key={u.uid}
                    id={`btn-select-user-${u.uid}`}
                    onClick={() => {
                      switchUser(u.uid);
                      setShowSwitchDropdown(false);
                    }}
                    className={`w-full text-left px-3 py-2 text-xs flex items-start gap-2.5 hover:bg-slate-50 transition-colors ${
                      u.uid === currentUser.uid ? 'bg-emerald-50/60 font-medium' : ''
                    }`}
                  >
                    <div className="w-6 h-6 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                      {u.displayName.charAt(0)}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-slate-900 font-medium truncate">{u.displayName}</div>
                      <div className="text-[11px] text-slate-500 truncate">{u.positionTitle}</div>
                      <span className={`inline-block text-[10px] px-1.5 py-0.2 rounded border mt-0.5 ${ROLE_LABELS[u.role]?.badgeColor || ''}`}>
                        {ROLE_LABELS[u.role]?.label || u.role}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Notifications Notification preview */}
          <div className="relative">
            <button
              id="btn-notifications"
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
              title="Notifikasi"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-emerald-600 ring-2 ring-white"></span>
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl border border-slate-200 shadow-xl p-3 z-50">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <span className="text-xs font-semibold text-slate-900">Notifikasi Sistem</span>
                  <span className="text-[10px] text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded font-medium">3 Baru</span>
                </div>
                <div className="space-y-2 mt-2">
                  <div className="p-2 rounded-lg bg-slate-50 text-xs">
                    <p className="font-medium text-slate-900">Sistem SIM Kesiswaan Diinisialisasi</p>
                    <p className="text-[11px] text-slate-500 mt-0.5">Phase 1 Foundation RBAC MAN 2 SBT aktif.</p>
                  </div>
                  <div className="p-2 rounded-lg bg-slate-50 text-xs">
                    <p className="font-medium text-slate-900">Audit Log Aktif</p>
                    <p className="text-[11px] text-slate-500 mt-0.5">Seluruh login & perubahan izin tercatat secara otomatis.</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Current User Pill & Logout */}
          <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
            <div className="text-right hidden sm:block">
              <div className="text-xs font-semibold text-slate-900 truncate max-w-[140px]">
                {currentUser.displayName}
              </div>
              <div className="text-[11px] text-slate-500 truncate">
                {currentUser.identifierNumber ? `${currentUser.role.includes('OSIM') ? 'NISN' : 'NIP'}: ${currentUser.identifierNumber}` : currentUser.email}
              </div>
            </div>

            <button
              id="btn-logout"
              onClick={logout}
              className="p-2 rounded-lg text-slate-500 hover:text-red-600 hover:bg-red-50 transition-colors"
              title="Keluar (Logout)"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
