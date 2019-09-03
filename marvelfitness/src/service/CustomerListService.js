import axios from "axios";

const MF_PORTAL_URL = "http://localhost:5000";
const CUSTOMER_SEARCH_URL = `${MF_PORTAL_URL}/customers`;
const VISIT_SEARCH_URL = `${MF_PORTAL_URL}/visits`;

class CustomerListService {
  getAllCustomers() {
    return axios.get(`${CUSTOMER_SEARCH_URL}`);
  }
  getAllVisits() {
    return axios.get(`${VISIT_SEARCH_URL}`);
  }
}

export default new CustomerListService();
