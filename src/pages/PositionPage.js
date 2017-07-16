import React from 'react'
import {Layout} from 'antd';

import BaiduMapComponent from '../components/PositionBaiduMap'

import './PositionPage.css'


class ManagePage extends React.Component {
  state = {
    theme: 'dark',
    current: '1'
  }
  handleClick = (e) => {
    console.log('click ', e);
    this.setState({current: e.key});

    console.log(e.item.props.path);
    this
      .props
      .history
      .push(e.item.props.path);
  }
  render() {
    return (
          <Layout style={{height:"100%"}}>
            <Layout.Sider className="slider" width="360">
              定位菜单
              {/*<Menu
                theme={this.state.theme}
                onClick={this.handleClick}

                defaultOpenKeys={['devices']}
                selectedKeys={[this.state.current]}
                mode="inline">
                <SubMenu
                  key="devices"
                  title={< span > <Icon type="mail"/> < span > 设备管理 </span></span >}>
                  <Menu.Item key="1" path={RouteMap.deviceList}>设备列表</Menu.Item>
                  <Menu.Item key="2" path={RouteMap.deviceAdd}>添加设备</Menu.Item>
                </SubMenu>
              </Menu>*/}
            </Layout.Sider>

            <Layout.Content className="content">
                <BaiduMapComponent/>
            </Layout.Content>
          </Layout>
    );
  }
}

export default ManagePage;