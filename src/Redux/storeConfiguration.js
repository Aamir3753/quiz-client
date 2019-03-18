import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Signup } from './Reducers/Signup';
import { Signin } from './Reducers/Signin';
import { Authenticate } from './Reducers/Authenticate';
import { Quizes } from './Reducers/Quizes';
import { QuizDetail } from './Reducers/QuizDetail'
import { Questions } from './Reducers/Questions';
import { Results } from './Reducers/Results';
import {ResultDetail} from './Reducers/ResultDetail';
import thunk from 'redux-thunk';
const store = createStore(combineReducers({
    signup: Signup,
    signin: Signin,
    authenticate: Authenticate,
    quizes: Quizes,
    quizDetail: QuizDetail,
    questions: Questions,
    results: Results,
    resultDetail:ResultDetail
}), applyMiddleware(thunk));
export default store;