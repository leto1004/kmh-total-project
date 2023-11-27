import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AxiosApi from "../api/AxiosApi";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  width: 100%;
  direction: column;
  flex-wrap: wrap;
  margin: 20px auto;
`;

const MemberInfoWrapper = styled.div`
  display: flex;
  margin: 10px;
  width: 100%;
  border: 1px solid #ccc;
  padding: 16px;
  border-radius: 8px;
  background-color: antiquewhite;
`;

const UserInfo = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
`;

const UserImage = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 5px;
  margin-right: 10px;
`;

const MemberName = styled.span`
  font-style: italic;
  font-size: 1.2rem;
  color: #333;
  margin: 10px;
`;

const MemberEmail = styled.span`
  color: #555;
  margin-right: px;
  margin-bottom: 10px;
`;

const MemberJoinDate = styled.span`
  font-size: 0.8rem;
  color: #777;
  margin-right: 10px;
`;

// 회원 전체 정보 조회
const Members = () => {
  const navigate = useNavigate(); // 라우터로 페이지 이동
  const [members, setMembers] = useState(''); // 서버로 부터 회원 리스트를 가져와서 렌더링
  const isLogin = localStorage.getItem('isLogin'); // 현재 로그인 상태인지 체크

  if(isLogin !== 'TRUE') navigate('/');

  // 화면이 
  useEffect(() => {
    const getMembers = async () => {
      try {
        const resp = await AxiosApi.memberGet(); // 전체조회
        console.log(resp.data);
        setMembers(resp.data); // 서버에서 받아온 회원 리스트 데이터로 상태를 갱신함
      } catch (e) {
        console.log(e);
      }
    }
    getMembers(); // useEffect는 비동기 처리가 안됨 그러므로 내부에 비동기 함수를 만들고 해당 함수를 불러야함
  });

  const onClickMember = (email) => {
    console.log("onclick member : ", email);
    navigate(`/memberInfo/${email}`);
  };

  return (
    <Container>
      { members && members.map((member)=>(
        <MemberInfoWrapper key={member.email} onClick={()=>onClickMember(member.email)}>
          <UserImage src={member.image} />
            <UserInfo>
              <MemberName>이름: {member.name}</MemberName>
              <MemberEmail>이메일: {member.email}</MemberEmail>
              <MemberJoinDate>
                가입일: {member.regDate}
              </MemberJoinDate>
            </UserInfo>
        </MemberInfoWrapper>
      ))}
    </Container>
  );
}
export default Members;