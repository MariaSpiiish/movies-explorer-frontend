import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import searchIcon from "../../images/search-icon.svg";

function SearchForm() {
    return (
        <div className="search-form">
            <form className="search-form__container">
                <div className="search-form__input-container">
                    <img className="search-form__icon" alt="Иконка лупы" src={searchIcon} />
                    <input className="search-form__input" type="text" placeholder="Фильм"/>
                </div>
                <button className="search-form__button" type="submit"></button>
                
            </form>
            <FilterCheckbox />
        </div>
    )
}

export default SearchForm;
