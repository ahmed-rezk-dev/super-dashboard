/**
 *
 * CustomRolesTable
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';
// UI
import MaterialTable from 'material-table';
import TableIcons from 'components/TableIcons';
import messages from './messages';

function CustomRolesTable({
	data,
	addRoles,
	editRoles,
	deleteRoles,
	isLoading,
}) {
	const [state, setState] = React.useState({
		columns: [
			{ title: 'Name', field: 'name' },
			{ title: 'Created at', field: 'createdAt', editable: 'never' },
			{ title: 'Last Update', field: 'updatedAt', editable: 'never' },
		],
	});
	return (
		<MaterialTable
			title={null}
			icons={TableIcons()}
			options={{
				actionsColumnIndex: 4,
				pageSize: 10,
				searchFieldAlignment: 'left',
				searchFieldStyle: { paddingLeft: 0 },
			}}
			columns={state.columns}
			data={data || []}
			editable={{
				onRowAdd: newData =>
					new Promise(resolve => {
						setTimeout(() => {
							resolve();
							addRoles(newData);
						}, 600);
					}),
				onRowUpdate: (newData, oldData) =>
					new Promise(resolve => {
						setTimeout(() => {
							resolve();
							editRoles({
								data: newData,
								index: data.indexOf(oldData),
							});
						}, 600);
					}),
				onRowDelete: oldData =>
					new Promise(resolve => {
						setTimeout(() => {
							resolve();
							deleteRoles({
								index: data.indexOf(oldData),
							});
						}, 600);
						// setTimeout(() => {
						// 	resolve();
						// 	setState(prevState => {
						// 		const stateData = [...prevState.stateData];
						// 		stateData.splice(stateData.indexOf(oldData), 1);
						// 		return { ...prevState, stateData };
						// 	});
						// }, 600);
					}),
			}}
		/>
	);
}

CustomRolesTable.propTypes = {
	data: PropTypes.array.isRequired,
};

export default CustomRolesTable;
