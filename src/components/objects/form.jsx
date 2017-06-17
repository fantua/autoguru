import React, { Component, PropTypes } from 'react';
import Parse from 'parse';
import classNames from 'classnames';
import Switch from '../library/switch';
import { formatForInput } from '../../utils/date';
import User from '../../utils/user';

class Form extends Component {

    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleHidden = this.handleHidden.bind(this);
        this.handleAddPhoto = this.handleAddPhoto.bind(this);
        this.handleOptionsChange = this.handleOptionsChange.bind(this);

        const { object } = props;

        this.state = {
            editing: !!object,
            isAdmin: User.isAdmin(),

            password: '',
            email: (object) ? object.get('user').get('email') : '',
            date: (object) ? formatForInput(object.get('expirationDate')) : '',
            name: (object) ? object.get('name') : '',
            address: (object) ? object.get('address') : '',
            description: (object) ? object.get('description') : '',
            schedule: (object) ? object.get('schedule') : '',
            latitude: (object) ? object.get('coordinates').latitude : '',
            longitude: (object) ? object.get('coordinates').longitude : '',
            phone: (object) ? object.get('contacts').split(', ')[0] : '',
            phone2: (object) ? (object.get('contacts').split(', ')[1] || '') : '',
            hidden: (object) ? object.get('hidden') : false,
            availability: (object) ? object.get('availability') : 0,
            photos: (object) ? object.get('photos') : [],
            options: (object) ? object.get('options') : 0,
        };

    }

    static propTypes = {
        onSubmit: PropTypes.func.isRequired,
        uploadFile: PropTypes.func.isRequired,
        object: PropTypes.object
    };

    static contextTypes = {
        router: React.PropTypes.object.isRequired
    };

    optionsList = {
        'wifi': 1<<1,
        'wc': 1<<2,
        'phone': 1<<3,
        'cafe': 1<<4,
        'atm': 1<<5,
        'parking': 1<<6,
        'charge': 1<<7
    };

    handleHidden() {
        this.setState({hidden: !this.state.hidden});
    }

    handleOptionsChange(e) {
        const option = this.optionsList[e.currentTarget.name];

        this.setState({options: this.state.options ^ option});
    }

    handleSubmit(e) {
        e.preventDefault();

        const {
            editing, isAdmin,
            email, password,
            name, hidden, phone, phone2, address, latitude, longitude, description, schedule, options, availability, photos, date
        } = this.state;
        const category = Number(this.context.router.params.category);

        const user = {
            name: email.trim(),
            username: email.trim(),
            email: email.trim(),
            password: password || null,
            role: 1
        };

        const object = {
            hidden,
            name: name.trim(),
            contacts: phone.concat(phone2 ? `, ${phone2}` : ''),
            address: address.trim(),
            coordinates: new Parse.GeoPoint({
                latitude: Number(latitude),
                longitude: Number(longitude)
            }),
            description: description.trim(),
            schedule: schedule.trim(),
            options,
            availability,
            photos
        };

        if (isAdmin) {
            object.expirationDate = new Date(date);
        }

        if (!editing) {
            object.type = category;
            object.visits = 0;
            object.callbacks = 0;
        }

        this.props.onSubmit({ user, object }, category);
    }

    handleChange({ target: { id, value } }) {
        this.setState({ [id]: value });
    }

    setAvailability(val) {
        return () => { this.setState({availability: Number(val)}); };
    }

    checkAvailability(val) {
        return val === this.state.availability;
    }

    handleAddPhoto ({ target, target: { files } }) {
        if ((this.state.photos.length + this.refs.photos.files.length) > 10) {
            return alert('Превышен лимит фото (макс. 10)');
        }

        Object.keys(files).forEach((i) => {
            this.props.uploadFile(files[i])
                .then(file => {
                    this.setState({photos: this.state.photos.concat([ file ])});
                    target.value = '';
                })
                .catch(e => { console.log(e); });
        });
    }

    deletePhoto(index) {
        this.setState({photos: this.state.photos.filter((_, i) => i !== index)});
    }

    renderPhotos() {
        return this.state.photos.map((item, i) => (
            <div className="photo uploaded" key={i} style={{backgroundImage: `url(${item.url()})`}}>
                <a href={item.url()} target="_blank"><div className="zoom" /></a>
                <div className="remove" onClick={this.deletePhoto.bind(this, i)} />
            </div>
        ));
    }

    renderOptionsList() {
        return Object.keys(this.optionsList).map((key) => {
            const id = `service-${key}`;
            const checked = !!(this.state.options & this.optionsList[key]);

            return (
                <div key={key}>
                    <input id={id} type="checkbox" name={key} checked={checked} onChange={this.handleOptionsChange} />
                    <label htmlFor={id} className={classNames('service', key)} />
                </div>
            );
        });
    }

    render() {
        const { editing, isAdmin } = this.state;

        return (
            <form onSubmit={this.handleSubmit}>
                <div className="form-wrapper">
                    {isAdmin &&
                        <div className="switcher">
                            <label className="input-label icon" style={{backgroundImage: "url('/i/ic_event_black_48dp_1x.png')"}}>
                                до <input id="date" type="date" value={this.state.date} onChange={this.handleChange} required />
                            </label>
                            <Switch onChange={this.handleHidden} checked={this.state.hidden} />
                        </div>
                    }
                    <div className="clearfix" />
                    <div className="input-wrapper">
                        <label className="input-label" htmlFor="name">
                            Введите название:
                        </label>
                        <input id="name" type="text" placeholder="СТО Автосоюз" value={this.state.name} onChange={this.handleChange} required />
                        <div className="clearfix" />
                    </div>
                    <div className="input-wrapper">
                        <label className="input-label icon" htmlFor="phone" style={{backgroundImage: "url('/i/cellphone-android.png')"}}>
                            Номер телефона:
                        </label>
                        <input className="half" id="phone" type="text" value={this.state.phone} onChange={this.handleChange} placeholder="+XX(XXX)XXXXXXX" style={{marginRight: '5%'}} required />
                        <input className="half" id="phone2" type="text" value={this.state.phone2} onChange={this.handleChange} placeholder="+XX(XXX)XXXXXXX" />
                        <div className="clearfix" />
                    </div>
                    <hr className="separator" />
                    <div className="group__title">Геолокация</div>
                    <div className="input-wrapper">
                        <label className="input-label icon" htmlFor="address" style={{backgroundImage: "url('/i/ic_edit_location_black_48dp_1x.png')"}}>
                            Введите адресc:
                        </label>
                        <input id="address" type="text" placeholder="ул. Пушкина, 37А" value={this.state.address} onChange={this.handleChange} required />
                        <div className="clearfix" />
                    </div>
                    <div className="input-wrapper w50" style={{marginRight: '20px'}}>
                        <label className="input-label" htmlFor="latitude">
                            Широта:
                        </label>
                        <input max="90" min="-90" type="number" step="0.000001" id="latitude" placeholder="50.00000000000" value={this.state.latitude} onChange={this.handleChange} disabled={!isAdmin} required />
                    </div>
                    <div className="input-wrapper w50">
                        <label className="input-label" htmlFor="longitude">
                            Долгота:
                        </label>
                        <input max="180" min="-180" type="number" step="0.000001" id="longitude" placeholder="50.00000000000" value={this.state.longitude} onChange={this.handleChange} disabled={!isAdmin} required />
                        <div className="clearfix"></div>
                    </div>
                    <div className="clearfix" />
                    <hr className="separator" />
                    <div className="group__title">Прочее</div>
                    <div className="input-wrapper w50" style={{marginRight: '20px'}}>
                        <label className="input-label icon" htmlFor="schedule" style={{backgroundImage: "url('/i/ic_access_time_black_48dp_1x.png')"}}>
                            График:
                        </label>
                        <input id="schedule" type="text" placeholder="00-24" value={this.state.schedule} onChange={this.handleChange} required />
                        <div className="clearfix" />
                    </div>
                    <div className="button-wrapper">
                        <input id="status1" type="radio" name="status"
                               onChange={this.setAvailability(0)}
                               checked={this.checkAvailability(0)}
                               required />
                        <label htmlFor="status1" className="status green" style={{marginRight: '5px'}}>
                            Свободно
                        </label>
                        <input id="status2" type="radio" name="status"
                               onChange={this.setAvailability(1)}
                               checked={this.checkAvailability(1)} />
                        <label htmlFor="status2" className="status yellow" style={{marginRight: '5px'}}>
                            Освобождается
                        </label>
                        <input id="status3" type="radio" name="status"
                               onChange={this.setAvailability(2)}
                               checked={this.checkAvailability(2)} />
                        <label htmlFor="status3" className="status red">
                            Занято
                        </label>
                    </div>
                    <div className="clearfix" />
                    <div className="textarea-wrapper">
                        <label className="input-label" htmlFor="description">
                            Описание:
                        </label>
                        <textarea id="description" placeholder="Введите Ваше описание" value={this.state.description} onChange={this.handleChange} required />
                        <div className="clearfix" />
                    </div>
                    <div className="textarea-wrapper">
                        <label className="input-label" htmlFor="photo">
                            Фото:
                        </label>
                        <div className="clearfix /"></div>
                        <input ref="photos" type="file" accept="image/*" multiple onChange={this.handleAddPhoto} />
                        {this.renderPhotos()}
                        <div className="clearfix" />
                    </div>
                    <div className="clearfix" />
                    <hr className="separator" />
                    <div className="group__title">Дополнительные услуги</div>
                    <div className="services">
                        {this.renderOptionsList()}
                        <div className="clearfix" />
                    </div>
                    <div className="input-wrapper w50" style={{marginRight: '20px'}}>
                        <label className="input-label icon" htmlFor="email" style={{backgroundImage: "url('/i/ic_mail_outline_black_48dp_1x.png')"}}>
                            Почта:
                        </label>
                        <input id="email" type="email" placeholder="example@gmail.com" value={this.state.email} onChange={this.handleChange} disabled={editing} required />
                        <div className="clearfix" />
                    </div>
                    {!editing &&
                        <div className="input-wrapper w50">
                            <label className="input-label icon" htmlFor="password" style={{backgroundImage: "url('/i/ic_lock_outline_black_48dp_1x.png')"}}>
                                Пароль:
                            </label>
                            <input id="password" type="password" placeholder="******" pattern=".{3,}" value={this.state.password} onChange={this.handleChange} title="Введите минимум 3 символа" required />
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