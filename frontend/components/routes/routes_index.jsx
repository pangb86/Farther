import React from 'react';
import ReactDOM from 'react-dom';
import { withRouter } from 'react-router-dom';

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
    return(
      <div className="routes-index-box">
        Something for now.
      </div>
    );
  }

}

export default RoutesIndex;
