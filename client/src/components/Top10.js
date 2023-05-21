import React from 'react';
import Moment from 'moment';

const topMessages = (fullMessageList) => {
  fullMessageList.sort(function (a, b){
    let likeA = a.likeCount;
    let likeB = b.likeCount;

    if (likeA < likeB) return -1;
    if (likeA > likeB) return 1;
    return 0;
  });
};

export default function Top10 ({ messages, topTen }) {
  const sortArray = messages.slice()
  topMessages(sortArray);
  const topTenMessages = sortArray.slice(-10).reverse();

  if (topTen === true) {
    return (
      <div className='feedContainer'>
        {topTenMessages.map((item) => (
          <div className='feedCard'>
            <p className='msgContent'>{item.messageContent}</p>
            <div className='msgDetails'>
              <p className='msgDisplayName'>{item.displayName}</p>
              <div className='vote-container'>
                <div className='upvote' id={item.messageId}>
                  <p className='msgLikeCount'>{item.likeCount}</p>
                </div>
              </div>
              <p className='msgUploadTime'>{Moment(item.uploadTime).format('YYYY-MM-DD')}</p>
            </div>
          </div>
        ))}
      </div>
    )
  } else {
    return;
  }
}