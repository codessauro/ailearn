import React from 'react';
import { useTypingStore } from '../store';
import { Timer, Target, Zap } from 'lucide-react';

export const Stats: React.FC = () => {
  const { wpm, accuracy, wordsCompleted } = useTypingStore();

  const stats = [
    { icon: <Zap className="w-5 h-5" />, label: 'WPM', value: wpm },
    { icon: <Target className="w-5 h-5" />, label: 'Accuracy', value: `${accuracy}%` },
    { icon: <Timer className="w-5 h-5" />, label: 'Words', value: wordsCompleted },
  ];

  return (
    <div className="grid grid-cols-3 gap-4 w-full max-w-2xl mx-auto mt-6">
      {stats.map(({ icon, label, value }) => (
        <div key={label} className="bg-white p-4 rounded-xl shadow-md">
          <div className="flex items-center justify-center mb-2 text-indigo-600">
            {icon}
            <span className="ml-2 font-medium text-sm">{label}</span>
          </div>
          <p className="text-2xl font-bold text-center text-gray-800">{value}</p>
        </div>
      ))}
    </div>
  );
};