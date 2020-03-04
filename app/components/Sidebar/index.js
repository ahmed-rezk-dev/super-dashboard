/**
 *
 * Sidebar
 *
 */

import React, { memo } from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Layout, Menu } from 'antd';
import * as Icons from '@ant-design/icons';
import { Spring, animated } from 'react-spring/renderprops';
// Style
import './style.less';
// Images
import userImage from '../../assets/img/user.jpg';
const { Sider } = Layout;
const { SubMenu } = Menu;
const Sidebar = ({ toggle, collapsed, routes, history, currentRoute }) => {
	const currentPath = history.location.pathname;

	// Convert Routes tp groups
	const groupBy = (list, keyGetter) => {
		const map = new Map();
		list.forEach(route => {
			const key = keyGetter(route);
			if (route.group) {
				const collection = map.get(key);
				if (!collection) {
					map.set(key, [route]);
				} else {
					collection.push(route);
				}
			} else {
				const collection = map.get('single');
				if (!collection) {
					map.set('single', [route]);
				} else {
					collection.push(route);
				}
			}
		});
		return map;
	};
	const getRoutes = groupBy(routes, route => route.group);
	// Links map
	const links = [];
	getRoutes.forEach((prop, key) => {
		if (key === 'single') {
			prop.forEach(singleItem => {
				const Icon = Icons[singleItem.icon];
				const linkTo = singleItem.layout + singleItem.path;
				links.push(
					<Menu.Item key={linkTo} className="menuItem">
						<NavLink to={linkTo} key={singleItem.path}>
							<Icon />
							<span>{singleItem.name}</span>
						</NavLink>
					</Menu.Item>
				);
			});
		} else {
			const SubMenuIcon = Icons[key.icon];
			links.push(
				<SubMenu
					className="navbar-subMenu"
					key={key.name}
					title={
						<span className="navbar-subMenu-title">
							<SubMenuIcon />
							<span>{key.name}</span>
						</span>
					}
				>
					{prop.map(groupItem => {
						const linkTo = `${groupItem.layout}/${groupItem.group.name}${groupItem.path}`;
						const GroupItemIcon = Icons[groupItem.icon];
						return (
							<Menu.Item key={linkTo} className="navbar-subMenu-item">
								<NavLink to={linkTo} key={groupItem.path}>
									<GroupItemIcon />
									<span>{groupItem.name}</span>
								</NavLink>
							</Menu.Item>
						);
					})}
				</SubMenu>
			);
		}
	});

	return (
		<Sider
			collapsible
			collapsed={collapsed}
			onCollapse={toggle}
			className="sidebar"
			trigger={null}
		>
			<Spring
				native
				from={{ opacity: 0, marginTop: -1000 }}
				to={{
					opacity: 1,
					marginTop: 0,
					minHeight: collapsed ? '80px' : '176px',
					minWidth: collapsed ? '80px' : '200px',
					width: collapsed ? '65px' : '100px',
					height: collapsed ? '65px' : '100px',
					fontSize: collapsed ? '0rem' : '1rem',
					marginRight: collapsed ? '0' : '200px',
				}}
			>
				{({
					minHeight,
					minWidth,
					width,
					height,
					fontSize,
					opacity,
					marginTop,
				}) => (
					<>
						<animated.div
							className="logo"
							style={{
								minHeight,
								minWidth,
								opacity,
								marginTop,
							}}
						>
							<animated.img
								src={userImage}
								className="avatar-img"
								style={{ width, height }}
							/>
							<animated.h3 className="user-title" style={{ fontSize }}>
								Ahmed Rezk
							</animated.h3>
							<animated.small
								className="user-type-title"
								style={{ fontSize: collapsed ? '0rem' : '0.7rem' }}
							>
								Super Admin
							</animated.small>
						</animated.div>
					</>
				)}
			</Spring>
			<Spring
				native
				from={{ left: '-210px' }}
				to={{
					left: '0px',
					minWidth: collapsed ? 'auto' : '200px',
				}}
			>
				{({ left, minWidth }) => (
					<>
						<animated.div className="menuContainer" style={{ left, minWidth }}>
							<Menu
								defaultSelectedKeys={[currentPath]}
								defaultOpenKeys={[
									currentRoute.group ? currentRoute.group.name : null,
								]}
								mode="inline"
								className="menu"
							>
								{links}
							</Menu>
						</animated.div>
					</>
				)}
			</Spring>
		</Sider>
	);
};
Sidebar.propTypes = {
	collapsed: PropTypes.bool,
	toggle: PropTypes.func,
	routes: PropTypes.array,
	history: PropTypes.object,
	currentRoute: PropTypes.object,
};

export default memo(Sidebar);
