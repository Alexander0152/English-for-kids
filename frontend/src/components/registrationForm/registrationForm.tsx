import React, { FunctionComponent, useEffect, useRef } from 'react';
import './registrationForm.css';
import { useDispatch, useSelector } from 'react-redux';
import { GameModeState } from '../../businessLayer/reducers/gameModeReducer';
import { changeGameMode } from '../../businessLayer/actions/gameActions';
import { gameMods, serverPath } from '../../businessLayer/gameConfig';
import { HashRouter as Router, Link, useHistory } from 'react-router-dom';
import { RootReducerState } from '../../businessLayer/reducers/rootReducer';
import { changeIsAuthorize } from '../../businessLayer/actions/authorizeAction';

export const RegistrationForm: FunctionComponent = () => {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);

  const isAuthorized = useSelector<RootReducerState, RootReducerState['authorize']['isAuthorized']>(
    (state) => state.authorize.isAuthorized,
  );
  const history = useHistory();

  const dispatch = useDispatch();

  let login: string;
  let password: string;

  const checkAuthorization = (): void => {
    fetch(`${serverPath}/users`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        login: login,
        password: password,
      }),
    }).then((res: Response) =>
      res.json().then((value: { isAdmin: boolean }) => {
        if (value.isAdmin) {
          dispatch(changeIsAuthorize(true));
        } else {
          setTimeout(() => {
            history.push('/');
          }, 1500);
        }
      }),
    );
  };

  return (
    <Router>
      <button className="btn_login_form" onClick={() => setIsOpen(true)}>
        Login
      </button>
      {isOpen && (
        <div className="modal">
          <div className="modal_body_login">
            <h1 className="mb-20">Login</h1>
            <form className="contact_us_form">
              <input
                className="form-control"
                type="text"
                name="contactName"
                placeholder="Login: admin"
                required={true}
                onInput={(e) => (login = (e.target as HTMLInputElement).value)}
              />
              <input
                className="form-control"
                type="password"
                name="password"
                placeholder="Password: admin"
                required={true}
                onInput={(e) => (password = (e.target as HTMLInputElement).value)}
              />
            </form>
            <button className="modal_finish_btn close_login_btn" onClick={() => setIsOpen(false)}>
              Cancel
            </button>
            <Link onClick={() => checkAuthorization()} to="/AdminPageCategories">
              <button className="modal_finish_btn login_btn" onClick={() => setIsOpen(false)}>
                Login
              </button>
            </Link>
          </div>
        </div>
      )}
    </Router>
  );
};
