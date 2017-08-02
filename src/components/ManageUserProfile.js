import React from 'react'
import {Input, Form, Button, message} from 'antd';
import APIS from '../utils/apis'
import RouteMap from '../utils/router'

import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {user_data_received} from '../redux/actions/user'

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

        this.handleSubmit = this
            .handleSubmit
            .bind(this);
    }

    
    componentDidMount() {
        const {profile, form} = this.props;
        form.setFieldsValue({name: profile.name});
    }
    

    handleSubmit(e) {
        e.preventDefault();

        const {form} = this.props;

        form.validateFields((err, values) => {
            if (!err) {
                console.log(values);

                // 开始修改名称
                APIS.profile_update(form.getFieldValue("name"))
                    .then((res) => {
                    if (res.success) {
                        message.info('用户资料修改成功!');
                        
                        //获取用户资料
                        APIS.profile()
                        .then(
                            (value)=>{
                            console.log(value);
                            this.props.user_data_received(value.telephone, value.name)
                        })

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
        return (
            <Form
                onSubmit={this.handleSubmit}
                style={{
                width: '400px',
                padding: '12px'
            }}>
                <FormItem label="新昵称：" {...formLayout}>
                    {getFieldDecorator('name', {
                        rules: [
                            {
                                required: true,
                                message: '请输入昵称'
                            }
                        ]
                    })(<Input type="text"/>)}
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
        user_data_received: bindActionCreators(user_data_received, dispatch)
  }
}

const ConnectedUserProfileComponent = connect(mapStateToProps, mapDispatchToProps)(UserProfileComponent);

export default ConnectedUserProfileComponent;