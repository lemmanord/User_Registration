import React, { useState, useEffect } from 'react';
import { Typography, Container, Box } from '@material-ui/core';
import { editUser, getOneUser } from 'services';
import { useHistory, useRouteMatch } from 'react-router-dom';
import Forms from 'components/Form';

const EditForm = () => {
  const [selectedUser, setSelectedUser] = useState();
  const history = useHistory();
  const match = useRouteMatch();

  const EditUser = async (data) => {
    await editUser(data, match.params.id);
    history.push('/');
  };

  useEffect(() => {
    const fetchTodo = async () => {
      const { data } = await getOneUser(match.params.id);
      setSelectedUser(data);
    };

    fetchTodo();
  }, [match.params.id]);

  return (
    <>
      <Container>
        <Box display='flex' justifyContent='center'>
          <Typography variant='h4' gutterBottom>
            Edit User
          </Typography>
        </Box>
        {selectedUser && <Forms onSave={EditUser} values={selectedUser} />}
      </Container>
    </>
  );
};

export default EditForm;
