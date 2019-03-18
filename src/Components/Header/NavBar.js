import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Icon } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { Authenticate } from '../../Redux/actionCreaters'
const Navbar = (props) => {
    const logoutHandler = () => {
        props.dispatch(Authenticate({signout:true,redirectTo:'/home'}));
    }
    if (props.authenticate.isAuthentic) {
        return (
            <React.Fragment>
                <Button secondary>
                    <Icon name="user" />{props.authenticate.user.firstname + " " + props.authenticate.user.lastname}
                </Button>
                <Button as={Link} to="/" secondary>
                    <Icon name="home" />HOME
                </Button>
                <Button as={Link} to="/results" secondary>
                    <Icon name="file text" />RESULTS
                </Button>
                <Button onClick={logoutHandler} secondary>
                    <Icon name="sign out" />SIGN OUT
                </Button>
            </React.Fragment>
        )
    } else {
        return (
            <React.Fragment>
                <Button as={Link} to="/" secondary>
                    <Icon name="home" />HOME
            </Button>
                <Button as={Link} to="/signin" secondary>
                    <Icon name="sign in" />SIGN IN
            </Button>
                <Button as={Link} to="/signup" secondary>
                    <Icon name="signup" />SIGN UP
            </Button>
            </React.Fragment>
        )
    }
}
const mapStateToProps = (store) => ({
    authenticate: store.authenticate
})
export default connect(mapStateToProps)(Navbar);