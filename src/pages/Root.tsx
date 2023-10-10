import '../styles/root.scss'

const generateState = () => {
  let characterSet = 'abcdefghijklmnopqrstuvwxyz1234567890';
  let state 
}

const getTokens = () => {
  // generate a state token to prevent CSRF

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
