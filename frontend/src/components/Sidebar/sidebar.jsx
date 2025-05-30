import styles from './styles.module.css';
import Ring from '../../images/ring.png';
import Pecocracy from '../../images/pecocracy.png';
import Heart from '../../images/heart.png';
import Effect from '../../images/effect.png';
import Services from '../../images/services.svg';
import Karta from '../../images/karta.svg';
import Project from '../../images/project.svg';
import Cup from '../../images/cup.png';
import Vote from '../../images/vote.svg';
import Store from '../../images/store.svg';
import Blog from '../../images/blog.png';
import Warehouse from '../../images/warehouse.png';
import Confluence from '../../images/confluence.png';
import World from '../../images/world.png';
import Jira from '../../images/jira.png';
import Feedback from '../../images/feedback.svg';
import Apps from '../../images/apps.svg';
import Logout from '../../images/logout.svg';
import SidebarLink from '../SidebarLink/sidebarLink';

const Sidebar = ({
    showSidebar,
    onToggleDropdown,
    onLogoutClick,
    dropdownStates,
    linksContainerRef }) => {

    const toggleDropdown = (link) => {
        onToggleDropdown(link);
    };

    const handleLogoutClick = () => {
        onLogoutClick();
    };

    return (
        <div className={showSidebar ? styles.sidebarActive : styles.sidebar}>
            <div className={styles.wrapper}>

                <ul className={styles.linksContainer} ref={linksContainerRef}>
                    <SidebarLink
                        icon={Ring}
                        text='ПЭК - это мы!'
                        hasDropdown={true}
                        dropdownLinks={[
                            { to: '#', text: 'ПЭК: Конституция' },
                            { to: '#', text: 'Наши сокровища' },
                            { to: '#', text: 'Страница памяти' }
                        ]}
                        isDropdownVisible={dropdownStates.ring}
                        onToggleDropdown={() => toggleDropdown('ring')} />

                    <SidebarLink
                        icon={Pecocracy}
                        text='ПЭКократия' />

                    <SidebarLink
                        icon={Heart}
                        text='Искренный сервис' />

                    <SidebarLink
                        icon={Effect}
                        text='Эффект руководителя' />

                    <SidebarLink
                        icon={Services}
                        text='Сервисы сотрудника'
                        hasDropdown={true}
                        dropdownLinks={[
                            { to: '#', text: 'ДМС' },
                            { to: '#', text: 'Электронные услуги' },
                            { to: '#', text: 'Юридические услуги (Jeffit)' },
                            { to: '#', text: 'HR-Link' },
                            { to: '#', text: 'Помощь сотруднику' },
                            { to: '#', text: 'Дни рождения' },
                            { to: '#', text: 'Офисный план' },
                            { to: '#', text: 'Работа в ПЭК' },
                        ]}
                        isDropdownVisible={dropdownStates.services}
                        onToggleDropdown={() => toggleDropdown('services')} />

                    <SidebarLink
                        icon={Karta}
                        text='КАРТА'
                        hasDropdown={true}
                        dropdownLinks={[
                            { to: '#', text: 'Корпоративное обучение' },
                            { to: '#', text: 'Библиотека' },
                        ]}
                        isDropdownVisible={dropdownStates.KARTA}
                        onToggleDropdown={() => toggleDropdown('KARTA')} />

                    <SidebarLink
                        icon={Project}
                        text='Страницы проектов'
                        hasDropdown={true}
                        dropdownLinks={[
                            { to: '#', text: 'Код заботы' },
                            { to: '#', text: 'Генератор идей' },
                            { to: '#', text: 'ПЭК: Звезды' },
                        ]}
                        isDropdownVisible={dropdownStates.project}
                        onToggleDropdown={() => toggleDropdown('project')} />

                    <SidebarLink
                        icon={Cup}
                        text='Конкурсы' />

                    <SidebarLink
                        icon={Vote}
                        text='Голосование' />

                    <SidebarLink
                        icon={Store}
                        text='ПЭК:Store' />

                    <SidebarLink
                        icon={Blog}
                        text='Блоги' />

                    <SidebarLink
                        icon={Apps}
                        text='Вспомогательное меню'
                        hasDropdown={true}
                        isDropdownVisible={dropdownStates.apps}
                        onToggleDropdown={() => toggleDropdown('apps')}
                        preventClose={true}>
                        <ul className={styles.nestedDropdownList}>
                            <SidebarLink
                                icon={Warehouse}
                                text='Филиалы'
                                hasDropdown={true}
                                dropdownLinks={[
                                    { to: '#', text: 'Информация о филиале' },
                                    { to: '#', text: 'Путеводитель филиалов' },
                                    { to: '#', text: 'Матрица контактов франчайзи' },
                                ]}
                                isDropdownVisible={dropdownStates.warehouse}
                                onToggleDropdown={() => toggleDropdown('warehouse')} />

                            <SidebarLink
                                icon={Confluence}
                                text='Confluence'
                                hasDropdown={true}
                                dropdownLinks={[
                                    { to: '#', text: 'Продуктовая книга' },
                                    { to: '#', text: 'База знаний' },
                                ]}
                                isDropdownVisible={dropdownStates.confluence}
                                onToggleDropdown={() => toggleDropdown('confluence')} />

                            <SidebarLink
                                icon={World}
                                text='Сайты ПЭК'
                                hasDropdown={true}
                                dropdownLinks={[
                                    { to: '#', text: 'Маркетплейс ПЭК:МОЛЛ' },
                                    { to: '#', text: 'Корпоративный сайт' },
                                ]}
                                isDropdownVisible={dropdownStates.world}
                                onToggleDropdown={() => toggleDropdown('world')} />

                            <SidebarLink
                                icon={Jira}
                                text='Jira' />
                        </ul>
                    </SidebarLink>

                    <SidebarLink
                        icon={Feedback}
                        text='Обратная связь'
                        hasDropdown={true}
                        dropdownLinks={[
                            { to: '#', text: 'Опросы' },
                            { to: '#', text: 'Часто задаваемые вопросы' },
                            { to: '#', text: 'Заявка на новость' },
                            { to: '#', text: 'Нашли ошибку?' },
                        ]}
                        isDropdownVisible={dropdownStates.feedback}
                        onToggleDropdown={() => toggleDropdown('feedback')} />
                </ul>
            </div>
            <SidebarLink
                icon={Logout}
                text='Выход'
                onClick={handleLogoutClick} />
        </div>
    );
}

export default Sidebar;