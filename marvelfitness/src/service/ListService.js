import axios from "axios";

export const MF_PORTAL_URL = "http://localhost:5000";
// export const MF_PORTAL_URL =
//   "http://ec2-18-188-108-237.us-east-2.compute.amazonaws.com/api";
const CUSTOMER_SEARCH_URL = `${MF_PORTAL_URL}/customers`;
const VISIT_SEARCH_URL = `${MF_PORTAL_URL}/visits`;
const REWARD_SEARCH_URL = `${MF_PORTAL_URL}/rewards`;

class ListService {
  getAllCustomers() {
    return axios.get(`${CUSTOMER_SEARCH_URL}`);
  }
  getCustomerById(customer_id) {
    let customer_search_by_id_url = `${MF_PORTAL_URL}/customers/${customer_id}`;
    return axios.get(`${customer_search_by_id_url}`);
  }
  getAllVisits() {
    return axios.get(`${VISIT_SEARCH_URL}`);
  }
  getVisitsByCustomer(customer_id) {
    let search_by_customer_url = `${VISIT_SEARCH_URL}/customer/${customer_id}`;
    return axios.get(`${search_by_customer_url}`);
  }
  getAllRewards() {
    return axios.get(`${REWARD_SEARCH_URL}`);
  }
  sendEmail(reward_id, user_id) {
    let reward_email_url = `${MF_PORTAL_URL}/rewards/${reward_id}/email/${user_id}`;
    return axios.post(`${reward_email_url}`);
  }
  updateBalance(new_balance, user_id) {
    let update_balance_url = `${MF_PORTAL_URL}/customers/update_balance/${user_id}?new_balance=${new_balance}`;
    return axios.post(`${update_balance_url}`, new_balance);
  }
}

export default new ListService();
