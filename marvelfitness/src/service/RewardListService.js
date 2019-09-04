import axios from "axios";

const MF_PORTAL_URL = "http://localhost:5000";
const REWARD_SEARCH_URL = `${MF_PORTAL_URL}/rewards`;
const VISIT_SEARCH_URL = `${MF_PORTAL_URL}/visits`;


class RewardListService {
    getAllRewards() {
        return axios.get(`${REWARD_SEARCH_URL}`);
    }
    getAllVisits() {
        return axios.get(`${VISIT_SEARCH_URL}`);
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

export default new RewardListService();