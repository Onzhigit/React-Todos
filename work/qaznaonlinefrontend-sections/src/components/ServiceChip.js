import React from 'react';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import EditIcon from '@material-ui/icons/Edit';
import styled from 'styled-components';


/* const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'start',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(0.5),
    },
  },
})); */
const Root = styled.div`
  display:flex;
  align-items:center;
  justify-content:center;
  width:100px;
  height:60px;
  border-radius:3px;
  background-color:#1976D2;
  color:white;
  cursor:pointer;
`;

const InfoSection = styled.div`
display:flex;
align-items:center;
justify-content:center;
height:100%;
flex:0.7;
`;

const ActionSection = styled.div`
  display:flex;
  flex-direction:column;
  height:100%;
  flex:0.3;
`;

const Button = styled.div`
  display:flex;
  align-items:center;
  justify-content:center;
  width:100%;
  height:50%;
`;

export default function Chip({ data, deleteServicesFromOrganization, id }) {

  const handleDelete = () => {
    deleteServicesFromOrganization(id);
  };

  const editService = () => {
    console.log('edit service');
  };

  return (

    <Root>
      <InfoSection>
        { data }
      </InfoSection>
      <ActionSection>
        <Button>
          <DeleteOutlineIcon onClick={ handleDelete } />
        </Button>
        <Button>
          <EditIcon onClick={editService} />
        </Button>
      </ActionSection>
    </Root>

  );
}