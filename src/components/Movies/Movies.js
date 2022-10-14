import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import MoreButton from "../MoreButton/MoreButton";
import Preloader from "../Preloader/Preloader";

function Movies({ cards }) {
    return (
        <main className="movies">
            <SearchForm />
            <Preloader />
            <MoviesCardList cards={cards}/>
            <MoreButton />
        </main>
    );
}

export default Movies;
