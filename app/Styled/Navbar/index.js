import styled from 'styled-components';
import { Button, Layout, Breadcrumb } from 'antd';
const { Header } = Layout;

const MainContainer = styled(Header)`
	padding: 0;
	z-index: 1;
	background: ${props => props.theme.colors.white};
	border: 1px solid #eee;
	border-radius: 5px;
	box-shadow: 0 4px 20px 0 rgba(0, 0, 0, 0.09);
	margin: 24px 24px 10px 24px;
`;
const TriggerBtn = styled(Button)`
	color: rgba(0, 0, 0, 0.65);
	border: 0;
	margin-left: 1rem;
	line-height: 0;
`;
const BreadcrumbContainer = styled(Breadcrumb)`
	margin: 0 1rem;
	.ant-breadcrumb-link {
		display: inline-flex;
		align-items: center;
		box-sizing: border-box;
		padding: 6px 20px !important;
		border-radius: 20px;
		text-transform: capitalize;
		background: #ebeef3;
	}
`;
export { MainContainer, TriggerBtn, BreadcrumbContainer };
