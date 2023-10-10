import '../styles/root.scss'

const getTokens = () => {
  // generate a state to prevent CSRF
  
}

function Root() {
  // check for an access token
  if (localStorage.getItem("reaperDiscordAccessToken") == null) {
    getTokens();
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
