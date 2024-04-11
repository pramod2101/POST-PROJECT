// Function to fetch and display posts and comments
function fetchAndDisplayDetails() {
    axios.get('http://localhost:3000/') // Assuming this endpoint retrieves posts and comments from the server
        .then(result => {
            const detailsList = document.getElementById('details');
            detailsList.innerHTML = ''; // Clear existing list items
            
            result.data.forEach(post => {
                const newLi = document.createElement('li');
                newLi.textContent = `${post.postUrl} - ${post.postDescription}`;
                
                // Add comment form for each post
                const commentForm = document.createElement('form');
                const commentInput = document.createElement('input');
                commentInput.type = 'text';
                commentInput.name = 'comment';
                const commentButton = document.createElement('button');
                commentButton.type = 'submit';
                commentButton.textContent = 'Comment';
                
                commentForm.appendChild(commentInput);
                commentForm.appendChild(commentButton);
                newLi.appendChild(commentForm);
                
                detailsList.appendChild(newLi);
                
                // Event listener for submitting comments
                commentForm.addEventListener('submit', function (e) {
                    e.preventDefault();
                    const commentDetails = {
                        postId: post.id, // Assuming postId is available in the post object
                        comment: commentInput.value
                    };
                    axios.post('http://localhost:3000/comments', commentDetails)
                        .then(res => {
                            console.log('Comment added:', res.data);
                            fetchAndDisplayDetails(); // Fetch and display updated data after comment
                        })
                        .catch(err => console.error('Error adding comment:', err));
                });
            });
        })
        .catch(err => console.error('Error fetching details:', err));
}

// Event listener for page load
window.addEventListener('load', function () {
    fetchAndDisplayDetails(); // Fetch and display data when the page loads
});

// Event listener for form submission (posting new content)
document.getElementById('form').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent default form submission
    
    const postDetails = {
        postUrl: event.target.link.value,
        postDescription: event.target.description.value
    };

    axios.post('http://localhost:3000/', postDetails)
        .then(result => {
            console.log('Post added:', result.data);
            fetchAndDisplayDetails(); // Fetch and display updated data after posting
            document.getElementById('form').reset(); // Reset the form
        })
        .catch(err => console.error('Error adding post:', err));
});
