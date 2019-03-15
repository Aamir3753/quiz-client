import React from 'react';
import {Link} from 'react-router-dom';
import { Button, Icon } from 'semantic-ui-react';
const Navbar = () => {
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
export default Navbar;