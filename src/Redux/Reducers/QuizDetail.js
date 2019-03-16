import * as actionTypes from '../actionTypes';
export const QuizDetail = (state = {
    isLoading: false,
    errMess: null,
    quiz: null
}, action) => {
    switch (action.type) {
        case actionTypes.QUIZ_DETAIL_LOADING:
            return { ...state, isLoading: true, errMess: null, quiz:null }
        case actionTypes.QUIZ_DETAIL_FAILED:
            return { ...state, isLoading: false, errMess: action.errMess, quiz:null}
        case actionTypes.QUIZ_DETAIL_SUCCESS:
            return { ...state, isLoading: false, errMess: null, quiz: action.quiz }
        default:
            return state
    }
}