import React, { useEffect, useRef, useState } from 'react';
import styles from './Player.module.css';
//Icons
import ArrowLeft from '../icons/left-arrow.svg';
import Playlist from '../icons/queue.svg';
import WhiteHeart from '../icons/whiteheart.svg';
import RedHeart from '../icons/redheart.svg';
import Play from '../icons/play.svg';
import Pause from '../icons/pause.svg';
import Next_Previous from '../icons/next.svg';
import Repeat from '../icons/loop.svg';
import Shuffle from '../icons/shuffle.svg';
import CircleWheel from '../icons/circle (1).svg';
//Images
import CoverImage from '../icons/aaron-paul-wnX-fXzB6Cw-unsplash.jpg';


const Player = () => {

   const [audioFiles , setAudioFiles] = useState([])
   const [playState , setPlayState] = useState(false)
   const [indexNumber , setIndexNumber] = useState(0)
   const [audioNames , setAudioNames] = useState([])
   const [lengthBar , setLengthBar] = useState(0)
   const [timeInfo , setTimeInfo] = useState({})
   const [shuffleState , setShuffleState] = useState(false)

   const input = useRef(null)
   const player = useRef(null)

   useEffect(() => {
      if(playState && audioFiles.length) {
         player.current.play()
      }
      else {
         setPlayState(false)
      }
   },[indexNumber , audioFiles.length])
   
   const changeHandler = () => {
      audioNamesSubstr(input.current.files)
      timeHandler()
   }

   const audioNamesSubstr = (audioList) => {
      const substrAudioFiles = [] 
      const audioNames = []
      for(let audio of audioList) {
         audioNames.push(audio.name)
         const splittedName = audio.name.split('-')
         const songName = splittedName[1].substr(splittedName[1][0],splittedName[1].length-4)
         const artistName = splittedName[0]
         substrAudioFiles.push({artist: artistName , songName: songName})
      }
      setAudioFiles(substrAudioFiles)
      setAudioNames(audioNames)
   }
   
   const playPauseHandler = () => {
      if(!playState && audioFiles.length) {
         player.current.play()
         setPlayState(true)
      }
      else {
         player.current.pause()
         setPlayState(false)
      }
   }

   const indexNumberHandler = (type) => {
      if(shuffleState) {
         setIndexNumber(Math.floor(Math.random()*4))
      }
      else {
         if(type === 'increase') {
            if(indexNumber == audioFiles.length-1) {
               setIndexNumber(0)
            }
            else {
               setIndexNumber(indexNumber + 1)
            }
         }
         else {
            if(indexNumber == 0) {
               setIndexNumber(audioFiles.length-1)
            }
            else {
               setIndexNumber(indexNumber - 1)
            }
         }
      }
   }

   const seekingHandler = (event) => {
      if(audioFiles.length) {
         player.current.currentTime = (event.nativeEvent.offsetX * player.current.duration) / 250
         setLengthBar(event.nativeEvent.offsetX)
      }
   }

   const lengthBarCover = () => {
      if(playState) {
         setInterval(() => {
            const lengthCovered = (250* player.current.currentTime) / player.current.duration 
            setLengthBar(lengthCovered)
            timeHandler()
            if(playState && player.current.currentTime == player.current.duration) {
               if(shuffleState) setIndexNumber(Math.floor(Math.random()*4))
               else if(audioFiles.lengrh > 1) setIndexNumber(indexNumber + 1)
            }
         }, 1000)
      }
   }
   lengthBarCover()

   const timeHandler = () => {
      if(audioFiles.length && player.current.duration) {
         const currentTime = new Date(Math.round(player.current.currentTime) * 1000)
         const ctMinutes = currentTime.getUTCMinutes()
         const ctSeconds = currentTime.getUTCSeconds()
         const newCurrentTimeString = `${ctMinutes.toString()}:${ctSeconds.toString().padStart(2,'0')}`
         const duration = new Date(Math.round(player.current.duration) * 1000)
         const dMinutes = duration.getUTCMinutes()
         const dSeconds = duration.getUTCSeconds()
         const newDurationString = `${dMinutes.toString()}:${dSeconds.toString().padStart(2,'0')}`
         setTimeInfo({currentTime: newCurrentTimeString, duration: newDurationString})
      }
   }
   
   return (
      <div className={styles.mainContainer}>
         <div className={styles.player}>
            <header>
               <div className={styles.headerContainer}>
                  <img src={ArrowLeft} className={styles.arrowLeftIcon}/>
                  <p style={{animationPlayState: playState && 'running'}}>{playState ? 'Playing now' : 'Paused'}</p>
                  <input ref={input} type='file' id={styles.fileInput} multiple onChange={changeHandler}/>
                  <label htmlFor={styles.fileInput}>
                     <img src={Playlist} className={styles.playlistIcon}/>
                  </label>
                  <audio src={`songs/${audioNames[indexNumber]}`} ref={player}></audio>
               </div>
            </header>
            <main>
               <div className={styles.coverImgPart}>
                  <div className={styles.imgContainer}>
                     <img src={CoverImage}/>  
                  </div>
               </div>
               <div className={styles.musicInfoPart}>
                  <div className={styles.info}>
                     <div className={styles.songNameContainer}>
                        <h1>{audioFiles.length ? audioFiles[indexNumber].songName : 'No title'}</h1>
                        <img src={WhiteHeart} className={styles.likeButton}/>
                     </div>
                     <p>{audioFiles.length ? audioFiles[indexNumber].artist : 'Unknown'}</p>
                  </div>
                  <div className={styles.time}>
                     <div className={styles.lengthBar} onClick={seekingHandler}>
                        <div className={styles.coveredLength} style={{width: lengthBar}}>
                           <img src={CircleWheel} className={styles.circleWheel} style={{left: lengthBar-6}}/>
                        </div>
                     </div>
                     <span className={styles.songDuration}>
                        {timeInfo.duration ? timeInfo.duration : '0:00'} 
                     </span>
                     <span className={styles.songCurrentTime}>
                        {timeInfo.currentTime ? timeInfo.currentTime : '0:00'}
                     </span>
                  </div>
               </div>
            </main>
            <footer>
               <div className={styles.controlsPart}>
                  <img src={Shuffle} className={styles.shuffleIcon} style={{opacity: shuffleState && '100%'}} onClick={() => setShuffleState(!shuffleState)}/>
                  <img src={Next_Previous} className={styles.previousIcon} onClick={() => indexNumberHandler('decrease')}/>
                  <div className={styles.play_pauseIcon} onClick={playPauseHandler}>
                     {
                        playState? <img src={Pause}/> : <img src={Play}/>
                     }
                  </div>
                  <img src={Next_Previous} className={styles.nextIcon} onClick={() => indexNumberHandler('increase')}/>
                  <img src={Repeat} className={styles.repeatIcon}/>
               </div>
            </footer>
         </div>
         <div className={styles.backgroundCircles} style={{animationPlayState: playState && 'running'}}>
            <span className={styles.circleTopLeft}></span>
            <span className={styles.circleBottomRight}></span>
         </div>
      </div>
   );
};

export default Player;