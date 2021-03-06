import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Formik } from 'formik';
import * as Yup from 'yup';

import {
  Avatar, Button, Link, Grid, Typography,
  CssBaseline, TextField, Container, InputAdornment
} from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';

import AuthIcon from '@material-ui/icons/LockOutlined';
import PersonIcon from '@material-ui/icons/Person';
import EmailIcon from '@material-ui/icons/Email';
import LockIcon from '@material-ui/icons/Lock';

import { registerUser } from "../../actions/user_actions";

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
    marginTop: theme.spacing(3),
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

function Register(props) {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [formErrorMessage, setFormErrorMessage] = useState('');

  return (
    <Formik
      initialValues={{
        email: '',
        name: '',
        password: '',
        confirmPassword: '',
      }}
      validationSchema={Yup.object().shape({
        name: Yup.string()
          .required('Nazwa użytkownika jest wymagana'),
        email: Yup.string()
          .email('Podaj prawidłowy adres e-mail')
          .required('Adres e-mail jest wymagany'),
        password: Yup.string()
          .min(5, 'Hasło musi zawierać conajmniej 5 znaków')
          .required('Hasło jest wymagane'),
        confirmPassword: Yup.string()
          .oneOf([Yup.ref('password'), null], 'Hasła nie pasują do siebie')
          .required('Potwierdzenie hasła jest wymagane')
      })}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {

          let data = {
            email: values.email,
            password: values.password,
            name: values.name
          };

          dispatch(registerUser(data)).then(response => {
            if (response.payload.success) {
              props.history.push("/login");
            } else {
              setFormErrorMessage(response.payload.message);
            }
          })
            .catch(error => {
              setFormErrorMessage('Użytkownik o podanej nazwie lub adresie email już istnieje');
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
                Zarejestruj się
              </Typography>
              <form onSubmit={handleSubmit} className={classes.form}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    {formErrorMessage && (
                      <label ><p className={classes.error}>{formErrorMessage}</p></label>
                    )}
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      id="name"
                      label="Nazwa użytkownika"
                      placeholder="Nazwa użytkownika"
                      value={values.name}
                      onChange={handleChange}
                      autoComplete="name"
                      autoFocus
                      inputprops={{
                        startAdornment: (
                          <InputAdornment position="start" className={classes.ico}>
                            <PersonIcon />
                          </InputAdornment>
                        ),
                      }}
                      onBlur={handleBlur}
                      error={errors.name && touched.name}
                      helperText={(errors.name && touched.name) ? errors.name : ''}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      id="email"
                      label="E-mail"
                      type="email"
                      placeholder="E-mail"
                      value={values.email}
                      onChange={handleChange}
                      autoComplete="email"
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
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
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
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      id="confirmPassword"
                      label="Potwierdź hasło"
                      type="password"
                      placeholder="Potwierdź hasło"
                      value={values.confirmPassword}
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
                      error={errors.confirmPassword && touched.confirmPassword}
                      helperText={(errors.confirmPassword && touched.confirmPassword) ? errors.confirmPassword : ''}
                    />
                  </Grid>
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                >
                  Zarejestruj
                </Button>
                <Grid container justify="flex-end">
                  <Grid item>
                    <Link href="/login" variant="body2">
                      Posiadasz konto? Zaloguj się
                    </Link>
                  </Grid>
                </Grid>
              </form>
            </div>
          </Container>
        );
      }}
    </Formik>
  );
};

export default Register;