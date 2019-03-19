import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
const Protected = (props) => {
    
    if (props.user) {
        if(typeof props.user.redirectTo ==="string")
        if (props.user.redirectTo.toLowerCase() === "/signin" || props.user.redirectTo.toLowerCase() === "/signup")
            props.user.redirectTo = undefined
    }
    if (!props.isAuthentic)
        return <Route {...props} />
    else {
        return <Redirect to={props.user.redirectTo || "/"} />
    }
}
const mapStateToProps = (store) => ({
    isAuthentic: store.authenticate.isAuthentic,
    user: store.authenticate.user

})
export default connect(mapStateToProps)(Protected);