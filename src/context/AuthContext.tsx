import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserProfile, UserRole, AppModule, AppPermissionAction, RolePermissionsMap, AuditLogEntry } from '../types/auth';
import { INITIAL_USERS, INITIAL_AUDIT_LOGS } from '../data/mockUsers';
import { DEFAULT_PERMISSIONS } from '../data/defaultPermissions';

interface AuthContextType {
  currentUser: UserProfile | null;
  users: UserProfile[];
  permissions: RolePermissionsMap;
  auditLogs: AuditLogEntry[];
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password?: string) => Promise<boolean>;
  loginAsRole: (role: UserRole) => void;
  switchUser: (uid: string) => void;
  logout: () => void;
  hasPermission: (module: AppModule, action: AppPermissionAction) => boolean;
  updatePermission: (role: UserRole, module: AppModule, action: AppPermissionAction, value: boolean) => void;
  resetPermissions: () => void;
  addAuditLog: (action: AuditLogEntry['action'], module: AppModule, description: string, recordId?: string) => void;
  createUser: (userData: Omit<UserProfile, 'uid' | 'createdAt'>) => void;
  updateUser: (uid: string, updates: Partial<UserProfile>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const STORAGE_KEY_USER = 'sim_kesiswaan_user_session';
const STORAGE_KEY_PERMISSIONS = 'sim_kesiswaan_permissions';
const STORAGE_KEY_USERS = 'sim_kesiswaan_users_db';
const STORAGE_KEY_AUDIT = 'sim_kesiswaan_audit_logs';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [users, setUsers] = useState<UserProfile[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_USERS);
      return saved ? JSON.parse(saved) : INITIAL_USERS;
    } catch {
      return INITIAL_USERS;
    }
  });

  const [permissions, setPermissions] = useState<RolePermissionsMap>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_PERMISSIONS);
      return saved ? JSON.parse(saved) : DEFAULT_PERMISSIONS;
    } catch {
      return DEFAULT_PERMISSIONS;
    }
  });

  const [auditLogs, setAuditLogs] = useState<AuditLogEntry[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_AUDIT);
      return saved ? JSON.parse(saved) : INITIAL_AUDIT_LOGS;
    } catch {
      return INITIAL_AUDIT_LOGS;
    }
  });

  const [currentUser, setCurrentUser] = useState<UserProfile | null>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_USER);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // fallback
    }
    // Default to Super Admin so preview immediately opens in active state
    return INITIAL_USERS[0];
  });

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(currentUser));
    } else {
      localStorage.removeItem(STORAGE_KEY_USER);
    }
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_PERMISSIONS, JSON.stringify(permissions));
  }, [permissions]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_USERS, JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_AUDIT, JSON.stringify(auditLogs));
  }, [auditLogs]);

  const addAuditLog = (
    action: AuditLogEntry['action'],
    module: AppModule,
    description: string,
    recordId?: string
  ) => {
    const newLog: AuditLogEntry = {
      id: `log_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      timestamp: new Date().toISOString(),
      userId: currentUser?.uid || 'anonymous',
      userName: currentUser?.displayName || 'Tamu / Sistem',
      userRole: currentUser?.role || 'SUPER_ADMIN',
      action,
      module,
      recordId,
      description,
      ipAddress: '180.254.120.' + Math.floor(Math.random() * 200 + 10),
    };
    setAuditLogs(prev => [newLog, ...prev]);
  };

  const login = async (email: string): Promise<boolean> => {
    setIsLoading(true);
    // Simulate brief network verification
    await new Promise(r => setTimeout(r, 250));
    const target = users.find(u => u.email.toLowerCase() === email.trim().toLowerCase());
    if (target && target.isActive) {
      setCurrentUser(target);
      addAuditLog('LOGIN', 'dashboard', `Pengguna ${target.displayName} (${target.role}) berhasil masuk ke sistem`);
      setIsLoading(false);
      return true;
    }
    setIsLoading(false);
    return false;
  };

  const loginAsRole = (role: UserRole) => {
    const target = users.find(u => u.role === role);
    if (target) {
      setCurrentUser(target);
      addAuditLog('LOGIN', 'dashboard', `Berganti sesi ke role ${role}: ${target.displayName}`);
    }
  };

  const switchUser = (uid: string) => {
    const target = users.find(u => u.uid === uid);
    if (target) {
      setCurrentUser(target);
      addAuditLog('LOGIN', 'dashboard', `Beralih akun ke ${target.displayName} (${target.role})`);
    }
  };

  const logout = () => {
    if (currentUser) {
      addAuditLog('LOGOUT', 'dashboard', `Pengguna ${currentUser.displayName} telah keluar dari sistem`);
    }
    setCurrentUser(null);
  };

  const hasPermission = (module: AppModule, action: AppPermissionAction): boolean => {
    if (!currentUser) return false;
    // Super admin has full control across almost everything except strictly secret BK counseling
    if (currentUser.role === 'SUPER_ADMIN') {
      if (module === 'counseling_confidential') return false; // Strict privacy rule
      return true;
    }

    const rolePerms = permissions[currentUser.role];
    if (!rolePerms) return false;

    const modulePerms = rolePerms[module];
    if (!modulePerms) return false;

    return !!modulePerms[action];
  };

  const updatePermission = (
    role: UserRole,
    module: AppModule,
    action: AppPermissionAction,
    value: boolean
  ) => {
    setPermissions(prev => {
      const updated = { ...prev };
      if (!updated[role]) {
        updated[role] = {};
      }
      const existingModule = updated[role]![module] || {
        view: false,
        create: false,
        edit: false,
        delete: false,
        approve: false,
        print: false,
        export: false,
      };
      updated[role]![module] = {
        ...existingModule,
        [action]: value,
      };
      return updated;
    });

    addAuditLog(
      'PERMISSION_CHANGE',
      'permissions',
      `Izin [${action.toUpperCase()}] pada modul [${module}] untuk role [${role}] diubah menjadi: ${value ? 'AKTIF' : 'NONAKTIF'}`
    );
  };

  const resetPermissions = () => {
    setPermissions(DEFAULT_PERMISSIONS);
    addAuditLog('PERMISSION_CHANGE', 'permissions', 'Matriks hak akses sistem diatur ulang ke standar default');
  };

  const createUser = (userData: Omit<UserProfile, 'uid' | 'createdAt'>) => {
    const newUser: UserProfile = {
      ...userData,
      uid: `usr_${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    setUsers(prev => [newUser, ...prev]);
    addAuditLog('CREATE', 'users', `Akun baru dibuat: ${newUser.displayName} (${newUser.role})`, newUser.uid);
  };

  const updateUser = (uid: string, updates: Partial<UserProfile>) => {
    setUsers(prev =>
      prev.map(u => {
        if (u.uid === uid) {
          const updated = { ...u, ...updates };
          if (currentUser?.uid === uid) {
            setCurrentUser(updated);
          }
          return updated;
        }
        return u;
      })
    );
    addAuditLog('UPDATE', 'users', `Data pengguna ID ${uid} diperbarui`, uid);
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        users,
        permissions,
        auditLogs,
        isAuthenticated: !!currentUser,
        isLoading,
        login,
        loginAsRole,
        switchUser,
        logout,
        hasPermission,
        updatePermission,
        resetPermissions,
        addAuditLog,
        createUser,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
