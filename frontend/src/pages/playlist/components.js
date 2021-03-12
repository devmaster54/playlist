import styled from "styled-components";
import React, { useRef, useState } from "react";
import { Label } from "semantic-ui-react";

export const ListContainer = styled.div`
  margin-top: 20px;
  width: 200px;
  min-height: 50px;
  border: 1px solid;
  background-color: ${props => (props.isOver ? "#eeeeee" : "#ffffff")};
`;

ListContainer.defaultProps = {
  isOver: false
};
