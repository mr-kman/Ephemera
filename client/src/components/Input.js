import React from 'react';
import '../styles/Input.css';
import Moment from 'moment';
import Filter from 'bad-words';

let filter = new Filter();

const endpoint = process.env.REACT_APP_EXPRESS_URL;

export default function Input({
  rageBox,
  setRageBox,
  setMessageToBeSent,
  messageToBeSent,
  setMessages,
  swearFilter,
  messages,
  socket,
}) {
  const postFunction = async () => {
    const uid = localStorage.getItem('uid');
    const rageBoxContent = document.getElementById('rageInput');

    const messageSendTest = {};

    const baseInput = rageBoxContent.value;

    const messageFilter = filter.clean(baseInput);

    const capitalLetterFilter = baseInput
      .split('')
      .filter((singleLetter) => {
        let charCode = baseInput.charCodeAt(singleLetter);
        if (charCode >= 65 && charCode <= 90) {
          return singleLetter;
        }
      })
      .join('');

    const uploadTime = Moment().format('YYYY-MM-DD hh:mm:ss');

    const profanity = swearFilter;

    messageSendTest.fb_uid = uid;
    messageSendTest.messagePlain = baseInput;
    messageSendTest.messageFilter = messageFilter;
    messageSendTest.messageSize = capitalLetterFilter.length;
    messageSendTest.uploadTime = uploadTime;
    messageSendTest.likeCount = 1;
    messageSendTest.profanity = profanity;

    await fetch(`${endpoint}/postMessage`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(messageSendTest),
    });
  };

  function displayMessage() {
    return (
      <div className='rageContainer'>
        <input
          className='rageBox'
          id='rageInput'
          type='text'
          placeholder='Fill me with fury...'
          maxLength={140}
        />
        <button
          className='rageBtn'
          onClick={() => {
            postFunction();
            document.getElementById('rageInput').value = '';
          }}
        >
          Unleash the Fury
        </button>
      </div>
    );
  }

  return displayMessage();
}
