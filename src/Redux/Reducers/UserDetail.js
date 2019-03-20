import * as actionTypes from '../actionTypes';
export const UserDetail = (state = {
    isLoading: false,
    errMess: null,
    user:null
}, action) => {
    switch (action.type) {
        case actionTypes.USER_DETAIL_LOADING:
            return { ...state, isLoading: true, errMess: null,user:null}
        case actionTypes.USER_DETAIL_FAILED:
            return { ...state, isLoading: false, errMess: action.errMess,user:null }
        case actionTypes.USER_DETAIL_SUCCESS:
            return { ...state, isLoading: false, errMess: null,user:action.user }
        default:
            return state
    }
}