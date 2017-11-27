import React from 'react';
import ReactDOM from 'react-dom';
import { Link, withRouter } from 'react-router-dom';

// props:
// this.props.route: route object with id, title, polyline, distance,
// and elevation

class RouteIndexItem extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log(this.props);
    const route = this.props.route
    return (
      <div className="route-item-box">
        <h1 className="route-item-title">{route.title}</h1>
        <br/>
        <div className="route-item-date">
          {new Date(route.created_at).toLocaleDateString()}
        </div>
        <br/>
        <div className="route-item-distance">{`${route.distance} mi`}</div>
        <br/>
        <div className="route-item-elevation">{`${route.elevation} ft`}</div>
      </div>
    );
  }
}

export default RouteIndexItem;
