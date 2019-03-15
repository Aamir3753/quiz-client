import React from 'react';
import { connect } from 'react-redux';
import { Route,Redirect } from 'react-router-dom';
const Protected = (props) => {
    if (props.isAuthentic)
        return <Route {...props} />
    else {
      return  <Redirect to="/" />
    }
}
const mapStateToProps = (store) => ({
    isAuthentic: store.authenticate.isAuthentic
})
export default connect(mapStateToProps)(Protected);