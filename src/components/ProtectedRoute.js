import { Route, Redirect } from "react-router-dom";

function ProtectedRoute({ component: Component, ...props }) {
    return (
        <Route>
            {localStorage.token ? <Component {...props} /> : <Redirect to='/' />}
        </Route>
    )
}

export default ProtectedRoute;