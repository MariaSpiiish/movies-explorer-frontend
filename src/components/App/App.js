import { Switch, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Main from '../Main/Main';
import Navigation from '../Navigation/Navigation';
import PageNotFound from '../PageNotFound/PageNotFound';
import Profile from '../Profile/Profile';
import Movies from '../Movies/Movies';
import './App.css';
import { getMovies } from '../../utils/Api';
import SavedMovies from '../SavedMovies/SavedMovies';
import Register from '../Register/Register';
import Login from '../Login/Login';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const [cards, setCards] = useState([]);

  useEffect(() => {
    getMovies()
      .then((data) => {
        setCards(data);
        
      })
  }, [])

  // console.log(cards);

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <div className="page-container">
      <div className="page">
        <Switch>
          <Route exact path="/"><Main /></Route>
          <Route path="/movies"><Movies cards={cards} onMenu={setIsMenuOpen}/></Route>
          <Route path="/saved-movies"><SavedMovies cards={cards} onMenu={setIsMenuOpen}/></Route>
          <Route path="/profile"><Profile onMenu={setIsMenuOpen}/></Route>
          <Route path="/signin"><Login /></Route>
          <Route path="/signup"><Register /></Route>
          <Route path="*"><PageNotFound /></Route>
        </Switch>
        <Navigation onClose={closeMenu} isOpen={isMenuOpen}/>
      </div>
    </div>
  );
}

export default App;
