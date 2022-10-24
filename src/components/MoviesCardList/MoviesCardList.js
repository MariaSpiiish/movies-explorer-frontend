import { useEffect, useState } from "react";
import MoviesCard from "../MoviesCard/MoviesCard";
import MoreButton from "../MoreButton/MoreButton";

function MoviesCardList({ movies, notFoundMessage, onMovieAddRemove, isSaved }) {
    const [isButtonActive, setIsButtonActive] = useState(false);
    const [moviesToRender, setMoviesToRender] = useState([]);
    const [moviesToAddCount, setMoviesToAddCount] = useState(0);
    const [movieCount, setMovieCount] = useState(0);
    let display = window.innerWidth;

    useEffect(() => {
        function countMovies() {
            if (display > 1070) {
                setMovieCount(12);
                setMoviesToAddCount(3);
            } else if (display > 600) {
                setMovieCount(8);
                setMoviesToAddCount(2);
            } else if (display < 600) {
                setMovieCount(5);
                setMoviesToAddCount(2);
            }
        }
        countMovies();
    }, [display])

    useEffect(() => {
        setMoviesToRender(movies.slice(0, movieCount));
          if (movies.length <= movieCount) {
            setIsButtonActive(false);
          } else {
            setIsButtonActive(true);
          }
    }, [movies, movieCount]);

    const renderMoreMovies = () => {
        setMoviesToRender(movies.slice(0, moviesToRender.length + moviesToAddCount))
        if (moviesToRender.length >= movies.length - moviesToAddCount) {
            setIsButtonActive(false);
        }
    }

    return (
        <section className="movies-list">
            {movies.length === 0 ?
                <p className="movies-list__not-found-message">{notFoundMessage}</p> :
                <ul className="movies-list__items">
                    {moviesToRender.map((movie) => (
                        <MoviesCard 
                            key={movie.movieId}
                            movieId={movie.movieId}
                            image={movie.image}
                            name={movie.nameRU}
                            duration={movie.duration}
                            trailerLink={movie.trailerLink}
                            onMovieAddRemove={onMovieAddRemove}
                            movie={movie}
                            isSaved={isSaved}
                        />
                    ))}
                </ul>
            }
            {isButtonActive && <MoreButton onClick={renderMoreMovies}/>}
        </section>
    )
}

export default MoviesCardList;
