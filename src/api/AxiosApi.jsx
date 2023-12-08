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
  // 카테고리 조회
  cateList: async () => {
    return await axios.get(KMH_DOMAIN + `/api/category/list`);
  },
  // 카테고리 만들기
  cateInsert: async (email, category) => {
    const cate = {
      email: email,
      categoryName: category,
    };
    return await axios.post(KMH_DOMAIN + `/api/category/new`, cate);
  },
  // 카테고리 삭제
  cateDelete: async (categoryId) => {
    return await axios.delete(KMH_DOMAIN + `/api/category/delete/${categoryId}`);
  },
  // 게시글 조회
  boardList: async () => {
    return await axios.get(KMH_DOMAIN + `/api/board/list`);
  },
  // 게시글 쓰기
  boardWrite: async (email, title, categoryId, content, img) => {
    const board = {
      email: email,
      title: title,
      categoryId: categoryId,
      content: content,
      img: img
    };
    return await axios.post(KMH_DOMAIN + `/api/board/new`, board);
  },
  // 게시글 상세 조회
  boardDetail: async (boardId) => {
    return await axios.get(KMH_DOMAIN + `/api/board/detail/${boardId}`);
  },
  // 게시글 삭제
  boardDelete: async (boardId) => {
    return await axios.delete(KMH_DOMAIN + `/api/board/delete/${boardId}`);
  },
  // 게시글에 달린 댓글 조회
  commentList: async (boardId) => {
    return await axios.get(KMH_DOMAIN + `/api/comment/list/${boardId}`);
  },
  // 댓글 쓰기
  commentWrite: async (email, boardId, content) => {
    const comment = {
      boardId: boardId,
      email: email,
      content: content,
    };
    return await axios.post(KMH_DOMAIN + `/api/comment/new`, comment);
  },
};

export default AxiosApi;