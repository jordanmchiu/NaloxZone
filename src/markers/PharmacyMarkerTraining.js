import React, {Component} from 'react';
import PropTypes from "prop-types";
import shouldPureComponentUpdate from 'react-pure-render/function';

import {PharmacyMarkerTrainingStyle} from './PharmacyMarkerTraining_Style';

export default class PharmacyMarkerTraining extends Component {
    static propTypes = {
        text: PropTypes.string
    };

    static defaultProps = {};

    shouldComponentUpdate = shouldPureComponentUpdate;

    render() {
        return (
            <div style={PharmacyMarkerTrainingStyle}>
                {this.props.text}
            </div>
        );
    }
}