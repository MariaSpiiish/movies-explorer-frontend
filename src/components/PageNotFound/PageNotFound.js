import {useHistory} from 'react-router-dom';

function PageNotFound() {
    const history = useHistory();

    return (
        <section className="not-found">
            <div className="not-found__message">
                <h1 className="not-found__title">404</h1>
                <p className="not-found__text">Страница не найдена</p>
            </div>
            <button className="not-found__link-back opacity" onClick={() => history.goBack()}>Назад</button>
        </section>
    )
}

export default PageNotFound;
