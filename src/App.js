import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from './signup/Signup';
import Home from './pages/Home';
import Layout from './pages/Layout';
import Login from './signup/Login';
import Members from './pages/Members';
import MemberInfo from './pages/MemberInfo';
import UserStore from './context/UserStore';
import ThemeSetting from './pages/ThemeSetting';
import Category from './pages/board/Category';
import BoardList from './pages/board/BoardList';
import BoardWrite from './pages/board/BoardWrite';
import BoardDetail from './pages/board/BoardDetail';
import Movies from './pages/Movie';
import ChatList from './pages/chatting/ChatList';
import ChatRoomCreate from './pages/chatting/ChatRoomCreate';

function App() {
  const routes = [
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
      ],
    },
  ];

  return (
    <UserStore>
      <Router>
        <Routes>
          {routes.map((route, index) => {
            if (route.children) {
              return (
                <Route key={index} element={route.element}>
                  {route.children.map((childRoute, childIndex) => (
                    <Route
                      key={childIndex}
                      path={childRoute.path}
                      element={childRoute.element}
                    />
                  ))}
                </Route>
              );
            }
            return <Route key={index} path={route.path} element={route.element} />;
          })}
        </Routes>
      </Router>
    </UserStore>
  );
}

export default App;