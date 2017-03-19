import React from 'react';
import { Link } from 'react-router';

const Sidebar = (props) => {

    return (
        <div className="b-filter__menu">
            <Link to="/catalog" className="b-filter__logo">
                <img src={process.env.PUBLIC_URL + '/i/logo.png'} alt="logo" />
            </Link>
        </div>
    );


};

export default Sidebar;