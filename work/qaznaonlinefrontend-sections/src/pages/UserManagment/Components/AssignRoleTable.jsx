import React from 'react';
import MaterialTable from 'material-table';
import { tableIcons } from './icons';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { IconButton } from '@material-ui/core';
//import { useSelector } from 'react-redux';
//import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

export function AssignRoleTable({
  setOpenModal,
  setChosenUsers,
  usersByOrganization,
  usersByRole,
}) {
  const onOpenModalHandler = () => {
    setOpenModal(true);
  };

  if (usersByOrganization) {
    return (
      <MaterialTable
        title=''
        icons={tableIcons}
        columns={[
          { title: 'Имя', field: 'name' }
        ]}
        data={usersByOrganization}
        components={{
          Action: (props) => {
            return (
              <IconButton onClick={onOpenModalHandler}>
                <AddCircleIcon />
              </IconButton>
            );
          },
        }}
        options={{
          selection: true,
          rowStyle: {
            backgroundColor: '#EEE',
          },
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
    );
  }

  if (usersByRole) {
    return (
      <MaterialTable
        title=''
        icons={tableIcons}
        columns={[
          { title: 'Имя', field: 'users_fullname' },
          { title: 'Сервис', field: 'egov_services.egov_service_name_kaz' },
          { title: 'Роль (на русском)', field: 'roles.role_name_ru' },
          { title: 'Роль (на казахском)', field: 'roles.role_name_kk' },
        ]}
        data={usersByRole}
        components={{
          Action: (props) => {
            return (
              <IconButton onClick={onOpenModalHandler}>
                <AddCircleIcon />
              </IconButton>
            );
          },
        }}
        options={{
          selection: true,
          rowStyle: {
            backgroundColor: '#EEE',
          },
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
    );
  }
}
