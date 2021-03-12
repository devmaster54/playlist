import styled from "styled-components";
import React, { Component } from "react";
import PropTypes from "prop-types";
import { Input } from "semantic-ui-react";

export const CustomInput = styled(Input)`
  &.ui.input {
    border: 1px solid
      ${props => (props.invalid === "true" ? "#ff0000" : "#bdbdbd")};
    box-sizing: border-box;
    border-radius: 5px;
    height: 40px;
  }
  &.ui.input input {
    font-family: Roboto;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 16px;
    color: #828282;
    border: none;
    padding-right: 23px !important;
  }
`;
CustomInput.defaultProps = {
  invalid: "false"
};
