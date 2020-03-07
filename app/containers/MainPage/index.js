/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Scrollbars } from 'react-custom-scrollbars';
// Antd
import { Layout } from 'antd';
// core components
import Navbar from 'components/Navbar';
import Footer from 'components/Footer';
// Routes
import { connect } from 'react-redux';
import { compose } from 'redux';
import { setCurrentRoute } from 'containers/App/actions';
import { useInjectReducer } from 'utils/injectReducer';
import routes from '../../routes';
import reducer from '../App/reducer';
const Sidebar = React.lazy(() => import('components/Sidebar'));
// messages
// import messages from './messages';
const { Content } = Layout;

export function HomePage({ history, setRoute, globalState }) {
	useInjectReducer({ key: 'global', reducer });
	const [collapsed, setCollapsed] = useState(false);
	const { currentRoute } = globalState;
	const toggle = () => {
		setCollapsed(!collapsed);
	};
	const childProps = { collapsed, toggle, history, currentRoute };

	// Remove Admin from current path
	const currentPath = history.location.pathname;
	// Convert current path to array of strings
	const routeInfo = routes.find(element =>
		element.group
			? `${element.layout}/${element.group}${element.path}`
			: element.layout + element.path === currentPath
	);

	setRoute(routeInfo);

	const switchRoutes = (
		<Switch>
			{routes.map(prop => {
				if (prop.layout === '/admin') {
					const linkTo =
						prop.group === undefined ? (
							<Route
								path={prop.layout + prop.path}
								component={prop.component}
								key={prop.path}
							/>
						) : (
							<Route
								path={`${prop.layout}/${prop.group.name}${prop.path}`}
								component={prop.component}
								key={prop.path}
							/>
						);
					return linkTo;
				}
				return null;
			})}
			<Redirect from="/admin" to="/admin/dashboard" />
		</Switch>
	);
	return (
		<Layout style={{ minHeight: '100vh' }}>
			{/* Sidebar */}
			<Sidebar {...childProps} routes={routes} />
			<Layout>
				{/* Navbar  */}
				<Navbar {...childProps} />
				{/* Content */}
				<Scrollbars>
					<Content style={{ marginTop: 30 }}>
						<div style={{ padding: 24, minHeight: 360 }}>{switchRoutes}</div>
					</Content>
					{/* Footer */}
					<Footer />
				</Scrollbars>
			</Layout>
		</Layout>
	);
}

HomePage.propTypes = {
	history: PropTypes.object,
	setRoute: PropTypes.func,
	globalState: PropTypes.object,
};

const mapStateToProps = state => ({
	globalState: state.global,
});

function mapDispatchToProps(dispatch) {
	return {
		setRoute: data => dispatch(setCurrentRoute(data)),
	};
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(HomePage);
