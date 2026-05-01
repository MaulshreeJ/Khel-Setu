# KhelSetu - AI-Powered Sports Assessment Platform

A React Native mobile application for comprehensive fitness testing and assessment designed specifically for Indian athletes.

## Features

- **Comprehensive Fitness Tests**: Endurance, Strength, Agility, and Flexibility assessments
- **AI-Powered Analytics**: Detailed performance insights and recommendations
- **Dashboard**: Track progress, view statistics, and monitor improvements
- **Resources**: Educational content, guides, and tools for athletes
- **Authentication**: Secure login and registration system
- **Modern UI**: Beautiful, responsive design with Indian flag color scheme

## Screens

- **Home**: Landing page with hero section, statistics, and test categories
- **Tests**: Browse and start fitness assessments
- **Dashboard**: Personal performance tracking and analytics
- **About**: Company information, team, and mission
- **Resources**: Educational content and tools
- **Auth**: Login and registration screens

## Tech Stack

- **React Native**: Cross-platform mobile development
- **Expo**: Development platform and tools
- **TypeScript**: Type-safe JavaScript
- **React Navigation**: Navigation library
- **Expo Linear Gradient**: Gradient backgrounds
- **Expo Vector Icons**: Icon library
- **React Native Safe Area Context**: Safe area handling

## Setup Instructions

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Install Expo CLI** (if not already installed)
   ```bash
   npm install -g @expo/cli
   ```

3. **Start the Development Server**
   ```bash
   npm start
   ```

4. **Run on Device/Simulator**
   - For iOS: `npm run ios`
   - For Android: `npm run android`
   - For Web: `npm run web`

## Project Structure

```
src/
├── components/
│   └── ui/
│       ├── Button.tsx
│       ├── Card.tsx
│       └── Badge.tsx
├── screens/
│   ├── HomeScreen.tsx
│   ├── AboutScreen.tsx
│   ├── DashboardScreen.tsx
│   ├── TestsScreen.tsx
│   ├── ResourcesScreen.tsx
│   └── AuthScreen.tsx
└── types/
    └── navigation.ts
```

## Design System

The app uses a consistent design system with:

- **Primary Color**: Saffron (#FF6B35) - representing the Indian flag
- **Secondary Color**: Green (#059669) - representing the Indian flag
- **Accent Color**: Purple (#7C3AED) - for variety
- **Typography**: Clear, readable fonts with proper hierarchy
- **Spacing**: Consistent 8px grid system
- **Components**: Reusable UI components with consistent styling

## Key Features Implemented

1. **Navigation**: Tab-based navigation with stack navigation for modals
2. **UI Components**: Custom Button, Card, and Badge components
3. **Responsive Design**: Adapts to different screen sizes
4. **Animations**: Smooth transitions and loading animations
5. **TypeScript**: Full type safety throughout the application
6. **Modern React**: Hooks, functional components, and best practices

## Getting Started

1. Clone the repository
2. Install dependencies with `npm install`
3. Start the development server with `npm start`
4. Use the Expo Go app on your device or run on simulator

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.
