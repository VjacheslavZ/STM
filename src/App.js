import React, { Component } from 'react';
import './styles/style.scss';
import {
  BrowserRouter as Router, Route, Switch, Redirect,
} from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';

import Dashboard from './components/Dashboard/Dashboard';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Switch>
            <Route exact path="/:searchText/:classFilter/:searchByDead" component={Dashboard} />
            <Route exact path="/" component={Dashboard} />
            <Route render={() => <Redirect to="/" />} />
          </Switch>
        </Router>
      </Provider>
    );
  }
}

export default App;
