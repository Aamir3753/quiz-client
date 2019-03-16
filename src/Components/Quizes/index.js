import React from 'react';
import { Message, Dimmer, Loader, Card, Divider } from 'semantic-ui-react';
import Search from './Search';
import { Link } from 'react-router-dom';
const Quizes = (props) => {
    console.log(props.quizes);
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
                    {props.quizes.map(quiz => (
                        <Card as={Link} to={`/quizDetail/${quiz._id}`} raised centered link key={quiz._id}>
                            <Card.Content>
                                <Card.Header>
                                    {quiz.title}
                                </Card.Header>
                                <Divider/>
                                <Card.Description>
                                    {quiz.description}
                                </Card.Description>
                            </Card.Content>
                        </Card>
                    ))}
                </Card.Group>
            </div>
        )
    }
}
export default Quizes;