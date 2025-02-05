'use client';

import styles from './styles.module.css';
import Header from "../Header/header";
import BottomNav from '../BottomNav/bottomNav';
import { Outlet } from 'react-router-dom';
import { useLocation, Navigate, useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import Sidebar from '../Sidebar/sidebar';
import SidebarOverlay from '../SidebarOverlay/sidebarOverlay';
import axios from 'axios';
import Modal from '../Modal/modal';

const AuthLayout = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const [isModalActive, setIsModalActive] = useState(false);
  const [scrollToBottom, setScrollToBottom] = useState(false);
  const [dropdownStates, setDropdownStates] = useState({ ring: false, services: false, KARTA: false, project: false, warehouse: false, confluence: false, world: false, apps: false, feedback: false });
  const linksContainerRef = useRef(null);
  const navigate = useNavigate();
  const auth = localStorage.getItem('token');
  const location = useLocation();

  const toggleSidebar = () => {
    setShowSidebar(state => !state);
  };

  const updateDropdownStates = (prevStates, link) => {
    const newStates = { ...prevStates };
    if (newStates[link]) {
      newStates[link] = false;
    } else {
      Object.keys(newStates).forEach((key) => {
        newStates[key] = false;
      });
      newStates[link] = true;
    }
    return newStates;
  };

  const toggleDropdown = (link) => {
    if (link === 'apps' || link === 'feedback') {
      setDropdownStates((prevStates) => updateDropdownStates(prevStates, link));
      setScrollToBottom(true);
    } else if (['warehouse', 'confluence', 'world'].includes(link)) {
      setDropdownStates((prevStates) => {
        const newStates = { ...prevStates };
        if (newStates[link]) {
          newStates[link] = false;
        } else {
          ['warehouse', 'confluence', 'world'].forEach((key) => {
            newStates[key] = false;
          });
          newStates[link] = true;
        }
        return newStates;
      });
      setScrollToBottom(true);
    } else {
      setDropdownStates((prevStates) => updateDropdownStates(prevStates, link));
    };
  };

  useEffect(() => {
    if (scrollToBottom && linksContainerRef.current) {
      linksContainerRef.current.scrollTo({
        top: linksContainerRef.current.scrollHeight,
        behavior: 'smooth',
      });
      setScrollToBottom(false);
    }
  }, [scrollToBottom, linksContainerRef]);

  const handleLogoutClick = () => {
    setIsModalActive(true);
    setShowSidebar(false);
  };

  const handleLogoutDenied = () => {
    setIsModalActive(false);
  };

  const handleLogoutConfirm = () => {
    axios.get('/api/logout')
      .then(res => {
        console.log('Logout successfully ');
        localStorage.removeItem('token');
        navigate('/login');
      })
      .catch(err => {
        console.error(err);
      })
  };

  if (!auth) {
    return (
      <Navigate to="/login" state={{ from: location }} replace />
    )
  };

  return (
    <div className={styles.layout}>
      <Header toggleSidebar={toggleSidebar} showSidebar={showSidebar} />
      <div className={styles.content}>
        <Sidebar
          dropdownStates={dropdownStates}
          showSidebar={showSidebar}
          linksContainerRef={linksContainerRef}
          onToggleDropdown={toggleDropdown}
          onLogoutClick={handleLogoutClick} />
        <SidebarOverlay showSidebar={showSidebar} onClose={toggleSidebar} />
        <Modal
          isActive={isModalActive}
          onOverlayClick={handleLogoutDenied}
          onRefuse={handleLogoutDenied}
          onAccept={handleLogoutConfirm} />
        <div className={styles.mainContent}>
          <Outlet />
        </div>
      </div>
      <BottomNav />
    </div>
  );
};

export default AuthLayout;