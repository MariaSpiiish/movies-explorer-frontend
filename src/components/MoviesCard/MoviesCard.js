import { useHistory } from 'react-router-dom';
import { getTimeFromMins } from '../../utils/utility-functions';


function MoviesCard({ link, name, duration, id}) {
    const time = getTimeFromMins(duration);
    const history = useHistory();
    return (
        <li className="movie-card">
            <img 
                src={link} 
                alt={name} 
                className="movie-card__image" 
                
            />
            <div className="movie-card__caption">
                <h2 className="movie-card__title">{name}</h2>
                {history.location.pathname === '/movies' ? <button type="button" className={ id%2 === 0 ? "movie-card__like opacity" : "movie-card__like movie-card__like_type_active opacity"}></button> : <button className="movie-card__delete"></button>}
                
                <p className="movie-card__duration">{time}</p>
                    
                
            </div>
        </li>
    );
}

export default MoviesCard;
