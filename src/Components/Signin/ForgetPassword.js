import React, { Component } from 'react';
import { Modal, Form, Button, Message } from 'semantic-ui-react';
import { baseUrl } from '../../Shared';
import axios from 'axios';

class ForgetPassword extends Component {
    _mounted = false
    constructor(props) {
        super(props);
        this._mounted = false
        super(props);
        this.state = {
            isLoading: false,
            email: '',
            error: false,
            success: false,
            message: null
        }
    }
    handleClose = () => this.setState({ isOpen: false })
    submitHandler = (e) => {
        this.setState({ isLoading: true, error: false, success: false })
        axios.post(`${baseUrl}resetPassword/sendLink`, {
            email: this.state.email
        })
            .then(res => {
                if (res.status === 200) {
                    if (this._mounted) {
                        this.setState({
                            isLoading: false, errorMess: null
                            , error: false, success: true, message: "Reset Link sent to your Email",
                        })
                    }
                }
            })
            .catch(err => {
                if (this._mounted) {
                    if (err.response) {
                        if (err.response.status === 500) {
                            this.setState({ error: true, message: "Some thing went wrong please try again later", isLoading: false })
                        } else if (err.response.status === 403) {
                            this.setState({ error: true, message: "You are not authentcated to perform this action", isLoading: false })
                        }
                        else if (err.response.status === 404)
                            this.setState({ error: true, message: "Email not found", isLoading: false })
                        else {
                            this.setState({ error: true, message: "Some thing went wrong please try again later", isLoading: false })
                        }
                    } else {
                        this.setState({ error: true, message: "You are not connected to the internet", isLoading: false })
                    }
                }
            })
    }
    componentDidMount() {
        this._mounted = true
    }
    componentWillUnmount() {
        this._mounted = false
    }
    changeHandler = (e) => this.setState({ [e.target.name]: e.target.value })
    render() {
        return (
            <div>
                <Modal dimmer="blurring" closeOnDimmerClick={!this.state.isLoading} onClose={this.props.closeModal} closeIcon={!this.state.isLoading} open={this.props.isOpen}>
                    <Modal.Header>Reset Password</Modal.Header>
                    <Modal.Content>
                        <p>Enter your Email address. We shall send you password reset link. </p>
                        <div>
                            <Form onSubmit={this.submitHandler}>
                                <Form.Field style={{ textAlign: "left", width: "90%" }}>
                                    <Form.Input
                                        type="email"
                                        required
                                        name="email"
                                        label="Email"
                                        value={this.state.email}
                                        placeholder="Enter Email here"
                                        onChange={this.changeHandler}
                                    />
                                </Form.Field>
                                <Message hidden={!(this.state.error || this.state.success) ? true : false}
                                    visible={(this.state.error || this.state.success) ? true : false}
                                    error={this.state.error}
                                    success={this.state.success}>
                                    <Message.Header>
                                        {this.state.error ? "Password reset failed" : "Password reset link sent!"}
                                    </Message.Header>
                                    <Message.Content>
                                        {this.state.message}
                                    </Message.Content>
                                </Message>
                                <Button loading={this.state.isLoading} disabled={this.state.isLoading} type="submit" secondary>Submit</Button>
                            </Form>
                        </div>
                    </Modal.Content>
                </Modal>
            </div>
        );
    }
}

export default ForgetPassword;