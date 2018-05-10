import React, { Component } from 'react';
import './MainMap.css';
import PropTypes from 'prop-types';
import shouldPureComponentUpdate from 'react-pure-render/function';
import GoogleMapReact from 'google-map-react';
import GoogleMapsAPIKey from "./GoogleMapsAPIKey";
import LocationHandler from "./LocationHandler";
import PharmacyMarkerTraining from "./markers/PharmacyMarkerTraining";
import PharmacyMarkerNoTraining from "./markers/PharmacyMarkerNoTraining";
import SearchBox from "./SearchBox";
// import PharmacyManager from "./PharmacyManager";


class MainMap extends Component {
    static propTypes = {
        /*
        onCenterChange: PropTypes.func,
        onZoomChange: PropTypes.func,
        onBoundsChange: PropTypes.func,
        onChildClick: PropTypes.func,
        onMarkerHover: PropTypes.func,
        */
        center: PropTypes.array,
        zoom: PropTypes.number,
        PharmacyMarkerTraining: PropTypes.any,
        PharmacyMarkerNoTraining: PropTypes.any
    };

    static defaultProps = {
        center: {
            lat: 49.2827,
            lng: -123.1207
        },
        zoom: 12
    };

    /**
     * Sets the state's current location given a string
     * @param locString
     */
    setLocation = async (locString) => {
        this.state.location = await LocationHandler.getInstance().geocodeLocation(locString);
        LocationHandler.getInstance().setCurrLoc(this.state.location);
    };

    shouldComponentUpdate = shouldPureComponentUpdate;

    constructor(props) {
        super(props);
        this.state = {
            pharmacies: LocationHandler.getInstance().getNearest(false),
            location: undefined,
        }
    }

    render() {
        let PharmsWithTraining = this.state.pharmacies.filter(pharmacy => {return pharmacy.getTraining()});
        let PharmsWithoutTraining = this.state.pharmacies.filter(pharmacy => {return !pharmacy.getTraining()});
        let MarkersWithTraining = PharmsWithTraining.map((pharmacy, i) => (
            <PharmacyMarkerTraining
                // required props
                key={pharmacy.getLocation().getAddress()}
                lat={pharmacy.getLocation().getLat()}
                lng={pharmacy.getLocation().getLon()}
                text={i + 1}
            />
        ));
        let MarkersWithoutTraining = PharmsWithoutTraining.map((pharmacy, i) => (
            <PharmacyMarkerNoTraining
                // required props
                key={pharmacy.getLocation().getAddress()}
                lat={pharmacy.getLocation().getLat()}
                lng={pharmacy.getLocation().getLon()}
                text={i + 1}
            />
        ));
        return (
            // Important! Always set the container height explicitly
            <div style={{ height: '100vh', width: '100%' }}>
                <h1 className="MainMap-header">NaloxZone</h1>
                <SearchBox setLocation={this.setLocation}/>
                <GoogleMapReact
                    bootstrapURLKeys={{ key: GoogleMapsAPIKey.API_KEY }}
                    defaultCenter={this.props.center}
                    defaultZoom={this.props.zoom}
                    hoverDistance={16}
                >
                    {MarkersWithTraining}
                    {MarkersWithoutTraining}
                </GoogleMapReact>
            </div>
        );
    }
}

export default MainMap;