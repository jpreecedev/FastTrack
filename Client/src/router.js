import React, { Fragment } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

// Pages
import Feed from "./pages/feed";

// Layout
import Footer from "./components/footer";
import Header from "./components/header";

export default () => (
  <Router>
    <Fragment>
      <Header />
      <Route exact={true} path="/" component={Feed} />
      <Footer />
    </Fragment>
  </Router>
);
