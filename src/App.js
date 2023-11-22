import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './signup/Login';
import Signup from './signup/Signup';
import Home from './pages/Home';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/home' element={<Home />} />
        <Route path='/signup' element={<Signup />} />
      </Routes>
    </Router>
  );
}

export default App;
