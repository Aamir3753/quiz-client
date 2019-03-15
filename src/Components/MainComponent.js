import React from 'react';
import Header from './Header';
import { Sidebar, Container, Segment, Sticky } from 'semantic-ui-react';
import { Switch, Route } from 'react-router-dom';
import SidebarComponent from './Header/Sidebar';
import Signin from './Signin';
import Signup from './Signup';
class Main extends React.Component {
    state = {
        sidbarIsOpen: false
    }
    openSideBar = () => this.setState({ sidbarIsOpen: true })
    closeSideBar = () => this.setState({ sidbarIsOpen: false })
    render() {
        return (
            <div className="app-container">
                <Sidebar.Pushable>
                    <SidebarComponent sidbarIsOpen={this.state.sidbarIsOpen} closeSideBar={this.closeSideBar} />
                    <Sidebar.Pusher>
                        <div className="main-container">
                            <Header openSideBar={this.openSideBar} />
                            <div className="content-container">
                                <Container>
                                    <Switch>
                                        <Route path="/signin" component={Signin} />
                                        <Route path="/signup" component={Signup} />
                                    </Switch>
                                </Container>
                            </div>
                            <div className="footer">
                            <h2>Footer</h2>
                            </div>
                        </div>
                    </Sidebar.Pusher>
                </Sidebar.Pushable >
            </div >
        )
    }
}
export default Main;