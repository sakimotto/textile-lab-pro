import { Industry, MethodStatus, JobStatus, EquipmentStatus, CalibrationStatus, MaintenanceType } from '../types';

// Test Methods Data
export const testMethods = [
  {
    id: '1',
    name: 'Automotive Fabric Flammability Test',
    description: 'Tests the flammability resistance of automotive interior fabrics according to ASTM D6413 and ISO 3795 standards.',
    version: '2.3',
    status: MethodStatus.ACTIVE,
    industries: [Industry.AUTOMOTIVE],
    createdBy: 'John Doe',
    createdAt: new Date('2024-10-15'),
    updatedAt: new Date('2025-02-20'),
    parameters: [
      { id: '1', name: 'Temperature', unit: '°C', defaultValue: 23, minValue: 20, maxValue: 26 },
      { id: '3', name: 'Humidity', unit: '%', defaultValue: 50, minValue: 45, maxValue: 55 },
      { id: '7', name: 'Duration', unit: 'sec', defaultValue: 12, minValue: 10, maxValue: 15 }
    ],
    equipment: ['SDL Atlas Flammability Tester'],
    standards: ['ASTM D6413', 'ISO 3795']
  },
  {
    id: '2',
    name: 'Sportswear Moisture Wicking Test',
    description: 'Evaluates the moisture management properties of sportswear fabrics using AATCC 195 and AATCC 199 standards.',
    version: '1.8',
    status: MethodStatus.ACTIVE,
    industries: [Industry.SPORTSWEAR],
    createdBy: 'Jane Smith',
    createdAt: new Date('2024-11-05'),
    updatedAt: new Date('2025-01-10'),
    parameters: [
      { id: '1', name: 'Temperature', unit: '°C', defaultValue: 21, minValue: 20, maxValue: 23 },
      { id: '3', name: 'Humidity', unit: '%', defaultValue: 65, minValue: 60, maxValue: 70 },
      { id: '7', name: 'Duration', unit: 'min', defaultValue: 5, minValue: 3, maxValue: 10 }
    ],
    equipment: ['SDL Atlas MM-1'],
    standards: ['AATCC 195', 'AATCC 199']
  },
  {
    id: '3',
    name: 'Camping Tent Waterproofing Test',
    description: 'Tests the water resistance of camping tent materials using hydrostatic pressure according to ISO 811 and AATCC 127.',
    version: '1.5',
    status: MethodStatus.ACTIVE,
    industries: [Industry.CAMPING],
    createdBy: 'Robert Johnson',
    createdAt: new Date('2024-12-10'),
    updatedAt: new Date('2025-03-05'),
    parameters: [
      { id: '3', name: 'Pressure', unit: 'kPa', defaultValue: 20, minValue: 10, maxValue: 30 },
      { id: '7', name: 'Duration', unit: 'min', defaultValue: 10, minValue: 5, maxValue: 15 },
      { id: '3', name: 'Water Temperature', unit: '°C', defaultValue: 20, minValue: 18, maxValue: 22 }
    ],
    equipment: ['Instron Hydrostatic Pressure Tester'],
    standards: ['ISO 811', 'AATCC 127']
  },
  {
    id: '4',
    name: 'UV Resistance Test',
    description: 'Evaluates the resistance of textiles to UV light and moisture exposure according to AATCC 186 and ISO 105-B02.',
    version: '2.0',
    status: MethodStatus.ACTIVE,
    industries: [Industry.CAMPING, Industry.SPORTSWEAR],
    createdBy: 'Sarah Williams',
    createdAt: new Date('2024-09-20'),
    updatedAt: new Date('2025-02-15'),
    parameters: [
      { id: '1', name: 'Temperature', unit: '°C', defaultValue: 50, minValue: 40, maxValue: 60 },
      { id: '3', name: 'Humidity', unit: '%', defaultValue: 30, minValue: 20, maxValue: 40 },
      { id: '7', name: 'Duration', unit: 'hours', defaultValue: 100, minValue: 50, maxValue: 200 },
      { id: '8', name: 'UV Intensity', unit: 'W/m²', defaultValue: 60, minValue: 50, maxValue: 70 }
    ],
    equipment: ['SDL Atlas Weather-Ometer'],
    standards: ['AATCC 186', 'ISO 105-B02']
  },
  {
    id: '5',
    name: 'Abrasion Resistance Test',
    description: 'Tests the abrasion resistance of textiles using the Martindale method.',
    version: '1.2',
    status: MethodStatus.DRAFT,
    industries: [Industry.AUTOMOTIVE, Industry.SPORTSWEAR, Industry.CAMPING],
    createdBy: 'Michael Brown',
    createdAt: new Date('2025-01-25'),
    updatedAt: new Date('2025-03-10'),
    parameters: [
      { id: '4', name: 'Cycles', unit: 'count', defaultValue: 20000, minValue: 5000, maxValue: 50000 },
      { id: '5', name: 'Pressure', unit: 'kPa', defaultValue: 12, minValue: 9, maxValue: 15 }
    ],
    equipment: ['MESDAN-LAB Abrasion Tester'],
    standards: ['ISO 12947-2']
  },
  {
    id: '6',
    name: 'Tensile Strength Test',
    description: 'Measures the tensile strength and elongation properties of textile materials.',
    version: '3.1',
    status: MethodStatus.ACTIVE,
    industries: [Industry.AUTOMOTIVE, Industry.SPORTSWEAR, Industry.CAMPING],
    createdBy: 'John Doe',
    createdAt: new Date('2024-08-15'),
    updatedAt: new Date('2025-01-05'),
    parameters: [
      { id: '5', name: 'Speed', unit: 'mm/min', defaultValue: 300, minValue: 100, maxValue: 500 },
      { id: '6', name: 'Gauge Length', unit: 'mm', defaultValue: 100, minValue: 50, maxValue: 200 },
      { id: '6', name: 'Force', unit: 'N', defaultValue: 5000, minValue: 1000, maxValue: 10000 }
    ],
    equipment: ['Instron 5967'],
    standards: ['ASTM D5035', 'ISO 13934-1']
  }
];

