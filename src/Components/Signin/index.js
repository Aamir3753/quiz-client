import React from 'react';
import { Form, Button, Checkbox, Segment, Grid, Icon } from 'semantic-ui-react';
class Signin extends React.Component {
    state = {
        email: '',
        password: '',
        remember: false,
        emailErr: false,
        passwordErr: false,
        serverErrMess: null,
        formError: false,
    }
    changeHandler = (e) => this.setState({ [e.target.name]: e.target.value })
    rememberHandler = () => this.setState(preSt => ({ remember: !preSt.remember }))
    submitHandler = (e) => {
        const loginData = {
            username: this.state.email,
            password: this.state.password,
            remember: this.state.remember
        }
        console.log(loginData);
    }
    render() {
        return (
            <div className="login-segment-container">
                <Segment className="login-segment" raised>
                    <Form onSubmit={this.submitHandler}>
                        <Grid centered columns="1">
                            <Icon size="massive" name="user circle" />
                        </Grid>
                        <Form.Field>
                            <label>Email</label>
                            <input required type="email"
                                onChange={this.changeHandler}
                                name="email"
                                value={this.state.email}
                                placeholder='Enter Email here' />
                        </Form.Field>
                        <Form.Field>
                            <label>Password</label>
                            <input required onChange={this.changeHandler}
                                name="password"
                                value={this.state.password}
                                type="password" placeholder='Enter password here' />
                        </Form.Field>
                        <Form.Field>
                            <Checkbox checked={this.state.remember}
                                onChange={this.rememberHandler}
                                label='Remember me' />
                        </Form.Field>
                        <Button secondary type='submit'>Submit</Button>
                    </Form>
                </Segment>
            </div>
        )
    }
}
export default Signin;