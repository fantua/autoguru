import React, { Component, PropTypes } from 'react';
import Tabs from '../blocks/tabs';
import Form from '../../containers/objects/form';

class Create extends Component {

    static propTypes = {
        create: PropTypes.func.isRequired
    };

    render() {
        const { create } = this.props;

        return (
            <div className="b-filter__right">
                <div className="b-filter__option"/>
                <div className="b-filter__content">
                    <div className="b-section__tab js-tabWrap">
                        <Tabs />
                        <div className="b-section__tabcontent-wrap">
                            <div className="b-section__tabcontent-item active">
                                <Form onSubmit={create} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );

    }

}

export default Create;