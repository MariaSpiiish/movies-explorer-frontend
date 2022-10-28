import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getTimeFromMins } from '../../utils/utility-functions';

const openInNewTab = (url) => {
    const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
    if (newWindow) newWindow.opener = null
};

function MoviesCard({ image, name, duration, trailerLink, onAdd, onRemove, movie, savedMovies, savedTMPMovies }) {
    const time = getTimeFromMins(duration);
    const location = useLocation();

    const [isLiked, setIsLiked] = useState(false);

    function handleLike() {
        setIsLiked(true);
        onAdd(movie, setIsLiked);
    }

    function handleDelete () {
        setIsLiked(false)
        onRemove(movie); 
    }

    function handleClick() {
        isLiked ? handleDelete() : handleLike()
    }

    function checkLike() {
        if(savedTMPMovies) {
            if(!isLiked) {
                const someMovie = savedTMPMovies.find((stateMovie) => stateMovie.movieId === movie.movieId);
                if(someMovie) {
                    setIsLiked(true);
                } else {
                    setIsLiked(false);
                }
            }
        }
    }

    useEffect(() => {
        location.pathname === '/movies' ? checkLike() : setIsLiked(true)
    }, [])

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
                {location.pathname === '/movies' 
                    ? <button 
                        type="button"
                        onClick={handleClick}
                        className={isLiked ? "movie-card__like movie-card__like_type_active opacity" : "movie-card__like opacity"
                        }></button>
                    : <button className="movie-card__delete" onClick={handleClick}></button>}
                
                <p className="movie-card__duration">{time}</p>
                    
                
            </div>
        </li>
    );
}

export default MoviesCard;
