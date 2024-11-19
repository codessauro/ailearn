import React, { useEffect, useRef } from 'react';
import { useTypingStore } from '../store';
import { Keyboard } from 'lucide-react';

export const TypingArea: React.FC = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { 
    currentInput, 
    currentWord, 
    isCorrect, 
    updateInput, 
    completeWord 
  } = useTypingStore();

  useEffect(() => {
    if (currentWord && currentInput === currentWord.text) {
      completeWord();
    }
  }, [currentInput, currentWord, completeWord]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateInput(e.target.value);
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-lg">
      <div className="flex items-center justify-center mb-6">
        <Keyboard className="w-8 h-8 text-indigo-600 mr-2" />
        <h2 className="text-2xl font-bold text-gray-800">Type the word</h2>
      </div>

      <div className="mb-6 text-center">
        <p className="text-4xl font-mono mb-4 text-gray-700">
          {currentWord?.text || 'Loading...'}
        </p>
        <p className="text-sm text-gray-500">
          Category: {currentWord?.category || 'N/A'} | 
          Difficulty: {currentWord?.difficulty || 1}/5
        </p>
      </div>

      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          value={currentInput}
          onChange={handleInputChange}
          className={`w-full p-4 text-xl font-mono border-2 rounded-lg outline-none transition-colors
            ${isCorrect 
              ? 'border-green-300 bg-green-50' 
              : 'border-red-300 bg-red-50'}`}
          placeholder="Start typing..."
          autoFocus
        />
        <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
          {isCorrect ? (
            <span className="text-green-500">✓</span>
          ) : (
            <span className="text-red-500">✗</span>
          )}
        </div>
      </div>
    </div>
  );
};