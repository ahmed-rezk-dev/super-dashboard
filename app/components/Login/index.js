import styled from 'styled-components';
import { Row, Button } from 'antd';
import Card from 'components/Card';

const MainContainer = styled.div`
	background-color: ${props => props.theme.colors.defaultColor};
	border: 0;
	height: 100%;
	margin: 0;
	padding: 0;
	position: relative;
	min-height: 100vh;
	overflow: hidden;
`;

const LoginHeader = styled(Row)`
	position: relative;
	display: flex;
	flex-direction: column;
	background: -webkit-linear-gradient(
		3deg,
		${props => props.theme.colors.infoColor},
		${props => props.theme.colors.primaryColor}
	) !important;
	background: linear-gradient(
		87deg,
		${props => props.theme.colors.infoColor},
		${props => props.theme.colors.primaryColor}
	) !important;
	padding-top: 2rem;
	padding-bottom: 10rem;
	text-align: center;
	${props =>
		props.theme.grid.xxl(`
		padding-top: 9rem;
		padding-bottom: 13rem;
	`)}
`;

const Text = styled.p`
	text-align: center;
	color: ${props => props.theme.colors.white};
`;
const Title = styled.h1`
	text-align: center;
	color: ${props => props.theme.colors.white};
	font-size: 2.5rem;
`;

const Separator = styled.div`
	left: 0;
	right: 0;
	width: 100%;
	top: auto;
	bottom: 0;
	position: absolute;
	pointer-events: none;
	-webkit-transform: translateZ(0);
	transform: translateZ(0);
	overflow: hidden;
	.separator-polygon {
		fill: ${props => props.theme.colors.defaultColor};
	}
`;

const LoginFormContainer = styled(Row)`
	.ant-form-explain {
		text-align: left;
	}
	.login-form-button {
		margin: 1.5rem 0;
		padding-left: 2rem;
		padding-right: 2rem;
	}
`;

const LoginFooterContainer = styled.div`
	display: grid;
	justify-content: center;
	align-content: space-around;
	position: absolute;
	bottom: 0;
	left: 0;
	right: 0;
	color: ${props => props.theme.colors.normalColor};
`;

const LoginFooterLinksContainer = styled.div`
	display: flex;
	justify-content: space-around;
	padding: 1rem 2rem;
	.ant-btn-icon-only.ant-btn-lg {
		padding: 0;
	}
`;

const FormCard = styled(Card)`
	margin-top: -8rem;
	min-width: 28rem;
	max-width: 28rem;
`;

const FormCardInfo = styled.div`
	text-align: left;
	color: ${props => props.theme.colors.disabledColor};
	align-items: center;
`;

const LoginFormButton = styled(Button)`
	margin: 0;
	margin-bottom: 0.5rem;
	padding-left: 2rem;
	padding-right: 2rem;
	${props =>
		props.theme.grid.lg(`
		margin: 1.5rem 0;
	`)}
`;

export {
	LoginHeader,
	MainContainer,
	Text,
	Title,
	Separator,
	LoginFormContainer,
	LoginFooterContainer,
	LoginFooterLinksContainer,
	FormCard,
	FormCardInfo,
	LoginFormButton,
};
