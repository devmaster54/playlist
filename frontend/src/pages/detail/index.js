import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { DashLayout } from "../../layout";
import { PageContainer, PageTitle, FlexInline } from "../../components";
import { DetailName, DetailContent, DetailItem } from "./components";
import { setLoading } from "../../redux/actions/global";
import { Api_Detail } from "../../apis/auth";

class DetailPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null
    };
  }
  async componentDidMount() {
    const { dispatch } = this.props;
    dispatch(setLoading(true));
    let res = await Api_Detail(dispatch);
    this.setState({ data: res });
    dispatch(setLoading(false));
  }

  render() {
    const { data } = this.state;
    return (
      <DashLayout>
        <PageTitle>About Me</PageTitle>
        <PageContainer>
          {data && (
            <React.Fragment>
              <DetailItem>
                <FlexInline>
                  <DetailName>Email :</DetailName>
                  <DetailContent>{data.email}</DetailContent>
                </FlexInline>
              </DetailItem>
              <DetailItem>
                <FlexInline>
                  <DetailName>Plan :</DetailName>
                  <DetailContent>{data.plan.name}</DetailContent>
                </FlexInline>
              </DetailItem>
              <DetailItem>
                <FlexInline>
                  <DetailName>Size :</DetailName>
                  <DetailContent>{data.plan.size}</DetailContent>
                </FlexInline>
              </DetailItem>
            </React.Fragment>
          )}
        </PageContainer>
      </DashLayout>
    );
  }
}

DetailPage.propTypes = {
  dispatch: PropTypes.func,
  history: PropTypes.object
};
export default connect()(DetailPage);
