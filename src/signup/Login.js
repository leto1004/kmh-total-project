import { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import imgLogo from "../images/tier_logo.png";
import AxiosApi from "../api/AxiosApi";
import { Input, Button, Container, Items } from "../component/LoginComponent";
import Modal from "../utils/Modal";

const Login = () => {
  const navigate = useNavigate();
  // 키보드 입력 (이메일과 패스워드)
  const [inputEmail, setInputEmail] = useState('');
  const [inputPw, setInputPw] = useState('');
  // 오류 메시지
  const [emailMsg, setEmailMsg] = useState('');
  const [pwMsg, setPwMsg] = useState('');
   // 유효성 검사
  const [isEmail, setIsEmail] = useState('');
  const [isPw, setIsPw] = useState('');
  // 모달 내용 변경 : 팝업 띄우기
  const [modalContent, setModelContent] = useState('');
  // 모달 팝업 처리
  const [modalOpen, setModelOpen] = useState(false);
  const closeModal = () => {
    setModelOpen(false);
  };
  // 입력 및 정규식 체크 : 이메일에 대한 정규식 체크
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
  // 입력 및 정규식 체크 : 이메일에 대한 정규식 체크
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
      localStorage.setItem('email', inputEmail);
      localStorage.setItem('isLogin', "TRUE");
      navigate('/home');
    } else {
      setModelOpen(true);
      setModelContent('아이디 및 패스워드를 재확인해주세요.')
    }
  }
  return (
    <Container>
      <Items className="item1">
        <img src={imgLogo} alt="logo"/>
      </Items>
      <Items className="item2">
        <Input placeholder="이메일" value={inputEmail} onChange={onChangeEmail} />
      </Items>
      <Items className="hint">
        {inputEmail.length > 0 && (
          <span className={`${isEmail ? 'success' : 'error'}`}>{emailMsg}</span>
        )}
      </Items>
      <Items className="item2">
        <Input type="password" placeholder="비밀번호" value={inputPw} onChange={onChangePw} />
      </Items>
      <Items className="hint">
        {inputPw.length > 0 && (
          <span className={`${isPw ? 'success' : 'error'}`}>{pwMsg}</span>
        )}
      </Items>
      <Items className="item2">
        {isEmail && isPw ? (<Button enabled onClick={onClickLogin}>로그인</Button>): (<Button disabled>로그인</Button>)}
      </Items>
      <Items className="signup">
        <Link to='/signup' className="link_style">
          <span>Sign Up</span>
        </Link>
      </Items>
      <div className="footer">
        <p> 저작권 ⓒ <span style={{fontWeight:'bold'}}>Kim Myeong Hoon</span>에게 모든 권한이 있습니다.</p>
      </div>
      <Modal open={modalOpen} close={closeModal} header='오류'>{modalContent}</Modal>
    </Container>
  );
}
export default Login;