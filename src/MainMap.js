import React, { Component } from 'react';
import './MainMap.css';
import PropTypes from 'prop-types';
import shouldPureComponentUpdate from 'react-pure-render/function';
// import GoogleMapReact from 'google-map-react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import GoogleMapsAPIKey from "./GoogleMapsAPIKey";
import LocationHandler from "./LocationHandler";
// import PharmacyMarkerTraining from "./markers/PharmacyMarkerTraining";
// import PharmacyMarkerNoTraining from "./markers/PharmacyMarkerNoTraining";
import SearchBox from "./SearchBox";
// import PharmacyManager from "./PharmacyManager";


export class MainMap extends Component {
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
        // PharmacyMarkerTraining: PropTypes.any,
        // PharmacyMarkerNoTraining: PropTypes.any
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
            activeMarker: {},
            selectedPlace: {},
            showingInfoWindow: false
        }
    }

    onMarkerClick = (props, marker, e) => {
        this.setState({
            activeMarker: marker,
            selectedPlace: props,
            showingInfoWindow: true
        })
    };

    onMapClicked = (props) => {
        if (this.state.showingInfoWindow) {
            this.setState({
                showingInfoWindow: false,
                activeMarker: null
            })
        }
    };

    render() {
        /*
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
        */
        let Markers = LocationHandler.getInstance().getNearest(false).map((pharmacy) => (
            <Marker
                name={pharmacy.getName()}
                title={pharmacy.getLocation().getAddress()}
                position={{lat: pharmacy.getLocation().getLat(), lng: pharmacy.getLocation().getLon()}}
                onClick={this.onMarkerClick}
            />
        ));
        const style = {
            width: '100%',
            height: '100vh'
        };
        return (
            <div style={style}>
                <h1 className="MainMap-header">NaloxZone</h1>
                <SearchBox setLocation={this.setLocation}/>
                <Map google={this.props.google}
                     zoom={this.props.zoom}
                     initialCenter={this.props.center}
                     onClick={this.onMapClicked}>
                    {Markers}
                    <InfoWindow
                        marker={this.state.activeMarker}
                        visible={this.state.showingInfoWindow}>
                        <div>
                            <h2>{this.state.selectedPlace.name}</h2>
                            <p>{this.state.selectedPlace.title}</p>
                        </div>
                    </InfoWindow>
                </Map>
            </div>
        )
    }
}

export default GoogleApiWrapper({
    apiKey: GoogleMapsAPIKey.API_KEY
})(MainMap)