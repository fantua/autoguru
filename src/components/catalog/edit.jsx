import React, { Component, PropTypes } from 'react';
import Api from '../../api';
import Form from './form';

class Edit extends Component {

    constructor(props) {
        super(props);

        this.edit = this.edit.bind(this);
    }

    static contextTypes = {
        router: PropTypes.object.isRequired
    };

    state = {
        object: null
    };

    edit(data) {
        Api.object.update(this.state.object, data).then((object) => {
            this.context.router.push('/catalog/' + object.get('type'));
        }, (error) => {
            alert(error.message);
        });
    }

    componentDidMount() {
        const { category } = this.props.params;

        Api.object.fetchFirstById(category).then((object) => {
            this.setState({object: object});
        });
    }

    render() {

        const getForm = () => {
            const { object } = this.state;

            if (object !== null)
                return <Form object={object} onSubmit={this.edit} />
        };

        return (
            <div className="b-filter__right">
                <div className="b-filter__option"></div>
                <div className="b-filter__content">
                    <div>
                        {getForm()}
                    </div>
                </div>
            </div>
        );
    }

}

export default Edit;