import * as actionTypes from '../actionTypes';
export const Signin = (state = {
    isLoading: false,
    errMess: null
}, action) => {
    switch (action.type) {
        case actionTypes.SIGNIN_LOADING:
            return { ...state, isLoading: true, errMess: null}
        case actionTypes.SIGNIN_FAILED:
            return { ...state, isLoading: false, errMess: action.errMess }
        case actionTypes.SIGNIN_SUCCESSFULL:
            return { ...state, isLoading: false, errMess: null }
        default:
            return state
    }
}