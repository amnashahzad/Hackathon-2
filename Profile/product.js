const storage = firebase.storage();

const profileForm = document.getElementById("profile-form");
const photoInput = document.getElementById("photo-input");
const firstNameInput = document.getElementById("first-name");
const lastNameInput = document.getElementById("last-name");
const passwordInput = document.getElementById("password");

// Function to update profile information
profileForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  // Update profile photo
  const photoFile = photoInput.files[0];
  if (photoFile) {
    const storageRef = storage.ref(`profile_photos/${photoFile.name}`);
    await storageRef.put(photoFile);
    const photoUrl = await storageRef.getDownloadURL();
    // Update user's profile photo URL in the database
    // Example: You might use Firebase Firestore or Realtime Database
  }

  // Update first name, last name, and password
  const firstName = firstNameInput.value;
  const lastName = lastNameInput.value;
  const newPassword = passwordInput.value;

  // Update user information in the database
  // Example: You might use Firebase Firestore or Realtime Database

  // Clear password input for security
  passwordInput.value = "";

  alert("Profile updated successfully!");
});