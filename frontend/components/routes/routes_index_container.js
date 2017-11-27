import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { requestRoutes } from '../../actions/route_actions';
import RoutesIndex from './routes_index';

const mapStateToProps = state => ({
  routes: Object.values(state.entities.routes)
});

const mapDispatchToProps = dispatch => ({
  requestRoutes: () => dispatch(requestRoutes())
});

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(RoutesIndex));
