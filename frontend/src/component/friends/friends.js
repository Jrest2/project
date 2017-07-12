import './friends.css';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import SearchInput, {createFilter} from 'react-search-input';
import {getFriends} from "../../actions/friends";
import _ from 'lodash';

const KEYS_TO_FILTERS = ['user.name', 'subject', 'dest.name'];
const DELAY = 1000;

class Friends extends Component {
    constructor() {
        super();
        this.state = {searchTerm: ''};
    }

    componentWillMount() {
        this.searchBack();
    }

    searchBack() {

        this.props.getFriends({name: this.state.searchTerm});
        // apiService.friends(this.state.searchTerm, (friend) => {
        //     this.setState({emails: friend});
        // });
    }

    render() {
        // const filteredEmails = this.state.emails.filter(createFilter(this.state.searchTerm, KEYS_TO_FILTERS));

        const options = {
            page: 1,
            sizePerPageList: [{
                text: '5', value: 5
            }, {
                text: '10', value: 10
            }, {
                text: 'All', value: this.props.friends.length
            }],
            sizePerPage: 5,
            pageStartIndex: 0,
            paginationSize: 3,
            prePage: 'Prev',
            nextPage: 'Next',
            firstPage: 'First',
            lastPage: 'Last',
            paginationPosition: 'bottom'
        };

        return (
            <div className="content">
                <SearchInput className="search-input" onChange={this.searchUpdated.bind(this)}/>
                <input type="submit" onClick={ this.searchBack.bind(this) } name="login"
                       className="login loginmodal-submit" value="Search"/>
                <BootstrapTable data={ this.props.friends }
                                pagination={ true } options={ options }
                                tableHeaderClass='react-bs-container-header'
                                tableBodyClass='react-bs-container-body'>
                    <TableHeaderColumn dataField='name' isKey>Name</TableHeaderColumn>
                    <TableHeaderColumn dataField='lastName'>Last Name</TableHeaderColumn>
                    <TableHeaderColumn dataField='age'
                                       filter={ {type: 'TextFilter', delay: DELAY} }>Age</TableHeaderColumn>
                    <TableHeaderColumn dataField='gender'
                                       filter={ {type: 'TextFilter', delay: DELAY} }>Gender</TableHeaderColumn>
                    <TableHeaderColumn dataField='dateOfBirth'>Date</TableHeaderColumn>
                </BootstrapTable>
            </div>
        );
    }

    searchUpdated(term) {
        this.setState({searchTerm: term})
    }
}

const mapStateToProps = (state) => {

    return {
        friends: _.get(state, 'friend.getFriends.data.friends', []),
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getFriends: (payload) => dispatch(getFriends(payload)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Friends)
