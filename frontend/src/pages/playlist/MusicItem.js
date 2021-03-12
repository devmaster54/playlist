import React from "react";
import { useDrag } from "react-dnd";
import styled from "styled-components";
import { ItemTypes } from "./ItemTypes";
import { FlexInline } from "../../components";
const MusicItemContainer = styled.div`
  border: 1px solid;
  border-radius: 4px;
  max-width: 200px;
  padding: 10px 20px;
  margin: 3px;
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  cursor: move;
  & .name {
    font-size: 20px;
    line-height: 23px;
    color: #222222;
  }
  & .plan {
    font-size: 13px;
    line-height: 15px;
    color: #444444;
  }
`;

const ListItemContainer = styled(MusicItemContainer)`
  cursor: unset;
`;

export const MusicItem = ({ data }) => {
  const [, drag] = useDrag(() => ({ type: ItemTypes.MusicItem, item: data }));
  return (
    <MusicItemContainer ref={drag}>
      <div className="name">{data.music_name}</div>
      <div className="plan">{data.plan.name}</div>
    </MusicItemContainer>
  );
};

export const ListItem = ({ data, onDelete }) => {
  return (
    <ListItemContainer>
      <FlexInline justify="space-between">
        <div>
          <div className="name">{data.music_name}</div>
          <div className="plan">{data.plan.name}</div>
        </div>
        <button onClick={() => onDelete(data)}>X</button>
      </FlexInline>
    </ListItemContainer>
  );
};
