import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import searchIcon from "../../images/search-icon.svg";
import { useEffect, useState } from "react";
import useFormWithValidation from "../../hooks/useFormWithValidation";

function SearchForm({ onSearch }) {
    const [checked, setChecked] = useState(true);

    const { values, handleChange, resetForm } = useFormWithValidation();

    const [error, setError] = useState('');

    const handleSubmit = (evt) => {
        evt.preventDefault();
        if (!values.query) {
            setError('Необходимо ввести ключевое слово')
        } else {
            onSearch(values.query, checked);
            resetForm();
            setError('');
        }
    }

    useEffect(() => {
        resetForm();
    }, [resetForm])

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
                        value={values.query || ''}
                        onChange={handleChange}
                    />
                    {error && <span className="search-form__error">{error}</span>}
                </div>
                <button className="search-form__button opacity" type="submit"></button>
                
            </form>
            <FilterCheckbox 
                isOn={checked}
                handleToggle={() => setChecked(!checked)}
                colorOne="#2BE080"
                colorTwo="#EBEBEB"
            />
            
        </section>
    )
}

export default SearchForm;