// Jobs Data
export const jobs = [
  {
    id: 'JOB-2025-0342',
    title: 'Automotive Fabric Flammability Test',
    description: 'Testing the flammability resistance of automotive interior fabrics according to ASTM D6413 and ISO 3795 standards.',
    status: JobStatus.IN_PROGRESS,
    priority: 'High',
    testMethod: 'Automotive Fabric Flammability Test v2.3',
    testMethodId: '1',
    scheduledStart: new Date('2025-03-23T09:00:00'),
    scheduledEnd: new Date('2025-03-23T11:00:00'),
    actualStart: new Date('2025-03-23T09:15:00'),
    actualEnd: null,
    equipment: 'SDL Atlas Flammability Tester',
    equipmentId: '4',
    technician: 'John Doe',
    technicianId: '1',
    industry: Industry.AUTOMOTIVE,
    progress: 65,
    samples: [
      {
        id: 'S001',
        name: 'Sample A - Polyester Blend',
        material: 'Polyester/Cotton Blend (65/35)',
        dimensions: { length: 300, width: 100, thickness: 2 },
        preparation: 'Conditioned at 23°C and 50% RH for 24 hours',
        notes: 'From supplier batch #B2025-03-15'
      },
      {
        id: 'S002',
        name: 'Sample B - Nylon Fabric',
        material: 'Nylon 6,6',
        dimensions: { length: 300, width: 100, thickness: 1.5 },
        preparation: 'Conditioned at 23°C and 50% RH for 24 hours',
        notes: 'From supplier batch #B2025-03-16'
      },
      {
        id: 'S003',
        name: 'Sample C - FR Treated Fabric',
        material: 'FR Treated Polyester',
        dimensions: { length: 300, width: 100, thickness: 2.2 },
        preparation: 'Conditioned at 23°C and 50% RH for 24 hours',
        notes: 'From supplier batch #B2025-03-17'
      }
    ],
    parameters: {
      temperature: '23°C',
      humidity: '50%',
      flameApplicationTime: '12 seconds',
      specimenOrientation: 'Vertical',
      airFlow: 'None'
    },
    steps: [
      {
        id: '1',
        name: 'Sample Preparation',
        description: 'Cut samples to 300mm x 100mm dimensions and condition at 23°C and 50% RH for 24 hours.',
        status: 'completed',
        duration: 1440, // minutes
        completedAt: new Date('2025-03-22T09:00:00')
      },
      {
        id: '2',
        name: 'Equipment Setup',
        description: 'Prepare the flammability tester according to ASTM D6413 specifications.',
        status: 'completed',
        duration: 30,
        completedAt: new Date('2025-03-23T09:30:00')
      },
      {
        id: '3',
        name: 'Test Execution',
        description: 'Mount each specimen in the holder, apply flame for 12 seconds, and record flame spread.',
        status: 'in_progress',
        duration: 60,
        completedAt: null
      },
      {
        id: '4',
        name: 'Data Analysis',
        description: 'Calculate char length, afterflame time, and afterglow time for each specimen.',
        status: 'pending',
        duration: 30,
        completedAt: null
      },
      {
        id: '5',
        name: 'Report Generation',
        description: 'Compile test results and generate final report with compliance assessment.',
        status: 'pending',
        duration: 60,
        completedAt: null
      }
    ],
    results: [
      {
        sampleId: 'S001',
        parameters: {
          charLength: '76 mm',
          afterflameTime: '2.3 seconds',
          afterglowTime: '0 seconds'
        },
        status: 'completed',
        notes: 'Sample passed the test criteria'
      },
      {
        sampleId: 'S002',
        parameters: {
          charLength: '82 mm',
          afterflameTime: '3.1 seconds',
          afterglowTime: '1.2 seconds'
        },
        status: 'completed',
        notes: 'Sample passed the test criteria'
      },
      {
        sampleId: 'S003',
        parameters: {
          charLength: 'In progress',
          afterflameTime: 'In progress',
          afterglowTime: 'In progress'
        },
        status: 'in_progress',
        notes: 'Testing in progress'
      }
    ],
    notes: [
      {
        id: 'N001',
        content: 'Sample preparation completed according to standard. All samples conditioned for 24 hours.',
        createdBy: 'John Doe',
        createdAt: new Date('2025-03-22T09:00:00')
      },
      {
        id: 'N002',
        content: 'Equipment calibration verified before testing. All parameters within specification.',
        createdBy: 'John Doe',
        createdAt: new Date('2025-03-23T09:15:00')
      },
      {
        id: 'N003',
        content: 'Sample A and B testing completed. Results within expected range. Proceeding with Sample C.',
        createdBy: 'John Doe',
        createdAt: new Date('2025-03-23T10:30:00')
      }
    ],
    attachments: [
      {
        id: 'A001',
        name: 'Test Method Procedure.pdf',
        type: 'application/pdf',
        url: '#',
        createdBy: 'System',
        createdAt: new Date('2025-03-22T08:00:00')
      },
      {
        id: 'A002',
        name: 'Sample Photos.zip',
        type: 'application/zip',
        url: '#',
        createdBy: 'John Doe',
        createdAt: new Date('2025-03-22T09:30:00')
      },
      {
        id: 'A003',
        name: 'Test Data - Samples A & B.xlsx',
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        url: '#',
        createdBy: 'John Doe',
        createdAt: new Date('2025-03-23T10:45:00')
      }
    ]
  },
  {
    id: 'JOB-2025-0343',
    title: 'Sportswear Moisture Wicking Test',
    description: 'Testing the moisture management properties of sportswear fabrics using AATCC 195 and AATCC 199 standards.',
    status: JobStatus.SCHEDULED,
    priority: 'Medium',
    testMethod: 'Sportswear Moisture Wicking Test v1.8',
    testMethodId: '2',
    scheduledStart: new Date('2025-03-23T13:00:00'),
    scheduledEnd: new Date('2025-03-23T15:00:00'),
    actualStart: null,
    actualEnd: null,
    equipment: 'SDL Atlas MM-1',
    equipmentId: '2',
    technician: 'Jane Smith',
    technicianId: '2',
    industry: Industry.SPORTSWEAR,
    progress: 0,
    samples: [
      {
        id: 'S004',
        name: 'Sample D - Performance Polyester',
        material: 'Performance Polyester',
        dimensions: { length: 80, width: 80, thickness: 1 },
        preparation: 'Conditioned at 21°C and 65% RH for 24 hours',
        notes: 'From supplier batch #S2025-03-10'
      },
      {
        id: 'S005',
        name: 'Sample E - Moisture-Wicking Blend',
        material: 'Polyester/Nylon Blend with Moisture-Wicking Treatment',
        dimensions: { length: 80, width: 80, thickness: 1.2 },
        preparation: 'Conditioned at 21°C and 65% RH for 24 hours',
        notes: 'From supplier batch #S2025-03-11'
      },
      {
        id: 'S006',
        name: 'Sample F - Cotton Control',
        material: '100% Cotton',
        dimensions: { length: 80, width: 80, thickness: 0.8 },
        preparation: 'Conditioned at 21°C and 65% RH for 24 hours',
        notes: 'Control sample for comparison'
      }
    ],
    parameters: {
      temperature: '21°C',
      humidity: '65%',
      testLiquid: 'Distilled water',
      dropVolume: '0.2 mL',
      testDuration: '5 minutes'
    },
    steps: [
      {
        id: '1',
        name: 'Sample Preparation',
        description: 'Cut samples to 80mm x 80mm dimensions and condition at 21°C and 65% RH for 24 hours.',
        status: 'completed',
        duration: 1440, // minutes
        completedAt: new Date('2025-03-22T13:00:00')
      },
      {
        id: '2',
        name: 'Equipment Setup',
        description: 'Prepare the moisture management tester according to AATCC 195 specifications.',
        status: 'pending',
        duration: 30,
        completedAt: null
      },
      {
        id: '3',
        name: 'Test Execution',
        description: 'Place each specimen in the tester, apply test liquid, and record moisture spread.',
        status: 'pending',
        duration: 60,
        completedAt: null
      },
      {
        id: '4',
        name: 'Data Analysis',
        description: 'Calculate moisture management indices for each specimen.',
        status: 'pending',
        duration: 30,
        completedAt: null
      },
      {
        id: '5',
        name: 'Report Generation',
        description: 'Compile test results and generate final report with performance assessment.',
        status: 'pending',
        duration: 60,
        completedAt: null
      }
    ],
    results: [],
    notes: [
      {
        id: 'N001',
        content: 'Sample preparation completed according to standard. All samples conditioned for 24 hours.',
        createdBy: 'Jane Smith',
        createdAt: new Date('2025-03-22T13:00:00')
      }
    ],
    attachments: [
      {
        id: 'A001',
        name: 'Test Method Procedure.pdf',
        type: 'application/pdf',
        url: '#',
        createdBy: 'System',
        createdAt: new Date('2025-03-22T12:00:00')
      }
    ]
  },
  {
    id: 'JOB-2025-0344',
    title: 'Camping Tent Waterproofing Test',
    description: 'Testing the water resistance of camping tent materials using hydrostatic pressure according to ISO 811 and AATCC 127.',
    status: JobStatus.SCHEDULED,
    priority: 'Medium',
    testMethod: 'Camping Tent Waterproofing Test v1.5',
    testMethodId: '3',
    scheduledStart: new Date('2025-03-24T10:00:00'),
    scheduledEnd: new Date('2025-03-24T12:00:00'),
    actualStart: null,
    actualEnd: null,
    equipment: 'Instron Hydrostatic Pressure Tester',
    equipmentId: '8',
    technician: 'Robert Johnson',
    technicianId: '3',
    industry: Industry.CAMPING,
    progress: 0,
    samples: [
      {
        id: 'S007',
        name: 'Sample G - Tent Floor Material',
        material: 'Nylon with PU Coating',
        dimensions: { length: 100, width: 100, thickness: 0.5 },
        preparation: 'Conditioned at 20°C and 65% RH for 24 hours',
        notes: 'From supplier batch #C2025-03-01'
      },
      {
        id: 'S008',
        name: 'Sample H - Tent Fly Material',
        material: 'Polyester with Silicone Coating',
        dimensions: { length: 100, width: 100, thickness: 0.3 },
        preparation: 'Conditioned at 20°C and 65% RH for 24 hours',
        notes: 'From supplier batch #C2025-03-02'
      },
      {
        id: 'S009',
        name: 'Sample I - Tent Wall Material',
        material: 'Ripstop Nylon with DWR Treatment',
        dimensions: { length: 100, width: 100, thickness: 0.2 },
        preparation: 'Conditioned at 20°C and 65% RH for 24 hours',
        notes: 'From supplier batch #C2025-03-03'
      }
    ],
    parameters: {
      waterTemperature: '20°C',
      pressureRate: '10 cm H₂O/min',
      specimenArea: '100 cm²',
      maximumPressure: '300 cm H₂O'
    },
    steps: [
      {
        id: '1',
        name: 'Sample Preparation',
        description: 'Cut samples to 100mm x 100mm dimensions and condition at 20°C and 65% RH for 24 hours.',
        status: 'completed',
        duration: 1440, // minutes
        completedAt: new Date('2025-03-23T10:00:00')
      },
      {
        id: '2',
        name: 'Equipment Setup',
        description: 'Prepare the hydrostatic pressure tester according to ISO 811 specifications.',
        status: 'pending',
        duration: 30,
        completedAt: null
      },
      {
        id: '3',
        name: 'Test Execution',
        description: 'Mount each specimen in the tester, apply increasing water pressure, and record pressure at water penetration.',
        status: 'pending',
        duration: 60,
        completedAt: null
      },
      {
        id: '4',
        name: 'Data Analysis',
        description: 'Calculate average hydrostatic pressure resistance for each material type.',
        status: 'pending',
        duration: 30,
        completedAt: null
      },
      {
        id: '5',
        name: 'Report Generation',
        description: 'Compile test results and generate final report with waterproofing assessment.',
        status: 'pending',
        duration: 60,
        completedAt: null
      }
    ],
    results: [],
    notes: [
      {
        id: 'N001',
        content: 'Sample preparation completed according to standard. All samples conditioned for 24 hours.',
        createdBy: 'Robert Johnson',
        createdAt: new Date('2025-03-23T10:00:00')
      }
    ],
    attachments: [
      {
        id: 'A001',
        name: 'Test Method Procedure.pdf',
        type: 'application/pdf',
        url: '#',
        createdBy: 'System',
        createdAt: new Date('2025-03-23T09:00:00')
      }
    ]
  },
  {
    id: 'JOB-2025-0345',
    title: 'UV Resistance Test',
    description: 'Testing the resistance of textiles to UV light and moisture exposure according to AATCC 186 and ISO 105-B02.',
    status: JobStatus.SCHEDULED,
    priority: 'Low',
    testMethod: 'UV Resistance Test v2.0',
    testMethodId: '4',
    scheduledStart: new Date('2025-03-25T09:00:00'),
    scheduledEnd: new Date('2025-03-25T16:00:00'),
    actualStart: null,
    actualEnd: null,
    equipment: 'SDL Atlas Weather-Ometer',
    equipmentId: '7',
    technician: 'Sarah Williams',
    technicianId: '4',
    industry: Industry.SPORTSWEAR,
    progress: 0,
    samples: [
      {
        id: 'S010',
        name: 'Sample J - UV-Resistant Polyester',
        material: 'Polyester with UV Inhibitors',
        dimensions: { length: 150, width: 50, thickness: 0.3 },
        preparation: 'Conditioned at 21°C and 65% RH for 24 hours',
        notes: 'From supplier batch #U2025-03-05'
      },
      {
        id: 'S011',
        name: 'Sample K - Standard Nylon',
        material: 'Standard Nylon 6,6',
        dimensions: { length: 150, width: 50, thickness: 0.3 },
        preparation: 'Conditioned at 21°C and 65% RH for 24 hours',
        notes: 'From supplier batch #U2025-03-06'
      },
      {
        id: 'S012',
        name: 'Sample L - Treated Cotton',
        material: 'Cotton with UV-Protective Finish',
        dimensions: { length: 150, width: 50, thickness: 0.4 },
        preparation: 'Conditioned at 21°C and 65% RH for 24 hours',
        notes: 'From supplier batch #U2025-03-07'
      }
    ],
    parameters: {
      temperature: '50°C',
      humidity: '30%',
      uvIntensity: '60 W/m²',
      exposureDuration: '100 hours',
      cycleType: 'Continuous light'
    },
    steps: [
      {
        id: '1',
        name: 'Sample Preparation',
        description: 'Cut samples to 150mm x 50mm dimensions and condition at 21°C and 65% RH for 24 hours.',
        status: 'pending',
        duration: 1440, // minutes
        completedAt: null
      },
      {
        id: '2',
        name: 'Equipment Setup',
        description: 'Prepare the Weather-Ometer according to AATCC 186 specifications.',
        status: 'pending',
        duration: 30,
        completedAt: null
      },
      {
        id: '3',
        name: 'Test Execution',
        description: 'Mount specimens in the Weather-Ometer and expose to UV light for 100 hours.',
        status: 'pending',
        duration: 6000, // 100 hours
        completedAt: null
      },
      {
        id: '4',
        name: 'Data Analysis',
        description: 'Evaluate color change, tensile strength retention, and other properties after exposure.',
        status: 'pending',
        duration: 120,
        completedAt: null
      },
      {
        id: '5',
        name: 'Report Generation',
        description: 'Compile test results and generate final report with UV resistance assessment.',
        status: 'pending',
        duration: 60,
        completedAt: null
      }
    ],
    results: [],
    notes: [],
    attachments: [
      {
        id: 'A001',
        name: 'Test Method Procedure.pdf',
        type: 'application/pdf',
        url: '#',
        createdBy: 'System',
        createdAt: new Date('2025-03-22T15:00:00')
      }
    ]
  },
  {
    id: 'JOB-2025-0346',
    title: 'Tensile Strength Test',
    description: 'Testing the tensile strength and elongation properties of textile materials.',
    status: JobStatus.SCHEDULED,
    priority: 'High',
    testMethod: 'Tensile Strength Test v3.1',
    testMethodId: '6',
    scheduledStart: new Date('2025-03-27T10:00:00'),
    scheduledEnd: new Date('2025-03-27T12:00:00'),
    actualStart: null,
    actualEnd: null,
    equipment: 'Instron 5967',
    equipmentId: '1',
    technician: 'John Doe',
    technicianId: '1',
    industry: Industry.AUTOMOTIVE,
    progress: 0,
    samples: [
      {
        id: 'S013',
        name: 'Sample M - Seat Belt Webbing',
        material: 'Polyester Webbing',
        dimensions: { length: 200, width: 50, thickness: 1.2 },
        preparation: 'Conditioned at 23°C and 50% RH for 24 hours',
        notes: 'From supplier batch #T2025-03-20'
      },
      {
        id: 'S014',
        name: 'Sample N - Interior Fabric',
        material: 'Polyester/Nylon Blend',
        dimensions: { length: 200, width: 50, thickness: 0.8 },
        preparation: 'Conditioned at 23°C and 50% RH for 24 hours',
        notes: 'From supplier batch #T2025-03-21'
      },
      {
        id: 'S015',
        name: 'Sample O - Headliner Material',
        material: 'Polyester Knit with Foam Backing',
        dimensions: { length: 200, width: 50, thickness: 3.5 },
        preparation: 'Conditioned at 23°C and 50% RH for 24 hours',
        notes: 'From supplier batch #T2025-03-22'
      }
    ],
    parameters: {
      speed: '300 mm/min',
      gaugeLength: '100 mm',
      preload: '5 N',
      direction: 'Warp and weft'
    },
    steps: [
      {
        id: '1',
        name: 'Sample Preparation',
        description: 'Cut samples to 200mm x 50mm dimensions and condition at 23°C and 50% RH for 24 hours.',
        status: 'pending',
        duration: 1440, // minutes
        completedAt: null
      },
      {
        id: '2',
        name: 'Equipment Setup',
        description: 'Prepare the tensile tester according to ASTM D5035 specifications.',
        status: 'pending',
        duration: 30,
        completedAt: null
      },
      {
        id: '3',
        name: 'Test Execution',
        description: 'Mount each specimen in the tensile tester and apply increasing force until rupture.',
        status: 'pending',
        duration: 60,
        completedAt: null
      },
      {
        id: '4',
        name: 'Data Analysis',
        description: 'Calculate maximum force, elongation at break, and tensile strength for each specimen.',
        status: 'pending',
        duration: 30,
        completedAt: null
      },
      {
        id: '5',
        name: 'Report Generation',
        description: 'Compile test results and generate final report with strength assessment.',
        status: 'pending',
        duration: 60,
        completedAt: null
      }
    ],
    results: [],
    notes: [],
    attachments: [
      {
        id: 'A001',
        name: 'Test Method Procedure.pdf',
        type: 'application/pdf',
        url: '#',
        createdBy: 'System',
        createdAt: new Date('2025-03-22T16:00:00')
      }
    ]
  }
];

