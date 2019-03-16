import * as actionTypes from '../actionTypes';
export const Quizes = (state = {
    isLoading: false,
    errMess: null,
    quizes: []
}, action) => {
    switch (action.type) {
        case actionTypes.QUIZES_LOADING:
            return { ...state, isLoading: true, errMess: null, quizes: [] }
        case actionTypes.QUIZES_FAILED:
            return { ...state, isLoading: false, errMess: action.errMess, quizes: [] }
        case actionTypes.QUIZES_SUCCESS:
            return { ...state, isLoading: false, errMess: null, quizes: action.quizes }
        default:
            return state
    }
}