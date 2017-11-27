import React from 'react';
import ReactDOM from 'react-dom';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
import RouteIndexItem from './route_index_item';

// props:
// this.props.routes: array of all the routes for a user
// this.props.requestRoutes(): retrieve all routes for a user
// from the server

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
        <h1 className="routes-index-header">My Routes</h1>
        <Link className="routes-create-link" to="/signup">
          <button className="routes-index-create-button">
            Create New Route
          </button>
        </Link>
        <ul className="routes-index-list">
          {
            routesArr.map(route => (
              <RouteIndexItem route={route} />
            ))
          }
        </ul>
      </div>
    );
  }

}

export default RoutesIndex;