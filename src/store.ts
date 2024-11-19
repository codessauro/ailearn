import { create } from 'zustand';
import { TypingState, Word, Conversation } from './types';
import { generateConversation } from './services/api';
import { persist } from 'zustand/middleware';

interface TypingStore extends TypingState {
  setCurrentWord: (word: Word | null) => void;
  updateInput: (input: string) => void;
  resetState: () => void;
  completeWord: () => void;
  setLanguage: (language: string) => void;
  setCategory: (category: string) => void;
  generateNewConversation: () => Promise<void>;
  updateScore: (points: number) => void;
}

const initialState: TypingState = {
  currentInput: '',
  currentWord: null,
  currentConversation: null,
  isCorrect: true,
  mistakes: 0,
  wordsCompleted: 0,
  startTime: null,
  wpm: 0,
  accuracy: 100,
  score: 0,
  level: 1,
  selectedLanguage: 'en',
  selectedCategory: 'casual',
  conversationHistory: [],
};

const calculateWPM = (wordsCompleted: number, startTime: number | null): number => {
  if (!startTime) return 0;
  const minutes = (Date.now() - startTime) / 60000;
  return Math.round(wordsCompleted / minutes);
};

const calculateAccuracy = (mistakes: number, totalWords: number): number => {
  if (totalWords === 0) return 100;
  return Math.round(((totalWords - mistakes) / totalWords) * 100);
};

const generateConversationId = () => {
  return `conv_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

export const useTypingStore = create<TypingStore>()(
  persist(
    (set, get) => ({
      ...initialState,

      setCurrentWord: (word) => {
        set({ 
          currentWord: word, 
          startTime: word ? Date.now() : null 
        });
      },

      updateInput: (input) => {
        const state = get();
        const isCorrect = state.currentWord ? 
          state.currentWord.text.startsWith(input) : true;
        
        set((state) => ({
          currentInput: input,
          isCorrect,
          mistakes: isCorrect ? state.mistakes : state.mistakes + 1,
        }));
      },

      resetState: () => {
        set({ ...initialState });
      },

      completeWord: () => {
        set((state) => {
          const newScore = state.score + (state.isCorrect ? 10 : 5);
          const newLevel = Math.floor(newScore / 100) + 1;
          
          return {
            wordsCompleted: state.wordsCompleted + 1,
            currentInput: '',
            wpm: calculateWPM(state.wordsCompleted + 1, state.startTime),
            accuracy: calculateAccuracy(state.mistakes, state.wordsCompleted + 1),
            score: newScore,
            level: newLevel,
          };
        });
      },

      setLanguage: (language) => {
        set({ selectedLanguage: language });
      },

      setCategory: (category) => {
        set({ selectedCategory: category });
      },

      generateNewConversation: async () => {
        try {
          const state = get();
          const message = await generateConversation(
            state.selectedLanguage,
            state.selectedCategory,
            state.level
          );
          
          const newConversation: Conversation = {
            conversation_id: generateConversationId(),
            message,
            response: '',
            options: [],
            timestamp: Date.now(),
          };

          set((state) => ({
            currentConversation: newConversation,
            conversationHistory: [...state.conversationHistory, newConversation],
          }));
        } catch (error) {
          console.error('Failed to generate conversation:', error);
          const fallbackConversation: Conversation = {
            conversation_id: generateConversationId(),
            message: 'Hello! How are you today?',
            response: '',
            options: [],
            timestamp: Date.now(),
          };
          
          set((state) => ({
            currentConversation: fallbackConversation,
            conversationHistory: [...state.conversationHistory, fallbackConversation],
          }));
        }
      },

      updateScore: (points) => {
        set((state) => ({
          score: state.score + points,
          level: Math.floor((state.score + points) / 100) + 1,
        }));
      },
    }),
    {
      name: 'typing-store',
      partialize: (state) => ({
        score: state.score,
        level: state.level,
        selectedLanguage: state.selectedLanguage,
        selectedCategory: state.selectedCategory,
        conversationHistory: state.conversationHistory,
      }),
      merge: (persistedState: any, currentState) => ({
        ...currentState,
        ...persistedState,
      }),
    }
  )
);