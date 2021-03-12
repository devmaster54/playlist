import React, { Component } from "react";
import PropTypes from "prop-types";
import { Sidebar, Menu, Segment } from "semantic-ui-react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { setVisibleSideMenu } from "../../redux/actions/global";
import Navbar from "../navbar";
import menuItems from "./menuItems";
import { setLoading } from "../../redux/actions/global";
import {
  SideBarItem,
  SideBarText,
  PageContainer,
  PusherContainer,
  SideBarContainer
} from "./components";

class DashLayout extends Component {
  constructor(props) {
    super(props);
  }
  async componentDidMount() {
    const { dispatch } = this.props;
  }
  handleSideMenuVisible = visible => {
    const { dispatch } = this.props;
    dispatch(setVisibleSideMenu(visible));
  };
  goTo = url => {
    const { history, dispatch } = this.props;
    dispatch(setVisibleSideMenu(false));
    history.push(url);
  };
  render() {
    const { isMobileSize, children, visibleSideMenu, location } = this.props;
    return (
      <React.Fragment>
        <Sidebar.Pushable>
          <Sidebar
            as={Menu}
            animation={isMobileSize ? "overlay" : "push"}
            direction="left"
            onHide={() => this.handleSideMenuVisible(false)}
            vertical
            visible={(visibleSideMenu && isMobileSize) || !isMobileSize}
          >
            <SideBarContainer>
              {menuItems.map((item, key) => (
                <SideBarItem
                  key={key}
                  active={location.pathname.includes(item.link)}
                  onClick={() => this.goTo(item.link)}
                >
                  <SideBarText active={location.pathname.includes(item.link)}>
                    {item.text}
                  </SideBarText>
                </SideBarItem>
              ))}
            </SideBarContainer>
          </Sidebar>
          <Sidebar.Pusher dimmed={isMobileSize && visibleSideMenu}>
            <PusherContainer isMobileSize={isMobileSize}>
              <Navbar
                isMobileSize={isMobileSize}
                handleSideMenuVisible={this.handleSideMenuVisible}
              />
              <PageContainer>{children}</PageContainer>
            </PusherContainer>
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </React.Fragment>
    );
  }
}

DashLayout.propTypes = {
  dispatch: PropTypes.func.isRequired,
  isMobileSize: PropTypes.bool,
  visibleSideMenu: PropTypes.bool,
  location: PropTypes.object
};

function mapStateToProps(state) {
  const { isMobileSize, visibleSideMenu } = state.global;
  return {
    isMobileSize,
    visibleSideMenu
  };
}
export default connect(mapStateToProps)(withRouter(DashLayout));
