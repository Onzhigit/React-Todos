import React, { } from 'react';
import { IconButton } from "@material-ui/core";
import { connect } from 'react-redux';
import MaterialTable from 'material-table';
import { tableIcons } from '../pages/Applications/Components/icons';
import InfoIcon from '@material-ui/icons/Info';
import { deepPurple } from '@material-ui/core/colors';

function Regions({ regionsData, setVillage, setDistrict, setType, }) {
	const [data, setData] = React.useState([]);

	const showInfo = (propsData) => {
		console.log(propsData.data);
		if (propsData.data.area1) {
			setDistrict(propsData.data);
			setVillage({ area_id: null });
			setType(propsData.data.type);
		}

		if (propsData.data.area2) {
			setVillage(propsData.data);
			setDistrict({area_id: null});
			setType("type_2");
		}
	};


	React.useEffect(() => {
		let newData = [];
		regionsData && regionsData.forEach(item => {
			newData.push({
				area_id: item.area_id,
				area_name: item.area_name,
				coordinate: item.coordinate
			});
			if (item.area1) {
				item.area1.forEach(itm => {
					newData.push({
						area_id: itm.area_id,
						area_name: itm.area_name,
						parentId: item.area_id,
						coordinate: itm.coordinate,
						area1: true,
						type: 'type_1'
					});
					if (itm.area2) {
						itm.area2.forEach(itm2 => {
							newData.push({
								area_id: itm2.area_id,
								area_name: itm2.area_name,
								parentId: itm.area_id,
								coordinate: itm2.coordinate,
								area2: true,
								type: 'type_2'
							});
						});
					}
				});
			}

		});
		setData(newData);
	}, [regionsData]);
	//console.log(data);
	return (
		<MaterialTable
			icons={ tableIcons }
			components={ {
				Action: props => {
					const { data: { parentId } } = props;
					if (parentId) {
						return (
							<>
								<IconButton aria-label="delete" size="medium" color="primary" onClick={ () => showInfo(props) } >
									<InfoIcon style={{ color: deepPurple[700] }} fontSize="inherit" />
								</IconButton>
							</>
						);
					} else {
						return (
							<React.Fragment></React.Fragment>
						);
					}
				},
			} }
			actions={ [
				rowData => ({
					icon: '',
					tooltip: 'Добавьте группу',
					onClick: (event, rowData) => console.log("You want to delete " + rowData.name),
					hidden: rowData.parentId
				})
			] }
			title="Области Казахстана"
			data={ data }
			columns={ [
				{ title: 'Регион', field: 'area_name' },
			] }
			parentChildData={ (row, rows) => rows.find(a => a.area_id === row.parentId) }
			options={ {
				selection: false,
				columnsButton: true,
				actionsColumnIndex: -1
			} }
			localization={ {
				header: {
					actions: "Информация"
				},
			} }
		/>
	);
}

export default connect()(Regions);
