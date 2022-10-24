const BASE_URL = 'https://api.nomoreparties.co/beatfilm-movies';

function handleResponse(res) {
    if(res.ok) {
      return res.json();
    }
    return Promise.reject(res.status);
}

export function getAllMovies() {
    return fetch(BASE_URL, {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        }
      })
        .then(handleResponse)
}