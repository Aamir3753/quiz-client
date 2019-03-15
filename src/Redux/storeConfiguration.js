import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Signup } from './Reducers/Signup';
import { Signin } from './Reducers/Signin';
import { Authenticate } from './Reducers/Authenticate';
import thunk from 'redux-thunk';
const store = createStore(combineReducers({
    signup: Signup,
    signin: Signin,
    authenticate: Authenticate
}), applyMiddleware(thunk));
export default store;