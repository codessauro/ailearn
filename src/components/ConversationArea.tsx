import React, { useEffect } from 'react';
import { useTypingStore } from '../store';
import { MessageSquare, RotateCcw } from 'lucide-react';

export const ConversationArea: React.FC = () => {
  const { 
    currentConversation,
    generateNewConversation,
    currentInput,
    isCorrect,
    updateInput,
    completeWord
  } = useTypingStore();

  useEffect(() => {
    if (!currentConversation) {
      generateNewConversation();
    }
  }, [currentConversation, generateNewConversation]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateInput(e.target.value);
  };

  const handleNewConversation = () => {
    generateNewConversation();
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-lg">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <MessageSquare className="w-8 h-8 text-indigo-600 mr-2" />
          <h2 className="text-2xl font-bold text-gray-800">Practice Conversation</h2>
        </div>
        <button
          onClick={handleNewConversation}
          className="flex items-center px-4 py-2 text-sm font-medium text-indigo-600 hover:text-indigo-700"
        >
          <RotateCcw className="w-4 h-4 mr-2" />
          New Conversation
        </button>
      </div>

      {currentConversation && (
        <div className="mb-6">
          <div className="bg-gray-50 p-4 rounded-lg mb-4">
            <p className="text-lg text-gray-700">{currentConversation.message}</p>
            <p className="text-xs text-gray-400 mt-2">
              Conversation ID: {currentConversation.conversation_id}
            </p>
          </div>
          <div className="relative">
            <input
              type="text"
              value={currentInput}
              onChange={handleInputChange}
              className={`w-full p-4 text-lg font-mono border-2 rounded-lg outline-none transition-colors
                ${isCorrect 
                  ? 'border-green-300 bg-green-50' 
                  : 'border-red-300 bg-red-50'}`}
              placeholder="Type your response..."
              autoFocus
            />
          </div>
        </div>
      )}
    </div>
  );
};