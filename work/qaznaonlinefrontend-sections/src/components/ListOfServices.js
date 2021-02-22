/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme) => ({
  formContainer: {
    display: 'flex',
    flexDirection: 'column'
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  }
}));



function ListOfServices({ services, setSelectedService }) {
  const classes = useStyles();

  const handleChange = (e) => {
    //console.log(e);
    setSelectedService(e.target.value)
  };

  console.log(services);
  return (
    <div className={ classes.formContainer }>
      { services && services.map((service) => (
        <FormControl key={ service.section_id } className={ classes.formControl }>
          <InputLabel id="demo-simple-select-label">{ service.section_name_ru }</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            onChange={ (e) => { handleChange(e); } }
          >
            { service.sub_sections && service.sub_sections.map((subsection) => {
              //console.log(subsection);
              return (
                <MenuItem key={ subsection.sub_section_id } value={ subsection.sub_section_id }>{ subsection.section_name_ru }</MenuItem>
              );

            }) }
          </Select>
        </FormControl>
      )) }

    </div>
  );
}

export default ListOfServices;