// Equipment Data
export const equipment = [
  {
    id: '1',
    name: 'Instron 5967',
    model: '5967',
    manufacturer: 'Instron',
    type: 'Tensile Tester',
    location: 'Lab Room 101',
    status: EquipmentStatus.OPERATIONAL,
    calibrationStatus: CalibrationStatus.CURRENT,
    lastCalibration: new Date('2025-01-15'),
    nextCalibration: new Date('2025-07-15'),
    purchaseDate: new Date('2022-05-10'),
    warrantyExpiration: new Date('2027-05-10'),
    utilization: 78,
  },
  {
    id: '2',
    name: 'SDL Atlas MM-1',
    model: 'MM-1',
    manufacturer: 'SDL Atlas',
    type: 'Moisture Management Tester',
    location: 'Lab Room 102',
    status: EquipmentStatus.OPERATIONAL,
    calibrationStatus: CalibrationStatus.DUE_SOON,
    lastCalibration: new Date('2024-10-20'),
    nextCalibration: new Date('2025-04-20'),
    purchaseDate: new Date('2023-02-15'),
    warrantyExpiration: new Date('2028-02-15'),
    utilization: 65,
  },
  {
    id: '3',
    name: 'MESDAN-LAB Microscope',
    model: 'MICRO-350HD',
    manufacturer: 'MESDAN-LAB',
    type: 'Digital Microscope',
    location: 'Lab Room 103',
    status: EquipmentStatus.OPERATIONAL,
    calibrationStatus: CalibrationStatus.CURRENT,
    lastCalibration: new Date('2025-02-10'),
    nextCalibration: new Date('2025-08-10'),
    purchaseDate: new Date('2024-01-05'),
    warrantyExpiration: new Date('2029-01-05'),
    utilization: 42,
  },
  {
    id: '4',
    name: 'SDL Atlas Flammability Tester',
    model: 'FTL-01',
    manufacturer: 'SDL Atlas',
    type: 'Flammability Tester',
    location: 'Lab Room 101',
    status: EquipmentStatus.MAINTENANCE,
    calibrationStatus: CalibrationStatus.OVERDUE,
    lastCalibration: new Date('2024-08-15'),
    nextCalibration: new Date('2025-02-15'),
    purchaseDate: new Date('2021-11-20'),
    warrantyExpiration: new Date('2026-11-20'),
    utilization: 0,
  },
  {
    id: '5',
    name: 'Instron Impact Tester',
    model: 'CEAST 9350',
    manufacturer: 'Instron',
    type: 'Impact Tester',
    location: 'Lab Room 104',
    status: EquipmentStatus.OPERATIONAL,
    calibrationStatus: CalibrationStatus.CURRENT,
    lastCalibration: new Date('2025-03-01'),
    nextCalibration: new Date('2025-09-01'),
    purchaseDate: new Date('2023-07-12'),
    warrantyExpiration: new Date('2028-07-12'),
    utilization: 56,
  },
  {
    id: '6',
    name: 'MESDAN-LAB Abrasion Tester',
    model: 'MARTINDALE 1309',
    manufacturer: 'MESDAN-LAB',
    type: 'Abrasion Tester',
    location: 'Lab Room 102',
    status: EquipmentStatus.OUT_OF_SERVICE,
    calibrationStatus: CalibrationStatus.OVERDUE,
    lastCalibration: new Date('2024-07-10'),
    nextCalibration: new Date('2025-01-10'),
    purchaseDate: new Date('2020-09-15'),
    warrantyExpiration: new Date('2025-09-15'),
    utilization: 0,
  },
  {
    id: '7',
    name: 'SDL Atlas Weather-Ometer',
    model: 'Ci4000',
    manufacturer: 'SDL Atlas',
    type: 'Weather Tester',
    location: 'Lab Room 105',
    status: EquipmentStatus.OPERATIONAL,
    calibrationStatus: CalibrationStatus.CURRENT,
    lastCalibration: new Date('2025-02-20'),
    nextCalibration: new Date('2025-08-20'),
    purchaseDate: new Date('2022-12-05'),
    warrantyExpiration: new Date('2027-12-05'),
    utilization: 89,
  },
  {
    id: '8',
    name: 'Instron Hydrostatic Pressure Tester',
    model: 'M820',
    manufacturer: 'Instron',
    type: 'Pressure Tester',
    location: 'Lab Room 103',
    status: EquipmentStatus.OPERATIONAL,
    calibrationStatus: CalibrationStatus.DUE_SOON,
    lastCalibration: new Date('2024-11-15'),
    nextCalibration: new Date('2025-05-15'),
    purchaseDate: new Date('2023-04-20'),
    warrantyExpiration: new Date('2028-04-20'),
    utilization: 72,
  },
];

