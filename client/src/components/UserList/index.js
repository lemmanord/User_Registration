import React, { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  makeStyles,
  createStyles,
  Theme,
  TableRow,
  IconButton,
} from '@material-ui/core';
import {
  Plus as PlusIcon,
  Pencil as EditIcon,
  Delete as DeleteIcon,
} from 'mdi-material-ui';
import { getUsers } from 'services';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) =>
  createStyles({
    actionsCell: {
      display: 'flex',
      justifyContent: 'end',
    },
  })
);

export default function UserList() {
  const [state, setState] = useState({
    users: [],
  });
  const [selectedUser, setSelectedUser] = useState();
  const history = useHistory();
  const classes = useStyles();

  //setItem
  const setItem = (action, user) => {
    setSelectedUser(user);
    const { _id } = user;
    if (action === 'edit') {
      // setState((prevState) => ({ ...prevState, editModal: true }));
      //punta ka sa /edit/id na route tapos ipasa mo yung needed props sa form
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
  const renderName = ({ firstName, lastName }) => {
    return <>{lastName + ', ' + firstName + ' '}</>;
  };

  useEffect(() => {
    const fetchTodo = async () => {
      const { data } = await getUsers();
      setState((prevState) => ({ ...prevState, users: data }));
    };

    fetchTodo();
  }, []);

  const { users } = state;
  return (
    <>
      <Container>
        <Grid container>
          <TableContainer>
            <Table aria-label='User List'>
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
                      {user.telephoneNum ? user.telephoneNum : user.phoneNumber}
                    </TableCell>
                    <TableCell align='right'>{user.sex}</TableCell>
                    <TableCell align='right'>{user.email}</TableCell>
                    <TableCell className={classes.actionsCell}>
                      <IconButton onClick={() => setItem('edit', user)}>
                        <EditIcon color='primary' />
                      </IconButton>
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
        <Button
          variant='contained'
          color='primary'
          onClick={() => history.push('/add')}
        >
          <PlusIcon /> Add
        </Button>
      </Container>
    </>
  );
}
