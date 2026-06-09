// "use client"

// import { useState, useEffect } from "react"
// import { AnimatePresence } from "motion/react"

// import Loader from "./components/Loader"
// import Countdown from "./components/Countdown"
// import Celebration from "./components/Celebration"
// import HappyBirthday from "./components/HappyBirthday"
// import PhotoGallery from "./components/PhotoGallery"
// import Letter from "./components/Letter"

// import { motion } from "motion/react"

// export default function BirthdayApp() {
//   const [currentScreen, setCurrentScreen] = useState(0)
//   const [isLoading, setIsLoading] = useState(true)


//   // 🎵 ADD THIS FUNCTION
//   const playMusic = () => {
//     const audio = document.getElementById("bg-music")

//     if (audio) {
//       audio.volume = 0
//       audio.play().catch((err) => {
//         console.log("Audio blocked:", err)
//       })

//       let vol = 0
//       const interval = setInterval(() => {
//         if (vol < 1) {
//           vol += 0.1
//           audio.volume = vol
//         } else {
//           clearInterval(interval)
//         }
//       }, 200)
//     }
//   }


//   // 🎯 AUTO HANDLE NEXT JUNE 16
//   const getNextBirthday = () => {
//     const now = new Date()
//     const currentYear = now.getFullYear()

//     let birthday = new Date(`${currentYear}-06-16T00:00:00`)
//     // let birthday = new Date(`${currentYear}-04-16T00:00:00`)

//     if (now.getTime() > birthday.getTime()) {
//       birthday = new Date(`${currentYear}-06-16T00:00:00`)
//       // birthday = new Date(`${currentYear}-04-16T00:00:00`)
//     }

//     // This is every year repeating of jaanu
//     // if (now.getTime() > birthday.getTime()) {
//     //   birthday = new Date(`${currentYear + 1}-06-16T00:00:00`)
//     // }

//     return birthday
//   }

//   const birthdayDate = getNextBirthday()

//   const [isBirthdayOver, setIsBirthdayOver] = useState(
//     new Date().getTime() >= birthdayDate.getTime()
//   )

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setIsLoading(false)
//     }, 4000)

//     return () => clearTimeout(timer)
//   }, [])

//   const screens = [
//     !isBirthdayOver ? (
//       <Countdown
//         key="countdown"
//         birthdayDate={birthdayDate}
//         onComplete={() => setIsBirthdayOver(true)}
//       />
//     ) : (
//       <Celebration
//         key="celebration"
//         onNext={() => {
//           playMusic()   // 🎵 ADDED HERE
//           setCurrentScreen(1)
//         }}
//       />
//     ),
//     <HappyBirthday key="happy" onNext={() => setCurrentScreen(2)} />,
//     <PhotoGallery key="gallery" onNext={() => setCurrentScreen(3)} />,
//     <Letter key="letter" />,
//   ]

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-purple-950/30 via-black to-purple-950/30 overflow-hidden relative">

//       {/* 🎵 AUDIO ADDED HERE */}
//       <audio id="bg-music" loop>
//         <source src="/audio/jaanu.mp3" type="audio/mpeg" />
//       </audio>

//       {/* Background glow */}
//       <div className="fixed inset-0 z-0 blur-[120px] opacity-20"
//         style={{
//           backgroundImage: "radial-gradient(circle at 20% 25%, rgba(255, 99, 165, 0.6), transparent 40%)",
//         }}
//       />

//       <div className="fixed inset-0 z-0 blur-[120px] opacity-20"
//         style={{
//           backgroundImage: "radial-gradient(circle at 80% 80%, rgba(99, 102, 241, 0.6), transparent 40%)",
//         }}
//       />

//       <div className="fixed inset-0 z-0 blur-[160px] opacity-10"
//         style={{
//           backgroundImage: "radial-gradient(circle at 50% 50%, rgba(228, 193, 255, 0.4), transparent 40%)",
//         }}
//       />

//       <AnimatePresence mode="wait">
//         {isLoading ? (
//           <Loader key="loader" />
//         ) : (
//           <AnimatePresence mode="wait">
//             {screens[currentScreen]}
//           </AnimatePresence>
//         )}
//       </AnimatePresence>

