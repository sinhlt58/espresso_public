import React, { Component } from "react";
import { Input, message, Rate } from "antd";
import axios from "axios";
import Wrapper from "../../hoc/Wrapper";
import WordCloud from "react-d3-cloud";
import { getTopWords } from "../../graphql-client/api";
import { apiUri } from "../../constant";

class Sentiment extends Component {
  state = {
    predict: -1,
    star: 0,
    words: [],
    loading: true
  };

  async componentDidMount() {
    const response = await getTopWords(100);

    if (response.networkStatus === 7) {
      this.setState({
        loading: false,
        words: response.data.getWords
      });
    } else {
      message.error("Có lỗi xảy ra vui lòng thử lại");
    }
  }

  _onSearch = text => {
    axios
      .post(`${apiUri}/sentiment/predict`, {
        sentences: [`${text}`]
      })
      .then(res => {
        if (res.status === 200) {
          this.setState({
            predict: res.data.outputs.output[0],
            star: res.data.outputs.output_rating[0]
          });
        } else {
          message.error("Something wrong! Try again");
        }
      });
  };

  // TODO change fontSizeMapper hardcode
  fontSizeMapper = word => word.value / 10000;
  rotate = word => word.value % 1;

  render() {
    return (
      <Wrapper location={this.props.location.pathname} isHome>
        <Input.Search
          placeholder="Ví dụ: áo đẹp quá, áo xấu quá"
          onSearch={this._onSearch}
          enterButton
          style={{
            marginLeft: "20%",
            marginTop: "30px",
            width: "50%",
            marginBottom: "20px"
          }}
        />
        {this.state.predict < 0 ? null : (
          <h2 style={{ marginLeft: "20%" }}>
            Comment score: <span>{this.state.predict}</span> ~{" "}
            <Rate disabled value={Number(this.state.star)} allowHalf={true} />
          </h2>
        )}

        <h2 style={{ marginLeft: "20%" }}>Top 100 từ khoá phổ biến nhất:</h2>
        {this.state.loading ? null : (
          <div style={{ marginLeft: "20%" }}>
            <WordCloud
              data={this.state.words}
              fontSizeMapper={this.fontSizeMapper}
              rotate={this.rotate}
            />
          </div>
        )}
      </Wrapper>
    );
  }
}

export default Sentiment;
