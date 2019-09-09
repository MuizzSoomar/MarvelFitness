import { userConstants } from '../action-types/userActionTypes'
import AuthenticationService from '../../service/AuthenticationService'

const saveUser = (data) => {
  console.log("saving user data")
  return {
    type: userConstants.SAVE_USER,
    id: data.user_id,
    name: data.name,
    rewards: data.rewards_balance,
    street_one: data.street_one,
    street_two: data.street_two,
    city: data.city,
    state: data.state,
    zip: data.zip,
    phone_number: data.phone_number,
    isCustomer: data.customer
    }
}

const updateRewards = (rewards) => {
  return {
    type: userConstants.UPDATE_REWARDS,
    rewards
  }
}


const loginStarted = () => {
  console.log("login started")
  return {
    type: userConstants.LOGIN_STARTED
  }
}

const loginUser = ({username, token}) => {
  console.log({username})
  return {
    type: userConstants.LOGIN_USER,
    username: username,
    token: token
  }
}

function loginSuccess(data) {
  return { type: userConstants.LOGIN_SUCCESS, data }
}

const startLogin = (newUser) => {
  console.log("start")
  return dispatch => {
    dispatch(loginStarted())

    AuthenticationService.executeJwtAuthenticationService(newUser.username, newUser.password)
    .then(
      response => {
        const username = newUser.username
        const token = response.data.token

        AuthenticationService.registerSuccessfulLoginJwt(username, token)
        dispatch(loginUser({username, token}))
        AuthenticationService.getUserDetails(username)
          .then(
            response => {
              const data = response.data
              dispatch(saveUser({...data}))
            }
          )
      }
    )
  }
}

const logoutUser = () => {
  AuthenticationService.logoutUser()

  return {
    type: userConstants.LOGOUT_USER
  }
}

export const userActions = {
  loginUser,
  loginSuccess,
  loginStarted,
  saveUser,
  startLogin,
  logoutUser,
  updateRewards
}
