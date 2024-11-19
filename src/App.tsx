import React from 'react';
import { LanguageSelector } from './components/LanguageSelector';
import { ConversationArea } from './components/ConversationArea';
import { Stats } from './components/Stats';
import { ProgressBar } from './components/ProgressBar';
import { Brain } from 'lucide-react';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Brain className="w-12 h-12 text-indigo-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            AI Language Learning Assistant
          </h1>
          <p className="text-gray-600">
            Practice conversations and improve your language skills
          </p>
        </div>

        <LanguageSelector />
        <ProgressBar />
        <ConversationArea />
        <Stats />
      </div>
    </div>
  );
}

export default App;