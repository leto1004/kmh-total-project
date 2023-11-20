import { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import AxiosApi from "../api/AxoisApi";

const Login = () => {
  const navigate = useNavigate();

  const [inputEmail, setInputEmail] = useState('');
  const [inputPw, setInputPw] = useState('');
  
  const [emailMsg, setEmailMsg] = useState('');
  const [pwMsg, setPwMsg] = useState('');

   // 로그인 버튼에 대한 활성 조건
  const [isEmail, setIsEmail] = useState('');
  const [isPw, setIsPw] = useState('');

  const [modalContent, setModelContent] = useState('');
  const [modalOpen, setModelOpen] = useState(false);
  const closeModal = () => {
    setModelOpen(false);
  };

  const onChangeEmail = (e) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    setInputEmail(e.target.value);
    if(!emailRegex.test(e.target.value)){
      setEmailMsg('E-mail 방식이 올바르지 않습니다.');
      setIsEmail(false);
    } else {
      setEmailMsg('올바른 형식 입니다.');
      setIsEmail(true);
    }
  }
  const onChangePw = (e) => {
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,25}$/;
    setInputPw(e.target.value);
    if(!passwordRegex.test(e.target.value)) {
      setPwMsg('숫자+영문자+특수문자 조합으로 8자리 이상 25자리 이하로 입력해주세요.');
      setIsPw(false);
    } else {
      setPwMsg('안전한 비밀번호 입니다.');
      setIsPw(true);
    }
  }
  const onClickLogin = async () => {
    // 로그인을 위해 Axois 호출
    const response = await AxiosApi.memberLogin(inputEmail, inputPw);
    console.log(response.data);
    if(response.data) {
      // 내부 저장소에 로그인 성공 시 로그인 상태 저장
      window.localStorage.setItem('email', inputEmail);
      window.localStorage.setItem('isLogin', "TRUE");
    }
  }
  return (
    <>
      <input type="text" placeholder="이메일" value={inputEmail} onChange={onChangeEmail} /><br />
      <input type="text" placeholder="비밀번호" value={inputPw} onChange={onChangePw} /><br />
      {isEmail && isPw ? (<button onClick={onClickLogin}>로그인</button>): (<button disabled>로그인</button>)}
    </>
  );
}
export default Login;