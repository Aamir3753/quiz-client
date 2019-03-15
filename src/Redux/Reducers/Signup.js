import * as actionTypes from '../actionTypes';
export const Signup = (state = {
    isLoading: false,
    errMess: null,
    successfullMess: null,
}, action) => {
    switch (action.type) {
        case actionTypes.SIGNUP_LOADING:
            return { ...state, isLoading: true, errMess: null, successfullMess: null }
        case actionTypes.SIGNUP_FAILED:
            return { ...state, isLoading: false, errMess: action.errMess, successfullMess: false }
        case actionTypes.SIGNUP_SUCCESSFULL:
            return { ...state, isLoading: false, errMess: null, successfullMess: "Account created successfully" }
        default:
            return state
    }
}