import React, { useState, useEffect, useRef } from "react";
import Common from "../../utils/Common";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import AxiosApi from "../../api/AxiosApi";

const ChatContainer = styled.div`
  padding: 20px;
  max-width: 800px;
  margin: 10px auto;
  background-color: rgba(255, 255, 255, 0.6);
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
`;

const ChatHeader = styled.div`
  font-size: 1.3em;
  color: #333;
  text-align: center;
  margin-bottom: 20px;
`;

const MessagesContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 400px;
  overflow-y: auto;
  border-top: 1px solid #ddd;
  border-bottom: 1px solid #ddd;
  padding: 10px;
  margin-bottom: 20px;
`;

const Message = styled.div`
  max-width: 60%;
  padding: 10px;
  margin: 10px;
  border-radius: 20px;
  background-color: ${(props) => (props.isSender ? "#DCF8C6" : "#E0E0E0")};
  align-self: ${(props) => (props.isSender ? "flex-end" : "flex-start")};
  border: ${(props) =>
    props.isSender ? "1px solid #DCF8C6" : "1px solid #E0E0E0"};
`;

const Input = styled.input`
  padding: 10px;
  width: 84%;
  border-radius: 4px;
  border: 1px solid #ddd;
`;

const SendButton = styled.button`
  padding: 10px 15px;
  border: none;
  width: 100px;
  background-color: #4caf50;
  box-shadow: 1px 1px 1px #ccc;
  color: white;
  border-radius: 4px;
  margin-left: 10px;
  cursor: pointer;

  &:hover {
    background-color: #45a049;
  }
`;
const CloseButton = styled.button`
  padding: 10px 15px;
  border: none;
  background-color: #f44336;
  color: white;
  border-radius: 4px;
  margin-top: 10px;
  cursor: pointer;

  &:hover {
    background-color: #d32f2f;
  }
`;

const Chatting = () => {
  const [socketConnected, setSocketConnected] = useState(false); // 웹소켓 연결 여부
  const [inputMsg, setInputMsg] = useState(""); // 입력 메시지
  const [chatList, setChatList] = useState([]); // 채팅 리스트
  const { roomId } = useParams(); // 채팅방 번호
  const [sender, setSender] = useState(""); // 보내는 사람
  const [roomName, setRoomName] = useState(""); // 채팅방 이름
  const ws = useRef(null); // 웹소켓 객체
  const navigate = useNavigate(); // useNavigate 훅 추가

  const onChangMsg = (e) => {
    setInputMsg(e.target.value);
  };

  const onEnterKey = (e) => {
    if (e.key === "Enter" && inputMsg.trim() !== "") { // 엔터키 입력시, 공백 제거 후 비어있지 않으면
      e.preventDefault();
      onClickMsgSend(e);
    }
  };

  const onClickMsgSend = (e) => {
    // 메시지 전송
    ws.current.send(
      JSON.stringify({
        type: "TALK",
        roomId: roomId,
        sender: sender,
        message: inputMsg,
      })
    );
    setInputMsg("");
  };
  const onClickMsgClose = () => {
    // 채팅 종료
    ws.current.send(
      JSON.stringify({
        type: "CLOSE",
        roomId: roomId,
        sender: sender,
        message: "종료 합니다.",
      })
    );
    ws.current.close();
    navigate("/Chat");
  };

  useEffect(() => {
    // 이메일로 회원 정보 가져 오기
    const getMember = async () => {
      try {
        const rsp = await AxiosApi.memberGetInfo();
        console.log(rsp.data.name);
        setSender(rsp.data.name);
      } catch (error) {
        console.log(error);
      }
    };
    getMember();
  },[]);

  useEffect(() => {
    // 채팅방 정보 가져 오기
    const accessToken = Common.getAccessToken();
    const getChatRoom = async () => {
      try {
        const rsp = await AxiosApi.chatDetail(roomId);
        console.log(rsp.data.name);
        setRoomName(rsp.data.name);
      } catch (e) {
        if (e.rsp.status === 401) {
          await Common.handleUnauthorized();
          const newToken = Common.getAccessToken();
          if (newToken !== accessToken) {
            const rsp = await AxiosApi.chatDetail(roomId);
            console.log(rsp.data.name);
            setRoomName(rsp.data.name);
          }
        }
      }
    };
    getChatRoom();
  },[]);

  useEffect(() => {
    console.log("방번호 : " + roomId);
    if (!ws.current) {
      ws.current = new WebSocket(Common.KMH_SOCKET_URL); // 웹소켓 연결
      ws.current.onopen = () => {
        // 웹소켓 연결되면
        console.log("connected to " + Common.KMH_SOCKET_URL);
        setSocketConnected(true); // 웹소켓 연결 상태 변경
      };
    }
    if (socketConnected) {
      // 웹소켓 연결되면
      ws.current.send(
        JSON.stringify({
          // 서버에 입장 메시지 전송
          type: "ENTER",
          roomId: roomId,
          sender: sender,
          message: "처음으로 접속 합니다.",
        })
      );
    }
    ws.current.onmessage = (evt) => {
      // 서버에서 메시지가 오면
      const data = JSON.parse(evt.data); // 받은 메시지를 JSON 객체로 변환
      console.log(data.message);
      setChatList((prevItems) => [...prevItems, data]); // 채팅 리스트에 추가
    };
  }, [socketConnected]); // socketConnected 값이 변경되면 useEffect 실행

  // 화면 하단으로 자동 스크롤
  const chatContainerRef = useRef(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      // 채팅 컨테이너가 존재하면
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight; // 스크롤을 맨 아래로
    }
  }, [chatList]); // chatList 값이 변경되면 useEffect 실행

  return (
    <ChatContainer>
      <ChatHeader>채팅방 {roomName}</ChatHeader>
      <MessagesContainer ref={chatContainerRef}>
        {chatList.map((chat, index) => (
          <Message key={index} isSender={chat.sender === sender}>
            {`${chat.sender} > ${chat.message}`}
          </Message>
        ))}
      </MessagesContainer>
      <div>
        <Input
          placeholder="문자 전송"
          value={inputMsg}
          onChange={onChangMsg}
          onKeyUp={onEnterKey}
        />
        <SendButton onClick={onClickMsgSend}>전송</SendButton>
      </div>
      <CloseButton onClick={onClickMsgClose}>채팅 종료 하기</CloseButton>
    </ChatContainer>
  );
};

export default Chatting;