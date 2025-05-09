import { TestMethod } from './test-method';

/**
 * Mock Test Methods for Textile Testing Laboratory
 * 
 * This file contains detailed implementation examples for various
 * textile testing standards, following industry practices and
 * real-world laboratory procedures.
 */

export const mockTestMethods: TestMethod[] = [
  {
    id: "m1",
    standardId: "1", // ISO 105-C06
    name: "A1S - Accelerated Test",
    description: "Accelerated test for color fastness to washing with added steel balls for mechanical action",
    purpose: "To determine the resistance of the color of textiles to domestic or commercial laundering procedures using a reference detergent",
    sampleRequirements: {
      size: "100mm x 40mm",
      quantity: 5,
      preparation: [
        "Cut specimens along warp direction",
        "Sew specimen to multifiber adjacent fabric",
        "Each specimen must include all colors if multicolored"
      ],
      conditioning: "Condition specimens at 20±2°C and 65±4% relative humidity for at least 4 hours",
      minimumWeight: 5,
      specialRequirements: "If fabric is heavily sized, pre-wash according to ISO 3759"
    },
    equipmentRequirements: [
      {
        name: "Launder-Ometer or Gyrowash",
        specifications: "With rotational speed of 40±2 rpm",
        calibrationRequired: true,
        alternatives: ["Linitest", "Washtec-P"]
      },
      {
        name: "Stainless steel containers",
        specifications: "75mm diameter x 125mm height",
        calibrationRequired: false
      },
      {
        name: "Stainless steel balls",
        specifications: "6mm diameter, grade 100 to grade 125",
        calibrationRequired: false
      },
      {
        name: "Grey scale for color change",
        specifications: "ISO 105-A02",
        calibrationRequired: true
      }
    ],
    chemicalRequirements: [
      {
        name: "ECE Reference Detergent",
        concentration: "4g/L",
        quantity: "150ml per container",
        purity: "Without optical brightener",
        hazardLevel: "Low",
        storageRequirements: "Store in dry place away from direct sunlight"
      },
      {
        name: "Sodium perborate tetrahydrate",
        concentration: "1g/L",
        quantity: "As per test requirement",
        purity: "Analytical grade",
        hazardLevel: "Medium",
        storageRequirements: "Store in tightly closed container"
      }
    ],
    procedure: [
      {
        stepNumber: 1,
        description: "Prepare wash solution by dissolving 4g/L of ECE reference detergent in distilled water at 40°C",
        criticalParameters: {"Water hardness": "Max 3°dH (German hardness degree)"}
      },
      {
        stepNumber: 2,
        description: "Place test specimen in stainless steel container with 10 steel balls",
        duration: 5
      },
      {
        stepNumber: 3,
        description: "Add 150ml of wash solution at 40±2°C to each container",
        temperature: 40,
        criticalParameters: {"Solution temperature": "40±2°C"}
      },
      {
        stepNumber: 4,
        description: "Seal containers and place in Launder-Ometer",
        qualityCheckpoint: true
      },
      {
        stepNumber: 5,
        description: "Start machine and run for 30 minutes at 40±2°C",
        duration: 30,
        temperature: 40,
        criticalParameters: {"Runtime": "30 minutes", "Temperature": "40±2°C"}
      },
      {
        stepNumber: 6,
        description: "Remove specimens and rinse twice in separate baths of distilled water at 40±2°C for 1 minute",
        duration: 2,
        temperature: 40
      },
      {
        stepNumber: 7,
        description: "Rinse specimens in cold running water for 1 minute",
        duration: 1,
        temperature: 20
      },
      {
        stepNumber: 8,
        description: "Squeeze out excess water and dry specimens by hanging in air at temperature not exceeding 60°C",
        warningNotes: "Ensure specimens do not come in contact with each other or any other colored material"
      },
      {
        stepNumber: 9,
        description: "Evaluate color change using grey scale under standard illuminant D65",
        qualityCheckpoint: true
      }
    ],
    calculationMethod: "Report the numerical value of the grey scale rating (1-5, where 5 is best) for color change. If half-steps are used, report as 4-5, 3-4, etc.",
    reportingRequirements: [
      "Standard used and test method variant",
      "Grey scale rating for color change",
      "Rating for staining on each fiber of multifiber fabric",
      "Details of any deviation from standard method",
      "Test date and responsible technician"
    ],
    estimatedDuration: 90, // Total duration in minutes
    difficulty: "Intermediate",
    hazards: [
      {
        type: "Chemical",
        description: "Detergent and sodium perborate may cause eye or skin irritation",
        severity: "Low",
        mitigationMeasures: ["Wear laboratory gloves", "Use eye protection", "Work in well-ventilated area"]
      }
    ],
    references: [
      {
        title: "Textiles - Tests for colour fastness - Part C06: Colour fastness to domestic and commercial laundering",
        publication: "International Organization for Standardization",
        year: 2010,
        doi: "10.3403/30180510"
      }
    ],
    notes: "For fabrics that bleed heavily, the test may be conducted with a reduced liquor ratio to increase the severity."
  },
  {
    id: "m2",
    standardId: "2", // AATCC 8
    name: "Standard Crocking Test Method",
    description: "Test method for color fastness to rubbing (crocking) using a crockmeter",
    purpose: "To determine the degree of color transferred from textile surfaces to other surfaces by rubbing",
    sampleRequirements: {
      size: "130mm x 50mm",
      quantity: 2,
      preparation: [
        "Cut specimens in both warp and filling directions",
        "If fabric has a pile, brush in the direction of pile lay"
      ],
      conditioning: "Condition specimens at 21±1°C and 65±2% relative humidity for at least 4 hours",
      minimumWeight: 5
    },
    equipmentRequirements: [
      {
        name: "AATCC Crockmeter",
        specifications: "Standard 9N downward force",
        calibrationRequired: true,
        alternatives: ["Electronic Crockmeter"]
      },
      {
        name: "AATCC Crocking Cloth",
        specifications: "White cotton test squares, 50mm x 50mm",
        calibrationRequired: false
      },
      {
        name: "AATCC Grey Scale for Staining",
        specifications: "Per AATCC Evaluation Procedure 2",
        calibrationRequired: true
      }
    ],
    chemicalRequirements: [
      {
        name: "Distilled water",
        concentration: "100%",
        quantity: "As needed for wet crocking",
        purity: "Laboratory grade",
        hazardLevel: "Low",
        storageRequirements: "Standard laboratory storage"
      }
    ],
    procedure: [
      {
        stepNumber: 1,
        description: "Secure test specimen on base of crockmeter with long dimension in direction of rubbing",
        qualityCheckpoint: true
      },
      {
        stepNumber: 2,
        description: "For dry crocking test: Mount dry crocking cloth square on end of crockmeter finger",
        duration: 1
      },
      {
        stepNumber: 3,
        description: "For wet crocking test: Wet crocking cloth with distilled water to 65±5% pickup",
        criticalParameters: {"Water pickup": "65±5%"}
      },
      {
        stepNumber: 4,
        description: "Lower rubbing finger onto test specimen",
        duration: 1
      },
      {
        stepNumber: 5,
        description: "Turn crank at one turn per second for 10 complete cycles",
        duration: 10,
        criticalParameters: {"Cycles": "10", "Speed": "1 turn per second"}
      },
      {
        stepNumber: 6,
        description: "Remove crocking cloth and allow to air dry completely before evaluation",
        warningNotes: "For wet crocking test, evaluation must be done after drying"
      },
      {
        stepNumber: 7,
        description: "Evaluate color transfer to crocking cloth using AATCC Grey Scale for Staining",
        qualityCheckpoint: true
      }
    ],
    calculationMethod: "Report the numerical value of the grey scale rating (1-5, where 5 is best) for staining on crocking cloth",
    reportingRequirements: [
      "Dry crocking grade",
      "Wet crocking grade (if performed)",
      "Direction tested (warp, filling, or both)",
      "Type of material tested",
      "Test date and responsible technician"
    ],
    estimatedDuration: 30,
    difficulty: "Basic",
    hazards: [
      {
        type: "Physical",
        description: "Pinch points on crockmeter",
        severity: "Low",
        mitigationMeasures: ["Operate equipment carefully", "Keep fingers away from moving parts"]
      }
    ],
    references: [
      {
        title: "AATCC Test Method 8: Colorfastness to Crocking",
        publication: "American Association of Textile Chemists and Colorists",
        year: 2016
      }
    ],
    notes: "Results may vary depending on the pressure applied, number of strokes, and degree of wetness of the wet crocking cloth."
  },
  {
    id: "m3",
    standardId: "3", // ASTM D3776
    name: "Standard Mass Per Unit Area (Weight) Determination",
    description: "Method to determine the mass per unit area of fabric",
    purpose: "To measure the weight in ounces per square yard or grams per square meter of fabric samples",
    sampleRequirements: {
      size: "Minimum 20cm x 20cm",
      quantity: 5,
      preparation: [
        "Cut specimens from different areas of the fabric",
        "Avoid selvedges and fabric closer than 1/10 of width from either edge",
        "Mark machine direction if necessary"
      ],
      conditioning: "Condition specimens at 21±1°C and 65±2% relative humidity for at least 4 hours",
      minimumWeight: 1
    },
    equipmentRequirements: [
      {
        name: "Analytical balance",
        specifications: "Accuracy to 0.001g",
        calibrationRequired: true
      },
      {
        name: "Die cutter or template",
        specifications: "For cutting precise specimen area",
        calibrationRequired: true,
        alternatives: ["Scissors with template"]
      }
    ],
    chemicalRequirements: [],
    procedure: [
      {
        stepNumber: 1,
        description: "Prepare laboratory samples by bringing them to moisture equilibrium in standard atmosphere",
        duration: 240, // 4 hours
        criticalParameters: {"Temperature": "21±1°C", "Relative humidity": "65±2%"}
      },
      {
        stepNumber: 2,
        description: "Option A (for Option A - Cutting specimens to specific dimensions): Cut five specimens of precise dimensions using template or die cutter",
        qualityCheckpoint: true
      },
      {
        stepNumber: 3,
        description: "Option B (for Option B - Use of small specimens): Cut five specimens of at least 20 sq. cm in area",
        qualityCheckpoint: true
      },
      {
        stepNumber: 4,
        description: "Weigh each specimen to the nearest 0.001g",
        criticalParameters: {"Balance accuracy": "±0.001g"}
      },
      {
        stepNumber: 5,
        description: "For Option A: Calculate mass per unit area by converting the mass of each specimen to mass per unit area",
        calculationMethod: "Mass (g/m²) = (Mass in g × 10000) ÷ (length in cm × width in cm)"
      },
      {
        stepNumber: 6,
        description: "For Option B: Measure precise area of each specimen using planimeter or other accurate method",
        criticalParameters: {"Area measurement accuracy": "±0.5%"}
      },
      {
        stepNumber: 7,
        description: "For Option B: Calculate mass per unit area by dividing mass by measured area",
        calculationMethod: "Mass (g/m²) = (Mass in g × 10000) ÷ Area in sq. cm"
      }
    ],
    calculationMethod: "Calculate mean and standard deviation of the 5 specimens. Convert to oz/yd² if needed using the formula: oz/yd² = g/m² × 0.0295",
    reportingRequirements: [
      "Mass per unit area in g/m² and/or oz/yd²",
      "Standard deviation or coefficient of variation",
      "Number of specimens tested",
      "Option used (A or B)",
      "Test date and responsible technician"
    ],
    estimatedDuration: 300, // Including conditioning time
    difficulty: "Basic",
    hazards: [
      {
        type: "Physical",
        description: "Sharp cutting tools",
        severity: "Low",
        mitigationMeasures: ["Use cutting tools carefully", "Store cutting tools safely when not in use"]
      }
    ],
    references: [
      {
        title: "ASTM D3776 / D3776M - 09a(2017): Standard Test Methods for Mass Per Unit Area (Weight) of Fabric",
        publication: "American Society for Testing and Materials",
        year: 2017,
        doi: "10.1520/D3776_D3776M-09AR17"
      }
    ],
    notes: "For nonwoven fabrics with high variability, more specimens may be required to achieve acceptable precision."
  }
];
