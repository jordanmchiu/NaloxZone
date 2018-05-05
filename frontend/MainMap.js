var React = require("react");
var GoogleMapReact = require("google-map-react");
var APIKey = require("../source-data/GoogleMapsAPIKey");

const AnyReactComponent = ({ text }) => <div>{text}</div>;

class MainMap extends Component {
    static defaultProps = {
        center: {
            lat: 49.2827,
            lng: -123.1207
        },
        zoom: 11
    };

    render() {
        return (
            // Important! Always set the container height explicitly
            <div style={{ height: '100vh', width: '100%' }}>
                <GoogleMapReact
                    bootstrapURLKeys={{ key: APIKey.API_KEY }}
                    defaultCenter={this.props.center}
                    defaultZoom={this.props.zoom}
                >
                    /*
                    <AnyReactComponent
                        lat={59.955413}
                        lng={30.337844}
                        text={'Kreyser Avrora'}
                    />
                    */
                </GoogleMapReact>
            </div>
        );
    }
}

export default MainMap;