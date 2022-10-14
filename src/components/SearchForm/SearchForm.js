import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import searchIcon from "../../images/search-icon.svg";
import { useState } from "react";

function SearchForm() {
    const [checked, setChecked] = useState(true);

    return (
        <section className="search-form">
            <form className="search-form__container">
                <div className="search-form__input-container">
                    <img className="search-form__icon" alt="Иконка лупы" src={searchIcon} />
                    <input 
                        className="search-form__input"
                        type="text"
                        placeholder="Фильм"
                        required
                    />
                </div>
                <button className="search-form__button opacity" type="submit"></button>
                
            </form>
            <FilterCheckbox 
                isOn={checked}
                handleToggle={() => setChecked(!checked)}
                colorOne="#2BE080"
                colorTwo="#EBEBEB"/>
        </section>
    )
}

export default SearchForm;
