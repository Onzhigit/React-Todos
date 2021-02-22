import React from 'react';
import MaterialTable from "material-table";
import { tableIcons } from './icons';
import IconButton from '@material-ui/core/IconButton';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import EditIcon from '@material-ui/icons/Edit';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import Dialog from './Dialog';
import { connect } from 'react-redux';
import { loadServicesAction, addServiceAction, deleteServiceAction, updateSectionAction } from '../actions/services';
import { setAlertAction } from '../actions/alert';
import PropTypes from 'prop-types';



const Services = ({ loadServicesAction, addServiceAction, deleteServiceAction, updateSectionAction, setAlertAction, servicesProps }) => {
	//console.log(kidsGroup);
	const [servicesData, setServicesData] = React.useState([]);
	const [openDialog, setOpenDialog] = React.useState(false);
	const [category, setCategory] = React.useState('');
	const [groupId, setGroupId] = React.useState('');
	const [categoryId, setCategoryId] = React.useState('');
	const [typeAction, setTypeAction] = React.useState('');
	const [chosenGroup, setChosenGroup] = React.useState('');
	const [level, setLevel] = React.useState(null);

	React.useEffect(() => {
		loadServicesAction();
	}, [loadServicesAction]);

	React.useEffect(() => {
		let newData = [];
		servicesProps && servicesProps.forEach(item => {
			newData.push({
				id: item.section_id,
				section_name_ru: item.section_name_ru,
				section_name_kk: item.section_name_kk
			});
			if (item.sub_sections) {
				item.sub_sections.forEach(itm => {
					newData.push({
						id: itm.sub_section_id,
						section_name_ru: itm.section_name_ru,
						section_name_kk: itm.section_name_kk,
						parentId: item.section_id
					});
				});

			}
		});
		setServicesData(newData);
	}, [servicesProps]);

	const openAddDialogFunc = (propsData) => {
		setOpenDialog(true);
		// check if this is to add category, it returns TRUE sunce data = {}
		if (Object.keys(propsData.data).length < 1) {
			setCategory('категорию услуг');
		}

		if (Object.keys(propsData.data).length > 0) {
			console.log('aaa');
			let categoryName = `подкатегорию для категории ${propsData.data.section_name_kk}`;
			setCategory(categoryName);
		}

		let categoryId = propsData.data.id;
		setCategoryId(categoryId);
		setTypeAction('Add');

		if (typeAction === 'Add') {
			setOpenDialog(true);
		}
	};

	const deleteServiceHandle = (propsData, level) => {
		let groupId = propsData.data.id;
		deleteServiceAction(groupId, level);
	};

	const updateGroup = (propsData) => {
		setOpenDialog(true);
		setTypeAction('Edit');
		// check level
		if (propsData.data.parentId) {
			setLevel(1);
		} else {
			setLevel(0);
		}
		setChosenGroup(propsData.data);
		let groupId = propsData.data.id;
		setGroupId(groupId);
		let categoryId = propsData.data.parentId;
		setCategoryId(categoryId);
		if (typeAction === 'Edit') {
			setOpenDialog(true);
		}
	};

	return (
		<>
			<Dialog
				openDialog={ openDialog }
				setOpenDialog={ setOpenDialog }
				category={ category }
				addServiceAction={ addServiceAction }
				groupId={ groupId }
				categoryId={ categoryId }
				updateSectionAction={ updateSectionAction }
				typeAction={ typeAction }
				chosenGroup={ chosenGroup }
				level={ level }
				setCategory={ setCategory }
			/>
			<MaterialTable
				actions={ [
					{
						icon: '',
						tooltip: '',
						onClick: (rowData) => console.log("You want to delete " + rowData.name)
					}, {
						icon: 'add',
						tooltip: 'Add User',
						isFreeAction: true,
						onClick: (event) => alert("You want to add a new row")
					}
				]
				}
				icons={ tableIcons }
				components={ {
					Action: props => {
						const { data } = props;
						if (!data || Object.keys(data).length === 0) {
							return (
								<React.Fragment>
									<IconButton aria-label="delete" size="medium" color="primary" onClick={ () => openAddDialogFunc(props) } >
										<AddCircleIcon fontSize="inherit" />
									</IconButton>
								</React.Fragment>
							);
						}
						const { parentId } = data;
						if (parentId) {
							return (
								<>
									<IconButton aria-label="delete" size="medium" color="primary" onClick={ () => updateGroup(props) }>
										<EditIcon fontSize="inherit" />
									</IconButton>
									<IconButton aria-label="delete" size="medium" color="primary" onClick={ () => deleteServiceHandle(props, 1) }>
										<DeleteOutlineIcon fontSize="inherit" />
									</IconButton>
								</>
							);
						} else {
							return (
								<React.Fragment>
									<IconButton aria-label="delete" size="medium" color="primary" onClick={ () => openAddDialogFunc(props) } >
										<AddCircleIcon fontSize="inherit" />
									</IconButton>
									<IconButton aria-label="delete" size="medium" color="primary" onClick={ () => updateGroup(props) }>
										<EditIcon fontSize="inherit" />
									</IconButton>
									<IconButton aria-label="delete" size="medium" color="primary" onClick={ () => deleteServiceHandle(props, 0) }>
										<DeleteOutlineIcon fontSize="inherit" />
									</IconButton>
								</React.Fragment>
							);
						}
					},
				} }
				title={ '' }
				data={ servicesData }
				//onRowClick={ (e, row) => { console.log(row); } }
				columns={ [
					{ title: 'Наименование на Казахском', field: 'section_name_kk' },
					{ title: 'Наименование на Русском', field: 'section_name_ru' }
				] }
				parentChildData={ (row, rows) => rows.find(a => a.id === row.parentId) }
				options={ {
					selection: false,
					addRowPosition: 'first',
					columnsButton: true
				} }
				localization={ {
					header: {
						actions: "Действие"
					},
				} }
			/>
		</>
	);
};

Services.propTypes = {
	loadServicesAction: PropTypes.func.isRequired,
	addServiceAction: PropTypes.func.isRequired,
	deleteServiceAction: PropTypes.func.isRequired,
	updateSectionAction: PropTypes.func.isRequired,
	servicesProps: PropTypes.array.isRequired,
	loading: PropTypes.bool.isRequired,
	setAlertAction: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
	servicesProps: state.serviceReducer.services,
	loading: state.serviceReducer.loading
});

export default connect(mapStateToProps, { loadServicesAction, addServiceAction, deleteServiceAction, updateSectionAction, setAlertAction })(Services);
