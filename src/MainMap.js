import React, { Component } from 'react';
import './MainMap.css';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import GoogleMapsAPIKey from "./GoogleMapsAPIKey";
import LocationHandler from "./LocationHandler";
import Location from "./util/Location";
// import SearchBox from "./SearchBox";
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
        };
        this.onMapClicked = this.onMapClicked.bind(this);
    }

    onMarkerClick = (props, marker, e) => {
        this.setState({
            activeMarker: marker,
            selectedPlace: props,
            showingInfoWindow: true
        })
    };

    onMapClicked = (props, map, e) => {
        console.log('Event', e);
        if (this.state.showingInfoWindow) {
            this.setState({
                showingInfoWindow: false,
                activeMarker: null
            })
        }
        let latitude = e.latLng.lat();
        let longitude = e.latLng.lng();
        let currLoc = new Location(latitude, longitude);
        LocationHandler.getInstance().setCurrLoc(currLoc);
        this.setState({
            location: currLoc,
            pharmacies: LocationHandler.getInstance().getNearest(this.state.trainingOnly)
        });
        // TODO: Add "Your Location" marker on click
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

    onShowAll = (props) => {
        LocationHandler.getInstance().setCurrLoc(undefined);
        this.setState({
            location: undefined,
            pharmacies: LocationHandler.getInstance().getNearest(this.state.trainingOnly)
        });
    };

    render() {
        let Markers = this.state.pharmacies.map((pharmacy, i) => (
            <Marker
                key={i}
                name={pharmacy.getName()}
                title={pharmacy.getLocation().getAddress() + '   |   Training Provided: ' + pharmacy.getTraining()}
                position={{lat: pharmacy.getLocation().getLat(), lng: pharmacy.getLocation().getLon()}}
                onClick={this.onMarkerClick}
            />
        ));
        let LocationText;
        if (this.state.location === undefined) {
            LocationText = <p>Click the map to set your location.</p>
        } else {
            LocationText = <p>Your current location: {this.state.location.getLat()}, {this.state.location.getLon()}</p>
        }
        const style = {
            width: '100%',
            height: '100vh'
        };
        return (
            <div style={style}>
                <h1 className="MainMap-header">NaloxZone Vancouver</h1>
                <form>
                    <label>
                        Only show pharmacies with overdose training:
                        <input
                            name='trainingOnly'
                            type='checkbox'
                            onChange={this.onFilterTraining} />
                    </label>
                    <br/>
                    <label>
                        Clear current location (show all pharmacies):
                        <input
                            name='showAll'
                            type='checkbox'
                            onChange={this.onShowAll} />
                    </label>
                </form>
                <p>
                    There are {Markers.length} pharmacies within 5km of your current location. <br />
                    {LocationText}
                </p>
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