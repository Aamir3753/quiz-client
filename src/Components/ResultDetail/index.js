import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom'
import {
    Dimmer, Loader,
    Message, Segment, Divider, Header,
    Statistic, StatisticLabel, StatisticValue,
    Breadcrumb
} from 'semantic-ui-react';
import { ResultDetail as ResultDetailActionDispatcher } from '../../Redux/actionCreaters'

function mapStateToProps(store) {
    return {
        resultDetail: store.resultDetail
    };
}

class ResultDetail extends Component {
    componentDidMount() {
        this.props.dispatch(ResultDetailActionDispatcher(this.props.match.params.resultId))
    }

    render() {
        console.log(this.props.resultDetail)
        if (this.props.resultDetail.isLoading) {
            return (
                <Dimmer active>
                    <Loader size="massive" />
                </Dimmer>
            )
        }
        else if (this.props.resultDetail.errMess) {
            return (
                <Message error content={this.props.resultDetail.errMess} />
            )
        }
        else {
            if (this.props.resultDetail.result) {
                const { result, repeatQuestions } = this.props.resultDetail.result
                console.log(repeatQuestions);
                return (
                    <div>
                        <Breadcrumb>
                            <Breadcrumb.Section as={Link} to="/" link>
                                Home
                        </Breadcrumb.Section>
                            <Breadcrumb.Divider icon="right chevron" />
                            <Breadcrumb.Section as={Link} to="/results">
                                Results
                          </Breadcrumb.Section>
                            <Breadcrumb.Divider icon="right arrow" />
                            <Breadcrumb.Section active>
                                Result Details
                             </Breadcrumb.Section>
                        </Breadcrumb>
                        <Segment piled raised>
                            <div>
                                <div>
                                    <div>
                                        <div className="result-list-container">
                                            <div>
                                                <Header as="h1">{result.quiz.title}</Header>
                                            </div>
                                            <div>
                                                <Statistic color={result.result ? "green" : "red"} size="small">
                                                    <StatisticValue >{Math.floor(result.obtainedPercentage)}</StatisticValue>
                                                    <StatisticLabel>Score</StatisticLabel>
                                                </Statistic>
                                            </div>
                                            <div>
                                                <Header as="h1" color={result.result ? "green" : "red"}>
                                                    {result.result ? "Pass" : "Fail"}
                                                </Header>
                                            </div>
                                        </div>
                                    </div>
                                    <Divider />
                                    <div>
                                        <div>
                                            <Header textAlign="center" as="h1">Wrong Questions</Header>
                                        </div>
                                        <div>
                                            {
                                                repeatQuestions ?
                                                    repeatQuestions.map((question, index) => (
                                                        <div style={{ marginLeft: "10px" }} key={question._id}>
                                                            <Header color="red" style={{ margin: "0px" }} as="h4">{`${index + 1}) ${question.question}`}</Header>
                                                            <div style={{ marginLeft: "10px" }}>
                                                                <Header style={{ margin: "0px" }} as="h5">Correct Answer</Header>
                                                                {question.answer.map(ans => (
                                                                    <Header style={{ margin: "0px", marginLeft: "10px" }} key={ans} color="green" as="h5">
                                                                        {ans}
                                                                    </Header>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    )) :
                                                    <Header as="h4" color="green">No wrong question!</Header>
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Segment>
                    </div>
                )
            }
            else {
                return (
                    <h1>What the F**k</h1>
                );
            }
        }
    }
}

export default connect(
    mapStateToProps,
)(ResultDetail);