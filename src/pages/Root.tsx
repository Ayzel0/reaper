import '../styles/root.scss';
import Login from './Login.tsx';

function Root() {
  // check for an access token
  if (localStorage.getItem("reaperDiscordAccessToken") == null) {
    // redirect to express middleware
    return (
      <Login />
    )
  } 
  
  // if an access token exists, check if it's expired
  else {

  }
  
  return (
    <>
      <div>
        <h1>HELLO!</h1>
      </div>
    </>
  )
}

export default Root