//       {/* Watermark */}
//       <motion.div
//         initial={{ x: 100, opacity: 0 }}
//         animate={{ x: 0, opacity: 1 }}
//         transition={{ duration: 1, delay: 1 }}
//         className="fixed bottom-4 right-4 text-[13px] text-white/40 pointer-events-none z-50 font-light"
//       >
//         @Jaanu B'day
//       </motion.div>
//     </div>
//   )
// }

"use client"

import { useState, useEffect, useRef } from "react"
import { AnimatePresence, motion } from "motion/react"
import { Volume2, VolumeX } from "lucide-react"

import Loader from "./components/Loader"
import Countdown from "./components/Countdown"
import Celebration from "./components/Celebration"
import HappyBirthday from "./components/HappyBirthday"
import PhotoGallery from "./components/PhotoGallery"
import Letter from "./components/Letter"

export default function BirthdayApp() {
  const [currentScreen, setCurrentScreen] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [isMuted, setIsMuted] = useState(false)

  const audioRef = useRef(null)

  const playMusic = () => {
    const audio = audioRef.current

    if (!audio) return

    audio.volume = 0

    audio.play().catch((err) => {
      console.log("Audio blocked:", err)
    })

    let vol = 0

    const interval = setInterval(() => {
      if (vol < 1) {
        vol += 0.1
        audio.volume = vol
      } else {
        clearInterval(interval)
      }
    }, 200)
  }

  const toggleMusic = () => {
    const audio = audioRef.current

    if (!audio) return

    audio.muted = !audio.muted

    setIsMuted(audio.muted)

    localStorage.setItem(
      "birthday-muted",
      String(audio.muted)
    )
  }

  const getNextBirthday = () => {
    const now = new Date()
    const currentYear = now.getFullYear()

    let birthday = new Date(
      `${currentYear}-04-16T00:00:00`
    )

    if (now.getTime() > birthday.getTime()) {
      birthday = new Date(
        `${currentYear}-04-16T00:00:00`
      )
    }

    return birthday
  }

  const birthdayDate = getNextBirthday()

  const [isBirthdayOver, setIsBirthdayOver] =
    useState(
      new Date().getTime() >=
        birthdayDate.getTime()
    )

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 4000)

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const savedMute =
      localStorage.getItem("birthday-muted")

    if (savedMute === "true") {
      setIsMuted(true)

      if (audioRef.current) {
        audioRef.current.muted = true
      }
    }
  }, [])

  const screens = [
    !isBirthdayOver ? (
      <Countdown
        key="countdown"
        birthdayDate={birthdayDate}
        onComplete={() =>
          setIsBirthdayOver(true)
        }
      />
    ) : (
      <Celebration
        key="celebration"
        onNext={() => {
          playMusic()
          setCurrentScreen(1)
        }}
      />
    ),

    <HappyBirthday
      key="happy"
      onNext={() => setCurrentScreen(2)}
    />,

    <PhotoGallery
      key="gallery"
      onNext={() => setCurrentScreen(3)}
    />,

    <Letter key="letter" />,
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-950/30 via-black to-purple-950/30 overflow-hidden relative">
      <audio ref={audioRef} loop>
        <source
          src="/audio/jaanu.mp3"
          type="audio/mpeg"
        />
      </audio>

      {/* Mute / Unmute Button */}
      <button
        onClick={toggleMusic}
        className="fixed top-5 right-5 z-50 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full p-3 text-white shadow-lg transition-all duration-300 hover:scale-110"
      >
        {isMuted ? (
          <VolumeX className="w-5 h-5" />
        ) : (
          <Volume2 className="w-5 h-5" />
        )}
      </button>

      {/* Background glow */}
      <div
        className="fixed inset-0 z-0 blur-[120px] opacity-20"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 25%, rgba(255, 99, 165, 0.6), transparent 40%)",
        }}
      />

      <div
        className="fixed inset-0 z-0 blur-[120px] opacity-20"
        style={{
          backgroundImage:
            "radial-gradient(circle at 80% 80%, rgba(99, 102, 241, 0.6), transparent 40%)",
        }}
      />

      <div
        className="fixed inset-0 z-0 blur-[160px] opacity-10"
        style={{
          backgroundImage:
            "radial-gradient(circle at 50% 50%, rgba(228, 193, 255, 0.4), transparent 40%)",
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

      <motion.div
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{
          duration: 1,
          delay: 1,
        }}
        className="fixed bottom-4 right-4 text-[13px] text-white/40 pointer-events-none z-50 font-light"
      >
        @Jaanu B'day
      </motion.div>
    </div>
  )
}
