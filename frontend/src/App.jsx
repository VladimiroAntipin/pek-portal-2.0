import './App.css';
import LoginPage from './pages/Login/login';
import { Route, Routes } from 'react-router-dom';
import RegisterPage from './pages/Register/register';
import Feed from './pages/Feed/feed';
import AuthLayout from './components/AuthLayout/authLayout';

function App() {
  
  return (
    <div className="App">
      <Routes>
        <Route index path="/login" element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage />} />
        <Route element={<AuthLayout />}>
          <Route path="/feed" element={<Feed />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
