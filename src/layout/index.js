/* eslint-disable prettier/prettier */
import React from 'react';
import { withRouter, NavLink } from 'react-router-dom';
import { Layout, Menu, Button } from 'antd';
import { getSession } from '@utils/utils';
import './assets/styles/index.less';

const { Header, Content, Footer, Sider } = Layout;
const SubMenu = Menu.SubMenu;
const MenuItem = Menu.Item;

import routes from '@router/teacher';
import withBreadcrumbs from 'react-router-breadcrumbs-hoc';

const Breadcrumbs = ({ breadcrumbs }) => (
  <React.Fragment>
    {breadcrumbs.map(({ match, breadcrumb }) => {
      return (
        <span key={match.url}>
          <NavLink to={match.url}>
            {breadcrumb['props']['children'][0] == ':'
              ? match['params'][breadcrumb['props']['children'].substr(1)]
              : breadcrumb}
          </NavLink>{' '}
          <span>/</span>
        </span>
      );
    })}
  </React.Fragment>
);

const Bread = withBreadcrumbs(routes)(Breadcrumbs);

// eslint-disable-next-line react/no-multi-comp
class BaseComponents extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: false,
      menuList: []
    };
    this.openKeys = [];
    this.current = [];
  }

  goHome() {
    this.props.history.push('/fullHome');
  }

  // eslint-disable-next-line prettier/prettier
  renderMenu(data, path) {
    let that = this;
    return data.map(function(item) {
      if (item['menuList'] && item['menuList'].length > 0) {
        return (
          <SubMenu
            key={item['menuNo']}
            title={
              <span>
                {item['menuLevel'] === 'ONE' ? (
                  <span type="appstore">11</span>
                ) : (
                  ''
                )}
                <span>{item['menuName']}</span>
              </span>
            }
          >
            {::this.renderMenu(item.menuList, path)}
          </SubMenu>
        );
      }

      if (path) {
        if (path.indexOf(item['menuUrl']) > -1) {
          that.openKeys = [item['parentMenuNo']];
          that.current = [item['menuNo']];
        }
      }
      return (
        <MenuItem
          key={item['menuNo']}
          onClick={() => {
            this.props.history.push(item['menuUrl']);
          }}
        >
          {item['menuLevel'] === 'ONE' ? <span>11</span> : ''}
          <span>{item['menuName']}</span>
        </MenuItem>
      );
    }, this);
  }

  toggleCollapsed = () => {
    this.setState({
      collapsed: !this.state.collapsed
    });
  };

  render() {
    // this.breadCrumb = [];
    // this.renderBreadcrumb(this.state.menuList, this.props.history.location.pathname);
    // this.breadCrumb.reverse();

    let menus = JSON.parse(getSession('auth'));
    let { menuInfo } = menus;
    let { menuList } = menuInfo;
    let menu = this.renderMenu(menuList, this.props.history.location.pathname);

    return (
      <Layout>
        <Header className="header headerBC">
          <div>
            <Button
              type="primary"
              onClick={this.toggleCollapsed}
              style={{ marginBottom: 16 }}
            ></Button>
            <img
              style={{ height: 50 }}
              src={require('@src/commen/img/xtzy.png')}
            />
            {/*< img style={{*/}
            {/*height: 30,*/}
            {/*marginLeft: 15*/}
            {/*}} src={require('./img/school_name.png')}/>*/}

            <div
              style={{
                display: 'flex',
                float: 'right',
                color: 'white'
              }}
            >
              <span style={{ marginRight: '15px' }}>
                {JSON.parse(getSession('auth'))['userName']}
              </span>
              <span
                className={'name_box'}
                style={{
                  marginRight: '15px',
                  cursor: 'pointer'
                }}
                onClick={this.goHome.bind(this)}
              >
                领导驾驶舱
              </span>
            </div>
          </div>
        </Header>

        <Layout style={{ minHeight: document.body.clientHeight - 64 }}>
          <Sider
            width={this.state.collapsed ? 80 : 220}
            trigger={null}
            collapsible
            collapsed={this.state.collapsed}
            style={{
              height: document.body.clientHeight - 64,
              overflowY: 'auto'
            }}
          >
            <div
              style={{
                minHeight: '100%',
                paddingBottom: '50px',
                background: '#283B5C',
                color: '#FFF'
              }}
            >
              <Menu
                className="left-menu"
                mode="inline"
                defaultSelectedKeys={this.current}
                defaultOpenKeys={this.openKeys}
              >
                {menu}
              </Menu>
            </div>
          </Sider>

          <Layout
            style={{
              height: document.body.clientHeight - 64,
              overflowY: 'auto'
            }}
          >
            <Content
              style={{
                minHeight: 'max-content',
                background: '#fff'
              }}
              className={'aiContent'}
            >
              <Bread></Bread>
              <div style={{ marginTop: 20 }}></div>
              {this.props.children}
            </Content>
            <Footer>
              <p
                style={{
                  textAlign: 'center',
                  margin: 0,
                  fontSize: '12px'
                }}
              >
                版权所有 © 三盟科技股份有限公司 2013- {new Date().getFullYear()}{' '}
                保留一切权利
              </p>
            </Footer>
          </Layout>
        </Layout>
      </Layout>
    );
  }
}

export default withRouter(BaseComponents);
