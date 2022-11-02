function MoreButton({ onClick }) {
    return (
        <section className="more-button">
            <button type="button" className="more-button__button opacity" onClick={onClick}>Ещё</button>
        </section>

    )
}

export default MoreButton;
