import React from 'react';
import { Message, Dimmer, Loader, Card, Divider } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import Search from './Search';
import Pagination from './Pagination';
import { Quizes as QuizesActionDispatcher } from '../../Redux/actionCreaters';
import { connect } from 'react-redux';

const Quizes = (props) => {
    const nextPage = (e) => {
        props.dispatch(QuizesActionDispatcher(e.target.getAttribute("value")))
    }
    if (props.errMess) {
        return <Message error content={props.errMess} />
    }
    else if (props.isLoading) {
        return (
            <Dimmer active>
                <Loader size="massive" />
            </Dimmer>
        )
    } else {
        return (
            <div>
                <Search navigate={props.history.push} />
                <Card.Group>
                    {props.quizes.docs.map(quiz => (
                        <Card as={Link} to={`/quizDetail/${quiz._id}`} raised centered link key={quiz._id}>
                            <Card.Content>
                                <Card.Header>
                                    {quiz.title}
                                </Card.Header>
                                <Divider />
                                <Card.Description>
                                    {quiz.description}
                                </Card.Description>
                            </Card.Content>
                        </Card>
                    ))}
                </Card.Group>
                <div>
                    <Pagination nextPage={nextPage}
                        currentPage={props.quizes.page}
                        totalPages={props.quizes.totalPages} />
                </div>
            </div>
        )
    }
}
export default connect()(Quizes);