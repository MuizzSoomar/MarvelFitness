import axios from 'axios'
import { API_URL } from '../Constants'

class HelloService {

  executeHelloService() {
    // console.log('hello service execute')
    return axios.get(`${API_URL}/hello`);
  }

  executeHelloBeanService() {
    return axios.get(`${API_URL}/hello-bean`);
  }

  executeHelloPathService(name) {
    return axios.get(`${API_URL}/hello/path/${name}`)
  }

}

export default new HelloService()
