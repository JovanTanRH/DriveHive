// DriveHive JavaScript Application
// Modern, accessible, and performant web application

class DriveHive {
    constructor() {
        this.init();
        this.carData = [];
        this.compareList = [];
        this.currentFilters = {};
        this.isLoading = false;
    }

    init() {
        this.setupEventListeners();
        this.setupIntersectionObserver();
        this.loadSampleData();
        this.initializeSearch();
    }

    // Event Listeners Setup
    setupEventListeners() {
        // Mobile navigation toggle
        const navToggle = document.querySelector('.nav-toggle');
        const navMenu = document.querySelector('.nav-menu');
        
        if (navToggle && navMenu) {
            navToggle.addEventListener('click', () => this.toggleMobileNav());
        }

        // Search form handling
        const searchForm = document.querySelector('.search-form');
        if (searchForm) {
            searchForm.addEventListener('submit', (e) => this.handleSearch(e));
            
            // Real-time filtering
            const makeSelect = document.getElementById('make-select');
            const modelSelect = document.getElementById('model-select');
            const yearSelect = document.getElementById('year-select');
            const priceMin = document.getElementById('price-min');
            const priceMax = document.getElementById('price-max');
            
            if (makeSelect) makeSelect.addEventListener('change', () => this.updateModels());
            if (modelSelect) modelSelect.addEventListener('change', () => this.filterCars());
            if (yearSelect) yearSelect.addEventListener('change', () => this.filterCars());
            if (priceMin) priceMin.addEventListener('input', this.debounce(() => this.filterCars(), 500));
            if (priceMax) priceMax.addEventListener('input', this.debounce(() => this.filterCars(), 500));
        }

        // Compare functionality
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('compare-btn') || e.target.closest('.compare-btn')) {
                this.toggleCompare(e.target.closest('.car-card'));
            }
        });

        // Smooth scrolling for internal links
        document.addEventListener('click', (e) => {
            if (e.target.matches('a[href^="#"]')) {
                e.preventDefault();
                const target = document.querySelector(e.target.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({ 
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });

        // Keyboard navigation support
        document.addEventListener('keydown', (e) => this.handleKeyboardNavigation(e));

        // Window resize handler
        window.addEventListener('resize', this.debounce(() => this.handleResize(), 250));
    }

    // Mobile Navigation Toggle
    toggleMobileNav() {
        const navToggle = document.querySelector('.nav-toggle');
        const navMenu = document.querySelector('.nav-menu');
        
        const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
        
        navToggle.setAttribute('aria-expanded', !isExpanded);
        navMenu.classList.toggle('active');
        
        // Animate hamburger menu
        const hamburgers = navToggle.querySelectorAll('.hamburger');
        hamburgers.forEach((bar, index) => {
            if (!isExpanded) {
                if (index === 0) bar.style.transform = 'rotate(45deg) translate(6px, 6px)';
                if (index === 1) bar.style.opacity = '0';
                if (index === 2) bar.style.transform = 'rotate(-45deg) translate(6px, -6px)';
            } else {
                bar.style.transform = '';
                bar.style.opacity = '';
            }
        });
    }

    // Intersection Observer for animations
    setupIntersectionObserver() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        // Observe elements for animation
        const animatedElements = document.querySelectorAll('.car-card, .hero-content, .section-title');
        animatedElements.forEach(el => {
            el.classList.add('fade-in');
            observer.observe(el);
        });
    }

    // Load sample car data
    loadSampleData() {
        this.carData = [
            {
                id: 1,
                make: 'Toyota',
                model: 'Camry',
                year: 2023,
                price: 24999,
                originalPrice: 26999,
                mileage: 25000,
                transmission: 'Automatic',
                drivetrain: 'FWD',
                image: '🚗',
                dealer: 'Toyota Center',
                location: 'Downtown'
            },
            {
                id: 2,
                make: 'Honda',
                model: 'Civic',
                year: 2022,
                price: 22499,
                originalPrice: null,
                mileage: 18500,
                transmission: 'Manual',
                drivetrain: 'FWD',
                image: '🚗',
                dealer: 'Honda World',
                location: 'Midtown'
            },
            {
                id: 3,
                make: 'BMW',
                model: '3 Series',
                year: 2024,
                price: 39999,
                originalPrice: 42999,
                mileage: 5200,
                transmission: 'Automatic',
                drivetrain: 'AWD',
                image: '🚗',
                dealer: 'BMW Elite',
                location: 'Uptown'
            },
            {
                id: 4,
                make: 'Ford',
                model: 'Mustang',
                year: 2023,
                price: 32999,
                originalPrice: null,
                mileage: 12000,
                transmission: 'Manual',
                drivetrain: 'RWD',
                image: '🏎️',
                dealer: 'Ford Performance',
                location: 'Westside'
            },
            {
                id: 5,
                make: 'Mercedes',
                model: 'C-Class',
                year: 2024,
                price: 45999,
                originalPrice: 48999,
                mileage: 8500,
                transmission: 'Automatic',
                drivetrain: 'AWD',
                image: '🚗',
                dealer: 'Mercedes Luxury',
                location: 'Downtown'
            }
        ];
    }

    // Initialize search functionality
    initializeSearch() {
        this.updateModels();
        this.renderCarGrid();
    }

    // Update model dropdown based on selected make
    updateModels() {
        const makeSelect = document.getElementById('make-select');
        const modelSelect = document.getElementById('model-select');
        
        if (!makeSelect || !modelSelect) return;
        
        const selectedMake = makeSelect.value;
        
        // Clear existing options
        modelSelect.innerHTML = '<option value="">Any Model</option>';
        
        if (selectedMake) {
            const models = this.getModelsByMake(selectedMake);
            models.forEach(model => {
                const option = document.createElement('option');
                option.value = model.toLowerCase();
                option.textContent = model;
                modelSelect.appendChild(option);
            });
            modelSelect.disabled = false;
        } else {
            modelSelect.disabled = true;
        }
        
        this.filterCars();
    }

    // Get available models for a specific make
    getModelsByMake(make) {
        const models = this.carData
            .filter(car => car.make.toLowerCase() === make.toLowerCase())
            .map(car => car.model)
            .filter((model, index, array) => array.indexOf(model) === index);
        return models.sort();
    }

    // Filter cars based on search criteria
    filterCars() {
        const makeSelect = document.getElementById('make-select');
        const modelSelect = document.getElementById('model-select');
        const yearSelect = document.getElementById('year-select');
        const priceMin = document.getElementById('price-min');
        const priceMax = document.getElementById('price-max');
        const locationInput = document.getElementById('location-input');
        
        this.currentFilters = {
            make: makeSelect?.value || '',
            model: modelSelect?.value || '',
            year: yearSelect?.value || '',
            priceMin: parseInt(priceMin?.value) || 0,
            priceMax: parseInt(priceMax?.value) || Infinity,
            location: locationInput?.value || ''
        };
        
        const filteredCars = this.carData.filter(car => {
            const matchesMake = !this.currentFilters.make || 
                car.make.toLowerCase() === this.currentFilters.make.toLowerCase();
            const matchesModel = !this.currentFilters.model || 
                car.model.toLowerCase() === this.currentFilters.model.toLowerCase();
            const matchesYear = !this.currentFilters.year || 
                car.year.toString() === this.currentFilters.year;
            const matchesPrice = car.price >= this.currentFilters.priceMin && 
                car.price <= this.currentFilters.priceMax;
            const matchesLocation = !this.currentFilters.location || 
                car.location.toLowerCase().includes(this.currentFilters.location.toLowerCase());
            
            return matchesMake && matchesModel && matchesYear && matchesPrice && matchesLocation;
        });
        
        this.renderCarGrid(filteredCars);
    }

    // Handle search form submission
    handleSearch(e) {
        e.preventDefault();
        this.showLoading(true);
        
        // Simulate API call delay
        setTimeout(() => {
            this.filterCars();
            this.showLoading(false);
            this.announceToScreenReader(`Found ${this.getVisibleCars().length} vehicles matching your criteria`);
        }, 1000);
    }

    // Render car grid
    renderCarGrid(cars = this.carData) {
        const carGrid = document.querySelector('.car-grid');
        if (!carGrid) return;
        
        if (cars.length === 0) {
            carGrid.innerHTML = `
                <div class="no-results">
                    <h3>No vehicles found</h3>
                    <p>Try adjusting your search criteria</p>
                    <button class="btn btn-secondary" onclick="driveHive.clearFilters()">Clear Filters</button>
                </div>
            `;
            return;
        }
        
        carGrid.innerHTML = cars.map(car => this.createCarCard(car)).join('');
        
        // Re-observe new elements for animations
        const newCards = carGrid.querySelectorAll('.car-card:not(.visible)');
        newCards.forEach(card => {
            card.classList.add('fade-in');
            // Small delay for staggered animation
            setTimeout(() => card.classList.add('visible'), Math.random() * 200);
        });
    }

    // Create individual car card HTML
    createCarCard(car) {
        const isInCompare = this.compareList.some(c => c.id === car.id);
        const compareIcon = isInCompare ? '✓' : '+';
        const compareClass = isInCompare ? 'in-compare' : '';
        
        return `
            <article class="car-card" role="listitem" data-car-id="${car.id}">
                <div class="car-image">
                    <div class="car-placeholder">${car.image} Car Image</div>
                    <button class="compare-btn ${compareClass}" 
                            aria-label="${isInCompare ? 'Remove from comparison' : 'Add to comparison'}"
                            data-car-id="${car.id}">
                        ${compareIcon}
                    </button>
                </div>
                <div class="car-info">
                    <h3 class="car-title">${car.year} ${car.make} ${car.model}</h3>
                    <p class="car-details">${car.mileage.toLocaleString()} miles • ${car.transmission} • ${car.drivetrain}</p>
                    <div class="car-price">
                        <span class="price-current">$${car.price.toLocaleString()}</span>
                        ${car.originalPrice ? `<span class="price-original">$${car.originalPrice.toLocaleString()}</span>` : ''}
                    </div>
                    <div class="car-location">
                        <small>📍 ${car.dealer} - ${car.location}</small>
                    </div>
                    <div class="car-actions">
                        <button class="btn btn-primary" onclick="driveHive.viewCarDetails(${car.id})">
                            View Details
                        </button>
                        <button class="btn btn-secondary" onclick="driveHive.contactDealer(${car.id})">
                            Contact Dealer
                        </button>
                    </div>
                </div>
            </article>
        `;
    }

    // Toggle car in comparison
    toggleCompare(carCard) {
        const carId = parseInt(carCard.dataset.carId);
        const car = this.carData.find(c => c.id === carId);
        
        if (!car) return;
        
        const existingIndex = this.compareList.findIndex(c => c.id === carId);
        
        if (existingIndex > -1) {
            this.compareList.splice(existingIndex, 1);
            this.announceToScreenReader(`${car.year} ${car.make} ${car.model} removed from comparison`);
        } else {
            if (this.compareList.length >= 3) {
                this.showNotification('You can compare up to 3 vehicles at a time', 'warning');
                return;
            }
            this.compareList.push(car);
            this.announceToScreenReader(`${car.year} ${car.make} ${car.model} added to comparison`);
        }
        
        this.updateCompareSection();
        this.renderCarGrid(this.getVisibleCars());
    }

    // Update comparison section
    updateCompareSection() {
        const compareContainer = document.querySelector('.compare-container');
        if (!compareContainer) return;
        
        if (this.compareList.length === 0) {
            compareContainer.innerHTML = `
                <div class="compare-placeholder">
                    <p>Select vehicles from our listings to compare side-by-side</p>
                    <button class="btn btn-secondary" onclick="scrollToSearch()">Browse Cars</button>
                </div>
            `;
        } else {
            compareContainer.innerHTML = `
                <div class="compare-header">
                    <h3>Comparing ${this.compareList.length} Vehicle${this.compareList.length > 1 ? 's' : ''}</h3>
                    <button class="btn btn-secondary" onclick="driveHive.clearCompare()">Clear All</button>
                </div>
                <div class="compare-grid">
                    ${this.compareList.map(car => this.createCompareCard(car)).join('')}
                </div>
            `;
        }
    }

    // Create comparison card
    createCompareCard(car) {
        return `
            <div class="compare-card">
                <div class="compare-image">${car.image}</div>
                <h4>${car.year} ${car.make} ${car.model}</h4>
                <div class="compare-details">
                    <p><strong>Price:</strong> $${car.price.toLocaleString()}</p>
                    <p><strong>Mileage:</strong> ${car.mileage.toLocaleString()} miles</p>
                    <p><strong>Transmission:</strong> ${car.transmission}</p>
                    <p><strong>Drivetrain:</strong> ${car.drivetrain}</p>
                </div>
                <button class="btn btn-primary" onclick="driveHive.viewCarDetails(${car.id})">
                    View Details
                </button>
            </div>
        `;
    }

    // Car detail actions
    viewCarDetails(carId) {
        const car = this.carData.find(c => c.id === carId);
        if (car) {
            this.showNotification(`Opening details for ${car.year} ${car.make} ${car.model}`, 'info');
            // In a real app, this would navigate to a detail page
        }
    }

    contactDealer(carId) {
        const car = this.carData.find(c => c.id === carId);
        if (car) {
            this.showNotification(`Connecting you with ${car.dealer}`, 'info');
            // In a real app, this would open a contact form or initiate contact
        }
    }

    // Utility functions
    getVisibleCars() {
        if (Object.keys(this.currentFilters).length === 0) return this.carData;
        
        return this.carData.filter(car => {
            const matchesMake = !this.currentFilters.make || 
                car.make.toLowerCase() === this.currentFilters.make.toLowerCase();
            const matchesModel = !this.currentFilters.model || 
                car.model.toLowerCase() === this.currentFilters.model.toLowerCase();
            const matchesYear = !this.currentFilters.year || 
                car.year.toString() === this.currentFilters.year;
            const matchesPrice = car.price >= this.currentFilters.priceMin && 
                car.price <= this.currentFilters.priceMax;
            const matchesLocation = !this.currentFilters.location || 
                car.location.toLowerCase().includes(this.currentFilters.location.toLowerCase());
            
            return matchesMake && matchesModel && matchesYear && matchesPrice && matchesLocation;
        });
    }

    clearFilters() {
        document.getElementById('make-select').value = '';
        document.getElementById('model-select').value = '';
        document.getElementById('year-select').value = '';
        document.getElementById('price-min').value = '';
        document.getElementById('price-max').value = '';
        document.getElementById('location-input').value = '';
        
        this.currentFilters = {};
        this.updateModels();
        this.renderCarGrid();
        this.announceToScreenReader('Filters cleared, showing all vehicles');
    }

    clearCompare() {
        this.compareList = [];
        this.updateCompareSection();
        this.renderCarGrid(this.getVisibleCars());
        this.announceToScreenReader('Comparison cleared');
    }

    // Accessibility and UX enhancements
    announceToScreenReader(message) {
        const announcement = document.createElement('div');
        announcement.setAttribute('aria-live', 'polite');
        announcement.setAttribute('aria-atomic', 'true');
        announcement.className = 'sr-only';
        announcement.textContent = message;
        
        document.body.appendChild(announcement);
        
        setTimeout(() => {
            document.body.removeChild(announcement);
        }, 1000);
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <span>${message}</span>
            <button onclick="this.parentElement.remove()" aria-label="Close notification">×</button>
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.classList.add('show');
        }, 100);
        
        setTimeout(() => {
            if (notification.parentElement) {
                notification.remove();
            }
        }, 5000);
    }

    showLoading(show) {
        this.isLoading = show;
        const searchBtn = document.querySelector('.search-btn');
        
        if (searchBtn) {
            if (show) {
                searchBtn.disabled = true;
                searchBtn.innerHTML = '🔄 Searching...';
            } else {
                searchBtn.disabled = false;
                searchBtn.innerHTML = 'Search Cars';
            }
        }
    }

    handleKeyboardNavigation(e) {
        // Enhanced keyboard navigation for accessibility
        if (e.key === 'Escape') {
            // Close mobile menu if open
            const navMenu = document.querySelector('.nav-menu');
            if (navMenu && navMenu.classList.contains('active')) {
                this.toggleMobileNav();
            }
        }
    }

    handleResize() {
        // Close mobile menu on resize to larger screen
        if (window.innerWidth > 768) {
            const navMenu = document.querySelector('.nav-menu');
            const navToggle = document.querySelector('.nav-toggle');
            
            if (navMenu && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                navToggle.setAttribute('aria-expanded', 'false');
                
                // Reset hamburger animation
                const hamburgers = navToggle.querySelectorAll('.hamburger');
                hamburgers.forEach(bar => {
                    bar.style.transform = '';
                    bar.style.opacity = '';
                });
            }
        }
    }

    // Debounce function for performance
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
}

