import React from 'react';
import ReactDOM from 'react-dom';
import { withRouter } from 'react-router-dom';
// import errorsImg from '../../../app/assets/images/errors.png';

// initial map options
const mapOptions = {
// San Francisco coordinates
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
// create a Google Maps elevation service object
const elevationService = new google.maps.ElevationService;

// props:
// this.props.errors: array of error messages or null
// this.props.createRoute(route): create route on the back end
class RoutesForm extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      // array of Google Maps Marker objects
      markers: [],
      // boolean indicating if the bike layer is displayed
      layerOn: false,
      // route title
      title: "",
      // distance of the route in miles
      distance: null,
      // distance of the route in a string
      distString: "",
      // elevation gain of the route
      elevation: null,
      // elevation gain in a string
      eleString: "",
      // polyline string needed to re-render the route on a Google map
      polyline: "",
      // boolean indicating if the create button is disabled
      createDisabled: true,
      // boolean indicating if the errors icon should be visible
      showErrors: false
    };
    this.toggleBikeLayer = this.toggleBikeLayer.bind(this);
    this.getElevationChange = this.getElevationChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    // get JSX element for map container
    const mapElement = this.refs.map;
    // create a new Google map attached to JSX map container
    // using the defined map options above
    this.route_map = new google.maps.Map(mapElement, mapOptions);
    // clears the direction display object from the route map
    // prevents old routes from being shown upon revisit
    directionsDisplay.setMap(null);
    // center map on user location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.route_map.setCenter({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        });
      });
    } else {
      // TODO: Maybe turn this into an error message or remove entirely
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
        // upon clicking on it
        google.maps.event.addListener(marker, 'click', () => {
          // removes marker from the map
          marker.setMap(null);
          // removes marker from the markers array
          const markerIdx = this.state.markers.indexOf(marker);
          if (markerIdx > -1) {
            this.state.markers.splice(markerIdx, 1);
          }
        });
      }
      // if there are two markers make a directions request
      if (this.state.markers.length === 2) {
        this.createRouteRequest();
      }
    };
  }

  createRouteRequest() {
    // creates routeRequest object with the starting point being the first
    // marker location and the destination being the second marker location
    const routeRequest = {
      origin: this.state.markers[0].getPosition(),
      destination: this.state.markers[1].getPosition(),
      travelMode: "BICYCLING",
    };
    // calls Google Maps API for directions
    directionsService.route(routeRequest, (directions, status) => {
      // if the status is OK, it will render the route on the map
      if (status === 'OK') {
        // removes the visibility of the errors icon
        this.setState({showErrors: false});
        // sets the direction display object to the route map
        // and renders it
        directionsDisplay.setMap(this.route_map);
        directionsDisplay.setDirections(directions);
        // enables the create route button
        this.setState({createDisabled: false});
        // stores the polyline string of the route in the local state
        this.setState({polyline: directions.routes[0].overview_polyline});
        console.log(this.state.polyline);
        // coverts the route distance to miles
        const distLong = directions.routes[0].legs[0].distance.value / 1609.34;
        // rounds route distance to one decimal place
        const dist = Math.round(distLong * 10) / 10;
        // sets distance in the local state
        this.setState({distance: dist});
        // sets the distance string in the local state
        this.setState({distString: directions.routes[0].legs[0].distance.text});
        // store the route's path of LatLng objects as an array
        const pathArr = directions.routes[0].overview_path;
        // call Google Maps elevation service withe the path array
        // and calls getElevationChange passing it the response
        elevationService.getElevationAlongPath({
          'path': pathArr,
          'samples': 256
        }, this.getElevationChange);
        // clears the markers from the map and the markers array
        this.state.markers[0].setMap(null);
        this.state.markers[1].setMap(null);
        this.setState({markers: []});
      }
    });

  }

  // calculates the total elevation gain over a path
  // TODO: Plot the elevation profile
  getElevationChange(elevations, status) {
    // checks if the status is OK
    if (status === "OK") {
      let totalElevation = 0;
      // loop over elevations array returned by Google Maps service
      for (var i = 1; i < elevations.length; i++) {
        // checks for increase in elevation and adds it to the total
        if (elevations[i].elevation > elevations[i - 1].elevation) {
          let change = elevations[i].elevation - elevations[i -1].elevation;
          totalElevation += change;
        }
      }
      // convert total elevation to feet and round it to the nearest foot
      totalElevation = Math.round(totalElevation * 3.28084);
      // sets the elevation of the local state
      this.setState({elevation: totalElevation});
      // sets the elevation string of the local state
      this.setState({eleString: `${totalElevation} ft`});
    }
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

  handleSubmit(e) {
    e.preventDefault();
    const routes = {
      title: this.state.title,
      distance: this.state.distance,
      elevation: this.state.elevation,
      polyline: this.state.polyline
    };
    this.props.createRoute({ routes })
    .then(() => this.props.history.push("/routes"));
  }

  // display route errors
  renderErrors() {
    if (this.props.errors.length > 0) {
      return(
        <ul className="routes-errors">
          {this.props.errors.map((error, i) => (
            <li key={`error-${i}`}>
              {error}
            </li>
          ))}
        </ul>
      );
    }
  }

  // sets visibility of the errors icon
  componentWillReceiveProps(newProps) {
    if (newProps.errors.length > 0) {
      this.setState({showErrors: true});
    }
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
            <div className="routes-errors-icon"
              style={{visibility: this.state.showErrors ? 'visible' : 'hidden' }}
            >
              <img src="https://i.imgur.com/cd4XFYD.png"
                className="routes-errors-image"
              />
              <div className="routes-errors-box">
                {this.renderErrors()}
              </div>
            </div>
          </div>
          <div className="routes-create-dist">
            <button className="routes-create-button"
              disabled={this.state.createDisabled}
              onClick={this.handleSubmit}
            >
              Create Route
            </button>
            <div className="routes-distance">{this.state.distString}</div>
            <div className="routes-elevation">{this.state.eleString}</div>
          </div>
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
