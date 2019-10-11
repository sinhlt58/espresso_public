import React, { Component } from "react";
import { Input, AutoComplete, Tag, Row, Col, message, Spin, Icon } from "antd";
import { Link } from "react-router-dom";
import Wrapper from "../../hoc/Wrapper";
import {
  brandAutocomplete,
  getAppStats,
  getPopuplarBrands,
  getBadBrands
} from "../../graphql-client/api";
import axios from "axios";
import moment from "moment";
import "./style.css";
import Modal from "react-responsive-modal";

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
    dealers: [],
    badBrands: [],
    badDealers: [],
    modalOpen: false
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
      this.setState({ brands, dealers });
    }

    const resWorstBrands = await getBadBrands();

    if (resBrands.networkStatus === 7) {
      const { brands, dealers } = resWorstBrands.data.getWorstBrand;
      this.setState({ badBrands: brands, badDealers: dealers, loading: false });
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

  _onSearch = async value => {
    this.setState({
      modalOpen: true
    });
    const res = await brandAutocomplete(value.toLowerCase());

    if (res.data.brandCompletion.length === 0) {
      const botRes = await axios.post(
        "https://botcuaban.com/api/v1/bots/5d71dcef30011bb759ec3111/chat",
        {
          text: value
        }
      );

      if (botRes.data.rasa_intent.intent.name === null) {
        message.error("Không tìm thấy thương hiệu");
      } else if (botRes.data.rasa_intent.intent.name === "tim_bl_xau") {
        const entities = botRes.data.rasa_ner.merged_entities;
        const brand = entities[0].value;
        if (entities.length > 1) {
          const time = entities[1].value;
          this.props.history.push({
            pathname: `/analytics/${brand}`,
            state: { time, optionsSort: "ASC" }
          });
        } else {
          this.props.history.push({
            pathname: `/analytics/${brand}`,
            state: { optionsSort: "ASC" }
          });
        }
      } else if (botRes.data.rasa_intent.intent.name === "so_sanh") {
        const brand1 = botRes.data.rasa_ner.merged_entities[0].value;
        const brand2 = botRes.data.rasa_ner.merged_entities[1].value;

        this.props.history.push({
          pathname: `/compare`,
          state: { brand1, brand2 }
        });
      } else if (botRes.data.rasa_intent.intent.name === "tim_thuong_hieu") {
        const entities = botRes.data.rasa_ner.merged_entities;
        const product = entities[entities.length - 1].value;

        this.props.history.push({
          pathname: `/products`,
          state: { product }
        });
      } else if (botRes.data.rasa_intent.intent.name === "phan_tich_tu_khoa") {
        const brand = botRes.data.rasa_ner.merged_entities[0].value;

        this.props.history.push({
          pathname: `/analytics/${brand}`
        });
      }
    } else {
      if (value.trim() === "" || value === undefined) {
        alert("Vui lòng nhập tên thương hiệu trước khi tiếp tục");
      } else {
        this.props.history.push({
          pathname: `/analytics/${value}`
        });
      }
    }
  };

  render() {
    const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;

    return (
      <Wrapper isHome location={this.props.location.pathname}>
        <div
          style={{
            textAlign: "center",
            marginTop: 80,
            width: "100%",
            marginBottom: 50
          }}
        >
          <h1>Nhập tên thương hiệu muốn phân tích</h1>
          <AutoComplete
            className="search-dashboard"
            size="large"
            dataSource={this.state.completion}
            onSelect={this._onSelectSuggester}
            onSearch={this._onInput}
            optionLabelProp="value"
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
        <div style={{ paddingLeft: "20%", paddingBottom: 30 }}>
          <h3>Tìm kiếm nâng cao:</h3>
          <Link
            to={{
              pathname: `/analytics/oem`,
              state: { optionsSort: "ASC" }
            }}
          >
            <a href="#">Tìm bình luận xấu về oem</a>
          </Link>
          <br />
          <Link
            to={{
              pathname: `/analytics/everest`,
              state: {
                optionsSort: "ASC",
                time: {
                  from: moment()
                    .subtract(1, "month")
                    .format("YYYY-MM-DD"),
                  to: moment().format("YYYY-MM-DD")
                }
              }
            }}
          >
            <a href="#">Bình luận xấu về everest trong 1 tháng trước</a>
          </Link>
          <br />
          <Link
            to={{
              pathname: `/compare`,
              state: { brand1: "nike", brand2: "adidas" }
            }}
          >
            <a href="#">So sánh nike và adidas</a>
          </Link>
          <br />
          <Link
            to={{
              pathname: `/products`,
              state: { product: "giày nam" }
            }}
          >
            <a href="#">Tìm shop bán giày nam</a>
          </Link>
          <br />
          <Link
            to={{
              pathname: `/analytics/everest`
            }}
          >
            <a href="#">Phân tích everest</a>
          </Link>
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
            <Col md={6}>
              <h1>{this.state.brands_count}</h1>
              <p>Thương hiệu và cửa hàng</p>
            </Col>
            <Col md={6}>
              <h1>{this.state.products_count}</h1>
              <p>Sản phẩm</p>
            </Col>
            <Col md={6}>
              <h1>{this.state.comments_count}</h1>
              <p>Bình luận</p>
            </Col>
            <Col md={6}>
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
              <Tag color="#87d068">
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
            <h2 style={{ marginTop: 20, marginBottom: 20 }}>
              Các thương hiệu kém nhất
            </h2>
            {this.state.badBrands.map(item => (
              <Tag color="#f50">
                <Link to={`/analytics/${item}`}>{item}</Link>
              </Tag>
            ))}
            <h2 style={{ marginTop: 20, marginBottom: 20 }}>
              Các cửa hàng kém nhất
            </h2>
            {this.state.badDealers.map(item => (
              <Tag color="#f50">
                <Link to={`/analytics/${item}`}>{item}</Link>
              </Tag>
            ))}
          </div>
        )}
        <Modal
          closeOnEsc={true}
          closeOnOverlayClick={true}
          open={this.state.modalOpen}
          onClose={() => this.setState({ modalOpen: false })}
          center
          showCloseIcon={false}
          styles={{
            modal: {
              borderRadius: 10
            }
          }}
        >
          <div style={{ textAlign: "center" }}>
            <h4>Đang tải...</h4>
            <Spin indicator={antIcon} />
          </div>
        </Modal>
      </Wrapper>
    );
  }
}

export default Dashboard;
