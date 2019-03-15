import * as actionTypes from '../actionTypes';
export const Authenticate = (state = {
    isAuthentic: false,
    user: null
}, action) => {
    switch (action.type) {
        case actionTypes.AUTHENTICATE:
            return { ...state, isAuthentic: true, user: action.user }
        case actionTypes.UNAUTHENTICATE:
            return { ...state, isAuthentic: false, user: null }
        default:
            return state
    }
}