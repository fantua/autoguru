import { Component } from 'react';
import { getOffset } from '../../utils/pagination';

class BaseComponent extends Component {

    get start () {
        const { page, limit, count } = this.props;
        const offset = getOffset(page, limit);

        return (offset && offset < count) ? offset : 1;
    }

    get end () {
        const { count, page, limit } = this.props;
        const offset = getOffset(page, limit);
        const end = offset + limit;

        return (end < count) ? end : count;
    }

    get prev () {
        return this.props.page - 1 || 1;
    }

    get next () {
        const next = this.props.page + 1;
        return (next > this.last) ? this.last : next;
    }

    get first () {
        return 1;
    }

    get last () {
        return Math.ceil(this.props.count / this.props.limit) || 1;
    }

}

export default BaseComponent;
