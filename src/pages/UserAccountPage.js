import React from 'react'
import {Route} from 'react-router-dom'
import {Spin} from 'antd';
import {connect} from 'react-redux'

import './UserAccountPage.css';


import UserAccountLoginComponent from '../components/UserAccountLogin'
import UserAccountRegisterComponent from '../components/UserAccountRegister'
import UserAccountPasswordComponent from '../components/UserAccountPassword'

import RouteMap from '../utils/router'

// import Background from '../images/useraccount-background.jpg'

class UserAccountPage extends React.Component {
   
    render() {
        const Background = "https://ooo.0o0.ooo/2016/06/20/5768c606cf9cb.jpg";

        const container = (
            <div style={{
                backgroundColor: "white",
                borderRadius: "5px",
                padding: "10px 5px 0px",
            }}>
                <Route path={RouteMap.userAccountLogin} component={UserAccountLoginComponent}/>
                <Route
                    path={RouteMap.userAccountRegister}
                    component={UserAccountRegisterComponent}/>
                <Route
                    path={RouteMap.userAccountPassword}
                    component={UserAccountPasswordComponent}/>
            </div>
        );
                

        return (
             
            // 整体大的画布 占满全屏幕
            <div
                style={{
                position: "fixed",
                width: "100%",
                height: "100vh",
                top: 0,
                left: 0,
                backgroundColor: "#f9f9f9",
            }}>

            {/* backgroundImage: `url(${Background})` */}


            {/*利用flex布局 使登录框 注册框居中*/}
                <div className="wangxk"
                    style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100%",
                    marginTop:"-5%",
                }}>
                    <div><img width="64px" height="64px" src={require('../images/logo.png')} alt="logo" onClick={()=>this.props.history.push(RouteMap.homePage)}></img></div>
                    <br></br>
                    <Spin spinning={this.props.signin_loading || this.props.register_loading || this.props.password_loading} delay={500}>{container}</Spin>
                </div>

            </div>
        );
    }
}

function mapStateToProps(state) {
  return {
    signin_loading: state.userReducer.signin_loading,
    register_loading: state.userReducer.register_loading,
    password_loading: state.userReducer.password_loading,
  }
}

function mapDispatchToProps(dispatch) {
  return {
  }
}

const ConnectedUserAccountPage = connect(mapStateToProps, mapDispatchToProps)(UserAccountPage);
export default ConnectedUserAccountPage;

