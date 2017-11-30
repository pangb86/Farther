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

  render() {
    if (this.props.workouts[0]) {
      const routesArr = this.props.routes;
      const workoutsArr = this.props.workouts;
      
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

          <div className="workouts-index-list-box">
            <ul className="workouts-index-list">
              {
                workoutsArr.map(workout => (
                  <WorkoutIndexItem
                    key={workout.id}
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
