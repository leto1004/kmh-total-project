import { useEffect, useState, useContext } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import AxiosApi from "../api/AxiosApi";
import {
  Container,
  StyledSideMenu,
  UserContainer,
  UserImage,
  UserIdAndName,
  StyledMenuList,
  StyledMenuItem,
  MenuIcon,
  StyledLink,
  Dummy,
} from "../component/LayoutComponent";
import { GiHamburgerMenu, GiCancel } from "react-icons/gi";
import { FiSettings } from "react-icons/fi";
import { FaHome, FaClipboardList, FaRegNewspaper } from "react-icons/fa";
import { BiCameraMovie } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { UserContext } from "../context/UserStore";

const Layout = () => {
  // 사이드바 메뉴 열림 닫힘
  const [isMenuOpen, setIsMenuOpen] = useState('');
  const [member, setMember] = useState('');
  const navigate = useNavigate();
  const email = localStorage.getItem('email');
  const context = useContext(UserContext);
  const { color, name } = context;
  
  const onClickLeft = () => {
    setIsMenuOpen(!isMenuOpen); // 토글
  };
  const onClickRight = () => {
    navigate('/setting');
  };
  useEffect(()=>{
    const getMember = async() => {
      try {
        // 이메일로 회원에 대한 정보 조회
        const resp = await AxiosApi.memberGetOne(email);
        setMember(resp.data);
      } catch(e){
        console.error(e);
      }
    };
    getMember();
  }, [name]);

  return (
    <Container color={color}>
      <header className="mainhead">
        <div className="hambeger">
          {isMenuOpen ? (
            <GiCancel size={32} color="white" onClick={onClickLeft} />
          ) : (
            <GiHamburgerMenu size={32} color="white" onClick={onClickLeft} />
          )}
        </div>
        <div className="setting">
          <FiSettings size={32} color="white" onClick={onClickRight} />
        </div>
        <StyledSideMenu
          isOpen={isMenuOpen}
          onClick={() => setIsMenuOpen(false)}
        >
          <StyledMenuList>
            <UserContainer>
              <UserImage
                src={member.image || "http://via.placeholder.com/160"}
                alt="User"
              />
              <UserIdAndName>
                <sapn>{member.name}</sapn>
                <span>{member.email}</span>
              </UserIdAndName>
            </UserContainer>
            <StyledMenuItem>
              <MenuIcon>
                <FaHome />
              </MenuIcon>
              <StyledLink to="/home">Home</StyledLink>
            </StyledMenuItem>
            <StyledMenuItem>
              <MenuIcon>
                <FaClipboardList />
              </MenuIcon>
              <StyledLink to="/Boards">Boards</StyledLink>
            </StyledMenuItem>
            <StyledMenuItem>
              <MenuIcon>
                <FaRegNewspaper />
              </MenuIcon>
              <StyledLink to="/News">News</StyledLink>
            </StyledMenuItem>
            <StyledMenuItem>
              <MenuIcon>
                <CgProfile />
              </MenuIcon>
              <StyledLink to="/Members">Members</StyledLink>
            </StyledMenuItem>
            <StyledMenuItem>
              <MenuIcon>
                <BiCameraMovie />
              </MenuIcon>
              <StyledLink to="/Movies">Movies</StyledLink>
            </StyledMenuItem>
          </StyledMenuList>
        </StyledSideMenu>
      </header>
      <main onClick={() => setIsMenuOpen(false)}>
        <Dummy />
        <Outlet />
      </main>
      <footer>
        <div className="footer">
          <p>
            저작권 ©<span style={{ fontWeight: "bold" }}>KyungSoo. Jeong</span>{" "}
            에게 모든 권한이 있습니다.
          </p>
        </div>
      </footer>
    </Container>
  );
};

export default Layout;