export function get(url) {
    return fetch(url)
    .then(response => {
        if (response.ok) return response.json();
        return Promise.reject(`Error ${response.status}`)
    });
}

export function post(url, body) {
    return fetch(url, {
        method: 'post',
        body: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json'
        },
    })
    .then(response => {
        if (response.ok) return response.json();
        return Promise.reject(`Error ${response.status}`)
    });
}