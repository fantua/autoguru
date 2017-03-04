import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { clearData, fetchReviews } from '../../actions';
import List from '../../components/reviews/list';

const mapStateToProps = (state) => {
    const { routing, app: {data} } = state;

    return {
        routing,
        data
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return Object.assign(
        {
            fetch: () => {
                const id = ownProps.params.id;
                const { page } = ownProps.location.query;

                dispatch(fetchReviews(id, page));
            },
        },
        bindActionCreators({ clearData }, dispatch)
    );
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(List);