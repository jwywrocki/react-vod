import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Formik } from 'formik';
import * as Yup from 'yup';
import { registerUser } from "../../actions/user_actions";

import {
  Avatar, Button, Link, Grid, Typography,
  CssBaseline, TextField, Container, InputAdornment
} from '@material-ui/core';
import { LockOutlined, Person, Email, Lock } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';

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
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
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
        confirmPassword: ''
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

          let dataToSubmit = {
            email: values.email,
            password: values.password,
            name: values.name
          };

          dispatch(registerUser(dataToSubmit)).then(response => {
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
                <LockOutlined />
              </Avatar>
              <Typography component="h1" variant="h5">
                Zarejestruj się
              </Typography>
              <form onSubmit={handleSubmit} className={classes.form}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    {formErrorMessage && (
                      <label ><p style={{ color: '#f5222d', textAlign: "center", fontSize: '14px', padding: '20px' }}>{formErrorMessage}</p></label>
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
                      classes={errors.name && touched.name ? 'text-input error' : 'text-input'}
                      autoComplete="name"
                      autoFocus
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start" className={classes.ico}>
                            <Person />
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
                      classes={errors.email && touched.email ? 'text-input error' : 'text-input'}
                      autoComplete="email"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start" className={classes.ico}>
                            <Email />
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
                      classes={errors.password && touched.password ? 'text-input error' : 'text-input'}
                      autoComplete="current-password"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start" className={classes.ico}>
                            <Lock />
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
                      classes={errors.confirmPassword && touched.confirmPassword ? 'text-input error' : 'text-input'}
                      autoComplete="current-password"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start" className={classes.ico}>
                            <Lock />
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