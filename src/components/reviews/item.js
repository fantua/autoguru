import React, { Component, PropTypes } from 'react';
import Checkbox from '../library/checkbox';

class Item extends Component {

    constructor(props) {
        super(props);

        this.handleSelect = this.handleSelect.bind(this);
    }

    static propTypes = {
        userName: PropTypes.string.isRequired,
        userPhoneNumber: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        createdAt: PropTypes.instanceOf(Date),
        selected: PropTypes.bool.isRequired,
        select: PropTypes.func.isRequired,
        unselect: PropTypes.func.isRequired,
    };

    handleSelect(e) {
        const { id, selected, select, unselect } = this.props;

        if (!selected) {
            select(id);
        } else {
            unselect(id);
        }
    }

    render() {
        const { userName, userPhoneNumber, description, createdAt, selected } = this.props;

        return (
            <li className="b-filter__item no-option">
                <Checkbox onChange={this.handleSelect} checked={selected} />
                <a className="b-filter__star" />
                <span className="b-filter__date">{createdAt.toLocaleString()}</span>
                <div className="b-filter__first-name">{userName}</div>
                <div className="b-filter__phone">{userPhoneNumber}</div>
                <div className="b-filter__testimonial">
                    <div className="ellipsis">{description}</div>
                    <div className="b-fiter__testimonial-hover">{description}</div>
                </div>
            </li>
        );

    }

}

export default Item;