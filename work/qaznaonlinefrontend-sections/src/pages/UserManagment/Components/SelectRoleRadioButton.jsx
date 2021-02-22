import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(3),
  },
  button: {
    margin: theme.spacing(1, 1, 0, 0),
  },
}));

export default function ErrorRadios({
  setOpenModal,
  chosenRole,
  setChosenRole,
  chosenUsers,
  //adminUsersProp,
  updateUsersByRoleAction,
  setChosenUsers,
  roles,
  serviceChosen
}) {
  const classes = useStyles();
  const [error, setError] = React.useState(false);

  const handleRadioChange = (event) => {
    setChosenRole(event.target.value);
    setError(false);
  };

  //console.log(chosenUsers, 'chosen');
  //console.log(adminUsersProp, 'all');

  const handleSubmit = (event) => {
    event.preventDefault();
    /* let changedUsers = chosenUsers.map(({ tableData, ...user }) => ({
      ...user,
      role: chosenRole,
    }));
    const result = adminUsersProp.map(({ tableData, ...originalUser }) => {
      const overWritten = changedUsers.find(({ id }) => id === originalUser.id);
      if (overWritten) {
        return overWritten;
      }
      return originalUser;
    }); */
    //updateUsersByRoleAction(result);
    const data = {
      users_id: chosenUsers[0] && chosenUsers[0].user_id,
      roles_id: chosenRole,
      users_fullname: chosenUsers[0] && chosenUsers[0].name,
      egov_services_id:serviceChosen
    };
    console.log(data);
    updateUsersByRoleAction(data);
    setOpenModal(false);
    setChosenUsers({});
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormControl
        component='fieldset'
        error={error}
        className={classes.formControl}>
        <RadioGroup
          aria-label='assign role'
          name='role'
          value={chosenRole}
          onChange={handleRadioChange}>
          {roles.map((item) => (
            <FormControlLabel
              key={item.role_id}
              value={item.role_id}
              control={<Radio />}
              label={`${item.role_name_kk} (${item.role_name_ru})`}
            />
          ))}
        </RadioGroup>
        <Button
          type='submit'
          variant='outlined'
          color='primary'
          className={classes.button}>
          подтвердить
        </Button>
      </FormControl>
    </form>
  );
}
