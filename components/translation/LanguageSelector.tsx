// components/LanguageSelector.tsx
import React from 'react';

const languages = [
  { code: 'en', name: 'English' },
  { code: 'hi', name: 'Hindi' },
  { code: 'es', name: 'Spanish' },
  { code: 'fr', name: 'French' },
  { code: 'de', name: 'German' },
  { code: 'zh-CN', name: 'Chinese (Simplified)' },
  { code: 'ja', name: 'Japanese' },
  { code: 'ru', name: 'Russian' },
  { code: 'pt', name: 'Portuguese' },
  { code: 'ar', name: 'Arabic' },
  { code: 'it', name: 'Italian' },
  { code: 'ko', name: 'Korean' },
  { code: 'bn', name: 'Bengali' },
  { code: 'tr', name: 'Turkish' },
  { code: 'vi', name: 'Vietnamese' },
  { code: 'pl', name: 'Polish' },
  // Add more languages as needed
];

interface LanguageSelectorProps {
  selectedLanguage: string;
  onLanguageChange: (language: string) => void;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({ selectedLanguage, onLanguageChange }) => {
  return (
    <select
      value={selectedLanguage}
      onChange={(e) => onLanguageChange(e.target.value)}
      className="border-none rounded-md p-2 bg-gray-200/60 text-gray-500 dark:text-gray-300 dark:bg-zinc-700 me-3 focus-visible:outline-none focus-visible:ring-ring"
    >
      {languages.map((lang) => (
        <option key={lang.code} value={lang.code} className='bg-gray-200/75 dark:bg-zinc-700'>
          {lang.name}
        </option>
      ))}
    </select>
  );
};

export default LanguageSelector;
