import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Icon } from 'semantic-ui-react';
import { connect } from 'react-redux';
const Navbar = (props) => {
    if (props.authenticate.isAuthentic) {
        console.log(props.authenticate.user);
        return (
            <React.Fragment>
                <Button secondary>
                    <Icon name="user" />{props.authenticate.user.firstname + props.authenticate.user.lastname}
                </Button>
                <Button as={Link} to="/" secondary>
                    <Icon name="home" />Home
                </Button>
            </React.Fragment>
        )
    } else {
        return (
            <React.Fragment>
                <Button as={Link} to="/" secondary>
                    <Icon name="home" />Home
            </Button>
                <Button as={Link} to="/signin" secondary>
                    <Icon name="sign in" />SignIn
            </Button>
                <Button as={Link} to="/signup" secondary>
                    <Icon name="signup" />SignUp
            </Button>
            </React.Fragment>
        )
    }
}
const mapStateToProps = (store) => ({
    authenticate: store.authenticate
})
export default connect(mapStateToProps)(Navbar);