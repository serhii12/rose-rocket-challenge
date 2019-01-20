import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import ErrorBoundry from './components/ErrorBoundry';
import * as serviceWorker from './serviceWorker';
import {
  StoreProvider,
  StoreContext,
} from './components/StoreContext/StoreProvider';

ReactDOM.render(
  <ErrorBoundry>
    <StoreProvider>
      <StoreContext.Consumer>
        {({ fetchDriverLocation, fetchBonusDriverLocation }) => (
          <App
            fetchDriverLocation={fetchDriverLocation}
            fetchBonusDriverLocation={fetchBonusDriverLocation}
          />
        )}
      </StoreContext.Consumer>
    </StoreProvider>
  </ErrorBoundry>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
