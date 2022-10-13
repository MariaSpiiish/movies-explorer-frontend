import Header from "../Header/Header";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";
import MoreButton from "../MoreButton/MoreButton";
import Preloader from "../Preloader/Preloader";

function Movies({ onMenu, cards }) {
    return (
        <div className="movies">
            <Header onMenu={onMenu}/>
            <SearchForm />
            <Preloader />
            <MoviesCardList cards={cards}/>
            <MoreButton />
            <Footer />
        </div>
    );
}

export default Movies;
