import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import Header from './library/blocks/header';
import Sidebar from './library/blocks/sidebar';

const App = (props) => {

    const addCatalogItemButton = () => {
        if (props.showAddCatalogItemButton) {
            return <Link to={`/catalog/new/${props.params.category}`} className="b-section__add" />;
        }
    };

    console.log('App - render');

    return (
        <div className="b-section">
            <Header category={props.params.category} />
            {addCatalogItemButton()}
            <main className="b-section__main">
                <section className="b-filter">
                    <div className="b-section__container">
                        <div className="b-filter__wrap">
                            <div className="b-filter__left">
                                <Sidebar />
                            </div>
                            {props.children}
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );

};

App.propTypes = {
    showAddCatalogItemButton: PropTypes.bool.isRequired
};

export default App;