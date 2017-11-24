import React from 'react';
import ReactDOM from 'react-dom';
import { withRouter } from 'react-router-dom';
import MarkerManager from '../../util/marker_manager';

const mapOptions = {
  center: {
    lat: 39.9612,
    lng: -82.9988
  }, // San Francisco coords
  zoom: 10
};

class Routes extends React.Component {
  constructor(props){
    super(props);
  }

  componentDidMount() {
    console.log(this.props);
    const map = this.refs.map;
    this.map = new google.maps.Map(map, mapOptions);
    this.MarkerManager = new MarkerManager(this.map);
  }

  render() {
    return (
      <div className="routes-map-box">
        <div className="routes-map" ref="map">
          Map
        </div>
      </div>
    );
  }
}

export default Routes;
