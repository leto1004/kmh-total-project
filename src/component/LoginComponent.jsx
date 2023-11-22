import styled, { css } from "styled-components";

export const Input = styled.input`
  margin: 0 30px;
  width: 100%;
  height: auto;
  line-height: normal;
  padding: 1em;
  border: 1px solid #999;
  border-radius: 18px;
  outline-style: none;
`;
export const Button = styled.button`
margin: 100px 30px 0;
font-size:15px;
font-weight: bold;
width: 100%;
color: white;
background-color: #999;
border-radius: 18px;
border: orange;
${props => props.eabled && css`background-color:orange;`};
&:active {
  border: #999;
  background-color: #999;
}
`;
export const Container = styled.div`
`;