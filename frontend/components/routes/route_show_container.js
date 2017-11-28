import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { requestSingleRoute, deleteRoute } from '../../actions/route_actions';
import RouteShow from './route_show';

const mapStateToProps = (state, ownProps) => ({
  route: state.entities.routes[ownProps.match.params.routeId],
  user: state.session.currentUser
});

const mapDispatchToProps = dispatch => ({
  requestSingleRoute: routeId => dispatch(requestSingleRoute(routeId)),
  deleteRoute: routeId => dispatch(deleteRoute(routeId))
});

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(RouteShow));
