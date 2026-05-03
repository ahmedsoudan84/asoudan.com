'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

const occasions = ['Anniversary', 'Birthday', 'New Job', 'Housewarming', 'Christmas']
const moods = ['Minimal', 'Luxury', 'Cozy', 'Modern']

export default function AIStylist() {
  const [occasion, setOccasion] = useState('')
  const [mood, setMood] = useState('')
  const [showResults, setShowResults] = useState(false)

  const generateRecommendations = () => {
    if (occasion && mood) setShowResults(true)
  }

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-md mx-auto">
        {!showResults ? (
          <>
            <h1 className="text-2xl font-serif font-bold mb-6">AI Stylist</h1>
            
            <div className="mb-4">
              <h3 className="font-medium mb-2">Occasion</h3>
              <div className="flex flex-wrap gap-2">
                {occasions.map(o => (
                  <button
                    key={o}
                    onClick={() => setOccasion(o)}
                    className={`px-4 py-2 rounded-xl border ${occasion === o ? 'bg-primary text-white' : ''}`}
                  >
                    {o}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <h3 className="font-medium mb-2">Style</h3>
              <div className="flex flex-wrap gap-2">
                {moods.map(m => (
                  <button
                    key={m}
                    onClick={() => setMood(m)}
                    className={`px-4 py-2 rounded-xl border ${mood === m ? 'bg-primary text-white' : ''}`}
                  >
                    {m}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={generateRecommendations}
              disabled={!occasion || !mood}
              className="w-full bg-primary text-white py-4 rounded-2xl font-medium"
            >
              Get Recommendations
            </button>
          </>
        ) : (
          <div>
            <h1 className="text-2xl font-serif font-bold mb-4">Your Picks</h1>
            <p className="text-gray-600">Selected: {occasion} • {mood}</p>
            <button onClick={() => setShowResults(false)} className="mt-4 text-primary">
              Start Over
            </button>
          </div>
        )}
      </div>
    </div>
  )
}