// Maintenance History Data
export const maintenanceHistory = [
  {
    id: 'M001',
    equipmentId: '1',
    type: MaintenanceType.CALIBRATION,
    description: 'Annual calibration performed',
    performedBy: 'John Doe',
    date: new Date('2025-01-15'),
    notes: 'All parameters within specification',
  },
  {
    id: 'M002',
    equipmentId: '1',
    type: MaintenanceType.PREVENTIVE,
    description: 'Quarterly preventive maintenance',
    performedBy: 'Jane Smith',
    date: new Date('2024-10-10'),
    notes: 'Replaced worn components, cleaned sensors',
  },
  {
    id: 'M003',
    equipmentId: '1',
    type: MaintenanceType.CORRECTIVE,
    description: 'Load cell replacement',
    performedBy: 'External Service',
    date: new Date('2024-07-22'),
    notes: 'Load cell showed drift, replaced with new calibrated unit',
  },
  {
    id: 'M004',
    equipmentId: '1',
    type: MaintenanceType.INSPECTION,
    description: 'Safety inspection',
    performedBy: 'Robert Johnson',
    date: new Date('2024-04-15'),
    notes: 'All safety features functioning correctly',
  },
  {
    id: 'M005',
    equipmentId: '4',
    type: MaintenanceType.CORRECTIVE,
    description: 'Burner system repair',
    performedBy: 'External Service',
    date: new Date('2025-03-20'),
    notes: 'Replaced faulty gas valve and recalibrated flame height',
  },
  {
    id: 'M006',
    equipmentId: '4',
    type: MaintenanceType.CALIBRATION,
    description: 'Calibration check',
    performedBy: 'Jane Smith',
    date: new Date('2024-08-15'),
    notes: 'Flame height and timing calibrated to standard',
  },
  {
    id: 'M007',
    equipmentId: '6',
    type: MaintenanceType.CORRECTIVE,
    description: 'Motor replacement',
    performedBy: 'External Service',
    date: new Date('2025-03-15'),
    notes: 'Main drive motor failed, replacement ordered',
  },
  {
    id: 'M008',
    equipmentId: '2',
    type: MaintenanceType.PREVENTIVE,
    description: 'Sensor cleaning',
    performedBy: 'Robert Johnson',
    date: new Date('2025-02-10'),
    notes: 'Cleaned moisture sensors and verified calibration',
  },
];

