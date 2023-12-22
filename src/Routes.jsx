import Signup from './signup/Signup';
import Home from './pages/Home';
import Layout from './pages/Layout';
import Login from './signup/Login';
import Members from './pages/Members';
import MemberInfo from './pages/MemberInfo';
import ThemeSetting from './pages/ThemeSetting';
import Category from './pages/board/Category';
import BoardList from './pages/board/BoardList';
import BoardWrite from './pages/board/BoardWrite';
import BoardDetail from './pages/board/BoardDetail';
import Movies from './pages/Movie';
import ChatList from './pages/chatting/ChatList';
import ChatRoomCreate from './pages/chatting/ChatRoomCreate';
import Chatting from './pages/chatting/Chatting';
import KakaoMap from './pages/KakaoMap';
import BloodPieChart from './pages/BloodPieChart';
import GenderChart from './pages/GenderChat';

const RoutesCont = [
  { path: '/', element: <Login /> },
  { path: '/signup', element: <Signup /> },
  {
    element: <Layout />,
    children: [
      { path: '/home', element: <Home /> },
      { path: '/themeSetting', element: <ThemeSetting /> },
      { path: '/members', element: <Members /> },
      { path: '/memberInfo/:email', element: <MemberInfo /> },
      { path: '/category', element: <Category /> },
      { path: '/boards', element: <BoardList /> },
      { path: '/boardWrite', element: <BoardWrite /> },
      { path: '/boardDetail/:id', element: <BoardDetail /> },
      { path: '/movies', element: <Movies /> },
      { path: '/chat', element: <ChatList /> },
      { path: '/chat-create', element: <ChatRoomCreate /> },
      { path: '/chatting/:roomId', element: <Chatting /> },
      { path: '/kakao', element: <KakaoMap /> },
      { path: '/blood', element: <BloodPieChart /> },
      { path: '/gender', element: <GenderChart /> },
    ],
  },
];

export default RoutesCont;