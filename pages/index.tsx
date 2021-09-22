import styles from 'styles/Home.module.css';
import Nav from 'components/nav';
import { Profile } from 'components/Profile';
import { useState } from 'react';
import { loginApiAction } from 'actions/actions';
import { Button } from '@chakra-ui/button';

export default function Home() {
  const [user, setUser] = useState('');
  const [userData, setUserData] = useState<UserData | undefined>(undefined);
  const [loggedIn, setLoggedIn] = useState(false);

  function useInput(defaultValue: string) {
    const [value, setValue] = useState(defaultValue);
    function onChange(e: any) {
      setValue(e.target.value);
    }
    return {
      value,
      onChange,
    };
  }

  const inputProps = useInput('');

  const userDataSet = async () => {
    const data = await loginApiAction(inputProps.value);
    await setUserData(data);
  };

  const logoutAction = () => {
    setLoggedIn(false);
    setUser('');
  };

  const loginAction = async () => {
    setUser(inputProps.value);
    await userDataSet();
    setLoggedIn(true);
  };

  const renderLogin = () => {
    return (
      <>
        <h1 className={styles.title}>JobCoin Login</h1>
        <input {...inputProps} placeholder="Enter Username"></input>
        <button type="submit" onClick={loginAction}>
          Log In
        </button>
      </>
    );
  };

  const txnComplete = async () => {
    await userDataSet();
  };

  return (
    <div className={styles.container}>
      <Nav /> {/* Enables PWA meta content for Mobile experience */}
      <main className={styles.main}>
        {loggedIn ? (
          <Profile userData={userData} user={user} txnComplete={txnComplete} />
        ) : (
          renderLogin()
        )}
      </main>
      <footer className={styles.footer}>
        {loggedIn ? (
          <>
            <p>Logged in as {user}</p>
            <Button onClick={logoutAction}>Log Out</Button>
          </>
        ) : null}
      </footer>
    </div>
  );
}
