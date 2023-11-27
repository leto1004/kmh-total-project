import axios from "axios";
import { KMH_DOMAIN } from "../utils/Common";

const AxiosApi = {
  // 로그인
  memberLogin: async (email, pw) => {
    const login = {
      email: email,
      pwd: pw
    }
    return await axios.post(KMH_DOMAIN + '/users/login', login);
  },
  // 회원 가입 여부 확인
  memberRegCheck : async (email) => {
    return await axios.get(KMH_DOMAIN + `/users/check?email=${email}` );
  },
  // 회원 가입
  memberReg : async (email, pwd, name) => {
    const member = {
      email: email,
      pwd: pwd,
      name: name
    }
    return await axios.post(KMH_DOMAIN + '/users/new', member);
  },
  // 회원 상세 조회
  memberGetOne : async (email)=>{
    return await axios.get(KMH_DOMAIN + `/users/detail/${email}`);
  },
  //회원 전체 조회
  memberGet: async () => {
    return await axios.get(KMH_DOMAIN + `/users/list`);
  },
  // 회원 정보 수정
  memberUpdate: async (email, name, image) => {
    console.log("회원 정보 수정 : ", email, name, image);
    const member = {
      email: email,
      name: name,
      image: image,
    };
    return await axios.put(KMH_DOMAIN + `/users/modify`, member);
  },
};

export default AxiosApi;