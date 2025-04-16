const handleLogoutClick = (setIsModalActive, setShowSidebar) => {
    setIsModalActive(true);
    setShowSidebar(false);
};

const handleLogoutDenied = (setIsModalActive) => {
    setIsModalActive(false);
};

export { handleLogoutClick, handleLogoutDenied };