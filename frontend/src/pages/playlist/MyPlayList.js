import React from "react";
import { useState } from "react";
import { useDrop } from "react-dnd";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { ItemTypes } from "./ItemTypes";
import { CustomText } from "../../components";
import { ListContainer } from "./components";
import { ListItem } from "./MusicItem";

const MyPlayList = ({ data, onAdd, onDelete }) => {
  const [{ isOver, isOverCurrent }, drop] = useDrop(
    () => ({
      accept: ItemTypes.MusicItem,
      drop(item, monitor) {
        onAdd(item);
      },
      collect: monitor => ({
        isOver: monitor.isOver(),
        isOverCurrent: monitor.isOver({ shallow: true })
      })
    }),
    []
  );
  return (
    <div style={{ marginTop: 20 }}>
      <CustomText color="#222222" fontSize={23} lineHeight={25}>
        My PlayList
      </CustomText>
      <ListContainer ref={drop} isOver={isOverCurrent}>
        {data.map((item, key) => (
          <ListItem data={item} key={key} onDelete={onDelete} />
        ))}
      </ListContainer>
    </div>
  );
};

export default MyPlayList;
