import React from 'react';
import ReactDOM from 'react-dom';
import { withRouter } from 'react-router-dom';
import MarkerManager from '../../util/marker_manager';

// initial map options
const mapOptions = {
  center: {
    lat: 39.9612,
    lng: -82.9988
  }, // San Francisco coords
  zoom: 12
};

class Routes extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      // array of lat/lng pairs in JSON
      markerCoords: [],
      // array of Google Maps Marker objects
      markers: []
    };
  }

  componentDidMount() {
    // get JSX element for map container
    const mapElement = this.refs.map;
    // create a new Google map attached to JSX map container
    // using the defined map options above
    this.route_map = new google.maps.Map(mapElement, mapOptions);
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
        google.maps.event.addListener(marker, 'rightclick', () => {
          // removes marker from the map
          marker.setMap(null);
          // removes marker from the markers array
          const markerIdx = this.state.markers.indexOf(marker);
          console.log(markerIdx);
          if (markerIdx > -1) {
            this.state.markers.splice(markerIdx, 1);
          }
          console.log(this.state.markers)
        });
        // obain the position of the marker in a Google LatLng object
        const googleLatLngObj = marker.getPosition();
        // convert Google LatLng object to JSON:
        // {lat: <lat_float>, lng: <lng_float>}
        // add JSON of the lat/lng of the marker to markerCoords array
        this.state.markerCoords.push(googleLatLngObj.toJSON());
      }
    };
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
          <input type="text"
            className="route-title-input"
            placeholder="Title"
          />
          <button className="routes-reset-button">Create Route</button>
        </div>
      </div>
    );
  }
}

export default Routes;
