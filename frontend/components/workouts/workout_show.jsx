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

// props
// this.props.workout: workout to show
// this.props.routes: array of routes of the user
// this.props.user: the current user
// this.props.requestSingleWorkout(workoutId): retrieves single workout
//   to show
// this.props.deleteWorkout(workoutId): deletes the current workout

class WorkoutShow extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillReceiveProps(newProps) {
    // fetchs desired route if the new URL does not match the current URL
    // or if the passed down route is undefined
    if (newProps.match.url !== this.props.match.url || this.props.workout === undefined) {
      this.props.requestSingleWorkout(newProps.match.params.workoutId)
      .then(() => this.showMap());
    }
  }

  componentDidMount() {
    this.props.requestSingleWorkout(this.props.match.params.workoutId)
    .then(() => this.showMap());
  }

  // initializes the Google map, displays the workout's path, and centers
  // the map on the route
  showMap() {
    // get JSX element for map container
    const mapElement = this.refs.map;
    // create a new Google map attached to JSX map container
    // using the defined map options above
    this.route_map = new google.maps.Map(mapElement, mapOptions);
    // get the route of the current workout
    const routesArr = this.props.routes;
    this.route = routesArr.find((route) => route.id === this.props.workout.route_id);
    // create a route path from the route's polyline string
    const routePath = google.maps.geometry.encoding.decodePath(this.route.polyline);
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

  render() {
    if (this.props.workout) {
      const workout = this.props.workout;
      const routesArr = this.props.routes;
      const route = routesArr.find((currentRoute) => currentRoute.id === this.props.workout.route_id);

      let hours = Math.floor(workout.duration / 3600);
      let minutes = Math.floor((workout.duration % 3600) / 60);
      let seconds = workout.duration - hours * 3600 - minutes * 60;

      let hoursString = "";
      let minutesString = "";
      let secondsString = "";
      if (hours !== 0) {
        hoursString = `${hours} hr`;
      }
      if (minutes !== 0) {
        minutesString = `${minutes} min`;
      }
      if (seconds !== 0) {
        secondsString = `${seconds} sec`;
      }
      let timeString = hoursString + " " + minutesString + " " + secondsString;
      console.log(timeString);

      return(
        <div className="workouts-show-main">

          <div className="workouts-show-intro">
            <div className="workouts-show-username">{`${this.props.user.username} - Workout`}</div>
          </div>

          <div className="workouts-show-info">

            <div className="workouts-show-date-title">
              <div className="workouts-show-date">
                {`${new Date(workout.created_at).toLocaleDateString()}`}
              </div>
              <div className="workouts-show-title">
                {workout.title}
              </div>
            </div>

            <div className="workout-show-stats">
              <div className="workouts-index-number">
                {`${route.distance} mi`}
                <br/>
                <div className="workouts-stat-workouts-tag">
                  Distance
                </div>
              </div>

              <div className="workouts-index-number">
                {`${route.elevation} ft`}
                <br/>
                <div className="workouts-stat-workouts-tag">
                  Elevation
                </div>
              </div>

              <div className="workouts-index-number">
                {`${workout.speed} mph`}
                <br/>
                <div className="workouts-stat-workouts-tag">
                  Speed
                </div>
              </div>

              <div className="workouts-index-number">
                {timeString}
                <br/>
                <div className="workouts-stat-workouts-tag">
                  Duration
                </div>
              </div>
            </div>

          </div>

          <div className="workouts-show-map" ref="map">
            Map
          </div>

        </div>
      );
    } else {
      return null;
    }
  }
}

export default WorkoutShow;
