import RouteMap from './router'
import History from './history'
import $ from 'jquery'
import {store} from '../App'

export default function request(method, url, body) {
  method = method.toUpperCase();

  let token = store.getState().userReducer.token ? store.getState().userReducer.token:""

  if (method === 'GET') {
    body = undefined;
  } else {
    body = $.param(body);
  }


  return fetch(url, {
    method,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
      'Accept': 'application/json',
      'Authorization': "Token " + token,
    },
    body
  }).then((res) => {
    if (res.status === 403) {
      History.push(RouteMap.userAccountLogin);
      return Promise.reject('Unauthorized.');  //用catch接收
    } else {
      return res.json(); // 这个json() 返回的也是promise
    }
  });
  // 如果这里再捕捉异常的话 那action那边就是正常的了
  // .catch((error)=>{
  //   console.log(error);
  // });
}

export const get = url => request('GET', url);
export const post = (url, body) => request('POST', url, body);
export const put = (url, body) => request('PUT', url, body);
export const del = (url, body) => request('DELETE', url, body);
