import React, { Component } from 'react';
import { Search as SemanticSearch, Label } from 'semantic-ui-react';
import debounce from 'lodash.debounce';
import axios from 'axios';
import { baseUrl } from '../../Shared';
class Search extends Component {
    _isMounted = false
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            searchValue: '',
            results: [],
        };
    }
    resultRenderer = ({ title }) => <Label content={title} />
    componentDidMount() {
        this._isMounted = true;
    }
    componentWillUnmount() {
        this._isMounted = false;
    }
    searchHandler = (e, { value }) => {
        if (this._isMounted) this.setState({ isLoading: true, searchValue: value })
        axios.get(baseUrl + "quiz/?title=" + value)
            .then(res => {
                if (this._isMounted) {
                    if (res.data.success) {
                        let results = res.data.quizes.map(quiz => ({ key: quiz._id, title: quiz.title }))
                        this.setState({ isLoading: false, results: results.slice(0, 5) })
                    }
                }
            })
            .catch(err => {
                console.log(err.response);
            })
    }
    selectHandler = (e, { result }) => {
       this.props.navigate(`/quizDetail/${result.key}`);
    }
    render() {
        return (
            <div className="search-container">
                <SemanticSearch
                    size="large"
                    aligned="right"
                    loading={this.state.isLoading}
                    onSearchChange={debounce(this.searchHandler, 500, { leading: true })}
                    results={this.state.results}
                    onResultSelect={this.selectHandler}
                    resultRenderer={this.resultRenderer}
                    value={this.state.searchValue}
                    placeholder="Search"
                />
            </div>
        );
    }
}

export default Search;