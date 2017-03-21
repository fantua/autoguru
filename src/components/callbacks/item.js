import React, { PropTypes } from 'react';

const Item = ({ name, carModel, carNumber, phoneNumber, createdAt }) => {

    return (
        <li className="b-filter__item no-option">
            <span className="b-filter__date">{createdAt.toLocaleString()}</span>
            <div className="b-filter__first-name">{name}</div>
            <div className="b-filter__phone">{phoneNumber}</div>
            <div className="b-filter__car">{carModel}</div>
            <div className="b-filter__gov-number">{carNumber}</div>
        </li>
    );

};

Item.propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    carModel: PropTypes.string.isRequired,
    carNumber: PropTypes.string.isRequired,
    phoneNumber: PropTypes.string.isRequired,
    createdAt: PropTypes.instanceOf(Date)
};

export default Item;