// Technicians Data
export const technicians = [
  {
    id: '1',
    name: 'John Doe',
    position: 'Senior Lab Technician',
    email: 'john.doe@textilelab.com',
    phone: '555-123-4567',
    specialties: ['Flammability Testing', 'Tensile Testing'],
    certifications: ['ISO/IEC 17025', 'ASTM Certified Technician'],
    available: false,
  },
  {
    id: '2',
    name: 'Jane Smith',
    position: 'Lab Technician',
    email: 'jane.smith@textilelab.com',
    phone: '555-234-5678',
    specialties: ['Moisture Management', 'Color Testing'],
    certifications: ['ISO/IEC 17025'],
    available: true,
  },
  {
    id: '3',
    name: 'Robert Johnson',
    position: 'Lab Technician',
    email: 'robert.johnson@textilelab.com',
    phone: '555-345-6789',
    specialties: ['Waterproofing Tests', 'Equipment Maintenance'],
    certifications: ['ISO/IEC 17025', 'Equipment Maintenance Specialist'],
    available: true,
  },
  {
    id: '4',
    name: 'Sarah Williams',
    position: 'Senior Lab Technician',
    email: 'sarah.williams@textilelab.com',
    phone: '555-456-7890',
    specialties: ['UV Testing', 'Weathering Tests'],
    certifications: ['ISO/IEC 17025', 'AATCC Certified Technician'],
    available: true,
  },
  {
    id: '5',
    name: 'Michael Brown',
    position: 'Lab Technician',
    email: 'michael.brown@textilelab.com',
    phone: '555-567-8901',
    specialties: ['Abrasion Testing', 'Physical Testing'],
    certifications: ['ISO/IEC 17025'],
    available: true,
  },
];

