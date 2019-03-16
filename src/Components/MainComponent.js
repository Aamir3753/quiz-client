import React from 'react';
import Header from './Header';
import { Sidebar, Container } from 'semantic-ui-react';
import { Switch, Route, withRouter } from 'react-router-dom';
import SidebarComponent from './Header/Sidebar';
import Signin from './Signin';
import Signup from './Signup';
import Quizes from './Quizes';
import { connect } from 'react-redux';
import Protected from './ProtectedRoute';
import QuizDetail from './QuizDetail';
import { Authenticate, Quizes as QuizesActionDispatcher } from '../Redux/actionCreaters';

class Main extends React.Component {
    state = {
        sidbarIsOpen: false
    }
    openSideBar = () => this.setState({ sidbarIsOpen: true })
    closeSideBar = () => this.setState({ sidbarIsOpen: false })
    componentDidMount() {
        this.props.dispatch(Authenticate());
        this.props.dispatch(QuizesActionDispatcher());
    }
    Home = props => (<Quizes {...props}
        isLoading={this.props.quizes.isLoading}
        errMess={this.props.quizes.errMess}
        quizes={this.props.quizes.quizes} />)
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
                                        <Route exact path="/" component={this.Home} />
                                        <Route path="/quizDetail/:quizId" component={QuizDetail} />
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
const mapStateToProps = (store) => ({
    quizes: store.quizes
})
export default withRouter(connect(mapStateToProps)(Main));