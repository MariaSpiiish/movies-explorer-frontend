function Portfolio() {
    return (
        <div className="portfolio">
            <h3 className="portfolio__title">Портфолио</h3>
            <ul className="portfolio__list">
                <li><a href="https://mariaspiiish.github.io/how-to-learn/" className="portfolio__link opacity" >Статичный сайт<span className="portfolio__link-arrow">&#8599;</span></a></li>
                <li><a href="https://mariaspiiish.github.io/russian-travel/" className="portfolio__link opacity" >Адаптивный сайт<span className="portfolio__link-arrow">&#8599;</span></a></li>
                <li><a href="https://marialapshina.students.nomoredomains.sbs/react-mesto-auth" className="portfolio__link opacity" >Одностраничное приложение<span className="portfolio__link-arrow">&#8599;</span></a></li>
            </ul>
        </div>
    );
}

export default Portfolio;
