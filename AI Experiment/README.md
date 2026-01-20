# HobbyHub - Hobby & Activity Discovery Platform

A fully functional, self-contained web application for discovering, browsing, and booking hobbies and activities. Similar to ClassPass, Eventbrite, and ClassBento.

## 📋 Overview

HobbyHub is a modern, responsive web platform that brings together hobby enthusiasts, instructors, and activity providers. Users can discover new hobbies, filter by category, difficulty, and price, read reviews, and book their favorite activities.

## ✨ Features

### 🏠 Home Page
- **Hero Section**: Eye-catching banner with search functionality
- **Popular Categories**: 6 main hobby categories (Arts & Crafts, Fitness, Music, Cooking, Technology, Sports)
- **Featured Activities**: Curated selection of trending hobbies with ratings and prices

### 🔍 Browse Page
- **Advanced Search**: Real-time search across all hobbies
- **Multi-Filter System**:
  - Filter by Category
  - Filter by Price Range ($0-25, $25-50, $50-100, $100+)
  - Filter by Difficulty Level (Beginner, Intermediate, Advanced)
- **Smart Sorting**:
  - Most Popular
  - Newest
  - Price: Low to High / High to Low
  - Highest Rated
- **Live Filtering**: Filters update results instantly as you select options

### 📖 Detail Page
- **Complete Activity Information**:
  - Description and instructor bio
  - Price per session
  - Duration and difficulty level
  - Number of enrolled students
  - Category information
- **Upcoming Sessions**: Calendar of available class times
- **Student Reviews**: Real feedback from previous attendees
- **Booking System**: Easy one-click booking
- **Wishlist**: Save activities to revisit later

### 📅 My Bookings
- **Upcoming Bookings Tab**: Your scheduled activities
- **Completed Bookings Tab**: Past experiences with review options
- **Wishlist Tab**: Saved hobbies for later exploration

### ℹ️ About Page
- Information about HobbyHub mission and values

## 🎯 Activities Included

15 diverse hobby categories with 15 sample activities:
- Beginner Yoga Flow
- Digital Painting Masterclass
- Spanish Conversation Hour
- Gourmet Cooking Class
- Guitar for Absolute Beginners
- Web Development Bootcamp
- HIIT Fitness Training
- Pottery & Ceramics Studio
- Tennis Coaching
- Business English Workshop
- Photography Essentials
- Soccer Training Camp
- Baking & Pastry Class
- Piano Lessons for Adults
- Machine Learning Fundamentals

## 🚀 Getting Started

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge)
- No additional installations or dependencies required

### Running the Application

1. **Local File Method**:
   - Navigate to the AI Experiment folder
   - Right-click on `index.html`
   - Select "Open with" → Choose your web browser
   - The app will load completely in your browser

2. **Local Server Method** (Recommended):
   - Open a terminal/command prompt
   - Navigate to the AI Experiment folder
   - Python 3: `python -m http.server 8000`
   - Python 2: `python -m SimpleHTTPServer 8000`
   - Node.js: `npx http-server`
   - Open browser to `http://localhost:8000`

## 🗂️ File Structure

```
AI Experiment/
├── index.html          # Main HTML file with all pages
├── css/
│   └── style.css       # Complete styling with responsive design
├── js/
│   ├── app.js          # Main application logic
│   └── data.js         # Sample hobby data and utilities
├── images/             # For future image assets
├── data/               # For future data storage
└── README.md           # This file
```

## 💡 How to Use

### Discovering Hobbies

1. **From Home Page**:
   - Click on a category card (e.g., "Fitness", "Music")
   - Or use the search bar to find specific activities
   - Browse featured activities with ratings and prices

2. **Using Browse Page**:
   - Navigate to "Browse" in the menu
   - Use sidebar filters to narrow down options
   - Search for specific terms
   - Sort by popularity, price, or rating

3. **Viewing Details**:
   - Click on any activity card
   - Read full description, reviews, and instructor info
   - Check upcoming session times
   - See enrolled student count and difficulty level

### Making a Booking

1. Click on an activity
2. Click "Book Now" button
3. Review booking details in the modal
4. Confirm your booking
5. Activity appears in "My Bookings" → "Upcoming"

### Using Wishlist

1. Open an activity detail page
2. Click "Add to Wishlist" button
3. View all saved items in "My Bookings" → "Wishlist"
4. Remove items with the "Remove from Wishlist" button

## 🎨 Design Features

- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Modern UI**: Gradient backgrounds, smooth animations, and intuitive navigation
- **Color Scheme**: 
  - Primary: Red (#FF6B6B) - Call-to-action buttons
  - Secondary: Teal (#4ECDC4) - Secondary buttons
  - Tertiary: Blue (#45B7D1) - Accents
- **Accessibility**: Clear typography, good contrast ratios, keyboard navigation

## 💾 Data Persistence

The application uses browser localStorage to save:
- **Bookings**: Your reserved activities
- **Wishlist**: Your saved favorites

Data persists even after closing the browser (as long as you don't clear browser data).

## 🔧 Customization

### Adding New Activities

Edit `js/data.js` and add to the `hobbiesData` array:

```javascript
{
    id: 16,
    title: "Your Activity Title",
    category: "Category Name",
    instructor: "Instructor Name",
    price: 45,
    rating: 4.8,
    reviews: 150,
    description: "Detailed description...",
    difficulty: "Intermediate",
    duration: "60 minutes",
    enrolled: 500,
    icon: "🎯",
    schedule: ["Monday 9:00 AM", "Wednesday 6:00 PM"],
    reviews_list: [...]
}
```

### Modifying Styling

Edit `css/style.css` to change:
- Colors (CSS variables at the top)
- Fonts
- Layouts
- Responsive breakpoints

### Adding New Pages

1. Add a new section in `index.html`
2. Add navigation link
3. Implement logic in `app.js` with a new `render*` method

## 📱 Browser Compatibility

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## ⚙️ Technical Stack

- **HTML5**: Semantic markup and structure
- **CSS3**: Modern styling with Flexbox and CSS Grid
- **Vanilla JavaScript**: Pure JavaScript (no frameworks or dependencies)
- **LocalStorage API**: For data persistence

## 🎓 Learning Resources

This project demonstrates:
- Responsive web design principles
- Object-oriented JavaScript (ES6 Classes)
- DOM manipulation and event handling
- Array methods (filter, map, sort)
- Local Storage for data persistence
- CSS Grid and Flexbox layouts
- Mobile-first responsive design

## 🐛 Known Limitations

- Images are placeholder gradients (could be replaced with real images)
- No backend server (all data in client)
- Bookings only stored locally (not synced across devices)
- No user authentication
- No payment processing

## 🔮 Future Enhancements

- Real image uploads for activities
- User authentication and profiles
- Backend database integration
- Payment processing
- Email notifications
- Social sharing
- Rating system
- Instructor profiles
- Map integration for location-based activities

## 📄 License

This is a demonstration project created for learning and portfolio purposes.

## 👥 Credits

Created as a fully functional hobby discovery platform built with modern web technologies.

---

**Ready to explore your next hobby? Start HobbyHub today!**