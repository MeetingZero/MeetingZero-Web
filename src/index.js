import React, { Suspense, lazy } from 'react';
import ReactDOM from 'react-dom';
import store from './app/store';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import * as serviceWorker from './serviceWorker';

// Bootstrap library
import './assets/vendor/bootstrap/bootstrap.scss';

import * as Misc from './constants/misc';
import LoadingScreen from './library/LoadingScreen';
import Restricted from './routes/Restricted';

// Application pages

const Login = lazy(() => {
  return Promise.all([
    import('./pages/Login'),
    new Promise(resolve => window.setTimeout(resolve, Misc.LAZY_LOADING_MIN_TIMEOUT))
  ])
  .then(([moduleExports]) => moduleExports);
});

const SignUp = lazy(() => {
  return Promise.all([
    import('./pages/SignUp'),
    new Promise(resolve => window.setTimeout(resolve, Misc.LAZY_LOADING_MIN_TIMEOUT))
  ])
  .then(([moduleExports]) => moduleExports);
});

const SignUpConfirmation = lazy(() => {
  return Promise.all([
    import('./pages/SignUpConfirmation'),
    new Promise(resolve => window.setTimeout(resolve, Misc.LAZY_LOADING_MIN_TIMEOUT))
  ])
  .then(([moduleExports]) => moduleExports);
});

const ForgotPassword = lazy(() => {
  return Promise.all([
    import('./pages/ForgotPassword'),
    new Promise(resolve => window.setTimeout(resolve, Misc.LAZY_LOADING_MIN_TIMEOUT))
  ])
  .then(([moduleExports]) => moduleExports);
});

const ResetPassword = lazy(() => {
  return Promise.all([
    import('./pages/ResetPassword'),
    new Promise(resolve => window.setTimeout(resolve, Misc.LAZY_LOADING_MIN_TIMEOUT))
  ])
  .then(([moduleExports]) => moduleExports);
});

const JoinWorkshop = lazy(() => {
  return Promise.all([
    import('./pages/JoinWorkshop'),
    new Promise(resolve => window.setTimeout(resolve, Misc.LAZY_LOADING_MIN_TIMEOUT))
  ])
  .then(([moduleExports]) => moduleExports);
});

const CreateWorkshop = lazy(() => {
  return Promise.all([
    import('./pages/CreateWorkshop'),
    new Promise(resolve => window.setTimeout(resolve, Misc.LAZY_LOADING_MIN_TIMEOUT))
  ])
  .then(([moduleExports]) => moduleExports);
});

const Meeting = lazy(() => {
  return Promise.all([
    import('./pages/Meeting'),
    new Promise(resolve => window.setTimeout(resolve, Misc.LAZY_LOADING_MIN_TIMEOUT))
  ])
  .then(([moduleExports]) => moduleExports);
});

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

            <Route path='/reset-password'>
              <ResetPassword />
            </Route>

            <Restricted>
              <Route path='/join-workshop'>
                <JoinWorkshop />
              </Route>

              <Route path='/create-workshop'>
                <CreateWorkshop />
              </Route>

              <Route path='/meeting/:meeting_code'>
                <Meeting />
              </Route>
            </Restricted>
          </Switch>
        </Suspense>
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.unregister();