// Global helper functions
function scrollToSearch() {
    const searchSection = document.getElementById('search');
    if (searchSection) {
        searchSection.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Initialize application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.driveHive = new DriveHive();
});

// Add some additional CSS for notifications via JavaScript
const notificationStyles = `
    .notification {
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        border-radius: 0.5rem;
        color: white;
        font-weight: 500;
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        transform: translateX(100%);
        opacity: 0;
        transition: all 0.3s ease-out;
        z-index: 1000;
        max-width: 300px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;
    }
    
    .notification.show {
        transform: translateX(0);
        opacity: 1;
    }
    
    .notification-info {
        background-color: var(--primary-blue);
    }
    
    .notification-success {
        background-color: var(--success-green);
    }
    
    .notification-warning {
        background-color: var(--warning-yellow);
        color: var(--charcoal);
    }
    
    .notification-error {
        background-color: var(--error-red);
    }
    
    .notification button {
        background: none;
        border: none;
        color: inherit;
        font-size: 1.25rem;
        cursor: pointer;
        padding: 0;
        width: 24px;
        height: 24px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    
    .no-results {
        grid-column: 1 / -1;
        text-align: center;
        padding: 3rem;
        background-color: var(--gray-50);
        border-radius: var(--border-radius-lg);
        border: 2px dashed var(--gray-200);
    }
    
    .no-results h3 {
        color: var(--gray-600);
        margin-bottom: 1rem;
    }
    
    .no-results p {
        color: var(--gray-500);
        margin-bottom: 2rem;
    }
    
    .compare-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 2rem;
        padding-bottom: 1rem;
        border-bottom: 2px solid var(--gray-200);
    }
    
    .compare-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: 2rem;
    }
    
    .compare-card {
        background: white;
        padding: 1.5rem;
        border-radius: var(--border-radius-lg);
        box-shadow: var(--box-shadow);
        text-align: center;
    }
    
    .compare-image {
        font-size: 3rem;
        margin-bottom: 1rem;
    }
    
    .compare-details {
        margin: 1rem 0;
        text-align: left;
    }
    
    .compare-details p {
        margin-bottom: 0.5rem;
        font-size: 0.9rem;
    }
    
    .compare-btn.in-compare {
        background-color: var(--success-green);
        border-color: var(--success-green);
        color: white;
    }
    
    .car-location {
        margin-bottom: 1rem;
        color: var(--gray-600);
        font-size: 0.875rem;
    }
`;

// Inject notification styles
const styleSheet = document.createElement('style');
styleSheet.textContent = notificationStyles;
document.head.appendChild(styleSheet);
