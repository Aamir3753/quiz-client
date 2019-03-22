import React, { Component } from 'react';
import { Segment, Form, Button, Header, Message } from 'semantic-ui-react';
import axios from 'axios';
import { baseUrl } from '../../Shared'

class ResetPassword extends Component {
    _mounted = false;
    constructor(props) {
        super(props);
        this.state = {
            password: '',
            confirmPassword: '',
            message: '',
            error: false,
            success: false,
            isLoading: false,
        };
    }
    changeHandler = (e) => this.setState({ [e.target.name]: e.target.value })
    submitHandler = () => {
        if (this.state.password.trim() === "") {
            this.setState({ isLoading: false, error: true, success: false, message: "Enter a valid password" })
        }
        else if (this.state.password.length < 8) {
            this.setState({ isLoading: false, error: true, success: false, message: "Password should be greater than 8 characters" })
        }
        else if (this.state.password !== this.state.confirmPassword) {
            this.setState({ isLoading: false, error: true, success: false, message: "Password don not match" })
        }
        else {
            this.setState({ isLoading: true, error: false, success: false })
            axios.post(`${baseUrl}resetPassword/setPassword`, {
                token: this.props.match.params.token,
                password: this.state.password
            })
                .then(res => {
                    if (res.status === 200) {
                        if (this._mounted) {
                            this.setState({ isLoading: false, error: false, success: true, message: "Password changed!" })
                            setTimeout(() => {
                                this.props.history.push("/signin")
                            }, 2000)
                        }
                    }
                })
                .catch(err => {
                    if (this._mounted) {
                        if (err.response) {
                            if (err.response.data) {
                                if (err.response.data.err) {
                                    if (err.response.data.err.name === "TokenExpiredError")
                                        this.setState({ isLoading: false, error: true, message: "Link Expired" })
                                    else if (err.response.data.err.name === "JsonWebTokenError")
                                        this.setState({ isLoading: false, error: true, message: "Invalid Link" })
                                    else
                                        this.setState({ isLoading: false, error: true, message: "Some thing went wrong please try angain late" })
                                }
                                else {
                                    this.setState({ isLoading: false, error: true, message: "Some thing went wrong please try angain later" })
                                }
                            }
                        }
                        else {
                            this.setState({ isLoading: false, error: true, message: "You are not connected to the internet" })
                        }
                    }
                })
        }
    }
    componentWillUnmount() {
        this._mounted = false
    }
    componentDidMount() {
        this._mounted = true
    }

    render() {
        return (
            <div style={{ display: "flex", justifyContent: "center" }}>
                <Segment loading={this.state.isLoading} style={{ width: "500px" }} piled raised>
                    <Header as="h1">Reset Password</Header>
                    <Form onSubmit={this.submitHandler}>
                        <Form.Input
                            type="password"
                            required
                            name="password"
                            label="New Password"
                            placeholder="Enter new password here"
                            onChange={this.changeHandler}
                            value={this.state.password}
                        />
                        <Form.Input
                            type="password"
                            required
                            name="confirmPassword"
                            label="Confirm Password"
                            placeholder="Confirm your password"
                            onChange={this.changeHandler}
                            value={this.state.confirmPassword}
                        />
                        <Message error={this.state.error}
                            success={this.state.success}
                            hidden={!(this.state.error || this.state.success) ? true : false}
                            visible={(this.state.error || this.state.success) ? true : false}
                            content={this.state.message} />
                        <Button secondary>Reset Password</Button>
                    </Form>
                </Segment>
            </div>
        );
    }
}

export default ResetPassword;