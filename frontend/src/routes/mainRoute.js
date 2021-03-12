import React, { Component } from "react";

import { Switch, Redirect, BrowserRouter, Route } from "react-router-dom";
import { PrivateRoute } from "../components";
import { LoginPage, DetailPage, PlaylistPage } from "../pages";
import routes from "../constants/routes";

class MainRoute extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <React.Fragment>
        <Switch>
          <PrivateRoute path={routes.loginRoute} Component={LoginPage} exact />
          <PrivateRoute path={routes.mainRoute}>
            <Switch>
              <Route path={routes.detailPage} component={DetailPage} exact />
              <Route path={routes.listPage} component={PlaylistPage} exact />
              <Redirect to={{ pathname: routes.listPage }} />
            </Switch>
          </PrivateRoute>
          <Redirect to={{ pathname: routes.loginRoute }} />
        </Switch>
      </React.Fragment>
    );
  }
}
MainRoute.propTypes = {};

export default MainRoute;
