# TextileLab Pro

A comprehensive textile laboratory management system built with Next.js, Material UI, and TypeScript.

## Features

- **Sample Management**: Multi-step submission form with status tracking
- **Test Method Library**: Standardized test methods with customization options
- **Client Management**: Track clients and their sample submissions
- **Testing Workflow**: End-to-end testing process management
- **Report Generation**: Automated test reports with customization
- **User Authentication**: Role-based access control
- **Dark/Light Mode**: Fully themeable user interface

## Technologies

- Next.js 14
- TypeScript
- Material UI 6
- Prisma ORM
- NextAuth.js
- React Hook Form

## Getting Started

1. Clone the repository
2. Install dependencies:

   ```bash
   npm install
   ```

3. Run the development server:

   ```bash
   npm run dev
   ```

4. Open [http://localhost:3003](http://localhost:3003) in your browser

## Project Structure

- `/src/app`: Next.js app router components and API routes
- `/src/components`: Reusable UI components
- `/src/lib`: Utility functions and shared code
- `/prisma`: Database schema and migrations
- `/docs`: Project documentation

## Sample Management

The Sample Management workflow allows lab technicians to:

- Submit new textile samples through a multi-step form
- Track sample status throughout the testing process
- Filter and sort samples by various criteria
- View detailed sample information and test results
- Generate reports based on test data

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
