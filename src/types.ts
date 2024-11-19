export interface Word {
  id: string;
  text: string;
  difficulty: number;
  language: string;
  category: string;
}

export interface Conversation {
  conversation_id: string;
  message: string;
  response: string;
  options: string[];
  timestamp: number;
}

export interface TypingState {
  currentInput: string;
  currentWord: Word | null;
  currentConversation: Conversation | null;
  isCorrect: boolean;
  mistakes: number;
  wordsCompleted: number;
  startTime: number | null;
  wpm: number;
  accuracy: number;
  score: number;
  level: number;
  selectedLanguage: string;
  selectedCategory: string;
  conversationHistory: Conversation[];
}

export interface Stats {
  wpm: number;
  accuracy: number;
  totalWords: number;
  score: number;
  level: number;
}