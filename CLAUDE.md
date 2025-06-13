# B CUBE Consulting Website - Claude Development Guide

## Project Overview
B CUBE Consulting is a Singapore-based consultancy firm specializing in brand strategy, market expansion, and business development. This website showcases their services across global markets with a focus on professional, luxury design.

## Recent Enhancements
This project has been significantly enhanced with modern design and updated content:

### About Page Redesign
- **Our Approach Section**: Completely redesigned with lifecycle stages content
  - Alpha: Concept Re-Fining
  - Catapult - Growth
  - Building Efficiencies
  - Dominate - Legacy
- **Modern CSS**: Enhanced with animations, gradients, and interactive hover effects
- **Responsive Design**: Mobile-first approach with tablet and desktop breakpoints

### Services Page Overhaul
- **New Service Structure**: Updated with comprehensive service offerings
  - Brand Positioning
  - CEO | CMO Support Services
  - Powering Start-ups
  - Enabling Global Emergence
  - India Market Entry & Acceleration
  - NGO | CSR | Social & Impact Sector Services
  - Actionable Insights & Intelligence
- **Enhanced Styling**: Professional card layouts with interactive elements

### Technical Improvements
- **CSS Architecture**: Modern styling with CSS custom properties
- **Animation System**: Smooth transitions and hover effects
- **Grid Layouts**: Responsive grid systems throughout
- **Typography**: Enhanced font hierarchy and readability

## Development Commands

### Git Operations
```bash
# Initialize repository (if needed)
git init

# Add all changes
git add .

# Commit changes
git commit -m "Description of changes"

# Push to GitHub
git push origin main

# Force push (use carefully)
git push --force-with-lease origin main
```

### Testing & Quality Assurance
```bash
# Check for HTML validation (if tools available)
# Note: Install html5validator if needed
html5validator --root . --also-check-css

# Check responsive design
# Test on multiple screen sizes in browser dev tools

# Performance testing
# Use Lighthouse in Chrome DevTools
```

### File Structure
```
B-Cube-main/
├── assets/
│   ├── images/          # All image assets
│   └── videos/          # Video assets
├── css/
│   ├── styles.css       # Main stylesheet (enhanced)
│   ├── animations.css   # Animation definitions
│   ├── placeholders.css # Placeholder styles
│   └── timeline.css     # Timeline components
├── js/
│   ├── main.js         # Main JavaScript
│   ├── dynamic-text.js # Text animations
│   └── timeline.js     # Timeline functionality
├── *.html              # All page templates
└── CLAUDE.md           # This documentation file
```

## CSS Architecture

### Custom Properties (CSS Variables)
```css
:root {
    --primary-color: #000000;
    --secondary-color: #ffffff;
    --accent-color: #d4af37;
    --text-color: #333333;
    --light-gray: #f8f8f8;
    --medium-gray: #e0e0e0;
    --dark-gray: #555555;
    --heading-font: 'Playfair Display', serif;
    --body-font: 'Poppins', sans-serif;
}
```

### Key CSS Classes
- `.lifecycle-stages` - Grid layout for about page approach section
- `.stage-item` - Individual lifecycle stage cards
- `.service-detailed` - Enhanced service cards on services page
- `.startup-services`, `.india-services` - Specialized service content blocks
- `.impact-highlight` - NGO/CSR service highlights

### Responsive Breakpoints
- Mobile: `@media (max-width: 768px)`
- Tablet: `@media (max-width: 992px)`
- Desktop: `@media (max-width: 1200px)`
- Extra Small: `@media (max-width: 480px)`

## Content Guidelines

### About Page - Our Approach Section
The lifecycle stages represent different business maturity phases:
1. **Alpha**: Early-stage concept development and refinement
2. **Catapult**: Growth-focused market entry and expansion
3. **Building**: Process optimization and efficiency improvements
4. **Dominate**: Market leadership and legacy building

### Services Page Structure
Services are organized by business function:
- **Strategic Services**: Brand positioning, power-positioning
- **Executive Support**: CEO/CMO advisory services
- **Growth Services**: Start-up support, global emergence
- **Market Entry**: India-specific and international expansion
- **Impact Services**: NGO, CSR, social sector support
- **Intelligence**: Market insights and competitive analysis

## Design Principles

### Visual Hierarchy
1. **Primary**: Main headings and key messages
2. **Secondary**: Supporting content and descriptions
3. **Accent**: Call-to-action elements and highlights

### Color Usage
- **Black (#000000)**: Primary text and headers
- **White (#ffffff)**: Backgrounds and contrast elements
- **Gold (#d4af37)**: Accent color for CTAs and highlights
- **Grays**: Supporting text and subtle backgrounds

### Typography Scale
- **Headings**: Playfair Display (serif) for elegance
- **Body Text**: Poppins (sans-serif) for readability
- **Size Hierarchy**: 48px, 36px, 24px, 18px, 16px, 14px

## Performance Optimization

### Image Guidelines
- Use WebP format when possible for better compression
- Implement lazy loading for images below the fold
- Optimize images for different screen densities (1x, 2x, 3x)
- Maximum image width: 1920px for hero images

### CSS Optimization
- Use CSS Grid and Flexbox for layouts
- Minimize use of JavaScript for animations (prefer CSS)
- Implement critical CSS for above-the-fold content
- Use CSS custom properties for consistent theming

## Browser Support
- Chrome 70+
- Firefox 65+
- Safari 12+
- Edge 79+
- Mobile Safari 12+
- Chrome Mobile 70+

## Accessibility Compliance
- WCAG 2.1 AA compliance target
- Semantic HTML structure
- Alt text for all images
- Keyboard navigation support
- Color contrast ratios meet standards
- Screen reader compatibility

## Deployment Notes
- Static site suitable for any web server
- No server-side processing required
- CDN recommended for global performance
- SSL certificate required for production
- Gzip compression recommended

## Future Enhancement Ideas
1. **Interactive Elements**: Add more hover animations and micro-interactions
2. **Content Management**: Consider headless CMS integration
3. **Analytics**: Implement Google Analytics or similar tracking
4. **SEO**: Add structured data and meta tag optimization
5. **Performance**: Implement progressive web app features
6. **Internationalization**: Add multi-language support

## Contact & Support
For technical questions about this implementation:
- GitHub Repository: https://github.com/ashwinkorra3186/B-CUBE
- Built with assistance from Claude Code
- Original design and content by B CUBE Consulting team

---

*Last updated: January 2025*
*Enhanced by Claude Code for modern web standards*