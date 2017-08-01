import initialState from '../store/InitState'

import {UI_SET_MANAGE_CURRENTINDEX} from '../actions/ui'


/**
 *
 * @param {*} state
 * @param {*} action
 *
 */
export default function uiReducer(state = initialState.uiReducer, action) {

    let newState = {};
    const {type, payload} = action;

    switch (type) {
        case UI_SET_MANAGE_CURRENTINDEX:
            newState["manageCurrentIndex"] = payload.id;
            break;
        default:
            return state;
    }

    state = Object.assign({}, state, newState);
    return state;
}
