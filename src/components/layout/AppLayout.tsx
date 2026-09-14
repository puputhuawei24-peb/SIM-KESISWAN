import React, { useState } from 'react';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { useAuth } from '../../context/AuthContext';
import { AdminDashboard } from '../dashboard/AdminDashboard';
import { WakaDashboard } from '../dashboard/WakaDashboard';
import { PembinaDashboard } from '../dashboard/PembinaDashboard';
import { OsimDashboard } from '../dashboard/OsimDashboard';
import { BKDashboard } from '../dashboard/BKDashboard';
import { BendaharaDashboard } from '../dashboard/BendaharaDashboard';
import { PermissionMatrix } from '../admin/PermissionMatrix';
import { AuditLogViewer } from '../admin/AuditLogViewer';
import { UserManagement } from '../admin/UserManagement';
import { PhasePlaceholder } from '../common/PhasePlaceholder';
import { AppModule } from '../../types/auth';

export const AppLayout: React.FC = () => {
  const { currentUser, hasPermission } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeView, setActiveView] = useState<string>('dashboard');

  if (!currentUser) return null;

  // Render role-appropriate dashboard when activeView is 'dashboard'
  const renderDashboard = () => {
    switch (currentUser.role) {
      case 'SUPER_ADMIN':
        return <AdminDashboard onNavigate={setActiveView} />;
      case 'WAKA_KESISWAAN':
        return <WakaDashboard onNavigate={setActiveView} />;
      case 'GURU_BK':
        return <BKDashboard onNavigate={setActiveView} />;
      case 'PEMBINA_OSIM':
      case 'PEMBINA_EKSKUL':
        return <PembinaDashboard onNavigate={setActiveView} />;
      case 'BENDAHARA_KESISWAAN':
      case 'BENDAHARA_OSIM':
        return <BendaharaDashboard onNavigate={setActiveView} />;
      case 'BPH_OSIM':
      default:
        // Sekbid 1 - 8 & BPH OSIM
        return <OsimDashboard onNavigate={setActiveView} />;
    }
  };

  // Render content based on activeView
  const renderContent = () => {
    // Check permission if viewing non-dashboard module
    if (activeView !== 'dashboard') {
      const allowed = hasPermission(activeView as AppModule, 'view');
      if (!allowed) {
        return (
          <div className="bg-white p-8 rounded-2xl border border-red-200 shadow-xs text-center max-w-lg mx-auto mt-10">
            <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto mb-3 font-bold text-lg">
              ⛔
            </div>
            <h2 className="text-base font-bold text-slate-900">Akses Ditolak (RBAC Restriction)</h2>
            <p className="text-xs text-slate-600 mt-2">
              Anda tidak memiliki izin (permission <code className="font-mono text-red-600 font-bold">view</code>) untuk mengakses modul <strong className="text-slate-800">{activeView}</strong> dengan role <strong className="text-slate-800">{currentUser.role}</strong>.
            </p>
            <button
              onClick={() => setActiveView('dashboard')}
              className="mt-5 px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800 cursor-pointer"
            >
              Kembali ke Dashboard
            </button>
          </div>
        );
      }
    }

    switch (activeView) {
      case 'dashboard':
        return renderDashboard();
      case 'permissions':
        return <PermissionMatrix />;
      case 'audit_logs':
        return <AuditLogViewer />;
      case 'users':
        return <UserManagement />;

      // Modules with Phase Placeholders
      case 'school_settings':
        return (
          <PhasePlaceholder
            module="school_settings"
            title="Profil Madrasah, Logo & Kop Surat"
            targetPhase="PHASE 2 — MASTER DATA"
            description="Konfigurasi identitas madrasah, upload logo Kemenag & logo sekolah, serta format kop surat resmi otomatis."
            onBackToDashboard={() => setActiveView('dashboard')}
          />
        );
      case 'students':
        return (
          <PhasePlaceholder
            module="students"
            title="Manajemen Data Siswa Madrasah"
            targetPhase="PHASE 2 — MASTER DATA"
            description="Pengelolaan data siswa (NIS, NISN, nama, jenis kelamin, kelas, kontak orang tua, filter rombel, import/export)."
            onBackToDashboard={() => setActiveView('dashboard')}
          />
        );
      case 'teachers':
        return (
          <PhasePlaceholder
            module="teachers"
            title="Data Guru & Pembina Madrasah"
            targetPhase="PHASE 2 — MASTER DATA"
            description="Pendataan dewan guru, wali kelas, pembina OSIM, pembina ekstrakurikuler, dan konselor BK."
            onBackToDashboard={() => setActiveView('dashboard')}
          />
        );
      case 'classes':
        return (
          <PhasePlaceholder
            module="classes"
            title="Data Kelas & Rombongan Belajar (Rombel)"
            targetPhase="PHASE 2 — MASTER DATA"
            description="Pengaturan kelas tingkat X, XI, XII dan pemetaan wali kelas tahun ajaran 2025/2026."
            onBackToDashboard={() => setActiveView('dashboard')}
          />
        );
      case 'activities':
        return (
          <PhasePlaceholder
            module="activities"
            title="Kegiatan Kesiswaan & Dokumentasi"
            targetPhase="PHASE 3 — KEGIATAN"
            description="Pengelolaan kegiatan, alur status (Draft, Diajukan, Disetujui, Berjalan, Selesai), anggaran, dan dokumentasi."
            onBackToDashboard={() => setActiveView('dashboard')}
          />
        );
      case 'calendar':
        return (
          <PhasePlaceholder
            module="calendar"
            title="Kalender Interaktif Kegiatan"
            targetPhase="PHASE 3 — KEGIATAN"
            description="Visualisasi kalender kegiatan OSIM, ekstrakurikuler, lomba, pembinaan, dan PHBI."
            onBackToDashboard={() => setActiveView('dashboard')}
          />
        );
      case 'attendance':
        return (
          <PhasePlaceholder
            module="attendance"
            title="Presensi Kegiatan & Kehadiran"
            targetPhase="PHASE 3 — KEGIATAN"
            description="Sistem absensi (Hadir, Izin, Sakit, Alpa), rekapitulasi otomatis, persentase kehadiran, dan timestamp."
            onBackToDashboard={() => setActiveView('dashboard')}
          />
        );
      case 'proposals':
        return (
          <PhasePlaceholder
            module="proposals"
            title="Alur Pengajuan & Verifikasi Proposal"
            targetPhase="PHASE 3 — KEGIATAN"
            description="Workflow multi-tingkat: Draf → Diajukan → Review Pembina (Revisi/Setuju) → Otorisasi Waka Kesiswaan."
            onBackToDashboard={() => setActiveView('dashboard')}
          />
        );
      case 'lpj':
        return (
          <PhasePlaceholder
            module="lpj"
            title="Laporan Pertanggungjawaban (LPJ) Kegiatan"
            targetPhase="PHASE 3 — KEGIATAN"
            description="Realisasi kegiatan, data peserta, dokumentasi, hasil evaluasi, dan lampiran keuangan."
            onBackToDashboard={() => setActiveView('dashboard')}
          />
        );
      case 'osim_bph':
      case 'osim_sekbid':
        return (
          <PhasePlaceholder
            module="osim_bph"
            title="Organisasi Siswa Intra Madrasah (OSIM)"
            targetPhase="PHASE 4 — OSIM"
            description="Program kerja BPH, kegiatan terisolasi Sekbid 1 s/d 8, kalender OSIM, dan pengawasan Pembina OSIM."
            onBackToDashboard={() => setActiveView('dashboard')}
          />
        );
      case 'extracurricular':
        return (
          <PhasePlaceholder
            module="extracurricular"
            title="Ekstrakurikuler MAN 2 SBT"
            targetPhase="PHASE 5 — EKSTRAKURIKULER"
            description="Data ekskul (Pramuka, PMR, Paskibra, Seni, Olahraga), jadwal pembina, nilai ekskul, dan prestasi."
            onBackToDashboard={() => setActiveView('dashboard')}
          />
        );
      case 'rules':
      case 'violations':
      case 'rewards':
      case 'guidance':
      case 'counseling_confidential':
      case 'parent_calls':
        return (
          <PhasePlaceholder
            module="rules"
            title="Tata Tertib, Kedisiplinan & Bimbingan Konseling"
            targetPhase="PHASE 6 — TATA TERTIB + BK"
            description="Sistem poin pelanggaran buku tata tertib 2026, reward pengurang poin, tahapan SP, surat panggilan orang tua, dan catatan konseling rahasia BK."
            onBackToDashboard={() => setActiveView('dashboard')}
          />
        );
      case 'treasury_kesiswaan':
      case 'treasury_osim':
        return (
          <PhasePlaceholder
            module="treasury_kesiswaan"
            title="Kas Kesiswaan & Kas OSIM"
            targetPhase="PHASE 7 — KAS"
            description="Pemisahan kas kesiswaan dan kas OSIM, otorisasi bendahara guru vs bendahara siswa, buku kas, dan bukti transaksi."
            onBackToDashboard={() => setActiveView('dashboard')}
          />
        );
      case 'reports':
        return (
          <PhasePlaceholder
            module="reports"
            title="Pusat Laporan & Cetak Dokumen Resmi"
            targetPhase="PHASE 8 — REPORTING"
            description="Laporan siswa, pelanggaran, reward, kas, proposal, export PDF ber-kop surat resmi dan tanda tangan pejabat."
            onBackToDashboard={() => setActiveView('dashboard')}
          />
        );
      default:
        return renderDashboard();
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col antialiased">
      {/* Sidebar Navigation */}
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        activeView={activeView}
        setActiveView={setActiveView}
      />

      {/* Main Content Area */}
      <div className="lg:pl-64 flex flex-col flex-1">
        <Header
          onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
          activeView={activeView}
        />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};
