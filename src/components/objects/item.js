import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import Checkbox from '../library/checkbox';
import Switch from '../library/switch';

class Item extends Component {

    constructor(props) {
        super(props);

        this.handleSelect = this.handleSelect.bind(this);
        this.handleHidden = this.handleHidden.bind(this);
    }

    static contextTypes = {
        router: React.PropTypes.object.isRequired
    };

    static propTypes = {
        id: PropTypes.string.isRequired,
        userId: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        address: PropTypes.string.isRequired,
        hidden: PropTypes.bool.isRequired,
        expirationDate: PropTypes.instanceOf(Date),
        createdAt: PropTypes.instanceOf(Date),
        selected: PropTypes.bool.isRequired,
        select: PropTypes.func.isRequired,
        unselect: PropTypes.func.isRequired,
        activate: PropTypes.func.isRequired,
        deactivate: PropTypes.func.isRequired
    };

    handleSelect(e) {
        const { id, selected, select, unselect } = this.props;

        if (!selected) {
            select(id);
        } else {
            unselect(id);
        }
    }

    handleHidden(e) {
        const { id, hidden, activate, deactivate } = this.props;

        if (hidden) {
            activate(id);
        } else {
            deactivate(id);
        }
    }

    render() {
        const { category } = this.context.router.params;
        const { id, userId, name, address, hidden, expirationDate, createdAt, selected } = this.props;

        return (
            <li className="b-filter__item">
                <Checkbox onChange={this.handleSelect} checked={selected} />
                <a className="b-filter__star" />
                <span className="b-filter__date">{createdAt.toLocaleDateString()}</span>
                <div className="b-filter__name">{name}</div>
                <div className="b-filter__address">{address}</div>
                <div className="b-filter__activity">до {expirationDate.toLocaleDateString()}</div>
                <Switch onChange={this.handleHidden} checked={hidden}/>
                <Link to={`/catalog/${category}/callbacks/${userId}`} className="b-filter__callbacks"/>
                <Link to={`/catalog/${category}/reviews/${id}`} className="b-filter__reviews"/>
                <Link to={`/catalog/edit/${id}`} className="b-filter__options"/>
            </li>
        );

    }

}

export default Item;