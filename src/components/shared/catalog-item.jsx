import React from 'react';
import { Link } from 'react-router';
import { isAdmin } from '../../utils';

const CatalogItem = React.createClass({

    getInitialState() {
        return {
            hidden: this.props.data.get('hidden')
        };
    },

    onChange(e) {
        e.preventDefault();

        this.props.data.set('hidden', !this.state.hidden);
        this.props.data.save(null, {
            success: (item) => {
                if (this.isMounted()) this.setState({hidden: !this.state.hidden});
            },
            error: (item, error) => {
                console.log(error);
            }
        });
    },

    render() {

        const id = this.props.data.id;
        const name = this.props.data.get('name');
        const address = this.props.data.get('address');
        const date = this.props.data.get('expirationDate').toLocaleDateString();

        const extra = [];
        const helper = {
            catalog: () => {
                extra.push(<td key={extra.length} className="btn-holder"><a href="#" className="edit"></a></td>);
                if (isAdmin()) {
                    extra.push(
                        <td key={extra.length} className="btn-holder">
                            <label className="label-switch">
                                <input type="checkbox" checked={this.state.hidden} onChange={this.onChange} />
                                <div className="checkbox"></div>
                            </label>
                        </td>
                    );
                }
            },
            callback: () => {
                const id = this.props.data.get('user').id;

                extra.push(
                    <td key={extra.length} className="btn-holder">
                        <Link to={'/callback/view/' + id} className="button-default">Перейти</Link>
                    </td>
                );
            },
            reviews: () => {
                extra.push(
                    <td key={extra.length} className="btn-holder">
                        <Link to={'/reviews/view/' + id} className="button-default">Перейти</Link>
                    </td>
                );
            }
        }[this.props.route]();

        return (
            <tr>
                <td>{name}</td>
                <td>{address}</td>
                <td>до {date}</td>
                {extra}
            </tr>
        );

    }

});

export default CatalogItem;