import styled from 'styled-components';
import { Dropdown, Menu } from 'antd';

const DropdownContainer = styled(Dropdown)`
	margin-right: 1rem;
`;
const DropMenuItem = styled(Menu.Item)`
	a,
	div {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		text-align: center;
		.anticon {
			margin-right: 0.5rem;
		}
	}
`;

export { DropdownContainer, DropMenuItem };
