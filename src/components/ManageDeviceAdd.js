import React from 'react'
import {Input, Form, Button, message} from 'antd';
import APIS from '../utils/apis'
import RouteMap from '../utils/router'

import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {setManageCurrentIndex} from '../redux/actions/ui'

const FormItem = Form.Item;
const formLayout = {
    labelCol: {
        span: 4
    },
    wrapperCol: {
        span: 16
    }
};

class DeviceAddComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            recommendUsers: []
        };
        this.handleSubmit = this
            .handleSubmit
            .bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();

        const {form} = this.props;

        form.validateFields((err, values) => {
            if (!err) {
                console.log(values);

                 // 开始发送短信修改密码的验证码
            APIS.addDevice(form.getFieldValue("name"), form.getFieldValue("imei"))
                .then((res) => {
                if (res.success) {
                    message.info('新设备已添加!');
                    this.props.history.push(RouteMap.deviceList);
                    this.props.setManageCurrentIndex("1")
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
                <FormItem label="名称：" {...formLayout}>
                    {getFieldDecorator('name', {
                        rules: [
                            {
                                required: true,
                                message: '请输入名称'
                            }
                        ]
                    })(<Input type="text"/>)}
                </FormItem>

                <FormItem label="IMEI：" {...formLayout}>
                    {getFieldDecorator('imei', {
                        rules: [
                            {
                                required: true,
                                message: '请输入IMEI编号'
                            },
                            {pattern: /^\d{15}$/, message:"IMEI为15位数字"  }
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

DeviceAddComponent = Form.create()(DeviceAddComponent);


function mapStateToProps(state) {
  return {
  }
}

function mapDispatchToProps(dispatch) {
  return {
        setManageCurrentIndex: bindActionCreators(setManageCurrentIndex, dispatch)
  }
}

const ConnectedDeviceAddComponent = connect(mapStateToProps, mapDispatchToProps)(DeviceAddComponent);

export default ConnectedDeviceAddComponent;