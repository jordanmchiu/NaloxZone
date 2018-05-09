import React, {Component} from 'react';
import PropTypes from "prop-types";
import shouldPureComponentUpdate from 'react-pure-render/function';

import {PharmacyMarkerNoTrainingStyle} from './PharmacyMarker_Styles';

export default class PharmacyMarkerNoTraining extends Component {
    static propTypes = {
        text: PropTypes.string
    };

    static defaultProps = {};

    shouldComponentUpdate = shouldPureComponentUpdate;

    render() {
        return (
            <div style={PharmacyMarkerNoTrainingStyle}>
                {this.props.text}
            </div>
        );
    }
}