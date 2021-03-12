import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { AuthLayout } from "../../layout";
import { Api_Login } from "../../apis/auth";
import { setEmail, setToken } from "../../redux/actions/auth";
import routes from "../../constants/routes";
import { setLoading } from "../../redux/actions/global";

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      err_msg: "",
      isSending: false
    };
  }
  componentDidMount() {}
  keyPress = e => {
    if (e.keyCode == 13) {
      this.onLogin();
    }
  };
  onChangeEmail = e => {
    this.setState({
      email: e.target.value
    });
  };
  onChangePassword = e => {
    this.setState({
      password: e.target.value
    });
  };
  onLogin = () => {
    const { dispatch, history } = this.props;
    const { email, password, isSending } = this.state;
    if (isSending || email === "" || password === "") return;
    this.setState({ isSending: true });
    dispatch(setLoading(true));
    Api_Login(email, password).then(async res => {
      dispatch(setLoading(false));
      this.setState({ isSending: false });
      if (!res.success) {
        this.setState({ err_msg: res.error });
        return;
      }
      dispatch(
        setToken({
          token: res.data.tokens.access,
          refresh_token: res.data.tokens.refresh
        })
      );
      history.push(routes.mainRoute);
    });
  };
  render() {
    const { email, password, err_msg } = this.state;
    return (
      <AuthLayout>
        <p className="grey-title">Sign in</p>
        <p className="description" style={{ marginBottom: 20 }}>
          Please enter the email address and password.
        </p>
        <p className="error-message" style={{ marginBottom: 10 }}>
          {err_msg}
        </p>
        <p className="input-text" style={{ marginBottom: 10 }}>
          Email Address
        </p>
        <input
          type="text"
          style={{ marginBottom: 40 }}
          value={email}
          onChange={this.onChangeEmail}
        />
        <p className="input-text" style={{ marginBottom: 10 }}>
          Password
        </p>
        <input
          type="password"
          onKeyDown={this.keyPress}
          style={{ marginBottom: 40 }}
          value={password}
          onChange={this.onChangePassword}
        />

        <button onClick={this.onLogin}>Login</button>
      </AuthLayout>
    );
  }
}

LoginPage.propTypes = {
  dispatch: PropTypes.func,
  history: PropTypes.object
};
export default connect()(LoginPage);
