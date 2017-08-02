import React from 'react'
import {Input, Form, Button, message} from 'antd';
import APIS from '../utils/apis'
import RouteMap from '../utils/router'

import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {user_log_out} from '../redux/actions/user'

const FormItem = Form.Item;
const formLayout = {
    labelCol: {
        span: 4
    },
    wrapperCol: {
        span: 16
    }
};

class UserProfileComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            recommendUsers: []
        };
        this.handleSubmit = this
            .handleSubmit
            .bind(this);
    }

    
    componentDidMount() {
        const {profile, form} = this.props;
        form.setFieldsValue({name: profile.name});
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


    handleSubmit(e) {
        e.preventDefault();

        const {form} = this.props;

        form.validateFields((err, values) => {
            if (!err) {
                console.log(values);

                // 开始修改密码
            APIS.password_update(form.getFieldValue("password"))
                .then((res) => {
                if (res.success) {
                    message.info('密码修改成功，请重新登录!');
                     this.props.user_log_out();
                     this.props.history.push(RouteMap.userAccountLogin);
                } else {
                    message.error(res.msg);
                }

                console.log(res);
                })
             .catch((err) => {
              console.log(err);
            })

            }
        });
    }

    render() {
        const {form} = this.props;
        const {getFieldDecorator} = form;
        const formLayout = {
            labelCol: {
                span: 4
            },
            wrapperCol: {
                span: 16
            }
        };
        return (
            <Form
                onSubmit={this.handleSubmit}
                style={{
                width: '400px',
                padding: '12px'
            }}>
                <FormItem
                    {...formLayout}
                    label="密码"
                    hasFeedback
                >
                    {getFieldDecorator('password', {
                    rules: [{
                        required: true, message: 'Please input your password!',
                    }, {
                        validator: this.checkConfirm,
                    }],
                    })(
                    <Input type="password"  autoComplete="new-password"/>
                    )}
                </FormItem>
                <FormItem
                    {...formLayout}
                    label="确认"
                    hasFeedback
                >
                    {getFieldDecorator('confirm', {
                    rules: [{
                        required: true, message: 'Please confirm your password!',
                    }, {
                        validator: this.checkPassword,
                    }],
                    })(
                    <Input type="password" onBlur={this.handleConfirmBlur}  autoComplete="new-password"/>
                    )}
                </FormItem>

                <FormItem
                    wrapperCol={{
                    span: formLayout.wrapperCol.span,
                    offset: formLayout.labelCol.span
                }}>
                    <Button type="primary" htmlType="submit">提交</Button>
                </FormItem>

            </Form>

        );
    }

}

UserProfileComponent = Form.create()(UserProfileComponent);


function mapStateToProps(state) {
  return {
      profile: state.userReducer.profile
  }
}

function mapDispatchToProps(dispatch) {
  return {
       user_log_out: bindActionCreators(user_log_out, dispatch)
  }
}

const ConnectedUserProfileComponent = connect(mapStateToProps, mapDispatchToProps)(UserProfileComponent);

export default ConnectedUserProfileComponent;