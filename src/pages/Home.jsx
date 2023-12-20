import { useNavigate } from "react-router-dom";
import { ButtonContainer, TransBtn } from "../component/HomeComponent";

const Home = () => {
  const navigate = useNavigate();
  const onClickBtn = (num) => {
    switch(num) {
      case 1:
        navigate("/members");
        break;
      case 2:
        navigate("/themeSetting");
        break;
      case 3:
        navigate("/boards");
        break;
      case 4:
        navigate("/category");
        break;
      case 5:
        navigate("/movies");
        break;
      case 6:
        navigate("/chat");
        break;
      case 7:
        navigate("/public");
        break;
      case 8:
        navigate("/kakao");
        break;
      default:
    }
  }

  return (
    <ButtonContainer>
      <TransBtn onClick={() => onClickBtn(1)}>회원리스트</TransBtn>
      <TransBtn onClick={() => onClickBtn(2)}>테마변경</TransBtn>
      <TransBtn onClick={() => onClickBtn(3)}>게시판</TransBtn>
      <TransBtn onClick={() => onClickBtn(4)}>카테고리</TransBtn>
      <TransBtn onClick={() => onClickBtn(5)}>영화 목록</TransBtn>
      <TransBtn onClick={() => onClickBtn(6)}>채팅</TransBtn>
      <TransBtn onClick={() => onClickBtn(7)}>공공데이터</TransBtn>
      <TransBtn onClick={() => onClickBtn(8)}>카카오맵</TransBtn>
    </ButtonContainer>
  );
}
export default Home;