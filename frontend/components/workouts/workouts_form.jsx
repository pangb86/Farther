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
      hours: "",
      // duration minutes value
      minutes: "",
      // duratin seconds value
      seconds: "",
      // id of the the selected route
      route_id: 0,
      // route distance string
      routeDistance: "",
      // route elevation string
      routeElevation: "",
      // boolean indicating if create button is disabled
      createDisabled: true,
      // boolean indicating visibility of the errors icon
      showErrors: false,
    };
    this.updateMap = this.updateMap.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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

  // sets visibility of the errors icon
  componentWillReceiveProps(newProps) {
    if (newProps.errors.length > 0) {
      this.setState({showErrors: true});
    }
  }

  // updates the state of the input field based on change
  update(field) {
    return e => {
      this.setState({[field]: e.currentTarget.value});
    };
  }

  // sets the route ID of the workout and displays the route on the map
  updateMap(e) {
    e.preventDefault();
    this.setState({route_id: e.currentTarget.value}, () => {
      const routesArr = this.props.routes;
      for (var i = 0; i < routesArr.length; i++) {
        if (routesArr[i].id == this.state.route_id) {
          this.currentRoute = routesArr[i];
          break;
        }
      }
      // enable the create button
      this.setState({createDisabled: false})
      // sets the route distance and elevation for display
      this.setState({routeDistance: `${this.currentRoute.distance} mi`});
      this.setState({routeElevation: `${this.currentRoute.elevation} ft`});
      // clear previously rendered route from the map
      if (this.polylineObj) {
        this.polylineObj.setMap(null);
      }
      // create a route path from the route's polyline string
      const routePath = google.maps.geometry.encoding.decodePath(this.currentRoute.polyline);
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

  // fires on clicking the create workout button
  handleSubmit(e) {
    e.preventDefault();
    // calculate duration in seconds
    if (this.state.seconds === "") {
      var seconds = 0;
    } else {
      var seconds = this.state.seconds
    }
    const duration = (this.state.hours * 3600) + (this.state.minutes * 60) + seconds;
    // calcualte speed in miles per hour
    const speed = (this.currentRoute.distance / duration) * 3600;
    // creates workouts object for createWorkout AJAX call
    // console.log(duration);
    // console.log(speed);
    const workouts = {
      title: this.state.title,
      description: this.state.description,
      duration: duration,
      speed: speed,
      route_id: this.state.route_id
    };
    if (duration === 0) {
      return null;
    } else {
    // AJAX call for creating the workout
      this.props.createWorkout({ workouts })
    }
    // redirect to routes index page
    // .then(() => this.props.history.push("/routes"));
  }

  // display route errors
  renderErrors() {
    if (this.props.errors.length > 0) {
      return(
        <ul className="workouts-errors">
          {this.props.errors.map((error, i) => (
            <li key={`error-${i}`}>
              {error}
            </li>
          ))}
        </ul>
      );
    }
  }

  render() {
    const routes = this.props.routes;

    return(
      <div className="workouts-form-main">

        <div className="workouts-form-intro">
          <div className="workouts-form-header">
            New Workout
          </div>
          <button className="workouts-form-create-button"
            onClick={this.handleSubmit}
            disabled={this.state.createDisabled}
          >
            Create Workout
          </button>

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

        <div className="workouts-input-map">

          <div className="workouts-input-main">
            <input type="text"
              value={this.state.title}
              onChange={this.update('title')}
              className="workout-title-input"
              placeholder="Title"
              required={true}
            />

            <textarea className ="workouts-description-input"
              value={this.state.description}
              onChange={this.update('description')}
              placeholder="Description"
              required={true}
            >
            </textarea>

            <div className="workouts-route-dropdown">

              <select
                className="workouts-route-select"
                defaultValue="default"
                onChange={this.updateMap}
                required={true}
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
                  onChange={this.update('hours')}
                  required={true}
                />
                <br/>
                Hours
              </div>
              <div className="workouts-minutes-box">
                <input className="workouts-minutes-input"
                  value={this.state.minutes}
                  onChange={this.update('minutes')}
                  required={true}
                />
                <br/>
                Minutes
              </div>
              <div className="workouts-seconds-box">
                <input className="workouts-seconds-input"
                  value={this.state.seconds}
                  onChange={this.update('seconds')}
                  required={true}
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
