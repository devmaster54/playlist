import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Menu } from "semantic-ui-react";
import { CustomIcons, CustomText } from "../../components";
import { NavItem, NavBar, NavContainer } from "./components";
import { logout } from "../../redux/actions/auth";
import { Api_Logout } from "../../apis/auth";

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: null
    };
  }
  componentDidMount() {}
  onLogout = async () => {
    const { dispatch, history, refresh_token } = this.props;
    await Api_Logout(refresh_token);
    dispatch(logout());
    history.push("/");
  };

  render() {
    const { isMobileSize, handleSideMenuVisible } = this.props;
    return (
      <React.Fragment>
        <NavBar fixed={"top"} size="large">
          <NavContainer isMobileSize={isMobileSize}>
            {isMobileSize && (
              <Menu.Menu position="left">
                <NavItem onClick={() => handleSideMenuVisible(true)}>
                  <CustomIcons name="hamburger" />
                </NavItem>
              </Menu.Menu>
            )}
            <Menu.Menu position="right">
              <NavItem className="logout">
                <CustomText onClick={this.onLogout}>Log out</CustomText>
              </NavItem>
            </Menu.Menu>
          </NavContainer>
        </NavBar>
      </React.Fragment>
    );
  }
}

Navbar.propTypes = {
  dispatch: PropTypes.func,
  history: PropTypes.object,
  isMobileSize: PropTypes.bool.isRequired,
  refresh_token: PropTypes.string.isRequired,
  handleSideMenuVisible: PropTypes.func.isRequired
};
function mapStateToProps(state) {
  const { refresh_token } = state.auth;
  return { refresh_token };
}
export default connect(mapStateToProps)(withRouter(Navbar));
