import LandingSectionTitle from "../LandingSectionTitle/LandingSectionTitle";
import photo from "../../images/profile-photo.jpg";

function AboutMe() {
    return (
        <section className="about-me" id="student">
            <LandingSectionTitle title={'Студент'} />
            <div className="about-me__student-info-container">
                <div className="about-me__text-container">
                    <h3 className="about-me__name">Мария</h3>
                    <h4 className="about-me__job">Фронтенд-разработчик, 31 год</h4>
                    <p className="about-me__info">Родилась в Ижевске, закончила факультет иностранных языков УдГУ. 9 лет проработала учителем английского языка в лицее. Люблю читать книги в оригинале на английском, ходить в горы и провожать закат из палатки. В прошлом году ушла с постоянного места работы, стала самозанятым репетитором. Прошла курс по веб-разработке, поняла, что это моё. Стремлюсь попасть в команду разработчиков и творить.</p>
                    <a className="about-me__link opacity" href="https://github.com/MariaSpiiish">Github</a>
                </div>
                <img className="about-me__pic" src={photo} alt="Фото профиля" />
            </div>
        </section>
    );
}

export default AboutMe;