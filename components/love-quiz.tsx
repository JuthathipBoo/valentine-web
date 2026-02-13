"use client"

import { useEffect, useRef, useState } from "react"
import { Heart, MessageCircleHeart, RotateCcw } from "lucide-react"

const questions = [
  {
    question: "สิ่งที่เค้าชอบที่สุดเกี่ยวกับเบ๊บๆคืออะไร?",
    options: ["รอยยิ้ม", "เสียงหัวเราะ", "ความใจดี", "ทุกอย่าง"],
    answer: 3,
  },
  {
    question: "เค้าอยากไปเที่ยวกับเบ๊บๆที่ไหนมากที่สุด?",
    options: ["ทะเล", "ภูเขา", "ต่างประเทศ", "ที่ไหนก็ได้ถ้ามีเธอ"],
    answer: 3,
  },
  {
    question: "เค้าจะรักเบ๊บๆนานแค่ไหน?",
    options: ["1 ปี", "10 ปี", "100 ปี", "ตลอดไป"],
    answer: 3,
  },
  {
    question: "อะไรคือเหตุผลที่เค้ารักเบ๊บๆ?",
    options: ["หน้าตา", "นิสัย", "ความเก่ง", "ไม่ต้องมีเหตุผล"],
    answer: 3,
  },
]

export function LoveQuiz() {
  const [currentQ, setCurrentQ] = useState(0)
  const [score, setScore] = useState(0)
  const [selected, setSelected] = useState<number | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [confetti, setConfetti] = useState<{ id: number; x: number; y: number; color: string }[]>(
    []
  )
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true)
      },
      { threshold: 0.2 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  const handleSelect = (optionIndex: number) => {
    if (selected !== null) return
    setSelected(optionIndex)

    const isCorrect = optionIndex === questions[currentQ].answer
    if (isCorrect) {
      setScore((s) => s + 1)
      const newConfetti = Array.from({ length: 10 }, (_, i) => ({
        id: Date.now() + i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        color: ["hsl(346,55%,52%)", "hsl(25,45%,72%)", "hsl(0,45%,68%)"][
          Math.floor(Math.random() * 3)
        ],
      }))
      setConfetti(newConfetti)
      setTimeout(() => setConfetti([]), 1500)
    }

    setTimeout(() => {
      if (currentQ < questions.length - 1) {
        setCurrentQ((q) => q + 1)
        setSelected(null)
      } else {
        setShowResult(true)
      }
    }, 1200)
  }

  const reset = () => {
    setCurrentQ(0)
    setScore(0)
    setSelected(null)
    setShowResult(false)
  }

  const q = questions[currentQ]

  return (
    <section ref={ref} className="px-5 py-10 sm:px-6 sm:py-16 max-w-md mx-auto">
      <div
        className={`transition-all duration-1000 ease-out ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        {/* Header */}
        <div className="text-center mb-8 sm:mb-10">
          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
            <MessageCircleHeart className="text-primary" size={22} />
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-foreground mb-2 text-balance">
            {"เบ๊บๆรู้จักเค้าดีแค่ไหน?"}
          </h2>
          <p className="text-muted-foreground font-sans text-xs sm:text-sm font-light">
            {"ลองตอบคำถามเหล่านี้ดูสิ"}
          </p>
        </div>

        {/* Quiz card */}
        <div className="bg-card border border-border rounded-2xl p-5 sm:p-7 shadow-sm relative overflow-hidden">
          {/* Confetti */}
          {confetti.map((c) => (
            <div
              key={c.id}
              className="absolute w-1.5 h-1.5 rounded-full animate-fade-in-up pointer-events-none"
              style={{
                left: `${c.x}%`,
                top: `${c.y}%`,
                backgroundColor: c.color,
                animationDuration: "0.8s",
              }}
            />
          ))}

          {!showResult ? (
            <>
              {/* Progress bar */}
              <div className="flex items-center gap-1.5 mb-5">
                {questions.map((_, i) => (
                  <div
                    key={`progress-${i}`}
                    className={`h-1 flex-1 rounded-full transition-colors duration-500 ${
                      i <= currentQ ? "bg-primary" : "bg-border"
                    }`}
                  />
                ))}
              </div>

              <p className="text-muted-foreground font-sans text-[10px] sm:text-xs mb-1.5 font-medium tabular-nums">
                {"คำถามที่"} {currentQ + 1} / {questions.length}
              </p>

              <h3 className="font-sans font-semibold text-base sm:text-lg text-foreground mb-5">
                {q.question}
              </h3>

              <div className="flex flex-col gap-2">
                {q.options.map((option, i) => {
                  const isAnswer = i === q.answer
                  const isSelected = i === selected
                  let optionStyle =
                    "bg-secondary text-secondary-foreground hover:bg-primary/8"

                  if (selected !== null) {
                    if (isAnswer) {
                      optionStyle = "bg-primary text-primary-foreground"
                    } else if (isSelected && !isAnswer) {
                      optionStyle = "bg-muted text-muted-foreground"
                    } else {
                      optionStyle = "bg-secondary text-secondary-foreground opacity-40"
                    }
                  }

                  return (
                    <button
                      key={option}
                      type="button"
                      onClick={() => handleSelect(i)}
                      disabled={selected !== null}
                      className={`w-full text-left px-4 py-3 rounded-xl font-sans transition-all duration-300 active:scale-[0.98] ${optionStyle} ${
                        selected === null ? "cursor-pointer" : "cursor-default"
                      }`}
                    >
                      <span className="flex items-center gap-3">
                        <span className="w-6 h-6 rounded-full bg-background/40 flex items-center justify-center text-[10px] font-medium shrink-0">
                          {String.fromCharCode(65 + i)}
                        </span>
                        <span className="text-xs sm:text-sm">{option}</span>
                      </span>
                    </button>
                  )
                })}
              </div>
            </>
          ) : (
            <div className="text-center py-4">
              {/* Result hearts */}
              <div className="flex items-center justify-center gap-1.5 mb-5">
                {[...Array(4)].map((_, i) => (
                  <Heart
                    key={`result-heart-${i}`}
                    size={20}
                    className="text-primary animate-pulse-soft"
                    fill={i < score ? "hsl(346, 55%, 52%)" : "none"}
                    style={{ animationDelay: `${i * 0.2}s` }}
                  />
                ))}
              </div>

              <h3 className="font-serif text-2xl sm:text-3xl text-foreground mb-2">
                {score === 4
                  ? "เย้ยยย! ถูกหมดเยยย"
                  : score >= 2
                    ? "รักเบ๊บๆที่สุดดด!"
                    : "แหมะ เกือบถูกหมดแยะะ"}
              </h3>

              <p className="text-muted-foreground font-sans text-xs mb-1 tabular-nums">
                {"ตอบถูก"} {score} / {questions.length} {"ข้อ"}
              </p>

              <p className="font-sans text-primary text-sm sm:text-base mb-6 font-light">
                {score === 4
                  ? "เบ๊บๆรู้ใจเค้าที่สุด"
                  : "แต่ยังไงเค้าก็รักเบ๊บๆอยู่ดี อิอิ"}
              </p>

              <button
                type="button"
                onClick={reset}
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-5 py-2.5 rounded-full font-sans text-xs hover:opacity-90 active:scale-95 transition-all font-medium"
              >
                <RotateCcw size={13} />
                {"เล่นอีกครั้ง"}
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
