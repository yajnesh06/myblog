// Store blog posts in localStorage
let blogPosts = JSON.parse(localStorage.getItem('blogPosts')) || [];

// DOM Elements
const blogPostsContainer = document.getElementById('blogPosts');
const postForm = document.getElementById('postForm');
const newPostForm = document.getElementById('newPostForm');
const newPostBtn = document.getElementById('newPostBtn');

// Event Listeners
newPostBtn.addEventListener('click', togglePostForm);
newPostForm.addEventListener('submit', handleNewPost);

// Initialize the blog
displayPosts();

// Toggle post form visibility
function togglePostForm() {
    postForm.classList.toggle('hidden');
    if (!postForm.classList.contains('hidden')) {
        document.getElementById('postTitle').focus();
    }
}

// Handle new post submission
function handleNewPost(e) {
    e.preventDefault();

    const title = document.getElementById('postTitle').value;
    const content = document.getElementById('postContent').value;
    
    const newPost = {
        id: Date.now(),
        title,
        content,
        date: new Date().toLocaleDateString(),
        timestamp: Date.now()
    };

    blogPosts.unshift(newPost);
    localStorage.setItem('blogPosts', JSON.stringify(blogPosts));
    
    // Reset form and hide it
    newPostForm.reset();
    togglePostForm();
    
    // Refresh posts display
    displayPosts();
}

// Display all posts
function displayPosts() {
    blogPostsContainer.innerHTML = '';
    
    if (blogPosts.length === 0) {
        blogPostsContainer.innerHTML = '<p class="blog-post">No posts yet. Create your first post!</p>';
        return;
    }

    blogPosts.forEach(post => {
        const postElement = document.createElement('article');
        postElement.className = 'blog-post';
        postElement.innerHTML = `
            <h2>${post.title}</h2>
            <div class="date">${post.date}</div>
            <div class="content">${post.content.replace(/\n/g, '<br>')}</div>
            <button onclick="deletePost(${post.id})">Delete</button>
        `;
        blogPostsContainer.appendChild(postElement);
    });
}

// Delete a post
function deletePost(id) {
    if (confirm('Are you sure you want to delete this post?')) {
        blogPosts = blogPosts.filter(post => post.id !== id);
        localStorage.setItem('blogPosts', JSON.stringify(blogPosts));
        displayPosts();
    }
}