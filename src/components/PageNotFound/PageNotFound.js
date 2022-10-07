import {Link} from 'react-router-dom';

function PageNotFound() {
    return (
        <div className="not-found">
            <div className="not-found__message">
                <h1 className="not-found__title">404</h1>
                <p className="not-found__text">Страница не найдена</p>
            </div>
            <Link className="not-found__link-back opacity" to="/">Назад</Link>
        </div>
    )
}

export default PageNotFound;
