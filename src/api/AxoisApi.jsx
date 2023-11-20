import axios from "axios";
import { KMH_DOMAIN } from "../utils/Common";

const AxiosApi = {
  // 로그인
  memberLogin: async(email, pw) => {
    const login = {
      email: email,
      pwd: pw
    }
    return await axios.post(KMH_DOMAIN + '/users/login', login);
  },
}

export default AxiosApi;