import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import routes from "../constants/routes";
import { Route, Redirect } from "react-router-dom";
const PrivateRoute = ({
  Component,
  children,
  path,
  exact,
  isAuthenticated,
  ...rest
}) => {
  return (
    <Route
      exact={exact}
      path={path}
      render={props => {
        if (!isAuthenticated && path !== routes.loginRoute) {
          return (
            <Redirect
              to={{
                pathname: routes.loginRoute,
                state: { from: props.location }
              }}
            />
          );
        } else if (isAuthenticated && path == routes.loginRoute) {
          return (
            <Redirect
              to={{
                pathname: routes.mainRoute,
                state: { from: props.location }
              }}
            />
          );
        }
        if (children) {
          return children;
        }
        return <Component {...props} {...rest} />;
      }}
    />
  );
};
PrivateRoute.propTypes = {
  path: PropTypes.string,
  exact: PropTypes.bool,
  Component: PropTypes.any,
  isAuthenticated: PropTypes.bool
};
function mapStateToProps(state) {
  const { isAuthenticated } = state.auth;
  return { isAuthenticated };
}
export default connect(mapStateToProps)(PrivateRoute);
