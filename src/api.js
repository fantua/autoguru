import Parse from 'parse';

const Api = function () {

    Parse.initialize('w7DLv4hcHT9Hg8VJ23URtZsmnTzOwVIsTQPJXO4j', 'f6CT7PkXFsSmjRkpw41FlAp15nEZqs1j1SDpF8YZ');
    Parse.serverURL = 'https://parseapi.back4app.com';

    this.paginate = {

        page: 1,
        limit: 20,
        skip: 0,
        count: 0,

        do (count, page) {
            this.count = Number(count);
            this.page = (page) ? Number(page) : 1;

            var skip = this.limit * (this.page - 1);
            if (skip > count) {
                skip = this.count - (this.count % this.limit);
            }

            this.skip = skip;
        },

        get () {
            return {
                start: this.getStart(),
                end: this.getEnd(),
                count: this.getCount(),
                prev: this.getPrev(),
                next: this.getNext(),
                first: this.getFirst(),
                last: this.getLast()
            };
        },

        getStart () {
            return this.skip || 1;
        },

        getEnd () {
            const end = this.skip + this.limit;

            return (end < this.count) ? end : this.count;
        },

        getCount () {
            return this.count;
        },

        getPrev () {
            const prev = this.page - 1 || 1;

            return (prev) ? prev : 1;
        },

        getNext () {
            const next = this.page + 1;

            return (next > this.getLast()) ? this.page : next;
        },

        getFirst () {
            return 1;
        },

        getLast () {
            const last = Math.ceil(this.count / this.limit) || 1;

            return last;
        }

    };

    this.user = {

        get(property = null) {
            if (property == null) {
                return Parse.User.current();
            }

            return Parse.User.current().get(property);
        },

        login(login, password) {
            return Parse.User.logIn(login, password);
        },

        logout() {
            return Parse.User.logOut();
        },

        resetPassword(email) {
            return Parse.User.requestPasswordReset(email);
        },

        changePassword(password) {
            const user = this.get();

            user.setPassword(password);

            return user.save();
        },

        isAdmin() {
            return Parse.User.current().get('role') == 2;
        },

        isLoggedIn() {
            return !!Parse.User.current();
        }

    };

    this.object = {

        fetch: (categoryId, page) => {
            const query = new Parse.Query(Parse.Object.extend('Object'));

            query.equalTo('type', categoryId);
            query.addDescending('createdAt');

            if (!this.user.isAdmin()) {
                query.equalTo('user', this.user.get());
            }

            return fetch(query, page);
        },

        fetchFirstById: (id) => {
            const query = new Parse.Query(Parse.Object.extend('Object'));

            query.equalTo('objectId', id);
            query.include('user');

            return query.first();
        },

        search: (categoryId, search, page) => {
            const query = new Parse.Query(Parse.Object.extend('Object'));

            query.equalTo('type', categoryId);
            query.addDescending('createdAt');
            query.matches('canonicalName', `.*${search.toLowerCase()}*.`);

            if (!this.user.isAdmin()) {
                query.equalTo('user', this.user.get());
            }

            return fetch(query, page);
        },

        create: (data) => {
            const user = new Parse.User();

            return Promise.resolve(user.save(data.user).then((user) => {
                const ParseObject = Parse.Object.extend('Object');
                const object = new ParseObject();

                data.object.user = user;

                return object.save(data.object);
            }));
        },

        update: (object, data) => {
            const { object: objectData, user } = data;

            if (!this.user.isAdmin()) {
                delete data.object.coordinates;
                delete data.object.expirationDate;
                delete data.object.hidden;
            }

            if (user.password) {
                object.get('user').setPassword(user.password);
            }

            return object.save(objectData);
        },

        getUserCategory: () => {
            const query = new Parse.Query(Parse.Object.extend('Object'));

            query.equalTo('user', this.user.get());

            return Promise.resolve(
                query.first().then((object) => object.get('type'))
            );
        }

    };

    this.callback = {
        fetch: (id, page) => {
            const user = new Parse.User();
            user.id = String(id);

            const query = new Parse.Query(Parse.Object.extend('Callback'));
            query.equalTo('owner', user);
            query.descending('createdAt');

            return fetch(query, page);
        }
    };

    this.reviews = {

        fetch: (id, page) => {

            const query = new Parse.Query(Parse.Object.extend('Review'));

            query.equalTo('reviewObjectId', id);
            query.equalTo('isAnswer', false);
            query.include('user');
            query.include('answerObject');
            query.include('reviewObject');
            query.descending('createdAt');
            if (this.user.isAdmin()) {
                // query.equalTo('state', 1);
            }

            return fetch(query, page);
        },

    };

    this.file = {

        load: (file) => {
            const parseFile = new Parse.File(file.size, file);

            return parseFile.save();
        }

    };

    const fetch = (query, page) => {
        return Promise.resolve(
            query.count().then((count) => {
                this.paginate.do(count, page);

                query.skip(this.paginate.skip);
                query.limit(this.paginate.limit);

                return Promise.resolve(query.find().then((data) => {
                    return {
                        pagination: this.paginate.get(),
                        data
                    };
                }));
            })
        );
    };

};

export default new Api();