import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme) => ({
  button: {
    display: 'block',
    marginTop: theme.spacing(2),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: '80%',
    display: 'flex',
    justifyContent: 'center',
  },
}));

export default function ControlledOpenSelect({
  label,
  organizations,
  organizationChosen,
  setOrganizationChosen,
  setServiceChosen,
  services,
  serviceChosen,
  setFilteredUsersByRole,
  filteredUsersByRole,
}) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  console.log(filteredUsersByRole);

  const handleOrganizationChange = (event) => {
    setOrganizationChosen(event.target.value);
    setFilteredUsersByRole([]);
  };

  const handleServiceChange = (event) => {
    setServiceChosen(event.target.value);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <div>
      <FormControl className={classes.formControl}>
        <InputLabel id={`label-of-${label}`}>{label}</InputLabel>
        {organizations && (
          <Select
            labelId={`label-select-${label}`}
            id='demo-controlled-open-select'
            open={open}
            onClose={handleClose}
            onOpen={handleOpen}
            value={organizationChosen}
            onChange={handleOrganizationChange}>
            <MenuItem value=''>
              <em>None</em>
            </MenuItem>
            {organizations &&
              organizations.map((item) => (
                <MenuItem
                  key={item.organization_id}
                  value={item.organization_id}>
                  {item.organization_name}
                </MenuItem>
              ))}
          </Select>
        )}
        {services && (
          <Select
            labelId={`label-select-${label}`}
            id='demo-controlled-open-select'
            open={open}
            onClose={handleClose}
            onOpen={handleOpen}
            value={serviceChosen}
            onChange={handleServiceChange}>
            <MenuItem value=''>
              <em>None</em>
            </MenuItem>
            {services &&
              services.map((item) => (
                <MenuItem
                  key={item.egov_service_id}
                  value={item.egov_service_id}>
                  {item.egov_service_name_rus}
                </MenuItem>
              ))}
          </Select>
        )}
      </FormControl>
    </div>
  );
}
