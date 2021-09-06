import React, { useState, useEffect } from 'react';
import {
  container,
  Grid,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@material-ui/core';
import {
  Plus as PlusIcon,
  Pencil as PencilIcon,
  Delete as DeleteIcon,
} from 'mdi-material-ui';

export default function UserList() {
  const [state, setState] = useState({
    users: [],
    addModal: false,
    editModal: false,
  });

  const [selectedUser, setSelectedUser] = useState();
  //setItem
  const setItem = (action, user) => {
    setSelectedUser(user);
    const { _id } = user;
    if (action === 'edit') {
      setState((prevState) => ({ ...prevState, editModal: true }));
    } else if (action === 'delete') {
      DeleteItem(_id);
    }
  };
  //add
  const AddItem = (newUser) => {
    setState((prevState) => ({
      ...prevState,
      users: [...state.users, newUser],
    }));
  };
  //edit
  const EditItem = (user) => {
    setState((prevState) => ({
      ...prevState,
      users: state.users.map((users) =>
        users._id === user._id ? user : users
      ),
    }));
  };

  //delete
  const DeleteItem = (id) => {
    const copyUsers = [...state.users];
    let filteredUsers = copyUsers.filter((users) => users._id !== id);
    setState((prevState) => ({ ...prevState, users: filteredUsers }));
  };
  const renderName = ({ firstName, lastName, middleName }) => {
    return (
      <>
        {lastName +
          ', ' +
          firstName +
          ' ' +
          middleName.subString(0, 1).toUpperCase()}
      </>
    );
  };
  const { users } = state;
  return (
    <>
      <Container>
        <Grid container>
          <TableContainer>
            <Table aria-label='User List'>
              <caption>User List</caption>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell align='right'>Number</TableCell>
                  <TableCell align='right'>Sex</TableCell>
                  <TableCell align='right'>Email</TableCell>
                  <TableCell align='right'>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user._id}>
                    <TableCell>{renderName(user)}</TableCell>
                    <TableCell align='right'>
                      {user.telephoneNumber
                        ? user.telephoneNumber
                        : user.phoneNumber}
                    </TableCell>
                    <TableCell align='right'>{user.sex}</TableCell>
                    <TableCell align='right'>{user.email}</TableCell>
                    <TableCell>
                      <IconButton onClick={() => setItem('edit', user)}>
                        <EditIcon color='primary' />
                      </IconButton>
                    </TableCell>
                    <TableCell>
                      <IconButton onClick={() => setItem('delete', user)}>
                        <DeleteIcon color='primary' />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
        <Button variant='contained' color='primary'>
          <PlusIcon color='primary' />
        </Button>
      </Container>
    </>
  );
}
