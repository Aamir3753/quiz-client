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
                <Button secondary>
                    <div>
                        <Image avatar src={props.authenticate.user ? props.authenticate.user.img : ""} />
                        <span>{props.authenticate.user.firstname + " " + props.authenticate.user.lastname}</span>
                    </div>
                </Button>
                {/* <Button secondary>
                    {props.authenticate.user ?
                        props.authenticate.user.img ? <Image size="tiny" avatar src={props.authenticate.user.img} />: <Icon name="user" />
                        : null
                    }
                    {props.authenticate.user.firstname + " " + props.authenticate.user.lastname}
                </Button> */}
                <Button name="/" onClick={linkClickHandler} secondary>
                    <Icon name="home" />HOME
                </Button>
                <Button name="/results" onClick={linkClickHandler} secondary>
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
export default withRouter(connect(mapStateToProps)(Navbar));