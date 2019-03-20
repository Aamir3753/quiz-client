import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Button, Icon, Image } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { Authenticate } from '../../Redux/actionCreaters'
const Navbar = (props) => {
    console.log(props.authenticate.user);
    const logoutHandler = () => {
        props.dispatch(Authenticate({ signout: true, redirectTo: '/home' }));
    }
    const linkClickHandler = (e) => {
        props.history.push(e.target.name);
    }
    if (props.authenticate.isAuthentic) {
        return (
            <React.Fragment>
                {
                    props.authenticate.user.img ?
                        <Button color="teal">
                            <div>
                                <Image avatar src={props.authenticate.user ? props.authenticate.user.img : ""} />
                                <span>{props.authenticate.user.firstname + " " + props.authenticate.user.lastname}</span>
                            </div>
                        </Button>
                        :
                        <Button color="teal">
                            <Icon name="user" />
                            {props.authenticate.user.firstname + " " + props.authenticate.user.lastname}
                        </Button>
                }
                <Button color="teal" name="/" onClick={linkClickHandler} >
                    <Icon name="home" />HOME
                </Button>
                <Button color="teal" name="/results" onClick={linkClickHandler}>
                    <Icon name="file text" />RESULTS
                </Button>
                <Button color="teal" onClick={logoutHandler} >
                    <Icon name="sign out" />SIGN OUT
                </Button>
            </React.Fragment>
        )
    } else {
        return (
            <React.Fragment>
                <Button color="teal" as={Link} to="/">
                    <Icon name="home" />HOME
            </Button>
                <Button color="teal" as={Link} to="/signin">
                    <Icon name="sign in" />SIGN IN
            </Button>
                <Button color="teal" as={Link} to="/signup">
                    <Icon name="signup" />SIGN UP
            </Button>
            </React.Fragment>
        )
    }
}
const mapStateToProps = (store) => ({
    authenticate: store.authenticate
})
export default withRouter(connect(mapStateToProps)(Navbar));