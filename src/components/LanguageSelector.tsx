import React from 'react';
import Select from 'react-select';
import { languages, categories } from '../config/languages';
import { useTypingStore } from '../store';
import { Globe2, BookOpen } from 'lucide-react';

export const LanguageSelector: React.FC = () => {
  const { selectedLanguage, selectedCategory, setLanguage, setCategory } = useTypingStore();

  return (
    <div className="grid grid-cols-2 gap-4 w-full max-w-2xl mx-auto mb-8">
      <div className="relative">
        <div className="absolute left-3 top-1/2 -translate-y-1/2">
          <Globe2 className="w-5 h-5 text-gray-400" />
        </div>
        <Select
          options={languages}
          value={languages.find(l => l.value === selectedLanguage)}
          onChange={(option) => option && setLanguage(option.value)}
          className="pl-10"
          classNamePrefix="select"
        />
      </div>
      <div className="relative">
        <div className="absolute left-3 top-1/2 -translate-y-1/2">
          <BookOpen className="w-5 h-5 text-gray-400" />
        </div>
        <Select
          options={categories}
          value={categories.find(c => c.value === selectedCategory)}
          onChange={(option) => option && setCategory(option.value)}
          className="pl-10"
          classNamePrefix="select"
        />
      </div>
    </div>
  );
};