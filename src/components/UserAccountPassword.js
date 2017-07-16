import React from 'react'
import RouteMap from '../utils/router'

import APIS from '../utils/apis'

import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'

import {user_password} from '../redux/actions/user'


import {message} from 'antd'

import { Form, Input, Select, Row, Col, Button} from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;

class PasswordForm extends React.Component {
  state = {
    confirmDirty: false,
     disableGetCaptchaButton: false,
    captchaButtonText: "Get",
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        this.props.user_password(values.phone, values.password, values.captcha);
      }
    });
  }
  handleConfirmBlur = (e) => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  }
  checkPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent!');
    } else {
      callback();
    }
  }
  checkConfirm = (rule, value, callback) => {
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  }

  handleWebsiteChange = (value) => {
    let autoCompleteResult;
    if (!value) {
      autoCompleteResult = [];
    } else {
      autoCompleteResult = ['.com', '.org', '.net'].map(domain => `${value}${domain}`);
    }
    this.setState({ autoCompleteResult });
  }


  gotoLogin = (e) => {
    this.props.history.push(RouteMap.userAccountLogin);
  }

  gotoRegister = (e) => {
    this.props.history.push(RouteMap.userAccountRegister);
  }

  getCaptcha = (e) => {
    this
      .props
      .form
      .validateFields(["phone"], (err, values) => {
        if (!err) {
          console.log('Received values of form: ', values);

          // 开始发送短信修改密码的验证码
          APIS
            .password_qrcode(this.props.form.getFieldValue("phone"))
            .then((res) => {
              if (res.success) {
                message.info('captcha has been send!');

                // 发送成功后 60秒禁用 1.禁用发送验证码按钮
                this.setState({disableGetCaptchaButton: true, captchaButtonText: 60});

                // 2.开启倒计时
                this.t = setInterval(() => {
                  if (this.state.captchaButtonText === 0) {
                    clearInterval(this.t);
                    this.setState({disableGetCaptchaButton: false, captchaButtonText: "Get"});
                  } else {
                    console.log(this.state.captchaButtonText)
                    this.setState({
                      disableGetCaptchaButton: true,
                      captchaButtonText: this.state.captchaButtonText - 1
                    });
                  }
                }, 1000)

              } else {
                message.error(res.msg);
              }

              console.log(res);
            })
            .catch((err) => {
              console.log(err);
            })

        }
      })
  }

  componentWillUnmount=()=>{
    clearInterval(this.t)
  }


  render() {
    const { getFieldDecorator } = this.props.form;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 10 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 14 },
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 14,
          offset: 10,
        },
      },
    };
    const prefixSelector = getFieldDecorator('prefix', {
      initialValue: '86',
    })(
      <Select style={{ width: 60 }}>
        <Option value="86">+86</Option>
        <Option value="87">+87</Option>
      </Select>
    );

    return (
      <Form onSubmit={this.handleSubmit} autoComplete="off">
           <FormItem
          {...formItemLayout}
          label="Phone Number"
        >
          {getFieldDecorator('phone', {
            rules: [{ required: true, message: 'Please input your phone number!' },
            {pattern: /^1(3|4|5|7|8)\d{9}$/, message:"Please input property phone!" }],
          })(
            <Input addonBefore={prefixSelector} style={{ width: '100%' }} />
          )}
        </FormItem>

         <FormItem
          {...formItemLayout}
          label="Captcha"
        >
          <Row gutter={3}>
            <Col span={14}>
              {getFieldDecorator('captcha', {
                rules: [{ required: true, message: 'Please input the captcha you got!' },
                 {pattern: /^\d{6}$/, message:"Please input captcha you receive!"  }],
              })(
                <Input size="large"  autoComplete="new-password"/>
              )}
            </Col>
            <Col span={10}>
                <Button size="large" disabled={this.state.disableGetCaptchaButton} style={{width:"100%"}} onClick={()=>this.getCaptcha()}>{this.state.captchaButtonText}</Button>
            </Col>
          </Row>
        </FormItem>

        <FormItem
          {...formItemLayout}
          label="New Password"
          hasFeedback
        >
          {getFieldDecorator('password', {
            rules: [{
              required: true, message: 'Please input your password!',
            }, {
              validator: this.checkConfirm,
            }],
          })(
            <Input type="password" autoComplete="new-password"/>
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="Confirm Password"
          hasFeedback
        >
          {getFieldDecorator('confirm', {
            rules: [{
              required: true, message: 'Please confirm your password!',
            }, {
              validator: this.checkPassword,
            }],
          })(
            <Input type="password" onBlur={this.handleConfirmBlur} autoComplete="new-password"/>
          )}
        </FormItem>
       
        <FormItem {...tailFormItemLayout}>
             <Button
            type="primary"
            htmlType="submit"
            style={{
            width: "100%"
          }}>
            Retrieve password
          </Button>
          <a href={RouteMap.userAccountLogin} onClick={() => this.gotoLogin()}>Login</a>
          <a href={RouteMap.userAccountRegister} onClick={() => this.gotoRegister()}
            style={{
            float: "right"
          }}>Register Now</a>
        </FormItem>
      </Form>
    );
  }
}

const WrappedPasswordForm = Form.create()(PasswordForm);



function mapStateToProps(state) {
  return {
    //  userToken: state.userReducer.token,  userData: state.userReducer.profile,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    user_password: bindActionCreators(user_password, dispatch)
  }
}

const ConnectedWrappedPasswordForm = connect(mapStateToProps, mapDispatchToProps)(WrappedPasswordForm);
export default ConnectedWrappedPasswordForm;