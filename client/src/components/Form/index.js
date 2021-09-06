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
  Button,
} from '@material-ui/core';
import { TextField, Select } from 'formik-material-ui';
import { Formik, Form, Field, FormikHelpers, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const sex = ['male', 'female'];

const useStyles = makeStyles((theme) =>
  createStyles({
    BoxBody: {
      display: 'flex',
      justifyContent: 'center',
      flexDirection: 'row',
    },
    paper: {
      display: 'flex',
      flexDirection: 'column',
      padding: '30px',
      marginBottom: '10px',
    },
    formControl: {
      margin: '5px',
    },
    email: {
      width: '65%',
    },
    number: {
      width: '45%',
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
    .matches(/^[0-9]+$/, 'Must be only digits')
    .min(8, 'Must be exactly 8 digits')
    .max(8, 'Must be exactly 8 digits'),
  phoneNumber: Yup.string()
    .matches(/^[0-9]+$/, 'Must be only digits')
    .min(11, 'Must be exactly 11 digits')
    .max(11, 'Must be exactly 11 digits'),
  address: Yup.string().required('Required'),
});

const handleSubmit = (data, { setSubmitting, resetForm }) => {
  console.log(data);
};

export default function Forms() {
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
          <Box className={classes.BoxBody}>
            <Form>
              <Box>
                <Paper className={classes.paper}>
                  <Box display='flex'>
                    <FormControl className={classes.formControl}>
                      <Field
                        component={TextField}
                        name='firstName'
                        type='text'
                        label='First Name'
                      />
                    </FormControl>
                    <FormControl className={classes.formControl}>
                      <Field
                        component={TextField}
                        name='MiddleName'
                        type='text'
                        label='Middle Name'
                      />
                    </FormControl>
                    <FormControl className={classes.formControl}>
                      <Field
                        component={TextField}
                        name='LastName'
                        type='text'
                        label='Last Name'
                      />
                    </FormControl>
                  </Box>

                  <Box display='flex'>
                    <FormControl
                      className={classes.formControl + ' ' + classes.email}
                    >
                      <Field
                        component={TextField}
                        name='email'
                        type='email'
                        label='Email'
                      />
                    </FormControl>
                    <FormControl className={classes.formControl}>
                      <InputLabel htmlFor='sex'>Sex </InputLabel>
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
                  </Box>

                  <Box display='flex' justifyContent='space-between'>
                    <FormControl
                      className={classes.formControl + ' ' + classes.number}
                    >
                      <Field
                        component={TextField}
                        name='telephoneNum'
                        type='number'
                        label='Telephone Number'
                      />
                    </FormControl>
                    <FormControl
                      className={classes.formControl + ' ' + classes.number}
                    >
                      <Field
                        component={TextField}
                        name='phoneNumber'
                        type='number'
                        label='Phone Number'
                      />
                    </FormControl>
                  </Box>

                  <FormControl className={classes.formControl}>
                    <Field
                      component={TextField}
                      name='address'
                      type='text'
                      label='Address'
                    />
                  </FormControl>
                </Paper>
                <Box display='flex' justifyContent='flex-end'>
                  <Button type='submit' variant='contained'>
                    Save User
                  </Button>
                </Box>
              </Box>
            </Form>
          </Box>
        )}
      </Formik>
    </>
  );
}
