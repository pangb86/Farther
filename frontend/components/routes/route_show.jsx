import React from 'react';
import ReactDOM from 'react-dom';
import { Link, withRouter } from 'react-router-dom';

// initial map options
const mapOptions = {
// San Francisco coordinates
  center: {
    lat: 37.797236,
    lng: -122.413673
  },
  zoom: 12
};

// props:
// this.props.route: single requested route object
// this.props.workouts: array of all the user's workouts
// this.props.requestSingleRoute(routeId): requests single route from
//   the server/store
// this.props.deleteRoute(routeId): remove the selected route from the
//   server/store
// this.props.requestWorkouts()
// this.props.user: current user that is logged in with an ID, username,
//   and email

class RouteShow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showErrors: false
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillReceiveProps(newProps) {
    // fetchs desired route if the new URL does not match the current URL
    // or if the passed down route is undefined
    if (newProps.match.url !== this.props.match.url || this.props.route === undefined) {
      this.props.requestWorkouts();
      this.props.requestSingleRoute(newProps.match.params.routeId)
      .then(() => this.showMap());
    }
  }

  componentDidMount() {
    this.props.requestWorkouts();
    this.props.requestSingleRoute(this.props.match.params.routeId)
    .then(() => this.showMap());
  }

  // initializes the Google map, displays the route's path, and centers
  // the map on the route
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
          strokeColor: "#fc4c02"
        });
    // set the boundaries of the Google map to fit the route
    const boundary = new google.maps.LatLngBounds();
    // converts polyline path to MVCArray
    const routeMVCArr = polylineObj.getPath();
    // extends the boundary for each lat-lng pair in the MVCArray
    routeMVCArr.forEach(latLng => boundary.extend(latLng));
    // fits the map to the boundary
    this.route_map.fitBounds(boundary);
    // render the route on the map
    polylineObj.setMap(this.route_map);
  }

  handleSubmit(e) {
    e.preventDefault();
    const routeId = this.props.route.id;

    const workoutsArr = this.props.workouts;
    let deleteAllowed = true;

    for (var i = 0; i < workoutsArr.length; i++) {
      if (workoutsArr[i].route_id == routeId) {
        deleteAllowed = false;
        break;
      }
    }
    if (deleteAllowed === true) {
      // calls deleteRoute on the current route
      this.props.deleteRoute(routeId)
      // redirect to routes index page
      .then(() => this.props.history.push("/routes"));
    } else {
      this.setState({showErrors: true})
    }
  }

  render() {
    if (this.props.route) {
      const route = this.props.route;
      const user = this.props.user;

      return(
        <div className="routes-show-main">
          <div className="routes-show-box">
            <div className="routes-show-intro">
              <div className="routes-show-title">
                {route.title}
              </div>
              <button className="routes-show-delete-button"
                onClick={this.handleSubmit}
              >
                Delete Route
              </button>
              <div className="routes-errors-icon"
                style={{visibility: this.state.showErrors ? 'visible' : 'hidden' }}
              >
                <img src="https://i.imgur.com/cd4XFYD.png"
                  className="routes-errors-image"
                />
                <div className="routes-errors-box">
                  <ul className="workouts-errors">
                    <li>Cannot delete route associated with workouts</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="routes-show-info-box">
              <div className="routes-show-map" ref="map">
                Map
              </div>
              <div className="routes-show-info">
                <div className="routes-show-namedate">
                  <div className="routes-show-username">
                    {`By ${user.username}`}
                  </div>
                  <div className="routes-show-date">
                    {`Created on ${new Date(route.created_at).toLocaleDateString()}`}
                  </div>
                </div>
                <br/>
                <div className="routes-show-stats">
                  <div className="route-item-distance-box">
                    <div className="route-item-distance">
                      {`${route.distance} mi`}
                    </div>
                    <div className="route-item-distance-tag">Distance</div>
                  </div>
                  <div className="route-item-elevation-box">
                    <div className="route-item-elevation">
                      {`${route.elevation} ft`}
                    </div>
                    <div className="route-item-elvation-tag">Elevation</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return null;
    }
  }
}

export default RouteShow;
