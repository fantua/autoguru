import React from 'react';
import Header from '../containers/blocks/header';
import Sidebar from './blocks/sidebar';
import '../styles/library.css';
import '../styles/main.css';

const App = (props) => {

    // return <Link to={`/catalog/new/${props.params.category}`} className="b-section__add" />;

    return (
        <div className="b-section">
            <Header />
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

export default App;