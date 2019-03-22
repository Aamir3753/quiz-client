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
            Authenticate({ signout: false })(dispatch);
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
export const Authenticate = (info) => dispatch => {
    if (info.signout) localStorage.clear("token");
    const user = verifyToken();
    if (user) {
        user.redirectTo = info.redirectTo
        dispatch(authenticate(user))
    }
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
export const Quizes = (page) => dispatch => {
    dispatch(quizes_loading());
    axios.get(baseUrl + `quiz/withPagination/${page}`)
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
                dispatch(quiz_detail_success(res.data.quizDetail));
            }
        })
        .catch(err => {
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
                if (err.response.data.err)
                    dispatch(question_paper_failed(err.response.data.err.message))
                else {
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

// Submit question paper action creater
export const SubmitQuestionPaper = (questionPaper, push) => dispatch => {
    dispatch(question_paper_loading())
    const isTokenVerified = verifyToken();
    if (!isTokenVerified) {
        Authenticate(true)(dispatch);
        dispatch(question_paper_failed("Your are not authenticated"));
        return;
    }
    const token = localStorage.getItem("token");
    axios.post(`${baseUrl}result`, questionPaper, {
        headers: {
            "Authorization": "bearer " + token
        }
    })
        .then(res => {
            if (res.data.success) push(`/resultDetail/${res.data.result._id}`)
            else {
                dispatch(question_paper_failed("Quiz not submited please try later"))
            }
        })
        .catch(err => {
            dispatch(question_paper_failed(err.message))
        })
}
// ............................................................................>
// Restults actions creater
export const Results = () => dispatch => {
    dispatch(results_loading())
    const isTokenVerified = verifyToken();
    if (!isTokenVerified) {
        Authenticate({ singout: true, redirectTo: "/signin" })(dispatch);
        dispatch(question_paper_failed("Your are not authenticated"));
        return;
    }
    const token = localStorage.getItem("token");
    axios.get(`${baseUrl}result`, {
        headers: {
            "Authorization": "bearer " + token
        }
    })
        .then(res => {
            if (res.data.success) {
                dispatch(results_success(res.data.result));
            }
        })
        .catch(err => {
            if (err.response) {
                if (err.response.data.err) {
                    dispatch(results_failed(err.response.data.err.message))
                }
                else {
                    dispatch(results_failed("Some thing went wrong please try later"));
                }

            } else {
                dispatch(results_failed("Some thing went wrong please try later"));
            }
        })

}
// Results actions
const results_loading = () => ({
    type: actionTypes.RESULTS_LOADING
})
const results_failed = (errMess) => ({
    type: actionTypes.RESULTS_FAILED,
    errMess
})
const results_success = (results) => ({
    type: actionTypes.RESULTS_SUCCESS,
    results
})
// ..........................................................>

// Result detail actions creater
export const ResultDetail = (resultId) => dispatch => {
    dispatch(result_detail_loading());
    const isTokenVerified = verifyToken();
    if (!isTokenVerified) {
        Authenticate({ signout: true, redirectTo: '/sigin' })(dispatch);
        dispatch(question_paper_failed("Your are not authenticated"));
        return;
    }
    const token = localStorage.getItem("token");
    axios.get(`${baseUrl}result/${resultId}`, {
        headers: {
            "Authorization": "bearer " + token
        }
    })
        .then(res => {
            if (res.data.success) {
                dispatch(result_detail_success(res.data.resultDetail));
            }
        })
        .catch(err => {
            if (err.response) {
                dispatch(result_detail_failed(err.response.data.err.message))
            } else {
                dispatch(result_detail_failed("Some thing went wrong please try later"));
            }
        })
}
// Result detail action
const result_detail_loading = () => ({
    type: actionTypes.RESULT_DETAIL_LOADING
})
const result_detail_failed = (errMess) => ({
    type: actionTypes.RESULT_DETAIL_FAILED,
    errMess
})
const result_detail_success = (result) => ({
    type: actionTypes.RESULT_DETAIL_SUCCESS,
    result: result
})
// ..................................................................>

// Facebook login action creater
export const FacebookLogin = (token) => dispatch => {
    dispatch(signin_loading());
    axios.get(`${baseUrl}user/facebook/login`, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })
        .then(res => {
            localStorage.setItem("token", res.data.token);
            dispatch(signin_successfull());
            Authenticate({ signout: false })(dispatch);
        })
        .catch(err => {
            if (err.response) {
                if (err.response.data.info) {
                    dispatch(signin_failed(err.response.data.info.name))
                } else {
                    dispatch(signin_failed("Some thing went wrong please try later"))
                }
            } else {
                dispatch(signin_failed("Some thing went wrong please try later"))
            }
        });
}
// ................................................................>
// User detail actions creater
export const UserDetail = () => dispatch => {
    dispatch(user_detail_loading())
    const isTokenVerified = verifyToken();
    if (!isTokenVerified) {
        Authenticate({ singout: true, redirectTo: "/signin" })(dispatch);
        dispatch(question_paper_failed("Your are not authenticated"));
        return;
    }
    const token = localStorage.getItem("token");
    axios.get(`${baseUrl}userDetail`, {
        headers: {
            "Authorization": "bearer " + token
        }
    })
        .then(res => {
            if (res.data.success) {
                dispatch(user_detail_success(res.data.user));
            }
        })
        .catch(err => {
            if (err.response) {
                dispatch(user_detail_failed(err.response.data.message))
            } else {
                dispatch(user_detail_failed("Some thing went wrong please try later"));
            }
        })

}
// User detail actions
const user_detail_loading = () => ({
    type: actionTypes.USER_DETAIL_LOADING
})
const user_detail_failed = (errMess) => ({
    type: actionTypes.USER_DETAIL_FAILED,
    errMess
})
const user_detail_success = (user) => ({
    type: actionTypes.USER_DETAIL_SUCCESS,
    user
})
// .............................................................>
// Delete account action creater
export const DeleteAccount = () => dispatch => {
    dispatch(user_detail_loading())
    const isTokenVerified = verifyToken();
    if (!isTokenVerified) {
        Authenticate({ singout: true, redirectTo: "/signin" })(dispatch);
        return;
    }
    const token = localStorage.getItem("token");
    axios.delete(`${baseUrl}userDetail`, {
        headers: {
            "Authorization": "bearer " + token
        }
    })
        .then(res => {
            if (res.data.success) {
                Authenticate({ signout: true })(dispatch);
            }
        })
        .catch(err => {
            if (err.response) {
                dispatch(user_detail_failed(err.response.data.err.message))
            } else {
                dispatch(user_detail_failed("Some thing went wrong please try later"));
            }
        })
}
// ..................................................................................>