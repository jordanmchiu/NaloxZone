import React, { Component } from 'react';
import PropTypes from 'prop-types';
import shouldPureComponentUpdate from 'react-pure-render/function';
import GoogleMapReact from 'google-map-react';
import GoogleMapsAPIKey from "./GoogleMapsAPIKey";
import PharmacyMarkerTraining from "./markers/PharmacyMarkerTraining";
import PharmacyManager from "./PharmacyManager";


class MainMap extends Component {
    static propTypes = {
        onCenterChange: PropTypes.func,
        onZoomChange: PropTypes.func,
        onBoundsChange: PropTypes.func,
        onMarkerHover: PropTypes.func,
        onChildClick: PropTypes.func,
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

    constructor(props) {
        super(props);
        this.state = {
            pharmacies: PharmacyManager.getInstance().getPharmacies(),
        }
    }

    render() {
        let Markers = this.state.pharmacies.map((pharmacy, i) => (
            <PharmacyMarkerTraining
                // required props
                key={pharmacy.getName()}
                lat={pharmacy.getLocation().getLat()}
                lng={pharmacy.getLocation().getLon()}
            />
        ));

        return (
            // Important! Always set the container height explicitly
            <div style={{ height: '100vh', width: '100%' }}>
                <GoogleMapReact
                    bootstrapURLKeys={{ key: GoogleMapsAPIKey.API_KEY }}
                    defaultCenter={this.props.center}
                    defaultZoom={this.props.zoom}>
                    {Markers}
                </GoogleMapReact>
            </div>
        );
    }
}

export default MainMap;