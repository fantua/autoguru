import React from 'react';
import Sidebar from './library/sidebar';
import Topbar from './library/topbar';
import Tabs from './library/tabs';

const App = React.createClass({

    render() {

        return (
            <div className="content">
                <Sidebar />

                <article className="main">
                    <Topbar />
                    <Tabs location={this.props.location} />
                    {this.props.children}
                </article>

            </div>
        );

    }

});

export default App;