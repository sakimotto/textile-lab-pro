/**
 * Test Method - Detailed implementation of a test standard
 * 
 * This model represents the practical implementation of a test standard,
 * including step-by-step procedures, sample requirements, and detailed
 * equipment specifications needed in a textile testing laboratory.
 */

import { TestStandard } from './test-standard';

export interface TestMethod {
  id: string;
  standardId: string;          // Reference to parent TestStandard
  name: string;                // Method name (e.g., "A1S - Accelerated")
  description: string;         // Detailed method description
  purpose: string;             // What this method evaluates
  sampleRequirements: SampleRequirement;
  equipmentRequirements: EquipmentRequirement[];
  chemicalRequirements: ChemicalRequirement[];
  procedure: ProcedureStep[];
  calculationMethod: string;   // How to calculate the final result
  reportingRequirements: string[];
  estimatedDuration: number;   // In minutes
  difficulty: 'Basic' | 'Intermediate' | 'Advanced';
  hazards: Hazard[];
  references: Reference[];     // Academic or industry references
  notes: string;
}

export interface SampleRequirement {
  size: string;                // e.g., "100mm x 100mm"
  quantity: number;            // Number of specimens required
  preparation: string[];       // Sample preparation steps
  conditioning: string;        // Required conditioning
  minimumWeight: number;       // In grams
  specialRequirements?: string;
}

export interface EquipmentRequirement {
  name: string;                // Equipment name
  specifications: string;      // Required specifications
  calibrationRequired: boolean;
  alternatives?: string[];     // Alternative equipment that can be used
}

export interface ChemicalRequirement {
  name: string;                // Chemical name
  concentration: string;       // Required concentration
  quantity: string;            // Required quantity
  purity: string;              // Required purity
  hazardLevel: 'Low' | 'Medium' | 'High';
  storageRequirements: string;
}

export interface ProcedureStep {
  stepNumber: number;
  description: string;
  duration?: number;           // Time in minutes
  temperature?: number;        // In degrees Celsius
  criticalParameters?: {[key: string]: string};
  image?: string;              // Reference to illustration image
  warningNotes?: string;
  qualityCheckpoint?: boolean; // Indicates if this step requires QC verification
}

export interface Hazard {
  type: 'Chemical' | 'Physical' | 'Biological' | 'Radiation' | 'Other';
  description: string;
  severity: 'Low' | 'Medium' | 'High';
  mitigationMeasures: string[];
}

export interface Reference {
  title: string;
  authors?: string[];
  publication?: string;
  year?: number;
  url?: string;
  doi?: string;
}

// Helper function to fetch test methods by standard ID
export const getMethodsByStandardId = (standardId: string, methods: TestMethod[]): TestMethod[] => {
  return methods.filter(method => method.standardId === standardId);
};

// Example mock data will be added in a separate implementation
