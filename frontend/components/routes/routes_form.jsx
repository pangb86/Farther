import React from 'react';
import ReactDOM from 'react-dom';
import { withRouter } from 'react-router-dom';
import MarkerManager from '../../util/marker_manager';

// initial map options
const mapOptions = {
// San Francisco coords
  center: {
    lat: 39.9612,
    lng: -82.9988
  },
  zoom: 12
};

// create a Google Maps bicycling layer
const bikeLayer = new google.maps.BicyclingLayer();
// create a Google Maps directions service object
const directionsService = new google.maps.DirectionsService();
// create a Google Maps directions rendering object
const directionsDisplay = new google.maps.DirectionsRenderer({
    suppressBicyclingLayer: true
  });

class RoutesForm extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      // array of lat/lng pairs in JSON
      markerCoords: [],
      // array of Google Maps Marker objects
      markers: [],
      // boolean indicating if the bike layer is displayed
      layerOn: false,
      // route title
      title: ""
    };
    this.toggleBikeLayer = this.toggleBikeLayer.bind(this);
  }

  componentDidMount() {
    // get JSX element for map container
    const mapElement = this.refs.map;
    // create a new Google map attached to JSX map container
    // using the defined map options above
    this.route_map = new google.maps.Map(mapElement, mapOptions);
    // applies directionsDisplay object to the Google map
    directionsDisplay.setMap(this.route_map);
    // center map on user location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.route_map.setCenter({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        });
      });
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
    // add event listener to the Google map
    this.addMapListeners();
  }

  addMapListeners() {
    // adds event listener for clicking on the Google map
    // calls placeMarker when map is clicked
    google.maps.event.addListener(this.route_map, 'click', (event) => {
      placeMarker(event.latLng);
    });
    // place marker callback
    const placeMarker = (location) => {
      // constrains total number of markers to 2
      if (this.state.markers.length < 2) {
        // place marker at the point clicked on the map
        // position is a Google Maps LatLng object
        const marker = new google.maps.Marker({
          position: location,
          map: this.route_map
        });
        // add marker to the markers array
        this.state.markers.push(marker);
        // add event listener to every marker that removes it
        // upon right clicking on it
        google.maps.event.addListener(marker, 'click', () => {
          // removes marker from the map
          marker.setMap(null);
          // removes marker from the markers array
          const markerIdx = this.state.markers.indexOf(marker);
          if (markerIdx > -1) {
            this.state.markers.splice(markerIdx, 1);
          }
        });
        // obain the position of the marker in a Google LatLng object
        const googleLatLngObj = marker.getPosition();
        // convert Google LatLng object to JSON:
        // {lat: <lat_float>, lng: <lng_float>}
        // add JSON of the lat/lng of the marker to markerCoords array
        this.state.markerCoords.push(googleLatLngObj.toJSON());
      }
      // if there are two markers make a directions request
      if (this.state.markers.length === 2) {
        this.createRouteRequest();
      }
    };
  }

  createRouteRequest() {
    // creates routeRequest object with starting point being the first
    // marker location and the destination being the second marker location
    const routeRequest = {
      origin: this.state.markers[0].getPosition(),
      destination: this.state.markers[1].getPosition(),
      // travelMode: "DRIVING",
      travelMode: "BICYCLING",
    };
    // calls Google Maps API for directions and if the status is OK
    // it will render the route on the map
    directionsService.route(routeRequest, (directions, status) => {
      if (status === 'OK') {
        directionsDisplay.setDirections(directions);
      }
    });
    // clears the markers from the map and the markers array
    this.state.markers[0].setMap(null);
    this.state.markers[1].setMap(null);
    this.state.markers = [];
  }

  toggleBikeLayer() {
    // toggles bicycling layer based on layerOn boolean
    if (this.state.layerOn) {
      bikeLayer.setMap(null);
      this.setState({layerOn: false});
    } else {
      bikeLayer.setMap(this.route_map);
      this.setState({layerOn: true});
    }
  }

  update(field) {
    return e => this.setState({[field]: e.currentTarget.value});
  }

  render() {
    return (
      <div className="routes-map-box">
        <div className="routes-map" ref="map">
          Map
        </div>
        <br/>
        <br/>
        <div className="routes-form-container">
          <div className="routes-title-help">
            <input type="text"
              value={this.state.title}
              onChange={this.update('title')}
              className="route-title-input"
              placeholder="Title"
            />
            <div className="routes-help-icon">
              <span className="routes-tooltip">
                Click two points on the map to create a route.
                <br/>
                Click on a marker to remove it.
                <br/>
                Click two more points to create a new route.
              </span>
            </div>

          </div>
          <button className="routes-create-button">
            Create Route
          </button>
          <button className="routes-bikelayer-button"
            onClick={this.toggleBikeLayer}
          >
            Bicycling Layer
          </button>
        </div>
      </div>
    );
  }
}

export default RoutesForm;
