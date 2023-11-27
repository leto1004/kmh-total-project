import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from './signup/Signup';
import Home from './pages/Home';
import Layout from './pages/Layout';
import Login from './signup/Login';
import Members from './pages/Members';
import MemberInfo from './pages/MemberInfo';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route element={<Layout />}>
          <Route path='/home' element={<Home />} />
          <Route path='/members' element={<Members />} />
          <Route path='/memberInfo/:email' element={<MemberInfo />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
