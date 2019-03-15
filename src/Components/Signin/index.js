import React from 'react';
import { Form, Button, Checkbox, Segment, Message, Grid, Icon } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { Siginin as SigininActionDispatcher } from '../../Redux/actionCreaters'
class Signin extends React.Component {
    state = {
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
                    passwordErr:false,
                }
            }
            else if(props.signin.errMess === "IncorrectPasswordError") {
                return {
                    ...state,
                    passwordErr: true,
                    isLoading: false,
                    passwordErrMess: "Incorrect  password",
                    formError: true,
                    emailErr:false
                }
            }
            return {
                ...state,
                formError: true,
                serverErr: true,
                isLoading: false,
                emailErr:false,
                passwordErr:false,
                serverErrMess: props.signin.errMess

            }
        } else {
            return {
                ...state,
                isLoading: false,

            }
        }
    }
    Errors = () => (
        <ul>
            {this.state.emailErr ? <li> {this.state.emailErrMess}</li> : null}
            {this.state.passwordErr ? <li>{this.state.passwordErrMess}</li> : null}
            {this.state.serverErr ? <li>{this.state.serverErrMess}</li> : null}
        </ul>
    )
    render() {
        return (
            <div className="login-segment-container">
                <Segment loading={this.state.isLoading} className="login-segment" raised>
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
                        <Form.Field>
                            <Form.Input
                                required
                                error={this.state.passwordErr}
                                onChange={this.changeHandler}
                                label="Password"
                                name="password"
                                value={this.state.password}
                                type="password"
                                placeholder='Enter password here' />
                        </Form.Field>
                        <Form.Field>
                            <Checkbox checked={this.state.remember}
                                onChange={this.rememberHandler}
                                label='Remember me' />
                        </Form.Field>
                        <Message error header="Signin Failed" content={<this.Errors />} />
                        <Button secondary type='submit'>Submit</Button>
                    </Form>
                </Segment>
            </div >
        )
    }
}
const mapStateToProps = (store) => ({
    signin: store.signin
})
export default connect(mapStateToProps)(Signin);