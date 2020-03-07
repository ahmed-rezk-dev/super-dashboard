/**
 *
 * MainContainer
 *
 */
import styled from 'styled-components';

const MainContainer = styled.div`
	background-color: ${props => props.theme.colors.primaryColor};
	border: 0;
	height: 100%;
	margin: 0;
	padding: 0;
	position: relative;
	min-height: 100vh;
	overflow: hidden;
`;
export default MainContainer;
