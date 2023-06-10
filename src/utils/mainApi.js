class Api {
    constructor(options) {
        this._url = options.baseUrl;
        this._headers = options.headers;
        this._credentials = options.credentials;
    }

    _checkResponse(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    }

    getUserInfo() {
        return fetch(`${this._url}/users/me`, {
            method: "GET",
            // credentials: this._credentials,
            headers: this._headers,
        })
            .then(this._checkResponse)
    }

    setUserInfo(name, email) {
        return fetch(`${this._url}/users/me`, {
            method: "PATCH",
            // credentials: this._credentials,
            headers: this._headers,
            body: JSON.stringify({
                name,
                email
            })
        })
            .then(this._checkResponse)
    }

    getMovies() {
        return fetch(`${this._url}/movies`, {
            method: "GET",
            // credentials: this._credentials,
            headers: this._headers,
        })
            .then(this._checkResponse)
    }

    saveMovie(movie) {
        return fetch(`${this._url}/movies`, {
            method: "POST",
            // credentials: this._credentials,
            headers: this._headers,
            body: JSON.stringify({
                country: movie.country,
                director: movie.director,
                duration: movie.duration,
                year: movie.year,
                description: movie.description,
                image: `https://api.nomoreparties.co/${movie.image.url}`,
                trailerLink: movie.trailerLink,
                thumbnail: `https://api.nomoreparties.co/${movie.image.url}`,
                movieId: movie.id,
                nameRU: movie.nameRU,
                nameEN: movie.nameEN,
            })
        })
            .then(this._checkResponse)
    }

    deleteMovie(movieId) {
        return fetch (`${this._url}/movies/${movieId}`, {
            method: "DELETE",
            // credentials: this._credentials,
            headers: this._headers
        })
            .then(this._checkResponse)
    }
}

const api = new Api({
    // for local:
    // baseUrl: "http://localhost:3000",
    // for server:
    baseUrl: "https://api.movies-explorer.nomoredomains.monster",
    // credentials: "include",
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
    }
});

export default api;