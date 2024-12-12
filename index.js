function fetchData(endpoint, elementId) {
    fetch(`https://jsonplaceholder.typicode.com/${endpoint}`)
        .then(response => response.json())
        .then(data => {
            console.log(`${endpoint} data:`, data);
            const container = document.getElementById(elementId);
            data.slice(0, 5).forEach(user => {
                const userContainer = document.createElement('div');
                userContainer.className = 'user-container';
                userContainer.innerHTML = `<h2>${user.name}</h2>`;
                
                fetchPostsForUser(user.id, userContainer);
                fetchTodosForUser(user.id, userContainer);
                
                document.getElementById('data').appendChild(userContainer);
            });
        })
        .catch(error => console.error(`Error fetching ${endpoint}:`, error));
}

function fetchPostsForUser(userId, userDiv) {
    fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}&_limit=5`)
        .then(response => response.json())
        .then(posts => {
            const postsDiv = document.createElement('div');
            postsDiv.className = 'posts';
            postsDiv.innerHTML = '<h3>Posts:</h3>';
            posts.forEach(post => {
                const postDiv = document.createElement('div');
                postDiv.className = 'item';
                postDiv.textContent = post.title;
                postsDiv.appendChild(postDiv);
            });
            userDiv.appendChild(postsDiv);
        })
        .catch(error => console.error(`Error fetching posts for user ${userId}:`, error));
}

function fetchTodosForUser(userId, userDiv) {
    fetch(`https://jsonplaceholder.typicode.com/todos?userId=${userId}&_limit=5`)
        .then(response => response.json())
        .then(todos => {
            const todosDiv = document.createElement('div');
            todosDiv.className = 'todos';
            todosDiv.innerHTML = '<h3>Todos:</h3>';
            todos.forEach(todo => {
                const todoDiv = document.createElement('div');
                todoDiv.className = 'item';
                todoDiv.textContent = todo.title;
                todoDiv.style.textDecoration = todo.completed ? 'line-through' : 'none';
                todosDiv.appendChild(todoDiv);
            });
            userDiv.appendChild(todosDiv);
        })
        .catch(error => console.error(`Error fetching todos for user ${userId}:`, error));
}

fetchData('users', 'users');