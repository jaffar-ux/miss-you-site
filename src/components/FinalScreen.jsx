"use client"

import { useState, useEffect } from 'react'

export default function FinalScreen({ currentIndex, finalMessage }) {
  return (
    <div className="min-h-screen flex items-center justify-center text-center px-6 relative">
      <div className="max-w-4xl z-10">
        <div>
          {"Tu ketee bhe dhur ho, Mai kete bhe dhur honde tere yaddo mey hee hu 😥, mai ketaa love kartun ki otaa he miss kartu hu tujhe 😓, I love you Muhassina and I lots of miss you maaaaaa 🥲, mai wait karunga tere liye aur kete bhee din ho bad mera dil mat thodnaa 😥, I miss you maaa ❤️‍🩹" }
        </div>
      </div>
    </div>
  )
}
                    className="mb-8 flex justify-center"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                >
                    <div><img src="/gifs/us.gif" alt="us gif" className="w-48" /></div>
                </.div>

                <motion.h2
                    className="text-4xl md:text-6xl font-bold mb-8 bg-gradient-to-r from-pink-400 via-purple-400 to-pink-400 bg-clip-text text-transparent"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                >
                    Mai kabee tereach hu aur rahunga
                </motion.h2>

                <.div
                    className="bg-gray-950/50 backdrop-blur-md border border-pink-500/10 rounded-3xl p-5 md:p-10 shadow-2xl mb-8"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.8 }}
                >
                    <p className="text-lg md:text-2xl text-white leading-relaxed font-light">
                        {displayText}
                        {isTyping && (
                            <motion.span
                                className="inline-block w-0.5 h-6 bg-pink-400 ml-1"
                                animate={{ opacity: [0, 1, 0] }}
                                transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
                            />
                        )}
                    </p>
                <.div>
            </div>
         </.div>
    )
}
