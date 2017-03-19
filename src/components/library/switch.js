import React, { PropTypes } from 'react';
import classNames from 'classnames';

const Switch = (props) => {

    const switchClass = classNames({
        'b-filter__switch': true,
        'active': props.checked
    });

    return (
        <label className={switchClass}>
            <input type="checkbox" style={{display: 'none'}} onChange={props.onChange}/>
        </label>
    );

};

Switch.propTypes = {
    checked: PropTypes.bool.isRequired,
    onChange: PropTypes.func.isRequired
};

export default Switch;