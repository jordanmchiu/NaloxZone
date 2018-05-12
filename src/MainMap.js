import React, { Component } from 'react';
import './MainMap.css';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import GoogleMapsAPIKey from "./GoogleMapsAPIKey";
import LocationHandler from "./LocationHandler";
import SearchBox from "./SearchBox";
// import PharmacyManager from "./PharmacyManager";

export class MainMap extends Component {
    static defaultProps = {
        center: {
            lat: 49.2827,
            lng: -123.1207
        },
        zoom: 12,
        trainingOnly: false
    };

    /**
     * Sets the state's current location given a string
     * @param locString
     */
    setLocation = async (locString) => {
        this.state.location = await LocationHandler.getInstance().geocodeLocation(locString);
        LocationHandler.getInstance().setCurrLoc(this.state.location);
    };

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

    onFilterTraining = (props) => {
        if (this.state.trainingOnly) {
            this.setState({
                pharmacies: LocationHandler.getInstance().getNearest(false),
                trainingOnly: false
            })
        } else {
            this.setState({
                pharmacies: LocationHandler.getInstance().getNearest(true),
                trainingOnly: true
            })
        }
    };

    render() {
        let Markers = this.state.pharmacies.map((pharmacy) => (
            <Marker
                name={pharmacy.getName()}
                title={pharmacy.getLocation().getAddress() + '   |   Training Provided: ' + pharmacy.getTraining()}
                position={{lat: pharmacy.getLocation().getLat(), lng: pharmacy.getLocation().getLon()}}
                onClick={this.onMarkerClick}
            />
        ));
        const style = {
            width: '100%',
            height: '100vh'
        };
        /*
        this.props.google.maps.event.addListener("click", function (event) {
            console.log("New location!  lat: " + event.latLng.lat() + ", lng: " + event.latLng.lng());
        });
        */
        return (
            <div style={style}>
                <h1 className="MainMap-header">NaloxZone</h1>
                <form>
                    <label>
                        Only show pharmacies with overdose training:
                        <input
                            name='trainingOnly'
                            type='checkbox'
                            onChange={this.onFilterTraining} />
                    </label>
                </form>
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