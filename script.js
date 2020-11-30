var data;

async function accessApi() {
    event.preventDefault();
    const username = document.getElementById("username").value;
    const token = document.getElementById("token").value
    //alert(token);
    data = await getData(username, token).catch(e => console.error(e));
    //console.log(result);
    console.log(data)
}

async function getData(username, token) {
    let url = `https://api.github.com/users/${username}/repos`;

    const headers = {
        'Authorization': `Token ${token}`
    }

    const response = await fetch(url, {
        'method': 'GET',
        'headers': headers
    });

    let data = await response.json();
    
    return data;
}