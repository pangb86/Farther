import React from 'react';
import ReactDOM from 'react-dom';
import { Link, withRouter } from 'react-router-dom';
import RouteIndexItem from './route_index_item';

// props:
// this.props.routes: array of all the routes for a user
// this.props.requestRoutes(): retrieve all routes for a user
//   from the server

class RoutesIndex extends React.Component {
  constructor(props){
    super(props);
  }

  componentDidMount() {
    this.props.requestRoutes();
  }

  render() {
    const routesArr = this.props.routes;
    return(
      <div className="routes-index-box">
        <div className="route-index-intro">
          <h1 className="routes-index-header">My Routes</h1>
          <Link className="routes-create-link" to="/routes/new">
            <button className="routes-index-create-button">
              Create New Route
            </button>
          </Link>
        </div>
        <div className="routes-index-list-box">
          <ul className="routes-index-list">
            {
              routesArr.map(route => (
                <RouteIndexItem key={route.id} route={route} />
              ))
            }
          </ul>
        </div>

      </div>
    );
  }

}

export default RoutesIndex;
