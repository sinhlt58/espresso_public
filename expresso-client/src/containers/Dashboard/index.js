import React, { Component } from "react";
import { Input, AutoComplete, Tag, Row, Col } from "antd";
import { Link } from "react-router-dom";
import Wrapper from "../../hoc/Wrapper";
import {
  brandAutocomplete,
  getAppStats,
  getPopuplarBrands
} from "../../graphql-client/api";

const Search = Input.Search;

class Dashboard extends Component {
  state = {
    completion: [],
    brands_count: 0,
    comments_count: 0,
    products_count: 0,
    domain_count: 0,
    loading: true,
    brands: [],
    dealers: []
  };

  async componentDidMount() {
    const res = await getAppStats();

    if (res.networkStatus === 7) {
      const {
        brands_count,
        comments_count,
        products_count,
        domain_count
      } = res.data.getSummaryApp;

      this.setState({
        brands_count: Number(brands_count).toLocaleString(),
        comments_count: Number(comments_count).toLocaleString(),
        products_count: Number(products_count).toLocaleString(),
        domain_count: Number(domain_count).toLocaleString()
      });
    }

    const resBrands = await getPopuplarBrands();

    if (resBrands.networkStatus === 7) {
      const { brands, dealers } = resBrands.data.getTopBrand;
      this.setState({ brands, dealers, loading: false });
    }
  }

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
          <Row style={{ marginTop: 30 }}>
            <Col span={6}>
              <h1>{this.state.brands_count}</h1>
              <p>Nhãn hàng và cửa hàng</p>
            </Col>
            <Col span={6}>
              <h1>{this.state.products_count}</h1>
              <p>Sản phẩm</p>
            </Col>
            <Col span={6}>
              <h1>{this.state.comments_count}</h1>
              <p>Bình luận</p>
            </Col>
            <Col span={6}>
              <h1>{this.state.domain_count}</h1>
              <p>Trang thương mại điện tử</p>
            </Col>
          </Row>
        </div>
        {this.state.loading ? null : (
          <div style={{ paddingTop: 50, paddingLeft: 50, paddingBottom: 50 }}>
            <h2 style={{ marginTop: 20, marginBottom: 20 }}>
              Các thương hiệu phổ biến nhất
            </h2>
            {this.state.brands.map(item => (
              <Tag color="#2db7f5">
                <Link to={`/analytics/${item}`}>{item}</Link>
              </Tag>
            ))}
            <h2 style={{ marginTop: 20, marginBottom: 20 }}>
              Các cửa hàng phổ biến nhất
            </h2>
            {this.state.dealers.map(item => (
              <Tag color="#87d068">
                <Link to={`/analytics/${item}`}>{item}</Link>
              </Tag>
            ))}
          </div>
        )}
      </Wrapper>
    );
  }
}

export default Dashboard;
