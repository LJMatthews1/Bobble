// Sample hobby/activity data
const hobbiesData = [
    {
        id: 1,
        title: "Beginner Yoga Flow",
        category: "Fitness",
        instructor: "Sarah Johnson",
        price: 25,
        rating: 4.8,
        reviews: 156,
        description: "Start your yoga journey with our beginner-friendly classes. Learn proper alignment and build flexibility at your own pace.",
        difficulty: "Beginner",
        duration: "60 minutes",
        enrolled: 1240,
        icon: "🧘",
        schedule: ["Monday 9:00 AM", "Wednesday 5:30 PM", "Saturday 10:00 AM"],
        reviews_list: [
            { name: "Jane D.", rating: 5, date: "2 weeks ago", text: "Amazing instructor, very patient and encouraging!" },
            { name: "Michael R.", rating: 4, date: "1 month ago", text: "Great class, perfect for beginners. Looking forward to the next session." }
        ]
    },
    {
        id: 2,
        title: "Digital Painting Masterclass",
        category: "Arts & Crafts",
        instructor: "Alex Chen",
        price: 45,
        rating: 4.9,
        reviews: 203,
        description: "Master digital painting techniques using industry-standard software. Create stunning artwork from scratch.",
        difficulty: "Intermediate",
        duration: "90 minutes",
        enrolled: 856,
        icon: "🎨",
        schedule: ["Tuesday 7:00 PM", "Thursday 6:00 PM", "Sunday 2:00 PM"],
        reviews_list: [
            { name: "Emma S.", rating: 5, date: "3 days ago", text: "Best art class I've taken! Extremely knowledgeable instructor." },
            { name: "David L.", rating: 5, date: "1 week ago", text: "Worth every penny. I've already completed 3 pieces!" }
        ]
    },
    {
        id: 3,
        title: "Spanish Conversation Hour",
        category: "Technology",
        instructor: "Maria Garcia",
        price: 20,
        rating: 4.7,
        reviews: 128,
        description: "Practice real Spanish conversation in a relaxed environment. Suitable for intermediate speakers.",
        difficulty: "Intermediate",
        duration: "60 minutes",
        enrolled: 542,
        icon: "🗣️",
        schedule: ["Monday 3:00 PM", "Thursday 4:00 PM", "Friday 2:00 PM"],
        reviews_list: [
            { name: "Robert P.", rating: 4, date: "1 week ago", text: "Great conversational practice. Maria is very supportive." },
            { name: "Sophie M.", rating: 5, date: "2 weeks ago", text: "Finally a class that focuses on speaking! Loved it." }
        ]
    },
    {
        id: 4,
        title: "Gourmet Cooking Class",
        category: "Cooking",
        instructor: "Chef Marcus",
        price: 65,
        rating: 4.9,
        reviews: 312,
        description: "Learn professional cooking techniques and create restaurant-quality meals at home.",
        difficulty: "Intermediate",
        duration: "120 minutes",
        enrolled: 1089,
        icon: "👨‍🍳",
        schedule: ["Wednesday 5:00 PM", "Saturday 3:00 PM", "Sunday 11:00 AM"],
        reviews_list: [
            { name: "Lisa H.", rating: 5, date: "1 day ago", text: "Chef Marcus made everything so clear and delicious!" },
            { name: "Thomas K.", rating: 5, date: "4 days ago", text: "I've made the recipes twice already. My family loves them!" }
        ]
    },
    {
        id: 5,
        title: "Guitar for Absolute Beginners",
        category: "Music",
        instructor: "Jake Wilson",
        price: 30,
        rating: 4.6,
        reviews: 245,
        description: "Never played guitar before? No problem! Learn chords, strumming patterns, and your first songs.",
        difficulty: "Beginner",
        duration: "60 minutes",
        enrolled: 987,
        icon: "🎸",
        schedule: ["Tuesday 5:00 PM", "Thursday 6:30 PM", "Saturday 2:00 PM"],
        reviews_list: [
            { name: "Oliver R.", rating: 5, date: "5 days ago", text: "Jake is patient and encouraging. I'm actually playing songs now!" },
            { name: "Grace T.", rating: 4, date: "2 weeks ago", text: "Finally learning guitar! Worth the investment." }
        ]
    },
    {
        id: 6,
        title: "Web Development Bootcamp",
        category: "Technology",
        instructor: "Dr. Sam Lee",
        price: 85,
        rating: 4.8,
        reviews: 189,
        description: "Build full-stack web applications from scratch. Learn HTML, CSS, JavaScript, and modern frameworks.",
        difficulty: "Advanced",
        duration: "180 minutes",
        enrolled: 623,
        icon: "💻",
        schedule: ["Monday 7:00 PM", "Wednesday 7:00 PM", "Saturday 10:00 AM"],
        reviews_list: [
            { name: "Kevin M.", rating: 5, date: "6 days ago", text: "Best programming course! Dr. Lee explains complex concepts beautifully." },
            { name: "Anna B.", rating: 4, date: "2 weeks ago", text: "Challenging but rewarding. I'm building my first website!" }
        ]
    },
    {
        id: 7,
        title: "HIIT Fitness Training",
        category: "Fitness",
        instructor: "Coach Mike",
        price: 35,
        rating: 4.7,
        reviews: 267,
        description: "High-intensity interval training designed to maximize results in minimal time.",
        difficulty: "Advanced",
        duration: "45 minutes",
        enrolled: 1456,
        icon: "💪",
        schedule: ["Monday 6:00 AM", "Wednesday 6:00 AM", "Friday 5:30 PM"],
        reviews_list: [
            { name: "James T.", rating: 5, date: "3 days ago", text: "Incredible workout! Feel the burn and results!" },
            { name: "Patricia L.", rating: 5, date: "1 week ago", text: "Coach Mike is motivating and keeps the energy high." }
        ]
    },
    {
        id: 8,
        title: "Pottery & Ceramics Studio",
        category: "Arts & Crafts",
        instructor: "Linda Chen",
        price: 50,
        rating: 4.9,
        reviews: 178,
        description: "Create beautiful pottery pieces using the wheel. All materials and tools provided.",
        difficulty: "Beginner",
        duration: "120 minutes",
        enrolled: 734,
        icon: "🏺",
        schedule: ["Tuesday 2:00 PM", "Thursday 6:00 PM", "Sunday 1:00 PM"],
        reviews_list: [
            { name: "Susan V.", rating: 5, date: "1 week ago", text: "Relaxing and creative! I'm bringing home three pieces I made!" },
            { name: "Richard K.", rating: 5, date: "2 weeks ago", text: "Linda is a wonderful instructor. Great class!" }
        ]
    },
    {
        id: 9,
        title: "Tennis Coaching for All Levels",
        category: "Sports",
        instructor: "Tony Martinez",
        price: 40,
        rating: 4.8,
        reviews: 145,
        description: "Improve your tennis game with personalized coaching. From serves to strategy, we cover it all.",
        difficulty: "Intermediate",
        duration: "90 minutes",
        enrolled: 512,
        icon: "🎾",
        schedule: ["Tuesday 4:00 PM", "Thursday 3:00 PM", "Saturday 9:00 AM"],
        reviews_list: [
            { name: "Marcus A.", rating: 5, date: "4 days ago", text: "Tony's coaching really improved my game. Highly recommend!" },
            { name: "Nicole S.", rating: 5, date: "1 week ago", text: "Fun, professional, and effective. Love this class!" }
        ]
    },
    {
        id: 10,
        title: "Business English Workshop",
        category: "Technology",
        instructor: "Priya Patel",
        price: 55,
        rating: 4.7,
        reviews: 94,
        description: "Master English for professional settings. Presentation skills, business writing, and communication.",
        difficulty: "Intermediate",
        duration: "90 minutes",
        enrolled: 426,
        icon: "📊",
        schedule: ["Monday 5:00 PM", "Wednesday 6:00 PM", "Friday 4:00 PM"],
        reviews_list: [
            { name: "Raj K.", rating: 5, date: "2 days ago", text: "Priya is an excellent teacher. Very practical skills!" },
            { name: "Elena Z.", rating: 4, date: "1 week ago", text: "Great course for career advancement." }
        ]
    },
    {
        id: 11,
        title: "Photography Essentials",
        category: "Arts & Crafts",
        instructor: "Robert Adams",
        price: 48,
        rating: 4.8,
        reviews: 156,
        description: "Learn photography fundamentals including composition, lighting, and post-processing.",
        difficulty: "Beginner",
        duration: "120 minutes",
        enrolled: 678,
        icon: "📸",
        schedule: ["Saturday 10:00 AM", "Sunday 3:00 PM", "Wednesday 5:00 PM"],
        reviews_list: [
            { name: "Victoria R.", rating: 5, date: "5 days ago", text: "Robert has an eye for detail. My photos look professional now!" },
            { name: "Andrew J.", rating: 5, date: "1 week ago", text: "Fantastic class! Worth every penny." }
        ]
    },
    {
        id: 12,
        title: "Soccer Training Camp",
        category: "Sports",
        instructor: "Coach Diego",
        price: 38,
        rating: 4.6,
        reviews: 201,
        description: "Improve your soccer skills with tactical training and skill development.",
        difficulty: "Intermediate",
        duration: "90 minutes",
        enrolled: 892,
        icon: "⚽",
        schedule: ["Tuesday 5:30 PM", "Thursday 6:30 PM", "Saturday 4:00 PM"],
        reviews_list: [
            { name: "Marco L.", rating: 5, date: "1 week ago", text: "Coach Diego's methods really work. I've improved my game!" },
            { name: "Lucas B.", rating: 4, date: "2 weeks ago", text: "Great training session and good teammates." }
        ]
    },
    {
        id: 13,
        title: "Baking & Pastry Class",
        category: "Cooking",
        instructor: "Chef Sophie",
        price: 52,
        rating: 4.9,
        reviews: 289,
        description: "Learn professional baking techniques and create delicious pastries and breads.",
        difficulty: "Intermediate",
        duration: "150 minutes",
        enrolled: 1103,
        icon: "🥐",
        schedule: ["Saturday 9:00 AM", "Sunday 10:00 AM", "Wednesday 6:00 PM"],
        reviews_list: [
            { name: "Amber C.", rating: 5, date: "2 days ago", text: "My croissants finally turned out perfect! Chef Sophie is amazing!" },
            { name: "Henry D.", rating: 5, date: "5 days ago", text: "Best baking class ever. Professional tips and tricks!" }
        ]
    },
    {
        id: 14,
        title: "Piano Lessons for Adults",
        category: "Music",
        instructor: "Natalie Kim",
        price: 40,
        rating: 4.8,
        reviews: 167,
        description: "Learn piano at your own pace. No prior experience needed. Classic and contemporary pieces.",
        difficulty: "Beginner",
        duration: "60 minutes",
        enrolled: 834,
        icon: "🎹",
        schedule: ["Monday 3:00 PM", "Wednesday 4:00 PM", "Friday 2:00 PM"],
        reviews_list: [
            { name: "Catherine M.", rating: 5, date: "1 week ago", text: "Natalie is patient and encouraging. I'm playing Chopin!" },
            { name: "Peter N.", rating: 5, date: "2 weeks ago", text: "Never too old to learn piano. Highly recommend!" }
        ]
    },
    {
        id: 15,
        title: "Machine Learning Fundamentals",
        category: "Technology",
        instructor: "Dr. Alex Kumar",
        price: 95,
        rating: 4.9,
        reviews: 112,
        description: "Dive deep into machine learning concepts and build your first ML models.",
        difficulty: "Advanced",
        duration: "180 minutes",
        enrolled: 398,
        icon: "🤖",
        schedule: ["Monday 7:00 PM", "Thursday 7:00 PM", "Saturday 1:00 PM"],
        reviews_list: [
            { name: "Xavier T.", rating: 5, date: "3 days ago", text: "Dr. Kumar explains ML beautifully. Eye-opening class!" },
            { name: "Zoe P.", rating: 5, date: "1 week ago", text: "Complex topic made simple. Love the practical examples!" }
        ]
    }
];

