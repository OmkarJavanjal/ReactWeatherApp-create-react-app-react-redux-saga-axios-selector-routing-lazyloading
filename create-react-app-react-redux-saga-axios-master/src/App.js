import React from 'react';
import { Provider } from 'react-redux';
import configureStore from './utilities/store';
import { createBrowserHistory } from 'history';
import { ConnectedRouter } from 'connected-react-router';
import './utilities/css/global.scss';
// import { Route, Switch } from 'react-router-dom';

import RenderRoutes from './utilities/routes/routeConfig';
import routes from './utilities/routes';
// import { getAdgroup } from './containers/Home/sagas';

const initialState = {};
const history =  createBrowserHistory();
const store = configureStore(initialState, history);

function App() {
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <RenderRoutes routes={routes(store)} store={store} />
      </ConnectedRouter>
    </Provider>
  );
}

export default App;
