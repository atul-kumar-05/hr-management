# HR Performance Dashboard

A comprehensive HR management dashboard built with Next.js, featuring employee performance tracking, bookmarking, and analytics.

## 🚀 Features

### Core Features
- **Dashboard Homepage** - Display employee cards with ratings, departments, and quick actions
- **Advanced Search & Filtering** - Search by name, email, department with multi-select filters
- **Employee Details** - Detailed profile pages with tabbed interface (Overview, Projects, Feedback)
- **Bookmark Management** - Save and manage favorite employees with bulk actions
- **Analytics Dashboard** - Performance insights with interactive charts and metrics

### Technical Features
- **Next.js App Router** - Modern routing with server and client components
- **Responsive Design** - Mobile-first design that works on all devices
- **Dark/Light Mode** - Theme switching with system preference detection
- **State Management** - Context API for global state management
- **Custom Hooks** - Reusable logic for bookmarks and search functionality
- **Loading States** - Skeleton loaders and error handling
- **Interactive Charts** - Department performance and rating distribution visualizations

## 🛠️ Tech Stack

- **Framework:** Next.js 14 with App Router
- **Styling:** Tailwind CSS + shadcn/ui components
- **Charts:** Recharts for data visualization
- **State Management:** React Context API
- **Data Source:** DummyJSON API for employee data
- **Icons:** Lucide React
- **TypeScript:** Full type safety

## 📦 Installation

1. Clone the repository:
\`\`\`bash
git clone <repository-url>
cd hr-dashboard
\`\`\`

2. Install dependencies:
\`\`\`bash
npm install
\`\`\`

3. Run the development server:
\`\`\`bash
npm run dev
\`\`\`

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🏗️ Project Structure

\`\`\`
hr-dashboard/
├── app/                    # Next.js App Router pages
│   ├── analytics/         # Analytics dashboard
│   ├── bookmarks/         # Bookmarked employees
│   ├── employee/[id]/     # Dynamic employee details
│   ├── employees/         # All employees page
│   └── page.tsx          # Homepage
├── components/            # Reusable UI components
│   ├── ui/               # shadcn/ui components
│   ├── employee-card.tsx # Employee card component
│   ├── navigation.tsx    # Main navigation
│   └── search-filters.tsx # Search and filter components
├── contexts/             # React Context providers
│   └── hr-context.tsx   # Main HR state management
├── hooks/               # Custom React hooks
│   ├── use-bookmarks.ts # Bookmark management
│   └── use-search.ts    # Search and filtering
└── lib/                # Utility functions
    └── utils.ts        # Common utilities
\`\`\`

## 🎯 Key Features Implemented

### 1. Employee Management
- Fetch employee data from DummyJSON API
- Display employee cards with ratings, departments, and contact info
- Star rating system with color-coded performance badges
- Bookmark functionality with persistent state

### 2. Search & Filtering
- Real-time search across name, email, and department
- Multi-select department and rating filters
- Active filter display with individual removal
- Clear all filters functionality

### 3. Employee Details
- Dynamic routing for individual employee pages
- Tabbed interface with Overview, Projects, and Feedback
- Performance history with progress bars
- Contact information and address details

### 4. Analytics Dashboard
- Department-wise performance charts
- Rating distribution pie chart
- Performance trend over time
- Key metrics cards (total employees, average rating, etc.)

### 5. Responsive Design
- Mobile-first approach
- Collapsible navigation for mobile
- Grid layouts that adapt to screen size
- Touch-friendly interface elements

## 🔧 Customization

### Adding New Features
1. **New Pages:** Add to the `app/` directory following Next.js App Router conventions
2. **Components:** Create reusable components in `components/`
3. **State Management:** Extend the HR context in `contexts/hr-context.tsx`
4. **Styling:** Use Tailwind classes and shadcn/ui components

### Environment Variables
No environment variables required for basic functionality. The app uses the public DummyJSON API.

## 📱 Screenshots

### Dashboard Homepage
- Employee cards with ratings and quick actions
- Search and filter functionality
- Responsive grid layout

### Employee Details
- Comprehensive profile information
- Tabbed interface for different data sections
- Performance history visualization

### Analytics Dashboard
- Interactive charts and metrics
- Department performance comparison
- Rating distribution insights

### Bookmarks Management
- Saved employee list
- Bulk action capabilities
- Quick access to favorite employees

## 🚀 Deployment

The application is ready for deployment on Vercel, Netlify, or any platform supporting Next.js.

\`\`\`bash
npm run build
npm start
\`\`\`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is open source and available under the MIT License.
