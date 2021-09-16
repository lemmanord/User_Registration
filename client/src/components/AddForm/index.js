import React, { useState, useEffect } from 'react';
import { Typography, Container, Box } from '@material-ui/core';
import { addUser } from 'services';
import { useRouteMatch, useHistory } from 'react-router-dom';
import Forms from 'components/Form';

export default function AddForm() {
  const history = useHistory();

  const AddUser = async (data) => {
    await addUser(data);
    history.push('/');
  };

  return (
    <>
      <Container>
        <Box display='flex' justifyContent='center'>
          <Typography variant='h4' gutterBottom>
            Add User
          </Typography>
        </Box>
        <Forms onSave={AddUser} />
      </Container>
    </>
  );
}
