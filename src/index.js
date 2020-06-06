import React, { Suspense, lazy } from 'react';
import ReactDOM from 'react-dom';
import store from './app/store';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import * as serviceWorker from './serviceWorker';

// Bootstrap library
import './assets/vendor/bootstrap/bootstrap.scss';

import LoadingScreen from './library/LoadingScreen';

// Application pages
const Login = lazy(() => import('./pages/Login'));
const SignUp = lazy(() => import('./pages/SignUp'));
const SignUpConfirmation = lazy(() => import('./pages/SignUpConfirmation'));
const ForgotPassword = lazy(() => import('./pages/ForgotPassword'));
const JoinWorkshop = lazy(() => import('./pages/JoinWorkshop'));

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <Suspense fallback={<LoadingScreen />}>
          <Switch>
            <Route path='/login'>
              <Login />
            </Route>

            <Route path='/sign-up'>
              <SignUp />
            </Route>

            <Route path='/signup-confirmation'>
              <SignUpConfirmation />
            </Route>

            <Route path='/forgot-password'>
              <ForgotPassword />
            </Route>

            <Route path='/join-workshop'>
              <JoinWorkshop />
            </Route>
          </Switch>
        </Suspense>
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.unregister();
