export const BASE_URL = "http://127.0.0.1:8000"

export const GAMES_URL= `${BASE_URL}/games/`
export const TOKEN_URL = `${BASE_URL}/token/`
export const THREADS_URL = `${BASE_URL}/threads/`
export const CURRENT_USER_URL = `${BASE_URL}/users/current`
export const SIGNUP_URL = `${BASE_URL}/signup/`
export const JOKES_URL = 'https://v2.jokeapi.dev/joke/Any'


export function getToken() {
    const token = window.localStorage.getItem('token')
    if (!token) {
        window.location.href = '/signin'
    }
    return {headers: {Authorization: 'Token ' + token}}
}

