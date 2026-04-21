"use client"

import { useState, useEffect } from "react"
import { AnimatePresence } from "motion/react"

import Loader from "./components/Loader"
import Countdown from "./components/Countdown"
import Celebration from "./components/Celebration"
import HappyBirthday from "./components/HappyBirthday"
import PhotoGallery from "./components/PhotoGallery"
import Letter from "./components/Letter"

import { motion } from "motion/react"

export default function BirthdayApp() {
  const [currentScreen, setCurrentScreen] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  // 🎯 AUTO HANDLE NEXT JUNE 16
  const getNextBirthday = () => {
    const now = new Date()
    const currentYear = now.getFullYear()

    let birthday = new Date(`${currentYear}-06-16T00:00:00`)

    if (now.getTime() > birthday.getTime()) {
      birthday = new Date(`${currentYear}-06-16T00:00:00`)
    }

    // This is every year repeating of jaanu
    // if (now.getTime() > birthday.getTime()) {
    //   birthday = new Date(`${currentYear + 1}-06-16T00:00:00`)
    // }

    return birthday
  }

  const birthdayDate = getNextBirthday()

  const [isBirthdayOver, setIsBirthdayOver] = useState(
    new Date().getTime() >= birthdayDate.getTime()
  )

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 4000)

    return () => clearTimeout(timer)
  }, [])

  const screens = [
    !isBirthdayOver ? (
      <Countdown
        key="countdown"
        birthdayDate={birthdayDate}
        onComplete={() => setIsBirthdayOver(true)}
      />
    ) : (
      <Celebration
        key="celebration"
        onNext={() => setCurrentScreen(1)}
      />
    ),
    <HappyBirthday key="happy" onNext={() => setCurrentScreen(2)} />,
    <PhotoGallery key="gallery" onNext={() => setCurrentScreen(3)} />,
    <Letter key="letter" />,
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-950/30 via-black to-purple-950/30 overflow-hidden relative">

      {/* Background glow */}
      <div className="fixed inset-0 z-0 blur-[120px] opacity-20"
        style={{
          backgroundImage: "radial-gradient(circle at 20% 25%, rgba(255, 99, 165, 0.6), transparent 40%)",
        }}
      />

      <div className="fixed inset-0 z-0 blur-[120px] opacity-20"
        style={{
          backgroundImage: "radial-gradient(circle at 80% 80%, rgba(99, 102, 241, 0.6), transparent 40%)",
        }}
      />

      <div className="fixed inset-0 z-0 blur-[160px] opacity-10"
        style={{
          backgroundImage: "radial-gradient(circle at 50% 50%, rgba(228, 193, 255, 0.4), transparent 40%)",
        }}
      />

      <AnimatePresence mode="wait">
        {isLoading ? (
          <Loader key="loader" />
        ) : (
          <AnimatePresence mode="wait">
            {screens[currentScreen]}
          </AnimatePresence>
        )}
      </AnimatePresence>

      {/* Watermark */}
      <motion.div
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="fixed bottom-4 right-4 text-[13px] text-white/40 pointer-events-none z-50 font-light"
      >
        @Jaanu B'day
      </motion.div>
    </div>
  )
}