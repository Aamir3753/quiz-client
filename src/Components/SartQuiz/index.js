import React, { Component } from 'react';
import { connect } from 'react-redux';
import { QuestionPaper, SubmitQuestionPaper } from '../../Redux/actionCreaters';
import { Dimmer, Loader, Message, Button, Segment, Header, Divider, Form, Transition } from 'semantic-ui-react';

class StartQuiz extends Component {
    constructor(props) {
        super(props);
        this.state = {
            errMess: null,
            isLoading: false,
            questionCounter: 0,
            totalQuestions: 0,
            questions: null,
            radioValue: '',
            selectedOptions: [],
            solution: {
                quizId: '',
                answers: []
            },
            nextIsDisable: true,
        };
    }

    componentDidMount() {
        this.props.dispatch(QuestionPaper(this.props.match.params.quizId));
    }
    handleNext = (e) => {
        let answer = {}
        if (this.state.questions[this.state.questionCounter].isMultiselect) {
            answer = {
                questionId: e.target.id,
                answer: this.state.selectedOptions
            }
        } else {
            answer = {
                questionId: e.target.id,
                answer: [this.state.radioValue]
            }
        }
        if (this.state.totalQuestions === this.state.questionCounter + 1) {
            if (this.state.solution.answers.length !== this.state.totalQuestions) {
                this.setState((prevState) => ({
                    radioValue: '',
                    selectedOptions: [],
                    solution: {
                        quizId: this.props.match.params.quizId,
                        answers: [...prevState.solution.answers, answer]
                    }
                }), () => this.props.dispatch(SubmitQuestionPaper(this.state.solution, this.props.history.push)))

            }
        } else {
            this.setState((prevState) => ({
                questionCounter: ++prevState.questionCounter,
                radioValue: '',
                selectedOptions: [],
                nextIsDisable: true,
                solution: {
                    quizId: this.props.match.params.quizId,
                    answers: [...prevState.solution.answers, answer]
                }
            }))
        }
    }
    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.questions.isLoading) {
            return {
                ...prevState,
                isLoading: true,
                errMess: null,
                questions: null
            }
        }
        if (nextProps.questions.errMess) {
            return {
                ...prevState,
                isLoading: false,
                errMess: nextProps.questions.errMess,
                questions: null
            }
        }
        else if (nextProps.questions.questions) {
            return {
                ...prevState,
                isLoading: false,
                questions: nextProps.questions.questions,
                totalQuestions: nextProps.questions.questions.length,
            }
        }
        else {
            return {
                ...prevState
            }
        }
    }
    changeHandler = (e) => {
        this.setState({ radioValue: e.target.innerText, nextIsDisable: false })
    }
    handleCheckbox = (e) => {
        let value = e.target.innerText;
        let isSelect = this.state.selectedOptions.includes(value)
        if (!isSelect) {
            this.setState(pre => ({
                selectedOptions: [...pre.selectedOptions, value]
            }), this.checkButtonDisablity)
        } else {
            let newOptions = this.state.selectedOptions.filter(option => option !== value)
            this.setState({ selectedOptions: newOptions }, this.checkButtonDisablity)
        }
    }
    checkButtonDisablity = () => {
        if (this.state.selectedOptions.length !== 0) {
            this.setState({ nextIsDisable: false })
        } else {
            this.setState({ nextIsDisable: true })
        }
    }
    render() {
        if (this.state.isLoading) {
            return (
                <Dimmer active>
                    <Loader size="massive" />
                </Dimmer>
            )
        } else if (this.state.errMess) {
            return (
                <Message error content={this.props.questions.errMess} />
            )
        }
        else if (this.state.questions) {
            return (
                <div className="question-container">
                    <Segment>
                        <Transition animation="pulse" duration={800} visible={this.state.animate}>
                            <div>
                                <Header as="h4">
                                    <b>{this.state.questionCounter + 1}) </b>
                                    {this.state.questions[this.state.questionCounter].question}
                                </Header>
                            </div>
                        </Transition>
                        <Divider />
                        <div>
                            {this.state.questions[this.state.questionCounter].options.map(option => {
                                if (this.state.questions[this.state.questionCounter].isMultiselect) {
                                    return (
                                        <div className="option-container" key={option}>
                                            <Form.Checkbox onClick={this.handleCheckbox} value={option} label={option} />
                                        </div>
                                    )
                                } else {
                                    return (
                                        <div className="option-container" key={option}>
                                            <Form.Radio
                                                name="option"
                                                onChange={this.changeHandler}
                                                value={option}
                                                checked={option === this.state.radioValue}
                                                label={option} />
                                        </div>
                                    )
                                }
                            })
                            }
                            <div className="next-button-container">
                                <Button id={this.state.questions[this.state.questionCounter]._id} disabled={this.state.nextIsDisable} primary onClick={this.handleNext}>
                                    {this.state.questions.length === this.state.questionCounter + 1 ? 'Submit' : 'Next'}
                                </Button>
                            </div>
                        </div>
                    </Segment>
                </div >
            );
        }
        else {
            return (
                <Loader />
            )
        }

    }
}

function mapStateToProps(store) {
    return {
        questions: store.questions
    };
}
export default connect(
    mapStateToProps,
)(StartQuiz);