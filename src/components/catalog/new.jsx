import React from 'react';
import Parse from 'parse';
import { Link } from 'react-router';
import { browserHistory } from 'react-router';
import CatalogItemMixin from '../../mixins/catalog-item';

const New = React.createClass({

    mixins: [CatalogItemMixin],

    getInitialState() {
        return {
            images: []
        };
    },

    handleSubmit(e) {
        e.preventDefault();

        const user = new Parse.User();
        user.set('name', this.refs.email.value.trim());
        user.set('username', this.refs.email.value.trim());
        user.set('email', this.refs.email.value.trim());
        user.set('password', this.refs.password.value.trim());
        user.save(null).then((user) => {
            const Object = Parse.Object.extend('Object');
            const object = new Object();
            object.set('photos', this.state.images);
            object.set('name', this.refs.name.value.trim());
            object.set('hidden', this.refs.hidden.checked);
            object.set('user', user);
            object.set('contacts', (() => {
                let phone = this.refs.phone.value.trim();
                if (this.refs.phone2.value.trim()) phone += ', ' + this.refs.phone2.value.trim();
                return phone;
            })());
            object.set('address', this.refs.address.value.trim());
            object.set('type', Number(this.props.params.category));
            object.set('coordinates', new Parse.GeoPoint({
                latitude: Number(this.refs.latitude.value.trim()),
                longitude: Number(this.refs.longitude.value.trim())
            }));
            object.set('description', this.refs.description.value.trim());
            object.set('schedule', this.refs.schedule.value.trim());
            object.set('expirationDate', new Date(this.refs.date.value));
            object.set('options', this.state.options);
            object.set('availability', this.state.availability);
            object.set('visits', 0);
            object.set('callbacks', 0);

            return object.save(null);
        }).then(() => {
            browserHistory.push('/catalog/' + this.props.params.category);
        }, (error) => {
            alert(error.message);
        });

    },

    render() {

        return (
            <div className="form-holder">
                <form onSubmit={this.handleSubmit}>
                    <div className="title-block">
                        <div className="title"></div>
                        <div className="info-block">
                            <span className="descr">Активен до:</span>
                            <span className="result"><input ref="date" type="date" required /></span>
                            <span className="calendar" />
                            <label className="label-switch">
                                <input ref="hidden" type="checkbox" />
                                <div className="checkbox"></div>
                            </label>
                        </div>
                    </div>
                    <div className="form-block">
                        {this.getAvailability()}
                        <div className="form-row">
                            <div className="form-item name">
                                <label htmlFor="input-1" className="form-title">Введите название</label>
                                <input ref="name" type="text" id="input-1" className="form-input" required />
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-item address">
                                <label htmlFor="input-2" className="form-title">Введите адрес</label>
                                <input ref="address" type="text" id="input-2" className="form-input" required />
                            </div>
                            <div className="form-item phone-1">
                                <label htmlFor="input-3" className="form-title">Номер телфона 1</label>
                                <input ref="phone" type="text" id="input-3" className="form-input" required />
                            </div>
                            <div className="form-item phone-2">
                                <label htmlFor="input-4" className="form-title">Номер телфона 2</label>
                                <input ref="phone2" type="text" id="input-4" className="form-input" />
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-title">Координаты геолокации</div>
                            <div className="form-item location-1">
                                <label htmlFor="input-3" className="form-title-sm">Широта:</label>
                                <input ref="latitude" max="90" min="-90" type="number" step="0.000001" id="input-5" className="form-input" required />
                            </div>
                            <div className="form-item location-2">
                                <label htmlFor="input-3" className="form-title-sm">Долгота:</label>
                                <input ref="longitude" max="180" min="-180" type="number" step="0.000001" id="input-6" className="form-input" required />
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-title">Дополнительные услуги</div>
                            {this.getOptionsList()}
                        </div>
                        <div className="form-row description-obj">
                            <div className="wrapp">
                                <div className="col-left">
                                    <div className="form-title">Описание объекта</div>
                                    <textarea ref="description" className="input-description" required />
                                </div>
                                <div className="form-item col-right">
                                    <div className="form-title">График работы</div>
                                    <input ref="schedule" type="text" id="input-25" className="form-input" required />
                                </div>
                            </div>
                            <div className="add-photo-block">
                                <div className="form-title">Фотографии объекта</div>
                                <input ref="images" type="file" className="button-default add" accept="image/*" multiple onChange={this.handleFileAdd} />
                                <span className="result-number">{this.state.images.length}/10</span>
                                <div className="preview-block">
                                    {this.getImages()}
                                </div>
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-title">Логин и пароль объекта</div>
                            <div className="form-item login">
                                <label htmlFor="input-8" className="form-title-sm">Логин(почта):</label>
                                <input ref="email" type="email" id="input-8" className="form-input" required />
                            </div>
                            <div className="form-item pass">
                                <label htmlFor="input-9" className="form-title-sm">Пароль:</label>
                                <input ref="password" type="password" id="input-9" className="form-input" pattern=".{3,}" title="Введите минимум 3 символа" required />
                            </div>
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

export default New;