import APIS from '../../utils/apis'
import History from '../../utils/history'
import RouteMap from '../../utils/router'

import {message} from 'antd'

// 对象命名 和 函数命名 模仿Python

export const USER_REGISTER = "USER_REGISTER"

export const USER_SIGN_IN = "USER_SIGN_IN"
export const USER_LOG_IN = 'USER_LOG_IN'
export const USER_LOG_IN_FAILED = 'USER_LOG_IN_FAILED'

export const USER_PASSWORD = "USER_PASSWORD"

export const USER_LOG_OUT = 'USER_LOG_OUT'

export const GET_USER_DATA = "GET_USER_DATA"
export const USER_DATA_RECEIVED = "USER_DATA_RECEIVED"


/**
 * 用户注册动作
 */
export function user_register(telephone, password, qrcode, name) {

  return dispatch => {
    // 开始注册
    return dispatch({
      type: USER_REGISTER,
      payload: APIS.register(telephone, password, qrcode, name)
    }).then(({value, action}) => {

      console.log(value);
      //注册成功  
      if (value.success === true) {
        // 直接登录
        message.info("恭喜你，注册成功！")
        dispatch(user_sign_in(telephone, password))

        //跳转到主页面
        History.push(RouteMap.homePage);
      }
      //注册失败
      else {
        // 给出失败原因
        message.error(value.msg);
      }
    }).catch((error) => {
      console.log(error);
    });
  };
}


/**
 * 用户登录动作
 * 分析：这个要不要直接写在登录框里面？
 * 1.在这里可以维护异步时的状态
 * 2.登录框里只用关注这一个动作
 */
export function user_sign_in(telephone, password) {

  return dispatch => {
    // 开始登录
    return dispatch({
      type: USER_SIGN_IN,
      payload: APIS.user_login(telephone, password)
    }).then(({value, action}) => {

      console.log(value);
      //登录成功  
      if (value.success === true) {

        //跳转到主页面
        History.push(RouteMap.homePage);

        //写入token
        dispatch(user_log_in(value.token));

        //获取用户资料
        APIS.profile().then(
          (value)=>{
            console.log(value);
            dispatch(user_data_received(telephone, value.name))
          }
        )
      }
      //登录失败 
      else {
        // 给出失败原因
        message.error(value.msg);
      }
    }).catch((error) => {
      console.log(error);
    });
  };
}

// 用户登录成功
export function user_log_in(token) {
  return {
    type: USER_LOG_IN,
    payload: {
      token: token
    }
  }
}


/**
 * 用户修改密码动作
 */
export function user_password(telephone, password, qrcode) {

  return dispatch => {
    // 开始修改
    return dispatch({
      type: USER_PASSWORD,
      payload: APIS.password(telephone, password, qrcode)
    }).then(({value, action}) => {

      console.log(value);
      //修改成功  
      if (value.success === true) {
        
        // 给出提示
        message.info("恭喜你，修改密码成功！")

        // 直接登出
        dispatch(user_log_out())

        // 跳转到登录
        History.push(RouteMap.userAccountLogin);
      }
      //修改密码失败
      else {
        // 给出失败原因
        message.error(value.msg);
      }
    }).catch((error) => {
      console.log(error);
    });
  };
}



// 收到用户资料
export function user_data_received(phone, name) {
  return {
    type: USER_DATA_RECEIVED,
    payload: {
      phone: phone,
      name: name
    }
  }
}

// 用户退出
export function user_log_out() {
  return {
    type: USER_LOG_OUT,
    payload: {
      token: null
    }
  }
}
