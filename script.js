async function accessApi() {
    event.preventDefault();
    
    let username = document.getElementById("username").value
    let token = document.getElementById("token").value
    
    displayLoader("info-container")
    clearBox("visualization-1")
    clearBox("visualization-2")
    clearBox("visualization-3")

    let userInfo = await getUserInfo(username, token)
    let userRepos = await getUserRepos(username, token)
    let repoLanguages = exploitData(userRepos, 'language')
    let repoSizes = exploitData(userRepos, 'size')
    let repoNames = exploitData(userRepos, 'name')
    let commitsPerRepo = await getUserCommits(username, token, userRepos)

    displayUserInfo(userInfo)
    displayRepoLanguagesGraph(repoLanguages)
    displayRepoSizesGraph(repoNames, repoSizes)
    displayRepoCommitsGraph(repoNames, commitsPerRepo)
}

async function getData(url, token) {
    const headers = {
        'Authorization': `Token ${token}`
    }

    const response = token != '' ? await fetch(url, {
        'method': 'GET',
        'headers': headers
    }) : await fetch(url);

    return await response.json()
}

async function getUserInfo(username, token) {
    let url = `https://api.github.com/users/${username}`
    return await getData(url, token).catch(e => console.error(e))
}

async function getUserRepos(username, token) {
    let url = `https://api.github.com/users/${username}/repos`
    return await getData(url, token).catch(e => console.error(e))
}

async function getUserCommits(username, token, userRepos) {
    var commitsPerRepo = []

    for (i in userRepos) {
        let url = `https://api.github.com/repos/${username}/${userRepos[i].name}/stats/contributors`
        let stats = await getData(url, token).catch(e => console.error(e))
        for (j in stats) {
            if (stats[j].author.login == username) {
                commitsPerRepo[i] = stats[j].total
                break
            }
        }
    }

    return commitsPerRepo
}

function displayLoader(divId) {
    document.getElementById(divId).innerHTML = `<div class="loader"></div>`
}

function displayUserInfo(userInfo) {
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

function exploitData(data, attribute) {
    return data.map(function(sample) {
        return sample[attribute]
    })
}

function getLanguagesMap(repoLanguages) {
    var map = new Map()
    for (language of repoLanguages) {
        map.set(language, map.has(language) ? map.get(language) + 1 : 1)
    }
    return map
}

function displayRepoLanguagesGraph(repoLanguages) {
    let languagesMap = getLanguagesMap(repoLanguages)

    let languageNames = Array.from(languagesMap.keys())
    let languageQuantities = Array.from(languagesMap.values())

    let colours = randomColours(languageNames)

    document.getElementById("visualization-1").innerHTML = `
    <div id="repo-languages-graph-container">
        <canvas id="repo-languages-chart" width="400" height="200"></canvas>
    </div>
    `

    var ctx = document.getElementById('repo-languages-chart').getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: languageNames,
            datasets: [{
                label: 'Repository Language',
                data: languageQuantities,
                backgroundColor: colours,
                borderColor: colours,
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });
}

function randomColours(labels) {
    return labels.map(function() {
        return `rgba(${Math.floor(Math.random()*255)}, ${Math.floor(Math.random()*255)}, ${Math.floor(Math.random()*255)}, 0.7)`
    })
}

function displayRepoSizesGraph(repoNames, repoSizes) {
    let colours = randomColours(repoNames)

    document.getElementById("visualization-2").innerHTML = `
    <div id="repo-sizes-graph-container">
        <canvas id="repo-sizes-chart" width="400" height="200"></canvas>
    </div>
    `

    var ctx = document.getElementById('repo-sizes-chart').getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: repoNames,
            datasets: [{
                label: 'Repository Size',
                data: repoSizes,
                backgroundColor: colours,
                borderColor: colours,
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });
}

function displayRepoCommitsGraph(repoNames, repoCommits) {
    let colours = randomColours(repoNames)

    document.getElementById("visualization-3").innerHTML = `
    <div id="repo-sizes-graph-container">
        <canvas id="repo-commits-chart" width="400" height="200"></canvas>
    </div>
    `

    var ctx = document.getElementById('repo-commits-chart').getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: repoNames,
            datasets: [{
                label: 'Repository Commits',
                data: repoCommits,
                backgroundColor: colours,
                borderColor: colours,
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });
}

function clearBox(elementId) {
    document.getElementById(elementId).innerHTML = ""
}