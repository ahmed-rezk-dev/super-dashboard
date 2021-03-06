import styled from 'styled-components';
const Card = styled.div`
	background: ${props => props.theme.colors.white};
	max-width: 600px;
	min-height: fit-content;
	border-radius: 12px;
	box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
	box-sizing: border-box;
	margin-right: auto;
	margin-left: auto;
	margin-top: 5rem;
	margin-bottom: 5rem;
	padding: 1rem 3rem;
	${props =>
		props.theme.grid.lg(`
		padding: 3rem 4.5rem;
	`)}
`;

const CardHeader = styled.div`
	margin-bottom: 2rem;
	text-align: center;
`;

export { Card, CardHeader };
