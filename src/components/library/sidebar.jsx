import React from 'react';
import Parse from 'parse';
import { Link } from 'react-router';
import { isAdmin } from '../../utils';

const Sidebar = React.createClass({

    getInitialState() {
        return {
            callbackCount: 0,
            reviewsCount: 0,
            callbackShowCount: null,
            reviewsShowCount: null,
            interval: null
        };
    },

    fetchCallback() {
        const callback = new Parse.Query(Parse.Object.extend('Callback'));
        if (!isAdmin()) {
            callback.equalTo('owner', Parse.User.current());
        }
        callback.count().then((count) => {
            this.setState({
                callbackCount: count,
                callbackShowCount: (
                this.state.callbackShowCount == null || this.state.callbackShowCount > count
                ) ? count : this.state.callbackShowCount
            });
            if (this.state.callbackShowCount == null) {
                this.setState({callbackShowCount: count});
            }
        });
    },

    fetchReviews() {
        if (isAdmin()) {
            const reviews = new Parse.Query(Parse.Object.extend('Review'));
            reviews.equalTo('state', 1);
            reviews.count().then((count) => {
                this.setState({
                    reviewsCount: count,
                    reviewsShowCount: (
                    this.state.reviewsShowCount == null || this.state.reviewsShowCount > count
                    ) ? count : this.state.reviewsShowCount
                });
            });
        } else {
            const query = new Parse.Query(Parse.Object.extend('Object'));
            query.equalTo('user', Parse.User.current());
            query.first().then((object) => {
                const reviews = new Parse.Query(Parse.Object.extend('Review'));
                reviews.equalTo('reviewObjectId', object.id);
                reviews.count().then((count) => {
                    this.setState({
                        reviewsCount: count,
                        reviewsShowCount: (
                        this.state.reviewsShowCount == null || this.state.reviewsShowCount > count
                        ) ? count : this.state.reviewsShowCount
                    });
                });
            });
        }

    },

    componentDidMount() {
        this.setState({interval: setInterval(() => {
            this.fetchCallback();
            this.fetchReviews();
        }, 5000)});
    },

    componentWillUnmount() {
        clearInterval(this.state.interval);
    },

    componentWillReceiveProps (nextProps) {
        if (nextProps.location.pathname == '/reviews' && this.state.reviewsCount > this.state.reviewsShowCount) {
            this.setState({reviewsShowCount: this.state.reviewsCount});
        } else if (nextProps.location.pathname == '/callback' && this.state.callbackCount > this.state.callbackShowCount) {
            this.setState({callbackShowCount: this.state.callbackCount});
        }
    },

    render() {

        const getCallback = () => {
            if (this.state.callbackCount > this.state.callbackShowCount) {
                const count = this.state.callbackCount - this.state.callbackShowCount;
                return <span className="red-label">{count}</span>;
            }
        };

        const getReviews = () => {
            if (this.state.reviewsCount > this.state.reviewsShowCount) {
                const count = this.state.reviewsCount - this.state.reviewsShowCount;
                return <span className="red-label">{count}</span>;
            }
        };

        return (
            <aside className="sidebar">
                <div className="logo"><img src="/images/logo.png" alt="logo" /></div>
                <ul className="aside-nav">
                    <li><Link to="/catalog" className="catalog" activeClassName="active">Каталог услуг</Link></li>
                    <li><Link to="/callback" className="callback" activeClassName="active">Обратные звонки {getCallback()}</Link></li>
                    <li><Link to="/reviews" className="reviews" activeClassName="active">Отзывы {getReviews()}</Link></li>
                </ul>
            </aside>
        );

    }

});

export default Sidebar;