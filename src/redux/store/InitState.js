/**
 * 本文件的作用就是直观呈现 整个应用状态结构树 及其 初始值
 */
/**
 * 将内容嵌套 限定在三级以内
 * 三级以内（第1、2、3） <部分更新>
 * 三级以外（第4 第5等） <替换更新>
 */ 

export default {
  
  userReducer:{

    /* 用户正在注册 */
    register_loading: false,

    /* 用户正在登录 */
    signin_loading: false,

    /* 用户正在修改密码 */
    password_loading: false,

    /* 登录成功 token */
    token: null,

    /* 用户 数据 */
    profile: {
      phone: null,
      name: null,
    },
  },

  uiReducer:{
    manageCurrentIndex: '1',
  },

  /** 
   * 关心每个设备的情况 与服务器不断的做同步 没有超过服务器提供的额外
   */
  positionReducer:{
    deviceList: []
    /** 
     * 每个device的状态包括
     * name          名称
     * IMEI          设备号
     * electriccity  剩余电量
     * status        是否在线
     * 
     * monitor       是否监测
     * 
     */
  }
}
