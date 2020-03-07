// core components/views for Admin layout
// import HomePage from './containers/MainPage/Loadable';
import RolesPage from 'containers/Roles/Loadable';
import DashboardPage from './containers/Dashboard/Loadable';
import UserProfile from './containers/UserProfile/Loadable';

const userGroup = {
	name: 'users',
	icon: 'UserOutlined',
};

const dashboardRoutes = [
	{
		path: '/dashboard',
		name: 'Dashboard',
		rtlName: 'لوحة القيادة',
		icon: 'DashboardOutlined',
		component: DashboardPage,
		layout: '/admin',
	},
	{
		path: '/profile',
		name: 'User Profile',
		rtlName: 'ملف تعريفي للمستخدم',
		icon: 'UserOutlined',
		component: UserProfile,
		layout: '/admin',
	},
	{
		path: '/index',
		group: userGroup,
		name: 'All Users',
		rtlName: 'مستخدمين',
		icon: 'LikeOutlined',
		component: RolesPage,
		layout: '/admin',
	},
	{
		path: '/groups',
		group: userGroup,
		name: 'Users Groups',
		rtlName: 'ملف تعريفي للمستخدم',
		icon: 'LikeOutlined',
		component: RolesPage,
		layout: '/admin',
	},
];

export default dashboardRoutes;
