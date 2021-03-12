import React from "react";
import styled from "styled-components";

export const PageTitle = styled.p`
  font-family: Roboto;
  font-style: normal;
  font-weight: 500;
  font-size: 34px;
  line-height: 40px;
  color: #4f4f4f;
  margin-bottom: 15px;
`;

export const CustomText = styled.div`
  font-family: Roboto;
  font-style: normal;
  word-break: break-word;
  font-weight: ${props => props.fontWeight};
  font-size: ${props => props.fontSize}px;
  line-height: ${props => props.lineHeight}px;
  color: ${props => props.color};
`;
CustomText.defaultProps = {
  color: "#000000",
  fontSize: 16,
  lineHeight: 21,
  fontWeight: 400
};
