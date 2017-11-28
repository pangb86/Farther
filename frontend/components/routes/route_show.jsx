import React from 'react';
import ReactDOM from 'react-dom';
import { Link, withRouter } from 'react-router-dom';

// initial map options
const mapOptions = {
// Columbus coordinates
  center: {
    lat: 37.797236,
    lng: -122.413673
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
// this.props.route: single requested route object
// this.props.requestSingleRoute(routeId): requests single route from
// the server/store
// this.props.deleteRoute(routeId): remove the selected route from the
// server/store
class RouteShow extends React.Component {
  constructor(props){
    super(props);
  }

  componentWillReceiveProps(newProps){
    if (newProps.match.url !== this.props.match.url) {
      this.props.requestSingleRoute(newProps.match.params.routeId)
      .then(() => this.showMap());
    }
  }

  showMap() {
    // get JSX element for map container
    const mapElement = this.refs.map;
    // create a new Google map attached to JSX map container
    // using the defined map options above
    this.route_map = new google.maps.Map(mapElement, mapOptions);
    // create a route path from the route's polyline string
    const routePath = google.maps.geometry.encoding.decodePath(this.props.route.polyline);
    // create polyline object from the decoded path
    const polylineObj = new google.maps.Polyline({
          path: routePath,
        });
    // set the boundaries of the Google map to fit the route
    const boundary = new google.maps.LatLngBounds();
    const routeArr = polylineObj.getPath()
    // for (var i = 0; i < routeArr.length; i++) {
    //   boundary.extend(routeArr[i]);
    // }
    // this.route_map.fitBounds(bounds);
    // render the route on the map
    polylineObj.setMap(this.route_map);
    // clears the direction display object from the route map
    // prevents old routes from being shown upon revisit
    // directionsDisplay.setMap(null)
  }

  componentDidMount(){
    this.props.requestSingleRoute(this.props.match.params.routeId)
    .then(() => this.showMap());
  }

  render(){
    return(
      <div className="routes-show-box">
        <div className="routes-show-map" ref="map">
          Map
        </div>
        <div className="routes-show-title">Sometext</div>
      </div>
    );
  }

}

export default RouteShow;
