import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import ListItem from '@material-ui/core/ListItem';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    '& > *': {
      margin: theme.spacing(1),
     
  },
 
}}));


export default function AcccessibleTable() {
  const classes = useStyles();
  

  return (
  <>   
    <div className={classes.root}>
      <Grid container xs={12} >
       <Grid container item xs={6} >
         <Grid item  xs={6}>             
            <ListItem alignItems='center'>ИИН: </ListItem>              
            <ListItem>Имя</ListItem>  
            <ListItem>Фамилия</ListItem>  
            <ListItem>Отчество</ListItem>  
            <ListItem>Дата рождения</ListItem> 
            <ListItem>Пол</ListItem>   
          </Grid>
        </Grid>
        <Grid container item xs={6}>
         <Grid item  xs={6}>
            <ListItem>ИИН: </ListItem>              
            <ListItem>Имя</ListItem>  
            <ListItem>Фамилия</ListItem>  
            <ListItem>Отчество</ListItem>  
            <ListItem>Дата рождения</ListItem> 
            <ListItem>Пол</ListItem>   
          </Grid>
        </Grid>
        <div className={classes.root}>
        <ButtonGroup size="large"  aria-label="large outlined primary button group">
        <Button variant="contained" color="success">Подтвердить</Button>
        <Button variant="contained" color="primary">Перепроверить</Button>
        <Button variant="contained" color="secondary">Отказать</Button>
        <Button variant="contained" color="success">Загрузить файлы</Button>
       
      </ButtonGroup>
      </div>
      </Grid>   
    </div>  
  </>
  );
}

