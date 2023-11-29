import { createContext, useEffect, useState } from "react";
export const UserContext = createContext(null);

const UserStore = (props) => {
  const [color, setColor] = useState(localStorage.getItem('bgcolor')||'orange');
  const [name, setName] = useState(localStorage.getItem('name')||'이름 입력');
  
  // 싱글코드의 문제점인 리로딩시 context를 잃어버리는 문제점을 보안하기 위해
  useEffect(() => {
    localStorage.setItem("bgcolor", color);
  }, [color]);

  useEffect(() => {
    localStorage.setItem("name", name);
  }, [name]);
  
  return (
    <UserContext.Provider value={{ color, setColor, name, setName }}>
      {props.children}
    </UserContext.Provider>
  );
};
export default UserStore;