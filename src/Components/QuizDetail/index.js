import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Dimmer, Loader, Message, Breadcrumb, Divider, Segment, Button} from 'semantic-ui-react';
import { QuizDetail as QuizDetailActionDispatcher } from '../../Redux/actionCreaters';
class QuizDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            componentMounted: false
        };
    }

    componentDidMount() {
        this.props.dispatch(QuizDetailActionDispatcher(this.props.match.params.quizId))
    }
    render() {
        if (this.props.quiz.isLoading) {
            return (
                <Dimmer active>
                    <Loader size="massive" />
                </Dimmer>
            )
        }
        else if (this.props.quiz.errMess || !this.props.quiz.quiz) {
            return (
                <Message error content={this.props.quiz.errMess || "Some thing went wrong please try later"} />
            )
        }
        return (
            <div className="quiz-detail-container" >
                <Breadcrumb>
                    <Breadcrumb.Section as={Link} to="/" link>
                        Home
                        </Breadcrumb.Section>
                    <Breadcrumb.Divider icon="right arrow" />
                    <Breadcrumb.Section active>
                        Quiz Details
                        </Breadcrumb.Section>
                </Breadcrumb>
                <Segment piled raised>
                    <div>
                        <h3>{this.props.quiz.quiz.title}</h3>
                        <Divider />
                        <div>
                            <p>
                                {this.props.quiz.quiz.description}
                            </p>
                            <Divider />
                        </div>
                        <div>
                            Total Questions : {this.props.quiz.quiz.totalQuestions}
                        </div>
                        <Divider />
                        <div>
                            Passing Score : {this.props.quiz.quiz.passingScore}
                        </div>
                        <Divider />
                        <Button as={Link} to={`/startQuiz/${this.props.match.params.quizId}`} size="large" primary>
                            Start
                        </Button>
                    </div>
                </Segment>
            </div>
        );
    }
}
function mapStateToProps(store) {
    return {
        quiz: store.quizDetail
    };
}
export default connect(
    mapStateToProps,
)(QuizDetail);