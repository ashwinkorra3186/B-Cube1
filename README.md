# B CUBE Consulting Website

A premium, visually stunning website for B CUBE Consulting, a Singapore-based branding consultancy aimed at attracting high-end, affluent clients.

## Project Overview

This website is designed to effectively communicate B CUBE's brand expertise, global presence, and credibility. The design follows a luxury aesthetic with a sophisticated color palette, elegant typography, and premium interactive elements.

## Features

- **Responsive Design**: Fully responsive layout that works on all devices (desktop, tablet, mobile)
- **Premium Aesthetics**: Elegant black, white, and gold color scheme with luxury styling
- **Interactive Elements**: Smooth animations, hover effects, and transitions
- **Testimonial Slider**: Showcase client testimonials with an interactive slider
- **Case Studies Showcase**: Highlight successful projects with engaging visuals
- **Team Member Profiles**: Feature key team members with their expertise and backgrounds
- **Contact Form**: Interactive contact form with validation
- **Multilingual Support**: Language selector for international clientele
- **Optimized Performance**: Fast loading and smooth scrolling

## File Structure

```
├── index.html              # Main HTML file
├── css/
│   ├── styles.css          # Main stylesheet
│   ├── animations.css      # Animation styles
│   └── placeholders.css    # Image placeholder styles
├── js/
│   └── main.js             # JavaScript functionality
└── assets/
    ├── images/             # Image files
    └── videos/             # Video files
```

## Setup Instructions

1. Clone or download this repository
2. Replace placeholder images and videos with actual content:
   - Hero background video/image
   - Team member photos
   - Case study images
   - Client logos
3. Update content in the HTML file to match your specific requirements
4. Test the website on various devices and browsers

## Customization Guidelines

### Colors

The website uses a premium color palette defined in CSS variables:

```css
:root {
    --primary-color: #000000;    /* Black */
    --secondary-color: #ffffff;  /* White */
    --accent-color: #d4af37;     /* Gold */
    --text-color: #333333;
    --light-gray: #f8f8f8;
    --medium-gray: #e0e0e0;
    --dark-gray: #555555;
}
```

To change the color scheme, modify these variables in the `styles.css` file.

### Typography

The website uses two main fonts:

- **Playfair Display**: For headings and display text
- **Poppins**: For body text and UI elements

These fonts are loaded from Google Fonts. To change the typography, update the font imports in the `<head>` section of the HTML and modify the font variables in the CSS:

```css
:root {
    --heading-font: 'Playfair Display', serif;
    --body-font: 'Poppins', sans-serif;
}
```

### Content

To update the website content:

1. Modify the text in the HTML file
2. Replace placeholder images with actual images
3. Update team member information, case studies, and testimonials
4. Adjust contact information and social media links

### Adding New Sections

To add new sections to the website:

1. Follow the existing HTML structure pattern
2. Use the same class naming conventions
3. Add corresponding styles in the CSS files
4. Update the navigation menu if necessary

## Browser Compatibility

The website is compatible with:

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Opera (latest)
- Mobile browsers (iOS Safari, Android Chrome)

## Performance Optimization

The website is optimized for performance:

- Minified CSS and JavaScript (in production)
- Optimized images
- Lazy loading for images
- Efficient animations using CSS transitions and transforms

## Credits

- **Fonts**: Google Fonts (Playfair Display, Poppins)
- **Icons**: Font Awesome
- **Development**: HTML5, CSS3, JavaScript
