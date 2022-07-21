import { observer } from 'mobx-react-lite';
import { FC, useContext, useEffect } from 'react';
import { Context } from '.';
import LoginForm from './components/LoginForm';

const App: FC = () => {
  const { store } = useContext(Context);

  useEffect(() => {
    if (localStorage.getItem('token')) {
      store.checkAuth();
    }
  }, [store]);

  if (!store.isAuth) {
    return <LoginForm />;
  }

  return (
    <div className="App">
      <h1>
        {store.isAuth
          ? `User ${store.user.email} authorized`
          : 'User does not authorized'}
      </h1>
      <div>
        <button onClick={() => store.logout()}>Exit</button>
      </div>
    </div>
  );
};

export default observer(App);
