import styles from './styles.module.css';
import Header from "../Header/header";
import BottomNav from '../BottomNav/bottomNav';
import { Outlet } from 'react-router-dom';
import { useLocation, Navigate } from 'react-router-dom';

const AuthLayout = () => {
  const auth = localStorage.getItem('token');
  const location = useLocation();

    if (!auth) {
      return (
          <Navigate to="/login" state={{ from: location }} replace />
      )
  };

    return (
      <div className={styles.layout}>
        <Header />
        <div className={styles.content}>
          <div className={styles.mainContent}>
            <Outlet />
          </div>
        </div>
        <BottomNav />
      </div>
    );
  };
  
  export default AuthLayout;