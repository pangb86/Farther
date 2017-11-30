import React from 'react';
import ReactDOM from 'react-dom';
import { withRouter } from 'react-router-dom';

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
// this.props.errors: array of error messages
// this.props.routes: array of all the user's routes
// this.props.createWorkout(workout): sends AJAX request to
//   create workout and update the store
// this.props.requestRoutes(): sends AJAX request to fetch
//   a user's routes and update the store

class WorkoutsForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // workout title
      title: "",
      // workout description
      description: "",
      // duration hours value
      hours: undefined,
      // duration minutes value
      minutes: undefined,
      // duratin seconds value
      seconds: undefined,
      // id of the the selected route
      route_id: undefined,
      // route distance string
      routeDistance: "",
      // route elevation string
      routeElevation: ""
    };
    this.updateMap = this.updateMap.bind(this);
  }

  componentDidMount() {
    this.props.requestRoutes();
    // get JSX element for map container
    const mapElement = this.refs.map;
    // create a new Google map attached to JSX map container
    // using the defined map options above
    this.route_map = new google.maps.Map(mapElement, mapOptions);
    // clears the direction display object from the route map
    // prevents old routes from being shown upon revisit
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
  }

  // updates the state of the input field based on change
  update(field) {
    return e => {
      this.setState({[field]: e.currentTarget.value});
    };
  }

  updateMap(e) {
    e.preventDefault();
    this.setState({route_id: e.currentTarget.value}, () => {
      const routesArr = this.props.routes;
      for (var i = 0; i < routesArr.length; i++) {
        if (routesArr[i].id == this.state.route_id) {
          var currentRoute = routesArr[i];
          break;
        }
      }
      // sets the route distance and elevation for display
      this.setState({routeDistance: `${currentRoute.distance} mi`});
      this.setState({routeElevation: `${currentRoute.elevation} ft`})
      // clear previously rendered route from the map
      if (this.polylineObj) {
        this.polylineObj.setMap(null);
      }
      // create a route path from the route's polyline string
      const routePath = google.maps.geometry.encoding.decodePath(currentRoute.polyline);
      // create polyline object from the decoded path
      this.polylineObj = new google.maps.Polyline({
            path: routePath,
            strokeColor: "#fc4c02"
          });
      // set the boundaries of the Google map to fit the route
      const boundary = new google.maps.LatLngBounds();
      // converts polyline path to MVCArray
      const routeMVCArr = this.polylineObj.getPath();
      // extends the boundary for each lat-lng pair in the MVCArray
      routeMVCArr.forEach(latLng => boundary.extend(latLng));
      // fits the map to the boundary
      this.route_map.fitBounds(boundary);
      // render the route on the map
      this.polylineObj.setMap(this.route_map);
    });
  }

  render() {
    const routes = this.props.routes;

    return(
      <div className="workouts-form-main">

        <div className="workouts-form-intro">
          <div className="workouts-form-header">
            New Workout
          </div>
          <button className="workouts-form-create-button">
            Create Workout
          </button>
        </div>

        <div className="workouts-input-map">

          <div className="workouts-input-main">
            <input type="text"
              value={this.state.title}
              onChange={this.update('title')}
              className="workout-title-input"
              placeholder="Title"
            />

            <textarea className ="workouts-description-input"
              value={this.state.description}
              onChange={this.update('description')}
              placeholder="Description"
            >
            </textarea>

            <div className="workouts-route-dropdown">

              <select
                className="workouts-route-select"
                defaultValue="default"
                onChange={this.updateMap}
              >
                <option value='default' disabled>Select a route</option>
                {
                  routes.map(route => (
                    <option key={route.id} value={route.id}>{route.title}</option>
                  ))
                }
              </select>

              <div className="workouts-route-info">
                <div className="workouts-route-distance">
                  {this.state.routeDistance}
                </div>
                <div className="workouts-route-elevation">
                  {this.state.routeElevation}
                </div>
              </div>

            </div>

            <div className="workouts-duration-tag">
              Duration
            </div>
            <div className="workouts-duration-input">
              <div className="workouts-hours-box">
                <input className="workouts-hours-input"
                  value={this.state.hours}
                  onChange={this.update('hours')} />
                <br/>
                Hours
              </div>
              <div className="workouts-minutes-box">
                <input className="workouts-minutes-input"
                  value={this.state.minutes}
                  onChange={this.update('minutes')}
                />
                <br/>
                Minutes
              </div>
              <div className="workouts-seconds-box">
                <input className="workouts-seconds-input"
                  value={this.state.seconds}
                  onChange={this.update('seconds')}
                />
                <br/>
                Seconds
              </div>
            </div>

          </div>

          <div className="workouts-form-map" ref="map">
            Map
          </div>

        </div>

      </div>
    );
  }
}

export default WorkoutsForm;
