import React from 'react';
import AddForm from 'components/AddForm';
import EditForm from 'components/EditForm';
import UserList from 'components/UserList';

export default function App() {
  return (
    <>
      <Switch>
        <Route exact path='/' component={UserList} />
        <Route exact path='/edit/:id' component={EditForm} />
        <Route exact path='/add' component={AddForm} />
      </Switch>
    </>
  );
}
