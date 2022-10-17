function FilterCheckbox({ isOn, handleToggle, colorOne, colorTwo }) {
    return (
        <div className="checkbox">
            <input
                checked={isOn}
                onChange={handleToggle}
                className="checkbox__type_invisible"
                id={`switch`}
                type="checkbox"
            />
            <label 
                style={{ background: isOn ? colorOne : colorTwo }}
                className="checkbox__label"
                htmlFor={`switch`}
            >
                <span className="checkbox__type_visible" />
            </label>
            <h3 className="checkbox__label-text">Короткометражки</h3>
        </div>
    )
}

export default FilterCheckbox;
