// 对象命名 和 函数命名 模仿Python

export const RECEIVE_DEVICELIST = "RECEIVE_DEVICELIST"


export function receiveDeviceList(deviceList)
{
    return {
        type: RECEIVE_DEVICELIST,
        payload: {
        deviceList: deviceList
    }
  }
}