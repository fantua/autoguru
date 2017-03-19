import React, { PropTypes } from 'react';

const Checkbox = (props) => {

    return (
        <div className="b-filter__check">
            <input type="checkbox" checked={props.checked} style={{display: 'none'}} />
            <label onClick={props.onChange} />
        </div>
    );

};

Checkbox.propTypes = {
    checked: PropTypes.bool.isRequired,
    onChange: PropTypes.func.isRequired
};

export default Checkbox;