import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import Api from '../../api';
import Checkbox from '../library/elements/checkbox';
import Switch from '../library/elements/switch';

class CatalogItem extends Component {

    constructor(props) {
        super(props);

        this.handleSelect = this.handleSelect.bind(this);
        this.handleHidden = this.handleHidden.bind(this);
    }

    static contextTypes = {
        router: React.PropTypes.object.isRequired
    };

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
        const { router } = this.context;

        const rows = [];

        if (router.isActive('catalog')) {
            if (Api.user.isAdmin()) {
                rows.push(<Switch key={rows.length} onChange={this.handleHidden} checked={model.get('hidden')}/>);
            }
            rows.push(<Link key={rows.length} to={'/catalog/edit/' + id} className="b-filter__options"/>);
        } else if (router.isActive('callback')) {
            rows.push(<Link key={rows.length} to={'/callback/view/' + model.get('user').id} className="b-filter__eye" />);
        } else if (router.isActive('reviews')) {
            rows.push(<Link key={rows.length} to={'/reviews/view/' + id} className="b-filter__eye" />);
        }

        console.log('Catalog Item [' + id + '] - render');

        return (
            <li className="b-filter__item">
                <Checkbox onChange={this.handleSelect} checked={selected} />
                <a href="#" className="b-filter__star" />
                <span className="b-filter__date">{model.get('createdAt').toLocaleDateString()}</span>
                <div className="b-filter__name">{model.get('name')}</div>
                <div className="b-filter__address">{model.get('address')}</div>
                <div className="b-filter__activity">до {model.get('expirationDate').toLocaleDateString()}</div>
                {rows}
            </li>
        );

    }

}

export default CatalogItem;