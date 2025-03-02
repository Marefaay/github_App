/*Setup Variables */
let usernameInput = document.querySelector("#username-input");
let searchUser = document.querySelector(".search-user");
let avatar = document.querySelector("#avatar");
let bio = document.querySelector("#bio");
let repos = document.querySelector(".repos");
let reposContent = document.querySelector(".repos-content");
let reposHeader = document.querySelector(".repos-header");
let lanagaues = document.querySelector(".languages");
/*Events */
searchUser.addEventListener("click", getUser);

function getUser() {
  let username = usernameInput.value.trim();
   reposContent.innerHTML=""
  if (username) {
    getUserData(username);
    getUserRepos(username);
  } else {
    console.log("No User");
  }
}
function getUserData(user) {
  let apiUrl = `https://api.github.com/users/${user}`;
  console.log(apiUrl);
  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => updateData(data));
}
function updateData(data) {
  console.log(data.avatar_url);
  avatar.src = data.avatar_url;
  bio.innerHTML = data.bio;
  reposHeader.innerHTML = `
  
              <h2>username:${data.name}</h2>
              <h2>repos number:${data.public_repos}</h2>
              <h2>followers:${data.followers}</h2>
        `;
}
function getUserRepos(user) {
  let reposApiUrl = `https://api.github.com/users/${user}/repos`;
  fetch(reposApiUrl)
    .then((response) => response.json())
    .then((data) => displayRepos(data));
}
function displayRepos(data) {
  console.log(data);
  try {
    // let repoHtml = "";
    if (data.length == 0) {
      reposContent.innerHTML = `<p>No repositories found.</p>`;
    }
    data.forEach((repo) => {
      reposContent.innerHTML += `
        <a href="#">
                        <span>${repo.full_name}</span>
                        <span>${
                          repo.open_issues
                            ? repo.open_issues + "issue"
                            : "no issues"
                        }</span>
                    </a>
       `;
      console.log(repo.full_name);
    });
  } catch (e) {
    console.log(e);
  }

  // console.log(repoDiv);
}

lanagaues.addEventListener("click", handlelangClick);

function handlelangClick(e) {
  console.log(e.target);
  let lang = e.target.getAttribute("data-lang");
  console.log(lang);
  reposContent.innerHTML=""
  let langApiUrl = `https://api.github.com/search/repositories?q=${lang}`;
  fetch(langApiUrl)
    .then((reposne) => reposne.json())
    .then((data) => displayReposLang(data.items));
}
function displayReposLang(data) {
  console.log(data);
  try {
    // let repoHtml = "";
    if (data.length == 0) {
      reposContent.innerHTML = `<p>No repositories found.</p>`;
    }
    data.forEach((repo) => {
      reposContent.innerHTML += `
          <a href="#">
                          <span>${repo.full_name}</span>
                          <span>${
                            repo.open_issues
                              ? repo.open_issues + "issue"
                              : "no issues"
                          }</span>
                      </a>
         `;
      console.log(repo.full_name);
    });
  } catch (e) {
    console.log(e);
  }

  // console.log(repoDiv);
}
