import React from 'react';
import { Link } from 'react-router';

const Sidebar = React.createClass({

    render() {

        return (
            <aside className="sidebar">
                <div className="logo"><img src="/images/logo.png" alt="logo" /></div>
                <ul className="aside-nav">
                    <li><Link to="/catalog" className="catalog" activeClassName="active">Каталог услуг</Link></li>
                    <li><Link to="/callback" className="callback" activeClassName="active">Обратные звонки</Link></li>
                    <li><Link to="/reviews" className="reviews" activeClassName="active">Отзывы</Link></li>
                </ul>
            </aside>
        );

    }

});

export default Sidebar;