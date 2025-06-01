# EduTrack - Student Management System

A modern, responsive web application for educational institutions to manage student data, track attendance, and monitor academic performance.

![EduTrack Dashboard](https://images.pexels.com/photos/5428003/pexels-photo-5428003.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2)

## Features

- **Student Management**
  - Comprehensive student profiles
  - Enrollment tracking
  - Contact information management
  - Parent/guardian details

- **Attendance Tracking**
  - Daily attendance records
  - Real-time attendance marking
  - Attendance analytics and reporting
  - Automated attendance status updates

- **Grade Management**
  - Course-wise grade tracking
  - GPA calculation
  - Performance analytics
  - Grade distribution visualization

- **Dashboard Analytics**
  - Key performance indicators
  - Real-time statistics
  - Visual data representation
  - Recent activity tracking

## Tech Stack

- React 18
- TypeScript
- Tailwind CSS
- Vite
- Lucide Icons

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/edutrack.git
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

## Project Structure

```
src/
├── components/
│   ├── dashboard/    # Dashboard-specific components
│   ├── layout/       # Layout components (Header, Sidebar)
│   ├── students/     # Student management components
│   └── ui/           # Reusable UI components
├── data/
│   └── mockData.ts   # Sample data for development
├── pages/
│   ├── Dashboard.tsx
│   ├── Students.tsx
│   ├── Attendance.tsx
│   └── Grades.tsx
└── types/
    └── index.ts      # TypeScript interfaces
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Lucide Icons](https://lucide.dev/) for beautiful icons
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [Vite](https://vitejs.dev/) for the build tool
- [TypeScript](https://www.typescriptlang.org/) for type safety