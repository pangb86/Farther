import React from 'react';
import ReactDOM from 'react-dom';
import { withRouter } from 'react-router-dom';
import RouteIndexItem from '../routes/route_index_item';
import WorkoutIndexItem from '../workouts/workout_index_item';

// props:
// this.props.workouts: array of the user's workouts
// this.props.routes: array of the user's routes
// this.props.user: current user
// this.props.requestRoutes(): retrieves all the user's routes
// this.props.requestWorkouts(): retrieves all the user's workouts

class UserProfile extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.requestRoutes()
    .then(() => this.props.requestWorkouts());
  }

  componentWillReceiveProps(newProps) {
    if (newProps.match.url !== this.props.match.url) {
      this.props.requestRoutes()
      .then(() => this.props.requestWorkouts());
    }
  }

  render() {
    if (this.props.routes) {
      // get the last 4 routes made
      let routesArr = [];
      let workoutsArr = [];
      if (this.props.routes.length > 4) {
        routesArr = this.props.routes.slice(-4);
      } else {
        routesArr = this.props.routes;
      }
      // gets the last 4 workouts
      if (this.props.workouts.length > 4) {
        workoutsArr = this.props.workouts.slice(-4);
      } else {
        workoutsArr = this.props.workouts;
      }
      // array of the all the user's workouts
      const allWorkoutsArr = this.props.workouts;
      const allRoutesArr = this.props.routes;
      // get the personal bests for the user
      let longestDuration = 0;
      let longestDistance = 0;
      let fastestSpeed = 0;
      let mostElevation = 0;
      // loop through all the user's workouts
      for (var i = 0; i < allWorkoutsArr.length; i++) {
        let currentWorkout = allWorkoutsArr[i];
        let currentRoute = allRoutesArr.find((route) => route.id === currentWorkout.route_id);

        if (longestDuration < currentWorkout.duration) {
          longestDuration = currentWorkout.duration;
        }
        if (longestDistance < currentRoute.distance) {
          longestDistance = currentRoute.distance;
        }
        if (fastestSpeed < currentWorkout.speed) {
          fastestSpeed = currentWorkout.speed;
        }
        if (mostElevation < currentRoute.elevation) {
          mostElevation = currentRoute.elevation;
        }
      }
      // calculate the ride duration in hours, minutes, and seconds
      let hours = Math.floor(longestDuration / 3600);
      let minutes = Math.floor((longestDuration % 3600) / 60);
      let seconds = longestDuration - hours * 3600 - minutes * 60;
      // convert the duration into a string
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

      return(
        <div className="user-profile-main">
          <div className="user-stats-box">
            <div className="workouts-index-number">
              {allWorkoutsArr.length}
              <div className="workouts-stat-workouts-tag">
                Workouts
              </div>
            </div>
            <div className="workouts-index-number">
              {`${longestDistance} mi`}
              <div className="workouts-stat-workouts-tag">
                Longest Distance
              </div>
            </div>
            <div className="workouts-index-number">
              {timeString}
              <br/>
              <div className="workouts-stat-workouts-tag">
                Longest Duration
              </div>
            </div>
            <div className="workouts-index-number">
              {`${mostElevation} ft`}
              <div className="workouts-stat-workouts-tag">
                Largest Elevation Gain
              </div>
            </div>
            <div className="workouts-index-number">
              {`${fastestSpeed} mph`}
              <div className="workouts-stat-workouts-tag">
                Fastest Ride
              </div>
            </div>
          </div>
          <div className="user-workouts-main">
            <div className="user-workouts-intro">
              Recent Workouts
            </div>
            <div className="user-workouts-list-box">
              <ul className="workouts-index-list">
                {
                  workoutsArr.map(workout => (
                    <WorkoutIndexItem
                      key={`route-${workout.id}`}
                      workout={workout}
                      route={this.props.routes.find((route) => route.id === workout.route_id)}
                    />
                  ))
                }
              </ul>
            </div>
          </div>
          <div className="user-routes-main">
            <div className="user-routes-intro">
              Recent Routes
            </div>
            <div className="user-routes-list-box" >
              <ul className="user-routes-list">
                {
                  routesArr.map(route => (
                    <RouteIndexItem key={`workout-${route.id}`} route={route} />
                  ))
                }
              </ul>
            </div>
          </div>
        </div>
      );
    } else {
      return null;
    }
  }
}

export default UserProfile;
