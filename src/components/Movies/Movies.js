import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Preloader from "../Preloader/Preloader";

function Movies({
    movies,
    onSearch,
    isLoading,
    loadingError,
    notFoundMessage,
    onAdd,
    onRemove,
    savedMovies,
    prevCheckboxState,
    prevSearchQuery,
    movieLikeError,
    savedTMPMovies,
    isLoggedIn
}) {
    return (
        <main className="movies">
            <SearchForm loggedIn={isLoggedIn} onSearch={onSearch} prevCheckboxState={prevCheckboxState} prevSearchQuery={prevSearchQuery}/>

            {isLoading ? <Preloader /> : <MoviesCardList savedTMPMovies={savedTMPMovies} savedMovies={savedMovies} onAdd={onAdd} onRemove={onRemove} movies={movies} notFoundMessage={notFoundMessage}/>}

            {loadingError && <div>{loadingError}</div>}

            {notFoundMessage && <p>{notFoundMessage}</p>}

            {movieLikeError && <p>{movieLikeError}</p>}
            
        </main>
    );
}

export default Movies;
