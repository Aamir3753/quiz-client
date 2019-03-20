import React from 'react';
import { Grid, Container, Button, Icon, Header as SemanticHeader } from 'semantic-ui-react';
import Navbar from './NavBar';
class Header extends React.Component {
    render() {
        return (
            <div className="header-background">
                <Container >
                        <Grid padded="vertically">
                            <Grid.Row>
                                <Grid.Column>
                                    <div className="header-container">
                                        <div className="logo-container">
                                            <div className="sidebar-button">
                                                <Button color="teal"  onClick={this.props.openSideBar} animated='vertical'>
                                                    <Button.Content hidden>Menu</Button.Content>
                                                    <Button.Content visible>
                                                        <Icon name='sidebar' />
                                                    </Button.Content>
                                                </Button>
                                            </div>
                                            <div>
                                                <SemanticHeader to="/" color="black" as="h1">Quiz_Portal</SemanticHeader>
                                            </div>
                                        </div>
                                        <div className="navbar-container">
                                            <Navbar />
                                        </div>
                                    </div>
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                </Container>
            </div>
        )
    }
}
export default Header;
