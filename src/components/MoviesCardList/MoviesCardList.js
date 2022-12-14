import { useEffect, useState } from "react";
import MoviesCard from "../MoviesCard/MoviesCard";
import MoreButton from "../MoreButton/MoreButton";

function MoviesCardList({ movies, onAdd, onRemove, savedMovies, savedTMPMovies }) {
    const [isButtonActive, setIsButtonActive] = useState(false);
    const [moviesToRender, setMoviesToRender] = useState([]);
    const [moviesToAddCount, setMoviesToAddCount] = useState(0);
    const [movieCount, setMovieCount] = useState(0);
    
    let display = window.innerWidth;
    
    useEffect(() => {
        function countMovies() {
            if (display >= 1070) {
                setMovieCount(12);
                setMoviesToAddCount(3);
            } else if (display >= 600) {
                setMovieCount(8);
                setMoviesToAddCount(2);
            } else if (display < 600) {
                setMovieCount(5);
                setMoviesToAddCount(2);
            }
        }
        countMovies();
    }, [])

    useEffect(() => {
        if (movies === null) {
            setMoviesToRender([]);
        } else {
            setMoviesToRender(movies.slice(0, movieCount));
            if (movies.length <= movieCount) {
                setIsButtonActive(false);
            } else {
                setIsButtonActive(true);
            }
        }
    }, [movies, movieCount]);

    const renderMoreMovies = () => {
        display = window.innerWidth;
        
        if (display >= 1070) {
            if (Math.round((moviesToRender.length % 3) === 1)) {
                setMoviesToRender(movies.slice(0, moviesToRender.length + 2));
            } else if (Math.round((moviesToRender.length % 3) === 2)) {
                setMoviesToRender(movies.slice(0, moviesToRender.length + 1));
            } else {
                setMoviesToRender(movies.slice(0, moviesToRender.length + 3));
            }
        } else if (display < 1070 && display > 600) {
            if (Math.round((moviesToRender.length % 2) !== 0)) {
                setMoviesToRender(movies.slice(0, moviesToRender.length + 1))
            } else {
                setMoviesToRender(movies.slice(0, moviesToRender.length + 2));
            }       
        } else {
            setMoviesToRender(movies.slice(0, moviesToRender.length + 2));
        }
        
        if (moviesToRender.length >= movies.length - moviesToAddCount) {
            setIsButtonActive(false);
        }
    }

    return (
        <section className="movies-list">
                <ul className="movies-list__items">
                    {moviesToRender.map((movie) => (
                        <MoviesCard 
                            key={movie.movieId}
                            movieId={movie.movieId}
                            image={movie.image}
                            name={movie.nameRU}
                            duration={movie.duration}
                            trailerLink={movie.trailerLink}
                            onAdd={onAdd}
                            onRemove={onRemove}
                            movie={movie}
                            savedMovies={savedMovies}
                            savedTMPMovies={savedTMPMovies}
                        />
                    ))}
                </ul>
            {isButtonActive && <MoreButton onClick={renderMoreMovies}/>}
        </section>
    )
}

export default MoviesCardList;
