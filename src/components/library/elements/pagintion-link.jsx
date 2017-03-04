import React, { PropTypes } from 'react';
import { Link } from 'react-router';

const PaginationLink = (props) => {
    const { pathname, query: q, page, children, className } = props;

    return (
        <Link to={{ pathname, query: { page, q } }} className={className}>
            {children}
        </Link>
    );

};

PaginationLink.propTypes = {
    pathname: PropTypes.string.isRequired,
    query: PropTypes.string,
    page: PropTypes.number.isRequired,
    className: PropTypes.string.isRequired
};

export default PaginationLink;