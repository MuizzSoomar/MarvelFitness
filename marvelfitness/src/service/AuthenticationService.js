import axios from 'axios'
import { MF_PORTAL_URL } from './ListService'

export const USER_NAME_SESSION_ATTRIBUTE_NAME = 'authenticatedUser'
export const TOKEN_SESSION_NAME = 'userToken'

class AuthenticationService {

  executeJwtAuthenticationService(username, password) {
    return axios.post(`${MF_PORTAL_URL}/authenticate`, {
      username,
      password
    })
  }

  registerSuccessfulLoginJwt(username, token) {
    sessionStorage.setItem(USER_NAME_SESSION_ATTRIBUTE_NAME, username)
    sessionStorage.setItem(TOKEN_SESSION_NAME, token)
    this.setupAxiosInterceptors(this.createJwtToken(token))
    return
  }

  createJwtToken(token) {
    return 'Bearer ' + token
  }

  logoutUser() {
    sessionStorage.removeItem(USER_NAME_SESSION_ATTRIBUTE_NAME)
  }

  isUserLoggedIn() {
    let user = sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME)
    return user ? true : false
  }

  setupAxiosInterceptors(token) {
    axios.interceptors.request.use(
      (config) => {
        if (this.isUserLoggedIn()) {
          config.headers.authorization = token
        }

        console.log(config)
        return config
      }
    )
  }

  getUserDetails(username) {
    return axios.get(`${MF_PORTAL_URL}/user-details/${username}`)
  }


}

export default new AuthenticationService()
