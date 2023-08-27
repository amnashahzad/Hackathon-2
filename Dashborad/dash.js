const app = firebase.initializeApp(firebaseConfig);

const loggedInUser = {
  fullName: "John Doe",
  id: "user123", // Replace with actual user ID
};

const database = firebase.database();
const blogsRef = database.ref("blogs");

const userFullNameElement = document.getElementById("userFullName");
const blogForm = document.getElementById("blogForm");
const blogPostsElement = document.getElementById("blogPosts");

// Listen for data changes using the "value" event
blogsRef.on("value", (snapshot) => {
  const blogsData = snapshot.val();

  // Convert the object into an array of values
  const blogPosts = Object.values(blogsData);

  // Clear previous content
  blogPostsElement.innerHTML = "";

  // Render blog posts
  blogPosts.forEach((post) => {
    const blogDiv = document.createElement("div");
    blogDiv.classList.add("blog");
    blogDiv.innerHTML = `
      <div class="div-post">
        <h3>${post.title}</h3>
        <p>${post.body}</p>
        <p><em>Published on: ${post.date}</em></p>
        <button class="updateBtn">Update</button>
        <button class="deleteBtn">Delete</button>
      </div>`;
    blogPostsElement.appendChild(blogDiv);

    const deleteBtn = blogDiv.querySelector(".deleteBtn");
    deleteBtn.addEventListener("click", () => {
      const confirmDelete = confirm(
        "Are you sure you want to delete this blog?"
      );
      if (confirmDelete) {
        // Delete logic here
        alert("Blog deleted");
      }
    });

    const updateBtn = blogDiv.querySelector(".updateBtn");
    updateBtn.addEventListener("click", () => {
      // Update logic here
      alert("Update button clicked");
    });
  });
});

// Submit blog form
blogForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const blogTitle = document.getElementById("blogTitle").value;
  const blogBody = document.getElementById("blogBody").value;
  const currentDate = new Date().toISOString().split("T")[0];

  const newBlogPost = {
    title: blogTitle,
    body: blogBody,
    date: currentDate,
  };

  try {
    const docRef = await blogsRef.push(newBlogPost);
    newBlogPost.id = docRef.key;

    // Clear form fields
    blogForm.reset();
  } catch (error) {
    console.error("Error adding document: ", error);
  }
});
// let stored = sessionStorage.getItem('userName');/
let storedUsername = localStorage.getItem('user')
console.log('storedUsername', storedUsername);
let userElement = document.getElementById('userName');
userElement.innerHTML = JSON.parse(storedUsername).username;
// console.log(storedUsername);
