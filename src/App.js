import './App.css';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';
import { useState } from 'react';


firebase.initializeApp(firebaseConfig);

function App() {
  const [user , setUser] = useState({
    isSignedIn :false,
    email : '',
    name : '',
    photo : ''
  })
  const provider = new firebase.auth.GoogleAuthProvider();
  const handleSignIn = () => {
    firebase.auth().signInWithPopup(provider).then((res) => {
        const {displayName, photoURL, email} = res.user;
        const signInUser = {
          isSignedIn: true,
          name: displayName,
          photo: photoURL,
          email: email
        }
        setUser(signInUser);
        console.log(displayName, photoURL, email)
      })
      .catch((err) => {
        console.log(err)
        console.log(err.message)
      })
  };
  const handleSignOut = ()=>{
  const signOutUser = {
    isSignedIn :false,
    name:'',
    email:'',
    photo : ''

  }
  setUser(signOutUser)
  }
  return (
    <div className="App">
      {user.isSignedIn ? (
        <button onClick={handleSignOut}>sign out</button>
      ) : (
        <button onClick={handleSignIn}>sign in</button>
      )}
      {user.isSignedIn && (
        <div>
          <p>Welcome, {user.name}</p>
          <p>Your Email: {user.email}</p>
          <img src={user.photo} alt="" />
        </div>
      )}
    </div>
  );
}

export default App;
