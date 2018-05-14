import React, { Component } from 'react';
import './MainMap.css';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import GoogleMapsAPIKey from "./GoogleMapsAPIKey";
import LocationHandler from "./LocationHandler";
import Location from "./util/Location";
// import SearchBox from "./SearchBox";
// import PharmacyManager from "./PharmacyManager";
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import {Alert, Button, ButtonToolbar, PageHeader} from 'react-bootstrap';
// import {Route} from 'react-router';

export class MainMap extends Component {
    static defaultProps = {
        center: {
            lat: 49.25713413767744,
            lng: -123.1207
        },
        zoom: 12,
        trainingOnly: false
    };

    /**
     * Sets the state's current location given a string
     * @param locString
     */
    /*
    setLocation = async (locString) => {
        this.state.location = await LocationHandler.getInstance().geocodeLocation(locString);
        LocationHandler.getInstance().setCurrLoc(this.state.location);
    };
    */

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
            pharmacies: LocationHandler.getInstance().getNearest(this.state.trainingOnly),
            center: {
                lat: latitude,
                lng: longitude
            }
        });
    };
    //<a href={"https://www.stopoverdose.gov.bc.ca/"}> </a>

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
                label={(i+1).toString()}
                name={pharmacy.getName()}
                content={<p> {pharmacy.getLocation().getAddress()}<br/>
                    {(pharmacy.getTraining() ? "Overdose training provided" : "Overdose training may NOT be provided")}<br/>
                    {((this.state.location !== undefined) ? "Distance from current location: " + (LocationHandler.getInstance().distanceToPharmacy(this.state.location, pharmacy) / 1000).toFixed(2) + " km" : "")}</p>}
                position={{lat: pharmacy.getLocation().getLat(), lng: pharmacy.getLocation().getLon()}}
                onClick={this.onMarkerClick}
            />
        ));
        if (this.state.location !== undefined) {
            Markers.push(
                <Marker
                    key={0}
                    name='Your location'
                    position={{lat: this.state.location.getLat(), lng: this.state.location.getLon()}}
                    label={'*'}
                />
            )
        }
        let LocationText;
        if (this.state.location === undefined) {
            LocationText = <Alert bsStyle="warning">Click the map to set your location.</Alert>
        } else {
            LocationText = <p>Your current location * : {this.state.location.getLat()}, {this.state.location.getLon()}</p>
        }
        const style = {
            width: '100%',
            height: '100vh'
        };
        return (
            <div style={style}>
                <PageHeader className="MainMap-header">NaloxZone Vancouver</PageHeader>
                <Alert bsStyle="danger">
                    <strong>If you suspect an overdose, call 911 right away.</strong>
                </Alert>
                {LocationText}
                <p>
                    There are {(this.state.location === undefined) ? Markers.length + " pharmacies displayed."
                    : Markers.length - 1 + " pharmacies within " + LocationHandler.MAX_DISTANCE + " km of your current location."}
                </p>
                <ButtonToolbar>
                    <Button bsStyle="primary" onClick={this.onShowAll}>
                        Reset (clear current location)
                    </Button>
                    <Button bsStyle="warning" onClick={this.onFilterTraining}>
                        {(this.state.trainingOnly) ? "Show " : "Hide "} pharmacies that may not provide overdose training
                    </Button>
                    <Button bsStyle="danger" href={"https://www.stopoverdose.gov.bc.ca/"}>
                        Stop Overdose BC (External Link)
                    </Button>
                </ButtonToolbar>
                <Map google={this.props.google}
                     zoom={this.props.zoom}
                     initialCenter={this.props.center}
                     center={this.state.center}
                     onClick={this.onMapClicked}>
                    {Markers}
                    <InfoWindow
                        marker={this.state.activeMarker}
                        visible={this.state.showingInfoWindow}>
                        <div>
                            <h2>{this.state.selectedPlace.name}</h2>
                            <p>{this.state.selectedPlace.content}</p>
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