import styled from 'styled-components';
import { Layout, Menu } from 'antd';
import { animated } from 'react-spring/renderprops';
const { Sider } = Layout;
const { SubMenu } = Menu;

const SiderContainer = styled(Sider)`
	background: #f9f9f900;
	overflow: hidden;
`;

const Logo = styled(animated.div)`
	margin-bottom: 1rem;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	background: #6064f4;
	border-bottom-left-radius: 100%;
	border-bottom-right-radius: 100%;
	will-change: transform;
	position: fixed;
`;
const AvatarImg = styled(animated.img)`
	background-color: ${props => props.theme.colors.white};
	background-clip: initial;
	border: 4px solid
		fade(${props => props.theme.colors.layoutHeaderBackground}, 80%);
	border-radius: 100rem;
	box-shadow: 0 2px 8px
		fade(${props => props.theme.colors.layoutHeaderBackground}, 80%);
	object-fit: cover;
`;
const UsernameTitle = styled(animated.h3)`
	margin: 0.5rem 0 0;
	color: ${props => props.theme.colors.secondaryColor};
	text-align: center;
	font-weight: lighter;
`;
const UserTypeTitle = styled(animated.small)`
	text-align: center;
	color: ${props => props.theme.colors.normalColor};
`;

// menu
const MenuContainer = styled(animated.div)`
	position: absolute;
	top: 30%;
	left: 0;
	flex: 0 0 200px;
	max-width: 200px;
`;

const SiderMenu = styled(Menu)`
	background-color: ${props => props.theme.colors.layoutHeaderBackground};
	border: 1px solid ${props => props.theme.colors.layoutHeaderBackground};
	padding: 1rem 0.5rem;
	border-radius: 1rem;
	height: 50vh;
	position: fixed;
	max-width: 200px;
	.ant-menu-item-selected {
		background-color: ${props =>
			props.theme.colors.layoutBodyBackground} !important;
		width: auto;
		border-radius: 1rem;
		a {
			color: ${props => props.theme.colors.layoutHeaderBackground};
		}
	}
`;

const MenuItem = styled(Menu.Item)`
	border-radius: 1rem;
	a {
		color: ${props => props.theme.colors.white};
		display: inline-flex !important;
		align-items: center;
	}
	&::after {
		transform: none;
		border: 0 !important;
	}
`;

const SubMenuContainer = styled(SubMenu)`
	.ant-menu-submenu-title {
		border-radius: 1rem;
	}
	.ant-menu {
		border-radius: 1rem;
		background-color: lighten(
			${props => props.theme.colors.layoutHeaderBackground},
			30%
		);
		padding: 0.5rem;
	}
	.ant-menu-submenu-arrow {
		&::before,
		&::after {
			background: ${props => props.theme.colors.white} !important;
		}
	}
	.ant-menu-item-selected {
		background-color: ${props =>
			props.theme.colors.layoutBodyBackground} !important;
		a {
			color: ${props => props.theme.colors.layoutHeaderBackground};
		}
	}
`;
const SubMenuTitle = styled.span`
	color: ${props => props.theme.colors.white};
	display: inline-flex !important;
	align-items: center;
`;
const SubMenuItem = styled(Menu.Item)`
	border-radius: 1rem;
	padding-left: 1rem !important;
	a {
		display: inline-flex !important;
		align-items: center;
	}
	&::after {
		transform: none;
		border: 0 !important;
	}
`;

export {
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
};
