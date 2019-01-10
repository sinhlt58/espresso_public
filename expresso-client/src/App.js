import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { ApolloProvider } from 'react-apollo';
import client from './graphql-client/client';
import Dashboard from './containers/Dashboard';
import AnalyticsOverview from './containers/AnalyticsOverview';
import Sentiment from './containers/Sentiment';
import './App.css';

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <BrowserRouter>
          <Switch>
            <Route path="/" exact component={Dashboard} />
            <Route path="/analytics/:name" component={AnalyticsOverview} />
            <Route path="/sentiment" component={Sentiment} />
          </Switch>
        </BrowserRouter>
      </ApolloProvider>
    );
  }
}

export default App;
