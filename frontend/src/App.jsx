import './App.css';
import LoginPage from './pages/Login/login';
import { Route, Routes } from 'react-router-dom';
import RegisterPage from './pages/Register/register';
import Home from './pages/Home/home';
import PrivateRoute from './utils/PrivateRoute';

function App() {

  return (
    <div className="App">
      <Routes>
        <Route index path="/login" element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage />} />
        <Route path="/home" element={
          <PrivateRoute>
            <Home />
          </PrivateRoute>} />
      </Routes>
    </div>
  );
}

export default App;
