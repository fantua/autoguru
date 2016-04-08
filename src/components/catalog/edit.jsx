import React from 'react';
import Parse from 'parse';
import { Link } from 'react-router';
import { browserHistory } from 'react-router';
import CatalogItemMixin from '../../mixins/catalog-item';
import { isAdmin, dateForInput } from '../../utils';

const Edit = React.createClass({

    mixins: [CatalogItemMixin],

    getInitialState() {
        return {
            images: [],
            object: null
        };
    },

    componentDidMount() {
        const id = this.props.params.id;
        const query = new Parse.Query(Parse.Object.extend('Object'));
        query.equalTo('objectId', id);
        query.include('user');
        query.first().then((object) => {
            this.setState({
                object: object,
                images: object.get('photos'),
                options: object.get('options')
            });
        });
    },

    handleSubmit(e) {
        e.preventDefault();

        const object = this.state.object;
        object.set('photos', this.state.images);
        object.set('name', this.refs.name.value.trim());
        object.set('contacts', (() => {
            let phone = this.refs.phone.value.trim();
            if (this.refs.phone2.value.trim()) phone += ', ' + this.refs.phone2.value.trim();
            return phone;
        })());
        object.set('address', this.refs.address.value.trim());
        object.set('coordinates', new Parse.GeoPoint({
            latitude: Number(this.refs.latitude.value.trim()),
            longitude: Number(this.refs.longitude.value.trim())
        }));
        object.set('description', this.refs.description.value.trim());
        object.set('options', this.state.options);
        if (isAdmin()) {
            object.set('expirationDate', new Date(this.refs.date.value));
            object.set('hidden', this.refs.hidden.checked);
        }
        object.save(null).then((object) => {
            /*
            const user = object.get('user');
            const email = this.refs.email.value.trim();
            const password = this.refs.password.value.trim();
            let edited = false;

            if (email != user.get('email')) {
                console.log('mail');
                user.set('username', email);
                user.set('email', email);
                edited = true;
            }

            if (password) {
                console.log('pass');
                user.set('password', this.refs.password.value.trim());
                edited = true;
            }

            if (edited) {
                console.log('user');
                user.save(null).then((user) => {
                    console.log('succ');
                    //browserHistory.push('/catalog/' + object.get('type'));
                }, (error) => {
                    alert(error.message);
                });

                return;
            }
            */

            browserHistory.push('/catalog/' + object.get('type'));
        }, (error) => {
            alert(error.message);
        });
    },

    render() {
        const obj = this.state.object;

        if (!obj) {
            return <div className="form-holder"></div>;
        }

        const infoBlock = () => {
            if (isAdmin()) return (
                <div className="info-block">
                    <span className="descr">Активен до:</span>
                    <span className="result"><input ref="date" type="date" defaultValue={dateForInput(obj.get('expirationDate'))} required /></span>
                    <span className="calendar" />
                    <label className="label-switch">
                        <input ref="hidden" type="checkbox" defaultChecked={!obj.get('hidden')} />
                        <div className="checkbox"></div>
                    </label>
                </div>
            );
        };

        return (
            <div className="form-holder">
                <form onSubmit={this.handleSubmit}>
                    <div className="title-block">
                        <div className="title">{obj.get('name')}</div>
                        {infoBlock()}
                    </div>
                    <div className="form-block">
                        <div className="form-row">
                            <div className="form-item name">
                                <label htmlFor="input-1" className="form-title">Введите название</label>
                                <input ref="name" type="text" id="input-1" className="form-input" defaultValue={obj.get('name')} required />
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-item address">
                                <label htmlFor="input-2" className="form-title">Введите адрес</label>
                                <input ref="address" type="text" id="input-2" className="form-input" defaultValue={obj.get('address')} required />
                            </div>
                            <div className="form-item phone-1">
                                <label htmlFor="input-3" className="form-title">Номер телфона 1</label>
                                <input ref="phone" type="text" id="input-3" className="form-input" defaultValue={obj.get('contacts').split(', ')[0]} required />
                            </div>
                            <div className="form-item phone-2">
                                <label htmlFor="input-4" className="form-title">Номер телфона 2</label>
                                <input ref="phone2" type="text" id="input-4" className="form-input" defaultValue={obj.get('contacts').split(', ')[1]} />
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-title">Координаты геолокации</div>
                            <div className="form-item location-1">
                                <label htmlFor="input-3" className="form-title-sm">Широта:</label>
                                <input ref="latitude" max="90" min="-90" type="number" step="0.000001" id="input-5" className="form-input" defaultValue={obj.get('coordinates').latitude} required />
                            </div>
                            <div className="form-item location-2">
                                <label htmlFor="input-3" className="form-title-sm">Долгота:</label>
                                <input ref="longitude" max="180" min="-180" type="number" step="0.000001" id="input-6" className="form-input" defaultValue={obj.get('coordinates').longitude} required />
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-title">Дополнительные услуги</div>
                            {this.getOptionsList()}
                        </div>
                        <div className="form-row description-obj">
                            <div className="form-title">Описание объекта</div>
                            <textarea ref="description" className="input-description" defaultValue={obj.get('description')} required />
                            <div className="add-photo-block">
                                <div className="form-title">Фотографии объекта</div>
                                <input ref="images" type="file" className="button-default add" accept="image/*" multiple onChange={this.handleFileAdd} />
                                <span className="result-number">{this.state.images.length}/10</span>
                                <div className="preview-block">
                                    {this.getImages()}
                                </div>
                            </div>
                        </div>
                        <div className="all-result">
                            <div className="visits">{obj.get('visits')} посещений точки</div>
                            <div className="callback">{obj.get('callbacks')} обратных звонков</div>
                        </div>
                        <div className="btn-holder">
                            <button type="submit" className="button-default">Сохранить</button>
                        </div>
                    </div>
                </form>
            </div>
        );

    }

});

export default Edit;