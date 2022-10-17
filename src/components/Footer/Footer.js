import { year } from '../../utils/constants';

function Footer() {
    return (
        <footer className="footer">
            <p className="footer__title">Учебный проект Яндекс.Практикум х BeatFilm.</p>
            <div className="footer__container">
                <div className="footer__date">&copy; {year}</div>
                <nav className="footer__nav">
                    <a className="footer__link opacity" href="https://practicum.yandex.ru/">Яндекс.Практикум</a>
                    <a className="footer__link opacity" href="https://github.com/">Github</a>
                </nav>
            </div>
        </footer>
    );
}

export default Footer;
