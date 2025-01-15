import './App.css';
import LoginPage from './pages/Login/login';
import { Route, Routes } from 'react-router-dom';
import RegisterPage from './pages/Register/register';

function App() {
  return (
    <div className="App">
      <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path='/register' element={<RegisterPage />} />
      </Routes>
    </div>
  );
}

export default App;
