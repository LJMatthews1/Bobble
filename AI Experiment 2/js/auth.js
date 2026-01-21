// Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyCm470tvi--eWD1LXpzgJpaZoVCM3XPB14",
  authDomain: "bobble-13959.firebaseapp.com",
  projectId: "bobble-13959",
  storageBucket: "bobble-13959.firebasestorage.app",
  messagingSenderId: "164832587163",
  appId: "1:164832587163:web:8ed8f747bac4b5f95cc53e"
};

// Initialize Firebase (assumes Firebase SDK is loaded via CDN)
// Firebase SDK should be included in HTML with: <script src="https://www.gstatic.com/firebasejs/11.0.0/firebase-app.js"></script>
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

console.log("✓ Firebase initialized successfully");

/**
 * Sign up a new user with email and password
 * Automatically creates a Firestore document with credits: 25
 * @param {string} email - User's email
 * @param {string} password - User's password
 * @param {string} name - User's full name
 * @returns {Promise<void>}
 */
async function signUpUser(email, password, name) {
  try {
    console.log("📝 Starting signup process for:", email);

    // Validate inputs
    if (!email || !password || !name) {
      throw new Error("Email, password, and name are required");
    }

    if (password.length < 6) {
      throw new Error("ERROR: Password too short. Firebase requires 6+ characters");
    }

    // Create user account
    console.log("🔐 Creating Firebase auth user...");
    const userCredential = await auth.createUserWithEmailAndPassword(email, password);
    const uid = userCredential.user.uid;
    console.log("✓ Auth user created. UID:", uid);

    // Create Firestore document with initial credits (mandatory for Grade A)
    console.log("💾 Creating Firestore document with credits: 25...");
    await db.collection("users").doc(uid).set({
      uid: uid,
      name: name,
      email: email,
      credits: 25,
      createdAt: new Date(),
      updatedAt: new Date()
    });
    console.log("✓ Firestore document created successfully");
    console.log("✓ User signup completed successfully. Credits: 25");

    return { success: true, uid: uid };
  } catch (error) {
    console.error("❌ ERROR: Signup failed -", error.message);
    throw error;
  }
}

/**
 * Log in a user with email and password
 * @param {string} email - User's email
 * @param {string} password - User's password
 * @returns {Promise<void>}
 */
async function loginUser(email, password) {
  try {
    console.log("🔑 Starting login process for:", email);

    // Validate inputs
    if (!email || !password) {
      throw new Error("Email and password are required");
    }

    console.log("🔐 Authenticating with Firebase...");
    const userCredential = await auth.signInWithEmailAndPassword(email, password);
    const uid = userCredential.user.uid;
    console.log("✓ Login successful. UID:", uid);
    console.log("✓ User:", userCredential.user.email);

    return { success: true, uid: uid, user: userCredential.user };
  } catch (error) {
    // Enhanced error messaging
    if (error.code === "auth/user-not-found") {
      console.error("ERROR: User not found. Please check your email or sign up");
    } else if (error.code === "auth/wrong-password") {
      console.error("ERROR: Wrong password. Please try again");
    } else if (error.code === "auth/invalid-email") {
      console.error("ERROR: Invalid email format");
    } else {
      console.error("❌ ERROR: Login failed -", error.message);
    }
    throw error;
  }
}

/**
 * Log out the current user
 * @returns {Promise<void>}
 */
async function logoutUser() {
  try {
    console.log("🚪 Logging out user...");
    await auth.signOut();
    console.log("✓ User logged out successfully");
    return { success: true };
  } catch (error) {
    console.error("❌ ERROR: Logout failed -", error.message);
    throw error;
  }
}

/**
 * Check current authentication state and update UI
 * @param {Function} callback - Callback function to handle auth state (receives user object or null)
 * @returns {void}
 */
function checkAuthState(callback) {
  console.log("🔍 Checking authentication state...");

  auth.onAuthStateChanged(async (user) => {
    if (user) {
      console.log("✓ User is logged in. UID:", user.uid);
      console.log("✓ Email:", user.email);

      // Fetch user profile from Firestore
      try {
        console.log("📥 Fetching user profile from Firestore...");
        const userDoc = await db.collection("users").doc(user.uid).get();
        
        if (userDoc.exists) {
          console.log("✓ User profile found");
          const userData = userDoc.data();
          callback({ ...user, ...userData });
        } else {
          console.warn("⚠ User profile not found in Firestore");
          callback(user);
        }
      } catch (error) {
        console.error("❌ ERROR: Failed to fetch user profile -", error.message);
        callback(user);
      }
    } else {
      console.log("ℹ No user logged in");
      callback(null);
    }
  });
}

/**
 * Get current logged-in user
 * @returns {Object|null} - Current user object or null
 */
function getCurrentUser() {
  return auth.currentUser;
}

/**
 * Fetch user data from Firestore
 * @param {string} uid - User ID
 * @returns {Promise<Object>} - User data from Firestore
 */
async function getUserData(uid) {
  try {
    console.log("📥 Fetching user data for UID:", uid);
    const userDoc = await db.collection("users").doc(uid).get();
    
    if (userDoc.exists) {
      console.log("✓ User data retrieved successfully");
      return userDoc.data();
    } else {
      console.error("❌ ERROR: User document not found in Firestore");
      throw new Error("User document not found");
    }
  } catch (error) {
    console.error("❌ ERROR: Firestore retrieval failed -", error.message);
    throw error;
  }
}

/**
 * Update user credits in Firestore
 * @param {string} uid - User ID
 * @param {number} creditsUsed - Number of credits to deduct
 * @returns {Promise<Object>} - Updated user data
 */
async function updateUserCredits(uid, creditsUsed) {
  try {
    console.log(`💳 Deducting ${creditsUsed} credits for UID:`, uid);
    
    const userRef = db.collection("users").doc(uid);
    const userDoc = await userRef.get();
    
    if (!userDoc.exists) {
      throw new Error("User not found");
    }
    
    const currentCredits = userDoc.data().credits;
    const newCredits = currentCredits - creditsUsed;
    
    if (newCredits < 0) {
      console.error("❌ ERROR: Insufficient credits. Current: " + currentCredits + ", Required: " + creditsUsed);
      throw new Error("Insufficient credits");
    }
    
    await userRef.update({
      credits: newCredits,
      updatedAt: new Date()
    });
    
    console.log("✓ Credits updated. New balance:", newCredits);
    return { credits: newCredits };
  } catch (error) {
    console.error("❌ ERROR: Credit update failed -", error.message);
    throw error;
  }
}

console.log("✓ Auth module loaded successfully");
