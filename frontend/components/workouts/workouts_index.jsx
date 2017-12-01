import React from 'react';
import ReactDOM from 'react-dom';
import { Link, withRouter } from 'react-router-dom';
import WorkoutIndexItem from './workout_index_item';

// props:
// this.props.workouts: array of all the user's workouts
// this.props.routes: array of all the routes of the workouts
// this.props.requestWorkouts(): retrieve all the user's workouts

class WorkoutsIndex extends React.Component {
  constructor(props){
    super(props);
  }

  componentDidMount() {
    this.props.requestWorkouts();
  }

  componentWillReceiveProps(newProps) {
    if (newProps.match.url !== this.props.match.url) {
      this.props.requestWorkouts();
    }
  }

  render() {
    console.log(this.props);
    if (this.props.workouts.length > 0) {
      const routesArr = this.props.routes;
      const workoutsArr = this.props.workouts;
      // declare variables for workouts stats
      let totalDistance = 0;
      let averageDistance = 0;
      let totalElevation = 0;
      let averageElevation = 0;
      let totalSpeed = 0;
      let averageSpeed = 0;
      let totalTime = 0;
      // calculates workout stat totals
      for (var i = 0; i < workoutsArr.length; i++) {
        const currentWorkout = workoutsArr[i];
        const currentRoute = routesArr.find((route) => route.id === currentWorkout.route_id);
        totalDistance += currentRoute.distance;
        totalElevation += currentRoute.elevation;
        totalSpeed += currentWorkout.speed;
        totalTime += currentWorkout.duration;
      }
      // caclulate workout average stats
      averageDistance = Math.round(totalDistance / workoutsArr.length * 10) / 10;
      averageElevation = Math.round(totalElevation / workoutsArr.length);
      averageSpeed = Math.round(totalSpeed / workoutsArr.length * 10) / 10;
      totalDistance = Math.round(totalDistance * 10) / 10;
      // calculate total workout time in hours and minutes
      let hours = Math.floor(totalTime / 3600);
      let minutes = Math.round((totalTime % 3600) / 60);
      // converts the total time into a string
      let timeString = "";
      if (hours === 0) {
        timeString = `${minutes} min`;
      } else if (minutes === 0) {
        timeString = `${hours} hr`;
      } else {
        timeString = `${hours} hr ${minutes} min`;
      }

      return(
        <div className="workouts-index-box">
          <div className="workouts-index-intro">
            <h1 className="workouts-index-header">My Workouts</h1>
            <Link className="routes-create-link" to="/workouts/new">
              <button className="workouts-index-create-button">
                Create New Workout
              </button>
            </Link>
          </div>
          <div className="workouts-stats-box">
            <div className="workouts-index-number">
              {workoutsArr.length}
              <div className="workouts-stat-workouts-tag">
                Workouts
              </div>
            </div>
            <div className="workouts-index-number">
              {timeString}
              <div className="workouts-stat-workouts-tag">
                Total Time
              </div>
            </div>
            <div className="workouts-index-number">
              {`${totalDistance} mi`}
              <br/>
              <div className="workouts-stat-workouts-tag">
                Total Distance
              </div>
            </div>
            <div className="workouts-index-number">
              {`${totalElevation} ft`}
              <div className="workouts-stat-workouts-tag">
                Total Elevation
              </div>
            </div>
            <div className="workouts-index-number">
              {`${averageSpeed} mph`}
              <div className="workouts-stat-workouts-tag">
                Average Speed
              </div>
            </div>
          </div>
          <div className="workouts-index-list-box">
            <ul className="workouts-index-list">
              {
                workoutsArr.map(workout => (
                  <WorkoutIndexItem
                    key={`index-${workout.id}`}
                    workout={workout}
                    route={routesArr.find((route) => route.id === workout.route_id)}
                  />
                ))
              }
            </ul>
          </div>
        </div>
      );
    } else {
      return(
        <div className="workouts-index-box">
          <div className="workouts-index-intro">
            <h1 className="workouts-index-header">My Workouts</h1>
            <Link className="routes-create-link" to="/workouts/new">
              <button className="workouts-index-create-button">
                Create New Workout
              </button>
            </Link>
          </div>
        </div>
      );
    }
  }


}

export default WorkoutsIndex;
