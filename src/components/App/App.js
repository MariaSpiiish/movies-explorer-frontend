import { Switch, Route } from 'react-router-dom';
import Main from '../Main/Main';
import PageNotFound from '../PageNotFound/PageNotFound';
import './App.css';

function App() {
  return (
    <div className="page-container">
      <div className="page">
        <Switch>
          <Route exact path="/"><Main /></Route>
          <Route path="/movies"></Route>
          <Route path="/saved-movies"></Route>
          <Route path="/profile"></Route>
          <Route path="/signin"></Route>
          <Route path="/signup"></Route>
          <Route path="*"><PageNotFound /></Route>
        </Switch>
      </div>
    </div>
  );
}

export default App;
