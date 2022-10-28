import { Switch, Route, useHistory, useLocation } from 'react-router-dom';
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
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const history = useHistory();
  const location = useLocation();
  const [registrationResult, setRegistrationResult] = useState('');

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const [allMovies, setAllMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [savedMovies, setSavedMovies] = useState([]);
  const [savedTMPMovies, setSavedTMPMovies] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  const [loadingError, setLoadingError] = useState('');
  const [notFoundMessage, setNotFoundMessage] = useState('');
  const [isEditUserSuccessful, setIsEditUserSuccessful] = useState(false);
  const [isEditUserFail, setIsEditUserFail] = useState(false);
  const [prevSearchQuery, setPrevSearchQuery] = useState('');
  const [prevCheckboxState, setPrevCheckboxState] = useState(false);

  const [movieLikeError, setMovieLikeError] = useState();

  const token = localStorage.getItem('token');

  useEffect(() => {
    const checkToken = () => {
        const token = localStorage.getItem('token');
        if(token) {
          auth.getToken(token)
            .then((res) => {
              setIsLoggedIn(true);
            })
            .catch((err) => {
              localStorage.removeItem('token')
              console.log(`Что-то не так с токеном: ${err}`);
              history.push('/');
            });
        }
    }
    checkToken();
  }, []);

  function saveMovies() {
    getSavedMovies(token)
      .then((movies) => {
        localStorage.setItem('savedMovies', JSON.stringify(movies))
        setSavedMovies(movies);
        setSavedTMPMovies(movies);
      })
      .catch((err) => console.log(err))
  }

  useEffect(() => {
    if(isLoggedIn) {
      getUserInfo(token)
       .then((user) => {
          setCurrentUser(user);
       })
       .catch((err) => console.log(err));
    }

    saveMovies();

  }, [isLoggedIn, token])

  useEffect(() => {
    if(isLoggedIn) {
      getAllMovies()
        .then((allmovies) => {
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
          localStorage.setItem('allMovies', JSON.stringify(movies));
          setAllMovies(movies);
        })
        .catch(err => console.log(err))
      }
  }, [isLoggedIn])

  const handleRegistration = (name, email, password) => {
    auth.register(name, email, password)
        .then((res) => {
            if(res) {
              handleLogin(email, password);
              setRegistrationResult('');
            }
        })
        .catch((err) => {
          setRegistrationResult('Во время запроса произошла ошибка. \n Возможно, проблема с соединением или сервер недоступен. \n Подождите немного и попробуйте ещё раз')
          console.log(`Ошибка в регистрации пользователя: ${err}`);
        });
  }

  const handleLogin = (email, password) => {
    auth.authorize(email, password)
      .then((res) => {
          if (res.token){
              localStorage.setItem('token', res.token);
              setIsLoggedIn(true);
              history.push("/movies");
              setRegistrationResult('');
          }
      })
      .catch((err) => {
        if (err === 401) {
          setRegistrationResult('Неверные логин или пароль');
        } else if (err === 400) {
          setRegistrationResult('Пользователь не найден');
        } else {
          console.log(err);
        }
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
        const longMovies = filteredData.filter((item) => item.duration >= 40);
        return longMovies;
      }
    } 
    return [];
  };

  const handleSearch = (searchQuery, checked) => {
    setIsLoading(true);
    setNotFoundMessage('');

    localStorage.setItem("searchQuery", searchQuery);
    localStorage.setItem("checkbox", checked);

    if(!localStorage.allMovies) {
      getAllMovies()
        .then((allmovies) => {
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
          localStorage.setItem('allMovies', JSON.stringify(movies));
          setAllMovies(movies);
          setTimeout(() => {
            setFilteredMovies(filterMovies(allMovies, searchQuery, checked));
            localStorage.setItem("filteredMovies", JSON.stringify(filteredMovies)); 
            setIsLoading(false);
          }, 600);
        })
        .catch((err) => {
          setLoadingError('Во время запроса произошла ошибка. \n Возможно, проблема с соединением или сервер недоступен. \n Подождите немного и попробуйте ещё раз');
          console.log(`Ошибка загрузки всех карточек ${err}`);
        });  
      
    } else {
      setTimeout(() => {
        const movies = JSON.parse(localStorage.getItem("allMovies"));
        const filteredm = filterMovies(movies, searchQuery, checked);
        setFilteredMovies(filteredm);
        localStorage.setItem("filteredMovies", JSON.stringify(filteredm)); 
        setIsLoading(false);
      }, 600);
    }
  };

  function handleSavedMoviesSearch(searchQuery, checked) {
    setNotFoundMessage('');

    setSavedMovies(filterMovies(savedTMPMovies, searchQuery, checked));
  }

  useEffect(() => {
      if (localStorage.filteredMovies === "undefined") {
        setFilteredMovies([]);
      } else {
        setFilteredMovies(JSON.parse(localStorage.getItem("filteredMovies")));
      }
      if (localStorage.searchQuery) {
        setPrevSearchQuery(localStorage.getItem("searchQuery"));
      }
      if (localStorage.checkbox) {
        let myString = localStorage.checkbox;
        let boolOutput = myString.toLowerCase() === 'true' ? true : false;
        setPrevCheckboxState(boolOutput);
      }
  }, [location])

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  function handleMovieLike(movie, setIsLiked) {
    const valid = /^(http|https):\/\/[^ "]+$/.test(movie.trailerLink);

    if (!valid || !movie.nameEN) {
      setMovieLikeError('Не удаётся сохранить этот фильм, поле trailerLink невалидное или нет английского названия');
      setIsLiked(false);
    }
    
    postSavedMovie(movie)
      .then((res) => {
        setSavedMovies([...savedMovies, {...res}]);
        setSavedTMPMovies([...savedTMPMovies, {...res}])
      })
      .catch((err) => {
        console.log(`Ошибка в постановке лайка: ${err}`);
      });
  }

  function handleMovieDelete(movie) {
    const movieId = savedTMPMovies.find((item) => item.movieId === movie.movieId)._id;
    deleteSavedMovie(movieId)
      .then((res) => {
        setSavedMovies(stateMovies => stateMovies.filter((m) => {
          return m.movieId !== movie.movieId
        }))
        setSavedTMPMovies(stateMovies => stateMovies.filter((m) => {
          return m.movieId !== movie.movieId
        }))
      })
      .catch((err) => {
        console.log(`Ошибка в постановке лайка: ${err}`);
      });
  }

  const handleUpdateUser = (name, email) => {
    patchUserInfo(name, email)
      .then((userInfo) => {
        setCurrentUser(userInfo);
        setIsEditUserSuccessful(true);
      })
      .catch((err) => {
        setIsEditUserFail(true);
        console.log(`Ошибка в обновлении данных пользователя: ${err}`);
      });
  }

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('currentUser');
    localStorage.removeItem('allMovies');
    localStorage.removeItem('filteredMovies');
    localStorage.removeItem('checkbox');
    localStorage.removeItem('searchQuery');
    setIsLoggedIn(false);
    setCurrentUser({});
    setPrevCheckboxState(false);
    setPrevSearchQuery('');
    setAllMovies([]);
    setSavedMovies([]);
    setSavedTMPMovies([]);
    setFilteredMovies([]);

    history.push('/');
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page-container">
        <div className="page">

        <Route exact path={['/', '/movies', '/saved-movies', '/profile']}>
            <Header onMenu={setIsMenuOpen} isLoggedIn={isLoggedIn}/>
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
              onAdd={handleMovieLike}
              onRemove={handleMovieDelete}
              savedMovies={savedMovies}
              prevCheckboxState={prevCheckboxState}
              prevSearchQuery={prevSearchQuery}
              movieLikeError={movieLikeError}
              savedTMPMovies={savedTMPMovies}
            />

            <ProtectedRoute 
              path="/saved-movies"
              movies={savedMovies}
              component={SavedMovies}
              isLoggedIn={isLoggedIn}
              onRemove={handleMovieDelete}
              savedMovies={savedMovies}
              onSearch={handleSavedMoviesSearch}
              notFoundMessage={notFoundMessage}
              prevCheckboxState={prevCheckboxState}
              prevSearchQuery={prevSearchQuery}
              saveMovies={saveMovies}
              setNotFoundMessage={setNotFoundMessage}
              savedTMPMovies={savedTMPMovies}
            />

            <ProtectedRoute 
              path="/profile"
              component={Profile}
              onUpdateUser={handleUpdateUser}
              onLogout={handleLogout}
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
