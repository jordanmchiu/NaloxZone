import React, { Component } from 'react';
import PropTypes from 'prop-types';
import shouldPureComponentUpdate from 'react-pure-render/function';
import GoogleMapReact from 'google-map-react';
import GoogleMapsAPIKey from "./GoogleMapsAPIKey";
import PharmacyMarkerTraining from "./markers/PharmacyMarkerTraining";

class MainMap extends Component {
    static propTypes = {
        center: PropTypes.array,
        zoom: PropTypes.number,
        PharmacyMarkerTraining: PropTypes.any
    };

    static defaultProps = {
        center: {
            lat: 49.2827,
            lng: -123.1207
        },
        zoom: 12
    };

    shouldComponentUpdate = shouldPureComponentUpdate;

    render() {
        return (
            // Important! Always set the container height explicitly
            <div style={{ height: '100vh', width: '100%' }}>
                <GoogleMapReact
                    bootstrapURLKeys={{ key: GoogleMapsAPIKey.API_KEY }}
                    defaultCenter={this.props.center}
                    defaultZoom={this.props.zoom}>
                    <PharmacyMarkerTraining lat={49.23572} lng={-123.155837} text={'A'} /* Kerrisdale Pharmacy */ />

                </GoogleMapReact>
            </div>
        );
    }
}

export default MainMap;