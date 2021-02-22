import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    color: props => props.color,
    fontWeight: props => props.fontWeight,
    fontSize: props => props.size,
    textAlign: props => props.alignment,
    marginTop: props => props.marginTop
  },
});

export const Header = (props) => {
  const classes = useStyles(props);
  const { color, title, fontWeight, size, alignment, marginTop } = props;
  return <Typography
    color={ color }
    alignment={ alignment }
    fontWeight={ fontWeight }
    size={ size }
    marginTop={ marginTop }
    className={ classes.root }
  >{ title }</Typography>;
};

