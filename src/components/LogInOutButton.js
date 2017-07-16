import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {withRouter} from 'react-router-dom'

import {user_log_out} from '../redux/actions/user'
import { Menu, Dropdown } from 'antd';

import RouteMap from '../utils/router'


class LoginInOutButton extends React.Component {

    /**
     * 在Qt中 下拉菜单的action 也定义为 class的成员
     * 触发后 class 判断是哪一个action 做出回应
     * 
     * 这里的menu.item 作为了 menu的成员
     * 触发后menu将key object传送出来 在外部的class中进行处理
     *  
     */

    constructor(props) {
        super(props);

        this.menu = (
            <Menu onClick={(key)=>this.clickMenu(key.key)}>
                <Menu.Item key="logout">退出</Menu.Item>
            </Menu>
        );
    }

    clickMenu = function (key) {
        if(key==="logout")
        {
           this.props.user_log_out();
           this.props.history.push(RouteMap.homePage);
        }
    };

    render() {
        const {userData, history} = this.props;

        return (
            <div>
                {(userData.name !== null && userData.name!=="")
                    ? <Dropdown overlay={this.menu}>
                            <span>{userData.name}</span>
                        </Dropdown>
                    : <span onClick={() => {history.push(RouteMap.userAccountLogin) }}>登录</span>} 
            </div>
        );
    }
}


function mapStateToProps(state) {
  return {
       userData: state.userReducer.profile,
     }
}

function mapDispatchToProps(dispatch) {
  return {
    user_log_out: bindActionCreators(user_log_out, dispatch)
  }
}

const LoginButtonWithRouter = withRouter(LoginInOutButton)

const VisibleLogInOutButton = connect(mapStateToProps, mapDispatchToProps)(LoginButtonWithRouter);
export default VisibleLogInOutButton;