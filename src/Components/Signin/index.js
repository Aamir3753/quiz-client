import React from 'react';
import {
    Form, Button, Checkbox, Segment,
    Message, Grid, Icon, Header
} from 'semantic-ui-react';
import { connect } from 'react-redux';
import { Siginin as SigininActionDispatcher, FacebookLogin as FacebookLoginActionDispatcher } from '../../Redux/actionCreaters'
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import ForgetPassword from './ForgetPassword';
class Signin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            remember: false,
            emailErr: false,
            emailErrMess: null,
            passwordErr: false,
            passwordErrMess: null,
            serverErrMess: null,
            serverErr: false,
            formError: false,
            isLoading: false,
            forgetModalIsOpen:false,
        }
    }

    changeHandler = (e) => this.setState({ [e.target.name]: e.target.value })
    rememberHandler = () => this.setState(preSt => ({ remember: !preSt.remember }))
    submitHandler = (e) => {
        const loginData = {
            username: this.state.email,
            password: this.state.password,
            remember: this.state.remember
        }
        this.props.dispatch(SigininActionDispatcher(loginData))
    }
    static getDerivedStateFromProps(props, state) {
        if (props.signin.isLoading) {
            return {
                ...state,
                formError: false,
                isLoading: true
            }
        }
        else if (props.signin.errMess) {
            if (props.signin.errMess === "IncorrectUsernameError") {
                return {
                    ...state,
                    emailErr: true,
                    isLoading: false,
                    emailErrMess: "Incorrect Email",
                    formError: true,
                    passwordErr: false,
                }
            }
            else if (props.signin.errMess === "IncorrectPasswordError") {
                return {
                    ...state,
                    passwordErr: true,
                    isLoading: false,
                    passwordErrMess: "Incorrect  password",
                    formError: true,
                    emailErr: false
                }
            }
            return {
                ...state,
                formError: true,
                serverErr: true,
                isLoading: false,
                emailErr: false,
                passwordErr: false,
                serverErrMess: props.signin.errMess

            }
        } else {
            return {
                ...state,
                isLoading: false,

            }
        }
    }
    openModal =()=>this.setState({forgetModalIsOpen:true})
    closeModal = ()=>this.setState({forgetModalIsOpen:false})
    Errors = () => (
        <ul>
            {this.state.emailErr ? <li> {this.state.emailErrMess}</li> : null}
            {this.state.passwordErr ? <li>{this.state.passwordErrMess}</li> : null}
            {this.state.serverErr ? <li>{this.state.serverErrMess}</li> : null}
        </ul>
    )
    facebookResponse = (response) => {
        if (response.accessToken) {
            this.props.dispatch(FacebookLoginActionDispatcher(response.accessToken))
        }
    }
    render() {
        return (
            <div className="login-segment-container">
                <Segment piled loading={this.state.isLoading} className="login-segment" raised>
                    <Form error={this.state.formError} onSubmit={this.submitHandler}>
                        <Grid centered columns="1">
                            <Icon size="massive" name="user circle" />
                        </Grid>
                        <Form.Field>
                            <Form.Input
                                error={this.state.emailErr}
                                label="Email"
                                required
                                type="email"
                                onChange={this.changeHandler}
                                name="email"
                                value={this.state.email}
                                placeholder='Enter Email here' />
                        </Form.Field>
                        <Form.Field style={{ marginBottom: "3px" }}>
                            <Form.Input
                                required
                                error={this.state.passwordErr}
                                onChange={this.changeHandler}
                                label="Password"
                                name="password"
                                value={this.state.password}
                                type="password"
                                autoComplete="true"
                                placeholder='Enter password here' />
                        </Form.Field>
                        <div style={{ display: "flex", justifyContent: "flex-end" }}>
                                <Header as="a" color="blue" href="javascipt:void(0)"
                                 size="tiny" textAlign="right"
                                 onClick ={this.openModal}
                                  content="Forget Password ?" />
                        </div>
                        <Form.Field>
                            <Checkbox checked={this.state.remember}
                                onChange={this.rememberHandler}
                                label='Remember me' />
                        </Form.Field>
                        <Message error header="Signin Failed" content={<this.Errors />} />
                        <Button.Group>
                            <Button secondary type='submit'>Submit</Button>
                            <Button.Or />
                            <FacebookLogin
                                appId="389434655167734"
                                autoLoad={false}
                                callback={this.facebookResponse}
                                render={renderProps => (
                                    <Button type="button" color="facebook" onClick={renderProps.onClick}>
                                        <Icon name="facebook f" />
                                        Sign in with facebook
                            </Button>
                                )}
                            />
                        </Button.Group>
                    </Form>
                </Segment>
                <ForgetPassword closeModal={this.closeModal} isOpen={this.state.forgetModalIsOpen} />
            </div >
        )
    }
}
const mapStateToProps = (store) => ({
    signin: store.signin
})
export default connect(mapStateToProps)(Signin);