import React from 'react';
import ReactDOM from 'react-dom';
import { Link, withRouter } from 'react-router-dom';

// props:
// this.props.route: route object with id, title, polyline, distance,
// and elevation

// Google Static Maps API key:
// AIzaSyDZ1dbiQu3SG8E0ljRYrI_B3VpuLeXIakE

//Google Static Maps request format
// https://maps.googleapis.com/maps/api/staticmap? + parameters

class RouteIndexItem extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    // route object from passed down props
    const route = this.props.route;
    // HTML call to Google Static Maps API
    let mapPic = "https://maps.googleapis.com/maps/api/staticmap?style=feature:administrative%7Cvisibility:off&style=feature:road%7Cvisibility:simplified&style=feature:road.highway.controlled_access%7Cvisibility:off&scale=2&size=300x180&path=weight:2%7Ccolor:0xfc4c02%7Cenc:";
    // attach route's polyline and API key to the HTML request
    mapPic += route.polyline + "&key=AIzaSyDZ1dbiQu3SG8E0ljRYrI_B3VpuLeXIakE";
    return (
      <div className="route-item-box">
        <Link to={`/routes/${route.id}`} className="route-item-title">
          <img src={mapPic} className="route-item-image" />
        </Link>
        <div className="route-item-data">
          <Link to={`/routes/${route.id}`} className="route-item-title">
            {route.title}
          </Link>
          <br/>
          <br/>
          <div className="route-item-dist-elev">
            <div className="route-item-distance-box">
              <div className="route-item-distance">
                {`${route.distance} mi`}
              </div>
              <div className="route-item-distance-tag">Distance</div>
            </div>
            <div className="route-item-elevation-box">
              <div className="route-item-elevation">
                {`${route.elevation} ft`}
              </div>
              <div className="route-item-elvation-tag">Elevation</div>
            </div>
          </div>
          <br/>
         </div>
         <div className="route-item-date-box">
           <div className="route-item-date">
             {`Created on ${new Date(route.created_at).toLocaleDateString()}`}
           </div>
         </div>
      </div>
    );
  }
}

export default RouteIndexItem;
