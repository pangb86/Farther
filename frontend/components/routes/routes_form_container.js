import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { createRoute } from '../../actions/route_actions';
import RoutesForm from './routes_form';

const mapStateToProps = state => ({
  errors: state.errors.routes
});

const mapDispatchToProps = dispatch => ({
  createRoute: route => dispatch(createRoute(route))
});

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(RoutesForm));
