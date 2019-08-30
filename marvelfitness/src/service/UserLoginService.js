import axios from 'axios'

const USER = 'marvelfitness'
const PASSWORD = 'marvelfitness'
const MF_PORTAL_URL = 'http://localhost:5000'
const CUSTOMER_SEARCH_URL = `${MF_PORTAL_URL}/customers/search`

class UserLoginService {

  getAllCustomers() {
    return axios.get(`${CUSTOMER_SEARCH_URL}`);
  }
}

export default new UserLoginService()
