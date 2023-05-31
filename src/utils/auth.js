class Auth {
    constructor(baseUrl) {
        this._url = baseUrl;
    }

    _checkResponse(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    }

    register(name, email, password) {
        return fetch(`${this._url}/signup`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name, email, password }),
        })
            .then(this._checkResponse)
    };

    authorize(email, password) {
        return fetch(`${this._url}/signin`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
        })
            .then(this._checkResponse)
            .then((data) => {
                localStorage.setItem("userId", data._id);
                return data;
            })
    };

    logout() {
        return fetch(`${this._url}/logout`, {
            method: "POST",
            credentials: "include",
        })
            .then((res) => {
                if (res.ok) {
                    return;
                }
                return Promise.reject(`Ошибка: ${res.status}`);
            })
    }
}

// local:
const auth = new Auth ("http://localhost:3000");
// server: TODO: CHANGE TO NORMAL SERVER
// const auth = new Auth ("https://api.mesto-service.nomoredomains.work");

export default auth;