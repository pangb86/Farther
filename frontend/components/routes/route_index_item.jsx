import React from 'react';
import ReactDOM from 'react-dom';
import { withRouter } from 'react-router-dom';


// props:
// this.props.route: route object with id, title, polyline, distance,
// and elevation
class RouteIndexItem extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log(this.props);
    return (
      <div className="route-item-box">
        <h1 className="route-item-title">{this.props.route.title}</h1>
      </div>
    );
  }
}

export default RouteIndexItem;
