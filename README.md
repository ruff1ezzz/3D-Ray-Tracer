# RayTracer Showcase Website

A modern, interactive website built with React and TypeScript to showcase the RayTracer project. This website demonstrates the capabilities of a complete ray tracing renderer built in C++.

## 🚀 Features

- **Interactive Gallery**: Browse rendered scenes with filtering and modal view
- **Code Showcase**: Explore key algorithms and implementation details
- **Technical Features**: Comprehensive overview of ray tracing capabilities
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **Smooth Animations**: Beautiful transitions powered by Framer Motion
- **Modern UI**: Clean, professional design with Tailwind CSS

## 🛠️ Technologies Used

- **React 18**: Modern React with hooks and functional components
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first CSS framework
- **Framer Motion**: Smooth animations and transitions
- **Lucide React**: Beautiful, customizable icons

## 🎨 Components

### Header
- Fixed navigation with smooth scrolling
- Mobile-responsive menu
- Clean, modern design

### Hero
- Animated introduction section
- Feature highlights with icons
- Call-to-action buttons

### Features
- Technical capabilities overview
- Interactive feature cards
- Educational value section

### Gallery
- Interactive image gallery
- Category filtering
- Modal view with navigation
- Responsive grid layout

### Code Showcase
- Tabbed code display
- Syntax highlighting
- Technical details sidebar
- Architecture overview

### Footer
- Project information
- Feature list
- Technical specifications
- Contact links

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd raytracer-showcase
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Available Scripts

- `npm start` - Runs the app in development mode
- `npm run build` - Builds the app for production
- `npm test` - Launches the test runner
- `npm run eject` - Ejects from Create React App

## 📸 Gallery Images

The website includes 17 rendered scenes from the RayTracer project:

- **Scene 1**: Multiple camera angles of a simple quad
- **Scene 2**: Complex geometry with different viewpoints
- **Scene 3**: Table with legs demonstrating transforms
- **Scene 4**: Lighting tests (ambient, diffuse, emission, specular)
- **Scene 5-7**: Advanced rendering scenarios
- **Custom Tests**: Additional test scenes

## 🎯 Key Features Highlighted

### Ray Tracing Engine
- Ray-object intersection algorithms
- Sphere and triangle primitives
- Transform system with 4x4 matrices

### Lighting System
- Phong lighting model
- Ambient, diffuse, and specular components
- Point and directional lights
- Shadow casting

### Advanced Features
- Recursive ray tracing (up to 5 levels)
- Multiple camera support
- Material properties
- Performance optimizations

## 🎨 Design System

### Colors
- Primary: Blue (#3B82F6)
- Secondary: Gray scale
- Accent: Various semantic colors

### Typography
- Clean, readable fonts
- Proper hierarchy
- Responsive sizing

### Animations
- Smooth page transitions
- Hover effects
- Scroll-triggered animations

## 🔧 Customization

### Adding New Images
1. Place new PNG files in `public/images/`
2. Update the `images` array in `Gallery.tsx`
3. Add appropriate metadata (title, description, category)

### Modifying Content
- Update component content in respective `.tsx` files
- Modify styling using Tailwind classes
- Add new sections by creating new components

### Styling
- Uses Tailwind CSS for styling
- Custom CSS in `index.css` and `App.css`
- Component-specific styles inline

## 👥 Authors

- **Aung Myat** - apmyat02@gmail.com

## 🙏 Acknowledgments

- CSE167 Computer Graphics Course
- GLM Mathematics Library
- FreeImage Library
- React and TypeScript communities
