export function get(url) {
    return fetch(url)
    .then(response => {
        if (response.ok) return response.json();
        return Promise.reject(`Error ${response.status}`)
    });
}