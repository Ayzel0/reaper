import '../styles/root.scss';
import Login from './Login';
import { accessToken, logout, getUserGuilds } from '../discord';
import { useState, useEffect } from 'react';

function Root() {
  console.log('Root component rendered');
  const [token, setToken] = useState<string | null>(null);
  const [userGuilds, setUserGuilds] = useState({});

  useEffect(() => {
    setToken(accessToken);
  }, []);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('access_token')) {
      // Replace the current entry in the browser's history
      // This will remove the token from the URL's query params
      window.history.replaceState({}, document.title, window.location.pathname);

      const fetchData = async () => {
        const data = await getUserGuilds();
        setUserGuilds(data);
      };
    
      fetchData();
    }
  }, []);

  useEffect(() => {
    console.log(userGuilds);
  }, [userGuilds]);

  return (
    <div className='Root'>
      {!token ? (
        <Login />
      ) : (
        <div>
          <h1>Hello!</h1>
          <button onClick={() => logout()}>Logout</button>
        </div>
      )}
    </div>
  )
}

export default Root
