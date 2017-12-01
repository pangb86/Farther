import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { requestRoutes } from '../../actions/route_actions';
import { requestWorkouts } from '../../actions/workout_actions';
import UserProfile from './user_profile';

const mapStateToProps = (state, ownProps) => ({
  routes: Object.values(state.entities.routes),
  workouts: Object.values(state.entities.workouts),
  user: state.session.currentUser
});

const mapDispatchToProps = dispatch => ({
  requestWorkouts: () => dispatch(requestWorkouts()),
  requestRoutes: () => dispatch(requestRoutes())
});

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(UserProfile));
