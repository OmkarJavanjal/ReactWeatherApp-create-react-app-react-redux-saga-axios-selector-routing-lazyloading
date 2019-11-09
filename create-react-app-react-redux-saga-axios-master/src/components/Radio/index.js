import React, { Component } from 'react';
import classNames from 'classnames';
import styles from './styles.module.scss';

class Radio extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    onClick = (evt) => {
        const { value, onClick } = this.props;
        if (typeof onClick === 'function') {
            onClick(value, evt);
        }
    }

    render() {
        const { className, label, value, selectedValue, ...rest } = this.props;
        const active = (value && value.toString()) === (selectedValue && selectedValue.toString());
        return (
            <label {...rest} className={classNames(className, styles.radio, active ? styles.active : '' )}onClick={this.onClick}> {label} </label>
        )
    }
}

Radio.defaultProps = {
    className: '',
    selectedValue: '',
}

export default Radio;