// Standards Data
export const standards = [
  {
    id: '1',
    name: 'ASTM D6413',
    organization: 'ASTM',
    title: 'Standard Test Method for Flame Resistance of Textiles',
    description: 'This test method measures the flame resistance of textiles in a vertical orientation.',
    lastUpdated: new Date('2024-05-15'),
    industries: [Industry.AUTOMOTIVE, Industry.CAMPING],
  },
  {
    id: '2',
    name: 'ISO 3795',
    organization: 'ISO',
    title: 'Road vehicles - Determination of burning behaviour of interior materials',
    description: 'This standard specifies a method for determining the horizontal burning rate of materials used in the interior of road vehicles.',
    lastUpdated: new Date('2023-10-20'),
    industries: [Industry.AUTOMOTIVE],
  },
  {
    id: '3',
    name: 'AATCC 195',
    organization: 'AATCC',
    title: 'Liquid Moisture Management Properties of Textile Fabrics',
    description: 'This test method measures the liquid moisture management properties of textile fabrics.',
    lastUpdated: new Date('2024-02-10'),
    industries: [Industry.SPORTSWEAR],
  },
  {
    id: '4',
    name: 'AATCC 199',
    organization: 'AATCC',
    title: 'Drying Rate of Fabrics: Moisture Analyzer Method',
    description: 'This test method determines the drying rate of textile fabrics using a moisture analyzer.',
    lastUpdated: new Date('2024-03-05'),
    industries: [Industry.SPORTSWEAR, Industry.CAMPING],
  },
  {
    id: '5',
    name: 'ISO 811',
    organization: 'ISO',
    title: 'Textiles - Determination of resistance to water penetration - Hydrostatic pressure test',
    description: 'This standard specifies a hydrostatic pressure method for determining the resistance of fabrics to water penetration.',
    lastUpdated: new Date('2023-11-15'),
    industries: [Industry.CAMPING, Industry.SPORTSWEAR],
  },
  {
    id: '6',
    name: 'AATCC 127',
    organization: 'AATCC',
    title: 'Water Resistance: Hydrostatic Pressure Test',
    description: 'This test method measures the resistance of fabrics to water penetration by hydrostatic pressure.',
    lastUpdated: new Date('2024-01-20'),
    industries: [Industry.CAMPING, Industry.SPORTSWEAR],
  },
  {
    id: '7',
    name: 'AATCC 186',
    organization: 'AATCC',
    title: 'Weather Resistance: UV Light and Moisture Exposure',
    description: 'This test method evaluates the weather resistance of textiles when exposed to UV light and moisture.',
    lastUpdated: new Date('2024-04-10'),
    industries: [Industry.CAMPING, Industry.SPORTSWEAR, Industry.AUTOMOTIVE],
  },
  {
    id: '8',
    name: 'ISO 105-B02',
    organization: 'ISO',
    title: 'Textiles - Tests for colour fastness - Part B02: Colour fastness to artificial light',
    description: 'This standard specifies a method for determining the colour fastness of textiles to artificial light.',
    lastUpdated: new Date('2023-09-25'),
    industries: [Industry.CAMPING, Industry.SPORTSWEAR, Industry.AUTOMOTIVE],
  },
  {
    id: '9',
    name: 'ASTM D5035',
    organization: 'ASTM',
    title: 'Standard Test Method for Breaking Force and Elongation of Textile Fabrics (Strip Method)',
    description: 'This test method covers the measurement of breaking force and elongation of textile fabrics.',
    lastUpdated: new Date('2024-06-05'),
    industries: [Industry.AUTOMOTIVE, Industry.SPORTSWEAR, Industry.CAMPING],
  },
  {
    id: '10',
    name: 'ISO 13934-1',
    organization: 'ISO',
    title: 'Textiles - Tensile properties of fabrics - Part 1: Determination of maximum force and elongation at maximum force using the strip method',
    description: 'This standard specifies a method for determining the maximum force and elongation at maximum force of textile fabrics.',
    lastUpdated: new Date('2023-12-10'),
    industries: [Industry.AUTOMOTIVE, Industry.SPORTSWEAR, Industry.CAMPING],
  },
  {
    id: '11',
    name: 'ISO 12947-2',
    organization: 'ISO',
    title: 'Textiles - Determination of the abrasion resistance of fabrics by the Martindale method - Part 2: Determination of specimen breakdown',
    description: 'This standard specifies a method for determining the abrasion resistance of fabrics using the Martindale method.',
    lastUpdated: new Date('2024-01-15'),
    industries: [Industry.AUTOMOTIVE, Industry.SPORTSWEAR, Industry.CAMPING],
  },
];

