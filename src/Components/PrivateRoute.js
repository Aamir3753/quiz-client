import React from 'react';
import { connect } from 'react-redux';
import { Route,Redirect } from 'react-router-dom';
const Private = (props) => {
    if (props.isAuthentic)
        return <Route {...props} />
    else {
      return  <Redirect to="/signin" />
    }
}
const mapStateToProps = (store) => ({
    isAuthentic: store.authenticate.isAuthentic
})
export default connect(mapStateToProps)(Private);