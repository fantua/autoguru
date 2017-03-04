import React from 'react';
import { Link } from 'react-router';

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
        // this.setState({interval: setInterval(() => {
        //     this.fetchCallback();
        //     this.fetchReviews();
        // }, 5000)});
    },

    componentWillUnmount() {
        // clearInterval(this.state.interval);
    },

    componentWillReceiveProps (nextProps) {
        // if (nextProps.location.pathname == '/reviews' && this.state.reviewsCount > this.state.reviewsShowCount) {
        //     this.setState({reviewsShowCount: this.state.reviewsCount});
        // } else if (nextProps.location.pathname == '/callback' && this.state.callbackCount > this.state.callbackShowCount) {
        //     this.setState({callbackShowCount: this.state.callbackCount});
        // }
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
            <div className="b-filter__menu">
                <ul className="b-filter__menu-list">
                    <li className="b-filter__menu-item">
                        <Link to="/catalog" className="b-filter__menu-link -icon1" activeClassName="active">
                            <span className="b-filter__menu-text">Категории услуг</span>
                        </Link>
                    </li>
                    <li className="b-filter__menu-item">
                        <Link to="/callback" className="b-filter__menu-link -icon2" activeClassName="active">
                            <span className="b-filter__menu-text">Обратный звонок</span>
                            {/*<span className="b-filter__menu-numOf">23</span>*/}
                        </Link>
                    </li>
                    <li className="b-filter__menu-item">
                        <Link to="/reviews" className="b-filter__menu-link -icon3" activeClassName="active">
                            <span className="b-filter__menu-text">Отзывы</span>
                            {/*<span className="b-filter__menu-numOf">23</span>*/}
                        </Link>
                    </li>
                </ul>
                <Link to="/catalog" className="b-filter__logo">
                    <img src="/i/logo.png" alt="" />
                </Link>
            </div>
        );

    }

});

export default Sidebar;