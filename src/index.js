import React, { Suspense, lazy } from 'react';
import ReactDOM from 'react-dom';
import store from './app/store';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import * as serviceWorker from './serviceWorker';

// Bootstrap library
import './assets/vendor/bootstrap/bootstrap.scss';

import * as Misc from './constants/misc';
import LoadingScreen from './library/LoadingScreen';

// Application routes

const LoginSignup = lazy(() => {
  return Promise.all([
    import('./routes/LoginSignup'),
    new Promise(resolve => window.setTimeout(resolve, Misc.LAZY_LOADING_MIN_TIMEOUT))
  ])
  .then(([moduleExports]) => moduleExports);
});

const CreateJoinWorkshop = lazy(() => {
  return Promise.all([
    import('./routes/CreateJoinWorkshop'),
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
            <LoginSignup />

            <CreateJoinWorkshop />
          </Switch>
        </Suspense>
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.unregister();
