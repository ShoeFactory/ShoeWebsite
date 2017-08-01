// 对象命名 和 函数命名 模仿Python

export const UI_SET_MANAGE_CURRENTINDEX = "UI_SET_MANAGE_CURRENTINDEX"


export function setManageCurrentIndex(id)
{
    return {
        type: UI_SET_MANAGE_CURRENTINDEX,
        payload: {
        id: id
    }
  }
}