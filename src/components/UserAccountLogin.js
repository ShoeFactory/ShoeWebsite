import {Form, Icon, Input, Button} from 'antd';
import React from 'react';
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'

import {user_sign_in} from '../redux/actions/user'

import RouteMap from '../utils/router'

const FormItem = Form.Item;

class NormalLoginForm extends React.Component {

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values);
          // 利用搜集的用户名密码进行登录
          this.props.user_sign_in(values.userName, values.password);
        }
      });
  }

  gotoPassword = (e) => {
    this.props.history.push(RouteMap.userAccountPassword);
  }

  gotoRegister = (e) => {
    this.props.history.push(RouteMap.userAccountRegister);
  }

  render() {
    const {getFieldDecorator} = this.props.form;

    const loginForm = (
      <Form onSubmit={this.handleSubmit}
        style={{
        maxWidth: "300px"
      }}>
        <FormItem>
          {getFieldDecorator('userName', {
            rules: [
              {
                required: true,
                message: 'Please input your telephone!'
              }
            ]
          })(
            <Input
              prefix={< Icon type = "phone" style = {{ fontSize: 13 }}/>}
              placeholder="Telephone"  autoComplete="new-password" />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('password', {
            rules: [
              {
                required: true,
                message: 'Please input your Password!'
              }
            ]
          })(
            <Input
              prefix={< Icon type = "lock" style = {{ fontSize: 13 }}/>}
              type="password"
              placeholder="Password" autoComplete="new-password" />
          )}
        </FormItem>
        <FormItem>
         
          <Button
            type="primary"
            htmlType="submit"
            style={{
            width: "100%"
          }}>
            Log in
          </Button>
          <a href={RouteMap.userAccountRegister} onClick={() => this.gotoRegister()}>Register now</a>
          <a href={RouteMap.userAccountPassword} onClick={() => this.gotoPassword()}
            style={{
            float: "right"
          }}>Forgot password</a>
        </FormItem>
      </Form>
    );
    return (
      <div>
        {loginForm}
      </div>
    );
  }
}

const WrappedNormalLoginForm = Form.create()(NormalLoginForm);

function mapStateToProps(state) {
  return {
    //  userToken: state.userReducer.token,  userData: state.userReducer.profile,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    user_sign_in: bindActionCreators(user_sign_in, dispatch)
  }
}

const ConnectedWrappedNormalLoginForm = connect(mapStateToProps, mapDispatchToProps)(WrappedNormalLoginForm);
export default ConnectedWrappedNormalLoginForm;