// Function to get all hobbies
function getAllHobbies() {
    return hobbiesData;
}

// Function to get hobby by ID
function getHobbyById(id) {
    return hobbiesData.find(hobby => hobby.id === id);
}

// Function to get hobbies by category
function getHobbiesByCategory(category) {
    return hobbiesData.filter(hobby => hobby.category === category);
}

// Function to search hobbies
function searchHobbies(query) {
    const lowerQuery = query.toLowerCase();
    return hobbiesData.filter(hobby => 
        hobby.title.toLowerCase().includes(lowerQuery) ||
        hobby.description.toLowerCase().includes(lowerQuery) ||
        hobby.category.toLowerCase().includes(lowerQuery)
    );
}

// Function to get unique categories
function getCategories() {
    return [...new Set(hobbiesData.map(hobby => hobby.category))];
}

// Function to sort hobbies
function sortHobbies(hobbies, sortBy) {
    let sorted = [...hobbies];
    
    switch(sortBy) {
        case 'newest':
            sorted = sorted.reverse();
            break;
        case 'price-low':
            sorted.sort((a, b) => a.price - b.price);
            break;
        case 'price-high':
            sorted.sort((a, b) => b.price - a.price);
            break;
        case 'rating':
            sorted.sort((a, b) => b.rating - a.rating);
            break;
        case 'popular':
        default:
            sorted.sort((a, b) => b.enrolled - a.enrolled);
            break;
    }
    
    return sorted;
}