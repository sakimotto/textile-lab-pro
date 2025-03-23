// Common types for the Textile Testing Laboratory Application

// User related types
export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  department: string;
  permissions: string[];
  lastLogin: Date;
}

export enum UserRole {
  ADMIN = 'admin',
  MANAGER = 'manager',
  TECHNICIAN = 'technician',
  AUDITOR = 'auditor',
  CLIENT = 'client'
}

// Test Method related types
export interface TestMethod {
  id: string;
  name: string;
  description: string;
  version: string;
  status: MethodStatus;
  industry: Industry[];
  standardReference: string[];
  parameters: TestParameter[];
  steps: TestStep[];
  equipment: string[];
  materials: string[];
  createdBy: string;
  approvedBy: string;
  createdAt: Date;
  updatedAt: Date;
  complianceInfo: Record<string, any>;
}

export enum MethodStatus {
  DRAFT = 'draft',
  REVIEW = 'review',
  APPROVED = 'approved',
  DEPRECATED = 'deprecated'
}

export interface TestParameter {
  id: string;
  name: string;
  unit: string;
  defaultValue: number;
  minValue: number;
  maxValue: number;
  required: boolean;
}

export interface TestStep {
  id: string;
  order: number;
  description: string;
  duration: number;
  parameters: Record<string, any>;
}

// Job related types
export interface Job {
  id: string;
  title: string;
  description: string;
  status: JobStatus;
  priority: number;
  testMethod: string;
  parameters: Record<string, any>;
  scheduledStart: Date;
  scheduledEnd: Date;
  actualStart: Date | null;
  actualEnd: Date | null;
  equipment: string;
  technician: string;
  samples: Sample[];
  results: Record<string, any> | null;
  notes: Note[];
  attachments: Attachment[];
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}

export enum JobStatus {
  SCHEDULED = 'scheduled',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
  FAILED = 'failed',
  CANCELLED = 'cancelled'
}

export interface Sample {
  id: string;
  name: string;
  material: string;
  dimensions: Record<string, number>;
  preparation: string;
  notes: string;
}

export interface Note {
  id: string;
  content: string;
  createdBy: string;
  createdAt: Date;
}

export interface Attachment {
  id: string;
  name: string;
  type: string;
  url: string;
  createdBy: string;
  createdAt: Date;
}

// Equipment related types
export interface Equipment {
  id: string;
  name: string;
  model: string;
  manufacturer: string;
  type: string;
  location: string;
  status: EquipmentStatus;
  capabilities: string[];
  calibrationStatus: CalibrationStatus;
  lastCalibration: Date;
  nextCalibration: Date;
  maintenanceHistory: MaintenanceRecord[];
  specifications: Record<string, any>;
  connectionDetails: Record<string, any>;
  purchaseDate: Date;
  warrantyExpiration: Date;
}

export enum EquipmentStatus {
  OPERATIONAL = 'operational',
  MAINTENANCE = 'maintenance',
  OUT_OF_SERVICE = 'out_of_service'
}

export enum CalibrationStatus {
  CURRENT = 'current',
  DUE_SOON = 'due_soon',
  OVERDUE = 'overdue',
  NOT_REQUIRED = 'not_required'
}

export interface MaintenanceRecord {
  id: string;
  type: MaintenanceType;
  description: string;
  performedBy: string;
  date: Date;
  notes: string;
  attachments: Attachment[];
}

export enum MaintenanceType {
  PREVENTIVE = 'preventive',
  CORRECTIVE = 'corrective',
  CALIBRATION = 'calibration',
  INSPECTION = 'inspection'
}

// Test Result related types
export interface TestResult {
  id: string;
  jobId: string;
  testMethod: string;
  equipment: string;
  technician: string;
  startTime: Date;
  endTime: Date;
  parameters: Record<string, any>;
  rawData: any[];
  processedData: Record<string, any>;
  status: ResultStatus;
  complianceStatus: ComplianceStatus;
  notes: Note[];
  attachments: Attachment[];
}

export enum ResultStatus {
  PASS = 'pass',
  FAIL = 'fail',
  INCONCLUSIVE = 'inconclusive'
}

export enum ComplianceStatus {
  COMPLIANT = 'compliant',
  NON_COMPLIANT = 'non_compliant'
}

// Knowledge Base related types
export interface KnowledgeArticle {
  id: string;
  title: string;
  content: string;
  category: string;
  tags: string[];
  relatedStandards: string[];
  relatedMethods: string[];
  attachments: Attachment[];
  author: string;
  reviewStatus: string;
  createdAt: Date;
  updatedAt: Date;
  viewCount: number;
}

// Standard related types
export interface Standard {
  id: string;
  name: string;
  organization: string;
  number: string;
  title: string;
  description: string;
  category: string;
  industry: Industry[];
  version: string;
  status: StandardStatus;
  relatedStandards: string[];
  documentLink: string;
}

export enum StandardStatus {
  CURRENT = 'current',
  SUPERSEDED = 'superseded',
  WITHDRAWN = 'withdrawn'
}

// Material related types
export interface Material {
  id: string;
  name: string;
  type: string;
  supplier: string;
  properties: Record<string, any>;
  applications: string[];
  testHistory: string[];
  certifications: string[];
  attachments: Attachment[];
}

// Notification related types
export interface Notification {
  id: string;
  type: string;
  title: string;
  message: string;
  severity: NotificationSeverity;
  recipient: string;
  relatedEntity: string;
  read: boolean;
  createdAt: Date;
  expiresAt: Date;
}

export enum NotificationSeverity {
  INFO = 'info',
  WARNING = 'warning',
  ERROR = 'error',
  CRITICAL = 'critical'
}

// Chatbot related types
export interface ChatbotConversation {
  id: string;
  user: string;
  startTime: Date;
  endTime: Date | null;
  messages: ChatMessage[];
  context: Record<string, any>;
  feedback: Record<string, any> | null;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'bot';
  content: string;
  timestamp: Date;
  intent: string;
  entities: Record<string, any>[];
}

// Industry enum
export enum Industry {
  AUTOMOTIVE = 'automotive',
  SPORTSWEAR = 'sportswear',
  CAMPING = 'camping',
  OTHER = 'other'
}

// Dashboard related types
export interface DashboardWidget {
  id: string;
  type: WidgetType;
  title: string;
  size: WidgetSize;
  position: number;
  config: Record<string, any>;
  data: any;
}

export enum WidgetType {
  KPI = 'kpi',
  CHART = 'chart',
  TABLE = 'table',
  CALENDAR = 'calendar',
  EQUIPMENT_STATUS = 'equipment_status',
  ALERTS = 'alerts'
}

export enum WidgetSize {
  SMALL = 'small',
  MEDIUM = 'medium',
  LARGE = 'large',
  EXTRA_LARGE = 'extra_large'
}

// Report related types
export interface Report {
  id: string;
  title: string;
  description: string;
  type: ReportType;
  parameters: Record<string, any>;
  createdBy: string;
  createdAt: Date;
  status: ReportStatus;
  url: string;
  recipients: string[];
}

export enum ReportType {
  TEST_RESULT = 'test_result',
  COMPLIANCE = 'compliance',
  EQUIPMENT_UTILIZATION = 'equipment_utilization',
  TEST_SUMMARY = 'test_summary',
  CUSTOM = 'custom'
}

export enum ReportStatus {
  GENERATING = 'generating',
  COMPLETED = 'completed',
  FAILED = 'failed'
}
