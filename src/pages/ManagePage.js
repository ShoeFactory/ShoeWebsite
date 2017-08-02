import React from 'react'
import { Route} from 'react-router-dom'
import { Icon, Menu, Layout } from 'antd'

import DeviceAddComponent from '../components/ManageDeviceAdd'
import DeviceListComponent from '../components/ManageDeviceList'
import UserProfileComponent from '../components/ManageUserProfile'

import UpdatePasswordComponent from '../components/ManageUpdatePassword'


import RouteMap from '../utils/router'

import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'

import {setManageCurrentIndex} from '../redux/actions/ui'


import "./ManagePage.css"

// 设备列表 添加设备 左右布局
const SubMenu = Menu.SubMenu;

class ManagePage extends React.Component {
  state = {
    theme: 'light',
    current: '1',
  }
  handleClick = (e) => {
    console.log('click ', e);
    this.props.setManageCurrentIndex(e.key)

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
              <Menu
                theme={this.state.theme}
                onClick={this.handleClick}

                defaultOpenKeys={['devices']}
                selectedKeys={[this.props.manageCurrentIndex]}

                mode="inline">
                <SubMenu
                  key="devices"
                  title={< span > <Icon type="api"/> < span > 设备管理 </span></span >}>
                  <Menu.Item key="1" path={RouteMap.deviceList}>设备列表</Menu.Item>
                  <Menu.Item key="2" path={RouteMap.deviceAdd}>添加设备</Menu.Item>
                </SubMenu>
                <SubMenu
                  key="account"
                  title={< span > <Icon type="user"/> < span > 账号管理 </span></span >}>
                  <Menu.Item key="3" path={RouteMap.userProfile}>个人资料</Menu.Item>
                  <Menu.Item key="4" path={RouteMap.updatePassword}>重置密码</Menu.Item>
                </SubMenu>
              </Menu>
            </Layout.Sider>

            <Layout.Content className="content">
              <div>
                <Route path={RouteMap.deviceList} component={DeviceListComponent}/>
                <Route path={RouteMap.deviceAdd}  component={DeviceAddComponent}/>
                <Route path={RouteMap.userProfile}  component={UserProfileComponent}/>
                <Route path={RouteMap.updatePassword}  component={UpdatePasswordComponent}/>
              </div>
            </Layout.Content>
          </Layout>
    );
  }
}


function mapStateToProps(state) {
  return {
    manageCurrentIndex: state.uiReducer.manageCurrentIndex,
  }
}

function mapDispatchToProps(dispatch) {
  return {
        setManageCurrentIndex: bindActionCreators(setManageCurrentIndex, dispatch)
  }
}

const ConnectedManagePage = connect(mapStateToProps, mapDispatchToProps)(ManagePage);
export default ConnectedManagePage;