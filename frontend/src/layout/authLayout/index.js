import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { AuthContainer, FormContainer } from "./components";

class AuthLayout extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { children } = this.props;
    return (
      <AuthContainer>
        <FormContainer>{children}</FormContainer>
      </AuthContainer>
    );
  }
}

AuthLayout.propTypes = {};

export default connect()(AuthLayout);
