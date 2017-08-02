import React from 'react'
import {Layout} from 'antd';

import BaiduMapComponent from '../components/PositionBaiduMap'

import {Row, Col, Card, Switch} from 'antd';
import APIS from '../utils/apis'

import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {receiveDeviceList} from '../redux/actions/position'

import './PositionPage.css'


class PositionPage extends React.Component {
  
  componentWillMount() {
        // 查询设备
        APIS.devices()
            .then((res) => {
            if (res.success) {
                  this.props.receiveDeviceList(res.devices)
            } else {
                console.log(res.msg);
            }

            console.log(res);
            })
          .catch((err) => {
          console.log(err);
        })
  }
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
    const {deviceList} = this.props

    const TheSwitch = <Switch defaultChecked={false} size="small" />;

    const deviceListItems = deviceList.map(
      (device, index)=>
          <div style={{marginBottom:"10px"}}>
            <Card style={{backgroundColor:"#ececec"}}>
                <h3 style={{borderBottom: "2px solid #555"}}>{device.name}</h3>
                <Row>
                  <Col span={14} >【状态】：离线</Col>
                  <Col span={8} offset={2}>【监视】：{TheSwitch}</Col>
                </Row>
                <Row>
                  <Col span={14}>【IMEI】：{device.sid}</Col>
                  <Col span={8} offset={2}>【电量】：78%</Col>
                </Row>
            </Card>
          </div>

    )

    return (
          <Layout style={{height:"100%"}}>
            <Layout.Sider className="slider" width="360" style={{height:"100%"}}>
              <div style={{
                padding:"5px",
                overflow:"auto",
                height:"100%"
              }}>
                {deviceListItems}
              </div>
              
            </Layout.Sider>

            <Layout.Content className="content">
                <BaiduMapComponent/>
            </Layout.Content>
          </Layout>
    );
  }
}

function mapStateToProps(state) {
  return {
    deviceList: state.positionReducer.deviceList,
  }
}

function mapDispatchToProps(dispatch) {
  return {
        receiveDeviceList: bindActionCreators(receiveDeviceList, dispatch)
  }
}

const ConnectedPositionPage = connect(mapStateToProps, mapDispatchToProps)(PositionPage);
export default ConnectedPositionPage;