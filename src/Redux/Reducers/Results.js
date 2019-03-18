import * as actionTypes from '../actionTypes';
export const Results = (state = {
    isLoading: false,
    errMess: null,
    results: []
}, action) => {
    switch (action.type) {
        case actionTypes.RESULTS_LOADING:
            return { ...state, isLoading: true, errMess: null, results:[] }
        case actionTypes.RESULTS_FAILED:
            return { ...state, isLoading: false, errMess: action.errMess, quiz:[]}
        case actionTypes.RESULTS_SUCCESS:
            return { ...state, isLoading: false, errMess: null, results: action.results }
        default:
            return state
    }
}