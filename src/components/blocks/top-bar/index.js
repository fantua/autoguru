import React, { Component, PropTypes } from 'react';
import Selection from './selection';
import Pagination from './pagination';
import Actions from './actions';
import User from '../../../utils/user';

class TopBar extends Component {

    static propTypes = {
        onDelete: PropTypes.func,
        actionsProps: PropTypes.object,
        selectionProps: PropTypes.object,
        paginationProps: PropTypes.object
    };

    renderSelection() {
        const { selectionProps } = this.props;

        if (selectionProps) {
            return <Selection {...selectionProps} />;
        }

        return null;
    }

    renderDelete() {
        const { onDelete } = this.props;

        if (User.isAdmin() && onDelete) {
            return <a className="b-filter__option-delete" onClick={onDelete}>Delete</a>
        }

        return null;
    }

    renderActions() {
        const { actionsProps } = this.props;

        if (User.isAdmin() && actionsProps) {
            return <Actions {...actionsProps} />;
        }

        return null;
    }

    renderPagination() {
        const { paginationProps } = this.props;

        if (paginationProps) {
            return <Pagination {...paginationProps} />
        }

        return null;
    }

    render() {
        return (
            <div className="b-filter__option">
                <div className="b-filter__option-left">
                    {this.renderSelection()}
                    {this.renderDelete()}
                    {this.renderActions()}
                </div>
                {this.renderPagination()}
            </div>
        );
    }

}

export default TopBar;