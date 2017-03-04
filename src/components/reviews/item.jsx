import React, { Component, PropTypes } from 'react';
import Checkbox from '../library/elements/checkbox';

class Item extends Component {

    constructor(props) {
        super(props);

        this.handleSelect = this.handleSelect.bind(this);
        this.handleHidden = this.handleHidden.bind(this);
    }

    static propTypes = {
        toggleObjectSelect: PropTypes.func.isRequired,
        toggleObjectHidden: PropTypes.func.isRequired,
        data: PropTypes.shape({
            id: PropTypes.string.isRequired,
            model: PropTypes.object.isRequired,
            selected: PropTypes.bool.isRequired
        }).isRequired
    };

    handleSelect() {
        const { data: { id }, toggleObjectSelect } = this.props;
        toggleObjectSelect(id);
    }

    handleHidden(e) {
        e.preventDefault();
        const { data: { id }, toggleObjectHidden } = this.props;
        toggleObjectHidden(id);
    }

    render() {
        const { data: { id, selected, model } } = this.props;

        console.log('Review Item [' + id + '] - render');

        return (
            <li className="b-filter__item no-option">
                <Checkbox onChange={this.handleSelect} checked={selected} />
                <a href="#" className="b-filter__star" />
                <span className="b-filter__date">{model.get('createdAt').toLocaleString()}</span>
                <div className="b-filter__first-name">{model.get('user').get('name')}</div>
                <div className="b-filter__phone">{model.get('user').get('phoneNumber')}</div>
                <div className="b-filter__testimonial">
                    <div className="ellipsis">{model.get('description')}</div>
                    <div className="b-fiter__testimonial-hover">{model.get('description')}</div>
                </div>
            </li>
        );

    }

}

export default Item;