# DriveHive

🚗 **Cruise through listings, compare prices, and lock in your next ride—all in one sleek site.**

DriveHive is a modern, responsive car shopping website that simplifies the vehicle purchasing process by combining powerful search functionality, real-time deals, and side-by-side comparisons.

## Features

### 🔍 **Smart Search & Filtering**
- Advanced search by make, model, year, price range, and location
- Real-time filtering with instant results
- Intelligent model suggestions based on selected make

### 📊 **Vehicle Comparison**
- Side-by-side comparison of up to 3 vehicles
- Detailed specifications and pricing analysis
- Easy add/remove functionality

### 💰 **Price Transparency**
- Clear current pricing with original MSRP when available
- Deal highlighting and savings calculations
- Multiple dealer locations and contact options

### 🎨 **Modern Design**
- Clean, automotive-inspired interface
- Mobile-first responsive design
- Accessibility-focused development (WCAG 2.1 AA compliant)

### ⚡ **Performance Optimized**
- Fast loading with optimized assets
- Smooth animations and transitions
- Progressive enhancement approach

## Design System

### Color Palette
- **Primary Blue**: `#1e40af` - Trust, reliability, premium automotive feel
- **Secondary Blue**: `#3b82f6` - Modern, tech-forward
- **Accent Orange**: `#f97316` - Energy, deals, call-to-action
- **Success Green**: `#10b981` - Savings and positive actions
- **Neutral Charcoal**: `#374151` - Primary text and professional tone

### Typography
- **Font Family**: Segoe UI system font stack for optimal readability
- **Weights**: Light (300) to Bold (700) for clear hierarchy
- **Responsive sizing**: Fluid typography that scales with screen size

## Technology Stack

- **HTML5**: Semantic markup with proper accessibility attributes
- **CSS3**: Modern CSS with custom properties, Grid, and Flexbox
- **Vanilla JavaScript**: ES6+ features with class-based architecture
- **Progressive Enhancement**: Works with JavaScript disabled

## Getting Started

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Live Server extension for VS Code (recommended for development)

### Installation

1. **Clone or download the project**
   ```bash
   git clone https://github.com/yourusername/drivehive.git
   cd drivehive
   ```

2. **Open in VS Code**
   ```bash
   code .
   ```

3. **Start Live Server**
   - Right-click on `index.html`
   - Select "Open with Live Server"
   - Or use Command Palette: `Live Server: Open with Live Server`

4. **View in browser**
   - Navigate to `http://localhost:3000` (or the port shown in VS Code)

### File Structure
```
DriveHive/
├── index.html              # Main HTML file
├── css/
│   └── styles.css          # All styles and responsive design
├── js/
│   └── app.js              # JavaScript functionality
├── .vscode/
│   └── settings.json       # Live Server configuration
├── .gitignore              # Git ignore rules
└── README.md               # This file
```

## Features Overview

### Search Functionality
- **Make Selection**: Dropdown with popular automotive brands
- **Model Filtering**: Dynamic model list based on selected make
- **Year Range**: Recent model years (2020-2024)
- **Price Range**: Flexible minimum and maximum price inputs
- **Location Search**: Find vehicles near you

### Car Listings
- **Featured Vehicles**: Curated selection of popular models
- **Detailed Information**: Year, make, model, mileage, transmission, drivetrain
- **Pricing**: Current price with original MSRP when discounted
- **Dealer Information**: Contact details and location

### Comparison Tool
- **Multi-select**: Compare up to 3 vehicles simultaneously
- **Spec Comparison**: Side-by-side feature and pricing analysis
- **Easy Management**: Add/remove vehicles with single click

### User Experience
- **Responsive Design**: Optimized for mobile, tablet, and desktop
- **Keyboard Navigation**: Full keyboard accessibility support
- **Screen Reader Support**: ARIA labels and announcements
- **Loading States**: Visual feedback during search operations
- **Error Handling**: Graceful fallbacks and user notifications

## Browser Support

- **Chrome**: 90+
- **Firefox**: 88+
- **Safari**: 14+
- **Edge**: 90+

## Accessibility Features

- **WCAG 2.1 AA Compliance**: Meets accessibility standards
- **Keyboard Navigation**: Full site navigation without mouse
- **Screen Reader Support**: Proper ARIA labels and live regions
- **Color Contrast**: All text meets minimum contrast ratios
- **Focus Management**: Clear focus indicators and logical tab order
- **Alternative Text**: Descriptive alt text for all images

## Performance Features

- **Optimized Assets**: Compressed and minified resources
- **Lazy Loading**: Images load as needed
- **Efficient DOM Updates**: Minimal reflows and repaints
- **Debounced Search**: Prevents excessive API calls
- **CSS Animations**: Hardware-accelerated transitions

## Development Guidelines

### Code Style
- **HTML**: Semantic markup with proper nesting
- **CSS**: BEM methodology for class naming
- **JavaScript**: ES6+ features with consistent formatting
- **Comments**: Clear documentation for complex logic

### Responsive Breakpoints
- **Mobile**: 320px - 768px
- **Tablet**: 768px - 1024px
- **Desktop**: 1024px+

### CSS Custom Properties
All colors, spacing, and common values use CSS custom properties for easy theming and maintenance.

## Future Enhancements

### Planned Features
- [ ] Advanced filtering (fuel type, body style, features)
- [ ] User accounts and saved searches
- [ ] Finance calculator integration
- [ ] Vehicle history reports
- [ ] 360° vehicle photos
- [ ] Virtual test drive scheduling
- [ ] Chat integration with dealers
- [ ] Mobile app development

### Technical Improvements
- [ ] Service Worker for offline functionality
- [ ] Image optimization and WebP support
- [ ] Advanced search with Elasticsearch
- [ ] Real-time inventory updates
- [ ] A/B testing framework
- [ ] Analytics integration
- [ ] SEO optimization

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contact

**DriveHive Team**
- Website: [drivehive.com](https://drivehive.com)
- Email: contact@drivehive.com
- Support: support@drivehive.com

---

*Built with ❤️ for car enthusiasts who deserve a better shopping experience*
