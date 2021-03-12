import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DashLayout } from "../../layout";
import {
  PageContainer,
  PageTitle,
  FlexInline,
  SimpleButton
} from "../../components";
import { setLoading } from "../../redux/actions/global";
import {
  Api_GetMusicList,
  Api_GetPlayList,
  Api_AddPlayList,
  Api_DeletePlayList
} from "../../apis/playlist";
import { Api_Detail } from "../../apis/auth";
import MusicList from "./MusicList";
import MyPlayList from "./MyPlayList";

class PlaylistPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      music_data: [],
      list_data: [],
      account_data: null
    };
  }
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(setLoading(true));
    Promise.all([
      Api_Detail(dispatch),
      Api_GetMusicList(dispatch),
      Api_GetPlayList(dispatch)
    ]).then(values => {
      dispatch(setLoading(false));
      this.setState({
        account_data: values[0],
        music_data: values[1],
        list_data: values[2]
      });
    });
  }
  onAddMusic = item => {
    const { account_data, list_data } = this.state;
    const { dispatch } = this.props;
    if (list_data.length >= account_data.plan.size) {
      alert("Your playlist is full!");
      return;
    }
    if (item.plan.priority > account_data.plan.priority) {
      alert("This music can't be added to your playlist.");
      return;
    }
    Api_AddPlayList(dispatch, item.id).then(res => {
      if (res.succss == false) return;
      const new_list = [...list_data, item];
      this.setState({ list_data: new_list });
    });
  };
  onDeleteMusic = item => {
    const { list_data } = this.state;
    const { dispatch } = this.props;
    Api_DeletePlayList(dispatch, item.id).then(res => {
      if (res.succss == false) return;
      const new_list = list_data.filter(i => i.id != item.id);
      this.setState({ list_data: new_list });
    });
  };
  render() {
    const { music_data, list_data } = this.state;
    return (
      <DndProvider backend={HTML5Backend}>
        <DashLayout>
          <PageTitle>Playlist</PageTitle>
          <PageContainer>
            <FlexInline top justify="space-around">
              <MusicList data={music_data} />
              <MyPlayList
                data={list_data}
                onAdd={this.onAddMusic}
                onDelete={this.onDeleteMusic}
              />
            </FlexInline>
          </PageContainer>
        </DashLayout>
      </DndProvider>
    );
  }
}

PlaylistPage.propTypes = {
  dispatch: PropTypes.func,
  history: PropTypes.object
};
export default connect()(PlaylistPage);
