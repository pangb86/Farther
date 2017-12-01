import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { requestSingleRoute, deleteRoute } from '../../actions/route_actions';
import { requestWorkouts } from '../../actions/workout_actions';
import RouteShow from './route_show';

const mapStateToProps = (state, ownProps) => ({
  workouts: Object.values(state.entities.workouts),
  route: state.entities.routes[ownProps.match.params.routeId],
  user: state.session.currentUser
});

const mapDispatchToProps = dispatch => ({
  requestSingleRoute: routeId => dispatch(requestSingleRoute(routeId)),
  requestWorkouts: () => dispatch(requestWorkouts())
});

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(RouteShow));
