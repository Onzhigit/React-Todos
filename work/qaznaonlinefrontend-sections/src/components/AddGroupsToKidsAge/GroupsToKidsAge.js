import React from 'react';
import MaterialTable from "material-table";
import { tableIcons } from '../../pages/Applications/Components/icons';
import IconButton from '@material-ui/core/IconButton';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import EditIcon from '@material-ui/icons/Edit';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import Dialog from './Dialog';



export const GroupToKidsAgeTable = ({ kidsGroup, addGroupToKidsAgeGroupAction, deleteGroupFromKidsAgeGroupAction, updateGroupOfKidsAgeGroup }) => {
  //console.log(kidsGroup);
  const [kidsGroupData, setKidsGroupData] = React.useState([]);
  const [openDialog, setOpenDialog] = React.useState(false);
  const [ageCategory, setAgeCategory] = React.useState('');
  const [kidsAgeGroupId, setKidsAgeGroupId] = React.useState('');
  const [groupId, setGroupId] = React.useState('');
  const [categoryId, setCategoryId] = React.useState('');
  const [typeAction, setTypeAction] = React.useState('');
  const [chosenGroup, setChosenGroup] = React.useState('');

  React.useEffect(() => {
    let newData = [];
    kidsGroup && kidsGroup.forEach(item => {
      newData.push({
        id: item.kids_age_group_id,
        name: item.kids_age_group_name
      });
      if (item.kids_groups) {
        item.kids_groups.forEach(itm => {
          newData.push({
            id: itm.kids_group_id,
            name: itm.group_name,
            parentId: item.kids_age_group_id
          });
        });

      }
    });
    setKidsGroupData(newData);
  }, [kidsGroup]);

  //console.log(typeAction);

  const openAddDialogFunc = (propsData) => {
    let groupAgeId = propsData.data.id;
    let categoryName = propsData.data.name;
    setAgeCategory(categoryName);
    setKidsAgeGroupId(groupAgeId);
    setTypeAction('Add');
    if (typeAction === 'Add') {
      setOpenDialog(true);
    }
  };

  const deleteGroup = (propsData) => {
    let groupId = propsData.data.id;
    deleteGroupFromKidsAgeGroupAction(groupId);
  };

  const updateGroup = (propsData) => {
    setTypeAction('Edit');
    //console.log(propsData.data);
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
      <Dialog openDialog={ openDialog } setOpenDialog={ setOpenDialog } ageCategory={ ageCategory } addGroupToKidsAgeGroupAction={ addGroupToKidsAgeGroupAction } kidsAgeGroupId={ kidsAgeGroupId } groupId={ groupId } categoryId={ categoryId } updateGroupOfKidsAgeGroup={ updateGroupOfKidsAgeGroup } typeAction={ typeAction } chosenGroup={ chosenGroup } />
      <MaterialTable
        actions={ [
          rowData => ({
            icon: '',
            tooltip: 'Добавьте группу',
            onClick: (event, rowData) => console.log("You want to delete " + rowData.name),
            hidden: rowData.parentId
          })
        ] }
        icons={ tableIcons }
        components={ {
          Action: props => {
            const { data: { parentId } } = props;
            //console.log(props.data);
            if (parentId) {
              return (
                <>
                  <IconButton aria-label="delete" size="medium" color="primary" onClick={ () => updateGroup(props) }>
                    <EditIcon fontSize="inherit" />
                  </IconButton>
                  <IconButton aria-label="delete" size="medium" color="primary" onClick={ () => deleteGroup(props) }>
                    <DeleteOutlineIcon fontSize="inherit" />
                  </IconButton>
                </>
              );
            } else {
              return (
                <IconButton aria-label="delete" size="medium" color="primary" onClick={ () => openAddDialogFunc(props) } >
                  <AddCircleIcon fontSize="inherit" />
                </IconButton>
              );
            }
          },
        } }
        title={ '' }
        data={ kidsGroupData }
        //onRowClick={ (e, row) => { console.log(row); } }
        columns={ [
          { title: 'Возраст', field: 'name' }
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