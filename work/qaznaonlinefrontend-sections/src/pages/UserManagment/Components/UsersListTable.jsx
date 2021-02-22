import React from 'react';
import MaterialTable from 'material-table';
import { tableIcons } from './icons';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { IconButton } from '@material-ui/core';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    marginTop: '30px',
    width:'100%',
    height:'auto'
  },
});

export function UsersListTable({
  setOpenModal,
  setChosenUsers,
  adminUsersProp,
  updateUsersByRoleAction,
  chosenUsers,
}) {
  const classes = useStyles();
  const onOpenModalHandler = () => {
    setOpenModal(true);
  };

  const onRoleRemove = () => {
    let changedUsers = chosenUsers.map(({ tableData, ...user }) => ({
      ...user,
      role: 'no-role',
    }));
    const result = adminUsersProp.map(({ tableData, ...originalUser }) => {
      const overWritten = changedUsers.find(({ id }) => id === originalUser.id);
      if (overWritten) {
        return overWritten;
      }
      return originalUser;
    });
    updateUsersByRoleAction(result);
  };
  return (
    <div className={classes.root}>
      <MaterialTable
        title=''
        icons={tableIcons}
        columns={[
          { title: 'Имя', field: 'name' },
          { title: 'Компания', field: 'company' },
          { title: 'Роль', field: 'role' },
        ]}
        data={adminUsersProp}
        components={{
          Action: (props) => {
            const { data } = props;
            if (data.some((item) => item.role !== 'no-role')) {
              return (
                <IconButton onClick={onRoleRemove}>
                  <DeleteForeverIcon />
                </IconButton>
              );
            }
            return (
              <IconButton onClick={onOpenModalHandler}>
                <AddCircleIcon />
              </IconButton>
            );
          },
        }}
        options={{
          selection: true,
        }}
        onSelectionChange={(rows) => {
          setChosenUsers(rows);
        }}
        actions={[
          {
            icon: '',
          },
        ]}
      />
    </div>
  );
}
