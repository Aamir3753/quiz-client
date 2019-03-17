import * as actionTypes from '../actionTypes';
export const Questions = (state = {
    isLoading: false,
    errMess: null,
    questions: null
}, action) => {
    switch (action.type) {
        case actionTypes.QUESTION_PAPER_LOADING:
            return { ...state, isLoading: true, errMess: null, questions: null }
        case actionTypes.QUESTION_PAPER_FAILED:
            return { ...state, isLoading: false, errMess: action.errMess, questions: null }
        case actionTypes.QUESTION_PAPER_SUCCESS:
            return { ...state, isLoading: false, errMess: null, questions: action.questions }
        default:
            return state
    }
}