import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { CustomText } from "../../components";
import { ListContainer } from "./components";
import { MusicItem } from "./MusicItem";

class MusicList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  async componentDidMount() {
    const { dispatch } = this.props;
  }

  render() {
    const { data } = this.props;
    return (
      <div style={{ marginTop: 20 }}>
        <CustomText color="#222222" fontSize={23} lineHeight={25}>
          Music List
        </CustomText>
        <ListContainer>
          {data.map((item, key) => (
            <MusicItem data={item} key={key} />
          ))}
        </ListContainer>
      </div>
    );
  }
}

MusicList.propTypes = {
  dispatch: PropTypes.func,
  history: PropTypes.object,
  data: PropTypes.array.isRequired
};
export default connect()(MusicList);
