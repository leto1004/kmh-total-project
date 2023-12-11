import { createContext, useEffect, useState } from "react";
export const UserContext = createContext(null);

const UserStore = (props) => {
  const [color, setColor] = useState(
    localStorage.getItem("bgcolor") || "orange"
  );

  const [name, setName] = useState(
    localStorage.getItem("name") || "이름을 입력해주세요."
  );
  const [addr, setAddr] = useState(
    localStorage.getItem("addr") || "위치를 입력해주세요."
  );

  const [temp, setTemp] = useState(
    localStorage.getItem("temp") || "온도를 입력해주세요."
  );

  useEffect(() => {
    localStorage.setItem("bgcolor", color);
  }, [color]);

  useEffect(() => {
    localStorage.setItem("name", name);
  }, [name]);

  useEffect(() => {
    localStorage.setItem("addr", addr);
  }, [addr]);

  useEffect(() => {
    localStorage.setItem("temp", temp);
  }, [temp]);

  return (
    <UserContext.Provider
      value={{
        color,
        setColor,
        name,
        setName,
        addr,
        setAddr,
        temp,
        setTemp,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};
export default UserStore;