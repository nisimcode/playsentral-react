export const BASE_DJANGO_URL = "http://127.0.0.1:8000"
export const BASE_FLASK_URL = "http://127.0.0.1:5000"

// export const BASE_FLASK_URL = "https://playsentral-f.herokuapp.com"
// export const BASE_DJANGO_URL = "https://playsentral-d.herokuapp.com"

export const GAMES_URL= `${BASE_DJANGO_URL}/games/`
export const TOKEN_URL = `${BASE_DJANGO_URL}/token/`
export const POSTS_URL = `${BASE_DJANGO_URL}/posts/`
export const RATINGS_URL = `${BASE_DJANGO_URL}/ratings/`
export const RESPONSES_URL = `${BASE_DJANGO_URL}/responses/`
export const CURRENT_USER_URL = `${BASE_DJANGO_URL}/users/current`
export const SIGNUP_URL = `${BASE_DJANGO_URL}/signup/`
export const NOTES_URL = `${BASE_DJANGO_URL}/notes/`
export const JOKES_URL = `${BASE_FLASK_URL}/jokes`
export const NUMTASTIC_URL = `${BASE_FLASK_URL}/numtastic`

export function getToken() {
    const token = window.localStorage.getItem('token')
    if (!token) {
        window.location.href = '/signin'
    }
    return {headers: {Authorization: 'Token ' + token}}
}

