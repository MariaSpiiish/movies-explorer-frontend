import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Preloader from "../Preloader/Preloader";

function Movies({ movies, onSearch, isLoading, loadingError, notFoundMessage, onMovieAddRemove, isSaved }) {
    return (
        <main className="movies">
            <SearchForm onSearch={onSearch}/>

            {isLoading ? <Preloader /> : <MoviesCardList isSaved={isSaved} onMovieAddRemove={onMovieAddRemove} movies={movies} notFoundMessage={notFoundMessage}/>}

            {loadingError && <div>{loadingError}</div>}
            
        </main>
    );
}

export default Movies;
