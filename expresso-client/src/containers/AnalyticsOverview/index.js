import React, { Component } from "react";
import {
  Spin,
  Rate,
  Progress,
  Row,
  Col,
  Input,
  Button,
  Cascader,
  Tooltip,
  Comment,
  Avatar
} from "antd";
import moment from "moment";
import { getBrand } from "../../graphql-client/api";
import Wrapper from "../../hoc/Wrapper";
import { optionsDomain, optionsSort, optionsStar } from "../../constant";

const Search = Input.Search;

class AnalyticsOverview extends Component {
  state = {
    loading: true,
    data: {},
    starPercent: [],
    optionsDomain: ["all"],
    optionsSort: ["recently"],
    optionsStar: ["0"]
  };

  componentDidMount() {
    getBrand(this.props.match.params.name)
      .then(res => {
        this.setState({
          loading: false,
          data: res.data.getBrand
        });
      })
      .then(() => {
        let starPercent = [];
        this.state.data.rate.rateCount.forEach(element => {
          starPercent.push(
            Number(
              ((element.totalCmt / this.state.data.totalCmt) * 100).toFixed(2)
            )
          );
        });

        starPercent.push(5, 4, 3, 2, 1);

        this.setState({
          starPercent
        });
      });
  }

  _onChangeSort = async value => {
    this.setState({
      optionsSort: value
    });
  };

  render() {
    return (
      <Wrapper>
        <Row style={{ marginBottom: "20px" }}>
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
                    defaultValue={Number(this.state.data.rate.average)}
                    allowHalf
                  />
                  <span className="ant-rate-text">
                    <h2>{this.state.data.totalCmt}</h2>
                  </span>
                </span>
                <p>{this.state.data.rate.average.toFixed(2)} out of 5 stars</p>
                {this.state.starPercent.map((item, index) => {
                  if (index >= 5) return null;
                  return (
                    <Button key={index} block ghost style={{ padding: 0 }}>
                      <p
                        style={{
                          paddingRight: "20px",
                          display: "inline"
                        }}
                      >
                        {this.state.starPercent[index + 5]} star
                      </p>
                      <Progress
                        percent={this.state.starPercent[index]}
                        style={{ width: "80%" }}
                      />
                    </Button>
                  );
                })}
              </div>
            )}
          </Col>
          <Col span={3} />
          <Col span={14}>
            <Search
              placeholder="Nhập từ khoá để tìm kiếm bình luận"
              onSearch={this._onSearch}
              enterButton
              style={{ width: "100%", marginBottom: "20px" }}
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
                  style={{ width: "100%", marginBottom: "20px" }}
                  value={this.state.optionsSort}
                  onChange={this._onChangeSort}
                />
              </Col>
              <Col span={1} />
              <Col span={7}>
                <Cascader
                  options={optionsDomain}
                  style={{ width: "100%", marginBottom: "20px" }}
                  value={this.state.optionsDomain}
                  onChange={value =>
                    this.setState({
                      optionsDomain: value
                    })
                  }
                />
              </Col>
              <Col span={1} />
              <Col span={7}>
                <Cascader
                  options={optionsStar}
                  style={{ width: "100%", marginBottom: "20px" }}
                  value={this.state.optionsStar}
                  onChange={value =>
                    this.setState({
                      optionsStar: value
                    })
                  }
                />
              </Col>
            </Row>
          </Col>
        </Row>
        <hr
          style={{
            alignSelf: "center",
            width: "95%",
            marginTop: "30px",
            marginBottom: "30px"
          }}
        />
        <Row>
          <Col span={1} />
          <Col span={23}>
            {/* <Comment
              author={<p>Han Solo</p>}
              avatar={
                <Avatar
                  src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                  alt="Han Solo"
                />
              }
              content={
                <Rate
                  disabled
                  defaultValue={2}
                  style={{ marginBottom: "10px" }}
                />
              }
              datetime={
                <Tooltip title={moment().format("YYYY-MM-DD HH:mm:ss")}>
                  <span>{moment().fromNow()}</span>
                </Tooltip>
              }
              children={
                <p>
                  We supply a series of design principles, practical patterns
                  and high quality design resources (Sketch and Axure), to help
                  people create their product prototypes beautifully and
                  efficiently.
                </p>
              }
              style={{ marginBottom: "30px" }}
            />

            <Comment
              author={<p>Han Solo</p>}
              avatar={
                <Avatar
                  src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                  alt="Han Solo"
                />
              }
              content={
                <Rate
                  disabled
                  defaultValue={2}
                  style={{ marginBottom: "10px" }}
                />
              }
              datetime={
                <Tooltip title={moment().format("YYYY-MM-DD HH:mm:ss")}>
                  <span>{moment().fromNow()}</span>
                </Tooltip>
              }
              children={
                <p>
                  We supply a series of design principles, practical patterns
                  and high quality design resources (Sketch and Axure), to help
                  people create their product prototypes beautifully and
                  efficiently.
                </p>
              }
            /> */}
          </Col>
        </Row>
      </Wrapper>
    );
  }
}

export default AnalyticsOverview;
