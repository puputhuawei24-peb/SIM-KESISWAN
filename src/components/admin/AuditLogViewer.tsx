import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import {
  History,
  Search,
  Filter,
  Download,
  Printer,
  Calendar,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';

export const AuditLogViewer: React.FC = () => {
  const { auditLogs } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [actionFilter, setActionFilter] = useState<string>('ALL');

  const filteredLogs = auditLogs.filter(log => {
    const matchesSearch =
      log.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.userRole.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.module.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesAction = actionFilter === 'ALL' || log.action === actionFilter;
    return matchesSearch && matchesAction;
  });

  const handleExportCSV = () => {
    const headers = ['Timestamp', 'Pengguna', 'Role', 'Aksi', 'Modul', 'Deskripsi', 'Alamat IP'];
    const rows = filteredLogs.map(l => [
      `"${l.timestamp}"`,
      `"${l.userName}"`,
      `"${l.userRole}"`,
      `"${l.action}"`,
      `"${l.module}"`,
      `"${l.description.replace(/"/g, '""')}"`,
      `"${l.ipAddress || '-'}"`,
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `audit_log_man2sbt_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-slate-700 text-xs font-bold uppercase tracking-wider mb-1">
            <History className="w-4 h-4 text-emerald-700" />
            <span>AKUNTABILITAS & KEAMANAN SISTEM</span>
          </div>
          <h1 className="text-xl font-bold text-slate-900">
            Audit Log Aktivitas & Jejak Forensik
          </h1>
          <p className="text-xs text-slate-500 mt-1 max-w-2xl">
            Catatan kronologis immutable setiap operasi login, modifikasi data, approval, perubahan permission, dan transaksi keuangan untuk kepatuhan tata kelola madrasah.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleExportCSV}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold shadow-xs transition-colors cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 text-slate-500" />
            <span>Ekspor CSV</span>
          </button>
          <button
            onClick={handlePrint}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Cetak Log</span>
          </button>
        </div>
      </div>

      {/* Filter and Search */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Cari nama, aktivitas, modul..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 rounded-lg border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Filter className="w-4 h-4 text-slate-400 shrink-0" />
          <select
            value={actionFilter}
            onChange={e => setActionFilter(e.target.value)}
            className="px-3 py-1.5 rounded-lg border border-slate-200 text-xs text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            <option value="ALL">Semua Jenis Aksi</option>
            <option value="LOGIN">LOGIN</option>
            <option value="LOGOUT">LOGOUT</option>
            <option value="CREATE">CREATE</option>
            <option value="UPDATE">UPDATE</option>
            <option value="DELETE">DELETE</option>
            <option value="PERMISSION_CHANGE">PERMISSION_CHANGE</option>
          </select>
        </div>
      </div>

      {/* Log Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 font-bold uppercase tracking-wider text-[11px]">
              <tr>
                <th className="py-3 px-4 min-w-[150px]">Waktu (WIT)</th>
                <th className="py-3 px-3 min-w-[180px]">Pengguna & Role</th>
                <th className="py-3 px-3 text-center min-w-[110px]">Jenis Aksi</th>
                <th className="py-3 px-3 min-w-[110px]">Modul</th>
                <th className="py-3 px-4 min-w-[260px]">Deskripsi Aktivitas</th>
                <th className="py-3 px-3 min-w-[110px]">Alamat IP</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredLogs.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-10 text-center text-slate-400">
                    Belum ada log yang sesuai dengan filter pencarian.
                  </td>
                </tr>
              ) : (
                filteredLogs.map(log => {
                  const dateStr = new Date(log.timestamp).toLocaleString('id-ID', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit',
                  });

                  const actionBadgeColor = () => {
                    switch (log.action) {
                      case 'LOGIN':
                        return 'bg-blue-50 text-blue-700 border-blue-200';
                      case 'LOGOUT':
                        return 'bg-slate-100 text-slate-700 border-slate-200';
                      case 'CREATE':
                        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
                      case 'UPDATE':
                        return 'bg-amber-50 text-amber-700 border-amber-200';
                      case 'DELETE':
                        return 'bg-red-50 text-red-700 border-red-200';
                      case 'PERMISSION_CHANGE':
                        return 'bg-purple-50 text-purple-700 border-purple-200';
                      default:
                        return 'bg-slate-50 text-slate-700 border-slate-200';
                    }
                  };

                  return (
                    <tr key={log.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-3 px-4 text-slate-600 font-mono text-[11px]">
                        {dateStr} WIT
                      </td>
                      <td className="py-3 px-3">
                        <div className="font-semibold text-slate-900">{log.userName}</div>
                        <div className="text-[10px] text-slate-500">{log.userRole}</div>
                      </td>
                      <td className="py-3 px-3 text-center">
                        <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold border ${actionBadgeColor()}`}>
                          {log.action}
                        </span>
                      </td>
                      <td className="py-3 px-3">
                        <span className="font-mono text-[11px] text-slate-600 bg-slate-100 px-1.5 py-0.5 rounded">
                          {log.module}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-slate-700">
                        {log.description}
                      </td>
                      <td className="py-3 px-3 font-mono text-[11px] text-slate-500">
                        {log.ipAddress || 'Internal'}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        <div className="p-4 bg-slate-50 border-t border-slate-200 text-[11px] text-slate-500 flex items-center justify-between">
          <span>Menampilkan {filteredLogs.length} catatan audit log</span>
          <span className="flex items-center gap-1.5 text-emerald-700 font-medium">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Integritas Log Terjamin (Anti-Tamper)</span>
          </span>
        </div>
      </div>
    </div>
  );
};
