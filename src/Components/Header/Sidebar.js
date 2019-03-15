import React from 'react';
import { Link } from 'react-router-dom';
import { Sidebar as SemanticSidebar, Menu, Icon } from 'semantic-ui-react';
const Sidebar = (props) => {
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
            <Menu.Item onClick={props.closeSideBar} as='a'>
                <Icon name="arrow left" />
            </Menu.Item>
            <Menu.Item onClick={props.closeSideBar} as={Link} to="/">
                <Icon name='home' />
                Home
            </Menu.Item>
            <Menu.Item onClick={props.closeSideBar} as={Link} to="/SignIn">
                <Icon name="sign in" />
                SignIn
         </Menu.Item>
            <Menu.Item onClick={props.closeSideBar} as={Link} to="/Signup">
                <Icon name="signup" />
                SignUp
        </Menu.Item>
        </SemanticSidebar>
    )
}
export default Sidebar;