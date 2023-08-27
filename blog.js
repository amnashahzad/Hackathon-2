document.addEventListener('DOMContentLoaded', function () {
    const mainContent = document.getElementById('mainContent');
    const loginButton = document.getElementById('loginButton');

    // Initialize Firebase
    // const firebaseConfig = {
    //     apiKey: "YOUR_API_KEY",
    //     authDomain: "YOUR_AUTH_DOMAIN",
    //     databaseURL: "YOUR_DATABASE_URL",
    //     projectId: "YOUR_PROJECT_ID",
    //     storageBucket: "YOUR_STORAGE_BUCKET",
    //     messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    //     appId: "YOUR_APP_ID"
    // };
    // firebase.initializeApp(firebaseConfig);
    const database = firebase.database();

    // Display blogs
    function displayBlogs(blogs) {
        mainContent.innerHTML = '';
        blogs.forEach(blog => {
            const blogElement = document.createElement('div');
            blogElement.className = 'blog';
            blogElement.innerHTML = `
                <h2>${blog.title}</h2>
                <p>Author: ${blog.author}</p>
                <p>Date: ${blog.date}</p>
                <p>${blog.text}</p>
                <button class="author-button" data-author="${blog.author}">See All Blogs from ${blog.author}</button>
            `;
            mainContent.appendChild(blogElement);
        });
    }

    // Fetch blogs from Firebase Realtime Database
    function fetchBlogs() {
        const blogsRef = database.ref('blogs');
        blogsRef.orderByChild('date').on('value', snapshot => {
            const blogsData = snapshot.val();
            const blogsArray = Object.values(blogsData);
            displayBlogs(blogsArray.reverse());
        });
    }

    fetchBlogs();

    // Simulate the login process
    loginButton.addEventListener('click', function () {
        alert('Login functionality would be implemented here.');
    });

    // Handle author button clicks
    mainContent.addEventListener('click', function (event) {
        if (event.target.classList.contains('author-button')) {
            const authorName = event.target.getAttribute('data-author');
            // Implement logic to display all blogs from the author
            alert(`Display all blogs from ${authorName}`);
        }
    });
});
