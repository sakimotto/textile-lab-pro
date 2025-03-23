# Sample Management Implementation Plan

## Overview

This document outlines the implementation plan for the Sample Management workflow in TextileLab Pro. Sample management is a core functionality that enables tracking textile samples from submission through testing to final reporting.

## Implementation Timeline

| Task | Timeline | Status |
|------|----------|--------|
| Sample Form UI Design | Week 1, Days 1-2 | Not Started |
| Form Validation & API | Week 1, Days 2-3 | Not Started |
| Sample Status Workflow | Week 1, Days 3-4 | Not Started |
| Sample Dashboard | Week 1, Day 5 | Not Started |
| Integration Testing | Week 2, Day 1 | Not Started |

## Implementation Progress

The Sample Management workflow has been successfully implemented with the following features:

- Created a multi-step `SampleSubmissionForm` component with MUI styling
- Implemented sample data list view with filtering, sorting, and pagination
- Added status and priority indicators with color-coded visual elements
- Ensured responsive design for both desktop and mobile views
- Fixed TypeScript type definitions throughout the implementation
- Replaced MUI X DatePicker components with standard date inputs for better compatibility

### Technical Notes

- Initial implementation uses mock data for demonstration purposes
- The form has client-side validation for required fields
- Image upload functionality currently stores images temporarily in the component state
- Backend API integration will be implemented in the next phase

## Detailed Implementation Tasks

### 1. Sample Submission Form

#### UI Components

- Multi-step form with progress indicator
- Dynamic fields based on sample type
- File upload for sample images
- Client selection with search/filter
- Test selection with dependency handling
- Due date selection with calendar
- Priority selection
- Special instructions text area
- Sample metadata fields:
  - Material type
  - Color
  - Weight
  - Dimensions
  - Source/manufacturer
  - Batch/lot number

#### Backend Implementation

- API route for sample creation
- File upload handling with Cloud Storage
- Sample ID generation logic
- Database schema updates
- Validation middleware
- Error handling

### 2. Sample Status Workflow

#### Status Transitions

1. **Submitted** - Initial state when sample is registered
2. **Received** - Sample physically received in the lab
3. **In Queue** - Waiting for testing to begin
4. **In Testing** - Tests are being performed
5. **Testing Complete** - All tests completed
6. **Report Pending** - Awaiting report generation
7. **Completed** - Report generated and available
8. **Archived** - Sample testing completed and archived

#### Implementation Details

- Status update API
- Timestamp tracking for each status change
- User tracking for each status change
- Comment/notes field for each transition
- Email notification triggers
- Dashboard notifications
- Status history log

### 3. Sample Management Dashboard

#### Key Features

- Filterable table view of all samples
- Quick filters for common statuses
- Search functionality (by ID, client, type)
- Status distribution chart
- Turnaround time metrics
- Workload distribution by technician
- Batch operations:
  - Status updates
  - Technician assignment
  - Priority adjustment
  - Export data

#### Technical Implementation

- Server-side pagination
- Advanced filtering with Prisma
- Sortable columns
- Data export to CSV/Excel
- Performance optimization for large datasets

## Database Schema Updates

### Sample Table

```prisma
model Sample {
  id              String    @id @default(cuid())
  sampleId        String    @unique // Human-readable ID (e.g., SAM-2025-0001)
  clientId        String
  client          User      @relation(fields: [clientId], references: [id])
  name            String
  description     String?
  materialType    String
  color           String?
  weight          Float?
  dimensions      String?
  batchNumber     String?
  receivedDate    DateTime?
  dueDate         DateTime?
  priority        String    @default("NORMAL") // HIGH, NORMAL, LOW
  status          String    @default("SUBMITTED")
  specialInstructions String?
  images          SampleImage[]
  tests           Test[]
  statusHistory   StatusChange[]
  createdAt       DateTime  @default(now())
  updatedAt       DateTime  @updatedAt
  createdById     String
  createdBy       User      @relation("SampleCreator", fields: [createdById], references: [id])
  assignedToId    String?
  assignedTo      User?     @relation("AssignedSamples", fields: [assignedToId], references: [id])
}

model SampleImage {
  id              String    @id @default(cuid())
  sampleId        String
  sample          Sample    @relation(fields: [sampleId], references: [id], onDelete: Cascade)
  url             String
  filename        String
  contentType     String
  size            Int
  createdAt       DateTime  @default(now())
}

model StatusChange {
  id              String    @id @default(cuid())
  sampleId        String
  sample          Sample    @relation(fields: [sampleId], references: [id], onDelete: Cascade)
  fromStatus      String
  toStatus        String
  comment         String?
  changedById     String
  changedBy       User      @relation(fields: [changedById], references: [id])
  timestamp       DateTime  @default(now())
}
```

## API Routes

### Sample Management

- `POST /api/samples` - Create new sample
- `GET /api/samples` - List samples with filtering
- `GET /api/samples/:id` - Get sample details
- `PATCH /api/samples/:id` - Update sample details
- `PATCH /api/samples/:id/status` - Update sample status
- `POST /api/samples/:id/images` - Add images to sample
- `DELETE /api/samples/:id/images/:imageId` - Remove image
- `GET /api/samples/dashboard` - Get dashboard metrics

## UI Components to Create

1. **SampleForm.tsx** - Multi-step form component
2. **SampleCard.tsx** - Sample overview card
3. **SampleStatusBadge.tsx** - Status indicator with color coding
4. **SampleDetailsView.tsx** - Detailed view of sample
5. **SampleHistoryTimeline.tsx** - Status change history
6. **SampleImageGallery.tsx** - Image display component
7. **SampleFilterBar.tsx** - Advanced filtering controls
8. **SampleDashboard.tsx** - Dashboard view with metrics
9. **SampleTable.tsx** - Table view with sorting and pagination

## Success Criteria

1. Users can submit new samples with all required information
2. Samples can be tracked through their entire lifecycle
3. Status changes are logged with timestamp and user information
4. Dashboard provides clear visibility of sample status and metrics
5. Users can easily find and filter samples
6. System handles file uploads for sample images reliably
7. Performance remains fast even with thousands of samples

## Future Enhancements

1. Barcode/QR code generation for physical sample tracking
2. Mobile app for sample submission from field locations
3. AI-based material identification from images
4. Integration with equipment for automatic test result recording
5. Client portal for direct sample submission by clients

## Questions and Decisions

1. How many simultaneous image uploads should we support per sample?
   - Recommendation: Limit to 5 images per sample, each max 5MB
2. Should we implement batch sample creation?
   - Recommendation: Yes, via CSV import in Phase 2
3. How long should we retain sample data and images?
   - Recommendation: Active for 1 year, then archived for 5 years
4. Should clients be able to track their samples?
   - Recommendation: Yes, via client portal in Phase 3

[Created: March 23, 2025]
