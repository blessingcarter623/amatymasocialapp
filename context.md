# Amatyma Social App - Context Documentation

## App Intention
Amatyma is a mobile-first social commerce platform designed specifically for African communities. The app facilitates business networking, merchandise sales, fundraising campaigns, and community communication through a unified mobile experience.

## Core Features
- **Business Directory**: Local business discovery and networking
- **E-commerce**: Merchandise marketplace with shopping cart
- **Fundraising**: "Back A Buddy" community support campaigns  
- **Social Features**: Messages, video calls, notifications
- **User Profiles**: Personal and business profile management

## Architecture Overview

### Mobile-First Design
The app is designed exclusively for mobile devices with a bottom navigation pattern and optimized touch interfaces. No desktop layouts are supported.

### Key Components

#### Layout Components
- **MobileNavbar**: Primary navigation with top header and bottom tab bar
- **MainLayout**: Simple mobile-only wrapper with navbar and content area
- **MobileOnlyLayout**: Alternative layout for specific mobile-only pages

#### Authentication
- **AuthContext**: Manages user authentication state with Supabase
- **ProtectedRoute**: Route protection for authenticated users
- **LoginForm/RegisterForm**: Authentication UI components

#### Business Features
- **BusinessCard/BusinessList**: Business directory components
- **BusinessForm**: Add/edit business listings
- **BusinessDetail**: Full business profile pages

#### E-commerce
- **ProductCard**: Product display in marketplace
- **CartContext**: Shopping cart state management
- **CartItem**: Individual cart item component

#### Communication
- **Messages**: Chat interface with real-time messaging
- **VideoCalls**: Video call functionality
- **Notifications**: Push notification management

### State Management

#### Context Providers
- **AppContext**: Global application state
- **AuthContext**: User authentication and profile data
- **CartContext**: Shopping cart state and operations
- **ThemeContext**: Light/dark theme management

#### Key Hooks
- **useIsMobile**: Responsive mobile detection (always true in mobile-first)
- **use-toast**: Toast notification system

### UI System

#### Design System
- **Theme**: Amatyma red (#E94560) as primary brand color
- **Colors**: HSL-based semantic color tokens in index.css
- **Typography**: System font stack with proper hierarchy
- **Components**: Shadcn/ui component library as foundation

#### Key Design Patterns
- **Bottom Navigation**: Primary app navigation with 5 main tabs
- **Card-based Layout**: Content organized in card components
- **Touch-optimized**: Large tap targets and swipe gestures
- **Neumorphic Elements**: Subtle shadow-based styling

### Navigation Structure

#### Bottom Tabs
1. **Home**: Landing page and featured content
2. **Messages**: Chat and communication hub
3. **Video**: Video calling interface
4. **Notifications**: Alert and notification center
5. **Profile**: User profile and settings

#### Top Navigation
- **Search**: Global search functionality
- **Cart**: Shopping cart access with item count
- **Business Directory**: Quick access to business listings

### Technology Stack
- **React 18**: Core UI framework
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first styling
- **Shadcn/ui**: Component library
- **Supabase**: Backend-as-a-Service (auth, database)
- **React Router**: Client-side routing
- **Lucide React**: Icon system
- **Sonner**: Toast notifications

### Data Flow
1. **Authentication**: Supabase Auth with persistent sessions
2. **Real-time Updates**: Supabase realtime subscriptions for chat/notifications
3. **State Management**: React Context for global state, local state for component-specific data
4. **API Integration**: Supabase client for all backend operations

### Mobile-Specific Considerations
- **Safe Areas**: Bottom navigation respects device safe areas
- **Touch Interactions**: Optimized for thumb navigation
- **Performance**: Lazy loading and code splitting for mobile networks
- **Offline Support**: Service worker for basic offline functionality
- **PWA Ready**: Configured for Progressive Web App installation

### Theme System
- **Dual Theme**: Light and dark mode support
- **Semantic Tokens**: HSL-based color system for consistency
- **Brand Colors**: Amatyma red as primary with complementary palette
- **Responsive**: Adapts to system preferences and user selection

This mobile-first architecture ensures optimal performance and user experience on mobile devices while maintaining scalability for future feature additions.