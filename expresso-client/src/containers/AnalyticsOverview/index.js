import React, { Component } from "react";
import { Spin, Rate, Progress, Row, Col, Input, Button, Cascader } from "antd";
import { getBrand } from "../../graphql-client/api";
import Wrapper from "../../hoc/Wrapper";

const Search = Input.Search;

const optionsSort = [
  {
    value: "asc",
    label: "Điểm từ thấp đến cao"
  },
  {
    value: "desc",
    label: "Điểm từ cao đến thấp"
  },
  {
    value: "recently",
    label: "Gần đây nhất"
  }
];

const optionsDomain = [
  {
    value: "all",
    label: "Tất cả các kênh"
  },
  {
    value: "tiki",
    label: "Tiki.vn"
  },
  {
    value: "shopee",
    label: "Shopee.vn"
  },
  {
    value: "lazada",
    label: "Lazada.vn"
  }
];

const optionsStar = [
  {
    value: "0",
    label: "Tất cả các sao"
  },
  {
    value: "5",
    label: "Chỉ 5 sao"
  },
  {
    value: "4",
    label: "Chỉ 4 sao"
  },
  {
    value: "3",
    label: "Chỉ 3 sao"
  },
  {
    value: "2",
    label: "Chỉ 2 sao"
  },
  {
    value: "1",
    label: "Chỉ 1 sao"
  }
];

class AnalyticsOverview extends Component {
  state = {
    loading: true,
    data: {}
  };

  componentDidMount() {
    getBrand(this.props.match.params.name).then(res => {
      this.setState({
        loading: false,
        data: res.data.getBrand
      });
    });
  }

  render() {
    return (
      <Wrapper>
        <Row style={{ "margin-bottom": "20px" }}>
          <h2 style={{ margin: "20px 0px 0px 50px" }}>
            Kết quả phân tích liên quan đến từ khoá:{" "}
            <p style={{ color: "red", fontWeight: "500", display: "inline" }}>
              {this.props.match.params.name}
            </p>{" "}
          </h2>
        </Row>
        <Row style={{ width: "100%" }}>
          <Col span={1} />
          <Col span={4}>
            {this.state.loading ? (
              <Spin style={{ margin: "0px 0px 0px 50%" }} size="large" />
            ) : (
              <div>
                <h2>Bình luận của khách hàng</h2>
                <span>
                  <Rate
                    disabled
                    defaultValue={this.state.data.rate.average.toFixed(2)}
                    allowHalf
                  />
                  <span className="ant-rate-text">
                    <h2>{this.state.data.totalCmt}</h2>
                  </span>
                </span>
                <p>{this.state.data.rate.average.toFixed(2)} out of 5 stars</p>
                <Button block ghost style={{ padding: 0 }}>
                  <p
                    style={{
                      "padding-right": "20px",
                      display: "inline"
                    }}
                  >
                    5 star
                  </p>
                  <Progress percent={50} style={{ width: "80%" }} />
                </Button>
                <Button block ghost style={{ padding: 0 }}>
                  <p
                    style={{
                      "padding-right": "20px",
                      display: "inline"
                    }}
                  >
                    4 star
                  </p>
                  <Progress percent={50} style={{ width: "80%" }} />
                </Button>{" "}
                <Button block ghost style={{ padding: 0 }}>
                  <p
                    style={{
                      "padding-right": "20px",
                      display: "inline"
                    }}
                  >
                    3 star
                  </p>
                  <Progress percent={50} style={{ width: "80%" }} />
                </Button>{" "}
                <Button block ghost style={{ padding: 0 }}>
                  <p
                    style={{
                      "padding-right": "20px",
                      display: "inline"
                    }}
                  >
                    2 star
                  </p>
                  <Progress percent={50} style={{ width: "80%" }} />
                </Button>{" "}
                <Button block ghost style={{ padding: 0 }}>
                  <p
                    style={{
                      "padding-right": "20px",
                      display: "inline"
                    }}
                  >
                    1 star
                  </p>
                  <Progress percent={50} style={{ width: "80%" }} />
                </Button>
              </div>
            )}
          </Col>
          <Col span={3} />
          <Col span={14}>
            <Search
              placeholder="Nhập từ khoá để tìm kiếm bình luận"
              onSearch={this._onSearch}
              enterButton
              style={{ width: "100%", "margin-bottom": "20px" }}
            />
            <Row>
              <Col span={8}>
                <h2>Sắp xếp</h2>
              </Col>
              <Col span={16}>
                <h2>Lọc</h2>
              </Col>
            </Row>
            <Row>
              <Col span={7}>
                <Cascader
                  options={optionsSort}
                  style={{ width: "100%", "margin-bottom": "20px" }}
                  defaultValue={["desc"]}
                />
              </Col>
              <Col span={1} />
              <Col span={7}>
                <Cascader
                  options={optionsDomain}
                  style={{ width: "100%", "margin-bottom": "20px" }}
                  defaultValue={["all"]}
                />
              </Col>
              <Col span={1} />
              <Col span={7}>
                <Cascader
                  options={optionsStar}
                  style={{ width: "100%", "margin-bottom": "20px" }}
                  defaultValue={["0"]}
                />
              </Col>
            </Row>
          </Col>
        </Row>
        <hr
          style={{ alignSelf: "center", width: "95%", "margin-top": "30px" }}
        />
      </Wrapper>
    );
  }
}

export default AnalyticsOverview;
