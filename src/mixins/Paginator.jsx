import React from 'react';
import PaginatorComponent from '../components/library/paginator';
import { paginatorLimit as limit } from '../utils';

const Paginator = {

    getInitialState() {
        return {
            data: [],
            limit: limit,
            offset: 0,
            totalPages: null
        };
    },

    setData(data, count) {
        this.setState({
            data: data,
            totalPages: Math.ceil(count / limit)
        });
    },

    handlePaginator(data) {
        this.setState({offset: data.selected * limit}, this.fetch);
    },

    getPaginator() {
        if (this.state.totalPages)
            return <PaginatorComponent totalPages={this.state.totalPages} onChange={this.handlePaginator} />;
    }

};

export default Paginator;