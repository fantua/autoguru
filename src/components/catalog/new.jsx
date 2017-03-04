import React, { Component, PropTypes } from 'react';
import Api from '../../api';
import Form from './form';

class  New extends Component {

    constructor(props) {
        super(props);

        this.create = this.create.bind(this);
    }

    static contextTypes = {
        router: PropTypes.object.isRequired
    };

    create(data) {
        Api.object.create(data).then(() => {
            this.context.router.push('/catalog/' + this.props.params.category);
        }, (error) => {
            alert(error.message);
        })
    }

    render() {

        const category = Number(this.props.params.category);
        
        return (
            <div className="b-filter__right">
                <div className="b-filter__option"></div>
                <div className="b-filter__content">
                    <div>
                        <Form category={category} onSubmit={this.create} />
                    </div>
                </div>
            </div>
        );
    }

}

export default New;