// Parameters Data
export const parameters = [
  { id: '1', name: 'Temperature', unit: '°C', defaultValue: 23, minValue: -10, maxValue: 200 },
  { id: '2', name: 'Humidity', unit: '%', defaultValue: 65, minValue: 10, maxValue: 100 },
  { id: '3', name: 'Pressure', unit: 'kPa', defaultValue: 101, minValue: 50, maxValue: 500 },
  { id: '4', name: 'Cycles', unit: 'count', defaultValue: 1000, minValue: 1, maxValue: 10000 },
  { id: '5', name: 'Speed', unit: 'mm/min', defaultValue: 300, minValue: 50, maxValue: 1000 },
  { id: '6', name: 'Force', unit: 'N', defaultValue: 100, minValue: 1, maxValue: 5000 },
  { id: '7', name: 'Duration', unit: 'min', defaultValue: 30, minValue: 1, maxValue: 1440 },
  { id: '8', name: 'Angle', unit: '°', defaultValue: 45, minValue: 0, maxValue: 360 },
  { id: '9', name: 'Distance', unit: 'mm', defaultValue: 100, minValue: 1, maxValue: 1000 },
  { id: '10', name: 'Weight', unit: 'g', defaultValue: 200, minValue: 1, maxValue: 10000 },
  { id: '11', name: 'UV Intensity', unit: 'W/m²', defaultValue: 60, minValue: 30, maxValue: 120 },
  { id: '12', name: 'Water Temperature', unit: '°C', defaultValue: 20, minValue: 10, maxValue: 30 },
  { id: '13', name: 'Flame Height', unit: 'mm', defaultValue: 40, minValue: 10, maxValue: 100 },
  { id: '14', name: 'Air Flow', unit: 'm/s', defaultValue: 0.5, minValue: 0, maxValue: 5 },
  { id: '15', name: 'Gauge Length', unit: 'mm', defaultValue: 100, minValue: 50, maxValue: 200 },
];

// Chatbot Conversations Data
export const chatbotConversations = [
  {
    id: 'conv1',
    title: 'Flammability test procedure',
    messages: [
      {
        id: 'm1',
        sender: 'user',
        content: 'How do I prepare samples for ASTM D6413 flammability testing?',
        timestamp: new Date('2025-03-22T14:30:00'),
      },
      {
        id: 'm2',
        sender: 'bot',
        content: `To prepare samples for ASTM D6413 flammability testing, follow these steps:

1. Cut specimens to 3 inches (75 mm) wide by 12 inches (305 mm) long.
2. Take at least 5 specimens for each material direction (warp and filling for woven fabrics).
3. Condition the specimens for at least 24 hours at 70°F ± 2°F (21°C ± 1°C) and 65% ± 2% relative humidity.
4. Mark each specimen at 10 inches (255 mm) from the bottom edge for char length measurement.
5. If the material has a raised fiber surface, brush it in the direction that gives the most adverse result.

Would you like me to provide more details about the testing procedure itself?`,
        timestamp: new Date('2025-03-22T14:31:00'),
        attachments: [
          {
            id: 'a1',
            type: 'pdf',
            name: 'ASTM_D6413_Sample_Preparation.pdf',
          }
        ],
      },
      {
        id: 'm3',
        sender: 'user',
        content: 'Yes, please explain the testing procedure and what equipment I need.',
        timestamp: new Date('2025-03-22T14:32:00'),
      },
      {
        id: 'm4',
        sender: 'bot',
        content: `For ASTM D6413 flammability testing, you'll need the following equipment:

1. Vertical flame test cabinet with specimen holder
2. Standard ignition source (Bunsen or Tirrill burner)
3. Timing device with 0.1-second accuracy
4. Steel ruler or scale
5. Stopwatch or automatic timing device

Testing procedure:

1. Mount the specimen in the holder with the bottom edge exposed to the ignition source.
2. Apply the flame to the center of the bottom edge for 12 seconds.
3. After 12 seconds, remove the flame and start timing:
   - Afterflame time: Duration the specimen continues to flame after the ignition source is removed
   - Afterglow time: Duration the specimen continues to glow after flaming ceases
4. Measure the char length (the distance from the original bottom edge to the end of the tear or void).
5. Record observations such as melting, dripping, or breaking.

In our lab, we use the SDL Atlas Vertical Flammability Tester located in Lab Room 101. The equipment is currently undergoing maintenance but should be available by tomorrow. Would you like me to schedule a demonstration?`,
        timestamp: new Date('2025-03-22T14:33:00'),
        attachments: [
          {
            id: 'a2',
            type: 'image',
            name: 'Vertical_Flame_Test_Cabinet.jpg',
          }
        ],
      },
    ],
    lastMessage: 'How do I prepare samples for ASTM D6413?',
    timestamp: new Date('2025-03-22T14:30:00'),
    unread: false,
  },
  {
    id: 'conv2',
    title: 'Equipment calibration',
    messages: [
      {
        id: 'm1',
        sender: 'user',
        content: 'When is the next calibration for Instron 5967?',
        timestamp: new Date('2025-03-21T10:15:00'),
      },
      {
        id: 'm2',
        sender: 'bot',
        content: `The Instron 5967 tensile tester was last calibrated on January 15, 2025, and its next scheduled calibration is due on July 15, 2025.

The calibration status is currently marked as "CURRENT" and the equipment is operational. The calibration is performed by Instron Certified Service technicians every 6 months.

Would you like me to provide more details about the calibration procedure or the maintenance history of this equipment?`,
        timestamp: new Date('2025-03-21T10:16:00'),
      },
    ],
    lastMessage: 'When is the next calibration for Instron 5967?',
    timestamp: new Date('2025-03-21T10:15:00'),
    unread: true,
  },
  {
    id: 'conv3',
    title: 'Test method parameters',
    messages: [
      {
        id: 'm1',
        sender: 'user',
        content: 'What are the standard parameters for moisture wicking tests?',
        timestamp: new Date('2025-03-20T16:45:00'),
      },
      {
        id: 'm2',
        sender: 'bot',
        content: `For moisture wicking tests using the AATCC 195 standard (Liquid Moisture Management Properties of Textile Fabrics), the standard parameters are:

1. Temperature: 21°C ± 1°C
2. Humidity: 65% ± 2% RH
3. Test Liquid: Distilled water with NaCl (0.9%) and non-ionic surfactant (0.005%)
4. Drop Volume: 0.2 mL
5. Test Duration: 5 minutes

For the AATCC 199 standard (Drying Rate of Fabrics: Moisture Analyzer Method), the standard parameters are:

1. Temperature: 37°C ± 2°C
2. Humidity: 65% ± 2% RH
3. Test Liquid: Distilled water
4. Liquid Amount: 0.2 g per gram of specimen
5. Specimen Size: 70 mm diameter

Our lab uses the SDL Atlas MM-1 Moisture Management Tester for AATCC 195 tests. Would you like me to provide more information about specific test methods or equipment settings?`,
        timestamp: new Date('2025-03-20T16:46:00'),
      },
    ],
    lastMessage: 'What are the standard parameters for moisture wicking tests?',
    timestamp: new Date('2025-03-20T16:45:00'),
    unread: false,
  },
];

