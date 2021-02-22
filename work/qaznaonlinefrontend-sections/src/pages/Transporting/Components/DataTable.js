import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button'
import Box from '@material-ui/core/Box';
import SingleTab from './SingleTab'

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  }
});

function createData(number, date, info, name, school) {
  return { number, date, info, name, school };
}

const rows = [
  createData( '1', '13.03.21', 'adf', 'adsfsf', 'sdgsdfg' ),
  createData( '2', '13.03.21', 'adf', 'adsfsf', 'sdgsdfg' ),
  createData( '3', '13.03.21', 'adf', 'adsfsf', 'sdgsdfg' ),
  createData( '4', '13.03.21', 'adf', 'adsfsf', 'sdgsdfg' ),

];

export default function DenseTable() {
  const classes = useStyles();
  const [edit, setEdit] = React.useState(true)

  const handleClick = () => {
    setEdit(!edit)
  }
  return ( 
  <>

    {edit ? 
    <TableContainer component={Paper}>
      <Table className={classes.table} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <Box display='flex' justifyContent='center' borderRight={1} >
            <TableCell>№</TableCell>
            </Box>
            <TableCell align="right">Берилген куни</TableCell>
            <TableCell align="right">Мартебе</TableCell>
            <TableCell align="right">Аты жони</TableCell>
            <TableCell align="right">Мектеп</TableCell>
             <Box display="flex" justifyContent='center'>
               <TableCell align="right">Операциялар</TableCell>
             </Box>
             
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            
            <TableRow key={row.number}>
              <Box borderRight={1} display='flex' justifyContent='center' >
              <TableCell >             {row.number}</TableCell>
              </Box>
              <TableCell align="right">{row.date}</TableCell>
              <TableCell align="right">{row.info}</TableCell>
              <TableCell align="right">{row.name}</TableCell>
              <TableCell align="right">{row.school}</TableCell>
              <Box display="flex" justifyContent='center'>
              <Button variant='contained' 
                      onClick={handleClick}
                      justifyContent='center'
                      color="primary"
                      
                      >click</Button></Box>
            </TableRow>
            
          ))}
        </TableBody>
      </Table>
    </TableContainer>
     :   <SingleTab handleClick={handleClick} edit={edit} /> }
     </>
  );
}
