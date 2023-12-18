import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UserStore from './context/UserStore';
import RoutesCont from './Routes';

function App() {
  return (
    <UserStore>
      <Router>
        <Routes>
          {RoutesCont.map((route, index) => {
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