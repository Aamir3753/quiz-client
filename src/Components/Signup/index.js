import React from 'react';
import { Form, Button, Radio, Segment, Grid, Icon, Message } from 'semantic-ui-react';
import { emailValidator } from '../../Shared';
class Signup extends React.Component {
    state = {
        email: '',
        password: '',
        firstname: '',
        lastname: '',
        gender: 'male',
        emailErrMess: '',
        emailErr: false,
        firstnameErrMess: '',
        firstnameErr: false,
        lastnameErrMess: '',
        lastnameErr: false,
        confirmPassword: '',
        passwordErr: false,
        passwordErrMess: '',
        confirmPasswordErr: false,
        confirmPasswordErrMess: '',
        serverErrMess: null,
        formError: false,
    }
    changeHandler = (e) => this.setState({ [e.target.name]: e.target.value })
    genderHandler = (e, { value }) => this.setState({ gender: value })
    blurHandler = (e) => {
        const name = e.target.name;
        if (name === "email") {
            if (!emailValidator.test(this.state.email)) {
                this.setState(
                    {
                        emailErr: true,
                        emailErrMess: 'Enter valid Email',
                        formError: true
                    },
                );
            }
            else {
                this.setState(
                    {
                        formError: false,
                        emailErr: false,
                    },
                    this.validationChecker
                );
            }
        }
        if (name === "firstname") {
            if (this.state.firstname.trim().length < 4 || this.state.firstname.trim().length > 15) {
                this.setState(
                    {
                        firstnameErr: true,
                        firstnameErrMess: 'Firstname should contain < 15 and > 4 characters',
                        formError: true
                    }
                );
            }
            else {
                this.setState(
                    {
                        firstnameErr: false,
                        formError: false,
                    },
                    this.validationChecker
                );
            }
        }
        if (name === "lastname") {
            if (this.state.lastname.trim().length < 4 || this.state.lastname.trim().length > 15) {
                this.setState(
                    {
                        lastnameErr: true,
                        lastnameErrMess: 'Lastname should contain < 15 and > 4 characters',
                        formError: true
                    }
                );
            }
            else {
                this.setState(
                    {
                        lastnameErr: false,
                        formError: false,
                    },
                    this.validationChecker
                );
            }

        }
        if (name === "password") {
            if (this.state.password.trim().length < 8) {
                this.setState(
                    {
                        passwordErr: true,
                        passwordErrMess: 'Password should be > 8 characters',
                        formError: true
                    }
                );
            }
            else {
                this.setState(
                    {
                        passwordErr: false,
                        formError: false,
                    },
                    this.validationChecker
                );
            }
        }
        if (name === "confirmPassword") {
            if (this.state.confirmPassword !== this.state.password) {
                this.setState(
                    {
                        confirmPasswordErr: true,
                        confirmPasswordErrMess: 'Password do not match',
                        formError: true
                    }
                );
            }
            else {
                this.setState(
                    {
                        confirmPasswordErr: false,
                        formError: false,
                    },
                    this.validationChecker
                );
            }
        }
    }
    validationChecker = () => {
        const { emailErr, firstnameErr, lastnameErr, passwordErr, confirmPasswordErr } = this.state;
        if (emailErr || firstnameErr || lastnameErr || passwordErr || confirmPasswordErr) {
            this.setState({ formError: true })
        } else {
            this.setState({ formError: false })
        }
    }
    submitHandler = (e) => {
        const { emailErr, firstnameErr, lastnameErr, passwordErr, confirmPasswordErr } = this.state;
        let formIsValid = true;
        if (this.state.email === "") {
            this.setState({ emailErr: true, emailErrMess: "Email is required" })
            formIsValid = false
        }
        if (this.state.firstname === "") {
            this.setState({ firstnameErr: true, firstnameErrMess: "Firstname is required" })
            formIsValid = false
        }
        if (this.state.lastname === "") {
            this.setState({ lastnameErr: true, lastnameErrMess: "Lastname is required" })
            formIsValid = false
        }
        if (this.state.password === "") {
            this.setState({ passwordErr: true, passwordErrMess: "Password is required" })
            formIsValid = false
        }
        if (this.state.confirmPassword !== this.state.password) {
            this.setState({ confirmPasswordErr: true, confirmPasswordErrMess: "Password do not match" })
            formIsValid = false
        }

        if (!formIsValid) {
            this.setState({ formError: true })
        }
        else if (emailErr || firstnameErr ||
            lastnameErr || passwordErr || confirmPasswordErr) {
            this.setState({ formError: true })
        } else {
            this.setState({ formError: false })
            const formData = {
                username: this.state.email,
                firstname: this.state.firstname,
                lastname: this.state.lastname,
                gender: this.state.gender,
                password: this.state.password
            }
            console.log(formData);
        }

    }
    Errors = () => (
        <ul>
            {this.state.emailErr ? <li> {this.state.emailErrMess}</li> : null}
            {this.state.firstnameErr ? <li> {this.state.firstnameErrMess}</li> : null}
            {this.state.lastnameErr ? <li> {this.state.lastnameErrMess}</li> : null}
            {this.state.passwordErr ? <li>{this.state.passwordErrMess}</li> : null}
            {this.state.confirmPasswordErr ? <li> {this.state.confirmPasswordErrMess}</li> : null}
        </ul>
    )
    render() {
        return (
            <Segment raised>
                <Form error={this.state.formError} onSubmit={this.submitHandler}>
                    <Grid centered columns="1">
                        <Icon size="massive" name="user circle" />
                    </Grid>
                    <Form.Field>
                        <Form.Input label="Email"
                            type="email"
                            error={this.state.emailErr}
                            onBlur={this.blurHandler}
                            onChange={this.changeHandler}
                            name="email"
                            value={this.state.email}
                            placeholder='Enter Email here' />
                    </Form.Field>
                    <Form.Field>
                        <Form.Input
                            onBlur={this.blurHandler}
                            error={this.state.firstnameErr}
                            type="text"
                            label="First name"
                            onChange={this.changeHandler}
                            name="firstname"
                            value={this.state.firstname}
                            placeholder='Enter first name here' />
                    </Form.Field>
                    <Form.Field>
                        <Form.Input
                            type="text"
                            onBlur={this.blurHandler}
                            error={this.state.lastnameErr}
                            onChange={this.changeHandler}
                            name="lastname"
                            value={this.state.lastname}
                            placeholder='Enter last name here' />
                    </Form.Field>
                    <Form.Group inline>
                        <label>Gender</label>
                        <Form.Field
                            control={Radio}
                            label='Male'
                            onChange={this.genderHandler}
                            value="male"
                            checked={this.state.gender === "male"}
                        />
                        <Form.Field
                            control={Radio}
                            label='Female'
                            onChange={this.genderHandler}
                            value="female"
                            checked={this.state.gender === "female"}
                        />
                    </Form.Group>
                    <Form.Field>
                        <Form.Input
                            onChange={this.changeHandler}
                            onBlur={this.blurHandler}
                            error={this.state.passwordErr}
                            name="password"
                            value={this.state.password}
                            type="password" placeholder='Enter password here' />
                    </Form.Field>
                    <Form.Field>
                        <Form.Input
                            label="Confirm password"
                            onBlur={this.blurHandler}
                            error={this.state.confirmPasswordErr}
                            onChange={this.changeHandler}
                            name="confirmPassword"
                            value={this.state.confirmPassword}
                            type="password" placeholder='Confirm password' />
                    </Form.Field>
                    <Message error header="Signup Failed" content={<this.Errors />} />
                    <Button secondary type='submit'>Submit</Button>
                </Form>
            </Segment>
        )
    }
}
export default Signup;
