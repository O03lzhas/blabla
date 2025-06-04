


function renderPosts() {
  const posts = JSON.parse(localStorage.getItem("posts")) || [];
  const postsContainer = document.querySelector(".dynamic-posts");
  postsContainer.innerHTML = "";

  posts.forEach((post) => {
    const postElement = document.createElement("div");
    postElement.classList.add("post");
    postElement.innerHTML = `
      <div class="post-card">
        ${post.image ? `<img src="\${post.image}" class="post-image">` : ""}
        <p class="post-text">\${post.text}</p>
        <p class="post-author">Автор: \${post.author}</p>
        <button class="delete-post-btn">Удалить</button>
      </div>
    `;
    postsContainer.appendChild(postElement);
  });
}

document.addEventListener("DOMContentLoaded", renderPosts);
