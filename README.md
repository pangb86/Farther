# Farther

[Farther](http://farther.herokuapp.com/ "Farther")

Farther is a full-stack web application inspired by Strava. It utilizes Ruby-on-Rails on the backend with a PostgreSQL database, and React.js with a Redux architectural framework on the frontend. Extensive use of the Google Maps API is leveraged in order to create and display custom routes. Also, the Google Static Maps API and Google Elevation service is used to generate map images and obtain elevation information respectively.

## Key Features

### Route Creation

Users are able to create custom routes using Google Maps. They may simply click any two points on the map to lay down markers and Farther will use the Google Maps API to display the route on the map, along with it's total distance and elevation gain. Users may also toggle the Bicycling layer on the map on the click of the button and also add a custom title.

![alt text](https://raw.githubusercontent.com/pangb86/Farther/master/readme_images/route_creation.png "Route Creation")

### Route Display

A user's routes are displayed in a routes index page. Each route has an image of the route on a map which is generated by the Google Static Maps API, along with it's title, distance, elevation gain, and when it was created. A user may click on a specific route to open the route's show page, which display's a Google map with the route's path rendered along with the attributes previously mentioned. User's may delete routes that are not associated with any workouts on the click of a button.

![alt text](https://raw.githubusercontent.com/pangb86/Farther/master/readme_images/route_index.png "Route Index")


### Workout Creation

Users can log workouts using the custom routes that they have created. Routes are rendered on a Google map that changes based on the route selection from the dropdown menu. The 'Create Workout' button is disabled until a route is selected from the dropdown menu. Incomplete form errors are displayed as a tooltip upon hovering over a pulsing exclamation point which only displays based on which input field is un-filled. The workout can be given a title, description, and duration. The average speed of the workout is calculated based on route distance and ride duration. 

![alt text](https://raw.githubusercontent.com/pangb86/Farther/master/readme_images/workout_creation.png "Workout Creation")

### Workout Display

A user's workouts are displayed in a workouts index page. Each workout has an image of the route on a map which is generated by the Google Static Maps API, along with it's title, distance, elevation gain, duration, and creation date. A user may click on a workout to display it's show page. A workout's show page has a Google map with the workout's route rendered on it, along with the previously mentioned attributes.

![alt text](https://raw.githubusercontent.com/pangb86/Farther/master/readme_images/workout_index.png "Workout Display")

### User Profile & Workout Statistics

The user profile page displays personal best statistics along with the user's most recent workouts and custom routes. The personal best stats include longest rider in terms of distance and duration, fastest ride, and largest elevation gain for one ride. On the workout index page, the aggregate statistics of the user's workouts are displayed in a top banner. It shows total workout time, elevation gain, and distance, along with the total number of workouts and the average speed

![alt text](https://raw.githubusercontent.com/pangb86/Farther/master/readme_images/user_profile.png "User Profile")

## Code Snippets

### Placing and removing markers on the Google Map 
```javascript
addMapListeners() {
    // adds event listener for clicking on the Google map
    // calls placeMarker when map is clicked
    google.maps.event.addListener(this.route_map, 'click', (event) => {
      placeMarker(event.latLng);
    });
    // place marker callback
    const placeMarker = (location) => {
      // constrains total number of markers to 2
      if (this.state.markers.length < 2) {
        // place marker at the point clicked on the map
        // position is a Google Maps LatLng object
        const marker = new google.maps.Marker({
          position: location,
          map: this.route_map
        });
        // add marker to the markers array
        this.state.markers.push(marker);
        // add event listener to every marker that removes it
        // upon clicking on it
        google.maps.event.addListener(marker, 'click', () => {
          // removes marker from the map
          marker.setMap(null);
          // removes marker from the markers array
          const markerIdx = this.state.markers.indexOf(marker);
          if (markerIdx > -1) {
            this.state.markers.splice(markerIdx, 1);
          }
        });
      }
      // if there are two markers make a directions request
      if (this.state.markers.length === 2) {
        this.createRouteRequest();
      }
    };
  }
```
### Workout creation logic
```javascript
// fires on clicking the create workout button
  handleSubmit(e) {
    e.preventDefault();
    // calculate duration in seconds
    if (this.state.seconds === "") {
      var seconds = 0;
    } else {
      var seconds = this.state.seconds
    }
    const duration = Math.abs(this.state.hours * 3600) + Math.abs(this.state.minutes * 60) + Math.abs(seconds);
    // calcualte speed in miles per hour
    let speed = (this.currentRoute.distance / duration) * 3600;
    // rounds speed the one decimal
    speed = Math.round(speed * 10) / 10;
    // creates workouts object for createWorkout AJAX call
    const workouts = {
      title: this.state.title,
      description: this.state.description,
      duration: duration,
      speed: speed,
      route_id: this.state.route_id
    };
    // show duration error if invalid duration was entered
    if (duration === 0) {
      this.setState({showDurationError: true});
    } else {
      this.setState({showDurationError: false});
    // AJAX call for creating the workout
    // redirect to routes index page
      this.props.createWorkout({ workouts })
      .then(() => this.props.history.push("/workouts"));
    }
  }
  ```

## Future Add-ons

Planned additions to this project include user interaction, graphical data of routes/workouts, and enriched custom route creation. User interaction feature will include the ability to follow other user's to view their rides and the ability to comment and like their workouts. Graphical data of routes will include an elevation profile over the route's path. Additionally, a user's number of activities will be plotted over time.  Route creation can be improved by allowing user's to define or delete multiple waypoints and drag markers to modify the route. Route and workout editing is also a feature that can be added.