import axios from "axios";

const MF_PORTAL_URL = "http://localhost:5000";
const CUSTOMER_SEARCH_URL = `${MF_PORTAL_URL}/customers`;
const VISIT_SEARCH_URL = `${MF_PORTAL_URL}/visits`;

class CustomerListService {
  getAllCustomers() {
    return axios.get(`${CUSTOMER_SEARCH_URL}`);
  }
  getCustomerById(customer_id){
    let customer_search_by_id_url = `${MF_PORTAL_URL}/customers/${customer_id}`;
    return axios.get(`${customer_search_by_id_url}`);
  }
  getAllVisits() {
    return axios.get(`${VISIT_SEARCH_URL}`);
  }
}

export default new CustomerListService();
