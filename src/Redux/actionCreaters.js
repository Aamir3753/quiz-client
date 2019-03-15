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
export const Authenticate = () => dispatch => {
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