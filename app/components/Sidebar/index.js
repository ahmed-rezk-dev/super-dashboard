/**
 *
 * Sidebar
 *
 */

import React, { memo } from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Layout, Menu } from 'antd';
import * as Icons from '@ant-design/icons';
import { Spring, animated } from 'react-spring/renderprops';
// Images
import {
	SiderContainer,
	Logo,
	AvatarImg,
	UsernameTitle,
	UserTypeTitle,
	MenuContainer,
	SiderMenu,
	MenuItem,
	SubMenuContainer,
	SubMenuTitle,
	SubMenuItem,
} from 'Styled/Sidebar';
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
					<MenuItem key={linkTo}>
						<NavLink to={linkTo} key={singleItem.path}>
							<Icon />
							<span>{singleItem.name}</span>
						</NavLink>
					</MenuItem>
				);
			});
		} else {
			const SubMenuIcon = Icons[key.icon];
			links.push(
				<SubMenuContainer
					key={key.name}
					title={
						<SubMenuTitle>
							<SubMenuIcon />
							<span>{key.name}</span>
						</SubMenuTitle>
					}
				>
					{prop.map(groupItem => {
						const linkTo = `${groupItem.layout}/${groupItem.group.name}${groupItem.path}`;
						const GroupItemIcon = Icons[groupItem.icon];
						return (
							<SubMenuItem key={linkTo}>
								<NavLink to={linkTo} key={groupItem.path}>
									<GroupItemIcon />
									<span>{groupItem.name}</span>
								</NavLink>
							</SubMenuItem>
						);
					})}
				</SubMenuContainer>
			);
		}
	});

	return (
		<SiderContainer
			collapsible
			collapsed={collapsed}
			onCollapse={toggle}
			trigger={null}
		>
			<Spring
				native
				from={{
					opacity: 0,
					marginTop: -1000,
				}}
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
						<Logo
							style={{
								minHeight,
								minWidth,
								opacity,
								marginTop,
							}}
						>
							<AvatarImg
								src={userImage}
								style={{
									width,
									height,
								}}
							/>
							<UsernameTitle
								style={{
									fontSize,
								}}
							>
								Ahmed Rezk
							</UsernameTitle>
							<UserTypeTitle
								style={{
									fontSize: collapsed ? '0rem' : '0.7rem',
								}}
							>
								Super Admin
							</UserTypeTitle>
						</Logo>
					</>
				)}
			</Spring>
			<Spring
				native
				from={{
					left: '-210px',
				}}
				to={{
					left: '0px',
					minWidth: collapsed ? 'auto' : '200px',
				}}
			>
				{({ left, minWidth }) => (
					<>
						<MenuContainer
							style={{
								left,
								minWidth,
							}}
						>
							<SiderMenu
								defaultSelectedKeys={[currentPath]}
								defaultOpenKeys={[
									currentRoute.group ? currentRoute.group.name : null,
								]}
								mode="inline"
							>
								{links}
							</SiderMenu>
						</MenuContainer>
					</>
				)}
			</Spring>
		</SiderContainer>
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
