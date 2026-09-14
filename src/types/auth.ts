export type UserRole =
  | 'SUPER_ADMIN'
  | 'WAKA_KESISWAAN'
  | 'GURU_BK'
  | 'PEMBINA_OSIM'
  | 'PEMBINA_EKSKUL'
  | 'BPH_OSIM'
  | 'SEKBID_1'
  | 'SEKBID_2'
  | 'SEKBID_3'
  | 'SEKBID_4'
  | 'SEKBID_5'
  | 'SEKBID_6'
  | 'SEKBID_7'
  | 'SEKBID_8'
  | 'BENDAHARA_KESISWAAN'
  | 'BENDAHARA_OSIM';

export type AppPermissionAction = 'view' | 'create' | 'edit' | 'delete' | 'approve' | 'print' | 'export';

export type AppModule =
  | 'dashboard'
  | 'users'
  | 'school_settings'
  | 'students'
  | 'teachers'
  | 'classes'
  | 'activities'
  | 'calendar'
  | 'attendance'
  | 'proposals'
  | 'lpj'
  | 'osim_bph'
  | 'osim_sekbid'
  | 'extracurricular'
  | 'rules'
  | 'violations'
  | 'rewards'
  | 'guidance'
  | 'counseling_confidential'
  | 'parent_calls'
  | 'treasury_kesiswaan'
  | 'treasury_osim'
  | 'reports'
  | 'audit_logs'
  | 'permissions';

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  role: UserRole;
  identifierNumber: string; // NIP for teachers, NISN for students
  positionTitle: string;
  avatarUrl?: string;
  assignedSekbid?: number; // 1 - 8 if role is SEKBID_*
  assignedEkskulId?: string; // If role is PEMBINA_EKSKUL
  phoneNumber?: string;
  isActive: boolean;
  createdAt: string;
  lastLoginAt?: string;
}

export interface RolePermissionsMap {
  [role: string]: {
    [module in AppModule]?: {
      view: boolean;
      create: boolean;
      edit: boolean;
      delete: boolean;
      approve: boolean;
      print: boolean;
      export: boolean;
    };
  };
}

export interface AuditLogEntry {
  id: string;
  timestamp: string;
  userId: string;
  userName: string;
  userRole: UserRole;
  action: 'LOGIN' | 'LOGOUT' | 'CREATE' | 'UPDATE' | 'DELETE' | 'APPROVE' | 'REJECT' | 'PRINT' | 'EXPORT' | 'PERMISSION_CHANGE';
  module: AppModule;
  recordId?: string;
  description: string;
  ipAddress?: string;
}
