import { useEffect } from "react";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";

function SavedMovies({ 
    movies,
    onRemove,
    savedMovies,
    onSearch,
    loadingError,
    notFoundMessage,
    prevCheckboxState,
    prevSearchQuery,
    saveMovies,
    isLoggedIn,
    setNotFoundMessage,
    savedTMPMovies
    }) {

        useEffect(() => {
            if(isLoggedIn) {
                saveMovies();
                setNotFoundMessage('')
            }
        }, [isLoggedIn])
        
    return (
        <main className="movies">
            <SearchForm loggedIn={isLoggedIn} onSearch={onSearch} prevCheckboxState={prevCheckboxState} prevSearchQuery={prevSearchQuery}/>
            <MoviesCardList movies={movies} onRemove={onRemove} savedMovies={savedMovies} notFoundMessage={notFoundMessage} savedTMPMovies={savedTMPMovies}/>
            {loadingError && <div>{loadingError}</div>}
            {notFoundMessage && <p>{notFoundMessage}</p>}
        </main>

    )
}

export default SavedMovies;
