import React from 'react';
import ReactDOM from 'react-dom';
import { Link, withRouter } from 'react-router-dom';

// props:
// this.props.workout
// this.props.route

class WorkoutIndexItem extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (this.props.route) {
      const route = this.props.route;
      const workout = this.props.workout;
      // HTML call to Google Static Maps API
      let mapPic = "https://maps.googleapis.com/maps/api/staticmap?style=feature:administrative%7Cvisibility:off&style=feature:road%7Cvisibility:simplified&style=feature:road.highway.controlled_access%7Cvisibility:off&scale=2&size=300x180&path=weight:2%7Ccolor:0xfc4c02%7Cenc:";
      // attach route's polyline and API key to the HTML request
      mapPic += route.polyline + "&key=AIzaSyDZ1dbiQu3SG8E0ljRYrI_B3VpuLeXIakE";
      // calculate the ride duration in hours, minutes, and seconds
      let hours = Math.floor(workout.duration / 3600);
      let minutes = Math.floor((workout.duration % 3600) / 60);
      let seconds = workout.duration - hours * 3600 - minutes * 60;
      // convert the duration into a string
      let hoursString = "";
      let minutesString = "";
      let secondsString = "";
      if (hours !== 0) {
        hoursString = `${hours} hr`;
      }
      if (minutes !== 0) {
        minutesString = `${minutes} min`;
      }
      if (seconds !== 0) {
        secondsString = `${seconds} sec`;
      }
      let timeString = hoursString + " " + minutesString + " " + secondsString;

      return (
        <div className="workout-item-box">
          <div className="workout-item-info">
            <div className="workout-item-date-box">
              <div className="workout-item-date">
                {`${new Date(workout.created_at).toLocaleDateString()}`}
              </div>
            </div>
            <Link to={`/workouts/${workout.id}`} className="workout-item-title-link">
              {workout.title}
            </Link>
            <div className="workout-item-distance">{`${route.distance} mi`}</div>
            <div className="workout-item-elevation">{`${route.elevation} ft`}</div>
            <div className="workout-item-speed">{`${workout.speed} mph`}</div>
            <div className="workout-item-duration">{timeString}</div>
          </div>
          <div className="workout-item-map">
            <Link to={`/workouts/${workout.id}`} >
              <img src={mapPic} className="workout-item-image" />
            </Link>
          </div>
        </div>
      );
    } else {
      return null;
    }
  }
}

export default WorkoutIndexItem;
