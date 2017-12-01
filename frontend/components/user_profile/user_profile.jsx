import React from 'react';
import ReactDOM from 'react-dom';
import { withRouter } from 'react-router-dom';
import RouteIndexItem from '../routes/route_index_item';

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
    this.props.requestRoutes();
    this.props.requestWorkouts();
  }

  render() {
    if (this.props.routes) {
      const routesArr = this.props.routes.slice(Math.max(this.props.routes.length - 3, 1));
      console.log(routesArr);
      return(
        <div className="user-profile-main">

          <div className="user-workouts-main">
            <div className="user-workouts-intro">
              Recent Workouts
            </div>
            <div className="user-workouts-list">

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
                    <RouteIndexItem key={`user-${route.id}`} route={route} />
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
