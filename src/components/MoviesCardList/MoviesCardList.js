import MoviesCard from "../MoviesCard/MoviesCard";

function MoviesCardList({ cards }) {
    const slicedCards = cards.slice(0, 12);
    return (
        <section className="movies-list">
            <ul className="movies-list__items">
                {slicedCards.map((card) => (
                    <MoviesCard 
                        key={card.id}
                        id={card.id}
                        link={`https://api.nomoreparties.co/${card.image.url}`}
                        name={card.nameRU}
                        duration={card.duration}  
                    />
                ))}
            </ul>
        </section>
    )
}

export default MoviesCardList;
