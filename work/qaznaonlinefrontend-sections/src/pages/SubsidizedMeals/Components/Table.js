import MaterialTable from "material-table";
import { tableIcons } from './icons';
import DoneIcon from '@material-ui/icons/Done';
import BlockIcon from '@material-ui/icons/Block';
import format from 'date-fns/format';

// temporal id pretended to be status user id, 
import { v4 as uuidv4 } from 'uuid';

const Table = ({ timetableRequests, updateApplicationRequest }) => {
  const onHandleDismiss = (id) => {
    console.log(id);
    let status_id = uuidv4();
    updateApplicationRequest(id, "rejected", status_id);
  };

  const onHandleAccept = (id) => {
    //console.log(id);
    let status_id = uuidv4();
    updateApplicationRequest(id, "accepted", status_id);
  };
  //console.log(timetableRequests);

  const showStatus = (status_type) => {
    if (status_type === 'create') {
      return 'новая';
    }

    if (status_type === 'accepted') {
      return 'принята';
    }

    if (status_type === 'rejected') {
      return 'отклонена';
    }
  };
  return (
    <MaterialTable
      icons={ tableIcons }
      title={ '' }
      columns={ [
        { title: 'Статус', field: 'status_type', render: (item) => showStatus(item.status_type) },
        { title: 'Время создания', field: 'create_time', render: (rowData) => format(new Date(rowData.create_time), 'MM/dd/yyyy') },
        { title: 'Компания', field: 'organizations.organization_name' },
        { title: 'Услуга', field: 'sub_sections.section_name_ru' },
        { title: 'Возраст', field: 'kids_age_group.kids_age_group_name', type: 'numeric' },
        { title: 'Инструктор', field: 'organizations_staff.first_name' },
        { title: 'Язык', field: 'languages[0].languages_name' },
        { title: 'ИИН родителя', field: 'parent_iin' },
        { title: 'ИИН ученика', field: 'children_iin' },
        { title: 'Имя ученика', field: 'children_name' },
        { title: 'Имя родителя', field: 'parent_name' }
      ] }
      data={ timetableRequests }
      actions={ [
        {
          icon: DoneIcon,
          tooltip: 'Подтвердить заявку',
          onClick: (event, rowData) => onHandleAccept(rowData.sections_requests_id)
        },
        rowData => ({
          icon: BlockIcon,
          tooltip: 'Отклонить заявку',
          onClick: (event, rowData) => onHandleDismiss(rowData.sections_requests_id)
        })
      ] }
      options={ {
        actionsColumnIndex: -1, grouping: true
      } }
      localization={ {
        header: {
          actions: "Обработать заявку"
        },
        grouping: { placeholder: 'перенесите загаловок чтобы сгруппировать', groupedBy: 'сгруппированные' }
      } }
    />
  );
};

export default Table;