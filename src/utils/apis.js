// get post 调用fetch，返回promise
import {post} from './request'

/**
 * 所有的后端接口地址
 */
const URLS = {
    //common_prefix: "http://www.shakeda.com:5555/api/v1.0/",
    common_prefix: "http://192.168.1.114:5555/api/v1.0/",

    account_login: "account/login",
    account_register_qrcode: "account/register/qrcode",
    account_register: "account/register",
    account_password_qrcode: "account/password/qrcode",
    account_password: "account/password/retrieve",
    account_password_update: "account/password/update",
    account_profile: "account/profile",
    account_profile_update: "account/profile/update",
    account_devices: "account/devices",
    account_device_add: "account/devices/add",
    account_device_remove: "account/devices/remove"
}

/**
 * 所有的后端接口方法
 */
class APIS_CLASS {

    /**
     * 用户登录
     * @param {*} telephone 手机号
     * @param {*} password  密码
     */
    user_login(telephone, password) {
        let url = URLS.common_prefix + URLS.account_login;
        let body = {
            telephone: telephone,
            password: password
        }
        return post(url, body);
    }

    /**
     * 获取注册码
     * @param {*} telephone 手机号
     */
    register_qrcode(telephone) {
        let url = URLS.common_prefix + URLS.account_register_qrcode;
        let body = {
            telephone: telephone
        }
        return post(url, body);
    }

    /**
     * 注册
     * @param {*} telephone
     * @param {*} password
     * @param {*} qrcode
     * @param {*} name
     */
    register(telephone, password, qrcode, name) {
        let url = URLS.common_prefix + URLS.account_register;
        let body = {
            telephone: telephone,
            password: password,
            qrcode: qrcode,
            name: name
        }
        return post(url, body);
    }

    /**
     * 修改密码 注册码
     * @param {*} telephone
     */
    password_qrcode(telephone) {
        let url = URLS.common_prefix + URLS.account_password_qrcode;
        let body = {
            telephone: telephone
        }
        return post(url, body);
    }

    /**
     * 找回密码
     * @param {*} telephone
     * @param {*} qrcode
     * @param {*} password
     */
    password(telephone, password, qrcode) {
        let url = URLS.common_prefix + URLS.account_password;
        let body = {
            telephone: telephone,
            newpassword: password,
            qrcode: qrcode
        }
        return post(url, body);
    }

    /**
     * 重置密码
     * @param {*} password
     */
    password_update(password) {
        let url = URLS.common_prefix + URLS.account_password_update;
        let body = {
            new_password: password,
        }
        return post(url, body);
    }

    /**
     * 获取用户资料
     */
    profile() {
        let url = URLS.common_prefix + URLS.account_profile;
        let body = {}
        return post(url, body);
    }


    /**
     * 更新用户资料
     */
    profile_update(name) {
        let url = URLS.common_prefix + URLS.account_profile_update;
        let body = {
            new_name: name,
        }
        return post(url, body);
    }

    /**
     * 查询设备
     */
    devices() {
        let url = URLS.common_prefix + URLS.account_devices;
        let body = {
        }
        return post(url, body);
    }

    /**
     * 添加设备
     * @param {*} name
     * @param {*} imei
     */
    addDevice(name, imei) {
        let url = URLS.common_prefix + URLS.account_device_add;
        let body = {
            name: name,
            sid: imei
        }
        return post(url, body);
    }

    /**
     * 删除设备
     * @param {*} imei
     */
    removeDevice(imei) {
        let url = URLS.common_prefix + URLS.account_device_remove;
        let body = {
            sid: imei
        }
        return post(url, body);
    }
}

const APIS = new APIS_CLASS();
export default APIS;