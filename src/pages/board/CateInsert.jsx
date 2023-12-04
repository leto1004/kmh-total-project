import { useCallback, useState } from "react";
import styled from "styled-components";
import { MdAdd } from "react-icons/md";

const CateInsertForm = styled.form`
  display: flex;
  background: #495057;
`
const Input = styled.input`
background: none;
outline: none;
border: none;
padding: 0.5rem;
line-height: 1.5;
color: white;
flex: 1;
&::placeholder {
  color: #dee2e6;
}
`

const Button = styled.button`
background: #868e96;
outline: none;
border: none;
color: white;
padding-left: 1rem;
padding-right: 1rem;
font-size: 1.5rem;
display: flex;
align-items: center;
cursor: pointer;
transition: 0.1s all ease-in;
&:hover {
  background: orangered;
}
`

const CateInsert = ({onInsert}) => { // 함수를 전달
  const [value, setValue] = useState('');

  const onSubmit = useCallback(e => {
      onInsert(value);
      setValue('');
      e.preventDefault();
    },
    [onInsert, value] // 함수를 다시 생성하는 의존성 배열
  );
  
  const onChange = useCallback( e => {
      setValue(e.target.value);
    },[]);

  return(
    <CateInsertForm onSubmit={onSubmit}>
      <Input placeholder="게시글 카테고리 입력" value={value} onChange={onChange}></Input>
      <Button type="submit"><MdAdd></MdAdd></Button>
    </CateInsertForm>
  );
}
export default CateInsert;