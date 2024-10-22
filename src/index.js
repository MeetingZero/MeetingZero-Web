import React, { Suspense, lazy } from 'react';
import ReactDOM from 'react-dom';
import store from './app/store';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import * as serviceWorker from './serviceWorker';
import * as Sentry from '@sentry/react';
import { Integrations } from '@sentry/tracing';

// Bootstrap library
import 'assets/vendor/bootstrap/bootstrap.scss';
// Animate.css library
import 'animate.css';

// Common application SCSS
import 'assets/scss/common.scss';

import HomePage from 'pages/HomePage';
import LoadingScreen from 'library/LoadingScreen';
import Restricted from 'routes/Restricted';
import ErrorPage from 'pages/ErrorPage';

import * as Misc from 'constants/misc';
import { SENTRY_URL } from 'constants/endpoints';

// Sentry.io integration for error catching
// Applicable for production and staging only

if (process.env.NODE_ENV === 'production' || process.env.REACT_APP_ENV === 'staging') {
  Sentry.init({
    dsn: SENTRY_URL,
    integrations: [
      new Integrations.BrowserTracing()
    ],
    tracesSampleRate: 1.0
  });
}

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

const Dashboard = lazy(() => {
  return Promise.all([
    import('./pages/Dashboard'),
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

const CreateWorkshopConfirmation = lazy(() => {
  return Promise.all([
    import('./pages/CreateWorkshopConfirmation'),
    new Promise(resolve => window.setTimeout(resolve, Misc.LAZY_LOADING_MIN_TIMEOUT))
  ])
  .then(([moduleExports]) => moduleExports);
});

const WorkshopStart = lazy(() => {
  return Promise.all([
    import('./pages/WorkshopStart'),
    new Promise(resolve => window.setTimeout(resolve, Misc.LAZY_LOADING_MIN_TIMEOUT))
  ])
  .then(([moduleExports]) => moduleExports);
});

const Workshop = lazy(() => {
  return Promise.all([
    import('./pages/Workshop'),
    new Promise(resolve => window.setTimeout(resolve, Misc.LAZY_LOADING_MIN_TIMEOUT))
  ])
  .then(([moduleExports]) => moduleExports);
});

const PastWorkshops = lazy(() => {
  return Promise.all([
    import('./pages/PastWorkshops'),
    new Promise(resolve => window.setTimeout(resolve, Misc.LAZY_LOADING_MIN_TIMEOUT))
  ])
  .then(([moduleExports]) => moduleExports);
});

ReactDOM.render(
  <React.StrictMode>
    <Sentry.ErrorBoundary fallback={<ErrorPage />}>
      <Provider store={store}>
        <Router>
          <Suspense fallback={<LoadingScreen />}>
            <Switch>
              <Route exact path="/">
                <HomePage />
              </Route>

              <Route exact path='/login'>
                <Login />
              </Route>

              <Route exact path='/sign-up'>
                <SignUp />
              </Route>

              <Route exact path='/signup-confirmation'>
                <SignUpConfirmation />
              </Route>

              <Route exact path='/forgot-password'>
                <ForgotPassword />
              </Route>

              <Route exact path='/reset-password'>
                <ResetPassword />
              </Route>

              <Restricted>
                <Route exact path='/dashboard'>
                  <Dashboard />
                </Route>

                <Route exact path='/join-workshop'>
                  <JoinWorkshop />
                </Route>

                <Route exact path='/create-workshop'>
                  <CreateWorkshop />
                </Route>

                <Route exact path='/create-workshop-confirmation'>
                  <CreateWorkshopConfirmation />
                </Route>

                <Route exact path='/workshop/:workshop_token/start'>
                  <WorkshopStart />
                </Route>

                <Route exact path='/workshop/:workshop_token'>
                  <Workshop />
                </Route>

                <Route exact path='/past-workshops/:workshop_token?'>
                  <PastWorkshops />
                </Route>
              </Restricted>
            </Switch>
          </Suspense>
        </Router>
      </Provider>
    </Sentry.ErrorBoundary>
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.unregister();
