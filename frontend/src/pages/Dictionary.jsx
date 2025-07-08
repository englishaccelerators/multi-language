import React, { useState, useRef } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';

export default function Dictionary() {
  const [word, setWord] = useState("");
  const [results, setResults] = useState(null);
  const [error, setError] = useState("");
  const [speed, setSpeed] = useState(1);
  const audioRef = useRef(null);

  const searchWord = async () => {
    try {
      const res = await axios.get(`http://localhost:8000/search/?word=${word}`);
      setResults(res.data.grouped_entries);
      setError("");
    } catch (e) {
      setResults(null);
      setError("❌ Word not found or error loading results.");
    }
  };

  const playAudio = (url) => {
    if (audioRef.current) audioRef.current.pause();
    const audio = new Audio(url);
    audio.playbackRate = speed;
    audioRef.current = audio;
    audio.play();
  };

  return (
    <div className="max-w-4xl mx-auto p-6">

      <h1 className="text-2xl font-bold mb-6">📘 English Dictionary</h1>

      {/* 🔊 Top Sponsor Banner */}
      <div className="mb-4 p-3 bg-gray-50 border border-gray-300 rounded text-center text-sm text-gray-700">
        🔔 This section is free thanks to our sponsors. <br />
        <span className="italic text-xs text-gray-500">[Your Ad Here]</span>
      </div>

      {/* Search Input */}
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={word}
          onChange={(e) => setWord(e.target.value)}
          placeholder="Enter a word"
          className="border rounded px-3 py-2 flex-grow"
        />
        <button
          onClick={searchWord}
          className="bg-blue-600 text-white px-4 rounded"
        >
          Search
        </button>
      </div>

      {/* Speed selector */}
      <div className="text-sm mb-4">
        <label className="mr-2">Speed:</label>
        <select
          value={speed}
          onChange={(e) => setSpeed(parseFloat(e.target.value))}
          className="border px-2 py-1 rounded"
        >
          <option value={1}>1x</option>
          <option value={0.5}>0.5x</option>
          <option value={0.25}>0.25x</option>
        </select>
      </div>

      {/* Error */}
      {error && <div className="text-red-500 font-semibold mb-6">{error}</div>}

      {/* Results */}
      {results &&
        Object.entries(results).map(([pos, entries], i) => (
          <div key={i} className="mb-8 p-4 bg-white border-l-4 border-blue-600 rounded">
            <h3 className="text-blue-700 font-bold text-lg mb-2">{pos}</h3>
            {entries.map((entry, j) => (
              <div key={j} className="mb-4">
                <div className="font-semibold">
                  📘 {entry.definition}
                  {entry.audio_url_uk && (
                    <button
                      onClick={() => playAudio(entry.audio_url_uk)}
                      className="ml-3 text-blue-600"
                    >
                      🇬🇧 🔊
                    </button>
                  )}
                  {entry.audio_url_us && (
                    <button
                      onClick={() => playAudio(entry.audio_url_us)}
                      className="ml-2 text-blue-600"
                    >
                      🇺🇸 🔊
                    </button>
                  )}
                </div>
                <ul className="list-disc ml-6 mt-2 text-sm text-gray-700">
                  {entry.examples.map((ex, k) => (
                    <li key={k}>
                      📝 {ex.text}
                      {ex.audio_url_uk && (
                        <button
                          onClick={() => playAudio(ex.audio_url_uk)}
                          className="ml-2 text-blue-500"
                        >
                          🇬🇧
                        </button>
                      )}
                      {ex.audio_url_us && (
                        <button
                          onClick={() => playAudio(ex.audio_url_us)}
                          className="ml-1 text-blue-500"
                        >
                          🇺🇸
                        </button>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        ))}

      {/* 🧪 Final Exam CTA */}
      <div className="mt-8 p-4 bg-yellow-100 border-l-4 border-yellow-600 rounded">
        <p className="mb-2 text-lg font-semibold text-yellow-800">
          🧪 Want to test everything you've learned?
        </p>
        <Link
          to="/final-exam"
          className="inline-block px-4 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700"
        >
          🎓 Take Comprehensive Final Exam
        </Link>
      </div>

      {/* 📢 Ad Bottom Banner */}
      <div className="mt-6 p-3 bg-gray-50 border border-gray-300 rounded text-center text-sm text-gray-700">
        💡 Support us by checking out our learning partners.
        <br />
        <span className="italic text-xs text-gray-500">[Ad slot or sponsor badge]</span>
      </div>
    </div>
  );
}
