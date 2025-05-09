/**
 * Equipment Management Data Models
 * 
 * These models support the Equipment Management feature for the Textile Testing Lab,
 * providing structures for tracking calibration status, maintenance schedules,
 * and equipment usage logs as specified in the requirements.
 */

export interface Equipment {
  id: string;
  name: string;
  model: string;
  serialNumber: string;
  manufacturer: string;
  acquisitionDate: string;
  location: string;
  category: string;
  status: 'Operational' | 'Under Maintenance' | 'Out of Service' | 'Calibration Required';
  lastCalibrationDate: string;
  nextCalibrationDate: string;
  calibrationFrequency: number; // in days
  lastMaintenanceDate: string;
  nextMaintenanceDate: string;
  maintenanceFrequency: number; // in days
  specifications: Record<string, string>; // Key-value pairs for specifications
  notes: string;
  image?: string;
  documents: EquipmentDocument[];
  usageLogs: UsageLog[];
  maintenanceLogs: MaintenanceLog[];
  calibrationLogs: CalibrationLog[];
}

export interface EquipmentDocument {
  id: string;
  equipmentId: string;
  name: string;
  type: 'Manual' | 'Certificate' | 'Warranty' | 'Calibration Report' | 'Maintenance Report' | 'Other';
  uploadDate: string;
  url: string;
}

export interface UsageLog {
  id: string;
  equipmentId: string;
  startTime: string;
  endTime: string;
  operator: string;
  testId?: string;
  testName?: string;
  notes: string;
  parameters?: Record<string, string>;
}

export interface MaintenanceLog {
  id: string;
  equipmentId: string;
  date: string;
  technician: string;
  maintenanceType: 'Preventive' | 'Corrective' | 'Predictive';
  description: string;
  actions: string;
  parts: string[];
  cost: number;
  downtime: number; // in hours
  result: 'Completed' | 'Pending' | 'Failed';
  notes: string;
  documents: string[]; // Document URLs
}

export interface CalibrationLog {
  id: string;
  equipmentId: string;
  date: string;
  technician: string;
  provider: 'Internal' | 'External';
  externalProvider?: string;
  standardsUsed: string[];
  result: 'Pass' | 'Fail' | 'Conditional Pass';
  findings: string;
  adjustments: string;
  certificateNumber: string;
  certificateUrl?: string;
  validUntil: string;
  notes: string;
}

