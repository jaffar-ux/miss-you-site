'use client'

import React, { useState, useEffect, useRef } from 'react'
import { Play, Pause } from 'lucide-react'
import BackgroundAnimation from '../components/BackgroundAnimation'
import Loader from '../components/Loader'
import WelcomeScreen from '../components/WelcomeScreen'
import MissCounterScreen from '../components/MissCounterScreen'
import MessageScreen from '../components/MessageScreen'
import MemoriesScreen from '../components/MemoriesScreen'
import FinalScreen from '../components/FinalScreen'

// Background Music Component
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
      
      {/* Play/Pause Button */}
      <button
        onClick={togglePlay}
        className="fixed bottom-4 right-4 bg-black/50 backdrop-blur-sm rounded-full p-3 text-white hover:bg-black/70 transition-colors z-50"
      >
        {musicPlaying ? <Pause size={24} /> : <Play size={24} />}
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

      {/* Screen Transitions with CSS animations */}
      <div className="relative z-10">
        {currentScreen === 0 && (
          <div className="animate-fade-in">
            <WelcomeScreen onNext={nextScreen} />
          </div>
        )}
        {currentScreen === 1 && (
          <div className="animate-slide-in-right">
            <MissCounterScreen onNext={nextScreen} />
          </div>
        )}
        {currentScreen === 2 && (
          <div className="animate-slide-in-up">
            <MessageScreen onNext={nextScreen} />
          </div>
        )}
        {currentScreen === 3 && (
          <div className="animate-zoom-in">
            <MemoriesScreen onNext={nextScreen} />
          </div>
        )}
        {currentScreen === 4 && (
          <div className="animate-bounce-in">
            <FinalScreen />
          </div>
        )}
      </div>

      {/* Watermark */}
      <div className="fixed bottom-4 left-4 text-xs text-white/40 pointer-events-none animate-fade-in-delayed">
        @rooyal_blood_
      </div>
    </div>
  )
}
