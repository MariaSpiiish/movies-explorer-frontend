function NavTab() {
    return (
        <nav className="menu">
            <ul className="menu__list">
                <li><a href="#about-project" className="menu__link opacity">О проекте</a></li>
                <li><a href="#tech" className="menu__link opacity">Технологии</a></li>
                <li><a href="#student" className="menu__link opacity">Студент</a></li>
            </ul>
        </nav>
    );
}

export default NavTab;