import React from 'react';
import Canvas from './Canvas';
import Input from './Input';
import '../styles/App.css';
import { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import animateCanvas from '../modules/animateCanvas';
import { rantMessage } from '../modules/animateCanvas';
import Account from './Account';
import { io } from 'socket.io-client';

const endpoint = process.env.REACT_APP_EXPRESS_URL;
const socket = io(endpoint);

export const rantMessageToCanvasArray = [];

function addRantMessageToCanvasArray(array, selector) {
  let x = Math.random();
  let y = Math.random();
  let index;
  if (selector === true) {
    index = generateRandomMessageIndex(array);
  } else {
    index = array.length - 1;
  }
  rantMessageToCanvasArray.push(
    new rantMessage(
      `${array[index].messageContent} - ${array[index].displayName}`,
      20,
      x,
      y
    )
  );
}

function generateRandomMessageIndex(array) {
  const max = array.length;
  return Math.floor(Math.random() * max);
}

function App() {
  const [messages, setMessages] = useState([
    {
      messageContent: 'There doesnt seem to be anything here',
      displayName: 'system',
    },
  ]);

  socket.on('posted message', (message) => {
    setMessages([...messages, JSON.parse(message)]);
  });

  const [interactionHistory, setInteractionHistory] = useState([]);
  const [rageBox, setRageBox] = useState(true);
  const [signIn, setSignIn] = useState(false);
  const [tray, setTray] = useState(false);
  const [swearFilter, setSwearFilter] = useState(true);
  const [userPreference, setUserPreference] = useState([
    { displayName: '', swearFilter: false, anonymous: false },
  ]);
  const [frameGeneration, setFrameGeneration] = useState(false);

  window.addEventListener('load', () => {
    let event = new Event('resize');
    window.dispatchEvent(event);
  });

  const tokenValidation = async () => {
    const uid = localStorage.getItem('uid');

    if (!uid) {
      setSignIn(false);
      return;
    }

    const response = await fetch(`${endpoint}/validation?q=${uid}`);
    const userInfo = await response.json();
    if (userInfo.uid === '') {
      setSignIn(false);
    } else {
      setSignIn(true);
      setUserPreference({
        displayName: userInfo.displayName,
        profanity: userInfo.profanity,
        anonymous: userInfo.anonymous,
      });
      if (userPreference.profanity === false) {
        setSwearFilter(false);
      }
    }
  };

  const filteredMessageRequest = async () => {
    const response = await await fetch(`${endpoint}/rage/filtered`);
    const fullResponse = await response.json();
    const filteredResponse = fullResponse[0];
    const newInteraction = fullResponse[1];
    setInteractionHistory(newInteraction);
    setMessages(filteredResponse);
  };

  const plainMessageRequest = async () => {
    const response = await fetch(`${endpoint}/rage/unfiltered`);
    const fullResponse = await response.json();
    const plainResponse = fullResponse[0];
    const newInteraction = fullResponse[1];
    setInteractionHistory(newInteraction);
    setMessages(plainResponse);
  };

  //initial load state
  useEffect(() => {
    tokenValidation();

    if (signIn && swearFilter === false) {
      const fetchPlainMessage = async () => {
        await plainMessageRequest();
      };
      fetchPlainMessage();
    } else {
      const fetchFilteredMessage = async () => {
        await filteredMessageRequest();
      };
      fetchFilteredMessage();
    }
  }, []);

  //show newest message to screen
  useEffect(() => {
    if (messages.length > 1) addRantMessageToCanvasArray(messages, false);
  }, [messages]);

  // add prefrence change here too??
  //continually add new items to canvas
  useEffect(() => {
    const generateCanvasFrameTimer = setTimeout(() => {
      if (messages.length > 1) addRantMessageToCanvasArray(messages, true);
      setFrameGeneration(!frameGeneration);
    }, 1000);

    return () => clearInterval(generateCanvasFrameTimer);
  }, [frameGeneration]);

  const checkSignedOn = () => {
    if (signIn === true) {
      if (tray === true) {
        return (
          <div className='containerTrayOut'>
            <h1 className='user-name'>{`Posting as: ${userPreference.displayName}`}</h1>
            <Input
              rageBox={rageBox}
              setRageBox={setRageBox}
              setMessages={setMessages}
              swearFilter={swearFilter}
              messages={messages}
              socket={socket}
            />
          </div>
        );
      } else {
        return (
          <div className='container'>
            <h1 className='user-name'>{`Posting as: ${userPreference.displayName}`}</h1>
            <Input
              rageBox={rageBox}
              setRageBox={setRageBox}
              setMessages={setMessages}
              swearFilter={swearFilter}
              messages={messages}
              socket={socket}
            />
          </div>
        );
      }
    } else {
      return (
        <Account
          setSignIn={setSignIn}
          setSwearFilter={setSwearFilter}
          setUserPreference={setUserPreference}
        />
      );
    }
  };

  return (
    <div className='App'>
      <Canvas draw={animateCanvas} id='myCanvas' />
      <Sidebar
        tray={tray}
        messages={messages}
        setMessages={setMessages}
        setTray={setTray}
        userPreference={userPreference}
        setUserPreference={setUserPreference}
        swearFilter={swearFilter}
        setSwearFilter={setSwearFilter}
        signIn={signIn}
      />
      {checkSignedOn()}
    </div>
  );
}

export default App;
