// HobbyHub Application Logic
class HobbyApp {
    constructor() {
        this.currentPage = 'home';
        this.bookings = this.loadBookings();
        this.wishlist = this.loadWishlist();
        this.currentFilters = {
            categories: [],
            priceRanges: [],
            difficulties: []
        };
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.renderHomePage();
    }

    setupEventListeners() {
        // Navigation
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const page = e.target.dataset.page;
                this.navigateTo(page);
            });
        });

        // Category cards on home page
        document.querySelectorAll('.category-card').forEach(card => {
            card.addEventListener('click', () => {
                const category = card.dataset.category;
                this.filterByCategory(category);
            });
        });

        // Hero search
        document.getElementById('hero-search-btn').addEventListener('click', () => {
            const query = document.getElementById('hero-search').value;
            if (query.trim()) {
                this.performSearch(query);
            }
        });

        document.getElementById('hero-search').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                const query = e.target.value;
                if (query.trim()) {
                    this.performSearch(query);
                }
            }
        });

        // Browse page filters
        document.querySelectorAll('.filter-checkbox').forEach(checkbox => {
            checkbox.addEventListener('change', () => {
                if (checkbox.value === 'all') {
                    this.clearFilters();
                } else {
                    this.updateFilters();
                }
            });
        });

        document.getElementById('clear-filters-btn').addEventListener('click', () => {
            this.clearFilters();
        });

        // Browse search and sort
        document.getElementById('browse-search').addEventListener('input', (e) => {
            this.filterBrowseHobbies();
        });

        document.getElementById('sort-dropdown').addEventListener('change', () => {
            this.filterBrowseHobbies();
        });

        // Back button
        document.getElementById('back-btn').addEventListener('click', () => {
            this.navigateTo('browse');
        });

        // Booking tabs
        document.querySelectorAll('.booking-tab').forEach(tab => {
            tab.addEventListener('click', (e) => {
                this.switchBookingTab(e.target.dataset.tab);
            });
        });

        // Modal
        document.querySelector('.modal-close').addEventListener('click', () => {
            this.closeBookingModal();
        });

        document.getElementById('cancel-booking-btn').addEventListener('click', () => {
            this.closeBookingModal();
        });

        document.getElementById('confirm-booking-btn').addEventListener('click', () => {
            this.confirmBooking();
        });

        // Click outside modal
        document.getElementById('booking-modal').addEventListener('click', (e) => {
            if (e.target.id === 'booking-modal') {
                this.closeBookingModal();
            }
        });
    }

    navigateTo(page) {
        // Hide all pages
        document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));

        // Update navigation
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
            if (link.dataset.page === page) {
                link.classList.add('active');
            }
        });

        // Show selected page and scroll to top
        document.getElementById(`${page}-page`).classList.add('active');
        window.scrollTo(0, 0);
        this.currentPage = page;

        // Render page content
        if (page === 'browse') {
            this.renderBrowsePage();
        } else if (page === 'my-bookings') {
            this.renderBookingsPage();
        }
    }

    // HOME PAGE
    renderHomePage() {
        const featured = getAllHobbies().slice(0, 6);
        const container = document.getElementById('featured-hobbies');
        container.innerHTML = featured.map(hobby => this.createHobbyCard(hobby)).join('');
        
        container.querySelectorAll('.hobby-card').forEach(card => {
            card.addEventListener('click', () => {
                const id = parseInt(card.dataset.id);
                this.showHobbyDetail(id);
            });
        });
    }

    // BROWSE PAGE
    renderBrowsePage() {
        this.filterBrowseHobbies();
    }

    filterBrowseHobbies() {
        let hobbies = getAllHobbies();
        
        // Text search
        const searchQuery = document.getElementById('browse-search').value;
        if (searchQuery.trim()) {
            hobbies = searchHobbies(searchQuery);
        }

        // Category filter
        const categoryFilters = Array.from(document.querySelectorAll('.filter-checkbox[data-filter="category"]:checked')).map(c => c.value);
        if (categoryFilters.length > 0) {
            hobbies = hobbies.filter(h => categoryFilters.includes(h.category));
        }

        // Price filter
        const priceFilters = Array.from(document.querySelectorAll('.filter-checkbox[data-filter="price"]:checked')).map(c => c.value);
        if (priceFilters.length > 0) {
            hobbies = hobbies.filter(hobby => {
                return priceFilters.some(range => {
                    if (range === '0-25') return hobby.price <= 25;
                    if (range === '25-50') return hobby.price > 25 && hobby.price <= 50;
                    if (range === '50-100') return hobby.price > 50 && hobby.price <= 100;
                    if (range === '100+') return hobby.price > 100;
                    return true;
                });
            });
        }

        // Difficulty filter
        const difficultyFilters = Array.from(document.querySelectorAll('.filter-checkbox[data-filter="difficulty"]:checked')).map(c => c.value);
        if (difficultyFilters.length > 0) {
            hobbies = hobbies.filter(h => difficultyFilters.includes(h.difficulty));
        }

        // Sort
        const sortBy = document.getElementById('sort-dropdown').value;
        hobbies = sortHobbies(hobbies, sortBy);

        // Render
        const container = document.getElementById('browse-hobbies');
        if (hobbies.length === 0) {
            container.innerHTML = '<div class="empty-state"><div class="empty-state-icon">🔍</div><h3>No activities found</h3><p>Try adjusting your filters or search query</p></div>';
        } else {
            container.innerHTML = hobbies.map(hobby => this.createHobbyCard(hobby)).join('');
            container.querySelectorAll('.hobby-card').forEach(card => {
                card.addEventListener('click', () => {
                    const id = parseInt(card.dataset.id);
                    this.showHobbyDetail(id);
                });
            });
        }
    }

    updateFilters() {
        this.filterBrowseHobbies();
    }

    clearFilters() {
        document.querySelectorAll('.filter-checkbox').forEach(checkbox => {
            checkbox.checked = checkbox.value === 'all';
        });
        this.filterBrowseHobbies();
    }

    filterByCategory(category) {
        this.navigateTo('browse');
        // Reset all filters
        document.querySelectorAll('.filter-checkbox').forEach(c => c.checked = false);
        // Set category filter
        const categoryCheckbox = document.querySelector(`input[data-filter="category"][value="${category}"]`);
        if (categoryCheckbox) {
            categoryCheckbox.checked = true;
            this.updateFilters();
        }
    }

    performSearch(query) {
        this.navigateTo('browse');
        document.getElementById('browse-search').value = query;
        this.filterBrowseHobbies();
    }

    // HOBBY DETAIL PAGE
    showHobbyDetail(id) {
        const hobby = getHobbyById(id);
        if (!hobby) return;

        // Update page content
        document.getElementById('detail-title').textContent = hobby.title;
        document.getElementById('detail-rating').innerHTML = `⭐ ${hobby.rating}`;
        document.getElementById('detail-reviews').textContent = `(${hobby.reviews} reviews)`;
        document.getElementById('detail-difficulty').textContent = hobby.difficulty;
        document.getElementById('detail-price').textContent = `$${hobby.price}`;
        document.getElementById('detail-description').textContent = hobby.description;
        document.getElementById('detail-instructor').textContent = hobby.instructor;
        document.getElementById('detail-duration').textContent = hobby.duration;
        document.getElementById('detail-category').textContent = hobby.category;
        document.getElementById('detail-enrolled').textContent = hobby.enrolled.toLocaleString();

        // Image
        const imagePlaceholder = document.getElementById('detail-image-placeholder');
        imagePlaceholder.style.background = this.getCategoryGradient(hobby.category);
        imagePlaceholder.textContent = hobby.icon;

        // Schedule
        const scheduleList = document.getElementById('detail-schedule');
        scheduleList.innerHTML = hobby.schedule.map(time => 
            `<li class="schedule-item"><span>${time}</span><button class="btn btn-primary btn-small">Book</button></li>`
        ).join('');
        
        scheduleList.querySelectorAll('button').forEach(btn => {
            btn.addEventListener('click', () => this.openBookingModal(id, hobby));
        });

        // Reviews
        const reviewsList = document.getElementById('detail-reviews-list');
        reviewsList.innerHTML = hobby.reviews_list.map(review => `
            <div class="review-item">
                <div class="review-header">
                    <div>
                        <div class="review-name">${review.name}</div>
                        <div class="review-date">${review.date}</div>
                    </div>
                    <div class="review-rating">${'⭐'.repeat(review.rating)}</div>
                </div>
                <div class="review-text">${review.text}</div>
            </div>
        `).join('');

        // Book and wishlist buttons
        document.getElementById('book-btn').onclick = () => this.openBookingModal(id, hobby);
        
        const wishlistBtn = document.getElementById('wishlist-btn');
        if (this.wishlist.includes(id)) {
            wishlistBtn.textContent = '❤️ Remove from Wishlist';
        } else {
            wishlistBtn.textContent = '♥ Add to Wishlist';
        }
        
        wishlistBtn.onclick = () => this.toggleWishlist(id, wishlistBtn);

        // Navigate to detail page
        this.navigateTo('browse');
        document.getElementById('browse-page').classList.remove('active');
        document.getElementById('detail-page').classList.add('active');
    }

    getCategoryGradient(category) {
        const gradients = {
            'Arts & Crafts': 'linear-gradient(135deg, #F093FB 0%, #F5576C 100%)',
            'Fitness': 'linear-gradient(135deg, #4FACFE 0%, #00F2FE 100%)',
            'Music': 'linear-gradient(135deg, #FA709A 0%, #FEE140 100%)',
            'Cooking': 'linear-gradient(135deg, #30CFD0 0%, #330867 100%)',
            'Technology': 'linear-gradient(135deg, #A8EDEA 0%, #FED6E3 100%)',
            'Sports': 'linear-gradient(135deg, #FF9A56 0%, #FF6A88 100%)'
        };
        return gradients[category] || 'linear-gradient(135deg, #667EEA 0%, #764BA2 100%)';
    }

    toggleWishlist(id, btn) {
        if (this.wishlist.includes(id)) {
            this.wishlist = this.wishlist.filter(wid => wid !== id);
            btn.textContent = '♥ Add to Wishlist';
        } else {
            this.wishlist.push(id);
            btn.textContent = '❤️ Remove from Wishlist';
        }
        this.saveWishlist();
        this.showNotification('Wishlist updated!');
    }

    // BOOKING MODAL
    currentBookingHobby = null;

    openBookingModal(id, hobby) {
        this.currentBookingHobby = id;
        const modal = document.getElementById('booking-modal');
        const modalDetails = document.getElementById('modal-details');
        
        modalDetails.innerHTML = `
            <p><strong>${hobby.title}</strong></p>
            <p>Instructor: ${hobby.instructor}</p>
            <p>Price: $${hobby.price} per session</p>
            <p>Duration: ${hobby.duration}</p>
            <p>By booking, you agree to the terms and conditions.</p>
        `;
        
        modal.classList.add('active');
    }

    closeBookingModal() {
        document.getElementById('booking-modal').classList.remove('active');
        this.currentBookingHobby = null;
    }

    confirmBooking() {
        if (!this.currentBookingHobby) return;
        
        const hobby = getHobbyById(this.currentBookingHobby);
        const booking = {
            id: Date.now(),
            hobbyId: this.currentBookingHobby,
            title: hobby.title,
            instructor: hobby.instructor,
            price: hobby.price,
            date: new Date().toLocaleDateString(),
            status: 'upcoming'
        };
        
        this.bookings.push(booking);
        this.saveBookings();
        this.closeBookingModal();
        this.showNotification(`Successfully booked ${hobby.title}!`);
    }

    // BOOKINGS PAGE
    renderBookingsPage() {
        this.renderUpcomingBookings();
        this.renderCompletedBookings();
        this.renderWishlistItems();
    }

    renderUpcomingBookings() {
        const upcomingList = document.getElementById('upcoming-list');
        const upcoming = this.bookings.filter(b => b.status === 'upcoming');
        
        if (upcoming.length === 0) {
            upcomingList.innerHTML = '<div class="empty-state"><div class="empty-state-icon">📅</div><h3>No upcoming bookings</h3><p>Start booking your favorite activities today!</p></div>';
        } else {
            upcomingList.innerHTML = upcoming.map(booking => `
                <div class="booking-card">
                    <div class="booking-info">
                        <h3>${booking.title}</h3>
                        <div class="booking-details">
                            <p>Instructor: ${booking.instructor}</p>
                            <p>Date: ${booking.date}</p>
                            <p>Price: $${booking.price}</p>
                        </div>
                    </div>
                    <div class="booking-actions">
                        <span class="booking-status status-upcoming">Upcoming</span>
                        <button class="btn btn-secondary btn-small" onclick="app.cancelBooking(${booking.id})">Cancel</button>
                    </div>
                </div>
            `).join('');
        }
    }

    renderCompletedBookings() {
        const completedList = document.getElementById('completed-list');
        const completed = this.bookings.filter(b => b.status === 'completed');
        
        if (completed.length === 0) {
            completedList.innerHTML = '<div class="empty-state"><div class="empty-state-icon">✓</div><h3>No completed bookings yet</h3><p>Your completed activities will appear here</p></div>';
        } else {
            completedList.innerHTML = completed.map(booking => `
                <div class="booking-card">
                    <div class="booking-info">
                        <h3>${booking.title}</h3>
                        <div class="booking-details">
                            <p>Instructor: ${booking.instructor}</p>
                            <p>Date: ${booking.date}</p>
                            <p>Price: $${booking.price}</p>
                        </div>
                    </div>
                    <div class="booking-actions">
                        <span class="booking-status status-completed">Completed</span>
                        <button class="btn btn-primary btn-small">Leave Review</button>
                    </div>
                </div>
            `).join('');
        }
    }

    renderWishlistItems() {
        const wishlistList = document.getElementById('wishlist-list');
        const wishlistHobbies = this.wishlist.map(id => getHobbyById(id)).filter(h => h);
        
        if (wishlistHobbies.length === 0) {
            wishlistList.innerHTML = '<div class="empty-state"><div class="empty-state-icon">💝</div><h3>Your wishlist is empty</h3><p>Add hobbies to your wishlist to save them for later</p></div>';
        } else {
            wishlistList.innerHTML = wishlistHobbies.map(hobby => this.createHobbyCard(hobby)).join('');
            wishlistList.querySelectorAll('.hobby-card').forEach(card => {
                card.addEventListener('click', () => {
                    const id = parseInt(card.dataset.id);
                    this.showHobbyDetail(id);
                });
            });
        }
    }

    switchBookingTab(tab) {
        document.querySelectorAll('.booking-tab').forEach(t => t.classList.remove('active'));
        event.target.classList.add('active');
        
        document.querySelectorAll('.bookings-content').forEach(c => c.classList.remove('active'));
        document.getElementById(`${tab}-bookings`).classList.add('active');
    }

    cancelBooking(bookingId) {
        this.bookings = this.bookings.filter(b => b.id !== bookingId);
        this.saveBookings();
        this.renderBookingsPage();
        this.showNotification('Booking cancelled');
    }

    // UTILITY FUNCTIONS
    createHobbyCard(hobby) {
        return `
            <div class="hobby-card" data-id="${hobby.id}" data-category="${hobby.category}">
                <div class="hobby-image">${hobby.icon}</div>
                <div class="hobby-content">
                    <div class="hobby-category">${hobby.category}</div>
                    <h3 class="hobby-title">${hobby.title}</h3>
                    <div class="hobby-instructor">by ${hobby.instructor}</div>
                    <div class="hobby-meta">
                        <div class="hobby-rating">
                            <span class="stars">⭐ ${hobby.rating}</span>
                            <span>(${hobby.reviews})</span>
                        </div>
                        <div class="hobby-price">$${hobby.price}</div>
                    </div>
                    <p class="hobby-description">${hobby.description.substring(0, 80)}...</p>
                    <div class="hobby-footer">
                        <button class="btn btn-primary">View Details</button>
                    </div>
                </div>
            </div>
        `;
    }

    showNotification(message) {
        const notification = document.getElementById('success-message');
        document.getElementById('notification-text').textContent = message;
        notification.classList.add('show');
        
        setTimeout(() => {
            notification.classList.remove('show');
        }, 3000);
    }

    // LOCAL STORAGE
    saveBookings() {
        localStorage.setItem('hobbyBookings', JSON.stringify(this.bookings));
    }

    loadBookings() {
        const stored = localStorage.getItem('hobbyBookings');
        return stored ? JSON.parse(stored) : [];
    }

    saveWishlist() {
        localStorage.setItem('hobbyWishlist', JSON.stringify(this.wishlist));
    }

    loadWishlist() {
        const stored = localStorage.getItem('hobbyWishlist');
        return stored ? JSON.parse(stored) : [];
    }
}

// Initialize app when DOM is ready
let app;
document.addEventListener('DOMContentLoaded', () => {
    app = new HobbyApp();
});