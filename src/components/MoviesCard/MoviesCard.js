import { useHistory } from 'react-router-dom';
import { getTimeFromMins } from '../../utils/utility-functions';

const openInNewTab = (url) => {
    const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
    if (newWindow) newWindow.opener = null
};

function MoviesCard({ image, name, duration, trailerLink, onMovieAddRemove, movie, isSaved }) {
    const time = getTimeFromMins(duration);
    const history = useHistory();


    const saved = isSaved(movie);
   

    function handleLikeClick(e) {
        e.preventDefault(e);
        onMovieAddRemove(movie, saved); 
    }

    return (
        <li className="movie-card">
            <img 
                src={image} 
                alt={name} 
                className="movie-card__image" 
                onClick={() => {openInNewTab(trailerLink)}}
            />
            <div className="movie-card__caption">
                <h2 className="movie-card__title">{name}</h2>
                {history.location.pathname === '/movies' 
                    ? <button 
                        type="button"
                        onClick={handleLikeClick}
                        className={saved ? "movie-card__like movie-card__like_type_active opacity" : "movie-card__like opacity"
                        }></button>
                    : <button className="movie-card__delete" onClick={handleLikeClick}></button>}
                
                <p className="movie-card__duration">{time}</p>
                    
                
            </div>
        </li>
    );
}

export default MoviesCard;
