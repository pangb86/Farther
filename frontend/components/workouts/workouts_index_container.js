import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { requestWorkouts } from '../../actions/workout_actions';
import WorkoutsIndex from './workouts_index';

const mapStateToProps = state => ({
  workouts: Object.values(state.entities.workouts),
  routes: Object.values(state.entities.routes)
});

const mapDispatchToProps = dispatch => ({
  requestWorkouts: () => dispatch(requestWorkouts())
});

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(WorkoutsIndex));
