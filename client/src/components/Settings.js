import React from 'react';

export default function Top10({
  settings,
  userPreference,
  setUserPreference,
  swearFilter,
  setSwearFilter,
  signIn,
}) {
  const updateUserPreferences = async (
    fb_uid,
    displayName,
    profanity,
    anonymous
  ) => {
    // const endpoint = process.env.EXPRESS_URL || 'http://127.0.0.1:8000';
    const endpoint = process.env.REACT_APP_EXPRESS_URL;
    await fetch(
      `${endpoint}/updateUserPreferences?fb_uid=${fb_uid}&displayName=${displayName}&profanity=${profanity}&anonymous=${anonymous}`,
      {
        method: 'PATCH',
      }
    );
  };

  function checkBoxEval(state) {
    if (userPreference[state]) {
      return 'checked';
    } else {
      return '!checked';
    }
  }

  function checkSwearFilter() {
    if (swearFilter) {
      return true;
    } else {
      return false;
    }
  }

  if (settings && signIn) {
    return (
      <div className='feedContainer'>
        <div>
          <button
            className='logout'
            onClick={() => {
              localStorage.removeItem('uid');
              window.location.reload(true);
            }}
          >
            Log out
          </button>
          <input
            type='checkbox'
            className='toggleBox'
            name='swearFilter'
            defaultChecked={checkSwearFilter()}
            onChange={() => {
              setUserPreference({
                displayName: userPreference.displayName,
                profanity: !userPreference.profanity,
                anonymous: userPreference.anonymous,
              });
              setSwearFilter(!swearFilter);
              //update backend
              updateUserPreferences(
                localStorage.getItem('uid'),
                userPreference.displayName,
                !userPreference.profanity,
                userPreference.anonymous
              );
            }}
          />
          <label htmlFor='swearFilter'>Toggle Swear Filter</label>
          {/* <input type='checkbox' className='toggleBox' name='anonymous' defaultChecked={checkBoxEval('anonymous')}
          onChange={()=>{
            setUserPreference({
              displayName: userPreference.displayName,
              profanity: userPreference.profanity,
              anonymous: (!userPreference.anonymous)
              });
            }}/>
          <label htmlFor='anonymous'>Post Anonymously</label> */}
        </div>
      </div>
    );
  } else if (settings && !signIn) {
    return <div className='feedContainer'></div>;
  } else {
    return;
  }
}
