import { Menu } from "semantic-ui-react";
import styled from "styled-components";

export const NavItem = styled(Menu.Item)`
  .ui.menu &.item {
    border-left: none !important;
  }
  .ui.menu &.item.logout {
    cursor: pointer;
  }

  .ui.menu.vertical &.item {
    display: flex;
    align-items: center;
  }

  .ui.menu.vertical.sidebar_grey &.item {
    padding-bottom: 0;
    padding-top: 0;
  }

  .ui.menu &.item.mx-auto {
    margin-left: auto !important;
    margin-right: auto !important;
  }

  .ui.menu &.item:before {
    width: 0px;
  }
  .ui.menu &.item > img:not(.ui) {
    display: inline-block;
    vertical-align: middle;
    width: 100%;
  }
`;

export const NavBar = styled(Menu)`
  border-bottom: none;
  height: 80px;
  border: none;
  &.ui.menu {
    box-shadow: 0px 0px 7px rgba(0, 0, 0, 0.1);
    border: none;
  }
`;

export const NavContainer = styled.div`
  display: flex;
  width: 100%;
  padding: 0 10px;
  justify-content: space-between;
  width: ${props => (props.isMobileSize ? "100vw" : "calc(100vw - 350px)")};
`;
