'use client'

import React, { useState, useEffect, useRef } from 'react'
import BackgroundAnimation from '../components/BackgroundAnimation'
import Loader from '../components/Loader'
import WelcomeScreen from '../components/WelcomeScreen'
import MissCounterScreen from '../components/MissCounterScreen'
import MessageScreen from '../components/MessageScreen'
import MemoriesScreen from '../components/MemoriesScreen'
import FinalScreen from '../components/FinalScreen'

const BackgroundMusic = ({ musicPlaying, setMusicPlaying }) => {
  const audioRef = useRef(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      if (musicPlaying) {
        const playPromise = audio.play();
        if (playPromise !== undefined) {
          playPromise.catch(error => {
            console.log("Auto-play prevented:", error);
          });
        }
      } else {
        audio.pause();
      }
    }
  }, [musicPlaying]);

  const togglePlay = () => {
    setMusicPlaying(!musicPlaying);
  };

  return (
    <>
      <audio
        ref={audioRef}
        loop
        preload="auto"
        src="/audio/Bgm new.mp3"
      />
      
      {/* Play/Pause Button with Text Icons */}
      <button
        onClick={togglePlay}
        className="fixed bottom-4 right-4 bg-black/50 backdrop-blur-sm rounded-full w-12 h-12 flex items-center justify-center text-white hover:bg-black/70 transition-colors z-50 text-xl"
      >
        {musicPlaying ? '⏸️' : '▶️'}
      </button>
    </>
  );
};

export default function Home() {
  const [currentScreen, setCurrentScreen] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [musicPlaying, setMusicPlaying] = useState(false)
  const [showMusicControl, setShowMusicControl] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 4000)
    return () => clearTimeout(timer)
  }, [])

  const nextScreen = () => {
    if (currentScreen === 0) {
      setShowMusicControl(true)
      setMusicPlaying(true)
    }
    setCurrentScreen((prev) => (prev + 1) % 5)
  }

  if (isLoading) {
    return <Loader />
  }

  return (
    <div className="min-h-screen bg-black relative overflow-hidden font-cute">
      <BackgroundAnimation />
      
      {/* Background Music Component */}
      <BackgroundMusic musicPlaying={musicPlaying} setMusicPlaying={setMusicPlaying} />

      {/* Screen Transitions */}
      <div className="relative z-10">
        {currentScreen === 0 && (
          <WelcomeScreen onNext={nextScreen} />
        )}
        {currentScreen === 1 && (
          <MissCounterScreen onNext={nextScreen} />
        )}
        {currentScreen === 2 && (
          <MessageScreen onNext={nextScreen} />
        )}
        {currentScreen === 3 && (
          <MemoriesScreen onNext={nextScreen} />
        )}
        {currentScreen === 4 && (
          <FinalScreen />
        )}
      </div>

      {/* Watermark */}
      <div className="fixed bottom-4 left-4 text-xs text-white/40 pointer-events-none">
        
      </div>
    </div>
  )
}
