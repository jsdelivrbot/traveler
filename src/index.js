import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';
const history = createBrowserHistory();

import reducers from './reducers';
import Landing from './components/Landing';
import Results from './components/Results';

const createStoreWithMiddleware = applyMiddleware()(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <BrowserRouter>
      <div>
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route path="/results" component={Results} history={history} />
        </Switch>
      </div>
    </BrowserRouter>
  </Provider>
  , document.querySelector('.container'));
