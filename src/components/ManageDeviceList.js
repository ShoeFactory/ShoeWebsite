import React from 'react'
import {Table, Button, Popconfirm, message} from 'antd';
import APIS from '../utils/apis'

class DeviceListComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            bookList: [
                {
                    "name": "前端从入门到精通1",
                    "imei": "132456789"
                }, {
                    "name": "Java从入门到放弃",
                    "imei": "987654321"
                }
            ],
            deviceList: []
        };
    }

    componentWillMount() {
        console.log("will mount");

            // 查询设备
            APIS.devices()
                .then((res) => {
                if (res.success) {
                    this.setState({
                        deviceList: res.devices,
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

    handleDel(device) {
        console.log(device);
        APIS.removeDevice(device.sid)
            .then(
                (res) => {
                    if(res.success)
                    {
                        message.info('设备已删除')
                        this.setState({
                            deviceList: this.state.deviceList.filter(item=>item.sid!==device.sid)
                        })
                    }
                    else
                        message.error(res.msg)
                }
            )
            .catch((err) => {
              console.log(err);
            })
    }

    render() {
        const {deviceList} = this.state;

        const columns = [
            {
                title: '名称',
                dataIndex: 'name'
            }, {
                title: '定位器IMEI',
                dataIndex: 'sid'
            }, {
                title: '操作',
                render: (text, record) => (
                    <Button.Group type="ghost">
                        <Popconfirm title="确定要删除吗？" onConfirm={() => this.handleDel(record)}>
                            <Button size="small">删除</Button>
                        </Popconfirm>
                    </Button.Group>
                )
            }
        ];

        return (<Table columns={columns} dataSource={deviceList} rowKey={row => row.id}/>);
    }
}

export default DeviceListComponent;
