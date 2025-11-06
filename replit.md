# Bugatti Ultra-Luxury Configurator Website

## Project Overview
A visually stunning, ultra-luxury Bugatti showcase website featuring:
- Cinematic 3D car visualization
- Interactive car configurator with real-time preview
- AR preview capability
- Configuration sharing and comparison tools
- Comprehensive customization options

## Technology Stack

### Frontend
- React 18 + TypeScript
- Wouter for routing
- Three.js (@react-three/fiber v8) for 3D rendering
- GSAP for scroll-based animations
- Framer Motion for page transitions
- Tailwind CSS with custom Bugatti design system
- Shadcn UI components
- React Query for state management

### Backend
- Express.js
- In-memory storage (MemStorage)
- TypeScript

### Key Features
1. **3D Car Visualization**: Interactive 3D Bugatti models with real-time color changes
2. **Configurator**: Comprehensive customization for:
   - Exterior colors (8 options)
   - Brake caliper colors (5 options)
   - Wheel designs (5 options)
   - Carbon fiber packages (4 options)
   - Interior materials (6 options)
   - Stitching colors (6 options)
3. **360° Viewer**: Rotate and view car from all angles
4. **AR Preview**: View configured car in real space (mobile)
5. **Share**: Generate unique URLs and QR codes for configurations
6. **Comparison Tool**: Save and compare multiple configurations
7. **Performance Stats**: Animated statistics with scroll triggers
8. **Heritage Timeline**: Interactive timeline of Bugatti history

## Design System

### Colors
- Background: Deep black (#0a0a0a)
- Primary: Electric Cyan (#0ea5e9)
- Accent: Metallic Blue (#06b6d4)
- Text: Light gray with varying opacity

### Typography
- Display: Orbitron (headings, prices)
- Body: Rajdhani (content)
- Sans: Exo 2 (UI elements)

### Effects
- Glassmorphism cards with backdrop blur
- Neon glow borders on interactive elements
- Smooth scroll animations with GSAP
- Pulse glow animations on primary elements
- Shimmer effects on gradients

## Project Structure

```
client/
├── src/
│   ├── components/
│   │   ├── 3d/
│   │   │   ├── BugattiCar3D.tsx
│   │   │   └── Scene3D.tsx
│   │   ├── configurator/
│   │   │   ├── ConfigPanel.tsx
│   │   │   ├── ShareModal.tsx
│   │   │   ├── ARPreviewModal.tsx
│   │   │   └── ComparisonPanel.tsx
│   │   ├── Navigation.tsx
│   │   ├── GlassCard.tsx
│   │   └── Footer.tsx
│   ├── pages/
│   │   ├── Home.tsx
│   │   ├── Configurator.tsx
│   │   ├── Models.tsx
│   │   ├── Heritage.tsx
│   │   └── Contact.tsx
│   └── App.tsx
shared/
└── schema.ts
server/
├── routes.ts
└── storage.ts
```

## Configuration Options

### Exterior Colors
- Atlantic Blue, French Racing Blue, Black Carbon, Glacier White, Rouge Pur Sang, Yellow Molsheim, Silver Argent, Dutch Orange

### Brake Colors
- Red, Yellow, Blue, Black, Orange (all ceramic)

### Wheel Designs
- Standard Alloy, Diamond Cut, Carbon Fiber, Forged Titanium, Split Spoke

### Carbon Fiber Packages
- None, Exterior Package, Interior Package, Full Package

### Interior Materials
- Black/Beige/Brown Leather, Black/Blue Alcantara, Carbon + Leather

### Stitching Colors
- White, Red, Blue, Yellow, Orange, Black

## Pages

1. **Home** (`/`): Hero with 3D car, performance stats, design showcase
2. **Configurator** (`/configurator`): Full 3D configurator with all customization options
3. **Models** (`/models`): Browse all Bugatti models with specs
4. **Heritage** (`/heritage`): Timeline of Bugatti history from 1909-2024
5. **Contact** (`/contact`): Test drive request form

## API Endpoints (Backend - To be implemented)

- `POST /api/configurations` - Save configuration
- `GET /api/configurations/:id` - Get configuration by ID
- `POST /api/test-drive-requests` - Submit test drive request
- `GET /api/share/:id` - Get shared configuration

## Development Notes

### Three.js Integration
- Using @react-three/fiber v8 for React 18 compatibility
- **KNOWN ISSUE**: The 3D scene experiences WebGL context errors in the Replit environment due to Three.js/React Fiber compatibility issues. This manifests as "Cannot read properties of undefined (reading 'replit')" errors in the browser console.
- **PRODUCTION SOLUTION**: Replace primitive geometry with actual Bugatti GLTF models from professional 3D artists. Proper GLTF models with embedded materials and optimized geometry will resolve the current rendering issues.
- Custom simplified car geometry (placeholder for actual GLTF models)
- Real-time material updates based on configuration
- Responsive camera positioning

### Animation System
- GSAP for scroll-triggered animations
- Framer Motion for page transitions
- Custom Tailwind animations (pulse-glow, shimmer, float)

### Responsive Design
- Mobile-first approach
- Desktop: Full 3D experience
- Tablet: Simplified controls
- Mobile: Touch-optimized, AR preview

## Environment Variables
- `SESSION_SECRET`: Session secret for backend

## Running the Project
```bash
npm run dev
```

Starts both frontend (Vite) and backend (Express) on port 5000.

## Known Limitations & Future Enhancements

### 3D Visualization
- **Current**: Simplified primitive geometry with environment-specific rendering issues
- **Production**: Requires professional Bugatti GLTF 3D models with proper materials, lighting, and LOD (Level of Detail) optimization
- **Enhancement**: Add real-time ray-traced reflections, PBR (Physically Based Rendering) materials

### AR Preview
- **Current**: Placeholder UI showing QR codes and mobile detection
- **Production**: Implement WebXR API for Android, ARKit QuickLook for iOS with USDZ models
- **Enhancement**: Add AR placement controls, lighting estimation, surface detection

### Backend
- **Current**: In-memory storage (data lost on restart)
- **Production**: PostgreSQL database with Drizzle ORM
- **Enhancement**: User accounts, saved configurations library, configuration voting/sharing social features

### Performance
- **Current**: Client-side rendering only
- **Production**: Server-side rendering (SSR) for SEO, image optimization with CDN
- **Enhancement**: Progressive Web App (PWA) for offline access
