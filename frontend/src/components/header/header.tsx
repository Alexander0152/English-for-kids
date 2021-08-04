import React, { FunctionComponent, useEffect, useRef } from 'react';
import './header.css';
import { useDispatch, useSelector } from 'react-redux';
import { changeGameMode } from '../../businessLayer/actions/gameActions';
import { gameMods, serverPath } from '../../businessLayer/gameConfig';
import { HashRouter as Router, Link, Route, useLocation } from 'react-router-dom';
import { RegistrationForm } from '../registrationForm/registrationForm';
import { RootReducerState } from '../../businessLayer/reducers/rootReducer';
import { changeIsAuthorize } from '../../businessLayer/actions/authorizeAction';
import EntityCard from '../../businessLayer/entityCard';

export const Header: FunctionComponent = () => {
  const [displayCards, setCards] = React.useState<EntityCard[]>([]);

  const [menuBar, setMenuBar] = React.useState({ menuBtnClass: '', menuBarClass: '' });
  const [location, setLocation] = React.useState<string>('/');

  const loc = useLocation();

  const showMenu = () => {
    menuBar.menuBarClass === 'menu-show'
      ? setMenuBar({ menuBtnClass: '', menuBarClass: '' })
      : setMenuBar({ menuBtnClass: 'button-open', menuBarClass: 'menu-show' });
  };

  const gameMode = useSelector<RootReducerState, RootReducerState['gameMode']['mode']>(
    (state) => state.gameMode.mode,
  );

  const isAuthorized = useSelector<RootReducerState, RootReducerState['authorize']['isAuthorized']>(
    (state) => state.authorize.isAuthorized,
  );

  const dispatch = useDispatch();

  const onChangeGameMode = () => {
    let mode: string;
    if (gameMode === gameMods.GAME) {
      mode = gameMods.TRAIN;
      dispatch(changeGameMode(mode));
      return;
    }
    gameMode === gameMods.TRAIN ? (mode = gameMods.READY_TO_START) : (mode = gameMods.TRAIN);
    dispatch(changeGameMode(mode));
  };

  const logOut = () => {
    dispatch(changeIsAuthorize(false));
  };

  const onNavigate = (path: string) => {
    if (gameMode === gameMods.GAME) {
      const mode = gameMods.READY_TO_START;
      dispatch(changeGameMode(mode));
    }

    setLocation(path);
  };

  useEffect(() => {
    const parts = window.location.href.split('/');
    const result = parts[parts.length - 1];
    setLocation(result);
  }, [loc]);

  const closeMenuOutside = (
    ref: React.MutableRefObject<HTMLDivElement> | React.MutableRefObject<null>,
  ) => {
    useEffect(() => {
      function handleClickOutside(event: Event) {
        if (
          ref.current &&
          !ref.current.contains(event.target as Node) &&
          menuBar.menuBarClass !== 'menu-show'
        ) {
          setMenuBar({ menuBtnClass: '', menuBarClass: '' });
        }
      }
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [ref]);
  };

  const getCards = (): void => {
    const cards: EntityCard[] = [];

    useEffect(() => {
      fetch(`${serverPath}/cards?category=category`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      }).then((res: Response) =>
        res.json().then((value: { cards: EntityCard[] }) => {
          for (let i = 0; i < value.cards.length; i++) {
            cards.push(value.cards[i]);
          }
          setCards(cards);
        }),
      );
    }, []);
  };
  getCards();
  const wrapperRef = useRef(null);
  closeMenuOutside(wrapperRef);

  if (!isAuthorized) {
    return (
      <Router>
        <Route>
          <div ref={wrapperRef} className="header-container">
            <span className={`toggle-button ${menuBar.menuBtnClass}`} onClick={() => showMenu()}>
              <div className="menu-bar menu-bar-top"></div>
              <div className="menu-bar menu-bar-middle"></div>
              <div className="menu-bar menu-bar-bottom"></div>
            </span>
            <div className={`menu-wrap ${menuBar.menuBarClass}`}>
              <div className="menu-sidebar">
                <ul className="menu">
                  <li>
                    <Link onClick={() => onNavigate('/')} to="/">
                      <a className={`${location === '' ? 'menu_active' : ''}`} href="#">
                        Main page
                      </a>
                    </Link>
                  </li>
                  {displayCards.map((card) => {
                    const newPath = `/${card.name.toLowerCase()}`;
                    return (
                      <li key="">
                        <Link
                          onClick={() => onNavigate(card.name.toLowerCase())}
                          to={newPath}
                          className="card-container"
                        >
                          <a
                            className={`${
                              location === card.name.toLowerCase() ? 'menu_active' : ''
                            }`}
                            href="#"
                          >
                            {card.name}
                          </a>
                        </Link>
                      </li>
                    );
                  })}
                  <li>
                    <Link onClick={() => onNavigate('/Statistic')} to="/Statistic">
                      <a className={`${location === 'Statistic' ? 'menu_active' : ''}`} href="#">
                        Statistic
                      </a>
                    </Link>
                  </li>
                  <li>
                    <RegistrationForm />
                  </li>
                </ul>
              </div>
            </div>
            <div className="switch-button" onClick={() => onChangeGameMode()}>
              <input className="switch-button-checkbox" type="checkbox"></input>
              <label className="switch-button-label">
                <span className="switch-button-label-span">Train</span>
              </label>
            </div>
          </div>
        </Route>
      </Router>
    );
  } else {
    return (
      <Router>
        <div ref={wrapperRef} className="header-container">
          <Link onClick={() => setLocation('/AdminPageCategories')} to="/AdminPageCategories">
            <a
              className={`${
                location === 'AdminPageCategories' ? 'admin_navigation-active' : ''
              } admin_navigation`}
              href="#"
            >
              Categories
            </a>
          </Link>
          <a
            className={`${
              location === 'AdminPageWords' ? 'admin_navigation-active' : ''
            } admin_navigation admin_navigation_words`}
            href="#"
          >
            Words
          </a>
          <Link onClick={() => logOut()} to="/">
            <a className="admin_navigation" href="#">
              Log out
            </a>
          </Link>
        </div>
      </Router>
    );
  }
};
