'use client';

import styles from './styles.module.css';
import Header from "../Header/header";
import BottomNav from '../BottomNav/bottomNav';
import { Outlet, useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import Sidebar from '../Sidebar/sidebar';
import SidebarOverlay from '../SidebarOverlay/sidebarOverlay';
import { toggleDropdown } from '../../hooks/useDropdown';
import Modal from '../Modal/modal';
import { handleLogoutClick, handleLogoutDenied } from '../../utils/logout';
import { useAuth } from '../../context/authContext';

const AuthLayout = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [isModalActive, setIsModalActive] = useState(false);
  const [scrollToBottom, setScrollToBottom] = useState(false);
  const [dropdownStates, setDropdownStates] = useState({ ring: false, services: false, KARTA: false, project: false, warehouse: false, confluence: false, world: false, apps: false, feedback: false });
  const linksContainerRef = useRef(null);
  const { logout } = useAuth();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setShowSidebar(state => !state);
  };

  const handleToggleDropdown = (link) => {
    const { states, scrollToBottom: newScrollToBottom } = toggleDropdown(dropdownStates, link, scrollToBottom);
    setDropdownStates(states);
    setScrollToBottom(newScrollToBottom);
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

  useEffect(() => {
    if (!isAuthenticated) {
      return navigate("/login");
    }
  }, [isAuthenticated, navigate])

  return (
    <div className={styles.layout}>
      <Header toggleSidebar={toggleSidebar} showSidebar={showSidebar} />
      <div className={styles.content}>
        <Sidebar
          dropdownStates={dropdownStates}
          showSidebar={showSidebar}
          linksContainerRef={linksContainerRef}
          onToggleDropdown={handleToggleDropdown}
          onLogoutClick={() => handleLogoutClick(setIsModalActive, setShowSidebar)} />
        <SidebarOverlay showSidebar={showSidebar} onClose={toggleSidebar} />
        <Modal
          isActive={isModalActive}
          onOverlayClick={() => handleLogoutDenied(setIsModalActive, setShowSidebar)}
          onRefuse={() => handleLogoutDenied(setIsModalActive, setShowSidebar)}
          onAccept={logout} />
        <div className={styles.mainContent}>
          <Outlet />
        </div>
      </div>
      <BottomNav />
    </div>
  );
};

export default AuthLayout;