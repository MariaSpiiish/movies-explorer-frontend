import { Switch, Route, useHistory } from 'react-router-dom';
import { useEffect, useState } from 'react';

import './App.css';

import { CurrentUserContext } from '../../context/CurrentUserContext';

import { auth } from '../../utils/Auth';
import { getAllMovies } from '../../utils/MoviesApi';
import { getUserInfo, patchUserInfo, getSavedMovies, postSavedMovie, deleteSavedMovie } from '../../utils/MainApi';

import Main from '../Main/Main';
import Navigation from '../Navigation/Navigation';
import PageNotFound from '../PageNotFound/PageNotFound';
import Profile from '../Profile/Profile';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import ProtectedRoute from '../ProtectedRoute';

function App() {
  const [currentUser, setCurrentUser] = useState({name: '', email: ''});
  const [userEmail, setUserEmail] = useState('');
  const [userName, setUserName] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const history = useHistory();
  const [registrationResult, setRegistrationResult] = useState(true);

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const [allMovies, setAllMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [savedMovies, setSavedMovies] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  const [loadingError, setLoadingError] = useState('');
  const [notFoundMessage, setNotFoundMessage] = useState('');
  const [isEditUserSuccessful, setIsEditUserSuccessful] = useState(false);
  const [isEditUserFail, setIsEditUserFail] = useState(false);

  const token = localStorage.getItem('token');

  useEffect(() => {
    const checkToken = () => {
        const token = localStorage.getItem('token');
        if(token) {
          auth.getToken(token)
            .then((res) => {
              const {email, name} = res;
              setUserEmail(email);
              setUserName(name);
              setIsLoggedIn(true);
              history.push("/movies");
            })
            .catch((err) => {
              console.log(`Что-то не так с токеном: ${err}`);
            });
        }
    }
    checkToken();
  }, [history]);

  useEffect(() => {
    if(isLoggedIn) {
      Promise.all([getUserInfo(token), getAllMovies(), getSavedMovies(token)])
        .then(([user, allmovies, savedmovies]) => {
          setCurrentUser(user);
          const movies = allmovies.map((movie) => {
            return {
              country: movie.country,
              director: movie.director,
              duration: movie.duration,
              year: movie.year,
              description: movie.description,
              image: `https://api.nomoreparties.co${movie.image.url}`,
              trailerLink: movie.trailerLink,
              thumbnail: `https://api.nomoreparties.co${movie.image.formats.thumbnail.url}`,
              movieId: movie.id,
              nameRU: movie.nameRU,
              nameEN: movie.nameEN,
            }
          })
          setAllMovies(movies);
          localStorage.setItem('savedMovies', JSON.stringify(savedmovies))
          setSavedMovies(savedmovies);
          history.push("/movies");
        })
        .catch((err) => {
          setLoadingError('Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз');
          console.log(`Ошибка загрузки пользователя и карточек ${err}`);
        });
    }
  }, [isLoggedIn, history, token]);

  const handleRegistration = (data) => {
    auth.register(data.email, data.password, data.name)
        .then((res) => {
            if(res) {
              setRegistrationResult(true);
              setIsLoggedIn(true);
              history.push("/movies");
            }
        })
        .catch((err) => {
          setRegistrationResult(false)
          console.log(`Ошибка в регистрации пользователя: ${err}`);
        });
  }

  const handleLogin = (data) => {
    auth.authorize(data.email, data.password)
      .then((res) => {
          if (res.token){
              localStorage.setItem('token', res.token);
              setIsLoggedIn(true);
              setUserEmail(data.email);
              history.push("/movies");
          }
      })
      .catch((err) => {
        setRegistrationResult(false)
        console.log(`Пользователь не найден: ${err}`);
      });
  }

  const filterMovies = (movie, searchQuery, checked) => {
    if (searchQuery) {
      const regex = new RegExp(searchQuery, 'i');
      const filteredData = movie.filter((item) => regex.test(item.nameRU) || regex.test(item.nameEN));
      if (filteredData.length === 0) {
        setNotFoundMessage('Ничего не найдено');
      }
      if (checked) {
        const shortMovies = filteredData.filter((item) => item.duration <= 40);
        return shortMovies;
      } else {
        return filteredData;
      }
    } 
    return [];
  };

  const handleSearch = (searchQuery, checked) => {
    setIsLoading(true);
    setTimeout(() => {
      setFilteredMovies(filterMovies(allMovies, searchQuery, checked));  
      setIsLoading(false);
    }, 600);
  };

  function handleSavedMoviesSearch(searchQuery, checked) {
    const storageSavedMovies = JSON.parse(localStorage.getItem('savedMovies'))
    setSavedMovies(filterMovies(storageSavedMovies, searchQuery, checked));
  }

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  function handleMovieLike(movie) {
    postSavedMovie(movie)
      .then((res) => {
        setSavedMovies([...savedMovies, {...res}]);
      })
      .catch((err) => {
        console.log(`Ошибка в постановке лайка: ${err}`);
      });
  }

  function handleMovieDelete(movie) {
    console.log(movie)
    const movieId = savedMovies.find((item) => item.movieId === movie.movieId)._id;
    deleteSavedMovie(movieId)
      .then((res) => {
        setSavedMovies(stateMovies => stateMovies.filter((m) => {
          return m.movieId !== movie.movieId
        }))
        console.log(res)
      })
      .catch((err) => {
        console.log(`Ошибка в постановке лайка: ${err}`);
      });
  }

  const isSaved = (movie) => {
    return savedMovies.some((m) => m.movieId === movie.movieId)
  };

  const savedMovieHandler = (movie, isLiked) => (isLiked ? handleMovieDelete(movie) : handleMovieLike(movie));

  const handleUpdateUser = (currentUser) => {
    console.log(currentUser)
    patchUserInfo(currentUser)
      .then((userInfo) => {
        setCurrentUser(userInfo);
        setIsEditUserSuccessful(true);
      })
      .catch((err) => {
        setIsEditUserFail(true);
        console.log(`Ошибка в обновлении данных пользователя: ${err}`);
      });
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page-container">
        <div className="page">

          <Route exact path={['/movies', '/saved-movies', '/profile']}>
            <Header onMenu={setIsMenuOpen}/>
          </Route>

          <Switch>
            <Route exact path="/">
              <Main />
            </Route>

            <ProtectedRoute 
              path="/movies"
              onMenu={setIsMenuOpen}
              movies={filteredMovies}
              onSearch={handleSearch}
              isLoading={isLoading}
              loadingError={loadingError}
              notFoundMessage={notFoundMessage}
              component={Movies}
              isLoggedIn={isLoggedIn}
              onMovieAddRemove={savedMovieHandler}
              isSaved={isSaved}
            />

            <ProtectedRoute 
              path="/saved-movies"
              movies={savedMovies}
              component={SavedMovies}
              isLoggedIn={isLoggedIn}
              onMovieAddRemove={savedMovieHandler}
              isSaved={isSaved}
              onSearch={handleSavedMoviesSearch}
              isLoading={isLoading}
              loadingError={loadingError}
              notFoundMessage={notFoundMessage}
            />

            <ProtectedRoute 
              path="/profile"
              component={Profile}
              userEmail={userEmail}
              userName={userName}
              onUpdateUser={handleUpdateUser}
              isLoggedIn={isLoggedIn}
              isEditUserSuccessful={isEditUserSuccessful}
              isEditUserFail={isEditUserFail}
            />

            <Route path="/signin">
              <Login registrationResult={registrationResult} onLogin={handleLogin}/>
            </Route>

            <Route path="/signup">
              <Register registrationResult={registrationResult} onRegister={handleRegistration}/>
            </Route>

            <Route path="*"><PageNotFound /></Route>

          </Switch>

          <Route exact path={['/', '/movies', '/saved-movies', '/profile']}>
            <Footer />
          </Route>
          
          <Navigation onClose={closeMenu} isOpen={isMenuOpen}/>
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
