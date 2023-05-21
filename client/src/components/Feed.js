import React from 'react';
import '../styles/Feed.css';
import Moment from 'moment';

const upvoted = [];

export default function Feed({ messages, feed, setMessages, swearFilter }) {
  function checkUpvote(id) {
    if (upvoted.includes(id)) {
      return 'upvote upvote-disabled';
    } else {
      return 'upvote';
    }
  }

  messages.sort(function (a, b) {
    let likeA = a.messageId;
    let likeB = b.messageId;

    if (likeA < likeB) return -1;
    if (likeA > likeB) return 1;
    return 0;
  });

  const upvoteFunction = async (id) => {
    document.getElementById(id).classList.add('upvote-disabled');

    upvoted.push(id);

    const clickId = (id) => {
      return id;
    };

    const fb_uid = localStorage.getItem('uid');
    const messageId = clickId(id);
    const filtered = swearFilter;

    await fetch(
      `http://localhost:8080/upvote?id=${messageId}&fb_uid=${fb_uid}&filtered=${filtered}`,
      {
        method: 'PATCH',
      }
    )
      .then((response) => response.json())
      .then((result) => {
        setMessages(result);
      });
  };

  const reversedMessages = messages.slice().reverse();
  if (feed === true) {
    return (
      <div className='feedContainer'>
        {reversedMessages.map((item) => (
          <div className='feedCard'>
            <p className='msgContent'>{item.messageContent}</p>
            <div className='msgDetails'>
              <p className='msgDisplayName'>{item.displayName}</p>
              <div className='vote-container'>
                <div
                  className={checkUpvote(item.messageId)}
                  id={item.messageId}
                  onClick={() => {
                    upvoteFunction(item.messageId);
                  }}
                >
                  <svg
                    width='100%'
                    height='100%'
                    viewBox='0 0 1024 1024'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      fill='#000000'
                      d='M512 64a448 448 0 1 1 0 896 448 448 0 0 1 0-896zm-38.4 409.6H326.4a38.4 38.4 0 1 0 0 76.8h147.2v147.2a38.4 38.4 0 0 0 76.8 0V550.4h147.2a38.4 38.4 0 0 0 0-76.8H550.4V326.4a38.4 38.4 0 1 0-76.8 0v147.2z'
                    />
                  </svg>
                </div>
                <p className='msgLikeCount'>{item.likeCount}</p>
              </div>
              <p className='msgUploadTime'>
                {Moment(item.uploadTime).format('YYYY-MM-DD')}
              </p>
            </div>
          </div>
        ))}
      </div>
    );
  } else {
    return;
  }
}
