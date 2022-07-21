import { observer } from 'mobx-react-lite';
import { FC, useContext, useEffect, useState } from 'react';
import { Context } from '.';
import LoginForm from './components/LoginForm';
import { IUser } from './models/IUser';
import UserService from './services/UserService';

const App: FC = () => {
  const { store } = useContext(Context);
  const [users, setUsers] = useState<IUser[]>([]);
  const getUsers = async () => {
    try {
      const response = await UserService.fetchUsers();
      setUsers(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (localStorage.getItem('token')) {
      store.checkAuth();
    }
  }, [store]);

  if (store.isLoading) {
    <div>Loading ...</div>;
  }

  if (!store.isAuth) {
    return (
      <>
        <LoginForm />{' '}
        <div>
          <button onClick={getUsers}>Get users</button>
        </div>
      </>
    );
  }
  console.log(store.user.isActivated, '<-- store.user.isActivated');
  return (
    <div className="App">
      <h1>
        {store.isAuth
          ? `User ${store.user.email} authorized`
          : 'User does not authorized'}
      </h1>
      <h2>
        {store.user.isActivated ? 'Account activated' : 'Confirm account'}
      </h2>
      <button onClick={() => store.logout()}>Exit</button>

      <div>
        <button onClick={getUsers}>Get users</button>
      </div>
      {users.map((user: IUser) => (
        <div key={user.email}>{user.email}</div>
      ))}
    </div>
  );
};

export default observer(App);
