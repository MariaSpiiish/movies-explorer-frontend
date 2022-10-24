import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";

function SavedMovies({ movies, onMovieAddRemove, isSaved, onSearch, isLoading, loadingError, notFoundMessage }) {
    return (
        <main className="movies">
            <SearchForm onSearch={onSearch}/>
            <MoviesCardList movies={movies} onMovieAddRemove={onMovieAddRemove} isSaved={isSaved} notFoundMessage={notFoundMessage}/>
            {loadingError && <div>{loadingError}</div>}
        </main>

    )
}

export default SavedMovies;
