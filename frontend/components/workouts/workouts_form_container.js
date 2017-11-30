import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { createWorkout } from '../../actions/workout_actions';
import { requestRoutes } from '../../actions/route_actions';
import WorkoutsForm from './workouts_form';

const mapStateToProps = state => ({
  errors: state.errors.workouts,
  routes: Object.values(state.entities.routes)
});

const mapDispatchToProps = dispatch => ({
  createWorkout: workout => dispatch(createWorkout(workout)),
  requestRoutes: () => dispatch(requestRoutes())
});

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(WorkoutsForm));
