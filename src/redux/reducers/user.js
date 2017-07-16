import initialState from '../store/InitState'

import {USER_REGISTER} from '../actions/user'
import {USER_SIGN_IN} from '../actions/user'
import {USER_LOG_IN} from '../actions/user'
import {USER_LOG_OUT} from '../actions/user'
import {USER_PASSWORD} from '../actions/user'
import {USER_DATA_RECEIVED} from '../actions/user'

const PROMISE_PREFIX = {
    pendingOf: actionType => `${actionType}_PENDING`,
    fulfilledOf: actionType => `${actionType}_FULFILLED`,
    rejectedOf: actionType => `${actionType}_REJECTED`
}

/**
 *
 * @param {*} state
 * @param {*} action
 *
 */
export default function userReducer(state = initialState.userReducer, action) {

    let newState = {};
    const {type, payload} = action;

    switch (type) {

        case PROMISE_PREFIX.pendingOf(USER_REGISTER):
            newState["register_loading"] = true;
            break;

        case PROMISE_PREFIX.fulfilledOf(USER_REGISTER):
            newState["register_loading"] = false;
            break;

        case PROMISE_PREFIX.rejectedOf(USER_REGISTER):
            newState["register_loading"] = false;
            break;

        case PROMISE_PREFIX.pendingOf(USER_SIGN_IN):
            newState["signin_loading"] = true;
            break;

        case PROMISE_PREFIX.fulfilledOf(USER_SIGN_IN):
            newState["signin_loading"] = false;
            break;

        case PROMISE_PREFIX.rejectedOf(USER_SIGN_IN):
            newState["signin_loading"] = false;
            break;

        case PROMISE_PREFIX.pendingOf(USER_PASSWORD):
            newState["password_loading"] = true;
            break;

        case PROMISE_PREFIX.fulfilledOf(USER_PASSWORD):
            newState["password_loading"] = false;
            break;

        case PROMISE_PREFIX.rejectedOf(USER_PASSWORD):
            newState["password_loading"] = false;
            break;

        case USER_LOG_IN:
            newState["token"] = payload.token;
            break;

        case USER_LOG_OUT:
            newState["token"] = payload.token
            newState["profile"] = {
                phone:null,
                name:null,
            }
            break;

        case USER_DATA_RECEIVED:
            newState["profile"] = payload
            break;

        default:
            return state;
    }

    // 这里有个bug：state和{}的结合 并不能返回state 具体应用场景是 Redux-persist失效了
    state = Object.assign({}, state, newState);
    return state;
}