import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";

function SavedMovies({ cards, onMenu}) {
    return (
        <div className="movies">
            <Header onMenu={onMenu}/>
            <SearchForm />
            <MoviesCardList cards={cards} />
            <Footer />
        </div>

    )
}

export default SavedMovies;
