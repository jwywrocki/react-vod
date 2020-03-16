import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { withRouter } from "react-router-dom";
import { Formik } from 'formik';
import * as Yup from 'yup';

import {
  Avatar, Button, Link, Grid, Typography,
  CssBaseline, TextField, Container, InputAdornment
} from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';

import AuthIcon from '@material-ui/icons/LockOutlined';
import EmailIcon from '@material-ui/icons/Email';
import LockIcon from '@material-ui/icons/Lock';

import { loginUser } from "../../actions/user_actions";

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(12),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
  },
  ico: {
    color: theme.palette.primary.main,
    opacity: .75
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  error: {
    color: theme.palette.error.main,
    textAlign: "center",
    fontSize: '14px',
    padding: '19px',
    border: `1px solid ${theme.palette.error.main}`,
    borderRadius: '5px',
  },
}));

function Login(props) {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [formErrorMessage, setFormErrorMessage] = useState('');

  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
      }}
      validationSchema={
        Yup.object().shape({
          email: Yup.string()
            .email('Podaj prawidłowy adres e-mail')
            .required('Adres e-mail jest wymagany'),
          password: Yup.string()
            .min(5, 'Hasło musi zawierać conajmniej 5 znaków')
            .required('Hasło jest wymagane'),
        })
      }
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          let dataToSubmit = {
            email: values.email,
            password: values.password
          };

          dispatch(loginUser(dataToSubmit))
            .then(response => {
              if (response.payload.loginSuccess) {
                window.localStorage.setItem('userId', response.payload.userId);
                props.history.push("/");
              } else {
                setFormErrorMessage(response.payload.message);
              }
            })
            .catch(error => {
              setFormErrorMessage('Twój adres e-mail lub hasło mogą być niepoprawne');
              setTimeout(() => {
                setFormErrorMessage("");
              }, 3000);
            });
          setSubmitting(false);
        }, 0);
      }}
    >
      {props => {
        const {
          values,
          touched,
          errors,
          isSubmitting,
          handleChange,
          handleBlur,
          handleSubmit,
        } = props;

        return (
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
              <Avatar className={classes.avatar}>
                <AuthIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Zaloguj się
              </Typography>
              <form onSubmit={handleSubmit} className={classes.form}>
                {formErrorMessage && (
                  <label ><p className={classes.error}>{formErrorMessage}</p></label>
                )}
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="E-mail"
                  type="email"
                  placeholder="E-mail"
                  value={values.email}
                  onChange={handleChange}
                  autoComplete="email"
                  autoFocus
                  inputprops={{
                    startAdornment: (
                      <InputAdornment position="start" className={classes.ico}>
                        <EmailIcon />
                      </InputAdornment>
                    ),
                  }}
                  onBlur={handleBlur}
                  error={errors.email && touched.email}
                  helperText={(errors.email && touched.email) ? errors.email : ''}
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="password"
                  label="Hasło"
                  type="password"
                  placeholder="Hasło"
                  value={values.password}
                  onChange={handleChange}
                  autoComplete="current-password"
                  inputprops={{
                    startAdornment: (
                      <InputAdornment position="start" className={classes.ico}>
                        <LockIcon />
                      </InputAdornment>
                    ),
                  }}
                  onBlur={handleBlur}
                  error={errors.password && touched.password}
                  helperText={(errors.password && touched.password) ? errors.password : ''}
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                  disabled={isSubmitting}
                  onSubmit={handleSubmit}
                  htmltype="submit"
                >
                  Zaloguj
                </Button>
                <Grid container>
                  <Grid item xs>
                    <Link href="/reset_user" variant="body2">
                      Nie pamiętasz hasła?
                    </Link>
                  </Grid>
                  <Grid item>
                    <Link href="/register" variant="body2">
                      {"Nie posiadasz konta? Zarejestruj się"};
                    </Link>
                  </Grid>
                </Grid>
              </form>
            </div>
          </Container>
        );
      }}
    </Formik >
  );
};

export default withRouter(Login);