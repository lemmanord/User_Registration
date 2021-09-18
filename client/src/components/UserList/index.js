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
import { getUsers, deleteUser } from 'services';
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
  const history = useHistory();
  const classes = useStyles();

  //setItem
  const itemAction = (action, user) => {
    const { _id } = user;
    console.log(action);
    if (action === 'edit') {
      history.push(`/edit/${_id}`);
    } else if (action === 'delete') {
      deleteUser(_id);
      setState((prevState) => ({
        ...prevState,
        users: state.users.filter((user) => user._id !== _id),
      }));
    }
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
                      <IconButton onClick={() => itemAction('edit', user)}>
                        <EditIcon color='primary' />
                      </IconButton>
                      <IconButton onClick={() => itemAction('delete', user)}>
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
