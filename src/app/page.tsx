'use client'

import { useEffect, useState } from "react"

const APIURL = '/api/wordle-words'

export default function Home() {
  const [solution, setSolution] = useState('')
  const [guess, setGesses] = useState(Array(6).fill(null))
  const [currentGuess, setCurretGuess] = useState('')

  useEffect(() => {
    const handleType = (event: any) => {
      setCurretGuess(currentGuess + event.key)
    }

    window.addEventListener('keydown', handleType)

    return () => window.removeEventListener('keydown', handleType)
  }, [currentGuess])


  useEffect(() => {
    const fetchWord = async () => {
      try {
        const response = await fetch(APIURL)
        const words = await response.json()
        const randomWord = words[Math.floor(Math.random() * words.length)]

        setSolution(randomWord)
      } catch (error) {
        console.error('Erro ao buscar palavra:', error)
      }
    }
    fetchWord()
  }, [])

  return (
    <div className="">
      <main className="text-5xl text-center mt-40">
        <p>{solution}</p>
      </main>
    </div>
  );
}
