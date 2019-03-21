import React, { Component } from 'react';
import { Modal, Form, Button} from 'semantic-ui-react';

class ForgetPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: true,
            isLoading:false
        }
    }
    handleClose = () => this.setState({ isOpen: false })
    submitHandler = (e)=>{
        this.setState({isLoading:true})
    }
    render() {
        return (
            <div>
                <Modal dimmer="blurring" closeOnDimmerClick={!this.state.isLoading} onClose={this.props.closeModal} closeIcon={!this.state.isLoading} open={this.props.isOpen}>
                    <Modal.Header>Reset Password</Modal.Header>
                    <Modal.Content>
                        <p>Enter your Email address. we will send you password reset link. </p>
                        <div>
                            <Form onSubmit={this.submitHandler}>
                                <Form.Field style={{ textAlign: "left", width: "90%" }}>
                                    <Form.Input
                                        type="email"
                                        required
                                        name="email"
                                        label="Email"
                                        placeholder="Enter Email here"
                                    />
                                </Form.Field>
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