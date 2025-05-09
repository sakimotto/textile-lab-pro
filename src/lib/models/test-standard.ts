export interface TestStandard {
  id: string;
  code: string;         // e.g., "ISO 105-C06"
  name: string;         // e.g., "Colour fastness to domestic and commercial laundering"
  organization: string; // e.g., "ISO", "AATCC", "ASTM"
  category: string;     // e.g., "Colorfastness", "Physical", "Chemical"
  description: string;
  equipment: string[];
  applicableMaterials: string[];
  parameters: TestStandardParameter[];
  version: string;      // e.g., "2010"
  lastUpdated: string;
}

export interface TestStandardParameter {
  name: string;         // e.g., "Temperature"
  unit: string;         // e.g., "°C"
  defaultValue: string; // e.g., "40"
  allowedRange?: {
    min: number;
    max: number;
  };
  required: boolean;
}

// Mock data for development
export const mockTestStandards: TestStandard[] = [
  {
    id: "1",
    code: "ISO 105-C06",
    name: "Colour fastness to domestic and commercial laundering",
    organization: "ISO",
    category: "Colorfastness",
    description: "This standard specifies methods for determining the resistance of the colour of textiles to washing procedures used for household articles.",
    equipment: ["Launder-Ometer", "Gray Scale", "Spectrophotometer"],
    applicableMaterials: ["Cotton", "Polyester", "Nylon", "Wool", "Silk"],
    parameters: [
      {
        name: "Temperature",
        unit: "°C",
        defaultValue: "40",
        allowedRange: { min: 30, max: 95 },
        required: true
      },
      {
        name: "Detergent Concentration",
        unit: "g/L",
        defaultValue: "4",
        allowedRange: { min: 2, max: 10 },
        required: true
      },
      {
        name: "Time",
        unit: "min",
        defaultValue: "30",
        allowedRange: { min: 15, max: 60 },
        required: true
      }
    ],
    version: "2010",
    lastUpdated: "2020-01-15"
  },
  {
    id: "2",
    code: "ASTM D4966",
    name: "Standard Test Method for Abrasion Resistance of Textile Fabrics",
    organization: "ASTM",
    category: "Physical",
    description: "This test method covers the determination of the abrasion resistance of textile fabrics using the Martindale Abrasion Tester.",
    equipment: ["Martindale Abrasion Tester", "Analytical Balance", "Fabric Cutter"],
    applicableMaterials: ["All Fabrics"],
    parameters: [
      {
        name: "Pressure",
        unit: "kPa",
        defaultValue: "9",
        allowedRange: { min: 3, max: 12 },
        required: true
      },
      {
        name: "Cycles",
        unit: "cycles",
        defaultValue: "5000",
        allowedRange: { min: 1000, max: 50000 },
        required: true
      }
    ],
    version: "2012",
    lastUpdated: "2018-06-22"
  },
  {
    id: "3",
    code: "AATCC 8",
    name: "Colorfastness to Crocking: AATCC Crockmeter Method",
    organization: "AATCC",
    category: "Colorfastness",
    description: "This test method determines the amount of color transferred from the surface of colored textile materials to other surfaces by rubbing.",
    equipment: ["AATCC Crockmeter", "Gray Scale", "Standard Crocking Cloth"],
    applicableMaterials: ["All Colored Textiles"],
    parameters: [
      {
        name: "Condition",
        unit: "",
        defaultValue: "Dry",
        required: true
      },
      {
        name: "Strokes",
        unit: "cycles",
        defaultValue: "10",
        allowedRange: { min: 5, max: 20 },
        required: true
      }
    ],
    version: "2016",
    lastUpdated: "2021-03-10"
  },
  {
    id: "4",
    code: "ISO 13934-1",
    name: "Tensile properties of fabrics - Part 1: Determination of maximum force and elongation at maximum force using the strip method",
    organization: "ISO",
    category: "Physical",
    description: "This standard specifies a procedure to determine the maximum force and elongation at maximum force of textile fabrics using a strip method.",
    equipment: ["Tensile Testing Machine", "Fabric Cutter", "Conditioning Chamber"],
    applicableMaterials: ["Woven Fabrics", "Nonwoven Fabrics", "Technical Textiles"],
    parameters: [
      {
        name: "Gauge Length",
        unit: "mm",
        defaultValue: "200",
        allowedRange: { min: 100, max: 300 },
        required: true
      },
      {
        name: "Test Speed",
        unit: "mm/min",
        defaultValue: "100",
        allowedRange: { min: 50, max: 500 },
        required: true
      },
      {
        name: "Preload",
        unit: "N",
        defaultValue: "2",
        allowedRange: { min: 1, max: 5 },
        required: false
      }
    ],
    version: "2013",
    lastUpdated: "2019-11-05"
  },
  {
    id: "5",
    code: "16 CFR 1610",
    name: "Standard for the Flammability of Clothing Textiles",
    organization: "CPSC",
    category: "Flammability",
    description: "This standard provides a method to test the flammability of clothing textiles and establishes three classes of flammability.",
    equipment: ["Flammability Tester", "Stopwatch", "Conditioning Chamber"],
    applicableMaterials: ["Apparel Fabrics"],
    parameters: [
      {
        name: "Flame Impingement Time",
        unit: "sec",
        defaultValue: "1",
        required: true
      },
      {
        name: "Specimen Angle",
        unit: "degrees",
        defaultValue: "45",
        required: true
      }
    ],
    version: "2008",
    lastUpdated: "2017-08-15"
  },
  {
    id: "6",
    code: "ISO 5077",
    name: "Textiles - Determination of dimensional change in washing and drying",
    organization: "ISO",
    category: "Dimensional",
    description: "This standard specifies a method for determining the dimensional change of textiles after washing and drying.",
    equipment: ["Washing Machine", "Tumble Dryer", "Flat Drying Rack", "Measuring Device"],
    applicableMaterials: ["All Textiles"],
    parameters: [
      {
        name: "Washing Temperature",
        unit: "°C",
        defaultValue: "40",
        allowedRange: { min: 30, max: 95 },
        required: true
      },
      {
        name: "Drying Method",
        unit: "",
        defaultValue: "Flat Dry",
        required: true
      }
    ],
    version: "2007",
    lastUpdated: "2018-02-20"
  }
];
