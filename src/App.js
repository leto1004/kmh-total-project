import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './signup/Login.jsX';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Login></Login>} />
      </Routes>
    </Router>
  );
}

export default App;
