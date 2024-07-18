const BASE_API_URL = "https://jsonplaceholder.typicode.com/";
const BASE_PLACEHOLD_URL = "http://placehold.it/50/55C1E7/fff&text=";

const app = document.getElementById("app");
// const app = document.getElementById("app");
// const postsContainer = document.createElement("ul");

async function fetchPostsAndComments() {
  try {
    const postRes = await fetch(`${BASE_API_URL}posts`);
    const commentRes = await fetch(`${BASE_API_URL}comments`);

    const posts = await postRes.json();
    const comments = await commentRes.json();

    const data = posts.map((post) => ({
      ...post,
      comments: comments.filter((comment) => post.id === comment.postId),
    }));

    return data;
  } catch (error) {
    console.error("fetchPostsAndComments():", error);
    return error;
  }
}

function toggleEllipsis(postId) {
  const element = document.getElementById(`${postId}`);
  element.classList.toggle("text-truncate");
}

async function displayPosts() {
  const postsContainer = document.createElement("ul");
  // data => { posts: [], comments: [] }
  const data = await fetchPostsAndComments();

  data.forEach((post) => (postsContainer.innerHTML += renderPost(post)));
  app.appendChild(postsContainer);
}

function renderPost(post) {
  const commentContainer = document.createElement("ul");

  post.comments.forEach(
    (comment) =>
      (commentContainer.innerHTML += `
    <li class="comment-container">
    <div class="d-flex align-center my-1" class="accordion">
    <img class="rounded" src="${
      BASE_PLACEHOLD_URL + comment.email.split("@")[0]
    }" alt="${comment.email}" />
    <p class="comment-email">${comment.email}</p>
    </div>
    
    <p class="comment-body">${comment.body}</p>
    </li>
  `)
  );

  return `
  <li class="post-container">
  <div class="d-flex align-center my-1">
    <img class="rounded" src="${
      BASE_PLACEHOLD_URL + post.title.split(" ")[0]
    }" alt="profile" />

    <p class="post-title ml-10" onclick="showSinglePost(${post.id})" data-id="${
    post.id
  }">
      ${post.title}
    </p>
    
    </div>

    <span id="${
      post.id
    }" class="text-truncate post-body" style="max-width: 650px;" onclick="toggleEllipsis('${
    post.id
  }')">
      ${post.body}
    </span>

    <hr class="seperator">
    <h2 class="comment-header">Comments <sup>(${
      post.comments.length
    })</sup></h2>

    <ul>
    ${commentContainer.innerHTML}
    </ul>
    </li>
    `;
  // <ul>
  //   $
  //   {post.comments.map(
  //     (comment) => `
  //       <p>${comment.name}</p>
  //       <p>${comment.body}</p>
  //       <p>${comment.email}</p>
  //     `
  //   )}
  // </ul>;
}

function showSinglePost(id) {}

displayPosts();