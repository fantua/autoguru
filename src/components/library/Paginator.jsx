import React from 'react';
import Parse from 'parse';
import ReactPaginate from 'react-paginate';

const Paginator = React.createClass({

    render() {
        return (
            <ReactPaginate pageNum={this.props.totalPages}
                           marginPagesDisplayed={1}
                           pageRangeDisplayed={3}
                           clickCallback={this.props.onChange}
                           activeClassName="active"
                           containerClassName="pagination"
                           previousLabel=""
                           previousLinkClassName="prev"
                           nextLabel=""
                           nextLinkClassName="next"
                           breakLabel={<a href="">...</a>}
            />
        );
    }

});

export default Paginator;