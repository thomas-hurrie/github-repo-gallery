<<<<<<< HEAD
//div with profile information
const overview = document.querySelector(".overview");
//github username
const username = "thomas-hurrie";
//select repos list
const repoList = document.querySelector(".repo-list");
//repos section
const reposSection = document.querySelector(".repos");
//repo data section
const reposDataSection = document.querySelector(".repo-data");
//back to repo gallery button
const backButton = document.querySelector(".view-repos");
//search bar field
const filterInput = document.querySelector(".filter-repos");

//fetch info from github profile
const getGit = async function () {
    const userInfo = await fetch (`https://api.github.com/users/${username}`);
    const data = await userInfo.json();
    displayUserInfo(data);
};

getGit();

const displayUserInfo = function (data) {
    const div = document.createElement("div");
    div.classList.add("user-info");
    div.innerHTML = `
      <figure>
        <img alt="user avatar" src=${data.avatar_url} />
      </figure>
      <div>
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Bio:</strong> ${data.bio}</p>
        <p><strong>Location:</strong> ${data.location}</p>
        <p><strong>Number of public repos:</strong> ${data.public_repos}</p>
      </div>
    `;
    overview.append(div);
    gitRepos();
  };

  const gitRepos = async function () {
      const fetchRepos = await fetch (`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
      const repoData = await fetchRepos.json();
      //console.log(repos);
      displayRepos(repoData);
  };

  const displayRepos = function (repos) {
      filterInput.classList.remove("hide");
      for (let repo of repos) {
          let repoItem = document.createElement("li");
          repoItem.classList.add("repo");
          repoItem.innerHTML = `<h3>${repo.name}</h3>`;
          repoList.append(repoItem);
      }
  };

  repoList.addEventListener("click", function (e) {
      if (e.target.matches("h3")) {
          const repoName = e.target.innerText;
          gitRepoInfo(repoName);
      };
  });

  const gitRepoInfo = async function (repoName) {
      const fetchRepoInfo = await fetch (`https://api.github.com/repos/${username}/${repoName}`);
      const repoInfo = await fetchRepoInfo.json();
      console.log(repoInfo);

      const fetchLanguages = await fetch (repoInfo.languages_url);
      const languageData = await fetchLanguages.json();

      const languages = [];
      for (const language in languageData) {
          languages.push(language);
      };

      displayRepoInfo(repoInfo, languages);
  };

  const displayRepoInfo = function (repoInfo, languages) {
      reposDataSection.innerHTML = "";
      reposDataSection.classList.remove("hide");
      reposSection.classList.add("hide");
      backButton.classList.remove("hide");
      const div = document.createElement("div");
      div.innerHTML =   `
        <h3>Name: ${repoInfo.name}</h3>
        <p>Description: ${repoInfo.description}</p>
        <p>Default Branch: ${repoInfo.default_branch}</p>
        <p>Languages: ${languages.join(", ")}</p>
        <a class="visit" href="${repoInfo.html_url}" target="_blank" rel="noreferrer noopener">View Repo on GitHub!</a>
        `;
        reposDataSection.append(div);
  };

  backButton.addEventListener("click", function () {
      reposSection.classList.remove("hide");
      reposDataSection.classList.add("hide");
      backButton.classList.add("hide");
  });

filterInput.addEventListener("input", function(e) {
    const searchInput = e.target.value;
    const repos = document.querySelectorAll(".repo");
    const toLowerSearch = searchInput.toLowerCase();
    for (repo of repos) {
        const toLowerRepo = repo.innerText.toLowerCase();
        if (toLowerRepo.includes(toLowerSearch)) {
            repo.classList.remove("hide");
        } else {
            repo.classList.add("hide");
        }
    }
});
=======
const overview = document.querySelector(".overview");
const username = "redrambles";
const repoList = document.querySelector(".repo-list");
const allReposContainer = document.querySelector(".repos");
const repoData = document.querySelector(".repo-data");
const viewReposButton = document.querySelector(".view-repos");
const filterInput = document.querySelector(".filter-repos");

const gitUserInfo = async function () {
  const userInfo = await fetch(`https://api.github.com/users/${username}`);
  const data = await userInfo.json();
  displayUserInfo(data);
};

gitUserInfo();

const displayUserInfo = function (data) {
  const div = document.createElement("div");
  div.classList.add("user-info");
  div.innerHTML = `
    <figure>
      <img alt="user avatar" src=${data.avatar_url} />
    </figure>
    <div>
      <p><strong>Name:</strong> ${data.name}</p>
      <p><strong>Bio:</strong> ${data.bio}</p>
      <p><strong>Location:</strong> ${data.location}</p>
      <p><strong>Number of public repos:</strong> ${data.public_repos}</p>
    </div>
  `;
  overview.append(div);
  gitRepos(username);
};

const gitRepos = async function (username) {
  const fetchRepos = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
  const repoData = await fetchRepos.json();
  displayRepos(repoData);
};

const displayRepos = function (repos) {
  filterInput.classList.remove("hide");
  for (const repo of repos) {
    const repoItem = document.createElement("li");
    repoItem.classList.add("repo");
    repoItem.innerHTML = `<h3>${repo.name}</h3>`;
    repoList.append(repoItem);
  }
};

repoList.addEventListener("click", function (e) {
  if (e.target.matches("h3")) {
    const repoName = e.target.innerText;
    getRepoInfo(repoName);
  }
});

const getRepoInfo = async function (repoName) {
  const fetchInfo = await fetch(`https://api.github.com/repos/${username}/${repoName}`);
  const repoInfo = await fetchInfo.json();

  // Grab languages
  const fetchLanguages = await fetch(repoInfo.languages_url);
  const languageData = await fetchLanguages.json();

  // Make a list of languages
  const languages = [];
  for (const language in languageData) {
    languages.push(language);
  }

  displayRepoInfo(repoInfo, languages);
};

const displayRepoInfo = function (repoInfo, languages) {
  viewReposButton.classList.remove("hide");
  repoData.innerHTML = "";
  repoData.classList.remove("hide");
  allReposContainer.classList.add("hide");
  const div = document.createElement("div");
  div.innerHTML = `
    <h3>Name: ${repoInfo.name}</h3>
    <p>Description: ${repoInfo.description}</p>
    <p>Default Branch: ${repoInfo.default_branch}</p>
    <p>Languages: ${languages.join(", ")}</p>
    <a class="visit" href="${repoInfo.html_url}" target="_blank" rel="noreferrer noopener">View Repo on GitHub!</a>
  `;
  repoData.append(div);
};

viewReposButton.addEventListener("click", function () {
  allReposContainer.classList.remove("hide");
  repoData.classList.add("hide");
  viewReposButton.classList.add("hide");
});

// // Dynamic search
filterInput.addEventListener("input", function (e) {
  const searchText = e.target.value;
  const repos = document.querySelectorAll(".repo");
  const searchLowerText = searchText.toLowerCase();

  for (const repo of repos) {
    const repoLowerText = repo.innerText.toLowerCase();
    if (repoLowerText.includes(searchLowerText)) {
      repo.classList.remove("hide");
    } else {
      repo.classList.add("hide");
    }
  }
});
>>>>>>> 639c3acf970da2c73823ce92ab92bf45221d296e
