import * as actionTypes from '../actionTypes';
export const ResultDetail = (state = {
    isLoading: false,
    errMess: null,
    result: null
}, action) => {
    switch (action.type) {
        case actionTypes.RESULT_DETAIL_LOADING:
            return { ...state, isLoading: true, errMess: null, result:null }
        case actionTypes.RESULT_DETAIL_FAILED:
            return { ...state, isLoading: false, errMess: action.errMess, result:null}
        case actionTypes.RESULT_DETAIL_SUCCESS:
            return { ...state, isLoading: false, errMess: null, result: action.result }
        default:
            return state
    }
}