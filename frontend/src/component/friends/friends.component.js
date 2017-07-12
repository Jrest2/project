import React, { Component } from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import apiService from '../../service/api.service';
import SearchInput, {createFilter} from 'react-search-input';

import './friends.component.css';

const KEYS_TO_FILTERS = ['user.name', 'subject', 'dest.name'];

class Friends extends Component {
    constructor() {
        super();
        this.state = {
            searchTerm: '',
            emails: []
        };
       this.searchBack();
    }

    searchBack() {
        apiService.friends(this.state.searchTerm, (friend)=>{
            console.log(friend);
            this.setState({emails: friend});
        });
    }

    render() {
        const filteredEmails = this.state.emails.filter(createFilter(this.state.searchTerm, KEYS_TO_FILTERS));
        const options = {
            page: 1,
            sizePerPageList: [ {
                text: '5', value: 5
            }, {
                text: '10', value: 10
            }, {
                text: 'All', value: filteredEmails.length
            } ],
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
                <SearchInput className="search-input" onChange={this.searchUpdated.bind(this)} />
                <input type="submit" onClick={this.searchBack.bind(this)} name="login" className="login loginmodal-submit" value="Login" />
                <BootstrapTable data={ this.state.emails }
                                pagination={ true } options={ options }
                                tableHeaderClass='react-bs-container-header'
                                tableBodyClass='react-bs-container-body'>
                    <TableHeaderColumn dataField='name' isKey>Name</TableHeaderColumn>
                    <TableHeaderColumn dataField='lastName'>Last Name</TableHeaderColumn>
                    <TableHeaderColumn dataField='age' filter={ { type: 'TextFilter', delay: 1000 } }>Age</TableHeaderColumn>
                    <TableHeaderColumn dataField='gender' filter={ { type: 'TextFilter', delay: 1000 } }>Gender</TableHeaderColumn>
                    <TableHeaderColumn dataField='dateOfBirth'>Date</TableHeaderColumn>
                </BootstrapTable>
            </div>
        );
    }

    searchUpdated (term) {
        this.setState({searchTerm: term})
    }
}


export default Friends;
