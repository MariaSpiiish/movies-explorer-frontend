import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import searchIcon from "../../images/search-icon.svg";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";


function SearchForm({ onSearch, prevCheckboxState, prevSearchQuery, loggedIn }) {
    const location = useLocation();

    const [checked, setChecked] = useState(location.pathname === '/movies' ? prevCheckboxState : false);
    const [query, setQuery] = useState(location.pathname === '/movies' ? prevSearchQuery : '');

    useEffect(() => {
        if (location.pathname === '/movies') {
            setChecked(prevCheckboxState);
            setQuery(prevSearchQuery);
        } else {
            setChecked(false);
            setQuery('');
        }
    }, [loggedIn])

    const [error, setError] = useState('');

    const handleQuery = (evt) => {
        setQuery(evt.target.value)
    }
   
    const handleSubmit = (evt) => {
        evt.preventDefault();
        if (!query) {
            setError('Необходимо ввести ключевое слово')
        } else {
            onSearch(query, checked);
            setError('');
        }
    }

    const handleToggle = () => {
        if (!query) {
            setError('Необходимо ввести ключевое слово')
        } else {
        setChecked(!checked);
        onSearch(query, !checked);
        }
    }
    
    return (
        <section className="search-form">
            <form className="search-form__container" noValidate onSubmit={handleSubmit}>
                <div className="search-form__input-container">
                    <img className="search-form__icon" alt="Иконка лупы" src={searchIcon} />
                    <input 
                        className="search-form__input"
                        type="text"
                        placeholder="Фильм"
                        required
                        name="query"
                        value={query || ''}
                        onChange={handleQuery}
                    />
                    {error && <span className="search-form__error">{error}</span>}
                </div>
                <button className="search-form__button opacity" type="submit"></button>
                
            </form>
            <FilterCheckbox 
                isOn={checked}
                handleToggle={handleToggle}
                colorOne="#2BE080"
                colorTwo="#EBEBEB"
            />
            
        </section>
    )
}

export default SearchForm;
