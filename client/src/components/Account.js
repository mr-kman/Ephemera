import React from 'react';
import { useState } from 'react';
import '../styles/account.css';
import firebase from 'firebase/compat/app';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';

const endpoint = process.env.REACT_APP_EXPRESS_URL;

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const auth = getAuth();

export default function Account({
  setSignIn,
  setSwearFilter,
  setUserPreference,
}) {
  const [email, setEmail] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [password, setPassword] = useState('');
  const [cPassword, setcPassword] = useState('');
  const [newAccountMode, setNewAccountMode] = useState(false);

  const createUser = (email, password) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        // Signed in
        const user = userCredential.user;
        user['displayName'] = displayName;

        //send user object to server -- check here for potential errors
        await fetch(`${endpoint}/createUser`, {
          method: 'POST',
          body: JSON.stringify(user),
          headers: { 'Content-type': 'application/json; charset=UTF-8' },
        })
          .then((response) => response.json())
          .then((json) => updateAllUserSettings(json))
          .catch((err) => err);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        window.alert('Username or password is incorrect.');
      });
  };

  const signIn = (email, password) =>
    signInWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        // Signed in
        const user = userCredential.user;
        //send user object to server
        await fetch(`${endpoint}/signInUser`, {
          method: 'POST',
          body: JSON.stringify(user),
          headers: { 'Content-type': 'application/json; charset=UTF-8' },
        })
          .then((response) => response.json())
          .then((json) => {
            if (!json.uid) {
              throw new Error(`Invalid uid .${json.uid}.`);
            }
            updateAllUserSettings(json);
          })
          .catch((err) => window.alert(err));
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        window.alert('Username or password is incorrect.');
      });

  const updateAllUserSettings = (json) => {
    localStorage.setItem('uid', json.uid);
    let sfilter = json.profanity;
    let anon = json.anonymous;
    let displayName = json.displayName;
    setSwearFilter(sfilter);
    setSignIn(true);
    setUserPreference({
      displayName: displayName,
      swearFilter: sfilter,
      anonymous: anon,
    });
  };

  function userSignIn() {
    signIn(email, password);
  }

  function userCreate() {
    if (password !== cPassword) {
      alert('Passwords do not match.');
      return;
    }
    createUser(email, password);
  }

  function getEULA() {}

  function createMode() {
    setNewAccountMode(true);
    document.getElementById('mainDiv').id = 'mainDiv2';
    document.getElementById('signinButton').style.display = 'none';
    document.getElementById('createMode').style.display = 'none';
  }

  return (
    <div id='outerDiv'>
      <div className='borderBox'>
        <div id='mainDiv'>
          <input
            id='emailInput'
            type='text'
            placeholder='Email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {newAccountMode && (
            <input
              id='displaynameInput'
              type='text'
              placeholder='Display Name'
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
            />
          )}
          <input
            id='passwordInput'
            type='password'
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {newAccountMode && (
            <input
              id='cPasswordInput'
              type='password'
              placeholder='Confirm Password'
              value={cPassword}
              onChange={(e) => setcPassword(e.target.value)}
            />
          )}

          {newAccountMode && (
            <div id='createButton' onClick={userCreate}>
              Create Account
            </div>
          )}

          <div id='signinButton' onClick={userSignIn}>
            Sign In
          </div>
          <div id='createMode' onClick={createMode}>
            Create Account
          </div>
        </div>
      </div>
    </div>
  );
}
