import React from 'react';

class BaiduMapComponent extends React.Component
{

    componentDidMount()
    {
        var BMap = window.BMap //取出window中的BMap对象
        var map = new BMap.Map("shoe_map_container"); // 创建地图实例
        var point = new BMap.Point(116.404, 39.915); // 创建点坐标
        map.centerAndZoom(point, 15); // 初始化地图，设置中心点坐标和地图级别

        map.addControl(new BMap.MapTypeControl()); //添加地图类型控件
        map.setCurrentCity("北京"); // 设置地图显示的城市 此项是必须设置的
        map.enableScrollWheelZoom(true); //开启鼠标滚轮缩放
    }

    componentWillUnmount() {}

    render()
    {
        return (
            <div
                id="shoe_map_container"
                style={{
                width: 'auto',
                height: '100%'
            }}></div>
        );
    }
}

export default BaiduMapComponent;