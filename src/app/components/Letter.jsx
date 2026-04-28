"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Mail, Heart, Sparkles, RotateCcw } from "lucide-react"
import confetti from "canvas-confetti"

export default function Letter() {
    const [isOpen, setIsOpen] = useState(false)
    const [showText, setShowText] = useState(false)
    const [currentText, setCurrentText] = useState("")
    const [showCursor, setShowCursor] = useState(true)
    const [showBalloons, setShowBalloons] = useState(false)

    const letterText = `Happy Birthday Jaanu 🎂💖

Ee birthday niku oka memorable day ga undali ani nenu chinna try chesa… niku nachithey chala happy 😊💫
Incase nachakapothey please sad avvakuu… next year nee birthday ni inka chala special ga chestha, promise 🤍✨

Niku telusa… nee smile ki chala fans unnaru 😍💞
Andhulo nenu kuda okadini… so aa smile ni eppudu dhoram cheyakuu 🥺💗
E situation lo aina navvuthu undu… endhukante nee smile chustey naaku chala peace vasthundi 🌸

Na life lo nuvvu devudu ichina biggest gift 🎁❤️
Nenu adhi eppatiki vodulukonu… eppudu kaapadukunta 💞

Mana madhya konni godavalu jaruguthai…
kani adhey mana love emo anipisthundi 🥺💔➡️💖

Nannu nuvvu treat chesina vidham,
anta prema… anta care… naku ekkada dorakaledu 💕

Future lo naa life partner kuda anta love ivvado emo ani anipisthundi…
because nuvvu naaku chala special 🥹❤️

Love you a lot ❤️‍🔥
Miss you more than anyone can ever understand 🫶🥺

Happy Birthday ra naa pedda kothi 🐒😂💖
Nannu eppudu vadili vellavu kada… promise cheyyi 🤍🥹
E roj anta happy ga navvuthu undali 😘🎉✨
`

    // ✨ Typing + subtle celebration
    useEffect(() => {
        if (!showText) return

        let index = 0
        const timer = setInterval(() => {
            if (index < letterText.length) {
                setCurrentText(letterText.slice(0, index + 1))
                index++
            } else {
                clearInterval(timer)
                setShowCursor(false)

                // 🎉 light confetti (reduced)
                confetti({
                    particleCount: 40,
                    spread: 60,
                    origin: { y: 0.6 },
                })

                setShowBalloons(true)
            }
        }, 25)

        return () => clearInterval(timer)
    }, [showText])

    const handleOpenLetter = () => {
        setIsOpen(true)
        setTimeout(() => setShowText(true), 700)
    }

    const handleReset = () => {
        setIsOpen(false)
        setShowText(false)
        setCurrentText("")
        setShowCursor(true)
        setShowBalloons(false)
    }

    // 🌌 Minimal symbols (sky feel)
    const symbols = ["❤️", "✨"]

    return (
        <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">

            {/* 🌌 Subtle Floating "Stars" */}
            {showBalloons && (
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                    {[...Array(10)].map((_, i) => {
                        const side = Math.floor(Math.random() * 4)
                        const size = 10 + Math.random() * 12

                        let initial = {}
                        let animate = {}

                        if (side === 0) {
                            initial = { x: `${Math.random() * 100}vw`, y: "110%" }
                            animate = { y: "-20%" }
                        } else if (side === 1) {
                            initial = { x: "-5%", y: `${Math.random() * 100}vh` }
                            animate = { x: "20%" }
                        } else if (side === 2) {
                            initial = { x: "105%", y: `${Math.random() * 100}vh` }
                            animate = { x: "80%" }
                        } else {
                            initial = { x: `${Math.random() * 100}vw`, y: "-10%" }
                            animate = { y: "20%" }
                        }

                        return (
                            <motion.div
                                key={i}
                                initial={{ ...initial, opacity: 0 }}
                                animate={{
                                    ...animate,
                                    opacity: [0.2, 0.8, 0.2],
                                }}
                                transition={{
                                    duration: 8 + Math.random() * 4,
                                    repeat: Infinity,
                                    delay: Math.random() * 4,
                                    ease: "easeInOut",
                                }}
                                style={{ fontSize: `${size}px` }}
                                className="absolute"
                            >
                                {symbols[Math.floor(Math.random() * symbols.length)]}
                            </motion.div>
                        )
                    })}
                </div>
            )}

            <div className="max-w-3xl w-full">

                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-5xl font-bold bg-gradient-to-r from-pink-400 to-purple-500 bg-clip-text text-transparent">
                        A Special Letter 💌
                    </h1>
                    <p className="text-purple-300 mt-2">Just for you ✨</p>
                </div>

                <AnimatePresence mode="wait">
                    {!isOpen ? (
                        // 📩 Envelope
                        <motion.div
                            key="envelope"
                            onClick={handleOpenLetter}
                            className="cursor-pointer flex justify-center"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                        >
                            <div className="w-80 h-52 bg-gradient-to-br from-pink-200 to-purple-200 rounded-2xl shadow-xl flex items-center justify-center relative">
                                <Mail className="w-16 h-16 text-pink-500" />
                                <div className="absolute bottom-3 text-pink-700 animate-pulse">
                                    Click to open
                                </div>
                            </div>
                        </motion.div>
                    ) : (
                        // 💌 Letter
                        <motion.div
                            key="letter"
                            className="p-8 rounded-2xl shadow-2xl border border-pink-300 relative"
                            style={{
                                background: "linear-gradient(135deg, #fce7f3, #e0e7ff)",
                            }}
                            initial={{ rotateX: -90 }}
                            animate={{ rotateX: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <div className="text-center mb-4">
                                <Heart className="w-10 h-10 mx-auto text-red-500 fill-current animate-bounce" />
                            </div>

                            <div className="h-72 overflow-y-auto text-gray-700 whitespace-pre-wrap">
                                {currentText}
                                {showCursor && (
                                    <span className="inline-block w-1 h-4 bg-purple-600 ml-1 animate-pulse" />
                                )}
                            </div>

                            {currentText === letterText && (
                                <div className="text-center mt-6">
                                    <button
                                        onClick={handleReset}
                                        className="flex items-center gap-2 mx-auto px-5 py-2 bg-white border border-pink-400 rounded-full text-pink-600 hover:bg-pink-100"
                                    >
                                        <RotateCcw className="w-4 h-4" />
                                        Read Again
                                    </button>
                                </div>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    )
}