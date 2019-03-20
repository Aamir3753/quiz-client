import React, { Component } from 'react';
import { connect } from 'react-redux';
import { UserDetail, DeleteAccount } from '../../Redux/actionCreaters';
import {
    Message, Dimmer, Loader, Segment,
    Image, Icon, Header, Button,
    Confirm, Table, Label, Divider
} from 'semantic-ui-react';

function mapStateToProps(state) {
    return {
        user: state.userDetail
    };
}

class UserProfile extends Component {
    state = {
        isOpen: false
    }

    openConfirm = () => this.setState({ isOpen: true })
    closeConfirm = () => this.setState({ isOpen: false })

    handleConfirm = () => this.props.dispatch(DeleteAccount());
    
    componentDidMount() {
        this.props.dispatch(UserDetail())
    }

    render() {
        const { user } = this.props;
        if (user.errMess) {
            return (
                <div>
                    <Message error content={user.errMess} />
                </div>
            )
        }
        else if (user.isLoading) {
            return (<Dimmer active>
                <Loader size="massive" />
            </Dimmer>)
        }
        else if (user.user) {
            return (
                <div>
                    <Segment raised padded piled>
                        <div style={{ display: "flex", justifyContent: "center" }}>
                            {user.user.img ? <Image centered circular src={user.user.img} /> : <Icon name="user circle" size="massive" />}
                        </div>
                        <Divider/>
                        <div>
                            <Table basic="very" celled collapsing>
                                <Table.Header>
                                    <Table.Row>
                                        <Table.HeaderCell>
                                            <Header as="h2" color="blue" content="Profile Information" />
                                        </Table.HeaderCell>
                                    </Table.Row>
                                </Table.Header>
                                <Table.Body>
                                    <Table.Row>
                                        <Table.Cell>
                                            <Header content="Email" as="h3" />
                                        </Table.Cell>
                                        <Table.Cell>
                                            <Label size="large" color="teal">
                                                {user.user.username}
                                            </Label>
                                        </Table.Cell>
                                    </Table.Row>
                                    <Table.Row>
                                        <Table.Cell>
                                            <Header content="First name" as="h3" />
                                        </Table.Cell>
                                        <Table.Cell>
                                            <Label size="large" color="teal">
                                                {user.user.firstname}
                                            </Label>
                                        </Table.Cell>
                                    </Table.Row>
                                    <Table.Row>
                                        <Table.Cell>
                                            <Header content="Last name" as="h3" />
                                        </Table.Cell>
                                        <Table.Cell>
                                            <Label size="large" color="teal">
                                                {user.user.lastname}
                                            </Label>
                                        </Table.Cell>
                                    </Table.Row>
                                    <Table.Row>
                                        <Table.Cell>
                                            <Header content="Gender" as="h3" />
                                        </Table.Cell>
                                        <Table.Cell>
                                            <Label size="large" color="teal">
                                                {user.user.gender}
                                            </Label>
                                        </Table.Cell>
                                    </Table.Row>
                                </Table.Body>
                            </Table>
                        </div>
                        <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "5px" }}>
                            <Button onClick={this.openConfirm} color="red">
                                <Icon name="delete" />
                                Delete Account
                            </Button>
                        </div>
                    </Segment>
                    <Confirm open={this.state.isOpen}
                        confirmButton="Delete"
                        onCancel={this.closeConfirm}
                        content="Are you sure you want to delete the account !"
                        onConfirm={this.handleConfirm} />
                </div>
            );
        }
        else {
            return <div>Loading.....</div>
        }
    }
}

export default connect(
    mapStateToProps,
)(UserProfile);