import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Signup } from './Reducers/Signup';
import { Signin } from './Reducers/Signin';
import { Authenticate } from './Reducers/Authenticate';
import { Quizes } from './Reducers/Quizes';
import {QuizDetail} from './Reducers/QuizDetail'
import thunk from 'redux-thunk';
const store = createStore(combineReducers({
    signup: Signup,
    signin: Signin,
    authenticate: Authenticate,
    quizes: Quizes,
    quizDetail:QuizDetail
}), applyMiddleware(thunk));
export default store;