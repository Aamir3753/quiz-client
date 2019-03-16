import React from 'react';
import { Link } from 'react-router-dom';
import { Sidebar as SemanticSidebar, Menu, Icon } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { Authenticate } from '../../Redux/actionCreaters'
const Sidebar = (props) => {
    const logoutHandler = () => {
        props.dispatch(Authenticate(true));
        props.closeSideBar()
    }
    return (
        <SemanticSidebar
            as={Menu}
            animation='overlay'
            onHide={props.closeSideBar}
            inverted
            icon="labeled"
            vertical
            visible={props.sidbarIsOpen}
            width='thin'
        >
            {
                props.authenticate.isAuthentic ? (
                    <React.Fragment>
                        <Menu.Item onClick={props.closeSideBar} as='a'>
                            <Icon name="arrow left" />
                        </Menu.Item>
                        <Menu.Item onClick={props.closeSideBar} as={Link} to="/">
                            <Icon name='home' />
                            HOME
                        </Menu.Item>
                        <Menu.Item onClick={props.closeSideBar} as={Link} to="/">
                            <Icon name="user" />
                            {props.authenticate.user.firstname + " " + props.authenticate.user.lastname}
                        </Menu.Item>
                        <Menu.Item onClick={logoutHandler}>
                            <Icon name="sign out" />SIGN OUT
                        </Menu.Item>
                    </React.Fragment>
                ) : (
                        <React.Fragment>
                            <Menu.Item onClick={props.closeSideBar} as='a'>
                                <Icon name="arrow left" />
                            </Menu.Item>
                            <Menu.Item onClick={props.closeSideBar} as={Link} to="/">
                                <Icon name='home' />
                                HOME
                    </Menu.Item>
                            <Menu.Item onClick={props.closeSideBar} as={Link} to="/SignIn">
                                <Icon name="sign in" />
                                SIGN IN
                     </Menu.Item>
                            <Menu.Item onClick={props.closeSideBar} as={Link} to="/Signup">
                                <Icon name="signup" />
                                SIGN UP
                    </Menu.Item>
                        </React.Fragment>
                    )
            }
        </SemanticSidebar>
    )
}
const mapStateToProps = (store) => ({
    authenticate: store.authenticate
})
export default connect(mapStateToProps)(Sidebar);