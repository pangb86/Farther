import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { requestSingleWorkout, deleteWorkout } from '../../actions/workout_actions';
import WorkoutShow from './workout_show';

const mapStateToProps = (state, ownProps) => ({
  workout: state.entities.workouts[ownProps.match.params.workoutId],
  routes: Object.values(state.entities.routes),
  user: state.session.currentUser
});

const mapDispatchToProps = dispatch => ({
  requestSingleWorkout: workoutId => dispatch(requestSingleWorkout(workoutId)),
  deleteWorkout: workoutId => dispatch(deleteWorkout(workoutId))
});

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(WorkoutShow));
