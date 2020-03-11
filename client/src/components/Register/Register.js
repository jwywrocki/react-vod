import React from "react";
import { Formik } from 'formik';
import * as Yup from 'yup';
import { registerUser } from "../../actions/user_actions";
import { useDispatch } from "react-redux";

import { Form, Input, Button, Typography } from 'antd';
import { UserOutlined, MailOutlined, LockOutlined } from '@ant-design/icons';

const { Title } = Typography;

function Register(props) {
  const dispatch = useDispatch();
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
              alert(response.payload.err.errmsg)
            }
          })

          setSubmitting(false);
        }, 500);
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
          <div className="app">
            <Title level={2}>Zarejestruj się</Title>
            <Form style={{ minWidth: '375px' }} onSubmit={handleSubmit} >

              <Form.Item required validateStatus={errors.name && touched.name ? "error" : 'success'}>
                <Input
                  id="name"
                  prefix={<UserOutlined style={{ color: 'rgba(0,0,0,.40)' }} />}
                  placeholder="Nazwa użytkownika"
                  type="text"
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={
                    errors.name && touched.name ? 'text-input error' : 'text-input'
                  }
                />
                {errors.name && touched.name && (
                  <div className="input-feedback">{errors.name}</div>
                )}
              </Form.Item>

              <Form.Item required validateStatus={errors.email && touched.email ? "error" : 'success'}>
                <Input
                  id="email"
                  prefix={<MailOutlined style={{ color: 'rgba(0,0,0,.40)' }} />}
                  placeholder="E-mail"
                  type="email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={
                    errors.email && touched.email ? 'text-input error' : 'text-input'
                  }
                />
                {errors.email && touched.email && (
                  <div className="input-feedback">{errors.email}</div>
                )}
              </Form.Item>

              <Form.Item required validateStatus={errors.password && touched.password ? "error" : 'success'}>
                <Input.Password
                  id="password"
                  prefix={<LockOutlined style={{ color: 'rgba(0,0,0,.40)' }} />}
                  placeholder="Hasło"
                  type="password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  allowClear
                  className={
                    errors.password && touched.password ? 'text-input error' : 'text-input'
                  }
                />
                <div className="input-feedback">
                  {errors.password && touched.password && (
                    <div>{errors.password}</div>
                  )}
                </div>
              </Form.Item>

              <Form.Item required validateStatus={errors.confirmPassword && touched.confirmPassword ? "error" : 'success'}>
                <Input.Password
                  id="confirmPassword"
                  prefix={<LockOutlined style={{ color: 'rgba(0,0,0,.40)' }} />}
                  placeholder="Potwierdź hasło"
                  type="password"
                  value={values.confirmPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  allowClear
                  className={
                    errors.confirmPassword && touched.confirmPassword ? 'text-input error' : 'text-input'
                  }
                />
                {errors.confirmPassword && touched.confirmPassword && (
                  <div className="input-feedback">{errors.confirmPassword}</div>
                )}
              </Form.Item>

              <Form.Item>
                <Button onClick={handleSubmit} type="primary" style={{ minWidth: '100%' }} disabled={isSubmitting}>
                  Zarejestruj
                </Button>
              </Form.Item>
            </Form>
          </div>
        );
      }}
    </Formik>
  );
};

export default Register