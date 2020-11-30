let username;
let token;

let userInfo;
let userRepos;

async function accessApi() {
    event.preventDefault();
    
    username = document.getElementById("username").value
    token = document.getElementById("token").value
    
    userInfo = await getUserInfo()
    userRepos = await getUserRepos()
    
    console.log(userRepos)
}

async function getData(url, token) {
    const headers = {
        'Authorization': `Token ${token}`
    }

    const response = await fetch(url, {
        'method': 'GET',
        'headers': headers
    });

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