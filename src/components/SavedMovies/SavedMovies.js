import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";

function SavedMovies({ cards }) {
    return (
        <main className="movies">
            <SearchForm />
            <MoviesCardList cards={cards} />
        </main>

    )
}

export default SavedMovies;
