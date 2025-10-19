# Instagram Unfollowers Tracker

A privacy-focused, offline-first Progressive Web App (PWA) for tracking Instagram followers and unfollowers. All data processing happens locally in your browser - no servers, no data collection, complete privacy.

[![React](https://img.shields.io/badge/React-18.3-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue.svg)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-5.0-646CFF.svg)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC.svg)](https://tailwindcss.com/)
[![PWA](https://img.shields.io/badge/PWA-Enabled-5A0FC8.svg)](https://web.dev/progressive-web-apps/)

## 📱 Features

- **100% Offline**: All data processing happens locally in your browser
- **Privacy First**: No server uploads, no data collection, no tracking
- **PWA Support**: Install on any device, works offline
- **Dark/Light Mode**: Beautiful themes for any preference
- **Mobile-First**: Optimized for mobile devices with responsive design
- **Data Management**: Export, import, and manage your ignored users list
- **Real-time Analysis**: Instantly see who's not following you back
- **Five Categories**:
  - 👥 Followers
  - ✅ Following
  - ❌ Not Following Back
  - 🔕 Ignored Users
  - ⏳ Pending Follow Requests

## 🚀 Quick Start

### Prerequisites

- Node.js 22+ or Bun
- npm, yarn, pnpm, or bun

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/gadgetvala/InstagramTracker.git
   cd InstagramTracker
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   bun install
   ```

3. **Start development server**

   ```bash
   npm run dev
   # or
   bun dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:8080`

### Building for Production

```bash
npm run build
# or
bun run build
```

The built files will be in the `dist/` directory, ready to deploy to any static hosting service.

## 📂 Project Structure

```
InstagramTracker/
├── public/                     # Static assets
│   ├── favicon.ico             # Webapp Favicon
│   ├── placeholder.svg         # Placeholder Image
│   ├── pwa-192x192.png         # PWA icon (192x192)
│   ├── pwa-512x512.png         # PWA icon (512x512)
│   └── robots.txt              # SEO robots configuration
│
├── src/
│   ├── components/             # Reusable UI components
│   │   ├── ui/                 # shadcn/ui components
│   │   │   ├── accordion.tsx
│   │   │   ├── alert.tsx
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── dialog.tsx
│   │   │   ├── input.tsx
│   │   │   ├── tabs.tsx
│   │   │   └── ...            # Other UI primitives
│   │   │
│   │   ├── BottomNav.tsx      # Mobile bottom navigation
│   │   └── UserCard.tsx       # User profile card component
│   │
│   ├── contexts/              # React Context providers
│   │   ├── DataContext.tsx    # Instagram data state management
│   │   └── ThemeContext.tsx   # Dark/light theme management
│   │
│   ├── hooks/                 # Custom React hooks
│   │   ├── use-toast.ts       # Toast notification hook
│   │   └── use-mobile.tsx     # Mobile detection hook
│   │
│   ├── lib/                   # Utility libraries
│   │   └── utils.ts           # Helper functions (cn, etc.)
│   │
│   ├── pages/                 # Page components (routes)
│   │   ├── Index.tsx          # Landing/upload page
│   │   ├── Home.tsx           # Main dashboard with tabs
│   │   ├── Settings.tsx       # Settings page
│   │   └── NotFound.tsx       # 404 page
│   │
│   ├── utils/                 # Utility functions
│   │   └── zipParser.ts       # ZIP file parsing logic
│   │
│   ├── App.tsx                # Root app component with routing
│   ├── App.css                # Global app styles
│   ├── index.css              # Tailwind base + design system
│   ├── main.tsx               # Application entry point
│   └── vite-env.d.ts          # Vite type definitions
│
├── index.html                 # HTML entry point
├── package.json               # Dependencies and scripts
├── tailwind.config.ts         # Tailwind CSS configuration
├── tsconfig.json              # TypeScript configuration
├── vite.config.ts             # Vite build configuration
├── vite-pwa-config.ts         # PWA manifest and service worker
└── README.md                  # You are here!
```

## 🏗️ Architecture

### Design System (`src/index.css`)

The app uses a semantic design system based on HSL color tokens:

- **CSS Variables**: All colors defined as HSL variables for easy theming
- **Light/Dark Modes**: Complete theme support with `.dark` class
- **Instagram Gradient**: Custom gradient using brand colors
- **Semantic Tokens**: `--primary`, `--secondary`, `--accent`, etc.

### State Management

#### DataContext (`src/contexts/DataContext.tsx`)

Manages Instagram data state:

- Parses uploaded ZIP files
- Calculates "not following back" users
- Manages ignored users list
- Persists data to localStorage
- Provides export/import functionality

#### ThemeContext (`src/contexts/ThemeContext.tsx`)

Manages theme state:

- Toggles between light/dark mode
- Persists preference to localStorage
- Applies theme class to document

### Component Architecture

- **UI Components** (`src/components/ui/`): Reusable primitives from shadcn/ui
- **Feature Components** (`src/components/`): App-specific components
- **Pages** (`src/pages/`): Route-level components
- **Hooks** (`src/hooks/`): Reusable React hooks

### Data Flow

1. User uploads Instagram data ZIP file
2. `zipParser.ts` extracts and validates JSON files
3. `DataContext` processes and stores data
4. Components consume data via `useData()` hook
5. User interactions update state
6. localStorage persists data between sessions

## 🎨 Design System

### Colors

All colors are defined using HSL format in `src/index.css`:

```css
:root {
  --primary: 291 64% 42%; /* Instagram purple */
  --secondary: 240 5% 96%; /* Light gray */
  --accent: 291 64% 42%; /* Accent purple */
  --destructive: 0 84% 60%; /* Error red */
  /* ... more tokens */
}
```

### Animations

Custom animations defined in `tailwind.config.ts`:

- `fade-in`: Smooth fade with slide up
- `slide-up`: Slide up animation
- `accordion-down/up`: Accordion transitions

### Responsive Design

- **Mobile-first**: Designed for mobile, enhanced for desktop
- **Breakpoints**: Standard Tailwind breakpoints (sm, md, lg, xl)
- **Touch-friendly**: Large tap targets, swipeable tabs

## 📱 PWA Configuration

### Manifest (`vite-pwa-config.ts`)

- **App Name**: Instagram Tracker
- **Theme Color**: Instagram purple
- **Icons**: 192x192 and 512x512
- **Display**: Standalone
- **Orientation**: Portrait

### Service Worker

- **Caching Strategy**: Workbox with network-first approach
- **Offline Support**: Full offline functionality
- **Auto-update**: Prompts user when new version available

## 🔒 Privacy & Security

- **No Backend**: 100% client-side processing
- **No Analytics**: No tracking or data collection
- **No External Requests**: All data stays on device
- **localStorage**: Data persisted locally, never uploaded
- **Open Source**: Transparent, auditable code

## 🛠️ Technology Stack

| Technology          | Purpose                   |
| ------------------- | ------------------------- |
| **React 18**        | UI framework              |
| **TypeScript**      | Type safety               |
| **Vite**            | Build tool and dev server |
| **Tailwind CSS**    | Styling framework         |
| **shadcn/ui**       | Component library         |
| **Radix UI**        | Accessible primitives     |
| **React Router**    | Client-side routing       |
| **JSZip**           | ZIP file parsing          |
| **Lucide React**    | Icon library              |
| **Vite PWA Plugin** | PWA functionality         |

## 📖 How to Use

### Getting Your Instagram Data

Follow these steps to export your Instagram data:

1. **Open Instagram Settings**
   - Go to your Instagram profile
   - Tap the menu (☰) in the top right
   - Navigate to **Settings**

2. **Access Accounts Center**
   - Select **Accounts Center**
   - Choose **Your information and permissions**

3. **Request Data Export**
   - Tap **Download your information**
   - Click **Request a download** or **Create export**

4. **Configure Export Settings**
   - **Select Account**: Choose Instagram
   - **Export Destination**: Select **Download to Device**
   - **Format**: Select **JSON** (required)
   - **Date Range**: Select **All Time**
   - **Media Quality**: Not needed for follower data

5. **Select Custom Information**
   - Tap **Select information**
   - Check **only** these two options:
     - ✅ **Followers**
     - ✅ **Following**
   - Uncheck all other options to keep the file size small

6. **Submit Request**
   - Click **Create export**
   - Instagram will process your request

7. **Download Your Data**
   - Wait 20-30 minutes (can take up to 48 hours for large accounts)
   - You'll receive a notification when ready
   - Return to the same page and download the ZIP file

8. **Upload to Tracker**
   - Open this app
   - Upload the downloaded ZIP file
   - View your insights instantly!

### Using the App

1. **Upload Data**: Select the ZIP file from Instagram
2. **View Insights**: Browse through the 5 tabs
3. **Ignore Users**: Mark users you don't want to see in "Not Following Back"
4. **Export/Import**: Manage your ignored list
5. **Theme Toggle**: Switch between light/dark mode in Settings

## 🤝 Contributing

We welcome contributions! Here's how you can help:

### Development Workflow

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Make your changes**
4. **Commit with conventional commits**
   ```bash
   git commit -m "feat: add amazing feature"
   ```
5. **Push to your fork**
   ```bash
   git push origin feature/amazing-feature
   ```
6. **Open a Pull Request**

### Commit Convention

We follow [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation changes
- `style:` Code style changes (formatting)
- `refactor:` Code refactoring
- `test:` Adding tests
- `chore:` Maintenance tasks

### Code Style

- **TypeScript**: Strict mode enabled
- **ESLint**: Follow the existing configuration
- **Prettier**: Use the project's formatting
- **Components**: Functional components with hooks
- **Naming**: PascalCase for components, camelCase for functions

## 🐛 Bug Reports

Found a bug? Please open an issue with:

- Clear description of the bug
- Steps to reproduce
- Expected vs actual behavior
- Screenshots if applicable
- Browser and device information

## 💡 Feature Requests

Have an idea? Open an issue with:

- Clear description of the feature
- Use case and benefits
- Possible implementation approach
- Mockups or examples (if applicable)

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 📮 Support

- **Issues**: [GitHub Issues](https://github.com/gadgetvala/InstagramTracker/issues)
- **Discussions**: [GitHub Discussions](https://github.com/gadgetvala/InstagramTracker/discussions)

Made with ❤️ by Gadgetvala

**Note**: This app is not affiliated with, endorsed by, or connected to Instagram or Meta Platforms, Inc.
