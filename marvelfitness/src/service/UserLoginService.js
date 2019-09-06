import axios from "axios";

const MF_PORTAL_URL = "http://localhost:5000";
const USER_LOGIN_URL = `${MF_PORTAL_URL}/login`;

class UserLoginService {
  getAllCustomers() {
    return axios.get(`${USER_LOGIN_URL}`);
  }
}

export default new UserLoginService();
