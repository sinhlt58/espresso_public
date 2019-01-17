import React, { Component } from "react";
import { Input, AutoComplete, Button, Icon } from "antd";
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
      <Wrapper
        isHome
        location={this.props.location.pathname}
        style={{ height: "100vh" }}
      >
        <div style={{ textAlign: "center", marginTop: 80, width: "100%" }}>
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
        <div style={{ width: "60%", margin: "20px auto" }}>
          <h4>
            Phần mềm giúp phân tích, so sánh các thương hiệu, shop thời trang
            trên các website thương mại điện tử như shopee.vn, lazada.vn,
            tiki.vn, …, facebook. Với hơn 500,000+ nhãn hàng và 1,000,000+ bình
            luận.
          </h4>
        </div>
      </Wrapper>
    );
  }
}

export default Dashboard;
