class MoviesApi {
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

    getMovies() {
        return fetch(this._url, {
            method: "GET",
            credentials: this._credentials,
            headers: this._headers,
        })
            .then(this._checkResponse)
    }
}

const moviesApi = new MoviesApi({
    baseUrl: "https://api.nomoreparties.co/beatfilm-movies",
    // credentials: "include",
    headers: {
        'Content-Type': 'application/json',
    }
});

export default moviesApi;