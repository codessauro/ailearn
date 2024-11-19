import React from 'react';
import { useTypingStore } from '../store';
import { Trophy } from 'lucide-react';

export const ProgressBar: React.FC = () => {
  const { score, level } = useTypingStore();
  const progress = (score % 100) / 100;

  return (
    <div className="w-full max-w-2xl mx-auto mb-6">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center">
          <Trophy className="w-5 h-5 text-yellow-500 mr-2" />
          <span className="font-medium text-gray-700">Level {level}</span>
        </div>
        <span className="text-sm text-gray-500">Score: {score}</span>
      </div>
      <div className="w-full h-2 bg-gray-200 rounded-full">
        <div 
          className="h-full bg-indigo-600 rounded-full transition-all duration-300"
          style={{ width: `${progress * 100}%` }}
        />
      </div>
    </div>
  );
};