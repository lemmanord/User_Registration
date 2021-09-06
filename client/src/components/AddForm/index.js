import React, { useState, useEffect } from 'react';
import { Typography, Container, Box } from '@material-ui/core';
import Forms from 'components/Form';

export default function AddForm() {
  return (
    <>
      <Container>
        <Box display='flex' justifyContent='center'>
          <Typography variant='h4' gutterBottom>
            Add User
          </Typography>
        </Box>
        <Forms />
      </Container>
    </>
  );
}
