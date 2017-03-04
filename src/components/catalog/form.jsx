import React, { Component, PropTypes } from 'react';
import Parse from 'parse';
import Api from '../../api';
import Switch from '../library/elements/switch';
import { dateForInput } from '../../utils';

class Form extends Component {

    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleHidden = this.handleHidden.bind(this);
        this.handleAddPhoto = this.handleAddPhoto.bind(this);
        this.handleOptionsChange = this.handleOptionsChange.bind(this);

        const { object = null } = props;

        this.state = {
            editing: !!object,

            email: (object) ? object.get('user').get('email') : '',

            date: (object) ? dateForInput(object.get('expirationDate')) : '',
            name: (object) ? object.get('name') : '',
            address: (object) ? object.get('address') : '',
            description: (object) ? object.get('description') : '',
            schedule: (object) ? object.get('schedule') : '',
            latitude: (object) ? object.get('coordinates').latitude : '',
            longitude: (object) ? object.get('coordinates').longitude : '',
            phone: (object) ? object.get('contacts').split(', ')[0] : '',
            phone2: (object) ? object.get('contacts').split(', ')[1] : '',
            hidden: (object) ? object.get('hidden') : false,
            availability: (object) ? object.get('availability') : 0,
            photos: (object) ? object.get('photos') : [],
            options: (object) ? object.get('options') : 0,

            optionsList: {
                'wifi': 1<<1,
                'wc': 1<<2,
                'phone': 1<<3,
                'cafe': 1<<4,
                'atm': 1<<5,
                'parking': 1<<6,
                'charge': 1<<7
            }
        };

    }

    static propTypes = {
        category: PropTypes.number,
        onSubmit: PropTypes.func.isRequired,
        object: PropTypes.object
    };

    handleHidden() {
        this.setState({hidden: !this.state.hidden})
    }

    handleOptionsChange(e) {
        const option = this.state.optionsList[e.currentTarget.name];
        this.setState({options: this.state.options ^ option});
    }

    handleSubmit(e) {
        e.preventDefault();

        const user = {
            name: this.refs.email.value.trim(),
            username: this.refs.email.value.trim(),
            email: this.refs.email.value.trim(),
            password: this.refs.password.value.trim() || null
        };

        const object = {
            name: this.refs.name.value.trim(),
            hidden: this.state.hidden,
            contacts: (() => {
                let phone = this.refs.phone.value.trim();
                if (this.refs.phone2.value.trim()) phone += ', ' + this.refs.phone2.value.trim();
                return phone;
            })(),
            address: this.refs.address.value.trim(),
            coordinates: new Parse.GeoPoint({
                latitude: Number(this.refs.latitude.value.trim()),
                longitude: Number(this.refs.longitude.value.trim())
            }),
            description: this.refs.description.value.trim(),
            schedule: this.refs.schedule.value.trim(),
            options: this.state.options,
            availability: this.state.availability,
            photos: this.state.photos
        };

        if (Api.user.isAdmin()) {
            object.expirationDate = new Date(this.refs.date.value);
        }

        if (!this.state.editing) {
            object.type = this.props.category;
            object.visits = 0;
            object.callbacks = 0;
        }

        this.props.onSubmit({ user, object });
    }

    setAvailability(val) {
        this.setState({availability: Number(val)});
    }

    checkAvailability(val) {
        return val === this.state.availability;
    }

    getOptionsList() {
        const list = [];

        Object.keys(this.state.optionsList).forEach((option, i) => {

            const val = this.state.optionsList[option];
            const checked = !!(this.state.options & val);
            const id = 'service-' + i;
            const className = 'service ' + option;

            list.push([
                <input id={id} type="checkbox" name={option} checked={checked} onChange={this.handleOptionsChange} />,
                <label htmlFor={id} className={className} />
            ]);
        });

        return list;
    }

    handleAddPhoto (e) {
        if ((this.state.photos.length + this.refs.photos.files.length) > 10) {
            return alert('Превышен лимит фото (макс. 10)');
        }

        Object.keys(this.refs.photos.files).forEach((i) => {
            Api.file.load(this.refs.photos.files[i]).then((file) => {
                this.setState({photos: this.state.photos.concat([file])});
                this.refs.photos.value = '';
            }, (e) => {
                console.log(e);
            });
        });
    }

    deletePhoto(index) {
        this.setState({photos: this.state.photos.filter((_, i) => i !== index)});
    }

    render() {

        const photosList = this.state.photos.map((item, i) => (
            <div className="photo uploaded" key={i} style={{backgroundImage: `url(${item.url()})`}}>
                <a target="_blank" href={item.url()}><div className="zoom" /></a>
                <div className="remove" onClick={this.deletePhoto.bind(this, i)} />
            </div>
        ));

        return (
            <form onSubmit={this.handleSubmit}>
                <div className="form-wrapper">
                    {Api.user.isAdmin() &&
                        <div className="switcher">
                            <label className="input-label icon" style={{backgroundImage: "url('/i/ic_event_black_48dp_1x.png')"}}>
                                до <input ref="date" type="date" defaultValue={this.state.date} required />
                            </label>
                            <Switch onChange={this.handleHidden} checked={this.state.hidden} />
                        </div>
                    }
                    <div className="clearfix" />
                    <div className="input-wrapper">
                        <label className="input-label" htmlFor="name">
                            Введите название:
                        </label>
                        <input ref="name" id="name" type="text" placeholder="СТО Автосоюз" defaultValue={this.state.name} required />
                        <div className="clearfix" />
                    </div>
                    <div className="input-wrapper">
                        <label className="input-label icon" htmlFor="phone1" style={{backgroundImage: "url('/i/cellphone-android.png')"}}>
                            Номер телефона:
                        </label>
                        <input ref="phone" className="half" id="phone1" type="text" placeholder="+XX(XXX)XXXXXXX" defaultValue={this.state.phone} style={{marginRight: '5%'}} required />
                        <input ref="phone2" className="half" id="phone2" type="text" placeholder="+XX(XXX)XXXXXXX" defaultValue={this.state.phone2} />
                        <div className="clearfix" />
                    </div>
                    <hr className="separator" />
                    <div className="group__title">Геолокация</div>
                    <div className="input-wrapper">
                        <label className="input-label icon" htmlFor="address" style={{backgroundImage: "url('/i/ic_edit_location_black_48dp_1x.png')"}}>
                            Введите адресc:
                        </label>
                        <input ref="address" id="address" type="text" placeholder="ул. Пушкина, 37А" defaultValue={this.state.address} required />
                        <div className="clearfix" />
                    </div>
                    <div className="input-wrapper w50" style={{marginRight: '20px'}}>
                        <label className="input-label" htmlFor="lat">
                            Широта:
                        </label>
                        <input ref="latitude" max="90" min="-90" type="number" step="0.000001" id="lat" placeholder="50.00000000000" defaultValue={this.state.latitude} disabled={!Api.user.isAdmin()} required />
                    </div>
                    <div className="input-wrapper w50">
                        <label className="input-label" htmlFor="lon">
                            Долгота:
                        </label>
                        <input ref="longitude" max="180" min="-180" type="number" step="0.000001" id="lon" placeholder="50.00000000000" defaultValue={this.state.longitude} disabled={!Api.user.isAdmin()} required />
                        <div className="clearfix"></div>
                    </div>
                    <div className="clearfix" />
                    <hr className="separator" />
                    <div className="group__title">Прочее</div>
                    <div className="input-wrapper w50" style={{marginRight: '20px'}}>
                        <label className="input-label icon" htmlFor="time" style={{backgroundImage: "url('/i/ic_access_time_black_48dp_1x.png')"}}>
                            График:
                        </label>
                        <input ref="schedule" id="time" type="text" placeholder="00-24" defaultValue={this.state.schedule} required />
                        <div className="clearfix" />
                    </div>
                    <div className="button-wrapper">
                        <input id="status1" type="radio" name="status"
                               onChange={this.setAvailability.bind(this, 0)}
                               defaultChecked={this.checkAvailability(0)}
                               required />
                        <label htmlFor="status1" className="status green" style={{marginRight: '5px'}}>
                            Свободно
                        </label>
                        <input id="status2" type="radio" name="status"
                               onChange={this.setAvailability.bind(this, 1)}
                               defaultChecked={this.checkAvailability(1)} />
                        <label htmlFor="status2" className="status yellow" style={{marginRight: '5px'}}>
                            Освобождается
                        </label>
                        <input id="status3" type="radio" name="status"
                               onChange={this.setAvailability.bind(this, 2)}
                               defaultChecked={this.checkAvailability(2)} />
                        <label htmlFor="status3" className="status red">
                            Занято
                        </label>
                    </div>
                    <div className="clearfix" />
                    <div className="textarea-wrapper">
                        <label className="input-label" htmlFor="description">
                            Описание:
                        </label>
                        <textarea ref="description" id="description" placeholder="Введите Ваше описание" required defaultValue={this.state.description} />
                        <div className="clearfix" />
                    </div>
                    <div className="textarea-wrapper">
                        <label className="input-label" htmlFor="photo">
                            Фото:
                        </label>
                        <div className="clearfix /"></div>
                        <input ref="photos" type="file" accept="image/*" multiple onChange={this.handleAddPhoto} />
                        {photosList}
                        <div className="clearfix" />
                    </div>
                    <div className="clearfix" />
                    <hr className="separator" />
                    <div className="group__title">Дополнительные услуги</div>
                    <div className="services">
                        {this.getOptionsList()}
                        <div className="clearfix" />
                    </div>
                    <div className="input-wrapper w50" style={{marginRight: '20px'}}>
                        <label className="input-label icon" htmlFor="email" style={{backgroundImage: "url('/i/ic_mail_outline_black_48dp_1x.png')"}}>
                            Почта:
                        </label>
                        <input ref="email" id="email" type="email" placeholder="example@gmail.com" defaultValue={this.state.email} disabled={this.state.editing} required />
                        <div className="clearfix" />
                    </div>
                    {!Api.user.isAdmin() &&
                        <div className="input-wrapper w50">
                            <label className="input-label icon" htmlFor="pass" style={{backgroundImage: "url('/i/ic_lock_outline_black_48dp_1x.png')"}}>
                                Пароль:
                            </label>
                            <input ref="password" id="pass" type="password" placeholder="******" pattern=".{3,}" defaultValue={this.state.password} title="Введите минимум 3 символа" required={!this.state.editing} />
                            <div className="clearfix" />
                        </div>
                    }
                    <div className="clearfix" />
                    <button className="save">Сохранить</button>
                    <div className="clearfix" />
                </div>
            </form>
        );

    }

}

export default Form;