// Saved Prompts Data
export const savedPrompts = [
  {
    id: 'prompt1',
    title: 'Test method troubleshooting',
    content: "I'm having trouble with [test method]. The results show [issue]. What could be causing this and how can I fix it?",
  },
  {
    id: 'prompt2',
    title: 'Equipment setup',
    content: 'How do I set up [equipment] for [test method]? Please provide step-by-step instructions.',
  },
  {
    id: 'prompt3',
    title: 'Parameter recommendations',
    content: 'What are the recommended parameters for testing [material type] for [property]?',
  },
];

// Dashboard KPI Data
export const dashboardKPIs = {
  testsCompleted: {
    current: 127,
    previous: 112,
    change: 13.4,
    period: 'This Month'
  },
  equipmentUtilization: {
    current: 72,
    previous: 68,
    change: 5.9,
    period: 'This Month'
  },
  pendingTests: {
    current: 18,
    previous: 22,
    change: -18.2,
    period: 'This Week'
  },
  averageTestDuration: {
    current: 3.2,
    previous: 3.5,
    change: -8.6,
    period: 'This Month',
    unit: 'hours'
  },
  testsByIndustry: [
    { industry: Industry.AUTOMOTIVE, count: 52 },
    { industry: Industry.SPORTSWEAR, count: 43 },
    { industry: Industry.CAMPING, count: 32 }
  ],
  testsByStatus: [
    { status: JobStatus.COMPLETED, count: 127 },
    { status: JobStatus.IN_PROGRESS, count: 5 },
    { status: JobStatus.SCHEDULED, count: 13 },
    { status: JobStatus.FAILED, count: 3 },
    { status: JobStatus.CANCELLED, count: 2 }
  ],
  equipmentStatus: [
    { status: EquipmentStatus.OPERATIONAL, count: 6 },
    { status: EquipmentStatus.MAINTENANCE, count: 1 },
    { status: EquipmentStatus.OUT_OF_SERVICE, count: 1 }
  ],
  recentTests: [
    {
      id: 'JOB-2025-0341',
      title: 'Sportswear Elasticity Test',
      status: JobStatus.COMPLETED,
      completedAt: new Date('2025-03-22T15:30:00'),
      technician: 'Jane Smith'
    },
    {
      id: 'JOB-2025-0340',
      title: 'Automotive Seat Cover Abrasion Test',
      status: JobStatus.COMPLETED,
      completedAt: new Date('2025-03-22T14:15:00'),
      technician: 'Michael Brown'
    },
    {
      id: 'JOB-2025-0339',
      title: 'Camping Fabric UV Resistance Test',
      status: JobStatus.COMPLETED,
      completedAt: new Date('2025-03-22T11:45:00'),
      technician: 'Sarah Williams'
    },
    {
      id: 'JOB-2025-0338',
      title: 'Automotive Interior Fabric Color Fastness',
      status: JobStatus.FAILED,
      completedAt: new Date('2025-03-22T10:30:00'),
      technician: 'John Doe'
    }
  ]
};

// Service functions
export const mockService = {
  // Test Methods
  getTestMethods: () => {
    return Promise.resolve(testMethods);
  },
  getTestMethodById: (id: string) => {
    const method = testMethods.find(m => m.id === id);
    return Promise.resolve(method);
  },
  
  // Jobs
  getJobs: () => {
    return Promise.resolve(jobs);
  },
  getJobById: (id: string) => {
    const job = jobs.find(j => j.id === id);
    return Promise.resolve(job);
  },
  
  // Equipment
  getEquipment: () => {
    return Promise.resolve(equipment);
  },
  getEquipmentById: (id: string) => {
    const item = equipment.find(e => e.id === id);
    return Promise.resolve(item);
  },
  getMaintenanceHistory: (equipmentId: string) => {
    const history = maintenanceHistory.filter(m => m.equipmentId === equipmentId);
    return Promise.resolve(history);
  },
  
  // Technicians
  getTechnicians: () => {
    return Promise.resolve(technicians);
  },
  getTechnicianById: (id: string) => {
    const technician = technicians.find(t => t.id === id);
    return Promise.resolve(technician);
  },
  
  // Standards
  getStandards: () => {
    return Promise.resolve(standards);
  },
  getStandardById: (id: string) => {
    const standard = standards.find(s => s.id === id);
    return Promise.resolve(standard);
  },
  
  // Parameters
  getParameters: () => {
    return Promise.resolve(parameters);
  },
  
  // Chatbot
  getChatbotConversations: () => {
    return Promise.resolve(chatbotConversations);
  },
  getChatbotConversationById: (id: string) => {
    const conversation = chatbotConversations.find(c => c.id === id);
    return Promise.resolve(conversation);
  },
  getSavedPrompts: () => {
    return Promise.resolve(savedPrompts);
  },
  
  // Dashboard
  getDashboardData: () => {
    return Promise.resolve(dashboardKPIs);
  },
  
  // Calendar Events
  getCalendarEvents: () => {
    return Promise.resolve(jobs.map(job => ({
      id: job.id,
      title: job.title,
      start: job.scheduledStart,
      end: job.scheduledEnd,
      status: job.status,
      equipment: job.equipment,
      technician: job.technician,
      color: job.status === JobStatus.IN_PROGRESS ? '#1976D2' : 
             job.status === JobStatus.COMPLETED ? '#4CAF50' : 
             job.status === JobStatus.FAILED ? '#F44336' : 
             job.status === JobStatus.CANCELLED ? '#9E9E9E' : '#2196F3'
    })));
  }
};
