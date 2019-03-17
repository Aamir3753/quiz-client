import * as actionTypes from './actionTypes';
import axios from 'axios'
import { baseUrl, verifyToken } from '.././Shared';

// Signup action creater 
export const Signup = (formData) => dispatch => {
    dispatch(signup_loading())
    axios.post(baseUrl + 'user/signup', formData)
        .then(res => {
            dispatch(signup_successfull());
        })
        .catch(err => {
            if (err.response) {
                dispatch(signup_failed(err.response.data.err.message.replace("username", "Email")))
            } else {
                dispatch(signup_failed("Some thing went wrong please try later"))
            }
        })
}
// Signup actions
const signup_loading = () => ({
    type: actionTypes.SIGNUP_LOADING
})
const signup_failed = (errMess) => ({
    type: actionTypes.SIGNUP_FAILED,
    errMess
})
const signup_successfull = () => ({
    type: actionTypes.SIGNUP_SUCCESSFULL
})
// .......................................................................>

// Signin action creater
export const Siginin = (cred) => dispatch => {
    dispatch(signin_loading());
    axios.post(baseUrl + "user/login", cred)
        .then(res => {
            localStorage.setItem("token", res.data.token);
            dispatch(signin_successfull());
            Authenticate()(dispatch);
        })
        .catch(err => {
            if (err.response) {
                dispatch(signin_failed(err.response.data.info.name))

            } else {
                dispatch(signin_failed("Some thing went wrong please try later"))
            }
        });
}
// Signin actions
const signin_loading = () => ({
    type: actionTypes.SIGNIN_LOADING
})
const signin_failed = (errMess) => ({
    type: actionTypes.SIGNIN_FAILED,
    errMess
})
const signin_successfull = () => ({
    type: actionTypes.SIGNIN_SUCCESSFULL
})
// ..........................................................................>

// Authenticate action creaters
export const Authenticate = (signout = false) => dispatch => {
    if (signout) localStorage.clear("token");
    const user = verifyToken();
    if (user) dispatch(authenticate(user))
    else dispatch(unAuthenticate())
}
// Authenticate actions
const authenticate = (user) => ({
    type: actionTypes.AUTHENTICATE,
    user
})
const unAuthenticate = () => ({
    type: actionTypes.UNAUTHENTICATE,
})

// ...............................................................................>

// Quizes action creater
export const Quizes = () => dispatch => {
    dispatch(quizes_loading());
    axios.get(baseUrl + "quiz")
        .then(res => {
            if (res.data.success) {
                dispatch(quizes_success(res.data.quizes));
            }
        })
        .catch(err => {
            if (err.response) {
                dispatch(quizes_failed(err.response.data.err.message))
            } else {
                dispatch(quizes_failed("Some thing went wrong please try later"));
            }
        })

}

// Quizes actions
const quizes_loading = () => ({
    type: actionTypes.QUIZES_LOADING
})
const quizes_failed = (errMess) => ({
    type: actionTypes.QUIZES_FAILED,
    errMess
})
const quizes_success = (quizes) => ({
    type: actionTypes.QUIZES_SUCCESS,
    quizes
})
//................................................................................>

// Quiz detail action creater
export const QuizDetail = (quizId) => dispatch => {
    dispatch(quiz_detail_loading());
    axios.get(baseUrl + "quiz/" + quizId)
        .then(res => {
            if (res.data.success) {
                console.log(res.data)
                dispatch(quiz_detail_success(res.data.quizDetail));
            }
        })
        .catch(err => {
            console.log(err)
            if (err.response) {
                dispatch(quiz_detail_failed(err.response.data.err.message))
            } else {
                dispatch(quiz_detail_failed("Some thing went wrong please try later"));
            }
        })

}

// Quiz detail actions
const quiz_detail_loading = () => ({
    type: actionTypes.QUIZ_DETAIL_LOADING
})
const quiz_detail_failed = (errMess) => ({
    type: actionTypes.QUIZ_DETAIL_FAILED,
    errMess
})
const quiz_detail_success = (quiz) => ({
    type: actionTypes.QUIZ_DETAIL_SUCCESS,
    quiz
})
//................................................................................>

// Question paper action creater
export const QuestionPaper = (quizId) => dispatch => {
    dispatch(question_paper_loading());
    const isTokenVerified = verifyToken();
    if (!isTokenVerified) {
        Authenticate(true)(dispatch);
        dispatch(question_paper_failed("Your are not authenticated"));
        return;
    }
    const token = localStorage.getItem("token");
    axios.get(`${baseUrl}start/${quizId}`, {
        headers: {
            "Authorization": "bearer " + token
        }
    })
        .then(res => {
            if (res.data.success) {
                dispatch(question_paper_success(res.data.questions))
            }
        })
        .catch(err => {
            if (err.response) {
                    if(err.response.data.err)
                dispatch(question_paper_failed(err.response.data.err.message))
                else{
                dispatch(question_paper_failed(err.response.data.message))
                }
            } else {
                dispatch(question_paper_failed("Some thing went wrong please try later"));
            }
        })
}
// Question paper acions

const question_paper_loading = () => ({
    type: actionTypes.QUESTION_PAPER_LOADING
})
const question_paper_failed = (errMess) => ({
    type: actionTypes.QUESTION_PAPER_FAILED,
    errMess
})
const question_paper_success = (questions) => ({
    type: actionTypes.QUESTION_PAPER_SUCCESS,
    questions
})
//..........................................................................>