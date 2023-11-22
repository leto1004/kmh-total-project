import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "../utils/Modal";
import AxiosApi from "../api/AxiosApi";
import { Input, Button, Container, Items } from "../component/LoginComponent";



const Signup = () => {
  const navigate = useNavigate();
  // 키보드 입력 (이메일, 패스워드, 이름)
  const [inputEmail, setInputEmail] = useState('');
  const [inputPw, setInputPw] = useState('');
  const [inputConPw, setInputConPw] = useState('');
  const [inputName, setInputName] = useState('');

  // 오류메시지
  const [mailMsg, setMailMsg] = useState('');
  const [pwMsg, setPwMsg] = useState('');
  const [conPwMsg, setConPwMsg] = useState('');

  // 유효 성검사
  const [isMail, setIsMail] = useState(false);
  const [isPw, setIsPw] = useState(false);
  const [isConPw, setIsConPw] = useState(false);
  const [isName, setIsName] = useState(false);

  // 팝업
  const [modalOpen, setModalOpen] = useState(false);
  const [modalText, setModalText] = useState('중복된 아이디 입니다.');

  const closeModal = () => {
    setModalOpen(false);
  }
  // 회원 가입 여부 확인
  const memberRegCheck = async (email) => {
    const res = await AxiosApi.memberRegCheck(email);
    console.log('가입 여부 확인 : ', res.data);
    if(res.data) {
      setMailMsg('사용 가능한 이메일 입니다.');
      setIsMail(true);
    } else {
      setMailMsg('중복된 이메일 입니다.');
      setIsMail(false)
    }
  }

  const onChangeMail = (e) => {
    setInputEmail(e.target.value);
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailRegex.test(e.target.value)) {
      setMailMsg("이메일 형식이 올바르지 않습니다.");
      setIsMail(false);
    } else {
      setMailMsg("올바른 형식 입니다.");
      setIsMail(true);
      memberRegCheck(e.target.value);
    }
  };

  const onChangePw = (e) => {
    //const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,25}$/;
    setInputPw(e.target.value);
    if (!passwordRegex.test(e.target.value)) {
      setPwMsg("숫자+영문자 조합으로 8자리 이상 입력해주세요!");
      setIsPw(false);
    } else {
      setPwMsg("안전한 비밀번호에요 : )");
      setIsPw(true);
    }
  };

  const onChangeConPw = (e) => {
    setInputConPw(e.target.value);
    if (e.target.value !== inputPw) {
      setConPwMsg("비밀 번호가 일치하지 않습니다.");
      setIsConPw(false);
    } else {
      setConPwMsg("비밀 번호가 일치 합니다. )");
      setIsConPw(true);
    }
  };

  const onChangeName = (e) => {
    setInputName(e.target.value);
    setIsName(true);
  };
  const onClickLogin = async () => {
    const res = await AxiosApi.memberReg(inputEmail, inputPw, inputName);
    console.log(res.data);
    if(res.data) {
      navigate('/');
    } else {
      setModalOpen(true);
      setModalText('회원 가입에 실패 했습니다.');
    }
  }

  return (
    <>
      여기는 회원가입 페이지
    </>
  );
}
export default Signup;