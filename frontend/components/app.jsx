import React from 'react';
import {
  Route,
  Redirect,
  Switch,
  Link,
  HashRouter
} from 'react-router-dom';
import { AuthRoute, ProtectedRoute } from '../util/route_util';
import NavbarContainer from './navbar/navbar_container';
import SessionFormContainer from './session_form/session_form_container';
import Splash from './splash/splash';
import Workouts from './workouts/workouts';
import RoutesFormContainer from './routes/routes_form_container';
import RoutesIndexContainer from './routes/routes_index_container';

const App = () => (
  <div className="outer-main-div">
    <NavbarContainer />
    <Switch>
      <AuthRoute path="/splash" component={Splash} />
      <AuthRoute path="/login" component={SessionFormContainer} />
      <AuthRoute path="/signup" component={SessionFormContainer} />
      <ProtectedRoute path="/routes" component={RoutesIndexContainer} />
      <ProtectedRoute path="/" component={RoutesFormContainer} />
    </Switch>
  </div>
);

export default App;
