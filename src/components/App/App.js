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
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import AuthHeader from '../AuthHeader/AuthHeader';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const [cards, setCards] = useState([]);

  useEffect(() => {
    getMovies()
      .then((data) => {
        setCards(data);
        
      })
  }, [])

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <div className="page-container">
      <div className="page">
        <Switch>
          <Route exact path="/">
            <Main />
            <Footer />
          </Route>

          <Route path="/movies">
            <Header onMenu={setIsMenuOpen}/>
            <Movies cards={cards} />
            <Footer />
          </Route>

          <Route path="/saved-movies">
            <Header onMenu={setIsMenuOpen}/>
            <SavedMovies cards={cards} />
            <Footer />
          </Route>

          <Route path="/profile">
            <Header onMenu={setIsMenuOpen}/>
            <Profile />
            <Footer />
          </Route>

          <Route path="/signin">
            <AuthHeader title="Рады видеть!"/>
            <Login />
          </Route>

          <Route path="/signup">
            <AuthHeader title="Добро пожаловать!" />
            <Register />
          </Route>

          <Route path="*"><PageNotFound /></Route>
        </Switch>
        
        <Navigation onClose={closeMenu} isOpen={isMenuOpen}/>
      </div>
    </div>
  );
}

export default App;
