import './App.css';
import LoginPage from './pages/Login/login';
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Routes>
          <Route path="/login" element={<LoginPage />} />
      </Routes>
    </div>
  );
}

export default App;
