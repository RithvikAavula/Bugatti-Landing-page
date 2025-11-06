# Bugatti Ultra-Luxury Website Design Guidelines

## Design Philosophy
Create a visually stunning, ultra-luxury showcase website reflecting Bugatti's identity: power, elegance, speed, sleek curves, precision, and luxury craftsmanship.

## Visual Style

**Color Palette**
- Primary: Deep black background (#000000 to #0a0a0a)
- Accent 1: Metallic blue (#1e3a8a to #3b82f6)
- Accent 2: Electric cyan (#06b6d4 to #22d3ee)
- Highlights: Neon glow effects in cyan/blue
- Text: White with varying opacity (100% headers, 70% body)

**Design Treatment**
- Futuristic dark mode aesthetic throughout
- Glassmorphism effects (frosted glass blur, 20% opacity backgrounds)
- Neon glow highlights on interactive elements
- Motion parallax depth effects
- 3D transitions and transformations
- Subtle light-trail animations

## Typography
- Headlines: Bold, geometric sans-serif (700-900 weight)
- Subheadings: Medium weight (500-600)
- Body: Light to regular weight (300-400)
- Use large, impactful sizes for hero (4xl to 8xl)
- Performance stats: Monospaced, technical feel

## Layout & Spacing
- Use Tailwind spacing: 4, 8, 12, 16, 24, 32 for consistency
- Full viewport hero section (100vh)
- Generous whitespace between sections (py-24 to py-32)
- Max content width: max-w-7xl for most sections
- Sections flow with smooth scroll animations

## Page Sections

**Hero Section**
- Full viewport with 3D Bugatti car model (Chiron/Bolide) in slow rotation
- Bold title: "Unleash the Power of Perfection" with animated light-trail glow
- Smooth scroll indicator with animated arrow
- Performance stats reveal on scroll (HP, top speed, 0-100 acceleration)
- Cinematic depth with parallax layers

**Interactive 3D Configurator**
- Center stage: 360-degree rotatable car model
- Side panel: Customization controls with glassmorphic background
- Real-time preview updates with smooth transitions
- Customization categories:
  - Exterior colors (10+ options with metallic/matte finishes)
  - Brake caliper colors (Red, Yellow, Black, Blue carbon ceramic)
  - Wheel designs (5+ styles)
  - Carbon fiber packages (hood, mirrors, diffuser, interior trim)
  - Interior materials (leather types, Alcantara, carbon)
  - Stitching colors and personalized embroidery
  - Engine tuning options
- 360-degree carousel controls: drag to rotate, clickable angle presets
- Price calculator updating in real-time with neon-highlighted total

**AR Preview Feature**
- "View in Your Space" button with glowing neon border
- WebXR integration for mobile camera access
- Overlay UI with placement controls and capture button
- Instructional animations for first-time users

**Models Showcase Gallery**
- Interactive 3D card grid (3 columns desktop, 1 mobile)
- Each card: car image, model name, key specs
- Hover effect: card expands, background morphs with glow
- Click to view full model details with slide-in panel

**Performance Section**
- Animated speedometer with needle sweep
- Stat counters with count-up animation on scroll
- Split layout: left stats, right dynamic car visual
- Neon accent lines connecting stat elements

**About Bugatti**
- Horizontal scrolling narrative with text reveals
- Heritage imagery fading in/out as user scrolls
- Timeline elements with milestone markers
- Elegant typography hierarchy

**Design & Innovation**
- Split-screen layout with synchronized scrolling
- Left: Interior detail close-ups with fade transitions
- Right: Concept visuals and engineering diagrams
- Crossfade animations between images

**Comparison Tool**
- Side-by-side configurator layouts (2-4 columns)
- Save configuration button (stores to local storage)
- Spec comparison table with highlighted differences
- Price differential display

**Share Feature**
- Generate shareable image of configuration
- Unique URL creation for each build
- Social media quick-share buttons (copy link, Twitter, Facebook, Email)
- QR code generation for mobile sharing

**Night Mode Garage**
- Dark ambient scene with car center stage
- Hover/drag interactions trigger lighting changes
- Soft reflections on floor surface
- Spotlight following cursor movement

**Test Drive Contact Form**
- Glassmorphic form container with neon borders
- Input fields: Name, Email, Phone, Preferred Model, Message
- Glowing focus states on inputs
- Smooth submission animation

## Animations & Interactions

**Scroll Animations (GSAP)**
- Parallax effects on hero background
- Staggered element reveals (fade + slide)
- Scroll-triggered stat counters
- Horizontal scrolling sections

**Hover Effects**
- Glow intensity increase on interactive elements
- Scale transforms (1.05x) on cards
- Smooth color transitions on buttons
- Cursor-following spotlight effects

**Page Transitions (Framer Motion)**
- Fade and slide motion between routes
- Loading animations with Bugatti logo
- Smooth navigation with no jarring cuts

**3D Model Interactions**
- Drag to rotate on desktop
- Swipe to rotate on mobile
- Auto-rotation when idle (slow spin)
- Click hotspots to focus on specific features

## Component Specifications

**Buttons**
- Primary: Glassmorphic with neon cyan border, blurred background
- Hover: Increased glow, slight scale
- Text: Uppercase, medium weight, letter-spacing

**Cards**
- Dark background with subtle gradient
- Thin neon border (1px)
- Glass blur overlay
- Drop shadow with glow effect

**Navigation**
- Fixed header with glass blur background
- Logo left, menu items right
- Underline animation on hover
- Mobile: slide-in menu with backdrop blur

## Images Required

1. **Hero**: High-resolution Bugatti Chiron/Bolide (provided: bugattichironsingleimagebrmarch2016.jpg)
2. **Interior shots**: Dashboard and cabin details (provided: Bugatti-Chiron-Interior-02.jpg)
3. **Exterior angles**: Multiple views for 360 carousel (provided: multiple exterior images)
4. **Detail shots**: Wheels, brakes, engine, materials
5. **Lifestyle**: Garage/driveway scenes for AR context
6. **Heritage**: Historical Bugatti models for About section

All images should be optimized, use modern formats (WebP), and load progressively.

## Responsive Behavior
- Desktop: Full immersive 3D experience
- Tablet: Simplified 3D with touch controls
- Mobile: Touch-optimized with gesture support, stacked layouts
- AR preview: Mobile-first feature with camera access