// export const BASE_URL = "http://127.0.0.1:8000"
export const BASE_URL = "https://playsentral-back.herokuapp.com"

export const GAMES_URL= `${BASE_URL}/games/`
export const TOKEN_URL = `${BASE_URL}/token/`
export const POSTS_URL = `${BASE_URL}/posts/`
export const RATINGS_URL = `${BASE_URL}/ratings/`
export const RESPONSES_URL = `${BASE_URL}/responses/`
export const COMMENTS_URL = `${BASE_URL}/comments/`
export const CURRENT_USER_URL = `${BASE_URL}/users/current`
export const SIGNUP_URL = `${BASE_URL}/signup/`
export const JOKES_URL = `${BASE_URL}/jokes/`


export function getToken() {
    const token = window.localStorage.getItem('token')
    if (!token) {
        window.location.href = '/signin'
    }
    return {headers: {Authorization: 'Token ' + token}}
}

