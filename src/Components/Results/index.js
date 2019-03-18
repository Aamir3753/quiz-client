import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
    Dimmer, Loader, Message, Grid, Segment,
    Statistic, StatisticLabel, StatisticValue,
    Breadcrumb,
    Header
} from 'semantic-ui-react';
import { Results as ResultsActionDispatcher } from '../../Redux/actionCreaters'

function mapStateToProps(store) {
    return {
        results: store.results
    };
}

class Resuts extends Component {

    componentDidMount() {
        this.props.dispatch(ResultsActionDispatcher());
    }

    render() {
        const { results } = this.props
        if (results.isLoading) {
            return (
                <Dimmer active>
                    <Loader size="massive" />
                </Dimmer>
            )
        }
        else if (results.errMess) {
            return (
                <Message error content={results.errMess} />
            )
        }
        else {
            return (
                <div>
                    <div className="result-breadcrumb-container">
                    <Breadcrumb>
                        <Breadcrumb.Section as={Link} to="/" link>
                            Home
                        </Breadcrumb.Section>
                        <Breadcrumb.Divider icon="right arrow" />
                        <Breadcrumb.Section active>
                            Results
                        </Breadcrumb.Section>
                    </Breadcrumb>
                    </div>
                    <Grid padded="vertically" columns="1">
                        {
                            results.results.map(result => (
                                <Grid.Column as={Link} key={result._id} to={`/resultDetail/${result._id}`}>
                                    <Segment piled raised >
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
                                    </Segment>
                                </Grid.Column>
                            ))
                        }
                    </Grid>
                </div>
            )
        }
    }
}
export default connect(
    mapStateToProps,
)(Resuts);