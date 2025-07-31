'use client'

import React, { useState, useEffect, useRef } from 'react'
import { Play, Pause } from 'lucide-react'
import{ motion, AnimatePresence } from 'framer-motion'

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
        src="/Bgm new.mp3"
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
  const [musicPlaying, setMusicPlaying] = useState(false)  // Add this line
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
      setMusicPlaying(true)  // Add this line to start music
    }
    setCurrentScreen((prev) => (prev + 1) % 5)
  }

  if (isLoading) {
    return <Loader />
  }

  return (
    <div className="min-h-screen bg-black relative overflow-hidden font-cute">
      <BackgroundAnimation />
      
      {/* Add this BackgroundMusic component */}
      <BackgroundMusic musicPlaying={musicPlaying} setMusicPlaying={setMusicPlaying} />
      
      {/* For background song */}
      {/* {showMusicControl && (
        <MusicPlayer musicPlaying={musicPlaying} />
      )} */}

      <AnimatePresence mode="wait">
        {currentScreen === 0 && (
          <WelcomeScreen
            key="welcome"
            onNext={nextScreen}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
          />
        )}
        {currentScreen === 1 && (
          <MissCounterScreen
            key="counter"
            onNext={nextScreen}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
          />
        )}
        {currentScreen === 2 && (
          <MessageScreen
            key="message"
            onNext={nextScreen}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
          />
        )}
        {currentScreen === 3 && (
          <MemoriesScreen
            key="memories"
            onNext={nextScreen}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
          />
        )}
        {currentScreen === 4 && (
          <FinalScreen
            key="final"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          />
        )}
      </AnimatePresence>

      {/* Watermark */}
      <motion.div
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{
          duration: 0.5,
          delay: 1,
        }}
        className="fixed bottom-4 right-4 text-xs text-white/40 pointer-events-none"
      >
        @jaffarprogram
      </motion.div>
    </div>
  )
}
