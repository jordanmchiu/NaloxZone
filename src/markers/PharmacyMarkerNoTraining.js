import React, {Component} from 'react';
import PropTypes from "prop-types";
import shouldPureComponentUpdate from 'react-pure-render/function';

import {PharmacyMarkerNoTrainingStyle, PharmacyMarkerHover} from './PharmacyMarker_Styles';

export default class PharmacyMarkerNoTraining extends Component {
    static propTypes = {
        // GoogleMap pass $hover props to hovered components
        // to detect hover it uses internal mechanism, explained in x_distance_hover example
        $hover: PropTypes.bool,
        text: PropTypes.string
    };

    static defaultProps = {};

    shouldComponentUpdate = shouldPureComponentUpdate;

    render() {
        const style = this.props.$hover ? PharmacyMarkerHover : PharmacyMarkerNoTrainingStyle;
        return (
            <div style={style}>
                {this.props.text}
            </div>
        );
    }
}