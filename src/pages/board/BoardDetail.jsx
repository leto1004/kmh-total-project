import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AxiosApi from "../../api/AxiosApi";
import styled from "styled-components";
import Common from "../../utils/Common";

// 여기에 스타일드 컴포넌트를 정의합니다.
const Container = styled.div`
  padding: 20px;
  margin: 20px auto;
  max-width: 800px;
  background: rgba(255, 255, 255, 0.6);
  border-radius: 8px;
`;

const Title = styled.h1`
  color: #333;
  font-size: 2em;
  margin-bottom: 10px;
`;

const Content = styled.p`
  color: #666;
  line-height: 1.5;
`;

const CommentForm = styled.form`
  margin-top: 20px;
  clear: left;
`;

const BoardImage = styled.img`
  width: 120px;
  height: 120px;
  border-radius: 8px;
  margin-right: 15px;
  margin-bottom: 10px;
  float: left;
`;

const CommentInput = styled.input`
  width: 100%;
  padding: 10px;
  margin-top: 5px;
  margin-bottom: 10px;
  box-sizing: border-box;
`;
const SubmitButton = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  transition-duration: 0.4s;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;
const CommentList = styled.ul`
  list-style: none;
  padding: 0;
`;

const CommentItem = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px 0;
  border-bottom: 1px solid #ddd;
`;

const CommentContent = styled.p`
  color: #444;
  font-size: 1em;
  margin: 0;
  padding: 0;
`;
const CommentEmail = styled.div`
  display: flex;
  justify-content: space-between;
  color: #555;
  font-style: italic;
  font-size: 13px;
  margin: 0;
  padding: 0;
`;

const BoardDate = styled.p`
  color: #777;
  font-size: 0.8em;
  text-align: right;
`;

// 게시글 상세 보기와 댓글 목록을 보여주는 컴포넌트입니다.

const BoardDetile = () => {
  const { id } = useParams(); // 라우터 이동시 ID를 넘겨 받음
  const [board, setBoard] = useState(''); // 게시글 보기
  const [comments, setComments] = useState(''); // 댓글 목록
  const [inputComment, setInputComment] = useState(''); // 댓글 쓰기
  const [comAddFleg, setComAddFlag] = useState(false); // 댓글 추가 성곡 여부
  const [showComments, setShowComments]= useState(false); // 토글로 댓글 목록보기
  const email = localStorage.getItem("email");
  const navigate = useNavigate();

  const toggleComments = () => {
    setShowComments(!showComments); // 토글기능
  };

  useEffect(()=>{
    const getBoardDetail = async () => {
      try {
        const resp = await AxiosApi.boardDetail(id);
        setBoard(resp.data);
        const resp2 = await AxiosApi.commentList(id);
        setComments(resp2.data);
      } catch(e){
        console.log(e);
      }
    }
    getBoardDetail();
  },[comAddFleg, id]);

  const handleCommentChange = (e) => {
    setInputComment(e.target.value);
  };

  const handleSubmitComment = async (e) => {
    e.preventDefault();
    try {
      await AxiosApi.commentWrite(email, id, inputComment);
      setInputComment('');
      setComAddFlag(!comAddFleg);
    } catch(e){
      console.log(e);
    }
  }

  const modifyBoard = () => {
    console.log('게시글 수정');
  }

  const deleteBoard = async () => {
    if(window.confirm('정말 삭제하시겠습니까?')){
      try {
        await AxiosApi.boardDelete(id);
        window.alert('게시글이 삭제 되었습니다.');
        navigate('/boards');
      } catch(e){
        console.log(e);
      }
    }
  }


  return (
    <Container>
      <BoardImage src={board.img ? board.img : "http://via.placeholder.com/160"} alt="Board image" />
      <Title>{board.title}</Title>
      <Content>{board.content}</Content>
      <BoardDate>{Common.timeFromNow(board.regDate)}</BoardDate>
      <button onClick={toggleComments}>
        {showComments ? '댓글 숨기기' : `댓글 ${comments.length}개 보기`}
      </button>
      <button onClick={deleteBoard}>삭제</button>
      <CommentForm onSubmit={handleSubmitComment}>
        <CommentInput type="text" value={inputComment} onChange={handleCommentChange} />
        <SubmitButton type="submit">댓글 추가</SubmitButton>
      </CommentForm>
      {showComments && (
        <CommentList>
          {comments &&
            comments.map((comment) => (
              <CommentItem key={comment.commentId}>
                <CommentEmail>
                  <p>{comment.email}</p>
                  <p>{Common.timeFromNow(comment.regDate)}</p>
                </CommentEmail>
                <CommentContent>{comment.content}</CommentContent>
              </CommentItem>
            ))}
        </CommentList>
      )}
    </Container>
  );
}

export default BoardDetile;