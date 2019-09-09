import { userConstants } from '../action-types/userActionTypes'

const initialState = {
  id: -1,
  username: '',
  name: '',
  rewards: 0,
  street_one: '',
  street_two: '',
  city: '',
  st: '',
  zip: '',
  phone: '',
  isCustomer: true,
  token: '',
  loggedIn: false
}

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case userConstants.LOGIN_USER: {
      console.log(action)
      console.log(state)
      return Object.assign({}, state, {
        ...state,
        username: action.username,
        token: action.token,
      })
    }
    case userConstants.SAVE_USER: {
      console.log(action)

      const street_one = action.street_one !== null ? action.street_one : ''
      const street_two = action.street_two !== null ? action.street_two : ''
      const city = action.city !== null ? action.city : ''
      const st = action.state !== null ? action.state : ''
      const zip = action.zip !== null ? action.zip : ''
      const phone = action.phone_number !== null ? action.phone_number : ''

      return {
        ...state,
        id: action.id,
        name: action.name,
        rewards: action.rewards,
        street_one: street_one,
        street_two: street_two,
        city: city,
        st: st,
        zip: zip,
        phone: phone,
        isCustomer: action.isCustomer,
        loggedIn: true
      }
    }
    // case userConstants.START_LOGIN: {
    //   return state
    // }
    case userConstants.LOGIN_STARTED: {
      return {
        ...state
      }
    }
    case userConstants.LOGOUT_USER: {
      return initialState
    }
    default:
      return state
  }

}

// case userConstants.UPDATE_USER: {
//   return {
//     ...state,
//     username: action.payload
//   }
//
// }
// case userConstants.SHOW_ERROR:
//   return action.payload.user;

// case userConstants.LOGIN_SUCCESS: {
//   return {
//     ...state,
//     user: action.payload
//   }
// }
