function Portfolio() {
    return (
        <section className="portfolio">
            <h3 className="portfolio__title">Портфолио</h3>
            <ul className="portfolio__list">
                <li><a href="https://mariaspiiish.github.io/how-to-learn/" target="_blank" rel="noreferrer" className="portfolio__link opacity" >Статичный сайт<span className="portfolio__link-arrow">&#8599;</span></a></li>
                <li><a href="https://mariaspiiish.github.io/russian-travel/" target="_blank" rel="noreferrer" className="portfolio__link opacity" >Адаптивный сайт<span className="portfolio__link-arrow">&#8599;</span></a></li>
                <li><a href="https://marialapshina.students.nomoredomains.sbs/react-mesto-auth" target="_blank" rel="noreferrer" className="portfolio__link opacity" >Одностраничное приложение<span className="portfolio__link-arrow">&#8599;</span></a></li>
            </ul>
        </section>
    );
}

export default Portfolio;
