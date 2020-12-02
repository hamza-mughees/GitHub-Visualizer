let app_id

let username;
let token;

let userInfo;
let userRepos;

async function accessApi() {
    event.preventDefault();
    
    username = document.getElementById("username").value
    token = document.getElementById("token").value
    
    displayLoader()

    userInfo = await getUserInfo()
    userRepos = await getUserRepos()
    
    displayUserInfo()
}

async function getData(url, token) {
    const headers = {
        'Authorization': `Token ${token}`
    }

    const response = token != undefined ? await fetch(url, {
        'method': 'GET',
        'headers': headers
    }) : await fetch(url);

    return await response.json()
}

async function getUserInfo() {
    let url = `https://api.github.com/users/${username}`
    return await getData(url, token).catch(e => console.error(e))
}

async function getUserRepos() {
    let url = `https://api.github.com/users/${username}/repos`
    return await getData(url, token).catch(e => console.error(e))
}

function displayLoader() {
    let loader = `<div class="loader"></div>`
    document.getElementById("info-container").innerHTML = loader
}

function displayUserInfo() {
    document.getElementById("info-container").innerHTML = `
        <div class="card" onclick="window.open('${userInfo.html_url}', '_blank')">
            <img id="avatar" src="${userInfo.avatar_url} alt="Avatar"/>
            <div class="card-text">
                <h1 id="info-title">${userInfo.name}</h1>
                <p>${userInfo.login}</p>
                <p><br>${userInfo.bio}</p>
                <p>${userInfo.location}</p>
                <p><br>Followers: ${userInfo.followers}</p>
                <p>Following: ${userInfo.following}</p>
                <p>Public Repositories: ${userInfo.public_repos}</p>
            </div>
        </div>
    `
}