// Mock data for Equipment Management
export const mockEquipment: Equipment[] = [
  {
    id: "eq1",
    name: "Launder-Ometer",
    model: "LP2-0",
    serialNumber: "AT72984",
    manufacturer: "Atlas",
    acquisitionDate: "2023-02-15",
    location: "Washing Lab",
    category: "Washing",
    status: "Operational",
    lastCalibrationDate: "2024-02-01",
    nextCalibrationDate: "2024-08-01",
    calibrationFrequency: 180,
    lastMaintenanceDate: "2024-03-15",
    nextMaintenanceDate: "2024-06-15",
    maintenanceFrequency: 90,
    specifications: {
      "Capacity": "8 canisters",
      "Speed": "40 ± 2 rpm",
      "Temperature": "Up to 95°C",
      "Power": "220V, 50Hz"
    },
    notes: "Used for AATCC and ISO wash fastness tests",
    documents: [
      {
        id: "doc1",
        equipmentId: "eq1",
        name: "Operator Manual",
        type: "Manual",
        uploadDate: "2023-02-15",
        url: "/documents/launder-ometer-manual.pdf"
      },
      {
        id: "doc2",
        equipmentId: "eq1",
        name: "Calibration Certificate",
        type: "Calibration Report",
        uploadDate: "2024-02-03",
        url: "/documents/launder-ometer-cal-2024.pdf"
      }
    ],
    usageLogs: [
      {
        id: "use1",
        equipmentId: "eq1",
        startTime: "2024-04-10T09:00:00",
        endTime: "2024-04-10T11:30:00",
        operator: "John Smith",
        testId: "test123",
        testName: "Color Fastness to Washing",
        notes: "Standard run for client XYZ Textiles",
        parameters: {
          "Temperature": "40°C",
          "Time": "30 minutes",
          "Detergent": "AATCC Standard"
        }
      },
      {
        id: "use2",
        equipmentId: "eq1",
        startTime: "2024-04-12T13:15:00",
        endTime: "2024-04-12T15:45:00",
        operator: "Emily Johnson",
        testId: "test124",
        testName: "Color Fastness to Washing",
        notes: "High temperature wash test for client ABC Corp",
        parameters: {
          "Temperature": "60°C",
          "Time": "45 minutes",
          "Detergent": "ISO Standard"
        }
      }
    ],
    maintenanceLogs: [
      {
        id: "maint1",
        equipmentId: "eq1",
        date: "2024-03-15",
        technician: "Robert Chen",
        maintenanceType: "Preventive",
        description: "Quarterly maintenance check",
        actions: "Replaced belt, cleaned water inlet, lubricated moving parts",
        parts: ["Drive Belt", "Lubricant"],
        cost: 245.50,
        downtime: 4,
        result: "Completed",
        notes: "Machine in good working order",
        documents: ["/documents/maint-report-mar2024.pdf"]
      }
    ],
    calibrationLogs: [
      {
        id: "cal1",
        equipmentId: "eq1",
        date: "2024-02-01",
        technician: "Michael Wong",
        provider: "External",
        externalProvider: "Atlas Technical Services",
        standardsUsed: ["ISO 17025 Reference", "NIST Temperature Standard"],
        result: "Pass",
        findings: "All parameters within specified tolerances",
        adjustments: "Minor RPM adjustment -2 rpm",
        certificateNumber: "ATL-24-5692",
        certificateUrl: "/documents/cal-cert-ATL-24-5692.pdf",
        validUntil: "2024-08-01",
        notes: "Next calibration due in 6 months"
      }
    ]
  },
  {
    id: "eq2",
    name: "Crockmeter",
    model: "CM-5",
    serialNumber: "JT39876",
    manufacturer: "James Heal",
    acquisitionDate: "2022-11-10",
    location: "Physical Testing Lab",
    category: "Physical Testing",
    status: "Calibration Required",
    lastCalibrationDate: "2023-11-15",
    nextCalibrationDate: "2024-05-15",
    calibrationFrequency: 180,
    lastMaintenanceDate: "2024-02-20",
    nextMaintenanceDate: "2024-08-20",
    maintenanceFrequency: 180,
    specifications: {
      "Force": "9N ± 0.2N",
      "Stroke Length": "104mm",
      "Speed": "1 cycle per second",
    },
    notes: "Used for AATCC and ISO crocking tests",
    documents: [
      {
        id: "doc3",
        equipmentId: "eq2",
        name: "User Manual",
        type: "Manual",
        uploadDate: "2022-11-10",
        url: "/documents/crockmeter-manual.pdf"
      }
    ],
    usageLogs: [
      {
        id: "use3",
        equipmentId: "eq2",
        startTime: "2024-04-15T10:30:00",
        endTime: "2024-04-15T12:00:00",
        operator: "Sarah Miller",
        testId: "test125",
        testName: "Color Fastness to Crocking",
        notes: "Dry crocking test for client FashionCo",
        parameters: {
          "Cycles": "10",
          "Pressure": "9N",
          "Type": "Dry"
        }
      }
    ],
    maintenanceLogs: [
      {
        id: "maint2",
        equipmentId: "eq2",
        date: "2024-02-20",
        technician: "Robert Chen",
        maintenanceType: "Preventive",
        description: "Biannual maintenance check",
        actions: "Cleaned rails, checked force mechanism, replaced rubbing finger",
        parts: ["Rubbing finger"],
        cost: 120.75,
        downtime: 2,
        result: "Completed",
        notes: "Calibration needed in 2-3 months",
        documents: ["/documents/maint-report-feb2024-crock.pdf"]
      }
    ],
    calibrationLogs: [
      {
        id: "cal2",
        equipmentId: "eq2",
        date: "2023-11-15",
        technician: "Michael Wong",
        provider: "Internal",
        standardsUsed: ["ASTM Calibrated Weights", "Force Gauge"],
        result: "Pass",
        findings: "Force measured at 9.1N, within tolerance",
        adjustments: "None required",
        certificateNumber: "INT-23-078",
        certificateUrl: "/documents/cal-cert-INT-23-078.pdf",
        validUntil: "2024-05-15",
        notes: "Next calibration due"
      }
    ]
  },
  {
    id: "eq3",
    name: "Martindale Abrasion Tester",
    model: "MT-900",
    serialNumber: "SN45721",
    manufacturer: "SDL Atlas",
    acquisitionDate: "2022-05-20",
    location: "Physical Testing Lab",
    category: "Physical Testing",
    status: "Under Maintenance",
    lastCalibrationDate: "2023-12-10",
    nextCalibrationDate: "2024-12-10",
    calibrationFrequency: 365,
    lastMaintenanceDate: "2024-05-01",
    nextMaintenanceDate: "2024-11-01",
    maintenanceFrequency: 180,
    specifications: {
      "Stations": "8",
      "Pressure Weights": "9 kPa, 12 kPa",
      "Speed": "47.5 rpm",
      "Power": "110V/220V, 50/60Hz"
    },
    notes: "Currently undergoing repairs for drive mechanism",
    documents: [
      {
        id: "doc4",
        equipmentId: "eq3",
        name: "Technical Manual",
        type: "Manual",
        uploadDate: "2022-05-20",
        url: "/documents/martindale-manual.pdf"
      }
    ],
    usageLogs: [
      {
        id: "use4",
        equipmentId: "eq3",
        startTime: "2024-04-20T09:00:00",
        endTime: "2024-04-22T15:00:00",
        operator: "David Kim",
        testId: "test128",
        testName: "Abrasion Resistance",
        notes: "Long-term test for upholstery fabric",
        parameters: {
          "Cycles": "20000",
          "Pressure": "12 kPa",
          "Abradant": "Standard wool"
        }
      }
    ],
    maintenanceLogs: [
      {
        id: "maint3",
        equipmentId: "eq3",
        date: "2024-05-01",
        technician: "External Service",
        maintenanceType: "Corrective",
        description: "Drive motor failure repair",
        actions: "Replacing main drive motor and controller board",
        parts: ["Drive Motor", "Controller PCB"],
        cost: 1250.00,
        downtime: 168, // 1 week
        result: "Pending",
        notes: "Parts ordered, expected completion by May 12",
        documents: ["/documents/repair-quote-martindale.pdf"]
      }
    ],
    calibrationLogs: [
      {
        id: "cal3",
        equipmentId: "eq3",
        date: "2023-12-10",
        technician: "SDL Atlas Service",
        provider: "External",
        externalProvider: "SDL Atlas Technical Services",
        standardsUsed: ["ISO certified weights", "Certified Revolution Counter"],
        result: "Pass",
        findings: "All parameters within specifications",
        adjustments: "None required",
        certificateNumber: "SDL-23-8834",
        certificateUrl: "/documents/cal-cert-SDL-23-8834.pdf",
        validUntil: "2024-12-10",
        notes: "Annual calibration"
      }
    ]
  },
  {
    id: "eq4",
    name: "Xenon Arc Light Fastness Tester",
    model: "Xenotest 440",
    serialNumber: "XT440-892",
    manufacturer: "Atlas",
    acquisitionDate: "2021-06-15",
    location: "Light Fastness Lab",
    category: "Light Fastness",
    status: "Operational",
    lastCalibrationDate: "2024-01-15",
    nextCalibrationDate: "2024-07-15",
    calibrationFrequency: 180,
    lastMaintenanceDate: "2024-03-01",
    nextMaintenanceDate: "2024-09-01",
    maintenanceFrequency: 180,
    specifications: {
      "Light Source": "Xenon Arc",
      "Irradiance Control": "300-400nm",
      "Specimen Capacity": "38 specimens",
      "Black Panel Temp": "65°C max",
      "Chamber Temp": "55°C max",
      "Humidity": "10-80% RH"
    },
    notes: "Primary light fastness equipment for ISO 105-B02 testing",
    documents: [
      {
        id: "doc5",
        equipmentId: "eq4",
        name: "Operating Manual",
        type: "Manual",
        uploadDate: "2021-06-15",
        url: "/documents/xenotest-manual.pdf"
      }
    ],
    usageLogs: [
      {
        id: "use5",
        equipmentId: "eq4",
        startTime: "2024-04-01T08:00:00",
        endTime: "2024-04-08T16:00:00",
        operator: "Jennifer Lee",
        testId: "test130",
        testName: "Light Fastness Testing",
        notes: "Automotive interior fabrics batch testing",
        parameters: {
          "Exposure Time": "168 hours",
          "Irradiance": "60 W/m²",
          "Black Panel Temp": "63°C",
          "Chamber Temp": "45°C",
          "RH": "50%"
        }
      }
    ],
    maintenanceLogs: [
      {
        id: "maint4",
        equipmentId: "eq4",
        date: "2024-03-01",
        technician: "Robert Chen",
        maintenanceType: "Preventive",
        description: "Biannual maintenance",
        actions: "Replaced xenon lamp, cleaned optical filters, checked cooling system",
        parts: ["Xenon Lamp", "Air Filters"],
        cost: 1450.00,
        downtime: 8,
        result: "Completed",
        notes: "New lamp installed with 0 hours",
        documents: ["/documents/maint-xenon-mar2024.pdf"]
      }
    ],
    calibrationLogs: [
      {
        id: "cal4",
        equipmentId: "eq4",
        date: "2024-01-15",
        technician: "Atlas Technical Services",
        provider: "External",
        externalProvider: "Atlas",
        standardsUsed: ["Atlas Calibrated Radiometer", "Blue Wool Standards"],
        result: "Pass",
        findings: "Irradiance measured within ±3% tolerance at all wavelengths",
        adjustments: "Minor adjustment to irradiance control system",
        certificateNumber: "ATL-24-XEN-143",
        certificateUrl: "/documents/cal-cert-xenon-2024.pdf",
        validUntil: "2024-07-15",
        notes: "Recommended to replace optical filters at next calibration"
      }
    ]
  },
  {
    id: "eq5",
    name: "Universal Testing Machine",
    model: "Instron 5967",
    serialNumber: "IN5967-2145",
    manufacturer: "Instron",
    acquisitionDate: "2023-08-10",
    location: "Physical Testing Lab",
    category: "Physical Testing",
    status: "Operational",
    lastCalibrationDate: "2024-02-10",
    nextCalibrationDate: "2024-08-10",
    calibrationFrequency: 180,
    lastMaintenanceDate: "2024-02-10",
    nextMaintenanceDate: "2024-08-10",
    maintenanceFrequency: 180,
    specifications: {
      "Capacity": "30 kN",
      "Speed Range": "0.001-3000 mm/min",
      "Position Resolution": "0.1 μm",
      "Load Measurement Accuracy": "±0.5% of reading"
    },
    notes: "Used for tensile, compression, and flexural testing of textiles and composites",
    documents: [
      {
        id: "doc6",
        equipmentId: "eq5",
        name: "User Manual",
        type: "Manual",
        uploadDate: "2023-08-10",
        url: "/documents/instron-manual.pdf"
      }
    ],
    usageLogs: [
      {
        id: "use6",
        equipmentId: "eq5",
        startTime: "2024-04-25T09:30:00",
        endTime: "2024-04-25T11:45:00",
        operator: "David Kim",
        testId: "test132",
        testName: "Tensile Strength Testing",
        notes: "Batch testing of industrial fabrics",
        parameters: {
          "Test Speed": "100 mm/min",
          "Gauge Length": "100 mm",
          "Load Cell": "5 kN"
        }
      }
    ],
    maintenanceLogs: [
      {
        id: "maint5",
        equipmentId: "eq5",
        date: "2024-02-10",
        technician: "Instron Service Engineer",
        maintenanceType: "Preventive",
        description: "Biannual service and calibration",
        actions: "Checked drive system, load cells, and electronics",
        parts: [],
        cost: 1800.00,
        downtime: 8,
        result: "Completed",
        notes: "All systems operating within specifications",
        documents: ["/documents/instron-service-feb2024.pdf"]
      }
    ],
    calibrationLogs: [
      {
        id: "cal5",
        equipmentId: "eq5",
        date: "2024-02-10",
        technician: "Instron Calibration Services",
        provider: "External",
        externalProvider: "Instron",
        standardsUsed: ["ASTM E4 Standards", "ISO 7500-1 Standards"],
        result: "Pass",
        findings: "Load, position, and strain measurement within specified tolerances",
        adjustments: "Software calibration parameters updated",
        certificateNumber: "INS-24-0542",
        certificateUrl: "/documents/cal-cert-instron-2024.pdf",
        validUntil: "2024-08-10",
        notes: "Full system calibration including all load cells"
      }
    ]
  }
];
