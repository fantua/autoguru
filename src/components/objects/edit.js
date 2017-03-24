import React, { Component, PropTypes } from 'react';
import Tabs from '../blocks/tabs';
import Form from '../../containers/objects/form';

class Edit extends Component {

    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    static propTypes = {
        id: PropTypes.string.isRequired,
        object: PropTypes.object,
        fetch: PropTypes.func.isRequired
    };

    componentDidMount() {
        const { id, fetch } = this.props;

        fetch(id);
    }

    handleSubmit(data, category) {
        const { id, edit } = this.props;

        edit(id, data, category);
    }

    renderForm() {
        const { object } = this.props;

        if (object) {
            return <Form object={object} onSubmit={this.handleSubmit} />
        }

        return null;
    }

    render() {
        return (
            <div className="b-filter__right">
                <div className="b-filter__option"/>
                <div className="b-filter__content">
                    <div className="b-section__tab js-tabWrap">
                        <Tabs />
                        <div className="b-section__tabcontent-wrap">
                            <div className="b-section__tabcontent-item active">
                                {this.renderForm()}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );

    }

}

export default Edit;