import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { loginAction } from '../actions/auth';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Все права защищены © ' }
      <Typography>
        Дошкольное образование
      </Typography>{ ' ' }
      {new Date().getFullYear() }
      {'.' }
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const SignIn = ({ loginAction, isAuthProp }) => {
  const classes = useStyles();
  const [bin, setBin] = React.useState('');
  const [password, setPassword] = React.useState('');

  //console.log(isAuthProp);

  if (isAuthProp) {
    return <Redirect to="/regions" />;
  }

  const onSignInHandle = (e) => {
    e.preventDefault();
    loginAction(bin, password);
  };
  return (
    <Container maxWidth="xs">
      <CssBaseline />
      <div className={ classes.paper }>
        <Avatar className={ classes.avatar }>
          <LockOutlinedIcon />
        </Avatar>
        <Typography variant="h5">
          Вход
        </Typography>
        <form className={ classes.form } noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="bin"
            label="ИИН"
            name="bin"
            value={ bin }
            autoComplete="bin"
            autoFocus
            onChange={ (e) => {
              setBin(e.target.value);
            } }
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            value={ password }
            name="password"
            label="Пароль"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={ (e) => {
              setPassword(e.target.value);
            } }
          />
          <FormControlLabel
            control={ <Checkbox value="remember" color="primary" /> }
            label="Запомнить"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={ classes.submit }
            onClick={ (e) => onSignInHandle(e) }
          >
            Войти
          </Button>
        </form>
      </div>
      <Box mt={ 8 }>
        <Copyright />
      </Box>
    </Container>
  );
};

SignIn.propTypes = {
  loginAction: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  isAuthProp: state.authReducer.isAuthenticated
});

export default connect(mapStateToProps, { loginAction })(SignIn);