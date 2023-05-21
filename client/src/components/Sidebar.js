import React from 'react';
import '../styles/Sidebar.css';
import { useState } from 'react';
import Feed from './Feed';
import Top10 from './Top10';
import Settings from './Settings';

export default function Input ({ messages, tray, setTray, userPreference, setUserPreference, signIn, swearFilter, setSwearFilter, setMessages }) {
    const [feed, setFeed] = useState(true);
    const [topTen, setTopTen] = useState(false);
    const [settings, setSettings] = useState(false);

  if (tray === true) {
    return (
      <div className='sideBar'>
          <div className='btnContainer'>
            <button 
              id='feed' 
              onClick={()=>{
                setFeed(true)
                setTopTen(false)
                setSettings(false)
              }}
            >Feed</button>
            <button 
              id='top10' 
              onClick={()=>{
                setFeed(false)
                setTopTen(true)
                setSettings(false)
              }}
            >Top 10</button>
            <button 
              id='settings'
              onClick={()=>{
                setFeed(false)
                setTopTen(false)
                setSettings(true)
              }}
              disabled={!signIn}
            >Settings</button>
            <div className='close-btn' onClick={()=>setTray(false)}>
              <svg width='100%' height='100%' viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
                <path d="M512 64a448 448 0 1 1 0 896 448 448 0 0 1 0-896zm0 393.664L407.936 353.6a38.4 38.4 0 1 0-54.336 54.336L457.664 512 353.6 616.064a38.4 38.4 0 1 0 54.336 54.336L512 566.336 616.064 670.4a38.4 38.4 0 1 0 54.336-54.336L566.336 512 670.4 407.936a38.4 38.4 0 1 0-54.336-54.336L512 457.664z"/>
              </svg>
            </div>
          </div>
          <Feed feed={feed} messages={messages} setMessages={setMessages} swearFilter={swearFilter}/>
          <Top10 topTen={topTen} messages={messages}/>
          <Settings settings={settings} userPreference={userPreference} 
          setUserPreference={setUserPreference} swearFilter={swearFilter} setSwearFilter={setSwearFilter} signIn={signIn}/>
     
        </div>
    )
  } else {
    return (
      <div className='collapsedSideBar'>
        <div className='sidebar-navi-button' onClick={()=>{
          setTray(true);
          setFeed(true)
          setTopTen(false)
          setSettings(false);
        }}>
          <svg width='100%' height='100%' viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
            <path d="M160 826.88 273.536 736H800a64 64 0 0 0 64-64V256a64 64 0 0 0-64-64H224a64 64 0 0 0-64 64v570.88zM296 800 147.968 918.4A32 32 0 0 1 96 893.44V256a128 128 0 0 1 128-128h576a128 128 0 0 1 128 128v416a128 128 0 0 1-128 128H296z"/>
            <path d="M352 512h320q32 0 32 32t-32 32H352q-32 0-32-32t32-32zm0-192h320q32 0 32 32t-32 32H352q-32 0-32-32t32-32z"/>
          </svg>
        </div>
        <div className='sidebar-navi-button' onClick={()=>{
          setTray(true);
          setFeed(false)
          setTopTen(true)
          setSettings(false);
        }}>
          <svg width='100%' height='100%' viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
            <path d="M128 896V128h768v768H128zm291.712-327.296 128 102.4 180.16-201.792-47.744-42.624-139.84 156.608-128-102.4-180.16 201.792 47.744 42.624 139.84-156.608zM816 352a48 48 0 1 0-96 0 48 48 0 0 0 96 0z"/>
          </svg>
        </div>
        <div className={!signIn? 'sidebar-navi-button sidebar-navi-disabled':'sidebar-navi-button'} onClick={()=>{
            if (signIn) {
              setSettings(true);
              setTray(true);
              setFeed(false)
              setTopTen(false)
            }
        }}>
          <svg width='100%' height='100%' viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
            <path d="M600.704 64a32 32 0 0 1 30.464 22.208l35.2 109.376c14.784 7.232 28.928 15.36 42.432 24.512l112.384-24.192a32 32 0 0 1 34.432 15.36L944.32 364.8a32 32 0 0 1-4.032 37.504l-77.12 85.12a357.12 357.12 0 0 1 0 49.024l77.12 85.248a32 32 0 0 1 4.032 37.504l-88.704 153.6a32 32 0 0 1-34.432 15.296L708.8 803.904c-13.44 9.088-27.648 17.28-42.368 24.512l-35.264 109.376A32 32 0 0 1 600.704 960H423.296a32 32 0 0 1-30.464-22.208L357.696 828.48a351.616 351.616 0 0 1-42.56-24.64l-112.32 24.256a32 32 0 0 1-34.432-15.36L79.68 659.2a32 32 0 0 1 4.032-37.504l77.12-85.248a357.12 357.12 0 0 1 0-48.896l-77.12-85.248A32 32 0 0 1 79.68 364.8l88.704-153.6a32 32 0 0 1 34.432-15.296l112.32 24.256c13.568-9.152 27.776-17.408 42.56-24.64l35.2-109.312A32 32 0 0 1 423.232 64H600.64zm-23.424 64H446.72l-36.352 113.088-24.512 11.968a294.113 294.113 0 0 0-34.816 20.096l-22.656 15.36-116.224-25.088-65.28 113.152 79.68 88.192-1.92 27.136a293.12 293.12 0 0 0 0 40.192l1.92 27.136-79.808 88.192 65.344 113.152 116.224-25.024 22.656 15.296a294.113 294.113 0 0 0 34.816 20.096l24.512 11.968L446.72 896h130.688l36.48-113.152 24.448-11.904a288.282 288.282 0 0 0 34.752-20.096l22.592-15.296 116.288 25.024 65.28-113.152-79.744-88.192 1.92-27.136a293.12 293.12 0 0 0 0-40.256l-1.92-27.136 79.808-88.128-65.344-113.152-116.288 24.96-22.592-15.232a287.616 287.616 0 0 0-34.752-20.096l-24.448-11.904L577.344 128zM512 320a192 192 0 1 1 0 384 192 192 0 0 1 0-384zm0 64a128 128 0 1 0 0 256 128 128 0 0 0 0-256z"/>
          </svg>
        </div>
      </div>
    );
  }
}