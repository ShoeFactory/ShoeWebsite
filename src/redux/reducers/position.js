import initialState from '../store/InitState'

import {RECEIVE_DEVICELIST} from '../actions/position'


/**
 *
 * @param {*} state
 * @param {*} action
 *
 */
export default function uiReducer(state = initialState.positionReducer, action) {

    let newState = {};
    const {type, payload} = action;

    switch (type) {
        case RECEIVE_DEVICELIST:
            newState["deviceList"] = payload.deviceList;
            break;
        default:
            return state;
    }

    state = Object.assign({}, state, newState);
    return state;
}
