import React, { Component } from "react";
import { Input, AutoComplete, Card, Row, Col } from "antd";
import Wrapper from "../../hoc/Wrapper";
import { brandAutocomplete } from "../../graphql-client/api";

const Search = Input.Search;

const dataSource = [
  "Mango",
  "T-Mans",
  "Mando",
  "Mano",
  "T-Man's",
  "manhthang10",
  "manhdung23k33",
  "Manzo",
  "manhhvtc9",
  "manchateo"
];

class Dashboard extends Component {
  state = {
    completion: []
  };

  _onInput = async text => {
    if (text.trim() !== "") {
      const res = await brandAutocomplete(text.toLowerCase());
      this.setState({
        completion: res.data.brandCompletion
      });
    } else {
      this.setState({
        completion: []
      });
    }
  };

  _onSelectSuggester = text => {
    this._onSearch(text);
  };

  _onSearch = value => {
    if (value.trim() === "" || value === undefined) {
      alert("Vui lòng nhập tên thương hiệu trước khi tiếp tục");
    } else {
      this.props.history.push(`/analytics/${value}`);
    }
  };

  render() {
    return (
      <Wrapper isHome location={this.props.location.pathname}>
        <div
          style={{
            textAlign: "center",
            marginTop: 80,
            width: "100%",
            marginBottom: 100
          }}
        >
          <h1>Nhập tên thương hiệu muốn phân tích</h1>
          <AutoComplete
            className="search-dashboard"
            size="large"
            style={{ width: "60%" }}
            dataSource={this.state.completion}
            onSelect={this._onSelectSuggester}
            onSearch={this._onInput}
            optionLabelProp="text"
          >
            <Search
              className="search-dashboard"
              placeholder="Ví dụ: Bitis, Mango"
              onSearch={this._onSearch}
              enterButton
              size="large"
            />
          </AutoComplete>
        </div>
        <div
          style={{
            paddingTop: 50,
            backgroundColor: "white",
            textAlign: "center",
            paddingBottom: 50
          }}
        >
          <h2>Phần mềm giúp đo lường sức khỏe thương hiệu</h2>
          <Row>
            <Col span={8}>
              <h1>500,000</h1>
              <p>Nhãn hàng</p>
            </Col>
            <Col span={8}>
              <h1>1,000,000+</h1>
              <p>Bình luận</p>
            </Col>
            <Col span={8}>
              <h1>3</h1>
              <p>Trang thương mại điện tử</p>
            </Col>
          </Row>
        </div>
        <div style={{ paddingTop: 50, paddingLeft: 50 }}>
          <h2>Các thương hiệu phổ biến nhất</h2>
        </div>
      </Wrapper>
    );
  }
}

export default Dashboard;
