import LandingSectionTitle from "../LandingSectionTitle/LandingSectionTitle";
import { skills } from "../../utils/constants";

function Techs() {
    return (
        <section className="techs" id="tech">
            <LandingSectionTitle title={'Технологии'} />
            <div className="techs__info-container">
                <h3 className="techs__title">7 технологий</h3>
                <p className="techs__info">На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.</p>
            </div>
            <ul className="techs__skills-container">{
                skills.map((item, i) => (
                    <li className="techs__skills" key={i}>{item}</li>
                ))
            }
            </ul>
        </section>
    );
}

export default Techs;