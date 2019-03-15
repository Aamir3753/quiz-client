import React from 'react';
import Header from './Header';
import { Sidebar, Container } from 'semantic-ui-react';
import { Switch, Route, withRouter } from 'react-router-dom';
import SidebarComponent from './Header/Sidebar';
import Signin from './Signin';
import Signup from './Signup';
import { connect } from 'react-redux'
import Protected from './ProtectedRoute';
import { Authenticate } from '../Redux/actionCreaters'
class Main extends React.Component {
    state = {
        sidbarIsOpen: false
    }
    openSideBar = () => this.setState({ sidbarIsOpen: true })
    closeSideBar = () => this.setState({ sidbarIsOpen: false })
    componentDidMount() {
        this.props.dispatch(Authenticate());
    }
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
                                        <Protected path="/signin" component={Signin} />
                                        <Protected path="/signup" component={Signup} />
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
export default withRouter(connect()(Main));