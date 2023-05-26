import React, { useEffect, useRef, useState } from 'react';
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
   const [isLiked ,setIsLiked] = useState(false)

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
      addToFavorites()
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
               else if(audioFiles.length > 1) setIndexNumber(indexNumber + 1)
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

   const addToFavorites = () => {
      if(audioFiles.length) {
         if(localStorage.getItem(`${indexNumber}`)) {
            localStorage.removeItem(`${indexNumber}`)
            setIsLiked(false)
         } 
         else {
            localStorage.setItem(indexNumber, audioFiles[indexNumber].songName)
            setIsLiked(true)
         }
      }
   }
   
   return (
      <div className="relative overflow-hidden w-300 h-600 bg-0b0b0c rounded-40 font-gothamBold sm:w-screen sm:h-screen sm:rounded-none lg:w-400 lg:h-700">
         <div className="absolute flex flex-col justify-start w-full h-full">
            <header className="w-full h-12% bg-transparent">
               <div className="w-full h-full flex justify-between items-center pt-0.5 px-26 pb-0 lg:px-30">
                  <img src={ArrowLeft} className="z-10 transition duration-200 cursor-pointer w-17 opacity-60 hover:opacity-90 lg:w-22"/>
                  <p className={`${playState? 'animate-colorAnimation' : 'animate-none'} text-ffffff77 font-gothamThin text-headerTxtSize sm:text-base lg:text-headerTxtLg`}>{playState ? 'Playing now' : 'Paused'}</p>
                  <input className="hidden" ref={input} type='file' id="fileInput" multiple onChange={changeHandler}/>
                  <label className="z-10 flex items-center justify-center cursor-pointer w-23 lg:w-30" htmlFor="fileInput">
                     <img src={Playlist} className="z-10 transition duration-200 w-23 opacity-60 hover:opacity-90 lg:w-30"/>
                  </label>
                  <audio src={`songs/${audioNames[indexNumber]}`} ref={player}></audio>
               </div>
            </header>
            <main className="w-full h-68% z-10">
               <div className="w-full h-75% pt-0 px-25 pb-27 lg:px-30">
                  <div className="flex items-center justify-center w-full h-full overflow-hidden bg-black rounded-20 shadow-coverImgShadow">
                     <img src={CoverImage} className="object-cover w-full h-full"/>  
                  </div>
               </div>
               <div className="w-full h-25% flex flex-col justify-between py-0 px-25 lg:px-30">
                  <div className="relative flex flex-col justify-between w-full h-60 lg:w-70">
                     <div className="flex flex-row items-center justify-between h-1/2">
                        <h1 className="flex items-center justify-between h-full font-gothamMedium text-songNameSize text-F8F8F8 sm:text-2xl lg:text-songNameLg">{audioFiles.length ? audioFiles[indexNumber].songName : 'No title'}</h1>
                        <img src={localStorage.getItem(`${indexNumber}`) && isLiked ? RedHeart : WhiteHeart } className="cursor-pointer w-23 opacity-90 lg:w-30" onClick={addToFavorites}/>
                     </div>
                     <p className="h-35% flex justify-start items-center text-ffffff79 text-infoTxtSize tracking-wide font-gothamThin leading-17 sm:text-headerTxtSize lg:text-musicInfoLg">{audioFiles.length ? audioFiles[indexNumber].artist : 'Unknown'}</p>
                  </div>
                  <div className="relative w-full h-40 flex justify-center items-end pb-0.5">
                     <div className="relative flex items-center justify-start w-full h-3 cursor-pointer bg-ffffff5c" onClick={seekingHandler}>
                        <div className="flex items-center justify-end w-0 h-full cursor-pointer bg-F8F8F8 " style={{width: lengthBar}}>
                           <img src={CircleWheel} className="absolute cursor-pointer w-9" style={{left: lengthBar-5}}/>
                        </div>
                     </div>
                     <span className="right-0 time lg:-bottom-20 lg:text-timeTxtLg">
                        {timeInfo.duration ? timeInfo.duration : '0:00'} 
                     </span>
                     <span className="left-0 time lg:-bottom-20 lg:text-timeTxtLg">
                        {timeInfo.currentTime ? timeInfo.currentTime : '0:00'}
                     </span>
                  </div>
               </div>
            </main>
            <footer className="w-full h-20% flex justify-center items-center pt-0.5 px-25 pb-0 lg:px-30">
               <div className="flex flex-row items-center justify-between w-full">
                  <img src={Shuffle} className="opacity-50 controlsImg w-21 hover:opacity-95 lg:w-25" style={{opacity: shuffleState && '100%'}} onClick={() => setShuffleState(!shuffleState)}/>
                  <img src={Next_Previous} className="rotate-180 controlsImg w-19 opacity-95 hover:opacity-60 lg:w-23" onClick={() => indexNumberHandler('decrease')}/>
                  <div className="z-10 flex items-center justify-center transition duration-200 rounded-full cursor-pointer w-66 h-66 hover:opacity-60 bg-F8F8F8 lg:w-72 lg:h-72" onClick={playPauseHandler}>
                     {
                        playState? <img className="controlsImg w-15 hover:opacity-100 lg:w-17" src={Pause}/> : <img className="controlsImg w-15 hover:opacity-100 lg:w-17" src={Play}/>
                     }
                  </div>
                  <img src={Next_Previous} className="controlsImg w-19 opacity-95 hover:opacity-60" onClick={() => indexNumberHandler('increase')}/>
                  <img src={Repeat} className="opacity-50 controlsImg w-21 hover:opacity-95 lg:w-25"/>
               </div>
            </footer>
         </div>
         <div className={`${playState ? 'animate-circlesAnimation' : 'animate-none'} w-full h-full relative blur-40`}>
            <span className="circles -left--10 -top-30">left</span>
            <span className="circles -right--10 -bottom-30"></span>
         </div>
      </div>
   );
};

export default Player;