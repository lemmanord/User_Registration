import React, { useState, useEffect } from 'react';
import {
  Box,
  FormControl,
  Paper,
  MenuItem,
  InputLabel,
  makeStyles,
  createStyles,
  Theme,
} from '@material-ui/core';
import { TextField, Select } from 'formik-material-ui';
import { Formik, Form, Field, FormikHelpers, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const sex = ['male', 'female'];

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
  })
);

const addLevelSchema = Yup.object().shape({
  firstName: Yup.string().required('Required'),
  middleName: Yup.string().required('Required'),
  lastName: Yup.string().required('Required'),
  email: Yup.string().email('Invalid email format').required('Required'),
  sex: Yup.string().oneOf(sex).required('Required'), //dropdown
  telephoneNum: Yup.string()
    .required()
    .matches(/^[0-9]+$/, 'Must be only digits')
    .min(8, 'Must be exactly 8 digits')
    .max(8, 'Must be exactly 8 digits'),
  phoneNumber: Yup.string()
    .required()
    .matches(/^[0-9]+$/, 'Must be only digits')
    .min(11, 'Must be exactly 11 digits')
    .max(11, 'Must be exactly 11 digits'),
  address: Yup.string().required('Required'),
});

const handleSubmit = (data, { setSubmitting, resetForm }) => {
  console.log(data);
};

export default function App() {
  const classes = useStyles();

  const values = {
    firstName: '',
    middleName: '',
    lastName: '',
    email: '',
    sex: '',
    telephoneNum: '',
    phoneNumber: '',
    address: '',
  };
  return (
    <>
      <Formik
        initialValues={values}
        onSubmit={handleSubmit}
        validationSchema={addLevelSchema}
      >
        {({ touched, errors, isSubmitting, resetForm }) => (
          <Form>
            <Box>
              <Paper>
                <FormControl>
                  <Field
                    component={TextField}
                    name='MiddleName'
                    type='text'
                    label='MiddleName'
                  />
                </FormControl>
                <FormControl>
                  <Field
                    component={TextField}
                    name='firstName'
                    type='text'
                    label='FirstName'
                  />
                </FormControl>

                <FormControl>
                  <Field
                    component={TextField}
                    name='LastName'
                    type='text'
                    label='LastName'
                  />
                </FormControl>
                <FormControl>
                  <Field
                    component={TextField}
                    name='email'
                    type='email'
                    label='Email'
                  />
                </FormControl>

                <FormControl>
                  <Field
                    component={Select}
                    name='sex'
                    inputProps={{
                      id: 'sex',
                    }}
                  >
                    {sex.map((sex) => (
                      <MenuItem value={sex} key={sex}>
                        {sex}
                      </MenuItem>
                    ))}
                  </Field>
                </FormControl>
                <InputLabel htmlFor='sex'>Sex</InputLabel>
                <FormControl>
                  <Field
                    component={TextField}
                    name='telephoneNum'
                    type='number'
                    label='Telephone Number'
                  />
                </FormControl>
                <FormControl>
                  <Field
                    component={TextField}
                    name='phoneNumber'
                    type='number'
                    label='Phone Number'
                  />
                </FormControl>
                <FormControl>
                  <Field
                    component={TextField}
                    name='address'
                    type='text'
                    label='Address'
                  />
                </FormControl>
              </Paper>
            </Box>
          </Form>
        )}
      </Formik>
    </>
  );
}
