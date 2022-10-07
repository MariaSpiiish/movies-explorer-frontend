import LandingSectionTitle from "../LandingSectionTitle/LandingSectionTitle";

function AboutProject() {
    return (
        <div className="about" id="about-project">
            <LandingSectionTitle title={'О проекте'} />
            <div className="about__info-container">
                <h3 className="about__info-title">Дипломный проект включал 5 этапов</h3>
                <p className="about__info">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
                <h3 className="about__info-title">На выполнение диплома ушло 5 недель</h3>
                <p className="about__info">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
            </div>
            <div className="about__visual-container">
                <div className="about__visual">1 неделя</div>
                <div className="about__visual">4 недели</div>
                <p className="about__visual-caption">Back-end</p>
                <p className="about__visual-caption">Front-end</p>
            </div>
        </div>
    );
}

export default AboutProject;
