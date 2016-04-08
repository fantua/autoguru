import React from 'react';
import Parse from 'parse';

const CatalogItem = {

    getInitialState() {
        return {
            options: 0,
            optionsList: {
                'wifi': 1<<1,
                'wc': 1<<2,
                'phone': 1<<3,
                'cafe': 1<<4,
                'atm': 1<<5,
                'parking': 1<<6,
                'services': 1<<7
            }
        };
    },

    handleOptionsChange(e) {
        const option = this.state.optionsList[e.currentTarget.name];
        this.setState({options: this.state.options ^ option});
    },

    getOptionsList() {
        const arr = [];

        Object.keys(this.state.optionsList).forEach((option, i) => {

            const val = this.state.optionsList[option];
            const checked = !!(this.state.options & val);
            const id = 'Checkbox-' + i;
            const className = 'checkbox ' + option;
            const src = '/images/'+ option+'.png';

            arr.push(
                <div key={i} className={className}>
                    <input name={option} type="checkbox" id={id} className="form-input" checked={checked} onChange={this.handleOptionsChange} />
                    <label htmlFor={id}><img src={src} alt="" /></label>
                </div>
            );
        });

        return arr;
    },

    handleFileAdd(e) {
        if ((this.state.images.length + this.refs.images.files.length) > 10) {
            return alert('Превышен лимит фото (макс. 10)');
        }
        Object.keys(this.refs.images.files).forEach((i) => {
                const file = new Parse.File(i, this.refs.images.files[i]);
                file.save().then((file) => {
                    this.setState({images: this.state.images.concat([file])});
                    this.refs.images.value = '';
                });
        });
    },

    getImages() {
        const arr = [];

        this.state.images.forEach((image, i) => {
            arr.push(
                <div key={i} className="img-holder">
                    <img src={image.url()} width="94px" height="85px" />
                </div>
            );
        });

        return arr;
    }

};

export default CatalogItem;