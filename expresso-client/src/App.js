import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { ApolloProvider } from "react-apollo";
import client from "./graphql-client/client";
import Dashboard from "./containers/Dashboard";
import AnalyticsOverview from "./containers/AnalyticsOverview";
import Sentiment from "./containers/Sentiment";
import Reports from "./containers/Reports";
import Compare from "./containers/Compare";
import ProductsSearch from "./containers/ProductsSearch";
import NotFound from "./containers/NotFound";
import Products from "./containers/Products";
import "./App.css";

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <BrowserRouter>
          <Switch>
            <Route path="/" exact component={Dashboard} />
            <Route path="/analytics/:name" component={AnalyticsOverview} />
            <Route path="/sentiment" component={Sentiment} />
            <Route path="/reports/:name" component={Reports} />
            <Route path="/compare" component={Compare} />
            <Route path="/products" exact component={ProductsSearch} />
            <Route path="/products/:name/:keyword" component={Products} />
            <Route component={NotFound} />
          </Switch>
        </BrowserRouter>
      </ApolloProvider>
    );
  }
}

export default App;
