import React from 'react';
import {
  Route,
  Redirect,
  Switch,
  Link,
  HashRouter
} from 'react-router-dom';
import { AuthRoute, ProtectedRoute } from '../util/route_util';
// React components
import NavbarContainer from './navbar/navbar_container';
import SessionFormContainer from './session_form/session_form_container';
import Splash from './splash/splash';
import RoutesFormContainer from './routes/routes_form_container';
import RoutesIndexContainer from './routes/routes_index_container';
import RoutesShowContainer from './routes/route_show_container';
import WorkoutsFormContainer from './workouts/workouts_form_container';
import WorkoutsIndexContainer from './workouts/workouts_index_container';
import WorkoutShowContainer from './workouts/workout_show_container';
import UserProfileContainer from './user_profile/user_profile_container';

const App = () => (
  <div className="outer-main-div">
    <NavbarContainer />
    <Switch>
      <AuthRoute path="/splash" component={Splash} />
      <AuthRoute path="/login" component={SessionFormContainer} />
      <AuthRoute path="/signup" component={SessionFormContainer} />
      <ProtectedRoute path="/workouts/new" component={WorkoutsFormContainer} />
      <ProtectedRoute exact path="/workouts/:workoutId" component={WorkoutShowContainer} />
      <ProtectedRoute path="/workouts" component={WorkoutsIndexContainer} />
      <ProtectedRoute path="/routes/new" component={RoutesFormContainer} />
      <ProtectedRoute exact path="/routes/:routeId" component={RoutesShowContainer} />
      <ProtectedRoute path="/routes" component={RoutesIndexContainer} />
      <ProtectedRoute path="/" component={UserProfileContainer} />
    </Switch>
  </div>
);

export default App;
