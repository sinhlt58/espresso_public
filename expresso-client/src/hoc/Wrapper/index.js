import React, { Component } from "react";
import { Layout, Menu, Row, Col, Icon, Drawer } from "antd";
import { Link } from "react-router-dom";
import SideMenu from "../../components/SideMenu";
import windowSize from "react-window-size";
import "./style.css";

const { Header, Content } = Layout;
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

class Wrapper extends Component {
  state = {
    selectedMenu: "",
    mobileMenuOpen: false,
    setIsMobileMenu: false
  };

  componentWillMount() {
    this.setState({
      selectedMenu: this.props.location.split("/")[1]
    });
  }

  componentDidMount() {
    if (this.props.windowWidth < 768) {
      this.setState({
        setIsMobileMenu: true
      });
    }
  }

  renderNavLinks = () => [
    <Menu.Item key="compare">
      <Link to={`/compare`}>So sánh</Link>
    </Menu.Item>,
    <Menu.Item key="products">
      <Link to="/products">Sản phẩm</Link>
    </Menu.Item>,
    <Menu.Item key="rank">
      <Link to="/ranking">Xếp hạng</Link>
    </Menu.Item>
  ];

  toggleMobileMenuOpen = () => {
    this.setState({
      mobileMenuOpen: false
    });
  };

  render() {
    const isDevelopment = process.env.NODE_ENV === "development";
    let sentimentNav = (
      <Menu.Item key="sentiment">
        <Link to="/sentiment">Sentiment</Link>
      </Menu.Item>
    );
    if (!isDevelopment) {
      sentimentNav = "";
    }

    let facebookNav = (
      <Menu.Item key="fbtest">
        <Link to="/facebooktest">Facebook</Link>
      </Menu.Item>
    );
    if (!isDevelopment) {
      facebookNav = "";
    }

    const { mobileMenuOpen } = this.state;

    return (
      <Layout style={this.props.style}>
        <Drawer
          title="Espresso"
          placement="right"
          closable={true}
          visible={mobileMenuOpen}
          onClose={this.toggleMobileMenuOpen}
          mask={true}
          maskClosable={true}
        >
          <Menu>{this.renderNavLinks()}</Menu>
        </Drawer>
        <Header
          style={{
            backgroundColor: "#3892F7",
            paddingRight: this.state.setIsMobileMenu ? "0" : "0 10%"
          }}
        >
          <div className="logo">
            <Link to="/">
              <h2 style={{ margin: "0px 0px 0px 0px", color: "#FFF" }}>
                Espresso
              </h2>
            </Link>
          </div>
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={[this.state.selectedMenu]}
            style={{ lineHeight: "64px", backgroundColor: "#3892F7" }}
          >
            {this.state.setIsMobileMenu ? null : this.renderNavLinks()}
            {this.state.setIsMobileMenu ? (
              <Menu.Item
                style={{
                  float: "right"
                }}
              >
                <a onClick={() => this.setState({ mobileMenuOpen: true })}>
                  <Icon type="bars" style={{ fontSize: 20, color: "white" }} />
                </a>
              </Menu.Item>
            ) : null}
          </Menu>
        </Header>
        {this.props.isHome ? null : (
          <Menu
            className="menu-mobile"
            onClick={this.handleClick}
            selectedKeys={[this.state.current]}
            mode="horizontal"
            theme="light"
            style={{ textAlign: "center" }}
          >
            <Menu.Item key="analytics">
              <Link to={`/analytics/${this.props.brand}`}>Chi tiết</Link>
            </Menu.Item>
            <Menu.Item key="reports">
              <Link to={`/reports/${this.props.brand}`}>Báo cáo</Link>
            </Menu.Item>
            <Menu.Item key="facebook">
              <Link to={`/facebook/${this.props.brand}`}>Facebook</Link>
            </Menu.Item>
          </Menu>
        )}

        <Row
          style={{
            display: "-webkit-flex",
            display: "-ms-flexbox",
            display: "flex",
            overflow: "hidden"
          }}
        >
          {this.props.isHome ? null : (
            <SideMenu
              path={this.state.selectedMenu}
              brand={this.props.brand}
              style={{ flex: 1, minHeight: "100vh" }}
            />
          )}
          <Content style={{ flex: 9 }}>{this.props.children}</Content>
        </Row>
      </Layout>
    );
  }
}

export default windowSize(Wrapper);
