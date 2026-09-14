import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { AppModule } from '../../types/auth';
import {
  Clock,
  ShieldCheck,
  CheckCircle2,
  Lock,
  Sparkles,
  ArrowRight,
} from 'lucide-react';

interface PhasePlaceholderProps {
  module: AppModule;
  title: string;
  targetPhase: string;
  description: string;
  onBackToDashboard: () => void;
}

export const PhasePlaceholder: React.FC<PhasePlaceholderProps> = ({
  module,
  title,
  targetPhase,
  description,
  onBackToDashboard,
}) => {
  const { currentUser, hasPermission } = useAuth();

  const permissions = [
    { key: 'view', label: 'View (Lihat Data)', allowed: hasPermission(module, 'view') },
    { key: 'create', label: 'Create (Tambah Baru)', allowed: hasPermission(module, 'create') },
    { key: 'edit', label: 'Edit (Ubah Data)', allowed: hasPermission(module, 'edit') },
    { key: 'delete', label: 'Delete (Hapus Data)', allowed: hasPermission(module, 'delete') },
    { key: 'approve', label: 'Approve (Persetujuan)', allowed: hasPermission(module, 'approve') },
    { key: 'print', label: 'Print (Cetak Dokumen)', allowed: hasPermission(module, 'print') },
    { key: 'export', label: 'Export (Unduh Data)', allowed: hasPermission(module, 'export') },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-emerald-700 text-xs font-bold uppercase tracking-wider mb-1">
            <Sparkles className="w-4 h-4" />
            <span>MODUL TERVALIDASI DALAM ARSITEKTUR RBAC</span>
          </div>
          <h1 className="text-xl font-bold text-slate-900">{title}</h1>
          <p className="text-xs text-slate-500 mt-1 max-w-2xl">{description}</p>
        </div>
        <button
          onClick={onBackToDashboard}
          className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer"
        >
          <span>Kembali ke Dashboard</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Roadmap & Permission Card */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Phase Roadmap Status */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
            <Clock className="w-4 h-4 text-emerald-600" />
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-800">
              Jadwal Pembangunan Bertahap (Master Prompt Roadmap)
            </h2>
          </div>

          <div className="p-4 rounded-xl bg-emerald-50/70 border border-emerald-200 text-emerald-950 text-xs space-y-2">
            <div className="flex items-center justify-between font-bold">
              <span>Target Implementasi Penuh:</span>
              <span className="px-2.5 py-1 rounded-full bg-emerald-700 text-white text-[11px]">
                {targetPhase}
              </span>
            </div>
            <p className="text-emerald-800 leading-relaxed">
              Sesuai dengan instruksi ketat Master Prompt Bagian 47 & 55, sistem saat ini berada di <strong className="font-semibold">PHASE 1 — FOUNDATION</strong> (Fokus: Autentikasi, 16 Role, dynamic RBAC, layout admin/guru/OSIM, dan dashboard dasar).
            </p>
            <p className="text-emerald-800 leading-relaxed">
              Fitur CRUD lengkap untuk modul ini telah terpetakan dalam skema database (<code className="bg-emerald-100 px-1 py-0.5 rounded font-mono text-[11px]">firebase-blueprint.json</code>) serta hak aksesnya telah dikunci melalui <strong className="font-semibold">Firestore Security Rules</strong> dan akan aktif secara bertahap saat masuk ke tahapan tersebut.
            </p>
          </div>
        </div>

        {/* Current Role Access Status for this Module */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-800">
              Hak Akses Role Anda ({currentUser?.role})
            </h2>
          </div>

          <div className="space-y-2">
            {permissions.map(p => (
              <div
                key={p.key}
                className="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-100 text-xs"
              >
                <span className="text-slate-700 font-medium">{p.label}</span>
                {p.allowed ? (
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>Diizinkan</span>
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-slate-500 bg-slate-200 px-2 py-0.5 rounded">
                    <Lock className="w-3 h-3" />
                    <span>Terkunci</span>
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
